const express = require('express');
const cors = require('cors');
const session = require('express-session');
const sequelize = require('./config/connection'); // Koneksi Sequelize

const app = express();
const port = 5001;

// Middleware
app.use(cors({
  origin: "https://gercep-laundry-frontend-git-main-ricardos-projects-9caccf22.vercel.app", // Alamat frontend
  credentials: true, // Agar session dikirimkan
}));
app.use(express.json());
app.use(session({
  secret: "secretkeylaundry", // Ganti dengan key yang lebih aman
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Atur secure: true jika menggunakan HTTPS
}));

// Mengimpor rute-rute
const authRoutes = require('./routes/authRoutes');
const karyawanRoutes = require('./routes/karyawanRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const orderRoutes = require('./routes/orderRoutes');


// Menggunakan rute
app.use('/api/auth', authRoutes); // Rute untuk autentikasi
app.use('/api/karyawan', karyawanRoutes); // Rute untuk data karyawan
app.use('/api/services', servicesRoutes);
app.use('/api',orderRoutes); // Menggunakan routes untuk orders

// Sinkronisasi database dan menjalankan server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });
