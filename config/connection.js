const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.error('Unable to connect to database:', err));

    

module.exports = sequelize;
