const router = require('express').Router()
const places = require('../models/places.js')
const db = require('../models')

//View Home Page
router.get('/', (req, res) => {
    db.Place.find()
    .then((places) => {
        res.render('places/index', { places })
    })
    .catch(err => {
        console.log(err) 
        res.render('error404')
    })
})


//View New Page
router.get('/new', (req, res) => {
    res.render('places/new')
})

//Add New Place
router.post('/', (req, res) => {
    if (req.body.pic === '') { req.body.pic = undefined }
    if (req.body.city === '') { req.body.city = undefined }
    if (req.body.state === '') { req.body.state = undefined }

    db.Place.create(req.body)
        .then(() => {
            res.redirect('/places')
        })
        .catch(err => {
            if (err && err.name == 'ValidationError') {
                let message = '🚫The field '
                for (var field in err.errors) {
                    message += `${field} was entered as ${err.errors[field].value}.
                    ${err.errors[field].message}`
                }
                res.render('places/new', { message, place: req.body })
            } else {
                res.render('error404')
            }
        })
})


//View Places
router.get('/:id', (req, res) => {
    db.Place.findById(req.params.id)
    .then(place => {
        res.render('places/show', { place })
    })
    .catch(err => {
        console.log('err', err)
        res.render('error404')
    })
})


// Delete Place
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log('ID received:', id);
    db.Place.findByIdAndDelete(id)
    .then(place => {
        res.redirect('/places');
    })
    .catch(err => {
        console.log('err', err);
        res.render('error404');
    });
});


//View Edit Page
router.get('/:id/edit', (req, res) => {
    db.Place.findById(req.params.id)
        .then(place => {
            res.render('places/edit', { place })
        })
        .catch(err => {
            res.render('error404')
        })
})

//Edit Place
router.put('/:id', (req, res) => {
    let id = req.params.id;
    db.Place.findByIdAndUpdate(id, req.body)
        .then(() => {
            res.redirect(`/places/${id}`);
        })
        .catch(err => {
            console.log('err', err);
            res.render('error404');
        });
});


module.exports = router
