const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

exports.registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword});
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '60m' });

    res.cookie('authToken', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production 
      // sameSite: 'Strict', // Adjust based on your needs
      // domain: 'yourdomain.com', // Uncomment and set your domain if needed 
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ status: 200, message: 'Logged in successfully' , authToken: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
