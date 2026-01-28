# 🔐 Authentication System Documentation

## Overview

This application implements a complete JWT-based authentication system using HTTP-only cookies for secure session management. Users can register, login, and stay authenticated across page refreshes.

## 📚 Documentation Files

- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - What was implemented and how it works
- **[AUTHENTICATION_FLOW.md](AUTHENTICATION_FLOW.md)** - Visual flow diagrams
- **[USAGE_EXAMPLES.md](USAGE_EXAMPLES.md)** - Code examples for common use cases
- **[TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)** - Complete testing guide

## 🚀 Quick Start

### 1. Start the Backend
```bash
cd backend
npm install
npm start
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Test Authentication
1. Open http://localhost:5173
2. Click "Register" and create an account
3. You'll be automatically logged in
4. Refresh the page - you should stay logged in
5. Click on your profile and logout

## 🎯 Key Features

✅ **Persistent Login** - Users stay logged in across page refreshes  
✅ **Secure Cookies** - HTTP-only cookies prevent XSS attacks  
✅ **Global State** - Authentication state available everywhere via `useAuth()`  
✅ **Protected Routes** - Easy to protect pages that require login  
✅ **Loading States** - Smooth UX with loading indicators  
✅ **Auto-verification** - Checks auth status on app load  

## 🔧 How to Use in Your Components

### Basic Usage
```jsx
import { useAuth } from './components/authContext/AuthContext';

function MyComponent() {
  const { user, isLoggedIn, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!isLoggedIn) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome {user.fullName}!</div>;
}
```

### Protect a Route
```jsx
import { useAuth } from './components/authContext/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedPage() {
  const { isLoggedIn, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn) return <Navigate to="/" />;
  
  return <div>Protected Content</div>;
}
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/user/register` | Register new user |
| POST | `/api/auth/user/login` | Login user |
| POST | `/api/auth/user/logout` | Logout user |
| GET | `/api/auth/verify` | Verify authentication |

## 🔑 Auth Context API

```javascript
const {
  user,          // User object: { _id, email, fullName }
  isLoggedIn,    // Boolean: true if authenticated
  loading,       // Boolean: true while checking auth
  login,         // Function: (email, password) => Promise
  register,      // Function: (fullName, email, password) => Promise
  logout,        // Function: () => Promise
  checkAuth      // Function: () => Promise (rarely needed)
} = useAuth();
```

## 🛡️ Security Features

- **HTTP-only Cookies**: Tokens stored in HTTP-only cookies (not accessible via JavaScript)
- **JWT Tokens**: Secure token-based authentication
- **Server-side Validation**: All auth checks happen on the server
- **CORS Protection**: Configured for secure cross-origin requests

## 📁 File Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── authContext/
│   │       └── AuthContext.jsx          # Auth state management
│   ├── components/common/
│   │   ├── Navbar.jsx                   # Uses auth state
│   │   └── authModel/
│   │       └── AuthModal.jsx            # Login/Register modal
│   └── App.jsx                          # Wrapped with AuthProvider

backend/
├── src/
│   ├── controllers/
│   │   └── auth.controller.js           # Auth logic + verify endpoint
│   └── routes/
│       └── auth.routes.js               # Auth routes + /verify
```

## 🐛 Troubleshooting

### User not staying logged in after refresh
- Check if `withCredentials: true` is set in axios calls
- Verify backend is sending cookies correctly
- Ensure frontend and backend are on compatible domains

### CORS errors
- Backend must allow credentials in CORS config
- Frontend axios must have `withCredentials: true`

### "Not authenticated" errors
- Check if cookie is being sent with requests
- Verify JWT_TOKEN environment variable is set
- Check if token hasn't expired

## 📝 Example: Complete Protected Component

```jsx
import { useAuth } from '../components/authContext/AuthContext';
import { Link } from 'react-router-dom';

function MyOrders() {
  const { user, isLoggedIn, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin text-4xl">⏳</div>
        <p>Loading...</p>
      </div>
    );
  }

  // Not logged in
  if (!isLoggedIn) {
    return (
      <div className="text-center py-20">
        <h2>🔒 Login Required</h2>
        <p>Please login to view your orders</p>
        <Link to="/">Go to Home</Link>
      </div>
    );
  }

  // Logged in - show content
  return (
    <div>
      <h1>Welcome {user.fullName}!</h1>
      <p>Your orders will appear here</p>
    </div>
  );
}
```

## 🎨 UI Components

### Navbar
- Automatically shows Login/Register when logged out
- Shows user profile dropdown when logged in
- Handles logout functionality

### AuthModal
- Tabbed interface for Login/Register
- Form validation
- Error handling
- Integrates with AuthContext

## 🔄 State Flow

1. **App loads** → AuthProvider checks for valid token
2. **Token valid** → Sets user and isLoggedIn=true
3. **Token invalid** → Sets isLoggedIn=false
4. **User logs in** → Backend sets cookie, frontend updates state
5. **User logs out** → Backend clears cookie, frontend resets state
6. **Page refresh** → Repeats step 1

## 📞 Support

For more details, see:
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md)
- [Usage Examples](USAGE_EXAMPLES.md)
- [Testing Checklist](TESTING_CHECKLIST.md)
- [Authentication Flow](AUTHENTICATION_FLOW.md)

## ✨ Next Steps

To extend this authentication system:

1. **Add password reset** functionality
2. **Implement email verification**
3. **Add social login** (Google, Facebook)
4. **Add refresh tokens** for better security
5. **Implement role-based access** control
6. **Add two-factor authentication**
