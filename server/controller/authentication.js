const axios = require("axios");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const newUser = new User({ email, secPass });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const data = await User.findOne({ email });
    if (!data) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, data.secPass);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const googleLogin = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "http://localhost:5173",
        grant_type: "authorization_code",
      }
    );

    const { access_token, id_token } = tokenResponse.data;

    // Use access_token to get user information if needed
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userInfo = userInfoResponse.data;

    // Handle user login or registration here
    const userDetail = await User.findOne({ email: userInfo.email });
    if (!userDetail) {
      let newUser = new User({
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
      });
      await newUser.save();
    }
    res.status(200).json({
      message: "Login successful",
      user: userInfo,
      token: id_token, // or your own session token
    });
  } catch (error) {
    console.error("Error exchanging authorization code", error);
    res.status(500).json({
      message: "Error during Google login",
      error: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    user.resetToken = hashedToken;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:5173/resetPassword?token=${token}&id=${user._id}`;
    const message = `Click on the link below to reset your password:\n\n${resetUrl}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Password",
      text: message,
    });

    res.status(200).json(message);
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const resetPassword = async (req, res) => {
  const { password, userId, token } = req.body;
  if (!password || !userId || !token) {
    return res
      .status(400)
      .json({ error: "Password, user ID and token are required" });
  }


  try {
    const user = await User.findOne({
      _id: userId,
      resetTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    if (hashedToken !== user.resetToken) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.secPass = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
const test = async (req, res) => {
  res.status(200).send("<h1>Hello World</h1>");
};

module.exports = {
  signup,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  test,
};
