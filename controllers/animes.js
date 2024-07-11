

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('animes/index.ejs', {
            animes: currentUser.list,
        });
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

router.get('/new', async (req, res) => {
    res.render('animes/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.list.push(req.body);

        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/animes`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});


router.get('/:animeId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        const anime = currentUser.list.id(req.params.animeId);

        res.render('animes/show.ejs', {
            anime: anime,
        });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:animeId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const anime = currentUser.list.id(req.params.animeId);
        res.render('animes/edit.ejs', {
            anime: anime,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});


router.delete('/:animeId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.list.id(req.params.animeId). deleteOne();//remove(); //deleteOne(); maybe try on 

        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/animes`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.put('/:animeId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const anime = currentUser.list.id(req.params.animeId);

        anime.set(req.body);

        await currentUser.save();
        
        res.redirect(
            `/users/${currentUser._id}/animes/${req.params.animeId}`
        );
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

module.exports = router;