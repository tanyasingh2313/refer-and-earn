const user_model = require('../modules/user_model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generate_token');

// -------------------- Helper: Referral Code Generator --------------------
function generateReferralCode() {
    // 8 character random code, e.g. A1B2C3D4
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// -------------------- REGISTER USER --------------------
module.exports.register_user = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // check if user already exists
        const existing = await user_model.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists, please login" });
        }

        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(password, salt);

        // generate unique referral code
        let referralCode = generateReferralCode();
        let existingCode = await user_model.findOne({ referralCode });

        while (existingCode) {
            referralCode = generateReferralCode();
            existingCode = await user_model.findOne({ referralCode });
        }

        // create user with referralCode & coins = 0
        const user = await user_model.create({
            name,
            email,
            password: hash,
            referralCode,
            coins: 0
        });

        // create token & set cookie
        const token = generateToken({ email });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,              // localhost ke liye false, https pe true karna
            maxAge: 24 * 60 * 60 * 1000
        });

        // SAFE response – no password
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
                referralCode: user.referralCode,
                coins: user.coins
            }
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// -------------------- LOGIN USER --------------------
module.exports.login_user = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check user exists
        const user = await user_model.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist, please register" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create token
        const token = generateToken({ email });

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,   // localhost => false (https par true)
            maxAge: 24 * 60 * 60 * 1000
        });

        // Send safe response
        return res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                referralCode: user.referralCode,
                coins: user.coins
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// -------------------- LOGOUT USER --------------------
module.exports.logout_user = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: false,
        maxAge: 0
    });

    return res.status(200).json({ message: "Logged out successfully" });
};

// -------------------- PROFILE USER (Protected) --------------------
module.exports.profile_user = (req, res) => {
    // protect middleware se req.user aata hai (password already removed)
    return res.status(200).json(req.user);
};
