# 📝 MERN Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, CRUD operations for blog posts, likes, comments, and a modern, responsive UI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- User profile management

### 📰 Blog Posts
- Create, read, update, and delete posts
- Rich text content support
- Image uploads for featured images
- Tags for categorization
- Pagination for post lists

### 💬 Social Features
- Like/unlike posts
- Comment on posts
- View like counts and comments
- User profiles with avatars

### 🎨 UI/UX
- Modern, responsive design
- Dark mode support
- Smooth animations and transitions
- Mobile-friendly interface
- Tailwind CSS styling

## 🏗️ Project Structure

```
mern-blog/
├── client/                      # React front-end
│   ├── public/                  # Static files
│   │   ├── vite.svg             # App logo
│   └── src/
│       ├── assets/              # Images, icons
│       ├── components/          # Reusable components
│       │   ├── Navbar.jsx       # Navigation bar
│       │   └── PostCard.jsx     # Post card component
│       ├── context/             # React context providers
│       │   ├── AuthContext.jsx  # Authentication state
│       │   └── ThemeContext.jsx # Theme management
│       ├── pages/               # Page components
│       │   ├── Home.jsx         # Home page
│       │   ├── Login.jsx        # Login page
│       │   ├── Register.jsx     # Registration page
│       │   ├── CreatePost.jsx   # Create post page
│       │   └── SinglePost.jsx   # Post detail page
│       ├── services/            # API services
│       │   └── api.js           # Axios configuration
│       ├── App.jsx              # Main app component
│       ├── main.jsx             # Entry point
│       └── index.css            # Global styles
│
├── server/                      # Express.js back-end
│   ├── config/                  # Configuration
│   │   └── db.js                # Database connection
│   ├── controllers/             # Route controllers
│   │   ├── authController.js    # Auth logic
│   │   └── postController.js    # Post CRUD logic
│   ├── middleware/              # Custom middleware
│   │   └── auth.js              # JWT verification
│   ├── models/                  # Mongoose models
│   │   ├── User.js              # User schema
│   │   └── Post.js              # Post schema
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── postRoutes.js        # Post endpoints
│   ├── utils/                   # Utility functions
│   │   └── generateToken.js     # JWT generation
│   ├── .env                     # Environment variables
│   ├── .env.example             # Example env file
│   ├── server.js                # Express server
│   └── package.json             # Server dependencies
│
├── .gitignore                   # Git ignore rules
└── README.md                    # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** - Comes with Node.js

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mern-stack-integration-bece21-mkenani
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file in server directory
   cp .env.example .env
   ```
   
   Edit `server/.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

4. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

5. **Configure client environment**
   Create `client/.env.local`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   # On macOS/Linux
   mongod
   
   # On Windows
   net start MongoDB
   ```

2. **Start the server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

3. **Start the client**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📊 Database Schema

### User Model
```javascript
{
  username: String (required, unique, min: 3 chars),
  email: String (required, unique),
  password: String (required, min: 6 chars, hashed with bcrypt),
  profilePicture: String (optional, default: ''),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  title: String (required, max: 200 chars),
  content: String (required),
  author: ObjectId (ref: 'User', required),
  image: String (optional, default: ''),
  tags: [String],
  likes: [ObjectId] (ref: 'User'),
  comments: [{
    user: ObjectId (ref: 'User'),
    text: String (required),
    createdAt: Date (default: now)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Posts
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all posts (paginated) | No |
| GET | `/api/posts/:id` | Get single post | No |
| POST | `/api/posts` | Create new post | Yes |
| PUT | `/api/posts/:id` | Update post | Yes (author only) |
| DELETE | `/api/posts/:id` | Delete post | Yes (author only) |

### Post Interactions
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/posts/:id/comments` | Add comment | Yes |
| PUT | `/api/posts/:id/like` | Like/unlike post | Yes |

### Request/Response Examples

#### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "_id": "...",
  "username": "johndoe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

#### Create Post
```bash
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content...",
  "tags": ["javascript", "react"],
  "image": "https://example.com/image.jpg"
}

Response: {
  "_id": "...",
  "title": "My First Post",
  "content": "This is the content...",
  "author": {
    "username": "johndoe",
    "profilePicture": ""
  },
  "likes": [],
  "comments": [],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables

## 🎯 Key Features Implementation

### Authentication Flow
1. User registers with username, email, and password
2. Password is hashed with bcrypt before storing
3. JWT token is generated and sent to client
4. Token is stored in localStorage
5. Protected routes verify token via middleware

### Like System
- Users can like/unlike posts
- Like state persists in database
- UI reflects current like status
- Like count displayed in real-time

### Comments System
- Authenticated users can comment
- Comments include user info and timestamp
- Comments display with user avatars
- Real-time updates on submission

### Responsive Design
- Mobile-first approach
- Grid layouts adapt to screen size
- Touch-friendly buttons
- Optimized images

## 📝 Environment Variables

### Server (.env)
```env
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_secret_key_here
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Client (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing the Application

1. **Register a new user**
   - Go to `/register`
   - Fill in the form
   - Submit and you'll be logged in

2. **Create a post**
   - Go to `/create`
   - Add title, content, tags, and optional image
   - Submit

3. **Interact with posts**
   - Click on a post to view details
   - Like/unlike posts
   - Add comments
   - Edit or delete your own posts

## 🐛 Troubleshooting

### MongoDB Connection Error
```
MongooseServerSelectionError: connect ECONNREFUSED
```
**Solution:** Make sure MongoDB is running
```bash
# Check if MongoDB is running
# On macOS/Linux
ps aux | grep mongod

# On Windows
Get-Service MongoDB
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:** Change the PORT in `.env` or stop the process using that port

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Check that CLIENT_URL in server/.env matches your client URL

### 401 Unauthorized
```
Token is not valid
```
**Solution:** 
- Clear localStorage and login again
- Check JWT_SECRET matches in .env

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Developed as part of the MERN Stack Integration Assignment.

## 🙏 Acknowledgments

- MongoDB for the excellent documentation
- Express.js team for the robust framework
- React team for the amazing library
- All contributors to the open-source packages used

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Happy Coding! **
