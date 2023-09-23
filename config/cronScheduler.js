const cron = require("node-cron");
const Income = require("../model/income.model");

const cronScheduler = () => {
  cron.schedule("0 0 0 * * *", async () => {
    const date = new Date();
    const utc = date.getTimezoneOffset() / 60;
    const midnight = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );
    const nextMidnight = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1)
    );
    midnight.setUTCHours(midnight.getUTCHours() + utc, 0, 0, 0);
    nextMidnight.setUTCHours(nextMidnight.getUTCHours() + utc, 0, 0, 0);

    const oneMonthAgo = new Date(midnight.setMonth(midnight.getMonth() - 1));
    const dayAfterOneMonthAgo = new Date(
      nextMidnight.setMonth(nextMidnight.getMonth() - 1)
    );

    const incomes = await Income.find({
      is_monthly_income: true,
      created_at: {
        $gte: oneMonthAgo,
        $lt: dayAfterOneMonthAgo,
      },
      has_recreated: false,
    }).exec();

    // for each incomes, create a new income with the same object
    incomes.forEach(async (income) => {
      try {
        const res = await Income.create({
          user_id: income.user_id,
          amount: income.amount,
          title: income.title,
          is_monthly_income: income.is_monthly_income,
        });
        if (res) {
          const updatedIncome = await Income.findByIdAndUpdate(income._id, {
            has_recreated: true,
          });
          updatedIncome.save();
        }
      } catch (error) {
        console.log(error.message);
      }
    });
  });
};

module.exports = cronScheduler;
