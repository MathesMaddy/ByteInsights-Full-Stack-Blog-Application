const whiteList = [ 
    'http://localhost:5173', 
    'http://192.168.43.154:5173',
    'http://example.com' ];

const websiteAllow = {    
        
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            // Allow request if the origin is in the whiteList array 
            callback(null, true);
        } 
        else {
            // Reject the request if the origin is not in the whiteList list
            callback(new Error('Not allowed by CORS'));
        }
    }, 
    credentials: true // Allow credentials like cookies

}