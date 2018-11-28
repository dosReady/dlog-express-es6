
module.exports = {
    nvl (val, type) {
        if (!val) {
            if(type === 'number') return 0
            if(type === 'string') return ''
        }
        return val
    } 
}