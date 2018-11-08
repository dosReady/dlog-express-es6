exports.exception = (err, req, res, next) => {
    console.log(err)
}

exports.httpcode_exception = (req, res, next) => {
    res.status("404").send(`Not Found Page`)
}