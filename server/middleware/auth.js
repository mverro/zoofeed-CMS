const { tokenVerifier } = require('../helper/jsonwebtoken')

const auth = (req, res, next) => {
    const access_token = req.headers.access_token
    if (access_token) {
        try {
            let data = tokenVerifier(access_token)
            req.userData = data
            next()
        } catch {
            return res.status(401).json({
                message: "access token not authenticated! "
            })
        }
    } else {
        res.status(404).json({ message: "Access token not found!" })
    }

}


module.exports = { auth }