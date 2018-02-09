var	app = require('./api/express')();
var schedule = require('node-schedule');
var auth = require('./api/auth.js');
var cloudant = require('./api/cloudant.js');
var logconversation = require('./api/logconversation.js');
var validateRequest = require('./api/validateRequest.js');

var job = schedule.scheduleJob('00 01 00 * * ', function(){
    console.log('Rodando Job Carga Log Treinamento..');
    cloudant.insertLogTreinamento(function() {});
});

app.post('/login', auth.login);
app.post('/api/validate', validateRequest.valida);

app.get('/api/logconversation/treinamento', function(req, res) {
    cloudant.getLogTreinamento(req, res);
});

app.get('/api/logconversation/usuarios', function(req, res) {
    cloudant.getUsuarios(req, res);
});

app.get('/api/logconversation/outros', function(req, res) {
    cloudant.getOutros(req, res);
});

app.get('/api/logconversation/entities', function(req, res) {
    logconversation.getEntidades(req, res);
});

app.post('/api/logconversation/entidade', function(req, res) {
    logconversation.treinaEntidade(req, res);
});

app.get('/api/logconversation/entidade/value/:entity', function(req, res) {
    logconversation.getEntidadeValue(req, res);
});

app.post('/api/logconversation/entidade/synonyms', function(req, res) {
    logconversation.criarSinonimo(req, res);
});

app.get('/api/logconversation/intencoes', function(req, res) {
    logconversation.getIntencoes(req, res);
});
app.post('/api/logconversation/intencao', function(req, res) {
    logconversation.treinaIntencao(req, res);
});

app.post('/api/logconversation/treinamento/status',function (req, res) {
    cloudant.atualizaStatusTreinamento(req, res);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});