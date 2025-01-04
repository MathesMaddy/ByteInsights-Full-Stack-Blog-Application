const express = require('express');
const app = express();
const cors = require('cors');
const mongoose  = require('mongoose');
const bcryptjs = require('bcryptjs')
const Post = require('./models/post')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const salt = bcryptjs.genSaltSync(10);
const cookieParser = require('cookie-parser')
const multer = require('multer')
const uploadMiddleware = multer({dest: 'uploads/'})
const fs = require('fs')

const secret = 'asdasfkjowietrk345464mlsfajkm@kjsdakjfk'

const allowedOrigins = [
    'http://localhost:5173', 
    'http://192.168.43.154:5173',
    'http://example.com' 
  ];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          // Allow request if the origin is in the allowedOrigins array or if no origin is provided (e.g., for non-browser requests)
          callback(null, true);
        } else {
          // Reject the request if the origin is not in the allowedOrigins list
          callback(new Error('Not allowed by CORS'));
        }
      },  // or '*' for all origins, but more secure is to specify allowed origins
    credentials: true                // Allow credentials like cookies
  }))
app.use('/uploads',express.static('uploads'))
app.use(express.json())
app.use(cookieParser())

app.post('/register',async (req,res) => {
    try{
        const {username,email,password} = req.body;
        console.log({username,email,password});
        const UserDoc = await User.create({
            username,
            email, 
            password: bcryptjs.hashSync(password,salt) 
        })        
        res.json(UserDoc);
    }
    catch(e){
        res.status(400).json(e)
    }
})

app.post('/login', async (req,res) => {
    try{
        const {email,password} = req.body;
        console.log({email,password});
        const UserDoc = await User.findOne({email})
        const passOk = await bcryptjs.compareSync(password,UserDoc.password)        
        if(passOk){    
             jwt.sign({email, id: UserDoc._id}, secret, {},(err,token) => {
                if(err) throw err
                res.cookie('token',token).json({
                    id:UserDoc._id,
                    email
                }).status(200)
            })
        } else{
            res.status(400).json('Wrong credentials')
        }           
    }
    catch(e){
        res.status(400).json(e)
    }
})

app.get('/profile',(req,res) => {
    console.log(req.cookies)

    const { token } = req.cookies
    try{
    jwt.verify(token, secret , {}, (err,info) => {
        if(err) throw err;
        res.json(info)
    })
    } catch(err) {
        res.clearCookie('token').status(400).json('Wrong credentials')
    }
    
})

app.post('/logout',(req,res) => {
    res.clearCookie('token').json('ok')
})


app.post('/create-post',uploadMiddleware.single('file'), async(req,res) => {
    const {originalname,path} = req.file;
    const paths = originalname.split('.');
    const ext = paths[paths.length-1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
    
    const { token } = req.cookies
    try {
        jwt.verify(token, secret , {}, async (err,info) => {
            if(err) throw err;
            const {title,summary,content} = req.body    
            const PostDoc = await Post.create({
                title,
                summary,
                content,
                cover:newPath,
                author:info.id
            })
        res.json(PostDoc).status(200)
        }) 
    } catch(e) {
            res.json(e).status(400);
    } 
})

app.put('/post',uploadMiddleware.single('file'), (req,res) => {
    let newPath = null;
    if(req.file) {
        const {originalname,path} = req.file;
        const paths = originalname.split('.');
        const ext = paths[paths.length-1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }
    const { token } = req.cookies
    try {
        jwt.verify(token, secret , {}, async (err,info) => {
            if(err) throw err;
            console.log(req.body)  
            const {id,title,summary,content} = req.body              
            const PostDoc = await Post.findById(id)
            console.log(PostDoc)
            const isAuthor = JSON.stringify(PostDoc.author)===JSON.stringify(info.id)  
            if(!isAuthor)
                return res.status(400).json('you are not the author.')
        
            const updatedPost = await Post.findOneAndUpdate(
            {_id: id},    
            {$set: {
                    title,
                    summary,
                    content,
                    cover: newPath ? newPath : PostDoc.cover
                }   
            },
            {new: true}
            );

        res.json(PostDoc).status(200)
        }) 
    } catch(e) {
            res.json(e).status(400);
    }     
})

app.get('/posts', async (req,res) => {
    res.json(
        await Post.find()
        .populate('author',['username'])
        .sort({createdAt: -1})
    )
})

app.get('/post/:id', async (req,res) => {
    const {id} = req.params
    console.log(id)
    try{
        const PostDoc = await Post.findById(id).populate('author',['username']);
        PostDoc.cover = PostDoc.cover.replace(/\\/g,'/');
        console.log(PostDoc)
        res.json(PostDoc);
    } catch(e) {
        res.json(e).status(400);
    }    
})

try{
    mongoose.connect('mongodb+srv://matheswaranaemaddy:yoKGV7BU9SdXSlMh@mern-blog.2300u.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog')
}catch(e) {
    console.log(e);
}

app.listen(4000,console.log('Listing Port 4000'));


// yoKGV7BU9SdXSlMh
// mongodb+srv://matheswaranaemaddy:yoKGV7BU9SdXSlMh@mern-blog.2300u.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog