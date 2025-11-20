// Background service worker for the EcoTrace extension

// Installation listener
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('EcoTrace extension installed');
    
    // Initialize storage
    chrome.storage.local.set({
      calculations: [],
      settings: {
        autoDetect: true,
        showWidget: true,
        defaultTransport: 'van',
        defaultDistance: 50
      }
    });
  } else if (details.reason === 'update') {
    console.log('EcoTrace extension updated');
  }
});

// Message listener for communication between components
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveCalculation') {
    saveCalculation(request.data).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'getCalculations') {
    getCalculations().then((calculations) => {
      sendResponse({ calculations });
    });
    return true;
  }
  
  if (request.action === 'clearCalculations') {
    clearCalculations().then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'getSettings') {
    getSettings().then((settings) => {
      sendResponse({ settings });
    });
    return true;
  }
  
  if (request.action === 'updateSettings') {
    updateSettings(request.settings).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});

// Save calculation to storage
async function saveCalculation(calculation) {
  return new Promise((resolve) => {
    chrome.storage.local.get(['calculations'], (result) => {
      const calculations = result.calculations || [];
      calculations.push(calculation);
      
      chrome.storage.local.set({ calculations }, () => {
        resolve();
      });
    });
  });
}

// Get all calculations
async function getCalculations() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['calculations'], (result) => {
      resolve(result.calculations || []);
    });
  });
}

// Clear all calculations
async function clearCalculations() {
  return new Promise((resolve) => {
    chrome.storage.local.set({ calculations: [] }, () => {
      resolve();
    });
  });
}

// Get settings
async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['settings'], (result) => {
      resolve(result.settings || {
        autoDetect: true,
        showWidget: true,
        defaultTransport: 'van',
        defaultDistance: 50
      });
    });
  });
}

// Update settings
async function updateSettings(newSettings) {
  return new Promise((resolve) => {
    chrome.storage.local.get(['settings'], (result) => {
      const settings = { ...result.settings, ...newSettings };
      chrome.storage.local.set({ settings }, () => {
        resolve();
      });
    });
  });
}

// Badge update for total calculations
async function updateBadge() {
  const calculations = await getCalculations();
  const count = calculations.length;
  
  if (count > 0) {
    chrome.action.setBadgeText({ text: count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#10b981' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
}

// Update badge on storage change
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.calculations) {
    updateBadge();
  }
});

// Initialize badge
updateBadge();

// Analytics tracking (anonymous usage statistics)
async function trackUsage(eventName, data = {}) {
  const settings = await getSettings();
  
  if (settings.analyticsEnabled === false) {
    return;
  }
  
  // Track anonymous usage for improving the extension
  console.log('Analytics event:', eventName, data);
}

// Listen for tab updates to detect shopping sites
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    try {
      const url = new URL(tab.url);
      const hostname = url.hostname.toLowerCase();
      
      const shoppingSites = ['amazon', 'flipkart', 'ebay', 'walmart', 'aliexpress', 'etsy', 'shopify'];
      const isShoppingSite = shoppingSites.some(site => hostname.includes(site));
      
      if (isShoppingSite) {
        trackUsage('shopping_site_detected', { platform: hostname });
      }
    } catch (error) {
      // Silently ignore URL parsing errors
    }
  }
});

// Make export function available to other components
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'exportToBackend') {
    // Simplified - just acknowledge
    sendResponse({ success: false, message: 'Backend export not configured' });
  }
  return true;
});
