# Creating Icons for EcoTrace Extension

Since the extension requires icon files, you need to create them. Here are two options:

## Option 1: Use Online Icon Generator (Recommended)

1. Visit a free icon generator like:
   - https://favicon.io/favicon-generator/
   - https://www.favicon-generator.org/
   - https://realfavicongenerator.net/

2. Use these settings:
   - Text: "🌱" (leaf emoji) or "ET" (EcoTrace)
   - Background: Green gradient (#10b981 to #059669)
   - Font: Bold, sans-serif
   - Sizes needed: 16x16, 48x48, 128x128

3. Download the generated icons

4. Rename and place them in the `extension/icons/` folder:
   - `icon-16.png` (16x16 pixels)
   - `icon-48.png` (48x48 pixels)
   - `icon-128.png` (128x128 pixels)

5. For active state icons (optional), create slightly brighter versions:
   - `icon-16-active.png`
   - `icon-48-active.png`
   - `icon-128-active.png`

## Option 2: Use Design Software

### Using Canva (Free)

1. Go to https://www.canva.com/
2. Create a new design with custom dimensions:
   - First: 128x128 px
   - Then: 48x48 px
   - Finally: 16x16 px

3. Design elements:
   - Background: Green (#10b981)
   - Icon: Leaf emoji 🌱 or custom design
   - Text (optional): "ET"

4. Download as PNG

5. Save to `extension/icons/` folder

### Using Figma (Free)

1. Go to https://www.figma.com/
2. Create frames: 128x128, 48x48, 16x16
3. Add leaf icon or text
4. Export as PNG
5. Save to `extension/icons/` folder

### Using GIMP (Free Desktop App)

1. Download GIMP from https://www.gimp.org/
2. Create new images: 128x128, 48x48, 16x16 pixels
3. Fill with green background
4. Add text or emoji
5. Export as PNG
6. Save to `extension/icons/` folder

## Option 3: Simple Placeholder Icons

If you just want to test the extension quickly, you can use placeholder icons:

### Create Solid Color Icons

Use any image editor or even MS Paint:

1. Create 3 images: 128x128, 48x48, 16x16 pixels
2. Fill with solid green color (#10b981)
3. Add white text "ET" in the center
4. Save as PNG files
5. Place in `extension/icons/` folder

## Icon Specifications

### Required Icons

```
extension/icons/
├── icon-16.png    (16x16 px, shown in toolbar)
├── icon-48.png    (48x48 px, shown in extension management)
└── icon-128.png   (128x128 px, shown in Chrome Web Store)
```

### Optional Icons (for enhanced UX)

```
extension/icons/
├── icon-16-active.png   (brighter when on shopping site)
├── icon-48-active.png
└── icon-128-active.png
```

### Design Guidelines

- **Colors**: Use EcoTrace brand colors
  - Primary: #10b981 (green)
  - Secondary: #059669 (dark green)
  - Accent: #3b82f6 (blue)

- **Symbol**: Leaf 🌱 or tree 🌳 or recycling ♻️

- **Style**: Modern, flat design with slight gradient

- **Contrast**: Ensure icon is visible on both light and dark backgrounds

## Quick Test Icons

If you need to test immediately without creating icons, the extension will work but Chrome will show a default gray icon. The functionality won't be affected.

To test without icons:
1. Comment out the `icons` section in `manifest.json` temporarily
2. Load the extension
3. Create proper icons later

## Recommended Icon Design

For best results, use this design concept:

```
┌─────────────┐
│   🌱 ET     │  <- Leaf emoji + "EcoTrace" initials
│             │  
│   Green     │  <- Gradient background (#10b981 → #059669)
│  Gradient   │
└─────────────┘
```

Or simpler:

```
┌─────────────┐
│             │
│      🌱     │  <- Just the leaf emoji centered
│             │  <- Solid green background
└─────────────┘
```

## After Creating Icons

Once you have the icons:

1. Place them in `extension/icons/` folder
2. Verify the manifest.json points to correct paths:
   ```json
   "icons": {
     "16": "icons/icon-16.png",
     "48": "icons/icon-48.png",
     "128": "icons/icon-128.png"
   }
   ```
3. Reload the extension in Chrome
4. The icons should now appear!

## Troubleshooting

**Icons not showing?**
- Check file names match manifest.json exactly
- Ensure files are PNG format
- Verify correct dimensions (16x16, 48x48, 128x128)
- Reload the extension after adding icons

**Icons look pixelated?**
- Use higher resolution source and scale down
- Ensure icons are saved at exact dimensions
- Use PNG format with transparency

---

**Tip:** Start with simple solid color icons for testing, then create polished versions later!
