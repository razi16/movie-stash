import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../components/MovieCard";

function MyStash() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [savedMovies, setSavedMovies] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("movie");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const nextButton = useRef(null);
  const prevButton = useRef(null);

  const removeMovie = (e) => {
    let currentMovie = savedMovies.filter(
      (movie) => movie.id !== e.target.parentElement.id
    );

    setSavedMovies(currentMovie);
  };

  const prevPage = () => {
    setPage((prevState) => prevState - 1);
  };

  const nextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    localStorage.setItem("movie", JSON.stringify(savedMovies));
  }, [savedMovies]);

  useEffect(() => {
    const offset = 20 * (page - 1);
    setTotalPages(Math.ceil(savedMovies.length / 20));
    setPaginatedItems(savedMovies.slice(offset, 20 * page));
  }, [page]);

  useEffect(() => {
    if (page === 1) {
      prevButton.current.style.visibility = "hidden";
    } else {
      prevButton.current.style.visibility = "visible";
    }
    if (page == totalPages) {
      nextButton.current.style.visibility = "hidden";
    } else {
      nextButton.current.style.visibility = "visible";
    }
  }, [page, totalPages]);

  return (
    <div className="movie-card-container">
      {paginatedItems.map((paginatedItem) => (
        <MovieCard
          key={paginatedItem.id}
          id={paginatedItem.id}
          imgLink={`https://image.tmdb.org/t/p/original${paginatedItem.imgLink}`}
          title={paginatedItem.title}
          releaseDate={paginatedItem.releaseDate}
          rating={paginatedItem.rating}
          handleClick={removeMovie}
          buttonMessage={"Remove from my list"}
        />
      ))}
      <div className="container-bottom">
        <button className="previous-button" onClick={prevPage} ref={prevButton}>
          Previous
        </button>
        <p className="pagination">
          Page {page} of {totalPages}
        </p>
        <button className="next-button" onClick={nextPage} ref={nextButton}>
          Next
        </button>
      </div>
    </div>
  );
}

export default MyStash;
