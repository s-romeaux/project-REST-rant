const router = require('express').Router();
const db = require('../models');

// View Home Page
router.get('/', (req, res) => {
    db.Place.find()
        .then((places) => {
            res.render('places/index', { places });
        })
        .catch(err => {
            console.error('Error finding places:', err);
            res.render('error404');
        });
});

// View New Page
router.get('/new', (req, res) => {
    res.render('places/new');
});

// Add New Place
router.post('/', (req, res) => {
    const { pic, city, state } = req.body;
    req.body.pic = pic || undefined;
    req.body.city = city || undefined;
    req.body.state = state || undefined;

    db.Place.create(req.body)
        .then(() => {
            res.redirect('/places');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                let message = '🚫The field ';
                for (const field in err.errors) {
                    message += `${field} was entered as ${err.errors[field].value}. ${err.errors[field].message}`;
                }
                res.render('places/new', { message, place: req.body });
            } else {
                console.error('Error creating new place:', err);
                res.render('error404');
            }
        });
});

// View Places
router.get('/:id', (req, res) => {
    db.Place.findById(req.params.id)
        .populate('comments')
        .then(place => {
            console.log(place.comments);
            res.render('places/show', { place });
        })
        .catch(err => {
            console.error('Error finding place:', err);
            res.render('error404');
        });
});

// Delete Place
router.delete('/:id', (req, res) => {
    const placeId = req.params.id;
    console.log('ID received:', placeId);
    db.Place.findByIdAndDelete(placeId)
        .then(() => {
            res.redirect('/places');
        })
        .catch(err => {
            console.error('Error deleting place:', err);
            res.render('error404');
        });
});

// View Edit Page
router.get('/:id/edit', (req, res) => {
    db.Place.findById(req.params.id)
        .then(place => {
            res.render('places/edit', { place });
        })
        .catch(err => {
            console.error('Error finding place for edit:', err);
            res.render('error404');
        });
});

// Edit Place
router.put('/:id', (req, res) => {
    const placeId = req.params.id;
    db.Place.findByIdAndUpdate(placeId, req.body)
        .then(() => {
            res.redirect(`/places/${placeId}`);
        })
        .catch(err => {
            console.error('Error updating place:', err);
            res.render('error404');
        });
});

router.post('/:id/comment', (req, res) => {
    console.log('post comment', req.body)
    if (req.body.author === '') { req.body.author = undefined }
    req.body.rant = req.body.rant ? true : false
    db.Place.findById(req.params.id)
        .then(place => {
            db.Comment.create(req.body)
                .then(comment => {
                    place.comments.push(comment.id)
                    place.save()
                        .then(() => {
                            res.redirect(`/places/${req.params.id}`)
                        })
                        .catch(err => {
                            res.render('error404')
                        })
                })
                .catch(err => {
                    res.render('error404')
                })
        })
        .catch(err => {
            res.render('error404')
        })
})

router.delete('/:id/comment/:commentId', (req, res) => {
    db.Comment.findByIdAndDelete(req.params.commentId)
        .then(() => {
            console.log('Success')
            res.redirect(`/places/${req.params.id}`)
        })
        .catch(err => {
            console.log('err', err)
            res.render('error404')
        })
})

module.exports = router;
