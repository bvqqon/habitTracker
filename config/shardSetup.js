
// Этот скрипт выполняется в MongoDB shell для настройки шардирования
// Перед запуском убедитесь, что шардирование включено в MongoDB Atlas

// Включаем шардирование для базы данных
sh.enableSharding("habitTrackerDB");

// Выбираем ключ шардирования (например, по userId)
db.habits.createIndex({ userId: "hashed" });

// Настраиваем шардирование коллекции
sh.shardCollection("habitTrackerDB.habits", { userId: "hashed" });

print("Sharding setup completed!");
