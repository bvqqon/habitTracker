
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    habitName: { type: String, required: true },
    completedCount: { type: Number, default: 0 },
    completionDates: [{ type: Date }]
});

// Добавляем индексы
habitSchema.index({ userId: 1 }); // Индекс для быстрого поиска по пользователю
habitSchema.index({ habitName: 1 }); // Индекс для быстрого поиска по названию привычки
habitSchema.index({ completionDates: 1 }); // Индекс для ускорения агрегации по датам

module.exports = mongoose.model('Habits', habitSchema);
