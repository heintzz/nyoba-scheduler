const Income = require("../model/income.model");

const createIncome = async (req, res) => {
  const { title, amount, has_recreated, is_monthly_income } = req.body;
  const id = "650d3a1b9869d80532618404";

  try {
    const income = await Income.create({
      user_id: id,
      amount,
      title,
      has_recreated,
      is_monthly_income,
    });
    res.status(201).json({ success: true, data: income });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = createIncome;
