import { pool } from "../db/db";
import { valid_data } from "../helpers/auth";
import * as argon2 from "argon2";
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from "./sendEmail"

export const register = async (req, res) => {
    const { name, surename, email, password, phone, school, birth, sex } = req.body;
    if (valid_data({ email, password }) == false) {
        return res.json({
            status: "Error",
            msg: "Revisa el email, solo se aceptan correos BUAP",
        });
    }
    try {
        //Comprobamos si el correo existe
        const [comp] = await pool.query("SELECT email FROM users WHERE email = ?", [
            email,
        ]);
        if (comp.length != 0) {
            res.json({
                status: "Error",
                msg: "Email registrado",
            });
        } else {
            //Password Hashed
            const hash = await argon2.hash(password);
            const code = uuidv4();
            const [signup] = await pool.query(
                "INSERT INTO users (name,surename,email,password,school_id,birth,sex,code) VALUES (?,?,?,?,?,?,?,?)",
                [name, surename, email, hash, school, birth, sex, code]
            );

            if (signup.affectedRows == 1) {
                sendEmail({ email: email, code: code, name: name })
                return res.status(201).json({
                    status: "OK",
                    uid: signup.insertId,
                    msg: "Perfil creado",
                });
            } else {
                return res.json({
                    status: "Error",
                    msg: "Error interno",
                });
            }
        }
    } catch (error) {
        return res.json({
            status: "Error",
            msg: error,
        });
    }
};

export const verify = async (req, res) => {
    const { code } = req.body;
    try {
        //Comprobamos si el correo existe
        const [comp] = await pool.query("SELECT id,name,surename,email,school_id,verified FROM users WHERE code = ?", [
            code
        ]);

        if (comp.length == 0) {
            throw "El código no existe"
        } else {
            if (comp[0].verified == 0) {
                try {
                    const [q] = await pool.query("UPDATE users SET verified = ? WHERE code = ?", [
                        1, code
                    ]);

                    if (q.affectedRows == 1) {
                        //SE SETEAN LOS VALORES PARA GENERAR EL JWT TOKEN
                        res.json({
                            status: "Exito",
                            msg: "Verficado correctamente",
                            data: {
                                uid: comp[0].id,
                                firstname: comp[0].name,
                                surename: comp[0].surename,
                                email: comp[0].email,
                                school_id: comp[0].school_id,
                            }
                        })
                    } else {
                        throw 'Error en la db';
                    }

                } catch (e) {
                    res.json({
                        status: "Error",
                        msg: e
                    })
                }
            } else {
                throw "Codigo expirado";
            }
        }
    } catch (e) {
        res.json({
            status: "Error",
            msg: e
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const [q] = await pool.query("SELECT id,name,surename,email,password,school_id,verified FROM users WHERE email = ?", [
            email
        ]);

        if (q.length == 0) {
            throw "Email no existe"
        } else {
            if (q[0].verified == 1) {
                if (await argon2.verify(q[0].password, password)) {
                    res.json({
                        status: 'OK',
                        msg: 'Exitoooo',
                        data: {
                            email: q[0].email,
                            uid: q[0].id,
                            firstname: q[0].name,
                            surename: q[0].surename,
                            school_id: q[0].school_id,
                        }
                    })
                } else {
                    throw "Contraseña incorrecta"
                }
            } else {
                throw "Verifique su cuenta primero"
            }
        }

    } catch (e) {
        res.json({
            status: 'Error',
            msg: e
        })
    }
}