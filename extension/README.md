# EcoTrace Browser Extension

A Chrome browser extension that calculates the carbon footprint of products while shopping online.

## Features

- **Automatic Product Detection**: Detects products on major e-commerce platforms
- **Real-time Carbon Calculation**: Calculates carbon footprint based on product category, weight, and shipping
- **Shopping History Tracking**: Stores all your calculations with detailed breakdowns
- **Data Export**: Export your shopping data and carbon footprint to CSV
- **Visual Analytics**: View statistics about your environmental impact
- **Multi-Platform Support**: Works with major e-commerce platforms worldwide

## Supported E-commerce Platforms

- Amazon (amazon.com, amazon.in, etc.)
- Flipkart (flipkart.com)
- eBay (ebay.com, ebay.in, etc.)
- Walmart (walmart.com)
- AliExpress (aliexpress.com)
- Etsy (etsy.com)
- Shopify stores (*.myshopify.com)

## Installation

### From Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store.

### Developer Installation (Load Unpacked)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the `extension` folder from this project
6. The EcoTrace extension icon should appear in your browser toolbar

## How to Use

### Basic Usage

1. **Visit a Shopping Site**: Navigate to any supported e-commerce platform (Amazon, Flipkart, etc.)
2. **Open a Product Page**: Click on any product to view its details
3. **Click the Extension Icon**: The EcoTrace icon in your browser toolbar
4. **View Carbon Footprint**: The extension will automatically detect the product and show calculated emissions

### Manual Calculation

If automatic detection doesn't work:

1. Click the extension icon
2. Fill in the calculator form:
   - Product Category (Electronics, Clothing, etc.)
   - Weight in kilograms
   - Delivery Distance
   - Transport Mode
3. Click "Calculate Carbon Footprint"
4. View the detailed breakdown

### Viewing History

1. Click the extension icon
2. Switch to the "History" tab
3. See all your previous calculations
4. Click "Export Data (CSV)" to download your data

### Statistics

1. Click the extension icon
2. Switch to the "Stats" tab
3. View:
   - Total number of calculations
   - Total carbon emissions
   - Average emissions per product
   - Equivalent trees needed for offsetting

## Carbon Footprint Calculation

The extension calculates emissions in three categories:

### 1. Product Manufacturing
- Based on product category and weight
- Uses industry-standard emission factors
- Categories: Electronics (50 kg CO₂e/kg), Clothing (15 kg CO₂e/kg), Books (1.5 kg CO₂e/kg), etc.

### 2. Packaging
- Standard packaging: 0.5 kg CO₂e per kg of product
- Minimal packaging: 0.2 kg CO₂e per kg
- Eco-friendly packaging: 0.1 kg CO₂e per kg

### 3. Delivery Transport
- Bicycle/E-bike: 0.01 kg CO₂e per km per kg
- Ship: 0.02 kg CO₂e per km per kg
- Train: 0.05 kg CO₂e per km per kg
- Truck: 0.15 kg CO₂e per km per kg
- Van: 0.25 kg CO₂e per km per kg
- Air: 1.5 kg CO₂e per km per kg

### Tree Offset Calculation
- 1 mature tree absorbs approximately 21 kg CO₂ per year
- Formula: Trees Needed = Total Emissions ÷ 21

## Features in Detail

### Automatic Product Detection
The extension uses content scripts to extract:
- Product name
- Product category
- Product weight (from specifications)
- Estimated weight (if actual weight not available)

### On-Page Widget
When visiting product pages, a floating widget appears:
- Shows EcoTrace branding
- Prompts users to calculate carbon footprint
- Can be dismissed with the close button

### Data Storage
- All calculations stored locally using Chrome Storage API
- Data persists across browser sessions
- Privacy-focused: No data sent to external servers (unless you manually export)

### CSV Export
Export includes:
- Timestamp
- Product Category
- Weight
- Distance
- Transport Mode
- Product Emission
- Packaging Emission
- Delivery Emission
- Total Emission
- Trees Needed

## Privacy & Data

- **Local Storage**: All data is stored locally on your device
- **No Tracking**: The extension does not track your browsing or shopping habits
- **Optional Backend Sync**: You can optionally connect to the EcoTrace backend for advanced analytics
- **No Personal Data Collection**: We don't collect names, addresses, or payment information

## Technical Details

### Manifest V3
The extension uses Chrome's latest Manifest V3 specification for:
- Enhanced security
- Better performance
- Modern API usage

### Permissions

- `storage`: Store calculations locally
- `tabs`: Detect shopping sites
- `activeTab`: Read product information
- `scripting`: Inject content scripts
- `host_permissions`: Access e-commerce platforms

### Architecture

```
extension/
├── manifest.json       # Extension configuration
├── popup.html         # Extension popup interface
├── popup.js           # Popup logic and calculations
├── content.js         # Product data extraction
├── background.js      # Service worker for storage
└── icons/            # Extension icons
```

## Troubleshooting

### Extension Not Detecting Product

1. Make sure you're on a supported platform
2. Refresh the page
3. Check that the product page is fully loaded
4. Try manual calculation if auto-detection fails

### Widget Not Appearing

1. Check if you're on a product page (not search results)
2. Refresh the page
3. Check extension permissions in `chrome://extensions/`

### Data Not Saving

1. Check Chrome Storage quota
2. Ensure extension has storage permission
3. Try clearing and recalculating

## Backend Integration (Optional)

You can connect the extension to the EcoTrace Flask backend:

1. Ensure the backend is running (see main README)
2. In extension settings, set Backend URL to `http://localhost:5000`
3. Data will sync automatically every 30 minutes

## Development

### Building from Source

```bash
# Clone the repository
git clone <repository-url>
cd Carbon_footprint_generator/extension

# No build step required - it's pure JavaScript
# Load unpacked in Chrome
```

### Testing

1. Load the extension in developer mode
2. Open Chrome DevTools for the popup (right-click extension icon > Inspect popup)
3. Open Console for background script at `chrome://extensions/` > Background page (inspect views)
4. Check Console for content script in any product page

### Adding Support for New Platforms

Edit `content.js`:

1. Add new extractor function in `extractors` object
2. Add platform detection in `detectPlatform()` function
3. Update `manifest.json` to include new domain in `content_scripts.matches`

## Changelog

### Version 1.0.0 (Current)
- Initial release
- Support for 7+ e-commerce platforms
- Automatic product detection
- Manual calculation mode
- History tracking
- CSV export
- Statistics dashboard
- On-page widget

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style
2. New platforms include proper extraction logic
3. Test on actual shopping sites
4. Update documentation

## License

This project is open source.

## Support

For issues and feature requests:
1. Check existing GitHub issues
2. Create a new issue with details
3. Include browser version and platform

## Acknowledgments

- Emission factors based on DEFRA 2024, GLEC Framework, and Ecoinvent 3.8
- Icons and design inspired by environmental awareness
- Built with Manifest V3 for modern Chrome extensions

---

**Made with 🌱 for a greener future**
