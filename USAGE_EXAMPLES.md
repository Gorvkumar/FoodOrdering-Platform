# Authentication Usage Examples

## 🎯 Common Use Cases

### 1. Show User Info in Component

```jsx
import { useAuth } from '../components/authContext/AuthContext';

function UserProfile() {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <p>Please login to view profile</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.fullName}!</h1>
      <p>Email: {user.email}</p>
      <p>User ID: {user._id}</p>
    </div>
  );
}
```

### 2. Conditional Rendering Based on Auth

```jsx
import { useAuth } from '../components/authContext/AuthContext';

function HomePage() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      
      {isLoggedIn ? (
        <div>
          <h2>Your Personalized Feed</h2>
          {/* Show personalized content */}
        </div>
      ) : (
        <div>
          <h2>Welcome! Please login to continue</h2>
          {/* Show public content */}
        </div>
      )}
    </div>
  );
}
```

### 3. Protected Component with Loading State

```jsx
import { useAuth } from '../components/authContext/AuthContext';

function MyOrders() {
  const { user, isLoggedIn, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin text-4xl">⏳</div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect or show message if not logged in
  if (!isLoggedIn) {
    return (
      <div className="text-center py-20">
        <h2>Please login to view your orders</h2>
        <button onClick={() => window.location.href = '/'}>
          Go to Home
        </button>
      </div>
    );
  }

  // Show protected content
  return (
    <div>
      <h1>{user.fullName}'s Orders</h1>
      {/* Orders list */}
    </div>
  );
}
```

### 4. Custom Login Button

```jsx
import { useAuth } from '../components/authContext/AuthContext';
import { useState } from 'react';

function CustomLoginButton() {
  const { login, isLoggedIn, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert('Login successful!');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  if (isLoggedIn) {
    return <p>Logged in as {user.fullName}</p>;
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
```

### 5. Logout Button

```jsx
import { useAuth } from '../components/authContext/AuthContext';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      alert('Logged out successfully');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
```

### 6. Conditional Navigation

```jsx
import { useAuth } from '../components/authContext/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Usage in App.jsx
<Route 
  path="/orders" 
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  } 
/>
```

### 7. Show Different Content for Logged In Users

```jsx
import { useAuth } from '../components/authContext/AuthContext';

function ProductCard({ product }) {
  const { isLoggedIn } = useAuth();

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      
      {isLoggedIn ? (
        <button>Add to Cart</button>
      ) : (
        <button disabled>Login to Purchase</button>
      )}
    </div>
  );
}
```

### 8. Fetch User-Specific Data

```jsx
import { useAuth } from '../components/authContext/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const { user, isLoggedIn } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch user-specific data
      axios.get(`http://localhost:3000/api/orders/user/${user._id}`, {
        withCredentials: true
      })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) {
    return <p>Please login</p>;
  }

  return (
    <div>
      <h1>{user.fullName}'s Dashboard</h1>
      <p>Total Orders: {orders.length}</p>
      {/* Display orders */}
    </div>
  );
}
```

### 9. Conditional Menu Items

```jsx
import { useAuth } from '../components/authContext/AuthContext';
import { Link } from 'react-router-dom';

function Navigation() {
  const { isLoggedIn, user } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      
      {isLoggedIn ? (
        <>
          <Link to="/orders">My Orders</Link>
          <Link to="/profile">Profile</Link>
          <span>Hi, {user.fullName}!</span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
```

### 10. Check Auth Before Action

```jsx
import { useAuth } from '../components/authContext/AuthContext';

function AddToCartButton({ product }) {
  const { isLoggedIn } = useAuth();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert('Please login to add items to cart');
      return;
    }

    // Add to cart logic
    console.log('Adding to cart:', product);
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

## 🔑 Available Auth Properties

From `useAuth()` hook:

```typescript
{
  user: {
    _id: string,
    email: string,
    fullName: string
  } | null,
  
  isLoggedIn: boolean,
  loading: boolean,
  
  login: (email: string, password: string) => Promise<any>,
  register: (fullName: string, email: string, password: string) => Promise<any>,
  logout: () => Promise<void>,
  checkAuth: () => Promise<void>
}
```

## 💡 Best Practices

1. **Always check `loading` first** before checking `isLoggedIn`
2. **Use `isLoggedIn`** instead of checking `user !== null`
3. **Handle errors** in try-catch when calling login/register/logout
4. **Show loading states** for better UX
5. **Redirect after logout** to appropriate page
6. **Don't store sensitive data** in user object (passwords, tokens)
7. **Use `withCredentials: true`** in all authenticated API calls
