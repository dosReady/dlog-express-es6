import crypto from 'crypto'
import config from '../setting/config.json'
module.exports = {
    nvl (val, type) {
        if (!val) {
            if(type === 'number') return 0
            if(type === 'string') return ''
        }
        return val
    },
    aesCipher (val) {
        if (val) {
            const cipher = crypto.createCipher('aes192', config.secretKey)
            let result = cipher.update(val, 'utf8', 'base64')
            result += cipher.final('base64')
            return result
        } else return false
    },
    aesDecipher (val) {
        if (val) {
            const decipher = crypto.createDecipher('aes192', config.secretKey)
            let result = decipher.update(val, 'base64', 'utf8')
            result += decipher.final('utf8')
            return result
        } else return false
    }
}