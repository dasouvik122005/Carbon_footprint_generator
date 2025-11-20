# 🌱 EcoTrace - Professional Carbon Footprint Analyzer

> Advanced E-Commerce Sustainability Analysis Platform

A comprehensive, professional-grade carbon footprint calculator designed for e-commerce sustainability analysis. Built with modern web technologies, featuring real-time analytics, data visualization, and intelligent recommendations.

---

## 🎯 Project Overview

This system provides detailed carbon footprint analysis for online shopping orders, helping businesses and consumers understand and reduce their environmental impact. The platform combines accurate emission calculations, interactive visualizations, and actionable insights.

### Key Features

#### 🧮 Advanced Calculator
- **10+ Product Categories**: Electronics, clothing, food, furniture, cosmetics, sports equipment, and more
- **Multiple Transport Modes**: Bike, van, truck, air freight, train, and sea freight
- **Packaging Options**: Cardboard, plastic, minimal, bubble wrap, eco-friendly materials
- **Advanced Options**: Consolidated delivery, return shipments, eco-packaging discounts
- **Real-time Calculations**: Instant feedback with detailed breakdowns

#### 📊 Data Visualization & Analytics
- **Interactive Charts**: Doughnut, line, bar, and polar area charts powered by Chart.js
- **Emission Breakdown**: Visual breakdown of product, packaging, and delivery emissions
- **Timeline Analysis**: Track emissions over time
- **Category Distribution**: Analyze emissions by product category
- **Transport Impact**: Compare environmental impact of different transport modes

#### 📈 Comprehensive History & Tracking
- **Calculation History**: Store and review up to 50 past calculations
- **Sortable Tables**: Organize by date, emissions, category, and more
- **Impact Ratings**: Automatic categorization (Low, Medium, High impact)
- **Persistent Storage**: LocalStorage for client-side data retention

#### 🔄 Scenario Comparison
- **Alternative Analysis**: Compare different delivery scenarios
- **Best Option Highlighting**: Automatic identification of lowest-impact option
- **Time vs. Emissions**: Balance delivery speed with environmental cost
- **What-if Analysis**: Test different combinations before ordering

#### 💡 Smart Recommendations
- **Personalized Suggestions**: Based on your specific order details
- **Savings Calculations**: Quantify potential emission reductions
- **Eco-friendly Alternatives**: Practical tips for reducing footprint
- **Impact Warnings**: Alert for high-emission choices

#### 🎨 Professional UI/UX
- **Modern Design**: Clean, gradient-based interface with smooth animations
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Accessibility**: High contrast, keyboard navigation support
- **Smooth Animations**: Professional transitions and effects

#### 📤 Data Management
- **CSV Export**: Download complete calculation history
- **History Management**: Clear all data with confirmation
- **Local Backup**: Automatic localStorage persistence

---

## 🏗️ Technical Architecture

### Frontend Stack
- **HTML5**: Semantic markup with modern structure
- **CSS3**: Custom properties, gradients, animations, flexbox/grid
- **JavaScript (ES6+)**: Modular, functional programming
- **Chart.js 4.4**: Professional data visualization
- **Font Awesome 6.4**: Rich icon library

### Backend Stack
- **Flask 2.3+**: Python web framework
- **SQLite3**: Embedded database for data persistence
- **Flask-CORS**: Cross-origin resource sharing
- **CSV Export**: Data portability

### Features Implementation
- **State Management**: Centralized application state
- **Event-Driven**: Reactive UI updates
- **Modular Design**: Separated concerns and reusable functions
- **Error Handling**: Comprehensive validation and error messages

---

## 📁 Project Structure

```
Carbon_footprint_generator/
├── index.html              # Main application interface
├── styles.css              # Professional styling with animations
├── script.js               # Core application logic (600+ lines)
├── extension-download.js   # Extension download functionality
├── app.py                  # Flask backend with database & API
├── requirements.txt        # Python dependencies
├── .gitignore              # Git ignore rules
├── ecotrace-extension.zip  # Browser extension package
├── extension/              # Browser extension source
├── README.md              # This file
├── QUICKSTART.md          # Quick start guide
├── EMISSION_FACTORS.md    # Emission calculation methodology
└── CHANGELOG.md           # Version history
```

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection (for CDN resources)

### Option 1: Static Deployment (No Backend)

**Perfect for**: GitHub Pages, Netlify, Vercel, or local use

1. **Clone or download the project**
   ```bash
   git clone https://github.com/dasouvik122005/Carbon_footprint_generator.git
   cd Carbon_footprint_generator
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser
   - All features work client-side
   - Data saved to localStorage

### Option 2: Full Stack with Backend

**Perfect for**: Development, server deployment, database persistence

1. **Clone the repository**
   ```powershell
   git clone https://github.com/dasouvik122005/Carbon_footprint_generator.git
   cd Carbon_footprint_generator
   ```

2. **Create virtual environment**
   ```powershell
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install dependencies**
   ```powershell
   pip install -r requirements.txt
   ```

4. **Run the server**
   ```powershell
   python app.py
   ```

5. **Access the application**
   - Open browser to `http://localhost:5000`
   - Backend API available at `/api/*` endpoints
   - Database and CSV exports auto-generated

---

## 📊 API Documentation

### Backend Endpoints

#### `POST /api/save`
Save a calculation to the database
```json
{
  "timestamp": "2025-11-20T10:30:00.000Z",
  "inputs": {
    "category": "electronics",
    "weight": 0.5,
    "packaging": "cardboard",
    "distance": 50,
    "transport": "van",
    "quantity": 1,
    "consolidate": false,
    "returnShipment": false,
    "ecoPackaging": false,
    "orderName": "Laptop"
  },
  "result": {
    "emissions": {
      "product": 25.0,
      "packaging": 0.025,
      "delivery": 10.0,
      "total": 35.025
    }
  }
}
```

#### `GET /api/history?page=1&per_page=20`
Retrieve calculation history with pagination

#### `GET /api/analytics?period=30`
Get analytics and statistics for specified period (days)

#### `GET /api/export?format=json`
Export all data (json or csv format)

#### `GET /api/health`
Health check and system status

---

## 🔧 Customization

### Emission Factors

Edit emission factors in `script.js` to match your data sources:

```javascript
const EMISSION_FACTORS = {
  version: 'v2.0',
  updated: '2025-11-20',
  sources: ['DEFRA 2024', 'GLEC Framework', 'Ecoinvent 3.8'],
  
  products: {
    'electronics': { 
      factor: 50,  // kg CO2e per kg
      description: 'Electronics & Tech Devices',
      icon: 'laptop'
    },
    // Add more categories...
  }
};
```

### Styling & Themes

Modify CSS variables in `styles.css`:

```css
:root {
  --primary: #10b981;
  --secondary: #3b82f6;
  --gradient-hero: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #8b5cf6 100%);
  /* Customize colors, spacing, etc. */
}
```

---

## 📚 Data Sources & Methodology

### Emission Factor Sources
- **DEFRA 2024**: UK Government emission conversion factors
- **GLEC Framework**: Global Logistics Emissions Council
- **Ecoinvent 3.8**: Life cycle inventory database

### Calculation Methodology
1. **Product Emissions**: Weight × Category Factor
2. **Packaging Emissions**: (Weight × 10%) × Packaging Factor
3. **Delivery Emissions**: Distance × Transport Factor ÷ Consolidation Factor
4. **Total**: Sum of all three components

### Assumptions
- Packaging weight assumed at 10% of product weight
- Consolidation reduces emissions by 50%
- Return shipments double delivery emissions
- Eco-packaging reduces packaging emissions by 50%
- Tree offset based on 20kg CO2 absorption per year

---

## 🎓 Academic Context

### Professional Features

✅ **Technical Complexity**: Full-stack web application with database

✅ **Modern Technologies**: ES6+, Flask, SQLite, Chart.js

✅ **User Experience**: Professional UI/UX with animations

✅ **Data Visualization**: Multiple chart types and analytics

✅ **Scalability**: Modular architecture, API design

✅ **Documentation**: Comprehensive README and code comments

✅ **Real-world Application**: E-commerce sustainability

✅ **Innovation**: Scenario comparison, smart recommendations

### Future Enhancements
- [ ] User authentication and accounts
- [ ] Machine learning for predictions
- [ ] API integration with e-commerce platforms
- [ ] Mobile app development
- [ ] Carbon offset marketplace integration
- [ ] Multi-language support
- [ ] Advanced reporting (PDF generation)
- [ ] Real-time collaboration features

---

## 🤝 Contributing

This is an academic project, but suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

This project is created for educational and commercial purposes.

---

## 👨‍💻 Project Details

- Project: Carbon Footprint Generator
- Year: 2025

---

## 🙏 Acknowledgments

- DEFRA for emission factor data
- Chart.js team for visualization library
- Flask community for excellent documentation
- Font Awesome for icon library
- Academic advisors and mentors

---

## 📞 Support

For questions or issues:
1. Check existing documentation
2. Review code comments
3. Open an issue on GitHub
4. Contact project maintainer

---

**Built with 💚 for a sustainable future**
