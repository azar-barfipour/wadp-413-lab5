const router = require('express').Router()
const db = require('../services/dbsqlite')

router.get('/',  (req, res) => {
    const sql = "SELECT * FROM Todos ORDER BY Title"
    db.all(sql, [], (err, rows) => {
        if(err) return console.error(err.message)

        res.render('index', { model:rows })
    })
})

router.get('/create', (req, res) => {
    res.render('create', { model: {} })
})
router.post('/create', (req, res) => {
    const sql = "INSERT INTO Todos (Title) VALUES (?)"
    const todo = [req.body.Title]

    db.run(sql, todo, (err) => {
        if(err) return console.error(err.message)

        res.redirect('/')
    })
})

module.exports = router