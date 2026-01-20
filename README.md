# MERN Authentication Application

A full-stack authentication application built with the MERN stack (MongoDB, Express, React, Node.js), featuring secure user authentication, email verification, and password reset functionality.

## 🎯 Overview

This project demonstrates a complete authentication system with a modern React frontend and a robust Node.js backend API. It includes user registration, login, email verification, password reset, and protected routes.

## ✨ Key Features

- 🔐 **Secure Authentication** - JWT-based authentication with HTTP-only cookies
- 📧 **Email Verification** - Automated email verification for new users
- 🔑 **Password Reset** - Secure password reset flow with email verification
- 🎨 **Modern UI** - Beautiful, responsive interface built with React and Tailwind CSS
- 🛡️ **Protected Routes** - Client-side route protection
- 🔒 **Password Encryption** - Bcrypt hashing for secure password storage
- ⚡ **Fast Development** - Vite for lightning-fast frontend development
- 📱 **Responsive Design** - Mobile-first approach

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool and dev server
- **React Router DOM** 7.12.0 - Client-side routing
- **Tailwind CSS** 3.4.19 - Utility-first CSS framework
- **Axios** 1.13.2 - HTTP client
- **Lucide React** 0.562.0 - Icon library
- **React Toastify** 11.0.5 - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express** 5.1.0 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 9.0.0 - MongoDB ODM
- **JWT** 9.0.2 - Token-based authentication
- **bcryptjs** 3.0.3 - Password hashing
- **Nodemailer** 7.0.11 - Email service
- **CORS** 2.8.5 - Cross-origin resource sharing


## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/send-verify-otp` - Sent Verify email OTP
- `POST /api/auth/verify-account` - Verify Account
- `POST /api/auth/send-reset-otp` - Sent Reset password OTP
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/is-auth` - Check authentication status

### User
- `GET /api/user//data` - Get user profile data

## 🔐 Environment Variables

### Server (.env)
```env
PORT=5000
NODE_ENV=production/development
MONGO_URI=your_mongodb_connection_string
SECURITY_SECRET=your_jwt_secret_key
SMTP_USER=smtp_user
SMTP_PASS=smtp_password
SENDER_EMAIL=your_email@example.com
```

### Client (.env)
```env
VITE_API_URL=api_url
```

## 🧪 Testing

```bash
# Frontend tests
cd client
npm test

# Backend tests
cd server
npm test
```

## 🏗️ Building for Production

### Frontend
```bash
cd client
npm run build
```
The production-ready files will be in the `client/dist` directory.

### Backend
The backend runs directly with Node.js:
```bash
cd server
node server.js
```

## 📄 License

This project is licensed under the MIT License.


## 🔄 Version History

- **1.0.0** (Current)
  - Initial release
  - User authentication
  - Email verification
  - Password reset
  - Protected routes
  - Responsive UI

## 🎯 Future Enhancements

- [ ] Social authentication (Google, GitHub)
- [ ] Two-factor authentication (2FA)
- [ ] User profile management
- [ ] Role-based access control
- [ ] Session management
- [ ] Refresh tokens
- [ ] Advanced password policies
- [ ] Activity logging

---

**Happy Coding! 🚀**
