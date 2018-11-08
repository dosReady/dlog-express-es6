exports.exception = (err, req, res, next) => {
    console.log(err)
    res.status("500").send(`에러가 발생하였습니다.`)
}

exports.httpcode_exception = (req, res, next) => {
    res.status("404").send(`Not Found Page`)
}