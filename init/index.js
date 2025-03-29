

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js"); // Ensure the file exists

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wandar_lust');
    console.log("Connected to MongoDB");
}

main().catch(err => console.log(err));

const initDB = async () => {
    try {
        await Listing.deleteMany(); // Clear existing data
        initdata.data=initdata.data.map((obj)=>({
           ...obj,owner:"67e2c4ba2bdaf272e6d2e703" 
        }))
        await Listing.insertMany(initdata.data); // Use correct variable
        console.log("Database seeded successfully");
    } catch (error) {
        console.log("Error seeding database:", error);
    }
};

initDB();
