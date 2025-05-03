import express from 'express';
import { haveToken } from '../middleware/auth.middleware.js';
import { getUsers, getMessages, sendMessage,countUnseenMessage } from '../controller/message.controller.js';
const router = express.Router();

router.get('/users', haveToken, getUsers);
router.get('/:id', haveToken, getMessages);
router.post('/send/:id', haveToken, sendMessage)
router.get('/unseen-count/:userId',haveToken,countUnseenMessage);


export default router;