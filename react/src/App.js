/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, {Component } from 'react';
import axios from 'axios';


const styles = {
  main: {
    backgroundColor: 'rgba(255,255,255,.1)',
    flex: 'auto',
    display: 'flex',
    flexDirection: 'row',
     '& ul': {
      'margin': 3,
      'padding': 0,
    },
  },
  movie: {
  marginLeft: 'auto',
  marginRight: 'auto',
 // backgroundColor: '#66728E',
  ':hover': {
    backgroundColor: 'rgba(255,255,255,.1)',
  },
},
}

class ListeFilm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      film : [],
      films : [],
    }
  }

  async componentDidMount() {
    console.log("Try fetch")
      axios.get('http://localhost:3001/movies')
      .then(response =>
       response.data.movies.map(movie => ({
          movie: `${movie.movie}`,
          id: `${movie.id}`,
          YearOfRelease: `${movie.YearOfRelease}`,
          duration: `${movie.duration}`,
          actors: `${movie.actors}`,
          poster: `${movie.poster}`,
          boxOffice: `${movie.boxOffice}`,
          rottenTomatoesScore: `${movie.rottenTomatoesScore}`,
        }))
    )
    .then(films => {
      this.setState({
        films
      });
    })
  }

  render() {
      return(
        <body>
          <div class="container" css={styles.main}>
          
                {this.state.films.map( (movies) => (
                   <Film film = {movies} />
                  ))}
          </div>
        </body>
      );
  }
}


export default ListeFilm;


class Film extends React.Component{
  render() {
      return(
        <ul css={styles.movie}>
          <h2>  {this.props.film.movie}: </h2> 
          <h3>  {this.props.film.YearOfRelease} </h3>
          <img src={`${this.props.film.poster}`}/>   
          <h3>  {this.props.film.actors} </h3>
          <h3>  {this.props.film.duration} </h3>
          <h3>  {this.props.film.boxOffice} </h3>
          <h3>  {this.props.film.rottenTomatoesScore} </h3>
        </ul>

      );
  }
}

