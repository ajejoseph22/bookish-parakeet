const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '465',
    auth: {
        type: 'OAuth2', //Authentication type,
        user: 'your_email@service.com', //For example, xyz@gmail.com
        clientId: 'Your_ClientID',
        clientSecret: 'Client_Secret',
        refreshToken: 'Refresh_Token'
    }
});


/* POST send email. */
router.post('/send', async (req, res, next) => {
    const mailOptions = {
        from: 'ajejoseph22@gmail.com',
        to: 'joseph.aje@trilogy.com',
        subject: 'This is subject',
        text: 'This is email content'
    };

    let result;

    try {
        result = await transporter.sendMail(mailOptions);
    } catch (e) {
        console.log(e);
    } finally {
        transporter.close();
    }

    res.send(result);
});

module.exports = router;
