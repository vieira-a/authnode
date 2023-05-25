require("dotenv").config();
const mongoose = require("mongoose");
const dbServer = process.env.DB_SERVER;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

async function main() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbServer}`);
    console.log("DB is running");
  } catch (error) {
    console.log(`Database connection error: ${error}`);
  }
}

module.exports = main;
