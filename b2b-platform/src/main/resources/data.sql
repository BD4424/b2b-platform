-- Development seed data for the B2B platform.
-- This file is intentionally idempotent: INSERT IGNORE prevents duplicate
-- categories, brands and products when the application restarts.
-- Remove/replace this file before production deployment.

INSERT IGNORE INTO categories (name, description) VALUES
('Wires & Cables', 'Electrical wires, house wires and power cables'),
('Switches & Sockets', 'Modular switches, sockets, plates and accessories'),
('MCBs & Protection', 'MCBs, RCCBs, RCBOs, isolators and protection devices'),
('Distribution Boards', 'SPN, DP, TPN and modular distribution boards'),
('Lighting', 'LED bulbs, panels, battens, flood lights and fixtures'),
('Fans', 'Ceiling, wall, exhaust and high-speed fans'),
('Motors', 'Single-phase and three-phase motors'),
('Conduits & Accessories', 'PVC conduits, flexible conduits and fittings'),
('Pipes & Plumbing', 'PVC, CPVC and plumbing fittings'),
('Hardware', 'Fasteners, hand tools and general hardware'),
('Adhesives & Sealants', 'Construction adhesives, silicone and sealants'),
('Safety Equipment', 'Electrical and construction safety equipment');

INSERT IGNORE INTO brands (name) VALUES
('Havells'),
('Polycab'),
('Finolex'),
('KEI'),
('RR Kabel'),
('Schneider Electric'),
('Legrand'),
('Anchor'),
('L&T Electrical & Automation'),
('Crompton'),
('Orient Electric'),
('Philips'),
('Syska'),
('Wipro'),
('Supreme');

-- Wires & Cables
INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Havells Life Line Plus 1.5 sq mm FR Wire', 'HAV-FR-1.5-BL', 'coil', 2150.00, 1840.00, 42, 'Popular house wiring option for residential projects.', c.id, b.id
FROM categories c, brands b WHERE c.name='Wires & Cables' AND b.name='Havells';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Havells Life Line Plus 2.5 sq mm FR Wire', 'HAV-FR-2.5-BL', 'coil', 3450.00, 2950.00, 31, 'Suitable for higher-load residential circuits.', c.id, b.id
FROM categories c, brands b WHERE c.name='Wires & Cables' AND b.name='Havells';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Polycab Etira 1.5 sq mm FR Wire', 'POL-ETIRA-1.5', 'coil', 1980.00, 1690.00, 56, 'Good value option for residential wiring.', c.id, b.id
FROM categories c, brands b WHERE c.name='Wires & Cables' AND b.name='Polycab';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Polycab Etira 2.5 sq mm FR Wire', 'POL-ETIRA-2.5', 'coil', 3190.00, 2720.00, 38, 'Frequently requested by contractors for house wiring.', c.id, b.id
FROM categories c, brands b WHERE c.name='Wires & Cables' AND b.name='Polycab';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Finolex FR 1.5 sq mm Copper Wire', 'FIN-FR-1.5', 'coil', 2050.00, 1760.00, 44, 'Reliable copper conductor for residential applications.', c.id, b.id
FROM categories c, brands b WHERE c.name='Wires & Cables' AND b.name='Finolex';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'KEI FR 4 sq mm Copper Wire', 'KEI-FR-4.0', 'coil', 5120.00, 4420.00, 19, 'Higher current capacity for heavy-load circuits.', c.id, b.id
FROM categories c, brands b WHERE c.name='Wires & Cables' AND b.name='KEI';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'RR Kabel Superex 1.5 sq mm Wire', 'RR-SUPEREX-1.5', 'coil', 2025.00, 1735.00, 47, 'Good contractor-friendly house wiring product.', c.id, b.id
FROM categories c, brands b WHERE c.name='Wires & Cables' AND b.name='RR Kabel';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Polycab 4 Core 10 sq mm Aluminium Cable', 'POL-4C-10-AL', 'meter', 485.00, 414.00, 280, 'For commercial and industrial power distribution.', c.id, b.id
FROM categories c, brands b WHERE c.name='Wires & Cables' AND b.name='Polycab';

-- Switches & Sockets
INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Anchor Roma Classic 6A 1-Way Switch', 'ANC-ROMA-6A-1W', 'piece', 95.00, 67.00, 240, 'Fast-moving modular switch for residential projects.', c.id, b.id
FROM categories c, brands b WHERE c.name='Switches & Sockets' AND b.name='Anchor';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Anchor Roma Classic 6A Socket', 'ANC-ROMA-6A-SOC', 'piece', 125.00, 88.00, 180, 'Common 6A socket for modular installations.', c.id, b.id
FROM categories c, brands b WHERE c.name='Switches & Sockets' AND b.name='Anchor';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Schneider ZENcelo 6A Switch', 'SCH-ZEN-6A-1W', 'piece', 155.00, 112.00, 125, 'Premium modular switch for residential and office projects.', c.id, b.id
FROM categories c, brands b WHERE c.name='Switches & Sockets' AND b.name='Schneider Electric';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Legrand Myrius 6A 1-Way Switch', 'LEG-MYR-6A-1W', 'piece', 175.00, 128.00, 96, 'Premium modular range with strong finish.', c.id, b.id
FROM categories c, brands b WHERE c.name='Switches & Sockets' AND b.name='Legrand';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Havells Fabio 16A Socket', 'HAV-FABIO-16A', 'piece', 235.00, 169.00, 74, 'Useful for heavy-load appliance points.', c.id, b.id
FROM categories c, brands b WHERE c.name='Switches & Sockets' AND b.name='Havells';

-- MCBs & Protection
INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Schneider Easy9 16A SP MCB', 'SCH-E9-SP-16', 'piece', 285.00, 212.00, 88, 'Popular protection device for residential circuits.', c.id, b.id
FROM categories c, brands b WHERE c.name='MCBs & Protection' AND b.name='Schneider Electric';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Schneider Easy9 32A SP MCB', 'SCH-E9-SP-32', 'piece', 305.00, 226.00, 65, 'Suitable for higher-rated final circuits.', c.id, b.id
FROM categories c, brands b WHERE c.name='MCBs & Protection' AND b.name='Schneider Electric';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'L&T Exora 16A SP MCB', 'LNT-EXORA-SP-16', 'piece', 245.00, 181.00, 112, 'Cost-effective MCB for residential installations.', c.id, b.id
FROM categories c, brands b WHERE c.name='MCBs & Protection' AND b.name='L&T Electrical & Automation';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'L&T Exora 32A DP MCB', 'LNT-EXORA-DP-32', 'piece', 565.00, 420.00, 43, 'Double-pole protection for selected circuits.', c.id, b.id
FROM categories c, brands b WHERE c.name='MCBs & Protection' AND b.name='L&T Electrical & Automation';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Havells Euro II 40A DP MCB', 'HAV-EURO2-DP-40', 'piece', 610.00, 452.00, 51, 'Reliable DP protection for residential and commercial applications.', c.id, b.id
FROM categories c, brands b WHERE c.name='MCBs & Protection' AND b.name='Havells';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Schneider Easy9 40A 30mA RCCB', 'SCH-E9-RCCB-40-30', 'piece', 1640.00, 1250.00, 24, 'Residual current protection for improved electrical safety.', c.id, b.id
FROM categories c, brands b WHERE c.name='MCBs & Protection' AND b.name='Schneider Electric';

-- Distribution Boards
INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Havells Euro-II 8 Way SPN DB', 'HAV-DB-SPN-8W', 'piece', 1390.00, 1035.00, 35, 'Compact distribution board for residential installations.', c.id, b.id
FROM categories c, brands b WHERE c.name='Distribution Boards' AND b.name='Havells';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Schneider Easy9 8 Way SPN DB', 'SCH-DB-SPN-8W', 'piece', 1525.00, 1140.00, 29, 'Modular DB for residential and small commercial projects.', c.id, b.id
FROM categories c, brands b WHERE c.name='Distribution Boards' AND b.name='Schneider Electric';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Legrand Ekinoxe 12 Way SPN DB', 'LEG-DB-SPN-12W', 'piece', 1880.00, 1410.00, 18, 'Premium enclosure for larger residential circuits.', c.id, b.id
FROM categories c, brands b WHERE c.name='Distribution Boards' AND b.name='Legrand';

-- Lighting
INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Philips 9W LED Bulb 6500K', 'PHI-LED-9W-65K', 'piece', 145.00, 102.00, 320, 'Fast-moving general-purpose LED bulb.', c.id, b.id
FROM categories c, brands b WHERE c.name='Lighting' AND b.name='Philips';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Philips 12W LED Bulb 6500K', 'PHI-LED-12W-65K', 'piece', 185.00, 132.00, 250, 'Popular higher-output LED bulb for homes and shops.', c.id, b.id
FROM categories c, brands b WHERE c.name='Lighting' AND b.name='Philips';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Havells 20W LED Batten', 'HAV-BATTEN-20W', 'piece', 390.00, 286.00, 135, 'Slim LED batten suitable for homes, offices and shops.', c.id, b.id
FROM categories c, brands b WHERE c.name='Lighting' AND b.name='Havells';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Wipro 20W Garnet LED Panel', 'WIP-PANEL-20W', 'piece', 470.00, 345.00, 82, 'Recessed panel suitable for offices and commercial spaces.', c.id, b.id
FROM categories c, brands b WHERE c.name='Lighting' AND b.name='Wipro';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Syska 30W LED Flood Light', 'SYS-FLOOD-30W', 'piece', 920.00, 690.00, 47, 'Outdoor lighting option for signage, yards and small sites.', c.id, b.id
FROM categories c, brands b WHERE c.name='Lighting' AND b.name='Syska';

-- Fans
INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Crompton Aura Prime 1200mm Ceiling Fan', 'CRO-AURA-1200', 'piece', 2140.00, 1660.00, 38, 'Popular residential ceiling fan with broad customer appeal.', c.id, b.id
FROM categories c, brands b WHERE c.name='Fans' AND b.name='Crompton';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Crompton High Flo 1200mm Ceiling Fan', 'CRO-HIGHFLO-1200', 'piece', 2480.00, 1910.00, 26, 'High-air-delivery fan for homes and shops.', c.id, b.id
FROM categories c, brands b WHERE c.name='Fans' AND b.name='Crompton';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Orient Electric Apex-FX 1200mm Fan', 'ORI-APEX-FX-1200', 'piece', 2260.00, 1740.00, 31, 'Good mid-range ceiling fan for residential projects.', c.id, b.id
FROM categories c, brands b WHERE c.name='Fans' AND b.name='Orient Electric';

-- Motors
INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Crompton 1 HP Single Phase Motor', 'CRO-MOTOR-1HP-SP', 'piece', 8650.00, 7050.00, 12, 'Common motor size for pumps and small applications.', c.id, b.id
FROM categories c, brands b WHERE c.name='Motors' AND b.name='Crompton';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Crompton 2 HP Three Phase Motor', 'CRO-MOTOR-2HP-TP', 'piece', 15200.00, 12450.00, 8, 'Industrial motor for commercial and workshop applications.', c.id, b.id
FROM categories c, brands b WHERE c.name='Motors' AND b.name='Crompton';

-- Conduits
INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Supreme PVC Conduit 20mm Heavy', 'SUP-CON-20-H', 'length', 82.00, 58.00, 520, 'Heavy-duty conduit for concealed electrical wiring.', c.id, b.id
FROM categories c, brands b WHERE c.name='Conduits & Accessories' AND b.name='Supreme';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Supreme PVC Conduit 25mm Heavy', 'SUP-CON-25-H', 'length', 108.00, 76.00, 410, 'Common size for larger cable runs.', c.id, b.id
FROM categories c, brands b WHERE c.name='Conduits & Accessories' AND b.name='Supreme';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Havells Flexible Conduit 20mm', 'HAV-FLEX-CON-20', 'meter', 42.00, 29.00, 700, 'Flexible protection for wiring around bends and equipment.', c.id, b.id
FROM categories c, brands b WHERE c.name='Conduits & Accessories' AND b.name='Havells';

-- Pipes & Plumbing
INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Supreme PVC Pipe 25mm Class 2.5', 'SUP-PVC-25-C25', 'length', 285.00, 220.00, 180, 'General-purpose plumbing and water line pipe.', c.id, b.id
FROM categories c, brands b WHERE c.name='Pipes & Plumbing' AND b.name='Supreme';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Supreme CPVC Pipe 25mm SDR 11', 'SUP-CPVC-25-SDR11', 'length', 430.00, 335.00, 120, 'Suitable for hot and cold water plumbing applications.', c.id, b.id
FROM categories c, brands b WHERE c.name='Pipes & Plumbing' AND b.name='Supreme';

-- Hardware
INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'MS Self Tapping Screw 25mm Pack', 'HW-SCREW-MS-25', 'box', 145.00, 102.00, 95, 'General hardware item for fabrication and installation work.', c.id, b.id
FROM categories c, brands b WHERE c.name='Hardware' AND b.name='Havells';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'SS 304 Wall Plug Screw Set', 'HW-SS304-WPS', 'box', 320.00, 235.00, 64, 'Useful for electrical panel and fixture installation.', c.id, b.id
FROM categories c, brands b WHERE c.name='Hardware' AND b.name='Legrand';

-- Adhesives & Sealants
INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Construction Silicone Sealant Clear 280ml', 'ADH-SIL-CLEAR-280', 'tube', 245.00, 178.00, 76, 'Clear sealant for general construction and electrical applications.', c.id, b.id
FROM categories c, brands b WHERE c.name='Adhesives & Sealants' AND b.name='Havells';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'PVC Solvent Cement 118ml', 'ADH-PVC-SOL-118', 'tin', 135.00, 94.00, 105, 'For PVC pipe and fitting joints.', c.id, b.id
FROM categories c, brands b WHERE c.name='Adhesives & Sealants' AND b.name='Supreme';

-- Safety Equipment
INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Electrical Insulating Safety Gloves Class 00', 'SAFE-GLOVE-CLASS00', 'pair', 680.00, 495.00, 28, 'Basic electrical safety PPE for suitable low-voltage work.', c.id, b.id
FROM categories c, brands b WHERE c.name='Safety Equipment' AND b.name='Havells';

INSERT IGNORE INTO products
(name, sku, unit, selling_price, cost_price, stock_quantity, sales_notes, category_id, brand_id)
SELECT 'Industrial Safety Helmet Yellow', 'SAFE-HELMET-YEL', 'piece', 285.00, 195.00, 54, 'Construction-site head protection for general use.', c.id, b.id
FROM categories c, brands b WHERE c.name='Safety Equipment' AND b.name='L&T Electrical & Automation';

-- ============================================================
-- Product Specifications - Development Seed Data
-- ============================================================

-- Havells Life Line Plus 1.5 sq mm FR Wire
INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Conductor Material', 'Copper',
       p.id
FROM products p
WHERE p.sku = 'HAV-FR-1.5-BL';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Cross Section', '1.5 sq mm',
       p.id
FROM products p
WHERE p.sku = 'HAV-FR-1.5-BL';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Voltage Rating', '1100 V',
       p.id
FROM products p
WHERE p.sku = 'HAV-FR-1.5-BL';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Insulation', 'PVC',
       p.id
FROM products p
WHERE p.sku = 'HAV-FR-1.5-BL';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Core Type', 'Single Core',
       p.id
FROM products p
WHERE p.sku = 'HAV-FR-1.5-BL';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Colour', 'Blue',
       p.id
FROM products p
WHERE p.sku = 'HAV-FR-1.5-BL';


-- ============================================================
-- Polycab Etira 2.5 sq mm FR Wire
-- ============================================================

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Conductor Material', 'Copper',
       p.id
FROM products p
WHERE p.sku = 'POL-ETIRA-2.5';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Cross Section', '2.5 sq mm',
       p.id
FROM products p
WHERE p.sku = 'POL-ETIRA-2.5';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Voltage Rating', '1100 V',
       p.id
FROM products p
WHERE p.sku = 'POL-ETIRA-2.5';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Insulation', 'PVC',
       p.id
FROM products p
WHERE p.sku = 'POL-ETIRA-2.5';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Core Type', 'Single Core',
       p.id
FROM products p
WHERE p.sku = 'POL-ETIRA-2.5';


-- ============================================================
-- Schneider Easy9 16A SP MCB
-- ============================================================

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Rated Current', '16 A',
       p.id
FROM products p
WHERE p.sku = 'SCH-E9-SP-16';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Number of Poles', '1 Pole',
       p.id
FROM products p
WHERE p.sku = 'SCH-E9-SP-16';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Tripping Curve', 'C Curve',
       p.id
FROM products p
WHERE p.sku = 'SCH-E9-SP-16';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Breaking Capacity', '6 kA',
       p.id
FROM products p
WHERE p.sku = 'SCH-E9-SP-16';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Frequency', '50 Hz',
       p.id
FROM products p
WHERE p.sku = 'SCH-E9-SP-16';


-- ============================================================
-- Havells Euro-II 8 Way SPN DB
-- ============================================================

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Number of Ways', '8 Way',
       p.id
FROM products p
WHERE p.sku = 'HAV-DB-SPN-8W';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'DB Type', 'SPN',
       p.id
FROM products p
WHERE p.sku = 'HAV-DB-SPN-8W';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Material', 'Polycarbonate',
       p.id
FROM products p
WHERE p.sku = 'HAV-DB-SPN-8W';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Mounting', 'Surface Mount',
       p.id
FROM products p
WHERE p.sku = 'HAV-DB-SPN-8W';


-- ============================================================
-- Philips 12W LED Bulb
-- ============================================================

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Power', '12 W',
       p.id
FROM products p
WHERE p.sku = 'PHI-LED-12W-65K';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Colour Temperature', '6500 K',
       p.id
FROM products p
WHERE p.sku = 'PHI-LED-12W-65K';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Light Colour', 'Cool Day Light',
       p.id
FROM products p
WHERE p.sku = 'PHI-LED-12W-65K';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Base Type', 'B22',
       p.id
FROM products p
WHERE p.sku = 'PHI-LED-12W-65K';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Voltage', '230 V AC',
       p.id
FROM products p
WHERE p.sku = 'PHI-LED-12W-65K';


-- ============================================================
-- Crompton Aura Prime Ceiling Fan
-- ============================================================

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Sweep', '1200 mm',
       p.id
FROM products p
WHERE p.sku = 'CRO-AURA-1200';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Power', '74 W',
       p.id
FROM products p
WHERE p.sku = 'CRO-AURA-1200';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Speed', '390 RPM',
       p.id
FROM products p
WHERE p.sku = 'CRO-AURA-1200';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Motor Type', 'Single Phase',
       p.id
FROM products p
WHERE p.sku = 'CRO-AURA-1200';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Number of Blades', '3',
       p.id
FROM products p
WHERE p.sku = 'CRO-AURA-1200';


-- ============================================================
-- Crompton 1 HP Single Phase Motor
-- ============================================================

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Rated Power', '1 HP',
       p.id
FROM products p
WHERE p.sku = 'CRO-MOTOR-1HP-SP';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Phase', 'Single Phase',
       p.id
FROM products p
WHERE p.sku = 'CRO-MOTOR-1HP-SP';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Voltage', '230 V',
       p.id
FROM products p
WHERE p.sku = 'CRO-MOTOR-1HP-SP';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Frequency', '50 Hz',
       p.id
FROM products p
WHERE p.sku = 'CRO-MOTOR-1HP-SP';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Motor Type', 'Induction Motor',
       p.id
FROM products p
WHERE p.sku = 'CRO-MOTOR-1HP-SP';


-- ============================================================
-- Supreme PVC Conduit 20mm Heavy
-- ============================================================

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Diameter', '20 mm',
       p.id
FROM products p
WHERE p.sku = 'SUP-CON-20-H';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Material', 'PVC',
       p.id
FROM products p
WHERE p.sku = 'SUP-CON-20-H';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Type', 'Heavy Duty',
       p.id
FROM products p
WHERE p.sku = 'SUP-CON-20-H';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Application', 'Concealed Electrical Wiring',
       p.id
FROM products p
WHERE p.sku = 'SUP-CON-20-H';


-- ============================================================
-- Supreme CPVC Pipe 25mm
-- ============================================================

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Diameter', '25 mm',
       p.id
FROM products p
WHERE p.sku = 'SUP-CPVC-25-SDR11';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Material', 'CPVC',
       p.id
FROM products p
WHERE p.sku = 'SUP-CPVC-25-SDR11';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Pressure Rating', 'SDR 11',
       p.id
FROM products p
WHERE p.sku = 'SUP-CPVC-25-SDR11';

INSERT IGNORE INTO product_specifications
(specification_name, specification_value, product_id)
SELECT 'Application', 'Hot and Cold Water',
       p.id
FROM products p
WHERE p.sku = 'SUP-CPVC-25-SDR11';