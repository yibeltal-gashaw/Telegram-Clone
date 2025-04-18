import User from '../models/user.model.js'
import Message from '../models/message.model.js';
import { cloudinary } from '../lib/cloudinary.js';

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

export const getMessages = (req, res) => {
    try {
        const { id: chatId } = req.params.id;
        const senderId = req.user._id;

        // get all messages send and recived by the user
        const message = Message.find({
            $or: [
                { senderId: senderId, revieverId: chatId },
                { senderId: chatId, revieverId: senderId }
            ]
        })

        res.status(200).json(message)

    } catch (error) {
        console.log("Error in Message Controller" + error.message);
        res.status(500).json({ Error: "Internal Server Errro!" });
    }
}

export const sendMessage = (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadImage = cloudinary.uploader.upload(image);
            imageUrl = uploadImage.secure_url;
        }
        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        })

        newMessage.save();


    res.status(200).json(newMessage)

    } catch (error) {
        console.log("Error in Message Controller" + error.message);
        res.status(500).json({ Error: "Internal Server Errro!" });
    }
}