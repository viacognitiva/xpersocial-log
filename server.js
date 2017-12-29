var	app = require('./config/express')();

var cloudant = require('./config/cloudant.js');

app.get('/api/logconversation/treinamento', function (req, res) {
    cloudant.getLogTreinamento(req, res);
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});