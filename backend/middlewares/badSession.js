const userSchema = require("../models/User")

exports.badSessionMiddleware = async (req, res, next) => {
    req.session = {}
    const auth = req.headers.authorization
    console.log(req.method, req.url, req.body, auth)
    if (auth === undefined)
        return next()
    const [username, password] = auth.split(' ')
    const user = await userSchema.findOne({ username, password })
    if (user === null)
        return next()
    req.session.user = user
    next()
}