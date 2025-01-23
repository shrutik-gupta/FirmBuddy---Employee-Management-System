import User from './models/User.js';
import bcrypt from 'bcrypt';
import connectToDatabase from './db/db.js';

const userRegister = async () => {
  await connectToDatabase(); // Ensure the database connection is established
  try {
    const email = "shrutikgupta07@gmail.com"; // Update with the new admin email
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log("User with this email already exists:", email);
      return;
    }

    const hashedPassword = await bcrypt.hash("admin@123", 10); // Set the password for the new admin
    const newUser = new User({
      name: "admin", // Name of the new admin
      email,
      password: hashedPassword,
      role: "admin",
    });
    await newUser.save();
    console.log("New admin user seeded successfully:", email);
  } catch (e) {
    console.error("Error seeding new admin:", e);
  }
};

userRegister();
