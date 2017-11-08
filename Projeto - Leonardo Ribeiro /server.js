const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, '/dist')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname,'/dist/index.html')))

app.listen(process.env.PORT || '3000', () => console.log('Example app listening on port 3000!'))
