import User from '../models/user.model.js'
import Message from '../models/message.model.js';
import { cloudinary } from '../lib/cloudinary.js';
import { getReceiverSocketId, io } from '../lib/socketIO.js';

export const getUsers = async (req, res) => {
  try {
    const LogeduserId = req.user._id;

    // find all users except currently logged in user
    // .select('-password') not including the password field
    const filteredUser = await User.find({ _id: { $ne: LogeduserId } }).select('-password');

    res.status(200).json(filteredUser)
  } catch (error) {
    console.log("Error in message controller" + error.message);
    res.status(500).json({ error: "Internal Server Error!" })
  }
}

export const getMessages = async (req, res) => {
  try {
    const chatId = req.params.id;
    const senderId = req.user._id;

    // get all messages send and recived by the user
    const message = await Message.find({
      $or: [
        { senderId: senderId, receiverId: chatId },
        { senderId: chatId, receiverId: senderId }
      ]
    });


    res.status(200).json(message)

  } catch (error) {
    console.log("Error in Message Controller" + error.message);
    res.status(500).json({ Error: error.message });
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id; // ✅  object destructuring
    const senderId = req.user._id;

    let imageUrl = "";

    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image); // ✅ await it
      imageUrl = uploadImage.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    await newMessage.save(); // ✅ await to ensure it's saved before responding

    const receiveSocketId = getReceiverSocketId(receiverId);
    if (receiveSocketId) {
      io.to(receiveSocketId).emit('new-message', newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.error("Error in Message Controller: " + error.message);
    res.status(500).json({ error: error.message });
  }
};

export const countUnseenMessage = async (req, res) => {
  const userId = req.params.userId;
  const count = await Message.countDocuments({ receiverId: userId, isRead: false });
  res.json({ count });
}
