import express from 'express'

const app = express()

app.get('/', (req, res) =>{
    res.send('12345678910')
})

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
