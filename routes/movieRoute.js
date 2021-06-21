const express = require('express')
const router = require("express").Router();
const axios = require("axios").default;

const isLoggedIn = (req, res, next) => {
  if(req.session.user) {
    //Calls whatever is to be executed after the isLoggedIn function is over
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized user",
      code: 401
    });
  }
};

router.get('/home', isLoggedIn, (req, res) => {

  let user = req.session.user._id;

  UserModel.findOne(user)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(500).json({
        error: "something went wrong",
        message: err,
      });
    });
});

router.get('/main', (req, res) => {
  
  let key = process.env.API_KEY;

  axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
      )
      .then((popularMovies) => {
        // let result = req.session.user;
        let searchResult = popularMovies.data.results;
        res.status(200).json(searchResult)
      })
      .catch((err) => {
        next(err);
      });

})

module.exports = router;