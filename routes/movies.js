var express = require('express');
var axios = require('axios');
var router = express.Router();
var apikey = 'd1e4c50a';

// Lodash utils library
const _ = require('lodash');

let movies = []
  
/* GET users listing. */
router.get('/', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({movies});
  });
  
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const movie = _.find(movies, ["id",id]);
    res.status(200).json({
        message:"Movie found!", movie
    });
});

/* PUT users listing. */
router.put('/', (req, res) => {
    const{movie} = req.body;
    const id = _.uniqueId();
    const data = axios.get(`http://www.omdbapi.com/?apikey=${apikey}&t=${movie}`);
    data.then((response)=>{ 

        movies.push( {
            movie:movie,
            id: id,
            YearOfRelease: response.data.Year,
            duration : response.data.Runtime,
            actors : response.data.Actors,
            poster: response.data.Poster,
            boxOffice: response.data.BoxOffice,
            rottenTomatoesScore: 0, //_.find(response.data.Ratings,["Source","Rotten Tomatoes"]).Value,
        } 
    ) } );
    
    
    res.status(200).json({
        message:`Movie added : ${movie}`, movies
    });
});

/* UPDATE users listing. */
router.post('/:id', (req, res) => {
    const{id} = req.params;
    const{movie} = req.body;
    const movieToUp = _.find(movies, ["id",id]);

    const data = axios.get(`http://www.omdbapi.com/?apikey=${apikey}&t=${movie}`);
    data.then((response)=>{ 
 
        movieToUp.movie = movie,
        movieToUp.YearOfRelease = response.data.Year;
        movieToUp.duration = response.data.Runtime;
        movieToUp.actors = response.data.Actors;
        movieToUp.poster = response.data.Poster;
        movieToUp.boxOffice = response.data.BoxOffice;
        movieToUp.rottenTomatoesScore = _.find(response.data.Ratings,["Source","Rotten Tomatoes"]).Value;
        
     } );
    
    res.status(200).json({
        message:`Movie udated : ${id},${movie}`, movie
    });
});

/* DELETE users listing. */
router.delete('/:id', (req, res) => {
    const{id} = req.params;
     _.remove(movies, ["id",id]); 
    res.status(200).json({
        message:`Movie removed : ${id}`
    });
});

module.exports = router;