const nodemailer = require("nodemailer");
// const { google } = require('googleapis')
// const { OAuth2Client } = require('google-auth-library');


let sendEmail = async (content, myOAuth2Client) => {
    let myAccessTokenObject = await myOAuth2Client.getAccessToken()
    // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
    let myAccessToken = myAccessTokenObject.token
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'tuanlinh.aiamcorporation@gmail.com',
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refresh_token: process.env.REFRESH_TOKEN,
          accessToken: myAccessToken
        }
      })
    // var oauth2Client = new OAuth2Client(
    //     process.env.CLIENT_ID,
    //     process.env.CLIENT_SECRET,
    //     "google.com"
    // );
    
    // oauth2Client.setCredentials({
    //     refresh_token: process.env.REFRESH_TOKEN
    // });
    
    // var accessToken = await oauth2Client.getAccessToken();
    // let transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         type: "OAuth2",
    //         user: process.env.ADMIN_EMAIL,
    //         accessToken,
    //         clientId: process.env.CLIENT_ID,
    //         clientSecret: process.env.CLIENT_SECRET,
    //         refreshToken: process.env.REFRESH_TOKEN
    //     }
    // });

    let mailOptions = {
        from: `Email được gửi từ home`,
        to: 'dinhtatuanlinh@gmail.com',
        subject: "CURRENT IP",
        text: 'linh',
        html: content
    };
    // Gọi phương thức sendMail -> Promise
    return transport.sendMail(mailOptions)
}

module.exports = sendEmail