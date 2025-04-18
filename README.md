# 📱 Realtime Chat App

A full-stack real-time messaging app inspired by Telegram. Built with **Node.js (Express)**, **MongoDB**, **Flutter (Mobile)**, and **React (Web)**.

---

## 🚀 Features

### 👤 User Authentication
- Signup & Login using JWT
- Secure password hashing with bcrypt
- Password recovery via email (coming soon)

### 💬 Real-Time Messaging
- One-to-one chat
- Real-time delivery using Socket.IO
- Message status: Sent, Delivered, Read
- Timestamps for each message

### 🧑‍🤝‍🧑 Contact Management
- Add / Remove contacts
- Search users by username or email
- Block / Unblock users

### 📎 Multimedia Support
- Send/receive images
- Support for file uploads (PDF, DOCX, etc.)
- Emoji integration in messages

### 🔔 Notifications
- Real-time push notifications
- Notification toggle settings

### 🔐 Privacy & Account Settings
- Change password
- Delete account
- Manage blocked users

---

## 🛠️ Tech Stack

| Layer        | Technology        |
| ------------ | ----------------- |
| Frontend Web | React.js          |
| Mobile App   | Flutter           |
| Backend API  | Node.js + Express |
| Database     | MongoDB           |
| Realtime     | Socket.IO         |
| Auth         | JWT, bcrypt       |
| Uploads      | Multer            |

---

## 📂 Project Structure (Backend)

chat-app-backend/ │ ├── models/ # Mongoose schemas ├── routes/ # Express route handlers ├── controllers/ # Business logic ├── middlewares/ # JWT auth middleware, error handling ├── uploads/ # For storing images/files ├── .env # Environment variables ├── server.js # App entry point └── package.json



---


## 📱 Mobile (Flutter)

- Folder: `chat_app/`
- Manages:
  - Authentication
  - Chat UI
  - Push notifications
  - Profile management

---

## 🌐 Web (React)

- Folder: `chat-app-web/`
- Mirrors the mobile experience for desktop use

---

## 📦 Installation

### Backend

```bash
git clone https://github.com/yibeltal-gashaw/Chat-App-backend
cd Chat-App-backend
npm install
## 🔧 Setup & Configuration
```

### Environment Variables
Create a `.env` file in the root directory with:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_jwt_secret_key
```

### Starting the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🧪 API Testing

Use the provided **Postman Collection** to test the API endpoints for:
- Signup / Login
- Messaging
- Contact management
- File upload


### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Messages
- `GET /api/messages/:userId` - Get messages with a specific user
- `POST /api/messages` - Send a new message

### Contacts
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Add a new contact



👉 *Coming soon: full Postman collection link*

---
## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
