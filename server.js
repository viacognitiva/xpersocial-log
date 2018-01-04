var	app = require('./api/express')();

var cloudant = require('./api/cloudant.js');
var logconversation = require('./api/logconversation.js');

/*CONVERSA.JS*/
app.get('/api/logconversation/treinamento', function (req, res) {
    cloudant.getLogTreinamento(req, res);
});

/*MODAL.JS*/
app.get('/api/logconversation/entities', function (req, res) {
    logconversation.getEntidades(req, res);
});
/*MODAL.JS*/
app.get('/api/logconversation/intencoes', function (req, res) {
    logconversation.getIntencoes(req, res);
});
/*MODAL.JS*/
app.get('/api/logconversation/entidade/value/:entity', function (req, res) {
    logconversation.getEntidadeValue(req, res);
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});