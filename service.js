const express = require('express');
let MongoClient = require('mongodb').MongoClient;
// let url = "mongodb://localhost:27017/IMTS";
let url = 'mongodb+srv://admin:26031998boxe@@cluster0-b3pli.mongodb.net/IMTS'
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
    // app.use(bodyParser());
app.use(bodyParser.json());
app.use(cors());


// =========================---MÉTODOS DE CONSULTA---=================================
app.get('/', (req, res) => {
    res.send('<h1>API em funcionamento!</h1>');
    let cursor = db.collection('apoio').find().sort({ "cordinates": 1 })
    console.log("TESTE DE FUNCIONAMENTO EXECUTADO COM SUCESSO!")
});

app.get('/ChoicePlace', function(req, res) {
    db.collection('apoio').find().sort({ 'cordinates': 1 }).toArray(function(erro, dados) {
        if (erro) {
            res.status(500).send('Aconteceu um ERRO!!!!');
            return;
        }
        res.status(200).send(dados);
    });
});

// TAKE PLACE - TRUE
app.post('/TakePlace/true', function(req, res) {
    console.log(req.body)
    let newvalues = { $set: { occupation: true } };
    db.collection('apoio').updateOne(req.body, newvalues, function(erro, response) {
        if (erro) {
            res.send('Aconteceu um ERRO!!!!');
            return;
        } else {
            res.status(200).send("DOCUMENTO ATUALIZADO")
            console.log(`1 document updated`);
        }

    });
})

// TAKE PLACE - FALSE
app.post('/TakePlace/false', function(req, res) {
    console.log(req.body)
    let newvalues = { $set: { occupation: false } };
    db.collection('apoio').updateOne(req.body, newvalues, function(erro, response) {
        if (erro) {
            res.send('Aconteceu um ERRO!!!!');
            return;
        } else {
            res.status(200).send("1 document updated")
            console.log("1 document updated");
        }

    });
})


// TAKE PLACE - FALSE ALL
app.post('/TakePlace/protocoloFinalDeCulto', function(req, res) {
    console.log(req.body)
    let oldValues = { occupation: true }
    let newvalues = { $set: { occupation: false } };
    // db.foo.updateMany({}, {$set: {lastLookedAt: Date.now() / 1000}})
    db.collection('apoio').updateMany(oldValues, newvalues, function(erro, response) {
        if (erro) {
            res.send('Aconteceu um ERRO!!!!');
            return;
        } else {
            res.status(200).send("BASE ATUALIZADA COM SUCESSO!")
            console.log("1 document updated");
        }
    });
})

//   
// ===================================================--- FIM DOS MÉTODOS ---===============================



MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.log(err)
    db = client.db('IMTS')

    app.listen(`${port}`, () => {
        console.log(`=================================================`)
        console.log(`Servidor funcionando na porta ${port}!`)
        console.log(`PRESSIONE 'CTRL + C' PARA SAIR`)
        console.log(`=================================================`)
    })
})