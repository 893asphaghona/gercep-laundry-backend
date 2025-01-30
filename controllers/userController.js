const User = require('../models/userModel');

// Fungsi untuk membuat pengguna baru
exports.createUser = async (username, email, hashedPassword, role) => {
    try {
        const user = await User.create({ username, email, password: hashedPassword, role });
        return user;
    } catch (err) {
        throw err;
    }
};

// Fungsi untuk memperbarui pengguna
exports.updateUser = async (id, username, password, role) => {
    try {
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');
        
        user.username = username || user.username;
        user.password = password || user.password;
        user.role = role || user.role;

        await user.save();
        return user;
    } catch (err) {
        throw err;
    }
};

// Fungsi untuk menghapus pengguna
exports.deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');
        
        await user.destroy();
        return user;
    } catch (err) {
        throw err;
    }
};
app.put("/api/orders/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      await db.query("UPDATE tb_pesanan SET status = ? WHERE id = ?", [status, id]);
      res.status(200).send({ message: "Status berhasil diperbarui." });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Gagal memperbarui status." });
    }
  });
  