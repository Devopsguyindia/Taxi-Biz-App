-- ============================================
-- Taxi Biz App - Database Setup Script
-- ============================================
-- This script creates a database and table for storing
-- taxi enquiry form submissions
-- ============================================

-- Create database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS taxi_biz_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE taxi_biz_app;

-- ============================================
-- Create enquiries table
-- ============================================
CREATE TABLE IF NOT EXISTS enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    pickup VARCHAR(255) NOT NULL,
    drop_location VARCHAR(255) NOT NULL,
    pickup_datetime DATETIME,
    package_type VARCHAR(50) DEFAULT 'Airport Pickup / Drop',
    vehicle_preference VARCHAR(50) DEFAULT 'Toyota Innova - SUV',
    message TEXT,
    status ENUM('pending', 'contacted', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for common queries
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_phone (phone),
    INDEX idx_package_type (package_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Sample INSERT statements
-- ============================================

-- Example 1: Airport pickup enquiry
INSERT INTO enquiries (
    name, 
    phone, 
    pickup, 
    drop_location, 
    pickup_datetime, 
    package_type, 
    vehicle_preference, 
    message
) VALUES (
    'Rahul Sharma',
    '+91 98765 43210',
    'Pune Airport (PNQ)',
    'Koregaon Park, Pune',
    '2026-06-25 14:30:00',
    'Airport Pickup / Drop',
    'Toyota Innova - SUV',
    'Need pickup for 2 passengers with 3 check-in bags'
);

-- Example 2: Pune to Mumbai taxi enquiry
INSERT INTO enquiries (
    name, 
    phone, 
    pickup, 
    drop_location, 
    pickup_datetime, 
    package_type, 
    vehicle_preference, 
    message
) VALUES (
    'Priya Patel',
    '+91 87654 32109',
    'Hinjewadi, Pune',
    'Andheri West, Mumbai',
    '2026-06-26 08:00:00',
    'Local Hire',
    'Maruti Ertiga - MUV',
    'Business trip, need to reach by 11 AM'
);

-- Example 3: Mumbai return package enquiry
INSERT INTO enquiries (
    name, 
    phone, 
    pickup, 
    drop_location, 
    pickup_datetime, 
    package_type, 
    vehicle_preference, 
    message
) VALUES (
    'Amit Deshmukh',
    '+91 76543 21098',
    'Shivaji Nagar, Pune',
    'Dadar, Mumbai',
    '2026-06-27 06:00:00',
    'Mumbai Return Package',
    'Swift Dzire - Sedan',
    'Same day return expected around 8 PM'
);

-- ============================================
-- Useful queries for management
-- ============================================

-- View all pending enquiries
-- SELECT * FROM enquiries WHERE status = 'pending' ORDER BY created_at DESC;

-- View enquiries from last 7 days
-- SELECT * FROM enquiries WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) ORDER BY created_at DESC;

-- Update enquiry status
-- UPDATE enquiries SET status = 'contacted' WHERE id = 1;

-- Get statistics by package type
-- SELECT package_type, COUNT(*) as count FROM enquiries GROUP BY package_type;

-- Get statistics by vehicle preference
-- SELECT vehicle_preference, COUNT(*) as count FROM enquiries GROUP BY vehicle_preference;

-- ============================================
-- Create a user for application access (optional)
-- ============================================
-- Uncomment and modify these lines to create a dedicated database user
-- CREATE USER IF NOT EXISTS 'taxi_app_user'@'localhost' IDENTIFIED BY 'your_secure_password';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON taxi_biz_app.* TO 'taxi_app_user'@'localhost';
-- FLUSH PRIVILEGES;
