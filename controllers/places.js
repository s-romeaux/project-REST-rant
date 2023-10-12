const router = require('express').Router()
module.exports = router

router.get('/', (req, res) => {
    res.send('GET /places')
})