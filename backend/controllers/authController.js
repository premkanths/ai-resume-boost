import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { run, all } from "../utils/db.js";

// Helper to find a user by email
const findUserByEmail = async (email) => {
  const rows = await all("SELECT * FROM users WHERE email = ?", [email.toLowerCase().trim()]);
  return rows[0] || null;
};

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const userId = uuidv4();

    // Insert user
    await run("INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)", [
      userId,
      email.toLowerCase().trim(),
      passwordHash,
    ]);

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: userId,
        email: email.toLowerCase().trim(),
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Verify password
    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: "Premium User", // Relates to Custom Auth users
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Failed to log in" });
  }
};
