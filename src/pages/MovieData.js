import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function MovieData() {

  const {id} = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=930aaeb9d52031686c1b23d592d94529&language=en-US`)
    .then((res) => {
      console.log(res)
      setMovieDetails(res.data)
      setGenres(res.data.genres)
    })
  }, [])

  return (
    <div className='movie-card-detail'>
      <img src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`} width='400px' height='450px' />
      <h1>{movieDetails.title}</h1>
      <p>Genre: {genres.map(genre => genre.name).join(', ')}</p> 
      <p>Release date: {movieDetails.release_date}</p>
      <p>Rating: {movieDetails.vote_average}</p>
      <p>Overview: {movieDetails.overview}</p>
    </div>
  )
}

export default MovieData