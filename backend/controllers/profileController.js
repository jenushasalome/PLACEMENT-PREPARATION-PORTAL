import Profile from "../models/Profile.js";


export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    let profile = await Profile.findOne({ user: userId });

    
    if (!profile) {
      profile = await Profile.create({
        user: userId,
      });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      req.body,
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};