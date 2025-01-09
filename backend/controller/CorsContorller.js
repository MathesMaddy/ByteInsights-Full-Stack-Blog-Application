const whiteList = [ 
    'https://byteinsights-frontend.onrender.com', 
    'https://byteinsights.onrender.com',

];

const websiteAllow = {    
        
    origin: (origin, callback) => {
        console.log("Request origin "+origin);
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
