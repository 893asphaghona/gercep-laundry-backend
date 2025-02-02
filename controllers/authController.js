// controllers/authController.js
const db = require("../config/connection");
const User = require('../models/userModel'); // Sesuaikan impor

const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        // Cek password terenkripsi
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ msg: "Password salah" });
        }

        res.status(200).json({
            msg: "Login berhasil",
            user: {
                id: user.id_user,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};




  
  // Register
  const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
  
      const newUser = await User.create({ username, email, password, role });
      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Register error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  

module.exports = { loginUser, registerUser };
