const express = require('express')

const app = express()

const PORT = process.env.PORT || 3001
const bodyParser = require('body-parser')

const mongoose = require('mongoose')



mongoose.connect("mongodb://localhost:27017/myUrlShortener");

const { UrlModel } = require('./models/urlshort')

// middleware
app.use(express.static('public'))
app.set('view engine', "ejs")
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', function (req, res) {
    let allUrl = UrlModel.find(function (err, result) {
        res.render('home', {
            urlResult: result
        })

    })

})

app.post('/create', function (req, res) {

    let urlshort = new UrlModel({
        longUrl: req.body.longurl,
        shortUrl: generateUrl()
    })

    urlshort.save(function (err, data) {
        if (err) throw err
        console.log(data);
        res.redirect('/')

    })
})
app.get('/:urlId', function (req, res) {

    UrlModel.findOne({ shortUrl: req.params.urlId }, function (err, data) {
        if (err) throw err

        UrlModel.findByIdAndUpdate({ _id: data.id }, { $inc: { clickCount: 1 } }, function (err, updateddata) {
            if (err) throw err
            res.redirect(data.longUrl)
            console.log(req.params.urlId);
        })
    })

})

app.get('/delete/:id', function (req, res) {
    UrlModel.findByIdAndDelete({ _id: req.params.id }, function (err, deletedata) {
        if (err) throw (err)
    })
})


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON THE PORT ${PORT}`);
})

function generateUrl() {

    var rndResult = "";
    var character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var charactersLength = character.length;

    for (let i = 0; i < 5; i++) {
        rndResult = rndResult + character.charAt(Math.floor(Math.random() * charactersLength));
    }
    
return rndResult
}

