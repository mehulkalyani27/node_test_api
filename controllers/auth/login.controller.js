const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // 1. Validate input
  if (!username || !password) {
    return res.status(400).json({ status: false, message: "All fields are required" });
  }

  try {
    // 2. Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ status: false, message: "Invalid credentials" });
    }

    // 3. Validate password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ status: false, message: "Invalid credentials" });
    }

    // 4. Create token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });

    // 5. Send token and user data
    res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
};
