const express = require('express')

const app = express()


const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const url =('mongodb://localhost:27017/myUrlShortener')



const { UrlModel } = require('./models/urlshort')


// middleware
app.use(express.static('public'))
app.set('view engine', "ejs")
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', async function (req, res) {
    let allUrl =  await UrlModel.find(function (err, result) {
        res.render('home', {
            urlResult: result
            
        })
 console.log(allUrl)
    })

})

app.post('/create',  function (req, res) {

    let urlShort = new UrlModel({
        longUrl: req.body.longurl,
        shortUrl: generateUrl()
    })

    urlShort.save(function (err, data) {
        if (err) throw err
        console.log(data);
        res.redirect('/')
 
    })
})
app.get('/:urlId',  async function (req, res) {

   let url = await UrlModel.findOne({ shortUrl: req.params.urlId }, function (err, data) {
        if (err) throw err

        UrlModel.findByIdAndUpdate({ _id: data.id }, { $inc: { clickCount: 1 } }, function (err, updatedData) {
            if (err) throw err
            
            res.redirect(data.longUrl)
            console.log(req.params.urlId);
            return data
        })
    })

})

app.get('/delete/:id', function (req, res) {
    UrlModel.findByIdAndDelete({ _id: req.params.id }, function (err, deleteData) {
        if (err) throw (err)
        res.redirect('/')
    })
})


app.listen(3000,function(){
    console.log(`PORT IS RUNNING IN 3000 `);
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

