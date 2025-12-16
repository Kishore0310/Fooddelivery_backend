# Food Delivery Backend API

Backend API for the Swiggy Clone food delivery application.

## Features

- 🍕 Restaurant management
- 📋 Menu items management
- 🛒 Shopping cart functionality
- 📦 Order management
- 🏷️ Food categories
- 🔍 Search and filter restaurants

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **CORS** - Cross-origin resource sharing
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## Installation

1. Install dependencies:
```bash
npm install
```

2. Seed the database with initial data:
```bash
npm run seed
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Restaurants

- `GET /api/restaurants` - Get all restaurants
  - Query params: `?search=pizza&category=Italian`
- `GET /api/restaurants/:id` - Get single restaurant

### Menu

- `GET /api/menu/restaurant/:id` - Get menu items for a restaurant
- `GET /api/menu/item/:id` - Get single menu item

### Categories

- `GET /api/categories` - Get all food categories

### Cart

- `GET /api/cart?userId=default` - Get user's cart
- `POST /api/cart/add` - Add item to cart
  ```json
  {
    "userId": "default",
    "item": { "id": 1, "name": "Pizza", "price": 199, ... },
    "restaurantId": 1,
    "restaurantName": "Domino's Pizza"
  }
  ```
- `POST /api/cart/remove` - Remove item from cart
  ```json
  {
    "userId": "default",
    "itemId": 1,
    "restaurantId": 1
  }
  ```
- `DELETE /api/cart/clear?userId=default` - Clear cart
- `GET /api/cart/total?userId=default` - Get cart total

### Orders

- `GET /api/orders?userId=default` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
  ```json
  {
    "userId": "default",
    "cart": [...],
    "deliveryAddress": "123 Main St",
    "paymentMethod": "Cash on Delivery"
  }
  ```
- `PATCH /api/orders/:id/status` - Update order status
  ```json
  {
    "status": "Delivered"
  }
  ```

### Health Check

- `GET /api/health` - Check API status

## Data Storage

- **MongoDB** - Primary database for user authentication
- **JSON files** - Still used for restaurants, menu items, categories, orders, and carts (in `data/` directory)

## Environment Variables

Create a `.env` file (copy from `env.example`):
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
MONGODB_URI=mongodb://localhost:27017/fooddelivery
```

**Note:** For MongoDB Atlas (cloud), use: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fooddelivery`

## Connecting Frontend

Update your frontend API base URL to:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## API Response Format

### Success Response
```json
{
  "data": [...],
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error message",
  "message": "Detailed error message"
}
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## License

ISC
w

