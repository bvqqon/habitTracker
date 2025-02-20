
// getting Habits model for accessing the database
const Habits = require('../models/habits');

// Function to calculate statistics for habits
module.exports.getHabitStats = async function (req, res) {
    try {
        // Aggregation: Count total completed habits per habit name
        const habitStats = await Habits.aggregate([
            {
                $group: {
                    _id: "$habitName",
                    totalCompleted: { $sum: "$completedCount" }
                }
            },
            { $sort: { totalCompleted: -1 } }
        ]);

        // Aggregation: Count total completed habits per day of the week
        const dailyStats = await Habits.aggregate([
            {
                $unwind: "$completionDates"
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$completionDates" },
                    totalHabitsCompleted: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({ habitStats, dailyStats });

    } catch (error) {
        console.error("Error during aggregation:", error);
        res.status(500).json({ message: "Server error" });
    }
};
