import nodeeamiler from 'nodemailer'
import config from '../setting/config.json'
class SendEmail {
    constructor () {
        this.transporter = nodeeamiler.createTransport({
            service: 'gmail',
            auth: {
                user: config.gmail.user,
                pass: config.gmail.password
            }
        })
    }
    send (object) {
        const mailOptions = {
            from: config.gmail.user,
            to: object.to,
            subject: object.subject,
            html: '<h1>!!!!!!!!!!!!!!!!!!</h1>'
        }
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email sent!: ${info.response}`)
            }
            this.transporter.close()
        })
    }
}

module.exports = new SendEmail()
