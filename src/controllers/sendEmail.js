import { createTransport } from "nodemailer";

export const sendEmail = (data) => {
  var transporter = createTransport({
    host: "smtp.office365.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: "jose.zacariass@alumno.buap.mx",
      pass: "Zacarias2004@@##",
    },
  });

  // setup e-mail data, even with unicode symbols
  var mailOptions = {
    from: '"Picaboo Verificación " <jose.zacariass@alumno.buap.mx>', // sender address (who sends)
    to: data.email, // list of receivers (who receives)
    subject: "¡Gracias por registrarte, "+data.name+"!", // Subject line
    text: "¡Gracias por registrarte!, solo ingresa al link para confirmar tu cuenta", // plaintext body
    html: "<p>¡Gracias por registrarte!, solo ingresa al link para confirmar tu cuenta</p><a href='http://192.168.100.228:3000/api/verify/"+data.code+"?vrk=6f4f4238-0229-4159-aa4b-204feaedcbe0'>http://192.168.100.228:3000/api/verify/"+data.code+"?vrk=6f4f4238-0229-4159-aa4b-204feaedcbe0</a>", // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: " + info.response);
  });
};
