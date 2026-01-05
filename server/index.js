import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import expenseRoutes from "./routes/expenseRoute.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("server is running");
})

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.listen(PORT, () => {
    console.log("app is listening");
});

//IIFI - Imidiataly invoke function expression
(async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfull");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
})();