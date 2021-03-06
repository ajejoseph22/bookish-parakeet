const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Imap = require("imap"),
  inspect = require("util").inspect;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: "true",
  port: "465",
  auth: {
    type: "OAuth2", //Authentication type,
    user: process.env.FROM_EMAIL, //For example, xyz@gmail.com
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

const imap = new Imap({
  user: "ajejoseph22@gmail.com",
  password: process.env.PASSWORD,
  host: "imap.gmail.com",
  port: 993,
  tls: true,
  tlsOptions: {
    servername: "imap.gmail.com", // See https://github.com/nodejs/node/issues/28167
  },
});

const openInbox = (cb) => {
  imap.openBox("INBOX", true, cb);
};

const connectImap = () => {
  imap.once("ready", function () {
    openInbox(function (err, box) {
      if (err) throw err;
      const f = imap.seq.fetch("1:3", {
        bodies: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
        struct: true,
      });
      f.on("message", function (msg, seqno) {
        console.log("Message #%d", seqno);
        const prefix = "(#" + seqno + ") ";
        msg.on("body", function (stream, info) {
          let buffer = "";
          stream.on("data", function (chunk) {
            buffer += chunk.toString("utf8");
          });
          stream.once("end", function () {
            console.log(
              prefix + "Parsed header: %s",
              inspect(imap.parseHeader(buffer))
            );
          });
        });
        msg.once("attributes", function (attrs) {
          console.log(prefix + "Attributes: %s", inspect(attrs, false, 8));
        });
        msg.once("end", function () {
          console.log(prefix + "Finished");
        });
      });
      f.once("error", function (err) {
        console.log("Fetch error: " + err);
      });
      f.once("end", function () {
        console.log("Done fetching all messages!");
        imap.end();
      });
    });
  });

  imap.once("error", function (err) {
    console.log(err);
  });

  imap.once("end", function () {
    console.log("Connection ended");
  });

  imap.connect();
};

/* POST send email. */
router.post("/send", async (req, res, next) => {
  const { receiver: to, subject, content: text } = req.body;

  const mailOptions = {
    to,
    subject,
    text,
    from: "ajejoseph22@gmail.com",
  };

  let result;

  try {
    result = await transporter.sendMail(mailOptions);
  } catch ({ message }) {
    res.status(400).send(message);
  } finally {
    transporter.close();
  }

  res.send(result);
});

// todo: this route not working yet. refine and debug further
/* POST GET emails. */
router.get("/list", async (req, res, next) => {
  try {
    connectImap();
  } catch ({ message }) {
    console.log(message);
  }
});

module.exports = router;
