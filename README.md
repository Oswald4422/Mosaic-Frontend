# Mosaic - Campus Event Management System

## Project Overview
Mosaic is a comprehensive Campus Event Management System designed for university environments. It enables students and staff to seamlessly discover, register for, and manage campus events such as workshops, seminars, and club activities. The platform features an intuitive calendar interface, real-time seat availability tracking, and personalized event preferences.

## Backend Repository On GitHub
- **Backend**: [https://github.com/Oswald4422/Mosaic-Backend](https://github.com/Oswald4422/Mosaic-Backend)



## Deployment Links
- **Frontend**: [https://mosaic-frontend-zrqe.onrender.com](https://mosaic-frontend-zrqe.onrender.com)
- **Backend**: [https://mosaic-backend-t33r.onrender.com](https://mosaic-backend-t33r.onrender.com)

## Login Credentials

### Admin Access
- **Username**: Nate@gmail.com
- **Password**: nate123

### User Access
- **Username**: araba@gmail.com
- **Password**: araba123




## Features ✓

### User Management
- ✓ User registration and authentication
- ✓ Personalized event preferences
- ✓ User profile management
- ✓ Role-based access control (Admin/User)
- ✓ User can only RSVP to event under their preferences
- ✓ Click the Campus Events logo to take you to the Homepage

### Event Management
- ✓ Comprehensive event listings with detailed information
- ✓ Real-time seat availability tracking
- ✓ RSVP functionality
- ✓ Event history in user profiles

### Admin Features
- ✓ Event creation and management
- ✓ Unique event ID generation
- ✓ Capacity management
- ✓ Event modification and deletion
- ✓ Admin can see the calendar view after creating an event
- ✓ Click the Campus Events logo to take you to the Homepage

### Calendar Integration
- ✓ Interactive calendar view
- ✓ Event filtering based on preferences
- ✓ Date-based event navigation




## API Testing Screenshots

### Authentication Endpoints
![login-test png](https://github.com/user-attachments/assets/588d513c-d45e-4b2e-bb18-7c55c4b833ec)
![register-test png](https://github.com/user-attachments/assets/977d236b-2106-442c-a8cd-d6ea617855b1)


### Event Management Endpoints
![Create Event Test](./public/images/api-tests/create-event-test.png)
![get-events-test png](https://github.com/user-attachments/assets/4e84d577-7fcf-4492-acf7-ad958ba01f23)
![get-all-events png](https://github.com/user-attachments/assets/de3cb870-0474-4c76-b182-d86f9e2defce)
![RSVP Test](./public/images/api-tests/rsvp-test.png)

### User Management Endpoints
![Update Profile Test](./public/images/api-tests/update-profile-test.png)
![Get User Events Test](./public/images/api-tests/user-events-test.png)




## Installation Instructions
### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Oswald4422/Mosaic-Frontend
   cd CampusEvent/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```


### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your MongoDB connection string and other configurations:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:5173` (frontend) and `http://localhost:5000` (backend).

## Additional Notes
- Make sure MongoDB is running before starting the backend server
- The frontend and backend must both be running for the application to work properly
- For local development, ensure the ports 5173 and 5000 are available
