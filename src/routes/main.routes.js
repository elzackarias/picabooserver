import { Router } from "express";
import { login, VerifyPass } from "../helpers/auth";
import { sendEmail } from "../controllers/sendEmail";
//Controllers
import { register, login as LogIn, verify } from "../controllers/auth.controller";

const router = Router();

router.get("/", function(req, res) {
    /* const newUser = new Users({
      name:'Emmanuel Venancio',
      email:'venancio@ivana.com',
      password:'ivanaverania'
   })
   newUser.save();
   

   const user = {
      email:"correoc@orreo.com",
      password:"fdfsffdsdfsdfsds"
   }
   const resp = login(user)
   res.json(resp)
*/
    res.json({
        status: "Error",
        msg: "Ocurrió un error al generar la solicitud",
    });
});

router.post('/register', register);

router.post("/login", LogIn);

/*router.post("/login", async function (req, res, next) {
  const data = login(req.body);
  if (data.status == "Ok") {
    const query = await Users.find({ email: req.body.email });
    //console.log(req.body.email)
    if (query.length != 0) {
      const settings = {
        pass: req.body.password,
        db: query[0].password,
      };
      if (await VerifyPass(settings)) {
        res.json({
          id: query[0]._id,
          email: query[0].email,
          name: query[0].name,
        });
      } else {
        res.status(400).json({ status: "Error", msg:"Contraseña incorrecta" });
      }
    } else {
      res.status(400).json({ status: "Error", msg: "Email incorrecto" });
    }
  } else {
    res.json(data);
  }
});*/

router.post('/verify', verify)

router.get('/email', function(req, res) {
    sendEmail({ email: "gpwjose65@gmail.com", code: 93823 })
    res.send('ok')
})

/*router.post("/register", async function (req, res, next) {
  if (req.body.email === "undefined" || req.body.password === "undefined") {
    res.json({
      status: "Error",
      msg: "Bad Request",
    });
  } else {
    //Hashea la contraseña
    try {
      const hash = await argon2.hash(req.body.password);

      //Comprobamos si existe el correo en la base de datos
      mysqlConnection.query(
        "SELECT id FROM usuarios WHERE email = ?",
        [req.body.email],
        async (err, rows, fields) => {
          if (!err) {
            if (rows.length == 0) {
              //Si no existe se registra
              var sql =
                "INSERT INTO usuarios (name, email, password) VALUES ('" +
                req.body.name +
                "','" +
                req.body.email +
                "','" +
                hash +
                "')";
              mysqlConnection.query(sql, function (err, result) {
                if (!err) {
                  res.json({
                    status: "Ok",
                    msg: "Usuario registrado",
                  });
                } else {
                  res.json({
                    status: "Error",
                    msg: "Error en el servidor",
                  });
                }
              });
            } else {
              //Si se encuentra que el correo existe
              res.json({
                status: "Error",
                msg: "El correo electrónico ingresado ya está registrado",
              });
            }
          } else {
            res.json({
              status: "Error",
              msg: "Ocurrió lo siguiente: " + err,
            });
          }
        }
      );
    } catch (err) {
      res.json({
        status: "Error",
        msg: "Hubo un error en el hasheo",
      });
    }
  }
});
*/

router.get('/about', function(req, res) {
    res.send('Acercaaaa')
});

router.get("/info", function(req, res) {
    res.send(
        '<h1>Bienvenido al servidor de Kmino</h1><br/><span>Este proyecto no seria posible sin la ayuda de proyectos como:</span><br><ul><li>Google Maps API</li><li>Socket.io</li></ul><h4>Por: Jose Zacarias & el poder de NodeJS y PHP</h4><a href="/">Inicio</a>'
    );
});

export default router;