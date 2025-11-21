// Content script for extracting product data from e-commerce sites
// Prevent duplicate injection
if (window.ecoTraceContentLoaded) {
  // Already loaded, exit
} else {
  window.ecoTraceContentLoaded = true;
}

// Product data extraction functions for different platforms
const extractors = {
  amazon: () => {
    const name = document.querySelector('#productTitle')?.textContent.trim();
    const price = document.querySelector('.a-price .a-offscreen')?.textContent;
    
    // Try multiple category selectors
    let category = document.querySelector('#wayfinding-breadcrumbs_feature_div a:last-child')?.textContent ||
                   document.querySelector('.a-unordered-list.a-nostyle.a-horizontal a')?.textContent ||
                   document.querySelector('[data-cel-widget="breadcrumbs"] a:last-of-type')?.textContent ||
                   document.querySelector('.a-breadcrumb a')?.textContent;
    
    const weight = extractWeight(document.body.textContent);
    
    return { name, price, category: mapCategory(category), weight };
  },

  flipkart: () => {
    const name = document.querySelector('h1 span')?.textContent.trim();
    const price = document.querySelector('._30jeq3')?.textContent;
    const category = document.querySelector('._1HEvv0 a')?.textContent;
    const weight = extractWeight(document.body.textContent);
    
    return { name, price, category: mapCategory(category), weight };
  },

  ebay: () => {
    const name = document.querySelector('h1.x-item-title__mainTitle')?.textContent.trim();
    const price = document.querySelector('.x-price-primary span')?.textContent;
    const category = document.querySelector('.seo-breadcrumb-text span')?.textContent;
    const weight = extractWeight(document.body.textContent);
    
    return { name, price, category: mapCategory(category), weight };
  },

  walmart: () => {
    const name = document.querySelector('h1[itemprop="name"]')?.textContent.trim();
    const price = document.querySelector('[itemprop="price"]')?.textContent;
    const category = document.querySelector('.breadcrumb a')?.textContent;
    const weight = extractWeight(document.body.textContent);
    
    return { name, price, category: mapCategory(category), weight };
  },

  aliexpress: () => {
    const name = document.querySelector('h1')?.textContent.trim();
    const price = document.querySelector('.product-price-value')?.textContent;
    const category = document.querySelector('.breadcrumb a')?.textContent;
    const weight = extractWeight(document.body.textContent);
    
    return { name, price, category: mapCategory(category), weight };
  },

  etsy: () => {
    const name = document.querySelector('h1')?.textContent.trim();
    const price = document.querySelector('p[class*="price"]')?.textContent;
    const category = document.querySelector('nav[aria-label="breadcrumb"] a')?.textContent;
    const weight = extractWeight(document.body.textContent);
    
    return { name, price, category: mapCategory(category), weight };
  },

  shopify: () => {
    const name = document.querySelector('h1.product-single__title')?.textContent.trim() ||
                 document.querySelector('.product__title')?.textContent.trim();
    const price = document.querySelector('.product__price')?.textContent ||
                  document.querySelector('.price')?.textContent;
    const category = document.querySelector('.breadcrumb a')?.textContent;
    const weight = extractWeight(document.body.textContent);
    
    return { name, price, category: mapCategory(category), weight };
  }
};

// Extract weight from text using patterns
function extractWeight(text) {
  if (!text) return null;
  
  // Look for weight patterns like "1.5 kg", "500g", "2.3 lbs", etc.
  const patterns = [
    /(?:item weight|product weight|weight|shipping weight|net weight)[:\s]*([\d,.]+)\s*(kg|kilograms?)/gi,
    /(?:item weight|product weight|weight|shipping weight|net weight)[:\s]*([\d,.]+)\s*(g|grams?)(?!allons?)/gi,
    /(?:item weight|product weight|weight|shipping weight|net weight)[:\s]*([\d,.]+)\s*(lbs?|pounds?)/gi,
    /(?:item weight|product weight|weight|shipping weight|net weight)[:\s]*([\d,.]+)\s*(oz|ounces?)/gi,
    /(\d+[.,]\d+)\s*(kg|kilograms?)/gi,
    /(\d+[.,]\d+)\s*(g|grams?)(?!allons?)/gi,
    /(\d+[.,]\d+)\s*(lbs?|pounds?)/gi,
    /(\d+[.,]\d+)\s*(oz|ounces?)/gi
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      // Get the numeric value
      let weight = parseFloat(match[1].replace(',', '.'));
      const unit = match[2].toLowerCase();
      
      // Skip unrealistic weights
      if (weight <= 0 || weight > 10000) continue;
      
      // Convert to kg
      if (unit.includes('g') && !unit.includes('kg')) {
        weight = weight / 1000;
      } else if (unit.includes('lb') || unit.includes('pound')) {
        weight = weight * 0.453592;
      } else if (unit.includes('oz') || unit.includes('ounce')) {
        weight = weight * 0.0283495;
      }
      
      // Skip if converted weight is unrealistic
      if (weight > 0 && weight < 500) {
        return parseFloat(weight.toFixed(3));
      }
    }
  }
  
  return null;
}

// Map product categories to our standard categories
function mapCategory(category) {
  if (!category || category.trim() === '') return 'other';
  
  const categoryLower = category.toLowerCase().trim();
  
  const mappings = {
    electronics: ['electronic', 'computer', 'phone', 'mobile', 'laptop', 'tablet', 'camera', 'headphone', 'speaker', 'tv', 'television', 'monitor', 'audio', 'video', 'gaming', 'console', 'smartwatch', 'earphone', 'charger', 'cable'],
    clothing: ['clothing', 'apparel', 'fashion', 'shirt', 'pant', 't-shirt', 'jeans', 'dress', 'shoe', 'footwear', 'accessory', 'wear', 'jacket', 'coat', 'sweater', 'shorts', 'skirt', 'sock', 'hat', 'cap', 'belt', 'bag', 'handbag'],
    books: ['book', 'magazine', 'publication', 'reading', 'novel', 'textbook', 'comic', 'kindle'],
    'food-fresh': ['fresh', 'produce', 'fruit', 'vegetable', 'meat', 'dairy', 'organic', 'farm'],
    'food-processed': ['food', 'snack', 'beverage', 'drink', 'grocery', 'packaged', 'canned', 'frozen', 'cereal', 'pasta', 'rice'],
    furniture: ['furniture', 'home', 'decor', 'furnishing', 'chair', 'table', 'desk', 'bed', 'sofa', 'cabinet', 'shelf', 'mattress'],
    toys: ['toy', 'game', 'puzzle', 'kids', 'children', 'baby', 'doll', 'action figure', 'lego', 'board game'],
    cosmetics: ['beauty', 'cosmetic', 'skincare', 'makeup', 'personal care', 'perfume', 'fragrance', 'lotion', 'cream', 'shampoo', 'soap'],
    sports: ['sport', 'fitness', 'outdoor', 'athletic', 'exercise', 'gym', 'yoga', 'running', 'cycling', 'camping', 'hiking']
  };

  for (const [key, keywords] of Object.entries(mappings)) {
    if (keywords.some(keyword => categoryLower.includes(keyword))) {
      return key;
    }
  }
  
  return 'other';
}

// Detect which platform we're on
function detectPlatform() {
  const hostname = window.location.hostname.toLowerCase();
  
  if (hostname.includes('amazon')) return 'amazon';
  if (hostname.includes('flipkart')) return 'flipkart';
  if (hostname.includes('ebay')) return 'ebay';
  if (hostname.includes('walmart')) return 'walmart';
  if (hostname.includes('aliexpress')) return 'aliexpress';
  if (hostname.includes('etsy')) return 'etsy';
  if (hostname.includes('myshopify') || hostname.includes('shopify')) return 'shopify';
  
  return null;
}

// Extract product data
function extractProductData() {
  const platform = detectPlatform();
  
  if (!platform || !extractors[platform]) {
    return null;
  }
  
  try {
    const data = extractors[platform]();
    
    if (!data) {
      return null;
    }
    
    // Add platform info
    data.platform = platform;
    data.url = window.location.href;
    data.extractedAt = new Date().toISOString();
    
    // Estimate weight if not found (very rough estimates based on category)
    if (!data.weight && data.category) {
      const estimatedWeights = {
        electronics: 0.5,
        clothing: 0.3,
        books: 0.5,
        'food-fresh': 1.0,
        'food-processed': 0.5,
        furniture: 10.0,
        toys: 0.5,
        cosmetics: 0.2,
        sports: 1.5,
        other: 0.5
      };
      data.weight = estimatedWeights[data.category] || 0.5;
      data.weightEstimated = true;
    }
    
    return data;
  } catch (error) {
    return null;
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getProductData') {
    const productData = extractProductData();
    sendResponse({ product: productData });
  }
  return true;
});

// Add floating carbon footprint widget to product pages
function addCarbonWidget() {
  const platform = detectPlatform();
  if (!platform) return;

  // Check if we're on a product page
  const isProductPage = 
    document.querySelector('#productTitle') || // Amazon
    document.querySelector('h1 span') || // Flipkart
    document.querySelector('h1.x-item-title__mainTitle') || // eBay
    document.querySelector('h1[itemprop="name"]') || // Walmart
    document.querySelector('.product-price-value'); // AliExpress

  if (!isProductPage) return;

  // Create widget
  const widget = document.createElement('div');
  widget.id = 'ecotrace-widget';
  widget.innerHTML = `
    <style>
      #ecotrace-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        max-width: 280px;
        cursor: pointer;
        transition: transform 0.2s;
      }
      #ecotrace-widget:hover {
        transform: translateY(-2px);
      }
      #ecotrace-widget-header {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      #ecotrace-widget-content {
        font-size: 12px;
        opacity: 0.9;
      }
      #ecotrace-widget-close {
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 12px;
        line-height: 1;
      }
    </style>
    <button id="ecotrace-widget-close">×</button>
    <div id="ecotrace-widget-header">
      🌱 EcoTrace
    </div>
    <div id="ecotrace-widget-content">
      Click to calculate the carbon footprint of this product!
    </div>
  `;

  document.body.appendChild(widget);

  // Close button
  document.getElementById('ecotrace-widget-close').addEventListener('click', (e) => {
    e.stopPropagation();
    widget.remove();
  });

  // Widget click - open extension popup
  widget.addEventListener('click', () => {
    // This will be handled by the user clicking the extension icon
    alert('Click the EcoTrace extension icon to calculate the carbon footprint!');
  });
}

// Initialize widget after page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addCarbonWidget);
} else {
  addCarbonWidget();
}

// Monitor for page changes (for single-page applications)
let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    setTimeout(addCarbonWidget, 1000);
  }
}).observe(document, { subtree: true, childList: true });
