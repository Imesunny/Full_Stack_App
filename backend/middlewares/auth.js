const jwt = require('jsonwebtoken');


const auth = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.json({message: "Please login first" })
    }
    jwt.verify(token, 'oursecret', function(err, decoded) {
        if(err){
            return res.json({message: "Please login first" }) 
        }
        else{
            console.log(decoded);
            const {userID} = decoded;
            req.userID = userID;
            next();
        }
        // console.log(decoded.foo) // bar
      });
    
}

module.exports ={
    auth
}