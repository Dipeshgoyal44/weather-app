const request = require('request')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast') 
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const PublicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(PublicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dipesh Goyal'
    })
})

app.get('/about', (req,res) => {
res.render('about',{
    title: 'About Page',
    name: 'Dipesh Goyal'
})
})

app.get('/help', (req,res) => {
res.render('help',{
    title: 'Help Page',
    name: 'Dipesh Goyal',
    helpText: 'This is some helpful text'

})})
 
app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
             error: 'You must provide a search term'
         })
     }   
     const address = req.query.address
     geocode(address, (error,{latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }
   
       forecast(latitude,longitude, (error,forecastData) => {
           if (error) {
               return console.log(error)
           } 
res.send({
    forecast: forecastData,
    location,
    address: address
          })
        }) 
    })
})

app.get('/help/*' , (req,res) => {
    res.render('404', {
        title:'404',
        name:'Dipesh Goyal',
        errorMsg:'Help Page Not Found'
    })
})


app.get('*' , (req,res) => {
    res.render('404', {
        title:'404',
        name:'Dipesh Goyal',
        errorMsg:'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server running on port' + port + '!')
})