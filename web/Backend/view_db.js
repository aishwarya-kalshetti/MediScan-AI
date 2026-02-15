const mongoose = require('mongoose');
const User = require('./models/userModel');
const EmergencyNotification = require('./models/emergencyModel');
require('dotenv').config();

const viewData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB...");

        const users = await User.find({});
        console.log("\n=== USERS COLLETION ===");
        console.log(JSON.stringify(users, null, 2));
        console.log(`Total Users: ${users.length}`);

        const emergencies = await EmergencyNotification.find({});
        console.log("\n=== EMERGENCY NOTIFICATIONS ===");
        console.log(JSON.stringify(emergencies, null, 2));
        console.log(`Total Notifications: ${emergencies.length}`);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("\nDisconnected.");
        process.exit();
    }
};

viewData();
