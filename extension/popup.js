// Emission factors for different categories and transport modes
const EMISSION_FACTORS = {
  products: {
    electronics: { factor: 50, unit: 'kg CO2e per kg' },
    clothing: { factor: 15, unit: 'kg CO2e per kg' },
    books: { factor: 1.5, unit: 'kg CO2e per kg' },
    'food-fresh': { factor: 2.5, unit: 'kg CO2e per kg' },
    'food-processed': { factor: 4, unit: 'kg CO2e per kg' },
    furniture: { factor: 20, unit: 'kg CO2e per kg' },
    toys: { factor: 10, unit: 'kg CO2e per kg' },
    cosmetics: { factor: 3.5, unit: 'kg CO2e per kg' },
    sports: { factor: 8, unit: 'kg CO2e per kg' },
    other: { factor: 5, unit: 'kg CO2e per kg' }
  },
  packaging: {
    standard: 0.5,
    minimal: 0.2,
    eco: 0.1
  },
  transport: {
    van: { factor: 0.25, unit: 'kg CO2e per km per kg' },
    bike: { factor: 0.01, unit: 'kg CO2e per km per kg' },
    truck: { factor: 0.15, unit: 'kg CO2e per km per kg' },
    air: { factor: 1.5, unit: 'kg CO2e per km per kg' },
    train: { factor: 0.05, unit: 'kg CO2e per km per kg' },
    ship: { factor: 0.02, unit: 'kg CO2e per km per kg' }
  }
};

// Distance Estimation Ranges
const DISTANCE_RANGES = {
  'custom': { min: 0, max: 0, avg: 10, description: 'Enter your own distance' },
  'local': { min: 5, max: 20, avg: 12, description: 'Local delivery within neighborhood' },
  'city': { min: 20, max: 50, avg: 35, description: 'Same city or metropolitan area' },
  'regional': { min: 50, max: 200, avg: 125, description: 'Regional delivery (nearby cities)' },
  'national': { min: 200, max: 1000, avg: 500, description: 'National delivery (cross-country)' },
  'international': { min: 1000, max: 5000, avg: 2500, description: 'International shipping' }
};

// Application state
let calculations = [];

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  await loadCalculations();
  updateStats();
  checkCurrentPage();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      switchTab(tabName);
    });
  });

  // Calculate button
  document.getElementById('calculateBtn').addEventListener('click', calculateFootprint);

  // Export button
  document.getElementById('exportBtn').addEventListener('click', exportData);
  
  // Distance type selector
  document.getElementById('distanceType').addEventListener('change', updateDistanceFromType);
}

// Switch tabs
function switchTab(tabName) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  document.getElementById(tabName).classList.add('active');

  if (tabName === 'history') {
    renderHistory();
  }
}

// Check if we're on a shopping site
async function checkCurrentPage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab && tab.url && tab.id) {
      const url = new URL(tab.url);
      const hostname = url.hostname.toLowerCase();
      
      const shoppingSites = ['amazon', 'flipkart', 'ebay', 'walmart', 'aliexpress', 'etsy', 'shopify'];
      const isShoppingSite = shoppingSites.some(site => hostname.includes(site));
      
      if (isShoppingSite) {
        // Try to send message first, inject only if needed
        chrome.tabs.sendMessage(tab.id, { action: 'getProductData' }, (response) => {
          if (chrome.runtime.lastError) {
            // Content script not loaded, inject it
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ['content.js']
            }).then(() => {
              // Wait a bit for script to load, then request product data
              setTimeout(() => {
                chrome.tabs.sendMessage(tab.id, { action: 'getProductData' }, (response) => {
                  if (chrome.runtime.lastError) {
                    return;
                  }
                  if (response && response.product) {
                    displayCurrentProduct(response.product);
                  }
                });
              }, 200);
            }).catch(e => {
              // Silently handle injection errors
            });
          } else if (response && response.product) {
            displayCurrentProduct(response.product);
          }
        });
      }
    }
  } catch (error) {
    console.error('Error checking current page:', error);
  }
}

// Display detected product
function displayCurrentProduct(product) {
  const productDiv = document.getElementById('currentProduct');
  const productName = document.getElementById('productName');
  const productCategory = document.getElementById('productCategory');
  
  productName.textContent = product.name || 'Product detected';
  productCategory.textContent = `Category: ${product.category || 'Unknown'}`;
  
  // Auto-fill form if data available
  if (product.category) {
    document.getElementById('category').value = product.category;
  }
  if (product.weight) {
    document.getElementById('weight').value = product.weight;
  }
  
  productDiv.style.display = 'block';
}

// Calculate carbon footprint
function calculateFootprint() {
  const category = document.getElementById('category').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const distance = parseFloat(document.getElementById('distance').value);
  const transport = document.getElementById('transport').value;

  // Validate inputs
  if (!category) {
    alert('Please select a product category');
    return;
  }
  
  if (!weight || isNaN(weight) || weight <= 0 || weight > 1000) {
    alert('Please enter a valid weight between 0.01 and 1000 kg');
    return;
  }
  
  if (!distance || isNaN(distance) || distance <= 0 || distance > 50000) {
    alert('Please enter a valid distance between 1 and 50000 km');
    return;
  }
  
  if (!transport) {
    alert('Please select a transport mode');
    return;
  }

  // Calculate emissions with safety checks
  const productFactor = EMISSION_FACTORS.products[category]?.factor || EMISSION_FACTORS.products.other.factor;
  const transportFactor = EMISSION_FACTORS.transport[transport]?.factor || EMISSION_FACTORS.transport.van.factor;
  
  const productEmission = weight * productFactor;
  const packagingEmission = weight * EMISSION_FACTORS.packaging.standard;
  const deliveryEmission = weight * distance * transportFactor;
  const totalEmission = productEmission + packagingEmission + deliveryEmission;

  // Trees needed (1 tree absorbs ~21 kg CO2 per year)
  const treesNeeded = (totalEmission / 21).toFixed(1);

  // Display results
  document.getElementById('totalEmission').textContent = totalEmission.toFixed(2);
  document.getElementById('treeOffset').textContent = treesNeeded;
  document.getElementById('productEmission').textContent = productEmission.toFixed(2);
  document.getElementById('packagingEmission').textContent = packagingEmission.toFixed(2);
  document.getElementById('deliveryEmission').textContent = deliveryEmission.toFixed(2);
  document.getElementById('result').style.display = 'block';

  // Save calculation
  const calculation = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    category,
    weight,
    distance,
    transport,
    productEmission: parseFloat(productEmission.toFixed(2)),
    packagingEmission: parseFloat(packagingEmission.toFixed(2)),
    deliveryEmission: parseFloat(deliveryEmission.toFixed(2)),
    totalEmission: parseFloat(totalEmission.toFixed(2)),
    treesNeeded: parseFloat(treesNeeded)
  };

  calculations.push(calculation);
  saveCalculations();
  updateStats();
}

// Load calculations from storage
async function loadCalculations() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['calculations'], (result) => {
      calculations = result.calculations || [];
      resolve();
    });
  });
}

// Save calculations to storage
function saveCalculations() {
  chrome.storage.local.set({ calculations });
}

// Update statistics
function updateStats() {
  const totalCalculations = calculations.length;
  const totalEmissions = calculations.reduce((sum, calc) => sum + calc.totalEmission, 0);
  const avgEmission = totalCalculations > 0 ? totalEmissions / totalCalculations : 0;
  const treesNeeded = (totalEmissions / 21).toFixed(0);

  document.getElementById('totalCalculations').textContent = totalCalculations;
  document.getElementById('totalEmissions').textContent = totalEmissions.toFixed(1);
  document.getElementById('avgEmission').textContent = avgEmission.toFixed(1);
  document.getElementById('treesNeeded').textContent = treesNeeded;
}

// Render history
function renderHistory() {
  const historyList = document.getElementById('historyList');
  const historyEmpty = document.getElementById('historyEmpty');

  if (calculations.length === 0) {
    historyList.innerHTML = '';
    historyEmpty.style.display = 'block';
    return;
  }

  historyEmpty.style.display = 'none';
  
  // Show most recent first
  const sortedCalcs = [...calculations].reverse();
  
  historyList.innerHTML = sortedCalcs.map(calc => {
    const date = new Date(calc.timestamp);
    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return `
      <div class="history-item">
        <div class="history-header">
          <span class="history-name">${getCategoryName(calc.category)}</span>
          <span class="history-emission">${calc.totalEmission} kg CO₂e</span>
        </div>
        <div class="history-details">
          ${calc.weight}kg • ${calc.distance}km • ${getTransportName(calc.transport)} • ${formattedDate}
        </div>
      </div>
    `;
  }).join('');
}

// Export data to CSV
function exportData() {
  if (calculations.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = ['Timestamp', 'Category', 'Weight (kg)', 'Distance (km)', 'Transport', 
                   'Product Emission', 'Packaging Emission', 'Delivery Emission', 
                   'Total Emission', 'Trees Needed'];
  
  const rows = calculations.map(calc => [
    calc.timestamp,
    calc.category,
    calc.weight,
    calc.distance,
    calc.transport,
    calc.productEmission,
    calc.packagingEmission,
    calc.deliveryEmission,
    calc.totalEmission,
    calc.treesNeeded
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ecotrace-data-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Helper functions
function getCategoryName(category) {
  const names = {
    electronics: 'Electronics',
    clothing: 'Clothing',
    books: 'Books',
    'food-fresh': 'Fresh Food',
    'food-processed': 'Processed Food',
    furniture: 'Furniture',
    toys: 'Toys',
    cosmetics: 'Cosmetics',
    sports: 'Sports Equipment',
    other: 'Other'
  };
  return names[category] || category;
}

function getTransportName(transport) {
  const names = {
    van: 'Van',
    bike: 'Bike',
    truck: 'Truck',
    air: 'Air',
    train: 'Train',
    ship: 'Ship'
  };
  return names[transport] || transport;
}

// Update Distance Based on Selected Type
function updateDistanceFromType() {
  const distanceType = document.getElementById('distanceType');
  const distanceInput = document.getElementById('distance');
  const distanceHint = document.getElementById('distanceHint');
  
  const type = distanceType.value;
  const range = DISTANCE_RANGES[type];
  
  if (type === 'custom') {
    distanceInput.disabled = false;
    distanceInput.focus();
    distanceHint.textContent = 'Enter your distance';
  } else {
    distanceInput.disabled = false; // Allow manual adjustment
    distanceInput.value = range.avg;
    distanceHint.textContent = `${range.description} (${range.min}-${range.max} km, avg: ${range.avg} km)`;
  }
}
