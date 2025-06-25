const mongoose = require("mongoose");

const SecondTableSchema = new mongoose.Schema(
  {
    id: {type : String},
    obj: {type : String},
    data: {type : String},
  },
  {
    timestamps: true,
    toJSON: { getters: true }, // Enable decryption on response
  }
);

// ✅ Define the model properly
const SecondTable = mongoose.model("secondTable", SecondTableSchema, "secondTable");

// ✅ Export the correct variable
module.exports = SecondTable;