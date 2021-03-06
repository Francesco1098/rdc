const db = require("../services/database")
const express = require('express')
const passport = require('passport') // isAuthenticated()
const bodyparser = require('body-parser')
var router = express.Router();
require('dotenv').config()

const PORT = process.env.PORT;

router.get('/', (req, res) => {
    var auth = req.isAuthenticated();

    if( auth ){
        var umail = req.user.emails[0].value;
        db.getNomeCampiFromUtente(umail).then((campi) => {
            res.render('home.ejs', {
                campi: campi,
                port: PORT,
                auth: req.isAuthenticated()
            });
        }).catch((err) => {
            if(TEST) console.log(err);
        });
    }
    else{
        res.render('home.ejs', {
            auth: req.isAuthenticated()
        });
    }
});

router.get('/deleteUtente', (req, res) => {
    db.deleteUtente(req.user.emails[0].value).then(() => {
        res.redirect("/logout");
    });
});

module.exports = router;