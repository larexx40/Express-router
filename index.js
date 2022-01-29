const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bordyParser = require('body-parser')

const dishRouter = require('./routes/dishRouter')

const hostname = 'localhost'
const port = 3000

const app = express()
app.use(morgan('dev'))
app.use(bordyParser.json())

app.use('/dishes', dishRouter)

// to display static file in folder public
app.use(express.static(__dirname+ '/public'))

//if failed to display the file
app.use((req, res, next) => {
    console.log(req.headers)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end("<html><body><h1> This is an Express Server</h1></body></html>")
})

const server = http.createServer(app)
server.listen(port,hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port} `)
})