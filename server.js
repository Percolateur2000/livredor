const express = require('express')
const pool = require('./db')
const port = 3000

const app = express()
app.use(express.json())

//routes
app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM comments')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/', async (req, res) => {
    const { name, comment } = req.body
    try {
        await pool.query('INSERT INTO comments (name, comment) VALUES ($1, $2)', [name, comment])
        res.status(200).send({ message: "message crée" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.get('/dev/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE comments( id SERIAL PRIMARY KEY, name VARCHAR(30), comment VARCHAR(200))')
        res.status(200).send({ message: "Successfully created table" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})


app.listen(port, () => console.log(`Server has started on port: ${port}`))