const mongoose = require('mongoose');
const User = require('./models/userModel');
const dotenv = require('dotenv');

dotenv.config();

const users = [
    {
        name: "Test Patient",
        contact: "patient@example.com",
        password: "password123",
        role: "patient",
        avatar: {
            public_id: "sample_patient",
            url: "https://example.com/patient.jpg"
        }
    },
    {
        name: "Test Doctor",
        contact: "doctor@example.com",
        password: "password123",
        role: "doctor",
        speciality: "Cardiologist",
        availablity: "true",
        avatar: {
            public_id: "sample_doctor",
            url: "https://example.com/doctor.jpg"
        }
    }
];

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB...");

        for (const user of users) {
            const existingUser = await User.findOne({ contact: user.contact });
            if (existingUser) {
                console.log(`User ${user.contact} already exists. Skipping creation.`);
                // Optionally update password if needed, but for now we assume existence is enough or user can delete them.
            } else {
                await User.create(user);
                console.log(`Created user: ${user.name} (${user.role})`);
            }
        }

        console.log("\nSeed completed successfully.");

    } catch (error) {
        console.error("Error seeding users:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
        process.exit();
    }
};

seedUsers();
