const express = require('express')
const app = express()
const path = require('path')

app.set('views', path.join(__dirname, '/build/'))
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/build', express.static(__dirname + '/build/'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/', (req, res) => res.render('index.html'))

app.listen(8080, () => console.log('Example app listening on port 3000!'))