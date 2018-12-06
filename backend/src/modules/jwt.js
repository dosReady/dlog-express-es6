import jwt from 'jsonwebtoken'
import config from '../setting/config.json'

const createToken = (user, req) => {
    const accessToken = jwt.sign({user: user}, config.jwt.accessSecret, {algorithm: config.jwt.accressAlg, expiresIn: 10})
    const refreshToken = jwt.sign({accessToekn: accessToken}, config.jwt.refreshScret, {algorithm: config.jwt.refreshAlg, expiresIn: 30})
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