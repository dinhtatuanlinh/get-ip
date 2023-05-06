const nodemailer = require("nodemailer");
const { google } = require('googleapis')
const { OAuth2Client } = require('google-auth-library');


let sendEmail = (content) => {
    var oauth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );
    
    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });
    
    var accessToken = oauth2Client.getAccessToken();
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.ADMIN_EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
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