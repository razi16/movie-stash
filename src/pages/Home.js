import React, { useEffect, useReducer, useState } from "react";
import MovieCard from "../components/MovieCard";
import LoadingGIF from "../components/LoadingGIF";
import axios from "axios";

function Home() {
  const [savedMovies, setSavedMovies] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("movie");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const getMovieData = (e) => {
    setSavedMovies([
      ...savedMovies,
      {
        imgLink: e.target.parentElement.childNodes[0].src,
        id: e.target.parentElement.id,
        title: e.target.parentElement.childNodes[1].innerText,
        releaseDate: e.target.parentElement.childNodes[2].innerText,
        rating: e.target.parentElement.childNodes[3].innerText,
      },
    ]);
  };

  const removeMovie = (e) => {
    let currentMovie = savedMovies.filter(
      (movie) => movie.id !== e.target.parentElement.id
    );

    setSavedMovies(currentMovie);
  };

  const topRatedInitial = {
    loading: true,
    error: true,
    movies: [],
  };

  const popularInitial = {
    loading: true,
    error: true,
    movies: [],
  };

  /* const topRatedInitial = [];

    const popularInitial = []; */

  const reducer = (state, action) => {
    switch (action.type) {
      case "success":
        return {
          loading: false,
          error: false,
          movies: action.res,
        };

      case "failed":
        return {
          loading: false,
          error: true,
          movies: [],
        };

      default:
        return state;
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=930aaeb9d52031686c1b23d592d94529&page=1"
      )
      .then((res) => {
        const response = res.data.results.slice(0, 5);
        dispatchTopRated({ type: "success", res: response });
      })
      .catch((err) => {
        dispatchTopRated([{ type: "failed" }]);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=930aaeb9d52031686c1b23d592d94529&page=1"
      )
      .then((res) => {
        const response = res.data.results.slice(0, 5);
        dispatchPopular({ type: "success", res: response });
      })
      .catch((err) => {
        dispatchPopular({ type: "failed" });
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("movie", JSON.stringify(savedMovies));
  }, [savedMovies]);

  const [topRated, dispatchTopRated] = useReducer(reducer, topRatedInitial);
  const [popular, dispatchPopular] = useReducer(reducer, popularInitial);

  return (
    <main>
      {topRated.loading ? (
        <div>
          <h1 className="title">Top 5 Rated</h1>
          <div className="movie-card-container">
            <LoadingGIF />
          </div>
        </div>
      ) : topRated.error ? (
        <div>
          <h1 className="title">Top 5 Rated</h1>
          <div className="movie-card-container">
            <p className="movie-card-container-text">Something went wrong...</p>
          </div>
        </div>
      ) : (
        <div className="movie-card-container">
          {topRated.movies.map((movie) => {
            if (savedMovies.some((savedMovie) => savedMovie.id == movie.id)) {
              return (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  imgLink={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  rating={movie.vote_average}
                  handleClick={removeMovie}
                  buttonMessage={"Remove from my list"}
                />
              );
            }
            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                imgLink={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                title={movie.title}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
                handleClick={getMovieData}
                buttonMessage={"Add to my list"}
              />
            );
          })}
        </div>
      )}

      {popular.loading ? (
        <div>
          <h1 className="title">Top 5 Popular</h1>
          <div className="movie-card-container">
            <LoadingGIF />
          </div>
        </div>
      ) : popular.error ? (
        <div>
          <h1 className="title">Top 5 Popular</h1>
          <div className="movie-card-container">
            <p className="movie-card-container-text">Something went wrong...</p>
          </div>
        </div>
      ) : (
        <div className="movie-card-container">
          {popular.movies.map((movie) => {
            if (savedMovies.some((savedMovie) => savedMovie.id == movie.id)) {
              return (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  imgLink={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  rating={movie.vote_average}
                  handleClick={removeMovie}
                  buttonMessage={"Remove from my list"}
                />
              );
            }
            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                imgLink={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                title={movie.title}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
                handleClick={getMovieData}
                buttonMessage={"Add to my list"}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Home;
