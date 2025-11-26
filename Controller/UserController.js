import { contentModel } from "../Models/ContentModel.js";
import { UserModel } from "../Models/UserModel.js";

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password || email.length < 6 || name.length < 2 || password.length < 5) {
      return res.status(400).json("Please fill the credentials properly");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already registered, please use a different email");
    }

    const newUser = new UserModel({ name, email, password,contentAccessRequest });
    await newUser.save();

    return res.status(200).json("User created, now you can login");
  } catch (error) {
    return res.status(500).json("User not created, please try later " + error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Please provide email and password");
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json("User not found, please fill credentials properly");
    }

    if (password === existingUser.password) {
      return res.status(200).json({
        message: "Login successful",
        userId: existingUser._id,
      });
    } else {
      return res.status(400).json("Invalid password");
    }
  } catch (error) {
    return res.status(500).json("User login failed, please try later " + error);
  }
};
export const reqToAccess =(req,res)=>{
  const {msg,creatorID,requestUserID,contentId} = req.body
UserModel.findByIdAndUpdate({_id:creatorID},
  {
    $push: {
      contentAccessRequest: {
        msg,
        requestUserID,
        contentId
      }
    }
  },
  { new: true }
).then(response=> res.status(200).end("request Sent"))
.catch(err=>res.status(400).json("Failed"+err))
} 
export const allowAccess = (req, res) => {
  const { requestUserId, contentId } = req.body;

  contentModel
    .findOneAndUpdate(
      { _id: contentId },
      {
        $push: {
          users: requestUserId
        }
      },
      { new: true }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ msg: "Something went wrong",err });
    });
};
export const removeUser = (req, res) => {
  const { requestUserId, contentId } = req.body;

  contentModel
    .findOneAndUpdate(
      { _id: contentId },
        {
        $pull: {
          users: requestUserId 
        }
      },
      { new: true }
    )
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ msg: "Error removing user" }));
};
