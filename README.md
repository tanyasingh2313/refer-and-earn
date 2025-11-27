# Refer & Earn Web Application

[![Node.js](https://img.shields.io/badge/Node.js-Backend-brightgreen)]()
[![Express](https://img.shields.io/badge/Express.js-Framework-lightgrey)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)]()
[![JWT](https://img.shields.io/badge/Auth-JWT-orange)]()
[![Status](https://img.shields.io/badge/Project-Active-blue)]()

A simple and functional **Refer & Earn system** built with **Node.js, Express, MongoDB, and EJS/HTML**.  
Users can register, log in, and generate their unique referral codes to invite others.  
This project demonstrates authentication, routing, database integration, and a clean UI flow.

---

## 🚀 Features

- 🔐 User Registration & Login  
- 🔏 JWT-based Authentication  
- 🧾 Auto-generated Unique Referral Codes  
- 👥 Referral Tracking  
- 📁 Clean Folder Structure (MVC style)  
- 🛡️ Secure Password Hashing (bcrypt)  
- 🌐 MongoDB Database Integration  
- ⚙️ Express Middleware for Validation  
- 📄 Templates + Static Assets (views/public)

---

## 🧰 Tech Stack

| Layer      | Technology            |
|----------- |-----------------------|
| Frontend   | HTML, CSS, (EJS if used) |
| Backend    | Node.js, Express.js   |
| Database   | MongoDB (Mongoose)    |
| Auth       | JWT, Bcrypt           |
| Hosting (optional) | Render / Vercel |

---

## 📂 Project Folder Structure

```bash
refer-and-earn/
│
├── controllers/
│   ├── auth_controller.js
│   └── referral_controller.js
│
├── middlewares/
│   └── protect.js
│
├── modules/
│   └── config_model.js
│
├── routes/
│   ├── auth_routes.js
│   └── referral_routes.js
│
├── config/
│   └── mongoose_connection.js
│
├── public/
│   ├── register.html
│   ├── css/
│   └── js/
│
├── utils/
│   └── generate_token.js
│
├── app.js
├── package.json
└── .env (not committed)

