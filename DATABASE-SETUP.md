# Database Setup Guide - Taxi Biz App

This guide explains how to set up MySQL database for storing taxi enquiry form submissions.

## Files Included

1. **database-setup.sql** - SQL script to create database and table
2. **api-submit-enquiry.php** - PHP script to handle form submissions
3. **DATABASE-SETUP.md** - This documentation file

---

## Step 1: Set Up MySQL Database

### Option A: Using Command Line

1. **Login to MySQL:**
   ```bash
   mysql -u root -p
   ```

2. **Run the SQL script:**
   ```bash
   source /path/to/database-setup.sql
   ```

   Or execute directly:
   ```bash
   mysql -u root -p < database-setup.sql
   ```

### Option B: Using phpMyAdmin

1. Open phpMyAdmin in your browser
2. Click on the "SQL" tab
3. Copy and paste the contents of `database-setup.sql`
4. Click "Go" to execute

### Option C: On Ubuntu VPS

```bash
# Install MySQL if not already installed
sudo apt update
sudo apt install mysql-server -y

# Secure MySQL installation
sudo mysql_secure_installation

# Login to MySQL
sudo mysql

# Run the script
source /var/www/Taxi-Biz-App/database-setup.sql
```

---

## Step 2: Create Database User (Optional but Recommended)

The SQL script includes commented lines to create a dedicated user. Uncomment and modify:

```sql
CREATE USER IF NOT EXISTS 'taxi_app_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON taxi_biz_app.* TO 'taxi_app_user'@'localhost';
FLUSH PRIVILEGES;
```

Replace `your_secure_password` with a strong password.

---

## Step 3: Deploy PHP API Script

### On Ubuntu VPS with Nginx

1. **Create a directory for the API:**
   ```bash
   sudo mkdir -p /var/www/taxi-biz-api
   sudo chown -R www-data:www-data /var/www/taxi-biz-api
   ```

2. **Upload the PHP script:**
   ```bash
   sudo cp api-submit-enquiry.php /var/www/taxi-biz-api/
   sudo chown www-data:www-data /var/www/taxi-biz-api/api-submit-enquiry.php
   ```

3. **Update database credentials in the PHP file:**
   ```bash
   sudo nano /var/www/taxi-biz-api/api-submit-enquiry.php
   ```
   
   Update these lines:
   ```php
   $db_host = 'localhost';
   $db_name = 'taxi_biz_app';
   $db_user = 'taxi_app_user';
   $db_pass = 'your_secure_password';
   ```

4. **Install PHP and MySQL extension:**
   ```bash
   sudo apt install php-fpm php-mysql -y
   ```

5. **Configure Nginx for the API:**
   
   Create a new Nginx configuration:
   ```bash
   sudo nano /etc/nginx/sites-available/taxi-biz-api
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name api.your-domain.com;
       
       root /var/www/taxi-biz-api;
       index index.php index.html;
       
       location ~ \.php$ {
           include snippets/fastcgi-php.conf;
           fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
       }
       
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```
   
   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/taxi-biz-api /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## Step 4: Update Form Configuration

### Option A: Use PHP API (Recommended)

Update `src/site-config.ts`:

```typescript
formEndpoint: 'https://api.your-domain.com/api-submit-enquiry.php'
```

### Option B: Use Formspree (Alternative)

Keep using Formspree by updating the form ID:

```typescript
formEndpoint: 'https://formspree.io/f/your-actual-form-id'
```

---

## Database Schema

### Table: `enquiries`

| Column | Type | Description |
|--------|------|-------------|
| id | INT (Auto Increment) | Primary key |
| name | VARCHAR(100) | Customer name |
| phone | VARCHAR(20) | Customer phone number |
| pickup | VARCHAR(255) | Pickup location |
| drop_location | VARCHAR(255) | Drop location |
| pickup_datetime | DATETIME | Pickup date and time |
| package_type | VARCHAR(50) | Type of package (Airport, Local, etc.) |
| vehicle_preference | VARCHAR(50) | Preferred vehicle |
| message | TEXT | Additional message |
| status | ENUM | Enquiry status (pending, contacted, confirmed, completed, cancelled) |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

---

## Useful SQL Queries

### View all pending enquiries
```sql
SELECT * FROM enquiries WHERE status = 'pending' ORDER BY created_at DESC;
```

### View enquiries from last 7 days
```sql
SELECT * FROM enquiries 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) 
ORDER BY created_at DESC;
```

### Update enquiry status
```sql
UPDATE enquiries SET status = 'contacted' WHERE id = 1;
```

### Get statistics by package type
```sql
SELECT package_type, COUNT(*) as count 
FROM enquiries 
GROUP BY package_type;
```

### Get statistics by vehicle preference
```sql
SELECT vehicle_preference, COUNT(*) as count 
FROM enquiries 
GROUP BY vehicle_preference;
```

### View enquiries by phone number
```sql
SELECT * FROM enquiries WHERE phone = '+91 98765 43210';
```

---

## Security Considerations

1. **Use strong passwords** for database users
2. **Restrict database user permissions** - only grant necessary privileges
3. **Enable SSL** for the API endpoint (use HTTPS)
4. **Implement rate limiting** on the API endpoint
5. **Validate and sanitize** all input data (already done in PHP script)
6. **Use prepared statements** to prevent SQL injection (already implemented)
7. **Keep PHP updated** to latest version
8. **Regular backups** of the database

---

## Testing the API

### Test with cURL:

```bash
curl -X POST https://api.your-domain.com/api-submit-enquiry.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+91 98765 43210",
    "pickup": "Test Pickup",
    "drop_location": "Test Drop",
    "packageType": "Airport Pickup / Drop",
    "vehicle": "Toyota Innova - SUV",
    "message": "Test enquiry"
  }'
```

### Expected response:
```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "enquiry_id": 1
}
```

---

## Troubleshooting

### PHP script returns 500 error:
- Check PHP error logs: `tail -f /var/log/php8.1-fpm.log`
- Verify database credentials in the PHP file
- Ensure MySQL extension is installed: `php -m | grep mysql`

### Database connection fails:
- Verify MySQL is running: `sudo systemctl status mysql`
- Check database user permissions
- Ensure firewall allows MySQL connections if remote

### Form submission not working:
- Check browser console for errors
- Verify the form endpoint URL is correct
- Test the API endpoint directly with cURL

---

## Backup Strategy

### Automated backup script:

```bash
#!/bin/bash
# Backup script - save as /usr/local/bin/backup-taxi-db.sh

BACKUP_DIR="/var/backups/taxi-biz"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

mysqldump -u taxi_app_user -p'your_password' taxi_biz_app > $BACKUP_DIR/taxi_biz_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "taxi_biz_*.sql" -mtime +7 -delete
```

Add to crontab for daily backups:
```bash
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-taxi-db.sh
```

---

## Support

For issues related to:
- **MySQL:** [MySQL Documentation](https://dev.mysql.com/doc/)
- **PHP:** [PHP Documentation](https://www.php.net/docs.php)
- **Nginx:** [Nginx Documentation](https://nginx.org/en/docs/)
- **This project:** Open an issue on GitHub

---

**Last Updated:** June 2026
