const jwt = require("jsonwebtoken")

const logger = (req, res, next) => {
    var token = req.headers.authorization
    console.log(token)
    if (token) {
        try {
            const decoded = jwt.verify(token.split(" ")[1], "masai")
            if (decoded) {
                req.body.authorID = decoded.authorID
                req.body.author = decoded.author
                next()
            } else {
                res.send({ "msg": "please Login" })
            }
        } catch (error) {
            res.send({ "err": err.message })
        }
    }else{
        res.send("token not found")
    }


   

}


module.exports = {
    logger
}