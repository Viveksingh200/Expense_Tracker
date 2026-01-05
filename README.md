💰 Expense Tracker Application

A full-stack Expense Tracker built using the MERN stack that allows users to add, edit, delete, and visualize expenses with charts and dashboards.

🚀 Features

🔐 User Authentication (Login & Signup)

➕ Add new expenses

✏️ Edit existing expenses

🗑 Delete expenses

📋 View all expenses in a table

📊 Expense visualization using charts

💾 Balance stored in localStorage

📈 Dashboard with statistics

🔍 Search expenses (optional extension)

🎨 Clean UI with Tailwind CSS

🛡 Protected routes using authentication

🧑‍💻 Tech Stack
Frontend

React.js

React Router

React Hook Form

Yup (form validation)

Tailwind CSS

Recharts (charts)

Axios

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcryptjs

📂 Project Structure
expense-tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── ExpenseChart.jsx
│   │   │   └── ExpenseTable.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AllExpenses.jsx
│   │   │   ├── AddExpense.jsx
│   │   │   ├── EditExpense.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── services/
│   │   │   ├── expenseApi.js
│   │   │   └── authApi.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.css
│
├── server/
│   ├── controllers/
│   │   ├── expenseController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── expenseSchema.js
│   │   └── userSchema.js
│   ├── routes/
│   │   ├── expenseRoutes.js
│   │   └── userRoutes.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── .env
│
└── README.md

🗃 Expense Model
const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      default: "General",
    },
  },
  { timestamps: true }
);

🛠 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/expense-tracker.git

2️⃣ Backend setup
cd server
npm install


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start server:

npm run dev

3️⃣ Frontend setup
cd client
npm install
npm run dev


Frontend runs on:

http://localhost:5173


Backend runs on:

http://localhost:5000

🔐 Authentication Flow

JWT token stored in localStorage

Protected routes using PrivateRoute

User cannot access /login or /signup after login

Unauthorized users redirected to /login

📊 Dashboard Overview

Total Expenses – sum of all expenses

This Month – monthly expenses (can be extended)

Balance – editable and saved in localStorage

Expense Chart – category-wise bar chart

🧠 Key Learnings

Form handling with React Hook Form + Yup

Protected routing in React

CRUD operations with MongoDB

State management with Context API

Data visualization using Recharts

Handling localStorage effectively

📌 Future Improvements

Category management

Monthly & yearly reports

Export expenses (CSV/PDF)

Dark mode

Pagination & filters

Multi-user expense separation

👨‍🎓 Author

Vivek Singh
MERN Stack Developer
📧 Email: your-email@example.com

🔗 GitHub: your-github-link
