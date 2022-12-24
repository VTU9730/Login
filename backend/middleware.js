const jwt=require('jsonwebtoken')
module.exports=function(req,res,next){
    let token=req.header('x-token')
    if(!token){
        res.status(400).send('User not found')
    }
    let decode=jwt.verify(token,"jsonKey")
    req.user=decode.user
    next()
}
