"""
Professional Carbon Footprint Analyzer - Flask Backend
Advanced API with Database Support & Analytics
"""

from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import sqlite3
import csv
import os
import json
from datetime import datetime, timedelta
from functools import wraps

app = Flask(__name__, static_folder='.')
CORS(app)  # Enable CORS for development

# Configuration
DATABASE = 'carbon_footprint.db'
CSV_FILE = 'orders.csv'

# Database initialization
def init_db():
    """Initialize SQLite database with proper schema"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Create calculations table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS calculations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            order_name TEXT,
            category TEXT NOT NULL,
            weight REAL NOT NULL,
            packaging TEXT NOT NULL,
            distance REAL NOT NULL,
            transport TEXT NOT NULL,
            quantity INTEGER DEFAULT 1,
            consolidate BOOLEAN DEFAULT 0,
            return_shipment BOOLEAN DEFAULT 0,
            eco_packaging BOOLEAN DEFAULT 0,
            product_emission REAL NOT NULL,
            packaging_emission REAL NOT NULL,
            delivery_emission REAL NOT NULL,
            total_emission REAL NOT NULL,
            delivery_time REAL,
            tree_offset REAL
        )
    ''')
    
    # Create analytics summary table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS analytics_summary (
            date TEXT PRIMARY KEY,
            total_calculations INTEGER DEFAULT 0,
            total_emissions REAL DEFAULT 0,
            avg_emission REAL DEFAULT 0,
            categories TEXT,
            transport_modes TEXT
        )
    ''')
    
    conn.commit()
    conn.close()
    print("✅ Database initialized")

# Initialize database on startup
init_db()

# Helper Functions
def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def dict_from_row(row):
    """Convert SQLite row to dictionary"""
    return dict(zip(row.keys(), row))

# Routes
@app.route('/')
def index():
    """Serve main HTML page"""
    return send_from_directory('.', 'index.html')

@app.route('/download/extension')
def download_extension():
    """Download browser extension as ZIP file"""
    try:
        return send_from_directory('.', 'ecotrace-extension.zip', as_attachment=True, download_name='ecotrace-extension.zip')
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@app.route('/<path:filename>')
def static_files(filename):
    """Serve static files (CSS, JS, etc.)"""
    return send_from_directory('.', filename)

@app.route('/api/calculate', methods=['POST'])
def calculate():
    """
    Calculate carbon footprint
    Returns calculation result without saving
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Validate required fields
    required = ['category', 'weight', 'packaging', 'distance', 'transport']
    missing = [field for field in required if field not in data.get('inputs', {})]
    
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400
    
    return jsonify({
        'status': 'success',
        'result': data.get('result', {})
    }), 200

@app.route('/api/save', methods=['POST'])
def save():
    """Save calculation to database and CSV"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        inputs = data.get('input', data.get('inputs', {}))
        result = data.get('result', {})
        emissions = result.get('emissions', {})
        
        # Save to SQLite
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO calculations (
                timestamp, order_name, category, weight, packaging,
                distance, transport, quantity, consolidate, return_shipment,
                eco_packaging, product_emission, packaging_emission,
                delivery_emission, total_emission, delivery_time, tree_offset
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get('timestamp'),
            inputs.get('orderName', 'Unnamed Order'),
            inputs.get('category'),
            inputs.get('weight'),
            inputs.get('packaging'),
            inputs.get('distance'),
            inputs.get('transport'),
            inputs.get('quantity', 1),
            inputs.get('consolidate', False),
            inputs.get('returnShipment', False),
            inputs.get('ecoPackaging', False),
            emissions.get('product', 0),
            emissions.get('packaging', 0),
            emissions.get('delivery', 0),
            emissions.get('total', 0),
            result.get('deliveryTime'),
            result.get('treeOffset')
        ))
        
        calculation_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        # Also save to CSV for backward compatibility
        save_to_csv(data)
        
        return jsonify({
            'status': 'success',
            'id': calculation_id,
            'message': 'Calculation saved successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def save_to_csv(data):
    """Save calculation to CSV file"""
    inputs = data.get('input', data.get('inputs', {}))
    result = data.get('result', {})
    emissions = result.get('emissions', {})
    
    file_exists = os.path.exists(CSV_FILE)
    
    with open(CSV_FILE, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        
        if not file_exists:
            writer.writerow([
                'timestamp', 'order_name', 'category', 'weight', 'packaging',
                'distance', 'transport', 'quantity', 'consolidate',
                'total_emission', 'product', 'packaging_em', 'delivery'
            ])
        
        writer.writerow([
            data.get('timestamp'),
            inputs.get('orderName', 'Unnamed Order'),
            inputs.get('category'),
            inputs.get('weight'),
            inputs.get('packaging'),
            inputs.get('distance'),
            inputs.get('transport'),
            inputs.get('quantity', 1),
            inputs.get('consolidate', False),
            emissions.get('total', 0),
            emissions.get('product', 0),
            emissions.get('packaging', 0),
            emissions.get('delivery', 0)
        ])

@app.route('/api/history', methods=['GET'])
def get_history():
    """Get calculation history with pagination"""
    try:
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 20))
        offset = (page - 1) * per_page
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Get total count
        cursor.execute('SELECT COUNT(*) as count FROM calculations')
        total = cursor.fetchone()['count']
        
        # Get paginated results
        cursor.execute('''
            SELECT * FROM calculations
            ORDER BY timestamp DESC
            LIMIT ? OFFSET ?
        ''', (per_page, offset))
        
        calculations = [dict_from_row(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({
            'status': 'success',
            'data': calculations,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': total,
                'pages': (total + per_page - 1) // per_page
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Get analytics and statistics"""
    try:
        period = request.args.get('period', '30')  # days
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Date filter
        date_filter = datetime.now() - timedelta(days=int(period))
        date_str = date_filter.isoformat()
        
        # Total statistics
        cursor.execute('''
            SELECT 
                COUNT(*) as total_calculations,
                SUM(total_emission) as total_emissions,
                AVG(total_emission) as avg_emission,
                MIN(total_emission) as min_emission,
                MAX(total_emission) as max_emission
            FROM calculations
            WHERE timestamp >= ?
        ''', (date_str,))
        
        stats = dict_from_row(cursor.fetchone())
        
        # Category breakdown
        cursor.execute('''
            SELECT category, COUNT(*) as count, SUM(total_emission) as total_emission
            FROM calculations
            WHERE timestamp >= ?
            GROUP BY category
            ORDER BY total_emission DESC
        ''', (date_str,))
        
        categories = [dict_from_row(row) for row in cursor.fetchall()]
        
        # Transport mode breakdown
        cursor.execute('''
            SELECT transport, COUNT(*) as count, SUM(delivery_emission) as total_emission
            FROM calculations
            WHERE timestamp >= ?
            GROUP BY transport
            ORDER BY total_emission DESC
        ''', (date_str,))
        
        transport_modes = [dict_from_row(row) for row in cursor.fetchall()]
        
        # Daily trend
        cursor.execute('''
            SELECT 
                DATE(timestamp) as date,
                COUNT(*) as count,
                SUM(total_emission) as daily_emission
            FROM calculations
            WHERE timestamp >= ?
            GROUP BY DATE(timestamp)
            ORDER BY date DESC
            LIMIT 30
        ''', (date_str,))
        
        daily_trend = [dict_from_row(row) for row in cursor.fetchall()]
        
        conn.close()
        
        return jsonify({
            'status': 'success',
            'period_days': period,
            'statistics': stats,
            'categories': categories,
            'transport_modes': transport_modes,
            'daily_trend': daily_trend
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/export', methods=['GET'])
def export_data():
    """Export all data as JSON"""
    try:
        format_type = request.args.get('format', 'json')
        
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM calculations ORDER BY timestamp DESC')
        calculations = [dict_from_row(row) for row in cursor.fetchall()]
        conn.close()
        
        if format_type == 'csv':
            # Return CSV file
            return send_from_directory('.', CSV_FILE, as_attachment=True)
        else:
            # Return JSON
            return jsonify({
                'status': 'success',
                'count': len(calculations),
                'data': calculations
            }), 200
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/delete/<int:calc_id>', methods=['DELETE'])
def delete_calculation(calc_id):
    """Delete a specific calculation"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('DELETE FROM calculations WHERE id = ?', (calc_id,))
        conn.commit()
        
        if cursor.rowcount == 0:
            conn.close()
            return jsonify({'error': 'Calculation not found'}), 404
        
        conn.close()
        
        return jsonify({
            'status': 'success',
            'message': 'Calculation deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/clear', methods=['POST'])
def clear_all():
    """Clear all calculations (use with caution)"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('DELETE FROM calculations')
        conn.commit()
        conn.close()
        
        # Also clear CSV
        if os.path.exists(CSV_FILE):
            os.remove(CSV_FILE)
        
        return jsonify({
            'status': 'success',
            'message': 'All data cleared successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT COUNT(*) as count FROM calculations')
        count = cursor.fetchone()['count']
        conn.close()
        
        return jsonify({
            'status': 'healthy',
            'database': 'connected',
            'total_calculations': count,
            'timestamp': datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🌱 EcoTrace Carbon Footprint Analyzer - Backend Server")
    print("=" * 60)
    print(f"📊 Database: {DATABASE}")
    print(f"📁 CSV Export: {CSV_FILE}")
    print("=" * 60)
    print("\nAvailable API Endpoints:")
    print("  GET  /                    - Main application")
    print("  POST /api/save            - Save calculation")
    print("  GET  /api/history         - Get calculation history")
    print("  GET  /api/analytics       - Get analytics & stats")
    print("  GET  /api/export          - Export data (JSON/CSV)")
    print("  GET  /api/health          - Health check")
    print("=" * 60)
    print("\n🚀 Starting server...\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)