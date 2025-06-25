const User = require('../../models/user.model');
const SecondTable = require('../../models/second.table.model')

// Create
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    await user.save();
    res.status(201).json({ status: true,message: "User Created Successfully!", data: user });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message ,data : {}});
  }
};

// Read All
exports.getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; 
  const skip = (page - 1) * limit;
  const totalDocs = await User.countDocuments();
  const users = await User.find().populate({path: 'secondTable',
    select: 'data'}).skip(skip).limit(limit);
  res.status(200).json({ status: true, message:"User Fetched Successfully!", data:{
    data: users, 
    pagination: {
      "totalDocuments" : totalDocs,
      "hasNextPage" : ((page * limit) < totalDocs),
      "lastPage" : Math.ceil(totalDocs / limit)
    }
  }});
};

// Read One
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ status: false, message: "User not found", data:{}});
  res.json({ status: true, message: "User fetched Successfully!", data: user });
};

// Update
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },        // update object
    { new: true }              // options
  );
  if (!user) return res.status(404).json({ status: false, message: "User not found",data:{}});
  res.json({ status : true, message: "User Updated Successfully", data: user });
};

// Delete
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ status: false, message: "User not found" ,data:{}});
  res.json({ status: true, message: "User deleted",data:user});
};
