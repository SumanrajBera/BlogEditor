const User = require('../model/user');
const passport = require('passport');
const jwt = require("jsonwebtoken");


module.exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username });
        await User.register(newUser, password);

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports.userLogin = (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error during authentication",
                error: err.message
            });
        }

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || "your_jwt_secret_key", {
            expiresIn: "7d",
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
            }
        });
    })(req, res, next);
}