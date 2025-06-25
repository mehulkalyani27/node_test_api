const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    firstName: {type : String, required:true},
    lastName: String,
    email: {type : String, required:true, unique:true},
    gender: {
      type: String,
      enum: ["M", "F", "O"],
    },
    username : {
      type: String, required:true, unique:true
    },
    password : {
      type: String, required:true,
    },
    secondTable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'secondTable'
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true }, // Enable decryption on response
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
UserSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model("users", UserSchema);

module.exports = User;
