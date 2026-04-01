const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./Schema/UserSchema");

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to database");

    // Clear existing users
    await User.deleteMany({});
    console.log("Cleared existing users");

    // Demo users
    const demoUsers = [
      {
        name: "John Chef",
        email: "john@example.com",
        password: "Password123", // Will be hashed
      },
      {
        name: "Sarah Baker",
        email: "sarah@example.com",
        password: "Password123",
      },
      {
        name: "Mike Grill",
        email: "mike@example.com",
        password: "Password123",
      },
    ];

    // Hash passwords and insert
    for (let user of demoUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
      });
      console.log(`✓ Created user: ${user.email}`);
    }

    console.log("\n✅ Demo users seeded successfully!");
    console.log("\nDemo Credentials:");
    console.log("================");
    demoUsers.forEach((user) => {
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${user.password}`);
      console.log("---");
    });

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error.message);
    process.exit(1);
  }
};

seedUsers();
