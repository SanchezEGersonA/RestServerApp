const jwt = require('jsonwebtoken');

/*****************************************************
 * VERIFICAR TOKEN
 *****************************************************/
let verificarToken = (req, res, next) => {

    let token = req.get('token'); //Authorization

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido!!!'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

};

/*****************************************************
 * VERIFICAR ADMIN_ROLE
 *****************************************************/
let verificarAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

};

/*****************************************************
 * VERIFICAR TOKEN PARA IAMGEN
 *****************************************************/
verificarTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido!!!'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

}

module.exports = {
    verificarToken,
    verificarAdmin_Role,
    verificarTokenImg
};