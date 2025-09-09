-- Insert default waste types
INSERT INTO public.waste_types (name, description, color_code, recycling_instructions) VALUES
('Organic', 'Food scraps, yard waste, biodegradable materials', '#4ade80', 'Compost in designated bins. Remove any non-organic materials.'),
('Recyclable', 'Paper, cardboard, plastic bottles, glass, metal cans', '#3b82f6', 'Clean containers before recycling. Sort by material type.'),
('Electronic', 'Computers, phones, batteries, electronic devices', '#f59e0b', 'Take to certified e-waste facilities. Remove personal data first.'),
('Hazardous', 'Chemicals, paint, batteries, medical waste', '#ef4444', 'Special handling required. Contact hazardous waste facility.'),
('General', 'Non-recyclable, non-hazardous waste', '#6b7280', 'Regular waste collection. Minimize when possible.');

-- Insert sample facilities
INSERT INTO public.facilities (name, type, address, capacity, operating_hours, contact_info, status) VALUES
('Green Valley Recycling Center', 'recycling_center', '123 Eco Street, Green Valley', 5000, 
 '{"monday": "8:00-17:00", "tuesday": "8:00-17:00", "wednesday": "8:00-17:00", "thursday": "8:00-17:00", "friday": "8:00-17:00", "saturday": "9:00-15:00", "sunday": "closed"}',
 '{"phone": "+1-555-0123", "email": "info@greenvalley.com"}', 'active'),
('Central Composting Facility', 'composting', '456 Compost Lane, Central District', 3000,
 '{"monday": "7:00-16:00", "tuesday": "7:00-16:00", "wednesday": "7:00-16:00", "thursday": "7:00-16:00", "friday": "7:00-16:00", "saturday": "closed", "sunday": "closed"}',
 '{"phone": "+1-555-0124", "email": "compost@central.com"}', 'active'),
('Metro Transfer Station', 'transfer_station', '789 Transfer Road, Metro Area', 8000,
 '{"monday": "6:00-18:00", "tuesday": "6:00-18:00", "wednesday": "6:00-18:00", "thursday": "6:00-18:00", "friday": "6:00-18:00", "saturday": "8:00-16:00", "sunday": "closed"}',
 '{"phone": "+1-555-0125", "email": "operations@metro.com"}', 'active');

-- Insert sample training modules
INSERT INTO public.training_modules (title, description, content, duration_minutes, category, is_published) VALUES
('Waste Sorting Basics', 'Learn the fundamentals of proper waste sorting', 
 'This module covers the basic principles of waste sorting, including identifying different waste types, understanding recycling symbols, and proper disposal methods for various materials.',
 15, 'sorting', true),
('Composting at Home', 'Complete guide to home composting', 
 'Learn how to set up and maintain a home composting system. Covers what materials to compost, troubleshooting common issues, and using finished compost in your garden.',
 25, 'composting', true),
('Hazardous Waste Safety', 'Safe handling and disposal of hazardous materials', 
 'Important safety protocols for handling hazardous waste including chemicals, batteries, and electronic waste. Learn proper storage, transportation, and disposal methods.',
 30, 'safety', true),
('Recycling Best Practices', 'Maximize your recycling impact', 
 'Advanced recycling techniques, understanding local recycling programs, and tips for reducing contamination in recycling streams.',
 20, 'recycling', true);
