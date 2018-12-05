import jwt from 'jsonwebtoken'
import config from '../setting/config.json'

const createToken = (user) => {
    const accessToken = jwt.sign({user: user}, config.jwt.secret, {algorithm: config.jwt.algorithm, expiresIn: 30})
    const refreshToken = jwt.sign({user: user}, config.jwt.secret, {algorithm: config.jwt.algorithm, expiresIn: 60 * 60})
    return {access: accessToken, refresh: refreshToken}
}
const isVaild = (token) => {
    const decoded = jwt.verify(token, config.jwt.secret)
    return decoded
}

const jwtModule = (req, res, next) => {
    try {
        const token = req.body.token
        
        if (token) {
            const accessdecode = isVaild(token.access)
            const refeshdecode = isVaild(token.refresh)
            if (refeshdecode)
            console.log(accessdecode)
        }
        next()
    } catch (error) {
        next(error)
    }
}
exports.jwtModule = jwtModule
exports.createToken = createToken
exports.isVaild = isVaild