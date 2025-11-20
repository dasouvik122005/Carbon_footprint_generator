# 🚀 Quick Start Guide

## Fastest Way to Run (No Installation)

Simply open `index.html` in your browser - that's it! 🎉

All features work without any installation or server setup.

---

## Run with Backend (5 minutes)

### Windows

```powershell
# 1. Create virtual environment
python -m venv venv

# 2. Activate it
venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the server
python app.py

# 5. Open browser to http://localhost:5000
```

### Linux/Mac

```bash
# 1. Create virtual environment
python3 -m venv venv

# 2. Activate it
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the server
python app.py

# 5. Open browser to http://localhost:5000
```

---

## Features Overview

### ✨ What You Get

- 🧮 **Advanced Calculator** - 10+ product categories, multiple transport modes
- 📊 **Live Charts** - Beautiful visualizations with Chart.js
- 📈 **Analytics Dashboard** - Track emissions over time
- 🔄 **Scenario Comparison** - Compare different delivery options
- 💡 **Smart Recommendations** - Get personalized eco-tips
- 🌙 **Dark Mode** - Toggle theme with one click
- 📤 **Export Data** - Download your history as CSV
- 💾 **Auto-Save** - Everything saved to localStorage

### 🎯 Perfect For

- ✅ Professional project demonstration
- ✅ E-commerce sustainability analysis
- ✅ Carbon footprint education
- ✅ Environmental impact assessment
- ✅ Academic research

---

## First Time Using?

1. **Open the app** (index.html or http://localhost:5000)
2. **Fill in order details**:
   - Select product category
   - Enter weight and distance
   - Choose packaging and transport
3. **Click "Calculate Impact"**
4. **View results** with detailed breakdown
5. **Check recommendations** for reducing emissions
6. **Compare scenarios** to find the best option
7. **Export your data** anytime

---

## Customizing Emission Factors

Edit `script.js` around line 10:

```javascript
const EMISSION_FACTORS = {
  products: {
    'electronics': { factor: 50, ... },
    // Change these values ↑
  }
};
```

Replace with data from:
- DEFRA 2024 (UK Government)
- GLEC Framework (Logistics)
- Ecoinvent 3.8 (Life Cycle Database)

---

## Troubleshooting

### Issue: Charts not showing
**Solution**: Make sure you have internet connection (Chart.js loads from CDN)

### Issue: Dark mode not working
**Solution**: Clear browser localStorage and refresh

### Issue: Backend won't start
**Solution**: 
```powershell
pip install --upgrade flask flask-cors
python app.py
```

### Issue: Data not saving
**Solution**: 
- Static version: Check browser localStorage settings
- Backend version: Check if `carbon_footprint.db` was created

---

## API Endpoints (Backend)

- `POST /api/save` - Save calculation
- `GET /api/history` - Get history
- `GET /api/analytics` - Get stats
- `GET /api/export` - Export data
- `GET /api/health` - Check status

Test with:
```powershell
# Health check
curl http://localhost:5000/api/health
```

---

## Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript ES6+
- Chart.js 4.4 (visualization)
- Font Awesome 6.4 (icons)

**Backend:**
- Flask 2.3 (Python web framework)
- SQLite3 (database)
- Flask-CORS (API support)

---

## Need Help?

1. Check `README.md` for full documentation
2. Review code comments in `script.js`
3. Test with example data first
4. Check browser console for errors

---

## Credits

Professional Carbon Footprint Analysis Platform 2025

**Built with 💚 for a sustainable future**