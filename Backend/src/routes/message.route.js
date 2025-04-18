import express from 'express';
import { haveToken } from '../middleware/auth.middleware.js';
import { getUsers, getMessages, sendMessage } from '../controller/message.controller.js';
const router = express.Router();

router.get('/users', haveToken, getUsers);
router.get('/:id', haveToken, getMessages);
router.post('/send/:id', haveToken, sendMessage)


export default router;