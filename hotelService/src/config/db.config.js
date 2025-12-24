// import {dbConfig} from './index'

// export const config={
//   development: {
//     username: dbConfig.DB_USER,
//     password: dbConfig.DB_PASSWORD,
//     database: dbConfig.DB_NAME,
//     host: dbConfig.DB_HOST,
//     dialect: "mysql"
//   },
//   test: {
//     username: "root",
//     password: null,
//     database: "mydb",
//     host:"127.0.0.1",
//     dialect: "mysql"
//   },
//   production: {
//     username: "root",
//     password: null,
//     database: "mydb",
//     host: "127.0.0.1",
//     dialect: "mysql"
//   }
// }
const dotenv = require('dotenv')
dotenv.config()
const config = {
    development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql"
  },
   production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql"
  },
}

module.exports=config