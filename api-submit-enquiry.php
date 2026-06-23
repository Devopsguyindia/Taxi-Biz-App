<?php
/**
 * Taxi Biz App - Enquiry Form Submission Handler
 * 
 * This PHP script handles form submissions and inserts data into MySQL database.
 * Place this file in your web server's public directory (e.g., /var/www/taxi-biz-api/)
 * 
 * Update the database credentials below before deploying.
 */

// Database configuration - UPDATE THESE VALUES
$db_host = 'localhost';
$db_name = 'taxi_biz_app';
$db_user = 'taxi_app_user';  // Create this user using database-setup.sql
$db_pass = 'your_secure_password';  // Replace with actual password

// CORS headers (if needed for cross-origin requests)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// If JSON fails, try POST form data
if (empty($input)) {
    $input = $_POST;
}

// Validate required fields
$required_fields = ['name', 'phone', 'pickup', 'drop_location'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Missing required fields',
        'fields' => $missing_fields
    ]);
    exit();
}

// Sanitize input
$name = htmlspecialchars(strip_tags(trim($input['name'])));
$phone = htmlspecialchars(strip_tags(trim($input['phone'])));
$pickup = htmlspecialchars(strip_tags(trim($input['pickup'])));
$drop_location = htmlspecialchars(strip_tags(trim($input['drop_location'])));
$pickup_datetime = !empty($input['datetime']) ? $input['datetime'] : null;
$package_type = !empty($input['packageType']) ? htmlspecialchars(strip_tags(trim($input['packageType']))) : 'Airport Pickup / Drop';
$vehicle_preference = !empty($input['vehicle']) ? htmlspecialchars(strip_tags(trim($input['vehicle']))) : 'Toyota Innova - SUV';
$message = !empty($input['message']) ? htmlspecialchars(strip_tags(trim($input['message']))) : '';

try {
    // Connect to database
    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
    
    // Prepare SQL statement
    $sql = "INSERT INTO enquiries (
        name, 
        phone, 
        pickup, 
        drop_location, 
        pickup_datetime, 
        package_type, 
        vehicle_preference, 
        message
    ) VALUES (
        :name, 
        :phone, 
        :pickup, 
        :drop_location, 
        :pickup_datetime, 
        :package_type, 
        :vehicle_preference, 
        :message
    )";
    
    $stmt = $pdo->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':pickup', $pickup);
    $stmt->bindParam(':drop_location', $drop_location);
    $stmt->bindParam(':pickup_datetime', $pickup_datetime);
    $stmt->bindParam(':package_type', $package_type);
    $stmt->bindParam(':vehicle_preference', $vehicle_preference);
    $stmt->bindParam(':message', $message);
    
    // Execute statement
    $stmt->execute();
    
    // Get the inserted ID
    $enquiry_id = $pdo->lastInsertId();
    
    // Return success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Enquiry submitted successfully',
        'enquiry_id' => $enquiry_id
    ]);
    
} catch (PDOException $e) {
    // Log error (in production, log to file, not output)
    error_log("Database error: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error',
        'message' => 'Failed to submit enquiry. Please try again.'
    ]);
}
?>
