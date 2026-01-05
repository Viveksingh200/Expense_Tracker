import Expense from "../models/expenseSchema.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const addExpense = async (req, res) => {
    try {
        const {title, amount, category} = req.body;
        if(!title || amount === undefined || !category){
            return res.status(400).json({message: "All fields are required!"});
        }
        const expenses = await Expense.create({
           title,
           amount,
           category,
           userId: req.user.id
        });

        return res.status(201).json({message: "New expense added successfully!", data: expenses});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete(id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found or unauthorized",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

