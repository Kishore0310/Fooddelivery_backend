import { writeData } from '../utils/dataStorage.js';

// Food Categories
const categories = [
  { id: 1, name: "Pizza", icon: "🍕" },
  { id: 2, name: "Burgers", icon: "🍔" },
  { id: 3, name: "Biryani", icon: "🍛" },
  { id: 4, name: "Chinese", icon: "🥟" },
  { id: 5, name: "Desserts", icon: "🍰" },
  { id: 6, name: "North Indian", icon: "🍛" },
  { id: 7, name: "South Indian", icon: "🍛" },
  { id: 8, name: "Fast Food", icon: "🍟" },
];

// Restaurants
const restaurants = [
  {
    id: 1,
    name: "Domino's Pizza",
    cuisine: "Pizza, Fast Food",
    rating: 4.2,
    deliveryTime: "30-40 mins",
    costForTwo: "₹400 for two",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    offers: ["50% off up to ₹100", "Free delivery"],
    promoted: true
  },
  {
    id: 2,
    name: "Burger King",
    cuisine: "Burgers, American",
    rating: 4.3,
    deliveryTime: "25-35 mins",
    costForTwo: "₹350 for two",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    offers: ["Buy 1 Get 1 Free"],
    promoted: false
  },
  {
    id: 3,
    name: "Paradise Biryani",
    cuisine: "Biryani, Hyderabadi",
    rating: 4.5,
    deliveryTime: "35-45 mins",
    costForTwo: "₹500 for two",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop",
    offers: ["20% off on orders above ₹300"],
    promoted: true
  },
  {
    id: 4,
    name: "Mainland China",
    cuisine: "Chinese, Asian",
    rating: 4.4,
    deliveryTime: "40-50 mins",
    costForTwo: "₹600 for two",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop",
    offers: ["Free dessert on orders above ₹500"],
    promoted: false
  },
  {
    id: 5,
    name: "Baskin Robbins",
    cuisine: "Ice Cream, Desserts",
    rating: 4.6,
    deliveryTime: "20-30 mins",
    costForTwo: "₹300 for two",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
    offers: ["Buy 2 Get 1 Free"],
    promoted: false
  },
  {
    id: 6,
    name: "Saravana Bhavan",
    cuisine: "South Indian, Vegetarian",
    rating: 4.3,
    deliveryTime: "25-35 mins",
    costForTwo: "₹250 for two",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    offers: ["10% off on first order"],
    promoted: false
  },
  {
    id: 7,
    name: "KFC",
    cuisine: "Fast Food, Chicken",
    rating: 4.1,
    deliveryTime: "30-40 mins",
    costForTwo: "₹450 for two",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    offers: ["Combo meals starting at ₹199"],
    promoted: true
  },
  {
    id: 8,
    name: "Haldiram's",
    cuisine: "North Indian, Sweets",
    rating: 4.4,
    deliveryTime: "35-45 mins",
    costForTwo: "₹400 for two",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    offers: ["Free sweets on orders above ₹500"],
    promoted: false
  },
  {
    id: 9,
    name: "McDonald's",
    cuisine: "Fast Food, Burgers",
    rating: 4.0,
    deliveryTime: "20-30 mins",
    costForTwo: "₹350 for two",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    offers: ["Happy Meal combos"],
    promoted: false
  },
  {
    id: 10,
    name: "Pizza Hut",
    cuisine: "Pizza, Italian",
    rating: 4.2,
    deliveryTime: "30-40 mins",
    costForTwo: "₹450 for two",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    offers: ["50% off on large pizzas"],
    promoted: true
  },
];

// Menu Items
const menuItems = {
  1: [
    { id: 1, name: "Margherita Pizza", price: 199, description: "Classic pizza with tomato and mozzarella", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop", veg: true },
    { id: 2, name: "Pepperoni Pizza", price: 249, description: "Spicy pepperoni with cheese", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop", veg: false },
    { id: 3, name: "Farmhouse Pizza", price: 279, description: "Loaded with veggies and cheese", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop", veg: true },
    { id: 4, name: "Chicken Dominator", price: 329, description: "Double chicken with spicy sauce", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop", veg: false },
    { id: 5, name: "Garlic Bread", price: 99, description: "Crispy garlic bread sticks", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop", veg: true },
  ],
  2: [
    { id: 1, name: "Whopper Burger", price: 199, description: "Flame-grilled beef patty", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop", veg: false },
    { id: 2, name: "Veggie Whopper", price: 179, description: "Crispy veggie patty", image: "https://images.unsplash.com/photo-1525059696034-4967a7290022?w=200&h=200&fit=crop", veg: true },
    { id: 3, name: "Chicken Burger", price: 149, description: "Spicy chicken patty", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop", veg: false },
    { id: 4, name: "French Fries", price: 99, description: "Crispy golden fries", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop", veg: true },
    { id: 5, name: "Onion Rings", price: 119, description: "Crispy onion rings", image: "https://images.unsplash.com/photo-1615367423057-4e733c8d1b8c?w=200&h=200&fit=crop", veg: true },
  ],
  3: [
    { id: 1, name: "Hyderabadi Biryani", price: 299, description: "Authentic Hyderabadi style biryani", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&h=200&fit=crop", veg: false },
    { id: 2, name: "Veg Biryani", price: 249, description: "Fragrant basmati rice with vegetables", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&h=200&fit=crop", veg: true },
    { id: 3, name: "Chicken Biryani", price: 279, description: "Tender chicken with aromatic rice", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&h=200&fit=crop", veg: false },
    { id: 4, name: "Mutton Biryani", price: 349, description: "Rich mutton biryani", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&h=200&fit=crop", veg: false },
    { id: 5, name: "Raita", price: 49, description: "Cool yogurt side dish", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop", veg: true },
  ],
  4: [
    { id: 1, name: "Hakka Noodles", price: 199, description: "Spicy stir-fried noodles", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&h=200&fit=crop", veg: true },
    { id: 2, name: "Chicken Manchurian", price: 249, description: "Spicy chicken in tangy sauce", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&h=200&fit=crop", veg: false },
    { id: 3, name: "Veg Spring Rolls", price: 149, description: "Crispy vegetable rolls", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&h=200&fit=crop", veg: true },
    { id: 4, name: "Sweet and Sour Chicken", price: 279, description: "Tangy chicken dish", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&h=200&fit=crop", veg: false },
    { id: 5, name: "Fried Rice", price: 179, description: "Classic Chinese fried rice", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&h=200&fit=crop", veg: true },
  ],
  5: [
    { id: 1, name: "Chocolate Ice Cream", price: 99, description: "Rich chocolate ice cream", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop", veg: true },
    { id: 2, name: "Strawberry Sundae", price: 129, description: "Fresh strawberries with ice cream", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop", veg: true },
    { id: 3, name: "Vanilla Cone", price: 79, description: "Classic vanilla ice cream", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop", veg: true },
    { id: 4, name: "Chocolate Brownie", price: 149, description: "Warm brownie with ice cream", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop", veg: true },
    { id: 5, name: "Ice Cream Cake", price: 399, description: "Layered ice cream cake", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop", veg: true },
  ],
  6: [
    { id: 1, name: "Masala Dosa", price: 99, description: "Crispy dosa with potato filling", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop", veg: true },
    { id: 2, name: "Idli Sambar", price: 79, description: "Soft idlis with sambar", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop", veg: true },
    { id: 3, name: "Vada", price: 59, description: "Crispy lentil fritters", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop", veg: true },
    { id: 4, name: "Uttapam", price: 119, description: "Savory pancake with toppings", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop", veg: true },
    { id: 5, name: "Pongal", price: 89, description: "Traditional rice dish", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop", veg: true },
  ],
  7: [
    { id: 1, name: "Hot Wings (6 pcs)", price: 199, description: "Spicy chicken wings", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop", veg: false },
    { id: 2, name: "Chicken Bucket", price: 449, description: "8 pieces of crispy chicken", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop", veg: false },
    { id: 3, name: "Zinger Burger", price: 179, description: "Spicy chicken burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop", veg: false },
    { id: 4, name: "Chicken Popcorn", price: 149, description: "Bite-sized chicken pieces", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop", veg: false },
    { id: 5, name: "Coleslaw", price: 79, description: "Fresh cabbage salad", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop", veg: true },
  ],
  8: [
    { id: 1, name: "Chole Bhature", price: 149, description: "Spicy chickpeas with fried bread", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop", veg: true },
    { id: 2, name: "Rajma Chawal", price: 129, description: "Kidney beans with rice", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop", veg: true },
    { id: 3, name: "Gulab Jamun", price: 59, description: "Sweet milk dumplings", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop", veg: true },
    { id: 4, name: "Rasgulla", price: 49, description: "Soft cottage cheese balls", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop", veg: true },
    { id: 5, name: "Samosa", price: 39, description: "Crispy potato filled pastry", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop", veg: true },
  ],
  9: [
    { id: 1, name: "Big Mac", price: 179, description: "Double patty burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop", veg: false },
    { id: 2, name: "McChicken", price: 149, description: "Crispy chicken burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop", veg: false },
    { id: 3, name: "McVeggie", price: 129, description: "Vegetable patty burger", image: "https://images.unsplash.com/photo-1525059696034-4967a7290022?w=200&h=200&fit=crop", veg: true },
    { id: 4, name: "McFlurry", price: 99, description: "Ice cream with toppings", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop", veg: true },
    { id: 5, name: "Apple Pie", price: 79, description: "Warm apple pie", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop", veg: true },
  ],
  10: [
    { id: 1, name: "Cheese Burst Pizza", price: 299, description: "Pizza with cheese-filled crust", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop", veg: true },
    { id: 2, name: "Chicken Supreme", price: 349, description: "Loaded chicken pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop", veg: false },
    { id: 3, name: "Veggie Supreme", price: 279, description: "Loaded vegetable pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop", veg: true },
    { id: 4, name: "Paneer Makhani Pizza", price: 299, description: "Indian style pizza with paneer", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop", veg: true },
    { id: 5, name: "Chocolate Lava Cake", price: 149, description: "Warm chocolate cake", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop", veg: true },
  ],
};

async function seedData() {
  try {
    // Convert menuItems object to array format
    const menuItemsArray = Object.entries(menuItems).flatMap(([restaurantId, items]) =>
      items.map(item => ({
        ...item,
        restaurantId: parseInt(restaurantId)
      }))
    );

    const users = [];

    await writeData('categories', categories);
    await writeData('restaurants', restaurants);
    await writeData('menuItems', menuItemsArray);
    await writeData('orders', []);
    await writeData('carts', {});
    await writeData('users', users);

    console.log('✅ Data seeded successfully!');
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${restaurants.length} restaurants`);
    console.log(`   - ${menuItemsArray.length} menu items`);
    console.log(`   - ${users.length} users`);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

seedData();

