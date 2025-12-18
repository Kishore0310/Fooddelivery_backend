# Quick Start Guide

## 1. Install Dependencies (Already Done ✅)
```bash
npm install
```

## 2. Seed Data (Already Done ✅)
```bash
npm run seed
```

## 3. Start the Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## 4. Test the API

Once the server is running on `http://localhost:5000`, you can test:

- Health check: `http://localhost:5000/api/health`
- Get restaurants: `http://localhost:5000/api/restaurants`
- Get categories: `http://localhost:5000/api/categories`

## 5. Connect Frontend

Update your frontend to use the backend API:

1. Create a file `src/utils/api.js` in your frontend:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';

export const fetchRestaurants = async () => {
  const response = await fetch(`${API_BASE_URL}/restaurants`);
  return response.json();
};

export const fetchMenuItems = async (restaurantId) => {
  const response = await fetch(`${API_BASE_URL}/menu/restaurant/${restaurantId}`);
  return response.json();
};

// Add more API functions as needed
```

2. Update your components to use these API functions instead of mock data.

## API Endpoints Summary

- `GET /api/restaurants` - All restaurants
- `GET /api/restaurants/:id` - Single restaurant
- `GET /api/menu/restaurant/:id` - Menu items for restaurant
- `GET /api/categories` - All categories
- `GET /api/cart?userId=default` - Get cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/remove` - Remove from cart
- `POST /api/orders` - Create order
- `GET /api/orders?userId=default` - Get orders

See README.md for full API documentation.








