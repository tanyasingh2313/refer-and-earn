const User = require('../modules/user_model');
const Config = require('../modules/config_model');

module.exports.apply_referral = async (req, res) => {
    const { email, referralCode } = req.body;

    try {
        // 1. jis user ko coins milne hain
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found. Please register first.' });
        }

        // 2. referrer user (jisne code share kiya)
        const referrer = await User.findOne({ referralCode });
        if (!referrer) {
            return res.status(400).json({ message: 'Invalid referral code.' });
        }

        // 3. apna khud ka code use na kare
        if (referrer.email === email) {
            return res.status(400).json({ message: 'You cannot use your own referral code.' });
        }

        // 4. reward coins config se lo
        const config = await Config.findOne({ key: 'REFERRAL_REWARD' });
        const rewardCoins = config ? config.value : 50;

        // 5. coins add karo user me
        user.coins += rewardCoins;
        await user.save();

        return res.status(200).json({
            message: `Referral applied successfully. ${rewardCoins} coins added.`,
            coins: user.coins
        });

    } catch (error) {
        console.error('Error applying referral:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
