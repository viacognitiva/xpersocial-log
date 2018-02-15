var jwt = require('jwt-simple');

var validateRequest = {

    valida : function(req, res ) {

        var token = (req.body && req.body.token) || (req.query && req.query.access_token) || req.headers['x-access-token'] ;

        if(token){

            try {

                var decoded = jwt.decode(token, require('./secret.js')());
                //console.log("decoded.exp" + decoded.exp + ", Date.now() " + Date.now());

                if (decoded.exp <= Date.now()) {

                    res.statusCode=401;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        "status": 401,
                        "message": "Token Expired"
                    });
                } else {
                    res.statusCode=200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        "status": 200,
                        "message": "validate"
                    });
                }

                return;

            } catch (err) {

                res.statusCode=500;
                res.json({
                    "status": 500,
                    "message": "Invalid Token or Key"
                });

                console.log(err);
            }

        } else if (req.session.usuario) {

            res.statusCode=401;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                "status": 401,
                "message": "Token Expired"
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