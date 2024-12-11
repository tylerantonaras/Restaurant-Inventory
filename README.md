# Restaurant-Inventory

A Spring Boot application for managing restaurant inventory, including CRUD operations for inventory and menu items and database integration with MySQL.

## Features
- Inventory management with real-time tracking
- Menu item creation and management
- Order tracking system with status updates
- Supplier management
- Simplistic user interface
- Sorting and filtering capabilities

## Prerequisites
- Java JDK 17 or higher
- Node.js (v14 or higher)
- MySQL
- npm

## Detailed Setup Instructions

### 1. MySQL Database Setup
1. Install MySQL from: https://dev.mysql.com/downloads/installer/
2. During installation, set your root password and remember it
3. Open MySQL Command Line Client or MySQL Workbench
4. Create the database by running:
   ```sql
   CREATE DATABASE RestaurantInventory;
   ```

### 2. Backend Setup
1. Open the project in your preferred IDE (Eclipse, IntelliJ, etc.)
2. Set up the application.properties:
   ```bash
   # Navigate to the backend resources directory
   cd backend/src/main/resources
   
   # Copy the example properties file
   cp application.properties.example application.properties
   ```
3. Update the following properties in application.properties with your MySQL credentials:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
   Note: The database 'RestaurantInventory' will be created automatically if it doesn't exist.

4. Run the Spring Boot application:
   - In Eclipse: Right-click project → Run As → Spring Boot App
   - In IntelliJ: Click the green play button
   - From command line: `./mvnw spring-boot:run`
5. The backend should start on http://localhost:8080

### 3. Frontend Setup
1. Open a terminal/command prompt
2. Navigate to the frontend directory:
   ```bash
   cd path/to/project/frontend
   ```
3. Install required dependencies:
   ```bash
   npm install
   ```
4. Start the React application:
   ```bash
   npm start
   ```
5. The frontend should automatically open in your browser at http://localhost:3000

### Verification Steps
1. Check that both servers are running:
   - Backend: http://localhost:8080 should show a white label error page (this is normal)
   - Frontend: http://localhost:3000 should show the application interface
2. Try creating a new ingredient or menu item to verify database connectivity
3. Check the sidebar navigation works correctly

### Troubleshooting Common Issues
1. If MySQL connection fails:
   - Verify MySQL service is running
   - Double-check username and password in application.properties
   - Ensure database 'RestaurantInventory' exists

2. If npm install fails:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules folder and try again
   - Ensure Node.js is properly installed: `node --version`

3. If ports are already in use:
   - Backend: Change port in application.properties
   - Frontend: Kill the process using port 3000 or use a different port

## Need Help?
If you encounter any issues during setup, please check:
1. All prerequisites are properly installed
2. Database credentials are correct
3. Both backend and frontend servers are running

## Usage
- The sidebar provides navigation to different sections:
  - Home: Dashboard overview
  - Ingredients: Manage inventory items
  - Menu Items: Create and edit menu items
  - Orders: Track and manage orders
  - Suppliers: Manage supplier information

## Technologies Used
- Frontend: React.js
- Backend: Spring Boot
- Database: MySQL
- Styling: CSS
