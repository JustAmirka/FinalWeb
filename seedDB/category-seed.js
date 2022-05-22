const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Category = require("../models/category");
const mongoose = require("mongoose");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  async function seedCateg(titleStr) {
    try {
      const categ = await new Category({ title: titleStr });
      await categ.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }
  await seedCateg("Home");
  await seedCateg("Baby");
  await seedCateg("Clothes");
  await seedCateg("Electronic");
  await seedCateg("Pets");
  await seedCateg("Sport");
  await seedCateg("Health");
  await closeDB();
}

seedDB();
