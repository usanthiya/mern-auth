import userModel from "../models/userModel.js";

const getUserData = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userModel.findById(userId);

    if(!user){
        return res.json({success: false, message: 'User not found'});
    }

    return res.json({
        success: true,
        userData: {
            name: user.name,
            isAccountVerified: user.isAccountVerified
        }
    })
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export default getUserData;
