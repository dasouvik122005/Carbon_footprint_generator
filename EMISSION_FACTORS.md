# 📊 Emission Factors Documentation

## Overview

This document details all emission factors used in the EcoTrace Carbon Footprint Analyzer, including sources, assumptions, and methodology.

---

## Data Sources

### Primary Sources

1. **DEFRA 2024** (UK Department for Environment, Food & Rural Affairs)
   - Government conversion factors for greenhouse gas reporting
   - Updated annually with latest scientific research
   - URL: https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting

2. **GLEC Framework** (Global Logistics Emissions Council)
   - Industry standard for logistics emissions calculation
   - Focus on freight and transportation
   - URL: https://www.smartfreightcentre.org/en/glec-framework/

3. **Ecoinvent 3.8** (Life Cycle Inventory Database)
   - Comprehensive product life cycle data
   - Manufacturing and production emissions
   - URL: https://ecoinvent.org/

---

## Product Categories

All values in **kg CO₂e per kg of product weight**

| Category | Factor | Source | Notes |
|----------|--------|--------|-------|
| **Electronics** | 50.0 | Ecoinvent 3.8 | Includes manufacturing, rare earth materials |
| **Clothing** | 10.0 | DEFRA 2024 | Average for textiles, varies by material |
| **Books** | 2.0 | DEFRA 2024 | Paper production, printing |
| **Fresh Food** | 3.0 | DEFRA 2024 | Produce, minimal processing |
| **Processed Food** | 5.0 | DEFRA 2024 | Includes packaging, processing |
| **Furniture** | 25.0 | Ecoinvent 3.8 | Wood/metal production, assembly |
| **Toys** | 15.0 | Ecoinvent 3.8 | Plastic production, manufacturing |
| **Cosmetics** | 8.0 | DEFRA 2024 | Chemical production, packaging |
| **Sports Equipment** | 12.0 | Ecoinvent 3.8 | Mixed materials, manufacturing |
| **Other** | 7.0 | Average | General merchandise baseline |

### Assumptions
- Values represent average across product types within category
- Includes raw material extraction, manufacturing, and assembly
- Does not include retail, use phase, or end-of-life
- Regional variations not accounted for

---

## Packaging Types

All values in **kg CO₂e per kg of packaging weight**

| Type | Factor | Source | Notes |
|------|--------|--------|-------|
| **Cardboard** | 0.5 | DEFRA 2024 | Corrugated cardboard box |
| **Plastic** | 1.2 | DEFRA 2024 | HDPE/LDPE plastic packaging |
| **Minimal/Paper** | 0.2 | DEFRA 2024 | Paper envelope, minimal material |
| **Bubble Wrap** | 0.9 | DEFRA 2024 | Plastic bubble wrap + box |
| **Eco-Friendly** | 0.15 | DEFRA 2024 | Recycled/biodegradable materials |

### Packaging Weight Calculation
- **Assumption**: Packaging weight = 10% of product weight
- Minimum packaging weight: 0.01 kg
- Eco-friendly option reduces emissions by 50%

### Rationale
- 10% ratio based on industry average (GLEC Framework)
- Varies significantly by product type and retailer
- Conservative estimate for general calculation

---

## Transport Modes

All values in **kg CO₂e per km**

| Mode | Factor | Speed (km/h) | Source | Notes |
|------|--------|-------------|--------|-------|
| **Bicycle/E-bike** | 0.02 | 15 | DEFRA 2024 | Electric assistance, zero direct emissions |
| **Delivery Van** | 0.2 | 40 | DEFRA 2024 | Diesel van, average load |
| **Freight Truck** | 0.15 | 50 | GLEC Framework | Heavy goods vehicle, 40% load factor |
| **Air Freight** | 1.2 | 500 | DEFRA 2024 | Cargo aircraft, international |
| **Rail** | 0.05 | 80 | DEFRA 2024 | Electric freight train |
| **Sea Freight** | 0.01 | 25 | GLEC Framework | Container ship, bulk cargo |

### Assumptions
- **Load Factor**: Percentage of vehicle capacity utilized
  - Van: 50%
  - Truck: 40%
  - Train: 70%
  - Ship: 80%
- **Fuel Type**: Standard diesel/jet fuel (not electric/alternative)
- **Route Efficiency**: Direct route, no detours

### Delivery Time Calculation
```
Delivery Time (hours) = Distance (km) ÷ Speed (km/h)
```

---

## Calculation Methodology

### Total Emission Formula

```
Total CO₂e = Product Emission + Packaging Emission + Delivery Emission
```

### Component Calculations

#### 1. Product Emission
```
Product Emission = Product Weight × Category Factor × Quantity
```

**Example:**
- 0.5 kg electronics
- Factor: 50 kg CO₂e/kg
- Quantity: 1
- Result: 0.5 × 50 × 1 = **25 kg CO₂e**

#### 2. Packaging Emission
```
Packaging Weight = max(0.01, Product Weight × 0.1)
Packaging Emission = Packaging Weight × Packaging Factor × Quantity
```

With eco-friendly option:
```
Packaging Emission = Packaging Emission × 0.5
```

**Example:**
- Product: 0.5 kg
- Packaging weight: 0.05 kg (10%)
- Cardboard factor: 0.5
- Result: 0.05 × 0.5 × 1 = **0.025 kg CO₂e**

#### 3. Delivery Emission
```
Base Delivery = Distance × Transport Factor × Quantity

With Consolidation:
Delivery Emission = Base Delivery ÷ 2

With Return Shipment:
Delivery Emission = Base Delivery × 2

Combined:
Delivery Emission = (Distance × Factor × Quantity × Return Factor) ÷ Consolidation Factor
```

**Example:**
- Distance: 50 km
- Van factor: 0.2
- Consolidated: Yes (÷2)
- Result: 50 × 0.2 × 1 ÷ 2 = **5 kg CO₂e**

---

## Special Modifiers

### Consolidation
- **Effect**: Reduces delivery emissions by 50%
- **Rationale**: Multiple orders in one trip
- **Trade-off**: May increase delivery time

### Return Shipment
- **Effect**: Doubles delivery emissions
- **Rationale**: Round-trip delivery + return
- **Impact**: Significant carbon footprint

### Eco-Friendly Packaging
- **Effect**: Reduces packaging emissions by 50%
- **Rationale**: Recycled/sustainable materials
- **Materials**: Recycled cardboard, bioplastics, minimal design

---

## Tree Offset Calculation

```
Trees Needed = Total CO₂e ÷ 20
```

### Assumptions
- Average tree absorbs **20 kg CO₂ per year**
- Based on mature deciduous tree
- Regional variations: 10-30 kg CO₂/year
- Offset is for **one year** of tree growth

### Context
- 1 tree ≈ 20 kg CO₂e annually
- Typical forest: 500-2000 trees/hectare
- Young trees: 5-10 kg CO₂e/year
- Tropical forests: Higher absorption rates

---

## Limitations & Disclaimers

### What's Included
✅ Manufacturing/production emissions
✅ Packaging material production
✅ Direct transport emissions
✅ Basic weight-based calculations

### What's NOT Included
❌ Retail/warehouse operations
❌ Product use phase emissions
❌ End-of-life/recycling
❌ Supply chain complexity
❌ Regional energy grid differences
❌ Seasonal variations
❌ Specific product variations within categories

### Accuracy
- **Estimates Only**: Real emissions vary significantly
- **General Guidance**: Not for carbon accounting/reporting
- **Educational Purpose**: Understanding relative impacts
- **Update Regularly**: Emission factors change with technology

---

## Updating Factors

### Recommended Update Frequency
- **Annually**: Check DEFRA updates (usually June/July)
- **Quarterly**: Review transport technology changes
- **As Needed**: New research or methodology changes

### How to Update

1. **Edit `script.js`** around line 10
2. **Update factor values** with new data
3. **Update version number** and date
4. **Document sources** in comments
5. **Test calculations** with known benchmarks

Example:
```javascript
const EMISSION_FACTORS = {
  version: 'v2.1',  // ← Increment version
  updated: '2026-01-15',  // ← Update date
  sources: ['DEFRA 2025', 'GLEC Framework 2.0'],  // ← Update sources
  
  products: {
    'electronics': { 
      factor: 48,  // ← New value from DEFRA 2025
      description: 'Electronics & Tech Devices',
      icon: 'laptop'
    }
  }
};
```

---

## References & Further Reading

### Key Documents
1. DEFRA Conversion Factors Methodology Paper
2. GLEC Framework Version 2.0
3. GHG Protocol Product Life Cycle Standard
4. ISO 14067 Carbon Footprint of Products

### Academic Papers
- Lifecycle Assessment of E-commerce (2023)
- Transportation Emissions in Logistics (2024)
- Packaging Impact Studies (2023-2024)

### Online Calculators (for comparison)
- Carbon Footprint Ltd
- EPA Carbon Calculator
- CoolClimate Network

---

## Version History

| Version | Date | Changes | Source Updates |
|---------|------|---------|----------------|
| v2.0 | 2025-11-20 | Initial professional version | DEFRA 2024, GLEC, Ecoinvent 3.8 |
| v1.0 | 2025-11-15 | Basic MVP version | Generic estimates |

---

## Contact & Contributions

Found better emission factors? Have updated sources?

1. Review the data source
2. Verify methodology alignment
3. Document the change
4. Update this file
5. Update version number

**Remember**: Accuracy is important, but transparency is critical. Always document your sources and assumptions.

---

**Last Updated**: November 20, 2025
**Project**: EcoTrace Carbon Footprint Analyzer