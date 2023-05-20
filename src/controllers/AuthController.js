import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

export async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;
    const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, hashPassword]
    );

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];
    res.locals.user = user;
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
