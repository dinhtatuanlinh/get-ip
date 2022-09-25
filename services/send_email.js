const nodemailer = require("nodemailer");

let sendEmail = (content) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.ADMIN_EMAIL, // user gmail
            pass: process.env.ADMIN_PASSWORD_EMAIL, // pass gmail
        }
    });

    let mailOptions = {
        from: `Email được gửi từ home`,
        to: 'dinhtatuanlinh@gmail.com',
        subject: "CURRENT IP",
        text: 'linh',
        html: content
    };
    // Gọi phương thức sendMail -> Promise
    return transporter.sendMail(mailOptions)
}

module.exports = sendEmail