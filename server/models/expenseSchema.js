import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        default: "General",
    },
    
},
    {timestamps: true}
);

export default mongoose.model("Expense", expenseSchema);