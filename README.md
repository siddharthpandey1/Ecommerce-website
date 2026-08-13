# EKart 🛒 — Full Stack E-Commerce Platform

A full-featured MERN stack e-commerce web application for electronics products, with a customer storefront, cart & checkout system, Razorpay payment integration, and a complete admin dashboard for managing products, orders, and users.

**Live Demo:** [https://ecommerce-website-bay-nu.vercel.app/]  
**GitHub Repo:** [https://github.com/siddharthpandey1/Ecommerce-website]



## ✨ Features

### Customer Side
- User authentication (Signup, Login, Email verification via token)
- Browse products with search, category/brand filters, and price-range filter
- Sort products by price (low to high / high to low)
- Product detail page with image zoom and multiple images
- Add to cart, update quantity, remove items
- Save multiple delivery addresses
- Secure checkout with **Razorpay** payment gateway (order creation, payment verification, and failure handling)
- Order history and order success confirmation
- Editable user profile with profile picture upload

### Admin Side
- Role-based protected routes (Admin-only dashboard)
- Add / edit / delete products with multi-image upload (Cloudinary)
- View and manage all orders across users
- View and manage all registered users, update user roles
- View any user's individual order history
- Sales analytics dashboard — total users, products, orders, and revenue, with a 30-day sales trend chart (Recharts)

### General
- Fully responsive design (mobile, tablet, desktop) using Tailwind CSS
- Toast notifications for real-time feedback (Sonner)
- Global state management with Redux Toolkit

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- shadcn/ui components
- Axios
- Recharts (admin sales chart)
- Lucide React (icons)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT-based authentication
- Cloudinary (image storage)
- Razorpay (payment gateway)

---

## 📂 Project Structure

```
EKart/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── index.js
└── frontend/
    ├── src/
    │   ├── components/ui/
    │   ├── pages/
    │   │   └─ admin/
    │   ├── redux/
    │   └── App.jsx
    └── index.html
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/siddharthpandey1/Ecommerce-website.git
cd Ecommerce-website
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:
```env
VITE_URL=http://localhost:8000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Run the frontend:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔑 Key Learnings / Highlights

- Implemented end-to-end payment flow with Razorpay including order creation, signature verification, and failed-payment handling.
- Built a role-based access control system using protected routes for admin-only pages.
- Designed a fully responsive UI from scratch using Tailwind CSS, including a mobile drawer navigation pattern for both the storefront and admin sidebar.
- Managed complex global state (cart, user, products) using Redux Toolkit.

---

## 🚀 Future Improvements

- Add product reviews & ratings
- Add wishlist functionality
- Add email notifications for order status updates
- Add pagination for large product catalogs

---

## 👤 Author

**Siddhartha Pandey**  
GitHub: [@siddharthpandey1](https://github.com/siddharthpandey1)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).