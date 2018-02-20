var jwt = require('jsonwebtoken');

var validateRequest = {

    valida : function(req, res ) {

        var token = (req.body && req.body.token) || (req.query && req.query.access_token) || req.headers['x-access-token'] ;

        if(token){

            try {
                var decoded = jwt.verify(token, require('./secret.js')());

                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    "status": 200,
                    "message": "validate"
                });

            } catch(err) {

                res.statusCode=401;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                  "status": 401,
                  "message": "Token Expired"
                });

            }

        } else if (req.session.usuario) {

            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                "status": 200,
                "message": "validate"
            });

            return;

        } else {

            res.statusCode=401;
            res.json({
                "status": 401,
                "message": "Invalid Token or Key"
            });
        }

    }

}

module.exports = validateRequest;