import jwt from 'jsonwebtoken'
import config from '../setting/config.json'
import util from '../utils'

const createToken = (user, req) => {
    let ip = req.header('x-forwarded-for') || req.connection.remoteAddress
    const accessToken = jwt.sign({user: user}, config.jwt.accessSecret, {algorithm: config.jwt.accressAlg, expiresIn: config.jwt.accessExpires})
    const refreshToken = jwt.sign({secret: util.aesCipher(ip + req.sessionID)}, config.jwt.refreshScret, {algorithm: config.jwt.refreshAlg, expiresIn: config.jwt.refreshExpires})
    return {access: accessToken, refresh: refreshToken}
}
const isVaild = (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret)
        return decoded
    } catch (error) {
        return false
    }
}
const refreshAccessToken = (param) => {
    const refreshDecoded = isVaild(param.jwt_refresh_token, config.jwt.refreshScret)
    if (refreshDecoded) {
        const accessToekn = jwt.sign({user: param.user}, config.jwt.accessSecret, {algorithm: config.jwt.accressAlg, expiresIn: 10})
        return accessToekn
    } else return false
}
const jwtModule = (req, res, next) => {
    try {
        next()
    } catch (error) {
        next(error)
    }
}
exports.jwtModule = jwtModule
exports.createToken = createToken
exports.isVaild = isVaild
exports.refreshAccessToken = refreshAccessToken