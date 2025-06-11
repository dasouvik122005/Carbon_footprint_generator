// --- 1. Data and Emission Factors (More Detailed for India Context) ---
// Remember: These are example values. Real-world data requires extensive research and LCA studies.

// Product Categories and Specific Products
const PRODUCT_DATA = {
    "electronics": {
        // base_emissions: manufacturing & raw materials
        // weight_kg: product weight
        // green_reduction: reduction factor for green options
        // avg_wattage: average wattage for usage phase (W)
        // expected_lifespan_years: years for usage phase calculation
        // eol_factor_per_kg: kg CO2eq per kg of product for End-of-Life
        
        "smartphone": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "laptop": {'base_emissions': 200, 'weight_kg': 2.0, 'green_reduction': 0.15, 'avg_wattage': 60, 'expected_lifespan_years': 5, 'eol_factor_per_kg': 0.5},
        "tablet": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "smartwatch": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "bluetooth_earbuds": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "wireless_headphones": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "power_bank": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "portable_bluetooth_speaker": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "fitness_tracker": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "e_reader": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "desktop_computer": {'base_emissions': 200, 'weight_kg': 2.0, 'green_reduction': 0.15, 'avg_wattage': 60, 'expected_lifespan_years': 5, 'eol_factor_per_kg': 0.5},
        "all_in_one_pc": {'base_emissions': 200, 'weight_kg': 2.0, 'green_reduction': 0.15, 'avg_wattage': 60, 'expected_lifespan_years': 5, 'eol_factor_per_kg': 0.5},
        "graphics_tablet": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "external_monitor": {'base_emissions': 150, 'weight_kg': 3.0, 'green_reduction': 0.15, 'avg_wattage': 50, 'expected_lifespan_years': 6, 'eol_factor_per_kg': 0.5},
        "portable_ssd": {'base_emissions': 10, 'weight_kg': 0.1, 'green_reduction': 0.15, 'avg_wattage': 2, 'expected_lifespan_years': 6, 'eol_factor_per_kg': 0.5},
        "usb_flash_drive": {'base_emissions': 10, 'weight_kg': 0.1, 'green_reduction': 0.15, 'avg_wattage': 2, 'expected_lifespan_years': 6, 'eol_factor_per_kg': 0.5},
        "wireless_keyboard": {'base_emissions': 20, 'weight_kg': 0.2, 'green_reduction': 0.15, 'avg_wattage': 1, 'expected_lifespan_years': 4, 'eol_factor_per_kg': 0.5},
        "wireless_mouse": {'base_emissions': 20, 'weight_kg': 0.2, 'green_reduction': 0.15, 'avg_wattage': 1, 'expected_lifespan_years': 4, 'eol_factor_per_kg': 0.5},
        "gaming_console": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "vr_headset": {'base_emissions': 80, 'weight_kg': 0.5, 'green_reduction': 0.15, 'avg_wattage': 10, 'expected_lifespan_years': 4, 'eol_factor_per_kg': 0.5},
        "dslr_camera": {'base_emissions': 80, 'weight_kg': 0.5, 'green_reduction': 0.15, 'avg_wattage': 10, 'expected_lifespan_years': 4, 'eol_factor_per_kg': 0.5},
        "mirrorless_camera": {'base_emissions': 80, 'weight_kg': 0.5, 'green_reduction': 0.15, 'avg_wattage': 10, 'expected_lifespan_years': 4, 'eol_factor_per_kg': 0.5},
        "camcorder": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "drone": {'base_emissions': 80, 'weight_kg': 0.5, 'green_reduction': 0.15, 'avg_wattage': 10, 'expected_lifespan_years': 4, 'eol_factor_per_kg': 0.5},
        "action_camera": {'base_emissions': 80, 'weight_kg': 0.5, 'green_reduction': 0.15, 'avg_wattage': 10, 'expected_lifespan_years': 4, 'eol_factor_per_kg': 0.5},
        "webcam": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "projector": {'base_emissions': 150, 'weight_kg': 3.0, 'green_reduction': 0.15, 'avg_wattage': 50, 'expected_lifespan_years': 6, 'eol_factor_per_kg': 0.5},
        "digital_microscope": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "3d_printer": {'base_emissions': 150, 'weight_kg': 3.0, 'green_reduction': 0.15, 'avg_wattage': 50, 'expected_lifespan_years': 6, 'eol_factor_per_kg': 0.5},
        "network_router": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "network_switch": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "external_hard_drive": {'base_emissions': 10, 'weight_kg': 0.1, 'green_reduction': 0.15, 'avg_wattage': 2, 'expected_lifespan_years': 6, 'eol_factor_per_kg': 0.5},
        "media_streaming_device": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "set_top_box": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "tv_tuner_card": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "gps_navigator": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "car_dash_camera": {'base_emissions': 80, 'weight_kg': 0.5, 'green_reduction': 0.15, 'avg_wattage': 10, 'expected_lifespan_years': 4, 'eol_factor_per_kg': 0.5},
        "vehicle_blackbox": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "car_audio_receiver": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "radar_detector": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "walkie_talkie": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "digital_voice_recorder": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "portable_media_player": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "portable_dvd_player": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "electronic_dictionary": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "electric_shaver": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "hair_trimmer": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "blood_pressure_monitor": {'base_emissions': 150, 'weight_kg': 3.0, 'green_reduction': 0.15, 'avg_wattage': 50, 'expected_lifespan_years': 6, 'eol_factor_per_kg': 0.5},
        "digital_thermometer": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "pulse_oximeter": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5},
        "glucose_monitor": {'base_emissions': 55, 'weight_kg': 0.3, 'green_reduction': 0.15, 'avg_wattage': 5, 'expected_lifespan_years': 3, 'eol_factor_per_kg': 0.5}
    },

    "apparel": {
        "t-shirt_cotton": { base_emissions: 6.5, weight_kg: 0.2, green_reduction: 0.12, eol_factor_per_kg: 0.3 },
        "jeans_denim": { base_emissions: 18, weight_kg: 0.7, green_reduction: 0.15, eol_factor_per_kg: 0.4 },
        "sneakers": { base_emissions: 15, weight_kg: 1.0, green_reduction: 0.10, eol_factor_per_kg: 0.6 },
        "saree": { base_emissions: 10, weight_kg: 0.6, green_reduction: 0.08, eol_factor_per_kg: 0.35 },
        "kurta": { base_emissions: 8, weight_kg: 0.5, green_reduction: 0.07, eol_factor_per_kg: 0.3 },
        "sherwani": { base_emissions: 12, weight_kg: 1.2, green_reduction: 0.10, eol_factor_per_kg: 0.4 },
        "jacket_leather": { base_emissions: 25, weight_kg: 1.5, green_reduction: 0.05, eol_factor_per_kg: 0.5 },
        "jacket_winter": { base_emissions: 20, weight_kg: 1.2, green_reduction: 0.08, eol_factor_per_kg: 0.45 },
        "scarf_wool": { base_emissions: 4, weight_kg: 0.2, green_reduction: 0.10, eol_factor_per_kg: 0.25 },
        "sweater_knitted": { base_emissions: 10, weight_kg: 0.5, green_reduction: 0.12, eol_factor_per_kg: 0.3 },
        "sweatshirt": { base_emissions: 8, weight_kg: 0.4, green_reduction: 0.10, eol_factor_per_kg: 0.3 },
        "trousers_formal": { base_emissions: 12, weight_kg: 0.6, green_reduction: 0.08, eol_factor_per_kg: 0.35 },
        "blouse": { base_emissions: 6, weight_kg: 0.3, green_reduction: 0.07, eol_factor_per_kg: 0.25 },
        "leggings": { base_emissions: 5, weight_kg: 0.3, green_reduction: 0.06, eol_factor_per_kg: 0.2 },
        "sweatpants": { base_emissions: 7, weight_kg: 0.4, green_reduction: 0.08, eol_factor_per_kg: 0.25 },
        "shorts": { base_emissions: 5, weight_kg: 0.3, green_reduction: 0.05, eol_factor_per_kg: 0.2 },
        "cap": { base_emissions: 3, weight_kg: 0.1, green_reduction: 0.05, eol_factor_per_kg: 0.15 },
        "hat": { base_emissions: 4, weight_kg: 0.2, green_reduction: 0.06, eol_factor_per_kg: 0.2 },
        "socks": { base_emissions: 2, weight_kg: 0.1, green_reduction: 0.04, eol_factor_per_kg: 0.1 },
        "gloves": { base_emissions: 3, weight_kg: 0.1, green_reduction: 0.05, eol_factor_per_kg: 0.15 },
        "belt": { base_emissions: 4, weight_kg: 0.2, green_reduction: 0.05, eol_factor_per_kg: 0.15 },
        "tie": { base_emissions: 3, weight_kg: 0.1, green_reduction: 0.04, eol_factor_per_kg: 0.1 },
        "sunglasses": { base_emissions: 5, weight_kg: 0.1, green_reduction: 0.05, eol_factor_per_kg: 0.15 },
        "backpack": { base_emissions: 10, weight_kg: 0.8, green_reduction: 0.07, eol_factor_per_kg: 0.3 },
        "handbag": { base_emissions: 12, weight_kg: 0.5, green_reduction: 0.08, eol_factor_per_kg: 0.35 },
        "wallet": { base_emissions: 4, weight_kg: 0.1, green_reduction: 0.05, eol_factor_per_kg: 0.15 },
        "umbrella": { base_emissions: 6, weight_kg: 0.3, green_reduction: 0.05, eol_factor_per_kg: 0.2 },
        "scarf": { base_emissions: 4, weight_kg: 0.2, green_reduction: 0.10, eol_factor_per_kg: 0.25 },
        "sweatband": { base_emissions: 2, weight_kg: 0.05, green_reduction: 0.03, eol_factor_per_kg: 0.1 },
        "sports_shoes": { base_emissions: 15, weight_kg: 1.0, green_reduction: 0.10, eol_factor_per_kg: 0.6 },
        "sports_jacket": { base_emissions: 20, weight_kg: 1.2, green_reduction: 0.08, eol_factor_per_kg: 0.45 },
        "sports_pants": { base_emissions: 10, weight_kg: 0.6, green_reduction: 0.07, eol_factor_per_kg: 0.35 },
        "sports_tshirt": { base_emissions: 6, weight_kg: 0.2, green_reduction: 0.06, eol_factor_per_kg: 0.3 },
        "sports_cap": { base_emissions: 3, weight_kg: 0.1, green_reduction: 0.05, eol_factor_per_kg: 0.15 },
        "swimwear": { base_emissions: 8, weight_kg: 0.3, green_reduction: 0.07, eol_factor_per_kg: 0.2 },
        "raincoat": { base_emissions: 15, weight_kg: 0.8, green_reduction: 0.10, eol_factor_per_kg: 0.4 },
        "winter_coat": { base_emissions: 25, weight_kg: 1.5, green_reduction: 0.12, eol_factor_per_kg: 0.5 },
        "pajamas": { base_emissions: 10, weight_kg: 0.5, green_reduction: 0.08, eol_factor_per_kg: 0.3 },
        "nightgown": { base_emissions: 8, weight_kg: 0.4, green_reduction: 0.07, eol_factor_per_kg: 0.25 },
        "lingerie_set": { base_emissions: 5, weight_kg: 0.2, green_reduction: 0.05, eol_factor_per_kg: 0.15 },
        "swimsuit": { base_emissions: 10, weight_kg: 0.3, green_reduction: 0.06, eol_factor_per_kg: 0.2 },
        "bikini": { base_emissions: 8, weight_kg: 0.2, green_reduction: 0.05, eol_factor_per_kg: 0.15 },
        "sweatshirt_cotton": { base_emissions: 12, weight_kg: 0.5, green_reduction: 0.10, eol_factor_per_kg: 0.3 },
        "hoodie": { base_emissions: 15, weight_kg: 0.6, green_reduction: 0.12, eol_factor_per_kg: 0.35 },
        "blazer": { base_emissions: 20, weight_kg: 0.8, green_reduction: 0.10, eol_factor_per_kg: 0.4 },
        "suit": { base_emissions: 30, weight_kg: 1.5, green_reduction: 0.08, eol_factor_per_kg: 0.5 },
        "tie_silk": { base_emissions: 5, weight_kg: 0.1, green_reduction: 0.05, eol_factor_per_kg: 0.15 },
        "tie_cotton": { base_emissions: 4, weight_kg: 0.1, green_reduction: 0.04, eol_factor_per_kg: 0.1 },
        "scarf_wool": { base_emissions: 6, weight_kg: 0.2, green_reduction: 0.05, eol_factor_per_kg: 0.2 },
        "scarf_cotton": { base_emissions: 5, weight_kg: 0.1, green_reduction: 0.04, eol_factor_per_kg: 0.15 },
        "sweater_wool": { base_emissions: 15, weight_kg: 0.6, green_reduction: 0.10, eol_factor_per_kg: 0.3 },
        "sweater_cotton": { base_emissions: 12, weight_kg: 0.5, green_reduction: 0.08, eol_factor_per_kg: 0.25 }
    },

    "books": {
        "paperback_novel": { base_emissions: 1.2, weight_kg: 0.4, green_reduction: 0.05, eol_factor_per_kg: 0.2 },
        "textbook": { base_emissions: 3.5, weight_kg: 1.5, green_reduction: 0.07, eol_factor_per_kg: 0.25 },
        "comic_book": { base_emissions: 1.0, weight_kg: 0.3, green_reduction: 0.05, eol_factor_per_kg: 0.2 },
        "magazine": { base_emissions: 1.5, weight_kg: 0.2, green_reduction: 0.04, eol_factor_per_kg: 0.15 },
        "hardcover_book": { base_emissions: 4.0, weight_kg: 1.0, green_reduction: 0.06, eol_factor_per_kg: 0.3 },
        "children_book": { base_emissions: 2.0, weight_kg: 0.5, green_reduction: 0.05, eol_factor_per_kg: 0.2 },
        "cookbook": { base_emissions: 3.0, weight_kg: 1.2, green_reduction: 0.07, eol_factor_per_kg: 0.25 },
        "self_help_book": { base_emissions: 2.5, weight_kg: 0.6, green_reduction: 0.05, eol_factor_per_kg: 0.2 },
        "biography": { base_emissions: 3.0, weight_kg: 1.0, green_reduction: 0.06, eol_factor_per_kg: 0.25 },
        "science_fiction": { base_emissions: 2.0, weight_kg: 0.5, green_reduction: 0.05, eol_factor_per_kg: 0.2 },
        "history_book": { base_emissions: 3.5, weight_kg: 1.5, green_reduction: 0.07, eol_factor_per_kg: 0.25 },
        "art_book": { base_emissions: 4.5, weight_kg: 1.8, green_reduction: 0.08, eol_factor_per_kg: 0.3 },
        "poetry_book": { base_emissions: 1.5, weight_kg: 0.4, green_reduction: 0.05, eol_factor_per_kg: 0.2 },
        "graphic_novel": { base_emissions: 2.5, weight_kg: 0.7, green_reduction: 0.06, eol_factor_per_kg: 0.25 },
        "textbook_science": { base_emissions: 4.0, weight_kg: 1.8, green_reduction: 0.08, eol_factor_per_kg: 0.3 },
        "textbook_mathematics": { base_emissions: 3.5, weight_kg: 1.5, green_reduction: 0.07, eol_factor_per_kg: 0.25 },
        "textbook_literature": { base_emissions: 3.0, weight_kg: 1.2, green_reduction: 0.06, eol_factor_per_kg: 0.2 },
        "textbook_engineering": { base_emissions: 4.5, weight_kg: 2.0, green_reduction: 0.09, eol_factor_per_kg: 0.35 },
        "textbook_computer_science": { base_emissions: 4.0, weight_kg: 1.8, green_reduction: 0.08, eol_factor_per_kg: 0.3 },
        "textbook_medical": { base_emissions: 5.0, weight_kg: 2.5, green_reduction: 0.10, eol_factor_per_kg: 0.4 },
        "textbook_business": { base_emissions: 3.5, weight_kg: 1.5, green_reduction: 0.07, eol_factor_per_kg: 0.25 },
        "textbook_philosophy": { base_emissions: 3.0, weight_kg: 1.2, green_reduction: 0.06, eol_factor_per_kg: 0.2 },
        "textbook_psychology": { base_emissions: 3.5, weight_kg: 1.5, green_reduction: 0.07, eol_factor_per_kg: 0.25 },
        "textbook_economics": { base_emissions: 3.0, weight_kg: 1.2, green_reduction: 0.06, eol_factor_per_kg: 0.2 },
        "textbook_physics": { base_emissions: 4.0, weight_kg: 1.8, green_reduction: 0.08, eol_factor_per_kg: 0.3 },
        "textbook_chemistry": { base_emissions: 4.0, weight_kg: 1.8, green_reduction: 0.08, eol_factor_per_kg: 0.3 },
        "textbook_biology": { base_emissions: 4.0, weight_kg: 1.8, green_reduction: 0.08, eol_factor_per_kg: 0.3 },
        "textbook_geography": { base_emissions: 3.5, weight_kg: 1.5, green_reduction: 0.07, eol_factor_per_kg: 0.25 },
        "textbook_history": { base_emissions: 3.5, weight_kg: 1.5, green_reduction: 0.07, eol_factor_per_kg: 0.25 },
        "textbook_law": { base_emissions: 4.5, weight_kg: 2.0, green_reduction: 0.09, eol_factor_per_kg: 0.35 },
        "textbook_art": { base_emissions: 4.0, weight_kg: 1.8, green_reduction: 0.08, eol_factor_per_kg: 0.3 },
        "textbook_music": { base_emissions: 3.5, weight_kg: 1.5, green_reduction: 0.07, eol_factor_per_kg: 0.25 },
        "textbook_social_sciences": { base_emissions: 3.0, weight_kg: 1.2, green_reduction: 0.06, eol_factor_per_kg: 0.2 },
        "textbook_environmental_science": { base_emissions: 4.0, weight_kg: 1.8, green_reduction: 0.08, eol_factor_per_kg: 0.3 }
    },

    "home_goods": {
        "kitchen_blender": { base_emissions: 30, weight_kg: 1.5, green_reduction: 0.10, eol_factor_per_kg: 0.6 },
        "bed_sheet_set": { base_emissions: 12, weight_kg: 1.0, green_reduction: 0.08, eol_factor_per_kg: 0.3 },
        "cooker_pressure": { base_emissions: 8, weight_kg: 2.5, green_reduction: 0.05, eol_factor_per_kg: 0.7 }, // Example Indian specific
        "cooker_nonstick": { base_emissions: 10, weight_kg: 1.0, green_reduction: 0.07, eol_factor_per_kg: 0.4 },
        "cooker_cast_iron": { base_emissions: 15, weight_kg: 3.0, green_reduction: 0.05, eol_factor_per_kg: 0.8 }, // Example Indian specific
        "cooker_steel": { base_emissions: 12, weight_kg: 2.0, green_reduction: 0.06, eol_factor_per_kg: 0.5 }, // Example Indian specific
        "frying_pan": { base_emissions: 10, weight_kg: 1.0, green_reduction: 0.07, eol_factor_per_kg: 0.4 },
        "cooking_pot": { base_emissions: 12, weight_kg: 1.5, green_reduction: 0.08, eol_factor_per_kg: 0.5 },
        "dining_table": { base_emissions: 50, weight_kg: 20, green_reduction: 0.10, eol_factor_per_kg: 0.4 },
        "dining_chair_wood": { base_emissions: 15, weight_kg: 5, green_reduction: 0.08, eol_factor_per_kg: 0.3 },
        "dining_chair": { base_emissions: 15, weight_kg: 5, green_reduction: 0.08, eol_factor_per_kg: 0.3 },
        "sofa_set": { base_emissions: 100, weight_kg: 50, green_reduction: 0.12, eol_factor_per_kg: 0.5 },
        "coffee_table": { base_emissions: 30, weight_kg: 15, green_reduction: 0.10, eol_factor_per_kg: 0.4 },
        "television_stand": { base_emissions: 40, weight_kg: 20, green_reduction: 0.08, eol_factor_per_kg: 0.5 },
        "bed_frame": { base_emissions: 80, weight_kg: 40, green_reduction: 0.10, eol_factor_per_kg: 0.5 },
        "mattress": { base_emissions: 60, weight_kg: 30, green_reduction: 0.08, eol_factor_per_kg: 0.4 },
        "wardrobe": { base_emissions: 120, weight_kg: 60, green_reduction: 0.10, eol_factor_per_kg: 0.6 },
        "bookshelf": { base_emissions: 40, weight_kg: 20, green_reduction: 0.08, eol_factor_per_kg: 0.5 },
        "refrigerator": { base_emissions: 200, weight_kg: 70, green_reduction: 0.15, eol_factor_per_kg: 0.7 },
        "washing_machine": { base_emissions: 150, weight_kg: 60, green_reduction: 0.12, eol_factor_per_kg: 0.6 },
        "microwave_oven": { base_emissions: 80, weight_kg: 25, green_reduction: 0.10, eol_factor_per_kg: 0.5 },
        "television": { base_emissions: 120, weight_kg: 30, green_reduction: 0.10, eol_factor_per_kg: 0.5 },
        "air_conditioner": { base_emissions: 300, weight_kg: 50, green_reduction: 0.20, eol_factor_per_kg: 0.8 },
        "ceiling_fan": { base_emissions: 50, weight_kg: 5, green_reduction: 0.08, eol_factor_per_kg: 0.3 },
        "water_heater": { base_emissions: 200, weight_kg: 30, green_reduction: 0.15, eol_factor_per_kg: 0.7 },
        "vacuum_cleaner": { base_emissions: 100, weight_kg: 10, green_reduction: 0.12, eol_factor_per_kg: 0.5 },
        "kettle_electric": { base_emissions: 30, weight_kg: 1.5, green_reduction: 0.10, eol_factor_per_kg: 0.6 },
        "toaster": { base_emissions: 20, weight_kg: 1.0, green_reduction: 0.08, eol_factor_per_kg: 0.5 },
        "iron": { base_emissions: 40, weight_kg: 1.5, green_reduction: 0.10, eol_factor_per_kg: 0.6 },
        "blender": { base_emissions: 30, weight_kg: 1.5, green_reduction: 0.10, eol_factor_per_kg: 0.6 },
        "coffee_machine": { base_emissions: 50, weight_kg: 2.0, green_reduction: 0.12, eol_factor_per_kg: 0.5 },
        "dishwasher": { base_emissions: 180, weight_kg: 50, green_reduction: 0.15, eol_factor_per_kg: 0.7 },
        "toilet": { base_emissions: 80, weight_kg: 25, green_reduction: 0.12, eol_factor_per_kg: 0.5 },
        "shower_head": { base_emissions: 20, weight_kg: 1.0, green_reduction: 0.08, eol_factor_per_kg: 0.4 },
        "sink": { base_emissions: 50, weight_kg: 10, green_reduction: 0.10, eol_factor_per_kg: 0.5 },
        "bathtub": { base_emissions: 100, weight_kg: 50, green_reduction: 0.15, eol_factor_per_kg: 0.6 },
        "shower_curtain": { base_emissions: 10, weight_kg: 0.5, green_reduction: 0.05, eol_factor_per_kg: 0.2 },
        "towel_set": { base_emissions: 8, weight_kg: 0.5, green_reduction: 0.05, eol_factor_per_kg: 0.2 },
    }
    // "custom" category handled dynamically

};

// Packaging emissions per kg of material
const PACKAGING_MATERIAL_EMISSIONS_PER_KG = {
    "cardboard": 1.5,   // kg CO2eq per kg
    "plastic": 3.0,     // kg CO2eq per kg
    "air_cushion": 5.0,  // Higher for specialized plastic air cushions
};

// Packaging types and their composition/weight factors
const PACKAGING_CONFIGS = {
    "standard": { base_kg: 0.2, per_item_kg: 0.1, composition: { cardboard: 0.7, plastic: 0.3, air_cushion: 0 } },
    "minimal": { base_kg: 0.1, per_item_kg: 0.05, composition: { cardboard: 0.9, plastic: 0.1, air_cushion: 0 } },
    "fragile": { base_kg: 0.3, per_item_kg: 0.2, composition: { cardboard: 0.6, plastic: 0.3, air_cushion: 0.1 } },
    "premium": { base_kg: 0.5, per_item_kg: 0.15, composition: { cardboard: 0.8, plastic: 0.15, air_cushion: 0.05 } },
};

// Transport Emissions per tonne-kilometer (tkm) - tailored for India's logistics
const TRANSPORT_EMISSIONS_PER_TKM = {
    "road_standard": 0.08, // kg CO2eq per tkm (average for heavy goods vehicles, Indian context)
    "road_express": 0.10,  // Faster routes, less efficient
    "air_cargo": 0.65,     // High emissions
    "rail_freight": 0.03,  // More efficient than road for long haul
    "return_logistics": 0.12, // Often less optimized than forward journey
    "sea_freight": 0.02,    // Very low for long distances, but not common in India
};

// Last-mile vehicle emissions (per tonne-kilometer for the specific short distance)
const LAST_MILE_VEHICLE_EMISSIONS_PER_TKM = {
    "motorcycle": 0.20,   // Higher for individual small vehicle, stop-go traffic
    "e_rickshaw": 0.05,   // Electric, very low
    "van": 0.15, // Small commercial van
};

// Simulated major Indian warehouse locations (lat/lon for distance calculation)
const WAREHOUSE_LOCATIONS = {
    "Agra_UP": { lat: 27.1767, lon: 78.0081 },
    "Ahmedabad_GJ": { lat: 23.0225, lon: 72.5714 },
    "Amritsar_PB": { lat: 31.6340, lon: 74.8723 },
    "Bengaluru_KA": { lat: 12.9716, lon: 77.5946 },
    "Bhopal_MP": { lat: 23.2599, lon: 77.4126 },
    "Chennai_TN": { lat: 13.0827, lon: 80.2707 },
    "Coimbatore_TN": { lat: 11.0168, lon: 76.9558 },
    "Dehradun_UT": { lat: 30.3165, lon: 78.0322 },
    "Delhi_DL": { lat: 28.7041, lon: 77.1025 },
    "Guwahati_AS": { lat: 26.1445, lon: 91.7362 },
    "Hyderabad_TS": { lat: 17.3850, lon: 78.4867 },
    "Indore_MP": { lat: 22.7196, lon: 75.8577 },
    "Jaipur_RJ": { lat: 26.9124, lon: 75.7873 },
    "Jamshedpur_JH": { lat: 22.8046, lon: 86.2029 },
    "Jodhpur_RJ": { lat: 26.2389, lon: 73.0243 },
    "Kanpur_UP": { lat: 26.4499, lon: 80.3319 },
    "Kochi_KL": { lat: 9.9312, lon: 76.2673 },
    "Kolkata_WB": { lat: 22.5726, lon: 88.3639 },
    "Lucknow_UP": { lat: 26.8467, lon: 80.9462 },
    "Mumbai_MH": { lat: 19.0760, lon: 72.8777 },
    "Mysuru_KA": { lat: 12.2958, lon: 76.6394 },
    "Nagpur_MH": { lat: 21.1458, lon: 79.0882 },
    "Nashik_MH": { lat: 19.9975, lon: 73.7898 },
    "Patna_BR": { lat: 25.5941, lon: 85.1376 },
    "Pune_MH": { lat: 18.5204, lon: 73.8567 },
    "Raipur_CG": { lat: 21.2514, lon: 81.6296 },
    "Ranchi_JH": { lat: 23.3441, lon: 85.3096 },
    "Surat_GJ": { lat: 21.1702, lon: 72.8311 },
    "Thiruvananthapuram_KL": { lat: 8.5241, lon: 76.9366 },
    "Udaipur_RJ": { lat: 24.5854, lon: 73.7125 },
    "Vadodara_GJ": { lat: 22.3072, lon: 73.1812 },
    "Vijayawada_AP": { lat: 16.5062, lon: 80.6480 },
    "Visakhapatnam_AP": { lat: 17.6868, lon: 83.2185 }
};

// Average distances for last-mile delivery components (simplified)
const AVERAGE_LAST_MILE_KM = 25; // One way for delivery hub to customer
const AVERAGE_RETURN_TRIP_KM = 25; // One way for customer to return hub

// Emission factor for electricity in India (average grid mix)
const ELECTRICITY_EMISSION_FACTOR_INDIA_KWH = 0.82; // kg CO2eq per kWh (Approx. for India 2023)

// --- 2. DOM Elements ---
const cartItemsContainer = document.getElementById('cart-items-container');
const addAnotherItemBtn = document.getElementById('add-item-btn');
const calculateBtn = document.getElementById('calculate-btn');
const resultsSection = document.querySelector('.results-section');
const contextInsightsSection = document.querySelector('.context-insights');
const tipsSection = document.querySelector('.tips-section');

const totalFootprintSpan = document.getElementById('total-footprint');
const productEmissionsSpan = document.getElementById('product-emissions');
const electricityEmissionsSpan = document.getElementById('electricity-emissions'); // New
const packagingEmissionsSpan = document.getElementById('packaging-emissions');
const transportEmissionsSpan = document.getElementById('transport-emissions');
const returnEmissionItem = document.getElementById('return-emission-item');
const returnEmissionsSpan = document.getElementById('return-emissions');
const eolEmissionsSpan = document.getElementById('eol-emissions'); // New

const contextCarP = document.getElementById('context-car');
const contextTreesP = document.getElementById('context-trees');
const contextElectricityP = document.getElementById('context-electricity');
const contextBusP = document.getElementById('context-bus');
const contextOfflineP = document.getElementById('context-offline'); // New
const greenTipsList = document.getElementById('green-tips');

const originWarehouseSelect = document.getElementById('origin-warehouse');
const destinationLocationSelect = document.getElementById('destination-location');
const transportModeSelect = document.getElementById('transport-mode');
const lastMileVehicleSelect = document.getElementById('last-mile-vehicle'); // New
const packagingTypeSelect = document.getElementById('packaging-type');
const simulateReturnCheckbox = document.getElementById('simulate-return');

const toastContainer = document.getElementById('toast-container');

let itemIdCounter = 1;
let footprintChart;

// Chart colors (can be defined directly here for Chart.js)
const CHART_COLORS = {
    manufacturing: '#66bb6a', // Green
    electricity: '#FFC107',   // Yellow/Amber for electricity
    packaging: '#ff9800',     // Orange
    transportation: '#2196f3',// Blue
    returns: '#dc3545',       // Red
    eol: '#9C27B0'            // Purple for End-of-Life
};

// --- 3. Utility Functions ---

// Haversine formula for distance between two lat/lon points (in km)
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function showToast(message, type = 'info') {
    if (!toastContainer) {
        console.error("Toast container not found!");
        return;
    }
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.textContent = message;
    toastContainer.appendChild(toast);

    void toast.offsetWidth; // Trigger reflow for animation

    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// --- 4. Core Calculation Functions ---

function getProductOrCustomData(itemDiv) {
    const productCategory = itemDiv.querySelector('.product-category-select').value;
    const quantity = parseInt(itemDiv.querySelector('.quantity-input').value, 10);
    const isGreenProduct = itemDiv.querySelector('.green-product-checkbox').checked;

    if (productCategory === 'custom') {
        const customName = itemDiv.querySelector('.custom-name-input').value;
        const customWeight = parseFloat(itemDiv.querySelector('.custom-weight-input').value);
        const customEmissions = parseFloat(itemDiv.querySelector('.custom-emissions-input').value);
        const customLifespan = parseFloat(itemDiv.querySelector('.custom-lifespan-input').value);
        const customWattage = parseFloat(itemDiv.querySelector('.custom-wattage-input').value);
        const customEol = parseFloat(itemDiv.querySelector('.custom-eol-input').value);

        // Basic validation for custom inputs
        if (!customName || isNaN(customWeight) || customWeight <= 0 || isNaN(customEmissions) || customEmissions < 0 ||
            isNaN(customLifespan) || customLifespan <= 0 || isNaN(customWattage) || customWattage < 0 || isNaN(customEol) || customEol < 0) {
            showToast("Please fill in valid numbers for all custom product fields.", "error");
            return null;
        }

        return {
            productName: customName, // Using customName as productName for logging
            base_emissions: customEmissions,
            weight_kg: customWeight,
            green_reduction: 0, // No green reduction for custom unless user specifies
            avg_wattage: customWattage,
            expected_lifespan_years: customLifespan,
            eol_factor_per_kg: customEol,
            is_custom: true
        };
    } else {
        const productName = itemDiv.querySelector('.product-name-select').value;
        const product = PRODUCT_DATA[productCategory] ? PRODUCT_DATA[productCategory][productName] : null;
        if (!product) {
            console.warn(`Product data not found for ${productCategory} - ${productName}.`);
            return null;
        }
        return product;
    }
}

function calculateProductEmissions(productData, quantity, isGreenProduct) {
    if (!productData) return 0;
    let emissions = productData.base_emissions * quantity;
    if (isGreenProduct && productData.green_reduction) {
        emissions *= (1 - productData.green_reduction);
    }
    return emissions;
}

function calculateElectricityEmissions(productData, quantity) {
    if (!productData || !productData.avg_wattage || !productData.expected_lifespan_years) {
        return 0; // Not applicable for non-electronic items or missing data
    }
    const total_kwh = (productData.avg_wattage * productData.expected_lifespan_years * 365 * 24) / 1000;
    return total_kwh * ELECTRICITY_EMISSION_FACTOR_INDIA_KWH * quantity;
}

function calculateEndLifeEmissions(productData, quantity) {
    if (!productData || !productData.eol_factor_per_kg) return 0;
    return productData.weight_kg * productData.eol_factor_per_kg * quantity;
}

function calculatePackagingEmissions(totalProductWeightKg, numProducts, packagingType) {
    const config = PACKAGING_CONFIGS[packagingType];
    if (!config) {
        console.warn(`Packaging type '${packagingType}' configuration not found.`);
        return 0;
    }

    const estimatedPackagingWeight = config.base_kg + (numProducts * config.per_item_kg);
    let totalPackagingCO2 = 0;

    for (const material in config.composition) {
        const materialEmissions = PACKAGING_MATERIAL_EMISSIONS_PER_KG[material];
        if (materialEmissions !== undefined) {
            totalPackagingCO2 += estimatedPackagingWeight * config.composition[material] * materialEmissions;
        } else {
            console.warn(`Unknown packaging material: ${material}`);
        }
    }
    return totalPackagingCO2;
}

function calculateTransportEmissions(totalWeightKg, originCoords, destinationCoords, transportMode, lastMileVehicle, isReturn = false) {
    if (!originCoords || !destinationCoords || !transportMode || !lastMileVehicle) {
        console.error("Missing coordinates or transport mode/vehicle for transport calculation.");
        return 0;
    }

    const interWarehouseDistance = haversineDistance(
        originCoords.lat, originCoords.lon,
        destinationCoords.lat, destinationCoords.lon
    );

    // Long haul emissions
    const longHaulTonneKm = (totalWeightKg / 1000) * interWarehouseDistance;
    const longHaulEmissionsPerTkm = TRANSPORT_EMISSIONS_PER_TKM[transportMode];
    let totalTransportEmissions = longHaulTonneKm * longHaulEmissionsPerTkm;

    // Last mile emissions
    const lastMileTonneKm = (totalWeightKg / 1000) * (isReturn ? AVERAGE_RETURN_TRIP_KM : AVERAGE_LAST_MILE_KM);
    const lastMileEmissionsPerTkm = LAST_MILE_VEHICLE_EMISSIONS_PER_TKM[lastMileVehicle];

    totalTransportEmissions += lastMileTonneKm * lastMileEmissionsPerTkm;

    // Additional adjustment for express/air or returns
    if (transportMode === "road_express" || transportMode === "air_cargo") {
        totalTransportEmissions *= 1.1; // Slightly higher for less optimized express/air routes
    }
    if (isReturn) { // Returns are generally less efficient overall
        totalTransportEmissions *= 1.2;
    }

    return totalTransportEmissions;
}

// --- 5. UI/UX Interaction Functions ---

function updateProductNamesAndCustomInputs(productCategorySelect) {
    const category = productCategorySelect.value;
    const itemDiv = productCategorySelect.closest('.cart-item');
    const productNameSelect = itemDiv.querySelector('.product-name-select');
    // Remove customInputsDiv logic since custom is removed

    // Create a search input if not already present
    let searchInput = itemDiv.querySelector('.product-search-input');
    if (!searchInput) {
        searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search product...';
        searchInput.className = 'product-search-input';
        searchInput.style.marginBottom = '6px';
        productNameSelect.parentNode.insertBefore(searchInput, productNameSelect);
    }

    // Helper to get display name
    function getDisplayName(productKey) {
        return productKey.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace('T Shirt', 'T-Shirt');
    }

    // Function to populate options, with search term first if matched
    function populateOptions(searchTerm = '') {
        productNameSelect.innerHTML = '<option value="">Select Product First</option>';
        if (category && PRODUCT_DATA[category]) {
            let keys = Object.keys(PRODUCT_DATA[category]);
            if (searchTerm) {
                // Find matches (case-insensitive, substring)
                const matches = keys.filter(k => getDisplayName(k).toLowerCase().includes(searchTerm.toLowerCase()));
                // Remove matches from keys and prepend them
                keys = [...matches, ...keys.filter(k => !matches.includes(k))];
            }
            keys.forEach(productKey => {
                const option = document.createElement('option');
                option.value = productKey;
                option.textContent = getDisplayName(productKey);
                productNameSelect.appendChild(option);
            });
            productNameSelect.disabled = false;
        } else {
            productNameSelect.disabled = true;
        }
    }

    // Initial population
    populateOptions();

    // Add search event
    searchInput.oninput = function () {
        populateOptions(this.value);
        // If there's a match, select the first matching option
        if (this.value) {
            const firstOption = productNameSelect.options[1];
            if (firstOption) productNameSelect.selectedIndex = 1;
        }
    };
}

function addCartItem() {
    itemIdCounter++;
    const newItemDiv = document.createElement('div');
    newItemDiv.classList.add('cart-item');
    newItemDiv.dataset.itemId = itemIdCounter;
    newItemDiv.innerHTML = `
        <div class="input-row">
            <div class="input-group">
                <label for="product-category-${itemIdCounter}">Category:</label>
                <select id="product-category-${itemIdCounter}" class="product-category-select">
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="apparel">Apparel & Footwear</option>
                    <option value="books">Books & Media</option>
                    <option value="home_goods">Home Goods</option>
                    <option value="custom">Custom Product</option>
                </select>
            </div>
            <div class="input-group">
                <label for="product-name-${itemIdCounter}">Product:</label>
                <select id="product-name-${itemIdCounter}" class="product-name-select" disabled>
                    <option value="">Select Product First</option>
                </select>
            </div>
        </div>
        <div class="custom-product-inputs hidden">
            <div class="input-row">
                <div class="input-group">
                    <label for="custom-name-${itemIdCounter}">Custom Name:</label>
                    <input type="text" id="custom-name-${itemIdCounter}" class="custom-name-input" placeholder="e.g., Antique Vase">
                </div>
                <div class="input-group">
                    <label for="custom-weight-${itemIdCounter}">Est. Weight (kg):</label>
                    <input type="number" id="custom-weight-${itemIdCounter}" class="custom-weight-input" min="0.1" step="0.1" value="0.5">
                </div>
            </div>
            <div class="input-row">
                <div class="input-group">
                    <label for="custom-emissions-${itemIdCounter}">Est. Mfg. Emissions (kg CO2eq):</label>
                    <input type="number" id="custom-emissions-${itemIdCounter}" class="custom-emissions-input" min="0" step="1" value="10">
                </div>
                <div class="input-group">
                    <label for="custom-lifespan-${itemIdCounter}">Est. Lifespan (yrs) <i class="fas fa-info-circle" title="Relevant for electronics usage phase"></i>:</label>
                    <input type="number" id="custom-lifespan-${itemIdCounter}" class="custom-lifespan-input" min="1" step="1" value="5">
                </div>
            </div>
            <div class="input-row">
                <div class="input-group">
                    <label for="custom-wattage-${itemIdCounter}">Est. Avg. Wattage (W) <i class="fas fa-info-circle" title="For active usage of electronic items"></i>:</label>
                    <input type="number" id="custom-wattage-${itemIdCounter}" class="custom-wattage-input" min="0" step="1" value="50">
                </div>
                <div class="input-group">
                    <label for="custom-eol-${itemIdCounter}">Est. End-of-Life Factor (kg CO2eq/kg) <i class="fas fa-info-circle" title="Emissions from disposal/recycling"></i>:</label>
                    <input type="number" id="custom-eol-${itemIdCounter}" class="custom-eol-input" min="0" step="0.01" value="0.5">
                </div>
            </div>
        </div>
        <div class="input-row">
            <div class="input-group">
                <label for="quantity-${itemIdCounter}">Quantity:</label>
                <input type="number" id="quantity-${itemIdCounter}" class="quantity-input" value="1" min="1">
            </div>
            <div class="input-group checkbox-group">
                <input type="checkbox" id="green-product-${itemIdCounter}" class="green-product-checkbox">
                <label for="green-product-${itemIdCounter}">Green Product/Seller <i class="fas fa-seedling" title="Supplied by eco-friendly brand or seller"></i></label>
            </div>
        </div>
        <button class="remove-item-btn" title="Remove item"><i class="fas fa-trash-alt"></i></button>
    `;
    cartItemsContainer.appendChild(newItemDiv);

    // Attach event listeners for the newly added item
    newItemDiv.querySelector('.product-category-select').addEventListener('change', (event) => updateProductNamesAndCustomInputs(event.target));
    newItemDiv.querySelector('.remove-item-btn').addEventListener('click', (event) => removeCartItem(event.target.closest('.remove-item-btn')));

    // Re-attach validation listeners for new inputs
    newItemDiv.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => input.closest('.input-group').classList.remove('invalid'));
        input.addEventListener('change', () => input.closest('.input-group').classList.remove('invalid'));
    });

    showToast("Item added to cart!", "success");
}

function removeCartItem(buttonElement) {
    const itemDiv = buttonElement.closest('.cart-item');
    if (cartItemsContainer.children.length > 1) {
        itemDiv.remove();
        showToast("Item removed from cart.", "info");
    } else {
        showToast("Cannot remove last item from cart. At least one item is required.", "error");
    }
}

function validateInputs() {
    let isValid = true;
    const itemDivs = document.querySelectorAll('.cart-item');

    itemDivs.forEach(itemDiv => {
        const productCategorySelect = itemDiv.querySelector('.product-category-select');
        const productNameSelect = itemDiv.querySelector('.product-name-select');
        const quantityInput = itemDiv.querySelector('.quantity-input');
        const customInputsDiv = itemDiv.querySelector('.custom-product-inputs');

        // Reset validation styles for current item
        productCategorySelect.closest('.input-group').classList.remove('invalid');
        productNameSelect.closest('.input-group').classList.remove('invalid');
        quantityInput.closest('.input-group').classList.remove('invalid');
        customInputsDiv.querySelectorAll('input').forEach(input => input.closest('.input-group').classList.remove('invalid'));


        if (!productCategorySelect.value) {
            productCategorySelect.closest('.input-group').classList.add('invalid');
            isValid = false;
        }

        if (productCategorySelect.value === 'custom') {
            const customName = itemDiv.querySelector('.custom-name-input');
            const customWeight = itemDiv.querySelector('.custom-weight-input');
            const customEmissions = itemDiv.querySelector('.custom-emissions-input');
            const customLifespan = itemDiv.querySelector('.custom-lifespan-input');
            const customWattage = itemDiv.querySelector('.custom-wattage-input');
            const customEol = itemDiv.querySelector('.custom-eol-input');

            // Validate custom fields
            [customName, customWeight, customEmissions, customLifespan, customWattage, customEol].forEach(input => {
                if (!input.value || isNaN(parseFloat(input.value)) || parseFloat(input.value) < (input === customWeight ? 0.1 : 0)) {
                     input.closest('.input-group').classList.add('invalid');
                     isValid = false;
                }
            });
        } else if (!productNameSelect.value) { // For pre-defined products
            productNameSelect.closest('.input-group').classList.add('invalid');
            isValid = false;
        }

        const quantity = parseInt(quantityInput.value, 10);
        if (isNaN(quantity) || quantity < 1) {
            quantityInput.closest('.input-group').classList.add('invalid');
            isValid = false;
        }
    });

    // Validate global inputs
    [originWarehouseSelect, destinationLocationSelect, transportModeSelect, lastMileVehicleSelect, packagingTypeSelect].forEach(select => {
        if (!select.value) {
            select.closest('.input-group').classList.add('invalid');
            isValid = false;
        } else {
            select.closest('.input-group').classList.remove('invalid');
        }
    });

    if (!isValid) {
        showToast("Please fill in all required fields correctly. Highlighted fields need attention.", "error");
    }
    return isValid;
}

// --- 6. Main Calculation and Display Logic ---

calculateBtn.addEventListener('click', () => {
    if (!validateInputs()) {
        return;
    }

    let totalProductEmissions = 0;
    let totalElectricityEmissions = 0; // New
    let totalEndLifeEmissions = 0;     // New
    let totalItemWeightKg = 0;
    let numProductsInCart = 0;

    const cartItemsData = [];
    document.querySelectorAll('.cart-item').forEach(itemDiv => {
        const productCategory = itemDiv.querySelector('.product-category-select').value;
        const quantity = parseInt(itemDiv.querySelector('.quantity-input').value, 10);
        const isGreenProduct = itemDiv.querySelector('.green-product-checkbox').checked;

        const productData = getProductOrCustomData(itemDiv);

        if (productData && !isNaN(quantity) && quantity >= 1) {
            cartItemsData.push({ productData, quantity, isGreenProduct, productCategory }); // Store category too
        }
    });

    if (cartItemsData.length === 0) {
        showToast("Please add at least one valid product to your cart.", "error");
        return;
    }

    cartItemsData.forEach(item => {
        totalProductEmissions += calculateProductEmissions(item.productData, item.quantity, item.isGreenProduct);
        totalItemWeightKg += item.productData.weight_kg * item.quantity;
        numProductsInCart += item.quantity;

        // Calculate electricity emissions only for electronics or custom products with wattage
        if (item.productCategory === 'electronics' || (item.productData.is_custom && item.productData.avg_wattage > 0)) {
             totalElectricityEmissions += calculateElectricityEmissions(item.productData, item.quantity);
        }

        // Calculate end-of-life emissions
        totalEndLifeEmissions += calculateEndLifeEmissions(item.productData, item.quantity);
    });

    const originCoords = WAREHOUSE_LOCATIONS[originWarehouseSelect.value];
    const destinationCoords = WAREHOUSE_LOCATIONS[destinationLocationSelect.value];
    const transportMode = transportModeSelect.value;
    const lastMileVehicle = lastMileVehicleSelect.value; // New
    const packagingType = packagingTypeSelect.value;
    const simulateReturn = simulateReturnCheckbox.checked;

    // Calculate packaging emissions
    const packagingEmissions = calculatePackagingEmissions(totalItemWeightKg, numProductsInCart, packagingType);

    // Total weight for transport (products + packaging weight influence)
    const estimatedPackagingWeightForShipment = PACKAGING_CONFIGS[packagingType].base_kg + (numProductsInCart * PACKAGING_CONFIGS[packagingType].per_item_kg);
    const totalShipmentWeightKg = totalItemWeightKg + estimatedPackagingWeightForShipment;

    // Calculate transportation emissions
    const transportEmissions = calculateTransportEmissions(totalShipmentWeightKg, originCoords, destinationCoords, transportMode, lastMileVehicle);

    let returnEmissions = 0;
    if (simulateReturn) {
        returnEmissions = calculateTransportEmissions(totalShipmentWeightKg, destinationCoords, originCoords, "return_logistics", lastMileVehicle, true);
    }

    const totalFootprint = totalProductEmissions + totalElectricityEmissions + packagingEmissions + transportEmissions + returnEmissions + totalEndLifeEmissions;

    // --- Display Results ---
    resultsSection.classList.remove('hidden');
    setTimeout(() => contextInsightsSection.classList.remove('hidden'), 200);
    setTimeout(() => tipsSection.classList.remove('hidden'), 400);

    totalFootprintSpan.textContent = totalFootprint.toFixed(2);
    productEmissionsSpan.textContent = totalProductEmissions.toFixed(2);
    electricityEmissionsSpan.textContent = totalElectricityEmissions.toFixed(2); // New
    packagingEmissionsSpan.textContent = packagingEmissions.toFixed(2);
    transportEmissionsSpan.textContent = transportEmissions.toFixed(2);
    eolEmissionsSpan.textContent = totalEndLifeEmissions.toFixed(2); // New

    if (simulateReturn) {
        returnEmissionItem.classList.remove('hidden');
        returnEmissionsSpan.textContent = returnEmissions.toFixed(2);
    } else {
        returnEmissionItem.classList.add('hidden');
    }

    // --- Update Chart ---
    const chartLabels = ['Manufacturing', 'Electricity Usage', 'Packaging', 'Transportation', 'End-of-Life'];
    const chartValues = [totalProductEmissions, totalElectricityEmissions, packagingEmissions, transportEmissions, totalEndLifeEmissions];
    const chartColors = [CHART_COLORS.manufacturing, CHART_COLORS.electricity, CHART_COLORS.packaging, CHART_COLORS.transportation, CHART_COLORS.eol];

    if (simulateReturn) {
        chartLabels.push('Returns');
        chartValues.push(returnEmissions);
        chartColors.push(CHART_COLORS.returns);
    }

    const chartData = {
        labels: chartLabels,
        datasets: [{
            data: chartValues,
            backgroundColor: chartColors,
            hoverOffset: 4
        }]
    };

    if (footprintChart) {
        footprintChart.data = chartData;
        footprintChart.update();
    } else {
        const ctx = document.getElementById('footprintChart');
        if (ctx) {
            footprintChart = new Chart(ctx, {
                type: 'pie',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: {
                                    family: "'Open Sans', sans-serif"
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== null) {
                                        label += context.parsed.toFixed(2) + ' kg CO2eq';
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        } else {
            console.error("Canvas element for chart not found!");
        }
    }

    // --- Contextualization for India (approximate values) ---
    const CO2_PER_KM_CAR_INDIA = 0.22; // kg CO2eq per km for average Indian car (more recent data)
    const AVERAGE_TREE_ABSORPTION_YEARLY = 20; // kg CO2 per tree per year
    const AVERAGE_INDIAN_HOUSEHOLD_ELECTRICITY_KG_CO2_MONTH = 80; // Rough estimate for 1 month's electricity in kg CO2eq
    const CO2_PER_KM_BUS_INDIA = 0.08; // kg CO2eq per passenger-km for intercity bus (very rough)

    contextCarP.innerHTML = `<i class="fas fa-car"></i> Equivalent to driving an average Indian car for about <strong>${(totalFootprint / CO2_PER_KM_CAR_INDIA).toFixed(0)} km</strong>.`;
    contextTreesP.innerHTML = `<i class="fas fa-tree"></i> Would require about <strong>${(totalFootprint / AVERAGE_TREE_ABSORPTION_YEARLY).toFixed(1)} trees to absorb this CO2 in a year</strong>.`;
    contextElectricityP.innerHTML = `<i class="fas fa-bolt"></i> Similar to the average electricity consumption of an Indian household for <strong>${(totalFootprint / AVERAGE_INDIAN_HOUSEHOLD_ELECTRICITY_KG_CO2_MONTH).toFixed(1)} months</strong>.`;
    contextBusP.innerHTML = `<i class="fas fa-bus"></i> Roughly equivalent to one person travelling by intercity bus for <strong>${(totalFootprint / CO2_PER_KM_BUS_INDIA).toFixed(0)} km</strong>.`;

    // New: Simplified Offline Shopping Comparison
    const OFFLINE_TRIP_DISTANCE_KM = 15; // Assumed round trip to local market/mall
    const OFFLINE_BAG_EMISSIONS_KG_CO2 = 0.05; // Emissions for a typical plastic/paper carry bag

    const offlineTravelEmissions = OFFLINE_TRIP_DISTANCE_KM * CO2_PER_KM_CAR_INDIA;
    const offlinePackagingEmissions = OFFLINE_BAG_EMISSIONS_KG_CO2 * numProductsInCart; // More bags for more items
    const estimatedOfflineFootprint = offlineTravelEmissions + offlinePackagingEmissions;

    if (totalFootprint < estimatedOfflineFootprint) {
        contextOfflineP.innerHTML = `<i class="fas fa-shopping-bag"></i> Your online order has a lower footprint (approx. <strong>${(estimatedOfflineFootprint - totalFootprint).toFixed(2)} kg CO2eq less</strong>) than a typical offline shopping trip with similar items by car.`;
        contextOfflineP.style.color = CHART_COLORS.manufacturing; // Use green for positive comparison
    } else {
        contextOfflineP.innerHTML = `<i class="fas fa-store"></i> Your online order has a higher footprint (approx. <strong>${(totalFootprint - estimatedOfflineFootprint).toFixed(2)} kg CO2eq more</strong>) than a typical offline shopping trip with similar items by car.`;
        contextOfflineP.style.color = CHART_COLORS.returns; // Use red for higher footprint
    }


    // --- Dynamic Tips ---
    greenTipsList.innerHTML = '';
    const tips = new Set();

    tips.add("Opt for 'Standard Road' or 'Rail Freight' shipping over 'Air Cargo' to significantly reduce transport emissions.");
    tips.add("Consolidate multiple purchases into a single order to minimize packaging and last-mile delivery runs.");
    tips.add("Choose 'Minimal Packaging' if your items don't require extra protection.");
    tips.add("Look for brands or sellers marked as 'Green Product/Seller' to support sustainable production.");
    tips.add("Avoid unnecessary returns; check product descriptions and reviews thoroughly before buying to minimize return logistics.");
    tips.add("Prioritize buying from sellers with warehouses closer to your location to reduce long-haul transportation.");
    tips.add("Support Indian local businesses and artisans; often, their supply chains are shorter and more transparent.");
    tips.add("Consider repairing or upcycling old items instead of always buying new ones.");

    if (totalFootprint > 150) {
        tips.add("<span class='highlight-tip'>Your order has a relatively high footprint. Review heavy/large items, shipping mode, or consider essentials only.</span>");
    }
    if (packagingType === "fragile" || packagingType === "premium") {
        tips.add("You chose extra packaging. While necessary for some items, it adds to the footprint. Consider if it's truly needed next time.");
    }
    if (transportMode === "air_cargo") {
        tips.add("Air cargo has the highest carbon footprint. If time permits, choose slower shipping options.");
    }
    if (simulateReturn) {
        tips.add("Returns add a significant carbon cost. Careful selection reduces the chance of needing to return items.");
    }
    if (lastMileVehicle === "motorcycle") {
        tips.add("Motorcycle delivery has a higher last-mile footprint per item. Consider options like E-rickshaw if available.");
    } else if (lastMileVehicle === "e_rickshaw") {
        tips.add("Excellent choice for last-mile delivery! E-rickshaws or electric vans significantly reduce urban delivery emissions.");
    }
    // Calculate distance for location-based tip
    const currentCalculatedDistance = haversineDistance(originCoords.lat, originCoords.lon, destinationCoords.lat, destinationCoords.lon);
    if (originWarehouseSelect.value === destinationLocationSelect.value) {
        tips.add("Great! Shopping from a local warehouse significantly reduces long-haul transport emissions.");
    } else if (currentCalculatedDistance > 1500) {
         tips.add("Your order is traveling a long distance across India. Consider if a local alternative or a seller with a closer warehouse is available.");
    }
    if (totalElectricityEmissions > 0 && totalElectricityEmissions / totalFootprint > 0.1) { // If electricity usage is a significant portion
        tips.add("Your electronic items' electricity consumption significantly contributes to the footprint. Unplug chargers, use power-saving modes, and consider renewable energy sources if possible.");
    }
    if (totalEndLifeEmissions > 0 && totalEndLifeEmissions / totalFootprint > 0.05) {
        tips.add("End-of-life emissions are notable. Look for products designed for recycling, and ensure proper disposal or donation.");
    }


    tips.forEach(tip => {
        const li = document.createElement('li');
        li.innerHTML = tip;
        greenTipsList.appendChild(li);
    });

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast("Carbon footprint calculated!", "success");
});

// --- 7. Initial Setup and Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Populate the first product name dropdown on load
    const initialProductCategorySelect = document.getElementById('product-category-1');
    if (initialProductCategorySelect) {
        updateProductNamesAndCustomInputs(initialProductCategorySelect);
    }

    // Event listener for adding new items
    addAnotherItemBtn.addEventListener('click', addCartItem);

    // Event delegation for dynamic elements (product category, remove item)
    cartItemsContainer.addEventListener('change', (event) => {
        if (event.target.classList.contains('product-category-select')) {
            updateProductNamesAndCustomInputs(event.target);
        }
    });
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item-btn') || event.target.closest('.remove-item-btn')) {
            removeCartItem(event.target.closest('.remove-item-btn'));
        }
    });

    // Initial state setup for results and tips sections
    resultsSection.classList.add('hidden');
    contextInsightsSection.classList.add('hidden');
    tipsSection.classList.add('hidden');

    // Add input/change event listeners to initial inputs for validation feedback clearing
    document.querySelectorAll('.input-group input, .input-group select').forEach(input => {
        input.addEventListener('input', () => {
            input.closest('.input-group').classList.remove('invalid');
        });
        input.addEventListener('change', () => {
            input.closest('.input-group').classList.remove('invalid');
        });
    });
});