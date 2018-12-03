import nodeeamiler from 'nodemailer'
import config from '../setting/config.json'
import btoa from 'btoa'
class SendEmail {
    constructor () {
        this.transporter = nodeeamiler.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: config.gmail.user,
                pass: config.gmail.password,
                clientId: config.gmail.clientId,
                clientSecret: config.gmail.clientSecret,
                refreshToken: config.gmail.refreshToken,
                accessToken: config.gmail.accessToken,
                expires: config.gmail.expires
            }
        })
    }
    send (object) {
        const mailOptions = {
            from: config.gmail.user,
            to: object.to,
            subject: object.subject,
            html: `
            <div style="height: 30rem">
                <div style="width: 5rem; margin-top: 1rem; margin: 0 auto;">
                    <img style="border-radius: 3rem" src="http://dlog.site:3000/static/image/dlog_logo.png"></img>
                    <h1>Dlog</h1>
                </div>
                <div style="border: 1px solid #dee2e6; padding: 1rem; background-color:#f8f9fa; border-radius: 1rem; width:15rem; margin: 0 auto;">
                    <b>본 메일은 회원가입을 위한 메일이며, 24시간후 만료됩니다.</b>
                    <p>본 메일은 저희 사이트에서 회원가입요청으로 발송된 메일이며, 본인의 요청이 아닐 경우 무시하기시 바랍니다.</p>
                    <p>가입을 원하시면 아래 링크를 클릭 후 회원가입절차를 진행하시기바랍니다.</p>
                    <a href="http://localhost/join?email=${btoa(object.to)}" target="_blank">http://localhost/join?email=${btoa(object.to)}</a>
                </div>
            </div>
            `
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
