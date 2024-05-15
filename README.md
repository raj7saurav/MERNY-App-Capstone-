merny-social-backend
├── controllers
│ ├── commentController.js
│ ├── conversationController.js
│ ├── messageController.js
│ ├── notificationController.js
│ ├── postController.js
│ └── userController.js
├── models
│ ├── Comment.js
│ ├── Conversation.js
│ ├── Message.js
│ ├── Notification.js
│ └── User.js
├── routes
│ ├── commentRoutes.js
│ ├── conversationRoutes.js
│ ├── messageRoutes.js
│ ├── notificationRoutes.js
│ ├── postRoutes.js
│ └── userRoutes.js
├── .env
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── README.md

php
Copy code

## Database Schema

The application uses the following Mongoose schemas:

### User

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    bio: { type: String, default: '' },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
Post
javascript
Copy code
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
Comment
javascript
Copy code
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
Message
javascript
Copy code
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
Notification
javascript
Copy code
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
Conversation
javascript
Copy code
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
API Endpoints
The backend provides the following API endpoints:

User Endpoints
GET /users: Get all users
GET /users/:id: Get a single user by ID
POST /users: Create a new user
PUT /users/:id: Update a user by ID
DELETE /users/:id: Delete a user by ID
Post Endpoints
GET /posts: Get all posts
GET /posts/:id: Get a single post by ID
POST /posts: Create a new post
PUT /posts/:id: Update a post by ID
DELETE /posts/:id: Delete a post by ID
Comment Endpoints
GET /comments: Get all comments
GET /comments/:id: Get a single comment by ID
POST /comments: Create a new comment
PUT /comments/:id: Update a comment by ID
DELETE /comments/:id: Delete a comment by ID
Message Endpoints
GET /messages: Get all messages
GET /messages/:id: Get a single message by ID
POST /messages: Create a new message
PUT /messages/:id: Update a message by ID
DELETE /messages/:id: Delete a message by ID
Notification Endpoints
GET /notifications: Get all notifications
GET /notifications/:id: Get a single notification by ID
POST /notifications: Create a new notification
PUT /notifications/:id: Update a notification by ID
DELETE /notifications/:id: Delete a notification by ID
Conversation Endpoints
GET /conversations: Get all conversations
GET /conversations/:id: Get a single conversation by ID
POST /conversations: Create a new conversation
PUT /conversations/:id: Update a conversation by ID
DELETE /conversations/:id: Delete a conversation by ID
Setup Instructions
To set up the project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/merny-social-backend.git
cd merny-social-backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and add the following variables:

makefile
Copy code
MONGODB_URI=your_mongodb_uri
PORT=your_port
JWT_SECRET=your_jwt_secret
Start the development server:

bash
Copy code
npm start
Contributing
If you want to contribute to this project, please fork the repository and create a pull request with your changes. Make sure to follow the existing code style and structure.

License
This project is licensed under the MIT License.

Contact
For any questions or inquiries, please contact [your-email@example.com].

swift
Copy code

Remember to replace placeholders like `yourusername`, `your_mongodb_uri`, `your_port`, `your_jwt_secret`, and `your-email@example.com` with the actual details.

Make sure your repository is set to private, and give access to the evaluator as required




Step 1: Bootstrap a React Project
Use create-react-app to bootstrap a new React project.

bash
Copy code
npx create-react-app merny-social
cd merny-social
Step 2: Set Up the Project Structure
Inside the merny-social directory, create the required folders and files as per the guidelines.

bash
Copy code
mkdir client public src styles assets components
touch public/index.html public/manifest.json
Step 3: Organize Files and Folders
Move the default files into the appropriate folders:

Move index.html and manifest.json into the public folder.
Move the src folder contents into the src directory.
Step 4: Update the File Structure
Ensure your project structure looks like this:

java
Copy code
merny-social
├── client
├── public
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.js
│   ├── index.js
│   └── ...
├── styles
├── assets
├── components
│   ├── Profile
│   │   ├── EditProfile.js
│   │   ├── Follower.js
│   │   ├── Following.js
│   │   ├── Post.js
│   │   ├── Saved.js
│   │   └── UserInfo.js
│   └── ...
├── package.json
├── package-lock.json
└── README.md
Step 5: Create Sample Components
Create a sample component to ensure the structure is working. Here’s an example of the Profile component structure.

javascript
Copy code
// components/Profile/EditProfile.js
import React from 'react';
import './EditProfile.css';

const EditProfile = () => {
    return (
        <div className="edit-profile">
            <h2>Edit Profile</h2>
            {/* Add form or other components here */}
        </div>
    );
};

export default EditProfile;
css
Copy code
/* components/Profile/EditProfile.css */
.edit-profile {
    /* Add styles here */
}
Step 6: Update App.js
Modify App.js to include the new component.

javascript
Copy code
// src/App.js
import React from 'react';
import EditProfile from './components/Profile/EditProfile';

function App() {
    return (
        <div className="App">
            <EditProfile />
        </div>
    );
}

export default App;
Step 7: Create a README File
Create a README.md file in the root directory and include the following content:

markdown
Copy code
# MERNY Social

MERNY Social is a social media application built with the MERN stack (MongoDB, Express, React, Node.js). This repository contains the front-end codebase built using React.

## Project Structure

The project structure follows specific guidelines to ensure proper configuration and maintainability.

merny-social
├── client
├── public
│ ├── index.html
│ └── manifest.json
├── src
│ ├── App.js
│ ├── index.js
│ └── ...
├── styles
├── assets
├── components
│ ├── Profile
│ │ ├── EditProfile.js
│ │ ├── Follower.js
│ │ ├── Following.js
│ │ ├── Post.js
│ │ ├── Saved.js
│ │ └── UserInfo.js
│ └── ...
├── package.json
├── package-lock.json
└── README.md

perl
Copy code

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/merny-social.git
    cd merny-social
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request with your changes. Make sure to follow the existing code style and structure.

## License

This project is licensed under the MIT License.
Step 8: Commit and Push to GitHub
Initialize a git repository, commit your changes, and push to GitHub.

bash
Copy code
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/merny-social.git
git push -u origin master
Now your project is properly structured and ready for further development.
