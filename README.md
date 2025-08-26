# 🖥️ Social Networking Project  

A **Node.js + Next.js** based social networking platform built with **JavaScript, Bootstrap, and MySQL**.  

---

## 🚀 Tech Stack  

<p align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JavaScript" width="60" height="60"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="Node.js" width="60" height="60"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" alt="Next.js" width="60" height="60"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain.svg" alt="Bootstrap" width="60" height="60"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" alt="MySQL" width="60" height="60"/>
</p>

---

## 📂 Project Setup  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/Sohailshaikh5656/socialNetworkin.git
```

###2️⃣ Backend Setup

```bash
cd backend
npm install  nodmon, etc # Install All dependencies
nodemom start # or nodemon start
```

###3️⃣ Frontend Setup
```bash
cd ../frontend
npm install   # Install dependencies
npm run dev   # For development
npm run build # For production build

```

## 📁 Project Directory Structure
```bash
socialNetworkin/
│
├── backend/ # Node.js Backend
│ ├── node_modules/
│ ├── config/ # Database & environment config
│ │ └── db.js
│ ├── controllers/ # API controllers
│ │ ├── authController.js
│ │ ├── postController.js
│ │ └── userController.js
│ ├── middleware/ # Middleware (auth, validation, etc.)
│ │ └── authMiddleware.js
│ ├── models/ # Database models (MySQL/Sequelize/Mongoose)
│ │ ├── Post.js
│ │ ├── User.js
│ │ └── Comment.js
│ ├── routes/ # Express routes
│ │ ├── authRoutes.js
│ │ ├── postRoutes.js
│ │ └── userRoutes.js
│ ├── utils/ # Helper functions
│ ├── server.js # Main server entry point
│ ├── package.json
│ └── ...
│
├── frontend/ # Next.js Frontend
│ ├── node_modules/
│ ├── components/ # Reusable React components
│ │ ├── Navbar.js
│ │ ├── PostCard.js
│ │ └── Footer.js
│ ├── pages/ # Next.js pages
│ │ ├── api/ # API routes (if used)
│ │ ├── index.js # Home page
│ │ ├── login.js
│ │ ├── register.js
│ │ └── profile.js
│ ├── public/ # Static files (images, logos, etc.)
│ ├── styles/ # CSS/SCSS files
│ │ └── globals.css
│ ├── package.json
│ └── next.config.js
│
├── screenshots/ # Screenshots for README
│ ├── login.png
│ ├── register.png
│ ├── dashboard.png
│ └── profile.png
│
└── README.md
```

###📸 Screenshots
<p align="center">
  <img src="./screenShots/home.png" alt="Login Page" width="400"/>
  <img src="./screenShots/profileImage.png" alt="Dashboard" width="400"/>
  <img src="./screenShots/search.png" alt="Dashboard" width="400"/>
  <img src="./screenShots/otherprofile.png" alt="Dashboard" width="400"/>
  <img src="./screenShots/editProfile.png" alt="Dashboard" width="400"/>
  <img src="./screenShots/comments.png" alt="Dashboard" width="400"/>
</p>


###✨ Features

User authentication (JWT)

Profile management

Post creation, likes, and comments

Follow/Unfollow users

Responsive design with Bootstrap

MySQL database integration
