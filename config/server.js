const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

module.exports = {
    PORT : process.env.PORT,
    MONGOURI : process.env.MONGOURI,
    cloud_name : process.env.cloud_name,
    api_key : process.env.api_key,
    api_secret : process.env.api_secret,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRE_TIME : process.env.JWT_EXPIRE_TIME,
}

