import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// =========================
// ADMIN LOGIN
// =========================

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find admin
    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });
    console.log("LOGIN EMAIL:", email);
console.log("ADMIN FOUND:", admin);

    if (!admin) {
      return res.status(401).json({
        message: "Invalid admin email or password",
      });
    }

    // Check password
   console.log("PASSWORD ENTERED:", password);
console.log("PASSWORD HASH:", admin.password);

const isPasswordValid = await bcrypt.compare(
  password,
  admin.password
);

console.log("PASSWORD VALID:", isPasswordValid);

if (!isPasswordValid) {
  return res.status(401).json({
    message: "Invalid admin email or password",
  });
}

    // Create JWT
    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Admin login successful",

      token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      message: "Server error during admin login",
    });
  }
};