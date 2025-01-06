const whiteList = [ 
    'https://byteinsights-frontend.onrender.com/', 
    'http://192.168.43.154:5173',
];

const websiteAllow = {    
        
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {            
            callback(null, true);
        } 
        else {            
            callback(new Error('Not allowed by CORS'));
        }
    }, 
    credentials: true 
}

module.exports = websiteAllow;
