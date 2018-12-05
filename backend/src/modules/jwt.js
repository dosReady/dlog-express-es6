import jwt from 'jsonwebtoken'
import config from '../setting/config.json'

const createToken = (user, req) => {
    const accessToken = jwt.sign({user: user}, config.jwt.accessSecret, {algorithm: config.jwt.accressAlg, expiresIn: 30})
    const refreshToken = jwt.sign({user: user}, config.jwt.refreshScret, {algorithm: config.jwt.refreshAlg, expiresIn: 60 * 60})
    req.session.refresh = refreshToken
    return accessToken
}
const isVaild = (token) => {
    const decoded = jwt.verify(token, config.jwt.secret)
    return decoded
}
const _refreshAccessToken = (req) => {
    const access = req.body.access
    const refresh = req.session.refresh
    console.log(access)
    console.log(refresh)
}
const jwtModule = (req, res, next) => {
    try {
        _refreshAccessToken(req)
        next()
    } catch (error) {
        next(error)
    }
}
exports.jwtModule = jwtModule
exports.createToken = createToken
exports.isVaild = isVaild