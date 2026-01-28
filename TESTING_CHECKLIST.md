# Authentication Testing Checklist

## ✅ Manual Testing Steps

### 1. Initial Load (Not Logged In)
- [ ] Open the app in browser
- [ ] Navbar should show "Login" and "Register" buttons
- [ ] No loading spinner should persist

### 2. Registration Flow
- [ ] Click "Register" button
- [ ] Modal should open with Register tab active
- [ ] Fill in: Full Name, Email, Password
- [ ] Click "Create Account"
- [ ] Should see success alert
- [ ] Modal should close
- [ ] Navbar should now show user profile with first letter of name
- [ ] Profile dropdown should show full name and email

### 3. Persistence Check
- [ ] Refresh the page (F5)
- [ ] User should still be logged in
- [ ] Navbar should still show user profile
- [ ] No need to login again

### 4. Logout Flow
- [ ] Click on user profile in Navbar
- [ ] Click "Logout" button
- [ ] Navbar should switch back to "Login" and "Register" buttons
- [ ] User profile should disappear

### 5. Login Flow
- [ ] Click "Login" button
- [ ] Modal should open with Login tab active
- [ ] Enter email and password from registration
- [ ] Click "Login"
- [ ] Should see success alert
- [ ] Modal should close
- [ ] Navbar should show user profile again

### 6. Protected Route (Orders Page)
- [ ] While logged OUT, navigate to `/orders`
- [ ] Should see "Login Required" message with lock icon
- [ ] Should NOT see orders list
- [ ] Login via home page
- [ ] Navigate to `/orders` again
- [ ] Should now see orders page with tabs

### 7. Invalid Credentials
- [ ] Click "Login"
- [ ] Enter wrong email or password
- [ ] Should see error message in red box
- [ ] Should NOT be logged in

### 8. Form Validation
- [ ] Try to register with:
  - [ ] Empty fields - should show "required" errors
  - [ ] Invalid email format - should show "valid email" error
  - [ ] Password < 6 chars - should show "at least 6 characters" error

### 9. Browser DevTools Check
- [ ] Open DevTools → Application → Cookies
- [ ] After login, should see `authtoken` cookie
- [ ] Cookie should have HttpOnly flag
- [ ] After logout, `authtoken` cookie should be removed

### 10. Multiple Tabs
- [ ] Login in Tab 1
- [ ] Open Tab 2 with same app
- [ ] Tab 2 should also show user as logged in
- [ ] Logout in Tab 1
- [ ] Refresh Tab 2
- [ ] Tab 2 should now show logged out state

## 🔧 Backend Testing

### API Endpoints to Test

#### 1. Verify Token
```bash
# Should return 401 when not logged in
curl http://localhost:3000/api/auth/verify -b cookies.txt

# Should return user data when logged in
curl http://localhost:3000/api/auth/verify -b cookies.txt
```

#### 2. Register
```bash
curl -X POST http://localhost:3000/api/auth/user/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123"}' \
  -c cookies.txt
```

#### 3. Login
```bash
curl -X POST http://localhost:3000/api/auth/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt
```

#### 4. Logout
```bash
curl -X POST http://localhost:3000/api/auth/user/logout \
  -b cookies.txt \
  -c cookies.txt
```

## 🐛 Common Issues to Check

### Issue: User not staying logged in after refresh
- **Check**: Is `withCredentials: true` set in axios calls?
- **Check**: Is backend sending cookies correctly?
- **Check**: Are frontend and backend on same domain/port?

### Issue: CORS errors
- **Check**: Backend CORS configuration allows credentials
- **Check**: Frontend axios has `withCredentials: true`

### Issue: "Not authenticated" on verify endpoint
- **Check**: Cookie is being sent with request
- **Check**: JWT_TOKEN environment variable is set in backend
- **Check**: Token hasn't expired

### Issue: UI not updating after login
- **Check**: AuthContext is wrapping the app
- **Check**: Components are using `useAuth()` hook
- **Check**: State is being updated in login/logout functions

## 📊 Expected Behavior Summary

| Action | Expected Result |
|--------|----------------|
| App Load (No Cookie) | Show Login/Register buttons |
| App Load (Valid Cookie) | Show user profile, auto-login |
| Register Success | Set cookie, show profile, close modal |
| Login Success | Set cookie, show profile, close modal |
| Logout | Clear cookie, show Login/Register |
| Page Refresh (Logged In) | Stay logged in |
| Visit /orders (Not Logged In) | Show login required message |
| Visit /orders (Logged In) | Show orders page |
| Invalid Login | Show error, stay logged out |
