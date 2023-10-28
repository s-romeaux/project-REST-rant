const db = require('../models')

// In order to use await we need an async function
async function seed() {
    // Get the place, H-Thai-ML
    let place = await db.Place.findOne({ name: 'H-Thai-ML' })

    // Create a fake, sample comment
    let comment0 = await db.Comment.create({
        author: 'Famished Fran',
        rant: false,
        stars: 5.0,
        content: 'Wow, simply amazing food here. I highly recommend this to anyone visiting the area!'
    });
    let comment1 = await db.Comment.create({
        author: 'Zoe',
        rant: false,
        stars: 5.0,
        content: 'Wow, simply great food here.'
    });
    let comment2 = await db.Comment.create({
        author: 'Grover',
        rant: true,
        stars: 2.5,
        content: 'Maybe search elsewhere, these are not the noodles you\'re looking for.'
    })

    // Add that comment to the place's comment array
    place.comments.push(comment.id)

    await place.save()
    
    // Exit the program
    process.exit()
}

seed()