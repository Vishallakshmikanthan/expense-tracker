const Expense = require("../models/Expense");

// CREATE Expense
async function createExpense(req, res) {
  try {
    const { amount, category, note, date } = req.body;

    if (!amount || !category) {
      return res.status(400).json({ message: "Amount and category are required" });
    }

    const expense = await Expense.create({
      amount,
      category,
      note,
      date: date || new Date()
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error("Create expense error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// GET all expenses
async function getExpenses(req, res) {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error("Get expenses error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE an expense
async function deleteExpense(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Expense.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error("Delete expense error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createExpense,
  getExpenses,
  deleteExpense
};
