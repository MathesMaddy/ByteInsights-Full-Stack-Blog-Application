const express = require('express');
const app = express();
const cors = require('cors');
const mongoose  = require('mongoose');
const PORT = process.env.PORT || 4000;
const Post = require('./models/post');

const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const corsController = require('./controller/CorsContorller');

const eventlog = require('./middleware/EventLog');

const registerRouter = require('./router/RegisterRouter');
const LoginRouter = require('./router/LoginRouter');
const ProfileRouter = require('./router/ProfileRouter');
const CreatePostRouter = require('./router/CreatePostRouter');
const UpdatePostRouter = require('./router/UpdatePostRouter');
const ReadPostRouter = require('./router/ReadPostRouter');
const DeletePostRouter = require('./router/DeletePostRouter');

// Event log 
// app.use((req,res,next) => {
//     console.log(`${req.method}\t${req.headers.origin}\t${req.path}`);
//     eventlog(`${req.method}\t${req.url}\t\t${req.headers.origin}`, 'logEvent.txt');
//     next();
// });

app.use(cors(corsController));

app.use('/uploads',express.static('uploads'));
app.use(express.json());
app.use(cookieParser());


app.get('/profile', ProfileRouter);
app.post('/register', registerRouter);
app.post('/login', LoginRouter);

app.post('/logout', (req,res) => {    
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'None', 
        expires: new Date(0),
        path: '/', 
    }).json('ok')
})

app.get('/posts', async (req,res) => {
    res.json(
        await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
    )
})

app.put('/post', uploadMiddleware.single('file'), UpdatePostRouter);
app.post('/create-post', uploadMiddleware.single('file'), CreatePostRouter);
app.get('/post/:id', ReadPostRouter);
app.delete('/delete-post/:id', DeletePostRouter);

try {
    mongoose.connect('mongodb+srv://matheswaranaemaddy:yoKGV7BU9SdXSlMh@mern-blog.2300u.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog')
} catch(e) {
    console.log(e);
}

app.listen(PORT,console.log('server is Running in '+PORT));
