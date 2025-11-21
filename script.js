/* ============================================
   Professional Carbon Footprint Analyzer
   Advanced Features & Analytics
   ============================================ */

// Enhanced Emission Factors with More Categories
const EMISSION_FACTORS = {
  version: 'v2.0',
  updated: '2025-11-20',
  sources: ['DEFRA 2024', 'GLEC Framework', 'Ecoinvent 3.8'],
  
  products: {
    'electronics': { factor: 50, description: 'Electronics & Tech Devices', icon: 'laptop' },
    'clothing': { factor: 10, description: 'Apparel & Textiles', icon: 'tshirt' },
    'books': { factor: 2, description: 'Books & Media', icon: 'book' },
    'food-fresh': { factor: 3, description: 'Fresh Food & Produce', icon: 'apple-alt' },
    'food-processed': { factor: 5, description: 'Processed Food', icon: 'cookie' },
    'furniture': { factor: 25, description: 'Furniture & Home Goods', icon: 'couch' },
    'toys': { factor: 15, description: 'Toys & Games', icon: 'puzzle-piece' },
    'cosmetics': { factor: 8, description: 'Beauty & Personal Care', icon: 'pump-soap' },
    'sports': { factor: 12, description: 'Sports Equipment', icon: 'football-ball' },
    'other': { factor: 7, description: 'Other Products', icon: 'box' }
  },
  
  packaging: {
    'cardboard': { factor: 0.5, description: 'Cardboard Box', icon: 'box' },
    'plastic': { factor: 1.2, description: 'Plastic Packaging', icon: 'recycle' },
    'minimal': { factor: 0.2, description: 'Minimal/Paper', icon: 'leaf' },
    'bubble-wrap': { factor: 0.9, description: 'Bubble Wrap + Box', icon: 'boxes' },
    'eco-friendly': { factor: 0.15, description: 'Eco-Friendly Materials', icon: 'seedling' }
  },
  
  transport: {
    'bike': { factor: 0.02, description: 'Bicycle/E-bike', icon: 'bicycle', speed: 15 },
    'van': { factor: 0.2, description: 'Delivery Van', icon: 'shuttle-van', speed: 40 },
    'truck': { factor: 0.15, description: 'Freight Truck', icon: 'truck', speed: 50 },
    'air': { factor: 1.2, description: 'Air Freight', icon: 'plane', speed: 500 },
    'train': { factor: 0.05, description: 'Rail Transport', icon: 'train', speed: 80 },
    'ship': { factor: 0.01, description: 'Sea Freight', icon: 'ship', speed: 25 }
  }
};

// Application State
let appState = {
  calculations: [],
  currentResult: null,
  theme: localStorage.getItem('theme') || 'light',
  charts: {}
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

// DOM Elements
const elements = {
  // Form inputs
  category: document.getElementById('category'),
  weight: document.getElementById('weight'),
  packaging: document.getElementById('packaging'),
  distance: document.getElementById('distance'),
  distanceType: document.getElementById('distanceType'),
  distanceHint: document.getElementById('distanceHint'),
  transport: document.getElementById('transport'),
  quantity: document.getElementById('quantity'),
  consolidate: document.getElementById('consolidate'),
  returnShipment: document.getElementById('returnShipment'),
  ecoPackaging: document.getElementById('ecoPackaging'),
  orderName: document.getElementById('orderName'),
  
  // Buttons
  calcBtn: document.getElementById('calcBtn'),
  resetBtn: document.getElementById('resetBtn'),
  themeToggle: document.getElementById('themeToggle'),
  exportBtn: document.getElementById('exportBtn'),
  clearHistoryBtn: document.getElementById('clearHistoryBtn'),
  
  // Display areas
  resultContent: document.getElementById('resultContent'),
  historyTable: document.getElementById('historyTable'),
  comparisonGrid: document.getElementById('comparisonGrid'),
  recommendations: document.getElementById('recommendations'),
  
  // Stats
  totalCalculations: document.getElementById('totalCalculations'),
  totalEmissions: document.getElementById('totalEmissions'),
  treeEquivalent: document.getElementById('treeEquivalent')
};

// Initialize Application
function init() {
  populateSelects();
  loadHistory();
  updateStats();
  initTheme();
  attachEventListeners();
  initCharts();
  showComparison();
}

// Populate Select Dropdowns
function populateSelects() {
  // Products
  Object.entries(EMISSION_FACTORS.products).forEach(([key, data]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = data.description;
    elements.category.appendChild(option);
  });
  
  // Packaging
  Object.entries(EMISSION_FACTORS.packaging).forEach(([key, data]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = data.description;
    elements.packaging.appendChild(option);
  });
  
  // Transport
  Object.entries(EMISSION_FACTORS.transport).forEach(([key, data]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = data.description;
    elements.transport.appendChild(option);
  });
}

// Calculate Carbon Footprint
function calculate() {
  const inputs = {
    category: elements.category.value,
    weight: parseFloat(elements.weight.value) || 0,
    packaging: elements.packaging.value,
    distance: parseFloat(elements.distance.value) || 0,
    transport: elements.transport.value,
    quantity: parseInt(elements.quantity.value) || 1,
    consolidate: elements.consolidate.checked,
    returnShipment: elements.returnShipment.checked,
    ecoPackaging: elements.ecoPackaging.checked,
    orderName: elements.orderName.value || 'Unnamed Order'
  };
  
  // Validate inputs
  if (!inputs.category || !inputs.packaging || !inputs.transport) {
    alert('Please fill in all required fields');
    return;
  }
  
  // Product emission
  const productFactor = EMISSION_FACTORS.products[inputs.category].factor;
  const productEmission = productFactor * inputs.weight * inputs.quantity;
  
  // Packaging emission
  const packagingWeight = Math.max(0.01, inputs.weight * 0.1);
  let packagingFactor = EMISSION_FACTORS.packaging[inputs.packaging].factor;
  if (inputs.ecoPackaging) packagingFactor *= 0.5; // 50% reduction for eco-friendly
  const packagingEmission = packagingFactor * packagingWeight * inputs.quantity;
  
  // Delivery emission
  const transportFactor = EMISSION_FACTORS.transport[inputs.transport].factor;
  const consolidationFactor = inputs.consolidate ? 2 : 1;
  const returnFactor = inputs.returnShipment ? 2 : 1;
  const deliveryEmission = (transportFactor * inputs.distance * inputs.quantity * returnFactor) / consolidationFactor;
  
  // Total
  const total = productEmission + packagingEmission + deliveryEmission;
  
  // Estimated delivery time (hours)
  const speed = EMISSION_FACTORS.transport[inputs.transport].speed;
  const deliveryTime = inputs.distance / speed;
  
  const result = {
    timestamp: new Date().toISOString(),
    inputs,
    emissions: {
      product: parseFloat(productEmission.toFixed(3)),
      packaging: parseFloat(packagingEmission.toFixed(3)),
      delivery: parseFloat(deliveryEmission.toFixed(3)),
      total: parseFloat(total.toFixed(3))
    },
    deliveryTime: parseFloat(deliveryTime.toFixed(1)),
    treeOffset: parseFloat((total / 20).toFixed(2)) // ~20kg CO2 per tree per year
  };
  
  appState.currentResult = result;
  saveCalculation(result);
  displayResult(result);
  updateStats();
  updateCharts();
  showRecommendations(result);
  showComparison();
}

// Display Result
function displayResult(result) {
  const { emissions, inputs, deliveryTime, treeOffset } = result;
  
  const html = `
    <div class="impact-summary">
      <div class="impact-label">Total Carbon Footprint</div>
      <div class="impact-value">${emissions.total} <span style="font-size: 1.5rem">kg CO₂e</span></div>
      <div class="impact-label">≈ ${treeOffset} trees needed to offset annually</div>
    </div>
    
    <div class="breakdown-grid">
      <div class="breakdown-item">
        <div class="breakdown-label">
          <i class="fas fa-box"></i>
          Product Manufacturing
        </div>
        <div class="breakdown-value">${emissions.product} kg</div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${(emissions.product / emissions.total * 100)}%"></div>
      </div>
      
      <div class="breakdown-item">
        <div class="breakdown-label">
          <i class="fas fa-box-open"></i>
          Packaging
        </div>
        <div class="breakdown-value">${emissions.packaging} kg</div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${(emissions.packaging / emissions.total * 100)}%"></div>
      </div>
      
      <div class="breakdown-item">
        <div class="breakdown-label">
          <i class="fas fa-truck"></i>
          Delivery & Transport
        </div>
        <div class="breakdown-value">${emissions.delivery} kg</div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${(emissions.delivery / emissions.total * 100)}%"></div>
      </div>
    </div>
    
    <div style="margin-top: 1.5rem; padding: 1rem; background: var(--bg-primary); border-radius: var(--radius-md);">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: center;">
        <div>
          <i class="fas fa-clock" style="color: var(--primary);"></i>
          <div style="font-size: 1.5rem; font-weight: 700; margin-top: 0.5rem;">${deliveryTime}h</div>
          <div style="font-size: 0.875rem; color: var(--text-secondary);">Est. Delivery Time</div>
        </div>
        <div>
          <i class="fas fa-boxes" style="color: var(--primary);"></i>
          <div style="font-size: 1.5rem; font-weight: 700; margin-top: 0.5rem;">${inputs.quantity}</div>
          <div style="font-size: 0.875rem; color: var(--text-secondary);">Items Ordered</div>
        </div>
      </div>
    </div>
  `;
  
  elements.resultContent.innerHTML = html;
}

// Save Calculation to History
function saveCalculation(result) {
  appState.calculations.unshift(result);
  if (appState.calculations.length > 50) {
    appState.calculations = appState.calculations.slice(0, 50);
  }
  localStorage.setItem('calculations', JSON.stringify(appState.calculations));
  displayHistory();
}

// Load History from LocalStorage
function loadHistory() {
  const saved = localStorage.getItem('calculations');
  if (saved) {
    appState.calculations = JSON.parse(saved);
    displayHistory();
  }
}

// Display History Table
function displayHistory() {
  if (appState.calculations.length === 0) {
    elements.historyTable.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No calculations yet. Start by calculating your first order!</p>';
    return;
  }
  
  const rows = appState.calculations.map((calc, index) => {
    const date = new Date(calc.timestamp).toLocaleString();
    const badge = calc.emissions.total < 5 ? 'badge-success' : calc.emissions.total < 15 ? 'badge-warning' : 'badge-danger';
    const rating = calc.emissions.total < 5 ? 'Low' : calc.emissions.total < 15 ? 'Medium' : 'High';
    
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${calc.inputs.orderName}</td>
        <td>${EMISSION_FACTORS.products[calc.inputs.category].description}</td>
        <td>${calc.inputs.weight} kg</td>
        <td>${calc.inputs.distance} km</td>
        <td>${EMISSION_FACTORS.transport[calc.inputs.transport].description}</td>
        <td><strong>${calc.emissions.total} kg</strong></td>
        <td><span class="badge ${badge}">${rating}</span></td>
        <td style="font-size: 0.75rem; color: var(--text-muted);">${date}</td>
      </tr>
    `;
  }).join('');
  
  elements.historyTable.innerHTML = `
    <div style="overflow-x: auto;">
      <table class="history-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Order</th>
            <th>Category</th>
            <th>Weight</th>
            <th>Distance</th>
            <th>Transport</th>
            <th>CO₂e</th>
            <th>Impact</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

// Update Statistics
function updateStats() {
  const totalCalcs = appState.calculations.length;
  const totalEmissions = appState.calculations.reduce((sum, calc) => sum + calc.emissions.total, 0);
  const totalTrees = totalEmissions / 20;
  
  elements.totalCalculations.textContent = totalCalcs;
  elements.totalEmissions.textContent = totalEmissions.toFixed(1);
  elements.treeEquivalent.textContent = totalTrees.toFixed(1);
}

// Show Recommendations
function showRecommendations(result) {
  const recommendations = [];
  
  // Delivery recommendations
  if (result.inputs.transport === 'air') {
    recommendations.push({
      type: 'warning',
      icon: 'plane',
      title: 'Air Freight Has High Impact',
      message: 'Consider ground transport to reduce emissions by up to 90%',
      savings: (result.emissions.delivery * 0.9).toFixed(2)
    });
  }
  
  if (!result.inputs.consolidate) {
    recommendations.push({
      type: 'success',
      icon: 'boxes',
      title: 'Consolidate Your Orders',
      message: 'Combining deliveries can reduce transport emissions by 50%',
      savings: (result.emissions.delivery * 0.5).toFixed(2)
    });
  }
  
  if (result.inputs.returnShipment) {
    recommendations.push({
      type: 'warning',
      icon: 'undo',
      title: 'Return Shipment Doubles Impact',
      message: 'Consider local pickup or final sale items to avoid return emissions',
      savings: (result.emissions.delivery * 0.5).toFixed(2)
    });
  }
  
  // Packaging recommendations
  if (result.inputs.packaging === 'plastic' || result.inputs.packaging === 'bubble-wrap') {
    recommendations.push({
      type: 'success',
      icon: 'leaf',
      title: 'Choose Eco-Friendly Packaging',
      message: 'Opt for recyclable or minimal packaging to reduce waste',
      savings: (result.emissions.packaging * 0.6).toFixed(2)
    });
  }
  
  // General recommendations
  if (result.emissions.total > 10) {
    recommendations.push({
      type: 'warning',
      icon: 'exclamation-triangle',
      title: 'High Carbon Footprint',
      message: 'Consider carbon offset programs or choose local alternatives',
      savings: null
    });
  }
  
  const html = recommendations.map(rec => `
    <div class="recommendation-item ${rec.type}">
      <i class="fas fa-${rec.icon}"></i>
      <div class="recommendation-content">
        <h4>${rec.title}</h4>
        <p>${rec.message}</p>
        ${rec.savings ? `<div class="savings">Potential savings: ${rec.savings} kg CO₂e</div>` : ''}
      </div>
    </div>
  `).join('');
  
  elements.recommendations.innerHTML = html || '<p style="text-align: center; color: var(--text-muted);">Calculate an order to see recommendations</p>';
}

// Show Scenario Comparison
function showComparison() {
  if (!appState.currentResult) {
    elements.comparisonGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">Calculate an order to see alternative scenarios</p>';
    return;
  }
  
  const base = appState.currentResult;
  const scenarios = [];
  
  // Scenario 1: Standard delivery
  const standard = calculateScenario(base.inputs, { transport: 'van' });
  scenarios.push({
    title: 'Standard Van Delivery',
    icon: 'shuttle-van',
    emissions: standard,
    time: base.inputs.distance / 40
  });
  
  // Scenario 2: Eco-friendly
  const eco = calculateScenario(base.inputs, { transport: 'bike', ecoPackaging: true });
  scenarios.push({
    title: 'Eco-Friendly (Bike)',
    icon: 'bicycle',
    emissions: eco,
    time: base.inputs.distance / 15
  });
  
  // Scenario 3: Express air
  const express = calculateScenario(base.inputs, { transport: 'air' });
  scenarios.push({
    title: 'Express Air Freight',
    icon: 'plane',
    emissions: express,
    time: base.inputs.distance / 500
  });
  
  // Scenario 4: Consolidated
  const consolidated = calculateScenario(base.inputs, { consolidate: true });
  scenarios.push({
    title: 'Consolidated Delivery',
    icon: 'boxes',
    emissions: consolidated,
    time: base.inputs.distance / 40 + 24 // Add 1 day for consolidation
  });
  
  // Find best option
  const minEmissions = Math.min(...scenarios.map(s => s.emissions));
  
  const html = scenarios.map(scenario => {
    const isBest = scenario.emissions === minEmissions;
    return `
      <div class="comparison-card ${isBest ? 'best' : ''}">
        <div class="comparison-header">
          <div class="comparison-title">
            <i class="fas fa-${scenario.icon}"></i> ${scenario.title}
          </div>
          ${isBest ? '<span class="badge badge-success">Best</span>' : ''}
        </div>
        <div class="comparison-value">${scenario.emissions} kg CO₂e</div>
        <div class="comparison-details">
          <div><i class="fas fa-clock"></i> ~${scenario.time.toFixed(1)} hours</div>
          <div><i class="fas fa-chart-line"></i> ${((scenario.emissions / base.emissions.total - 1) * 100).toFixed(0)}% vs current</div>
        </div>
      </div>
    `;
  }).join('');
  
  elements.comparisonGrid.innerHTML = html;
}

// Calculate Alternative Scenario
function calculateScenario(inputs, changes) {
  const modified = { ...inputs, ...changes };
  
  const productFactor = EMISSION_FACTORS.products[modified.category].factor;
  const productEmission = productFactor * modified.weight * modified.quantity;
  
  const packagingWeight = Math.max(0.01, modified.weight * 0.1);
  let packagingFactor = EMISSION_FACTORS.packaging[modified.packaging].factor;
  if (modified.ecoPackaging) packagingFactor *= 0.5;
  const packagingEmission = packagingFactor * packagingWeight * modified.quantity;
  
  const transportFactor = EMISSION_FACTORS.transport[modified.transport].factor;
  const consolidationFactor = modified.consolidate ? 2 : 1;
  const returnFactor = modified.returnShipment ? 2 : 1;
  const deliveryEmission = (transportFactor * modified.distance * modified.quantity * returnFactor) / consolidationFactor;
  
  return parseFloat((productEmission + packagingEmission + deliveryEmission).toFixed(3));
}

// Initialize Charts
function initCharts() {
  // Breakdown Chart (Doughnut)
  const breakdownCtx = document.getElementById('breakdownChart');
  if (breakdownCtx) {
    appState.charts.breakdown = new Chart(breakdownCtx, {
      type: 'doughnut',
      data: {
        labels: ['Product', 'Packaging', 'Delivery'],
        datasets: [{
          data: [0, 0, 0],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
  
  // Timeline Chart (Line)
  const timelineCtx = document.getElementById('timelineChart');
  if (timelineCtx) {
    appState.charts.timeline = new Chart(timelineCtx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Emissions (kg CO₂e)',
          data: [],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  
  // Category Chart (Bar)
  const categoryCtx = document.getElementById('categoryChart');
  if (categoryCtx) {
    appState.charts.category = new Chart(categoryCtx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Total Emissions',
          data: [],
          backgroundColor: '#3b82f6'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  
  // Transport Chart (Polar)
  const transportCtx = document.getElementById('transportChart');
  if (transportCtx) {
    appState.charts.transport = new Chart(transportCtx, {
      type: 'polarArea',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}

// Update Charts
function updateCharts() {
  if (!appState.currentResult) return;
  
  // Update Breakdown Chart
  if (appState.charts.breakdown) {
    const { product, packaging, delivery } = appState.currentResult.emissions;
    appState.charts.breakdown.data.datasets[0].data = [product, packaging, delivery];
    appState.charts.breakdown.update();
  }
  
  // Update Timeline Chart
  if (appState.charts.timeline) {
    const last10 = appState.calculations.slice(0, 10).reverse();
    const labels = last10.map((_, i) => `Order ${i + 1}`);
    const data = last10.map(calc => calc.emissions.total);
    
    appState.charts.timeline.data.labels = labels;
    appState.charts.timeline.data.datasets[0].data = data;
    appState.charts.timeline.update();
  }
  
  // Update Category Chart
  if (appState.charts.category) {
    const categoryTotals = {};
    appState.calculations.forEach(calc => {
      const cat = calc.inputs.category;
      categoryTotals[cat] = (categoryTotals[cat] || 0) + calc.emissions.total;
    });
    
    const labels = Object.keys(categoryTotals).map(key => EMISSION_FACTORS.products[key].description);
    const data = Object.values(categoryTotals);
    
    appState.charts.category.data.labels = labels;
    appState.charts.category.data.datasets[0].data = data;
    appState.charts.category.update();
  }
  
  // Update Transport Chart
  if (appState.charts.transport) {
    const transportTotals = {};
    appState.calculations.forEach(calc => {
      const trans = calc.inputs.transport;
      transportTotals[trans] = (transportTotals[trans] || 0) + calc.emissions.delivery;
    });
    
    const labels = Object.keys(transportTotals).map(key => EMISSION_FACTORS.transport[key].description);
    const data = Object.values(transportTotals);
    
    appState.charts.transport.data.labels = labels;
    appState.charts.transport.data.datasets[0].data = data;
    appState.charts.transport.update();
  }
}

// Theme Management
function initTheme() {
  document.documentElement.setAttribute('data-theme', appState.theme);
  updateThemeIcon();
}

function toggleTheme() {
  appState.theme = appState.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', appState.theme);
  localStorage.setItem('theme', appState.theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = elements.themeToggle.querySelector('i');
  icon.className = appState.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Export Data
function exportData() {
  if (appState.calculations.length === 0) {
    alert('No data to export. Calculate some orders first!');
    return;
  }
  
  // Create CSV
  const headers = ['Date', 'Order Name', 'Category', 'Weight (kg)', 'Distance (km)', 'Transport', 'Total CO2e (kg)', 'Product', 'Packaging', 'Delivery'];
  const rows = appState.calculations.map(calc => [
    new Date(calc.timestamp).toLocaleString(),
    calc.inputs.orderName,
    EMISSION_FACTORS.products[calc.inputs.category].description,
    calc.inputs.weight,
    calc.inputs.distance,
    EMISSION_FACTORS.transport[calc.inputs.transport].description,
    calc.emissions.total,
    calc.emissions.product,
    calc.emissions.packaging,
    calc.emissions.delivery
  ]);
  
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  
  // Download
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `carbon-footprint-data-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Clear History
function clearHistory() {
  if (confirm('Are you sure you want to clear all calculation history? This cannot be undone.')) {
    appState.calculations = [];
    localStorage.removeItem('calculations');
    displayHistory();
    updateStats();
    updateCharts();
    elements.resultContent.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-chart-line"></i>
        <p>Calculate your first order to see results</p>
      </div>
    `;
    alert('History cleared successfully!');
  }
}

// Reset Form
function resetForm() {
  elements.category.selectedIndex = 0;
  elements.weight.value = '0.5';
  elements.packaging.selectedIndex = 0;
  elements.distance.value = '10';
  elements.transport.selectedIndex = 0;
  elements.quantity.value = '1';
  elements.consolidate.checked = false;
  elements.returnShipment.checked = false;
  elements.ecoPackaging.checked = false;
  elements.orderName.value = '';
}

// Event Listeners
function attachEventListeners() {
  elements.calcBtn.addEventListener('click', calculate);
  elements.resetBtn.addEventListener('click', resetForm);
  elements.themeToggle.addEventListener('click', toggleTheme);
  elements.exportBtn.addEventListener('click', exportData);
  elements.clearHistoryBtn.addEventListener('click', clearHistory);
  
  // Distance type selector
  if (elements.distanceType) {
    elements.distanceType.addEventListener('change', updateDistanceFromType);
  }
  
  // Navigation smooth scroll
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}

// Update Distance Based on Selected Type
function updateDistanceFromType() {
  const type = elements.distanceType.value;
  const range = DISTANCE_RANGES[type];
  
  if (type === 'custom') {
    elements.distance.disabled = false;
    elements.distance.focus();
    elements.distanceHint.textContent = 'Enter your distance';
  } else {
    elements.distance.disabled = false; // Allow manual adjustment
    elements.distance.value = range.avg;
    elements.distanceHint.textContent = `${range.description} (${range.min}-${range.max} km, avg: ${range.avg} km)`;
  }
}

// Initialize on DOM Load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}