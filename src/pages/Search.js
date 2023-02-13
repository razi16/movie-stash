import React, {useEffect, useState, useRef} from 'react'
import MovieCard from '../components/MovieCard';
import LoadingGIF from '../components/LoadingGIF';
import axios from 'axios';

function Search() {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true)
  const [totalPage, setTotalPage] = useState(0)
  const [displayMovies, setDisplayMovies] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState(value);
  const [savedMovies, setSavedMovies] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('movie');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const prevButton = useRef(null);
  const nextButton = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(page == totalPage || totalPage === 1){
      nextButton.current.style.visibility = 'hidden';
    }
    setPage(1);
    setDisplayMovies(true);
    setSubmittedValue(value);
    
  }

  const getMovieData = (e) => {
    setSavedMovies([...savedMovies,{
      imgLink: e.target.parentElement.childNodes[0].src,
      id: e.target.parentElement.id,
      title: e.target.parentElement.childNodes[1].innerText,
      releaseDate: e.target.parentElement.childNodes[2].innerText,
      rating: e.target.parentElement.childNodes[3].innerText 
    }])
    console.log(savedMovies);
  }

  const removeMovie = (e) => {
    let currentMovie = savedMovies.filter((movie) => movie.id !== e.target.parentElement.id);
    console.log(currentMovie);
    setSavedMovies(currentMovie);
  }

  const nextPage = () => {
    setPage((prevState) => 
    prevState + 1)
  }

  const prevPage = () => {
    setPage((prevState) => 
    prevState - 1)
  }

  useEffect( () => {
    if(displayMovies !== false){
      setError(false);
      setLoading(true);
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=930aaeb9d52031686c1b23d592d94529&query=${value}&page=${page}`)
    .then((res) => {

      setTotalPage(res.data.total_pages)
      console.log(res.data)
      setLoading(false)
      
      
      console.log(totalPage)
      console.log(page)
      setMovies(res.data.results)
      
      
      /* if(totalPage === page){
        nextButton.current.style.visibility = 'hidden';
        }
      else{
        nextButton.current.style.visibility = 'visible';
        }
      if(page === 1){
        prevButton.current.style.visibility = 'hidden';
      }
      else{
        prevButton.current.style.visibility = 'visible';
      } */
    })
    .catch((error) =>{
      setLoading(false)
      setError(true);
      console.log(error)
    })
    
      
    
    }

  }, [submittedValue, page, /* totalPage */])

  useEffect(() => {
    if(displayMovies === true){
      if(loading === true){
      prevButton.current.style.visibility = 'hidden';
      nextButton.current.style.visibility = 'hidden';
    }
    else{
      if(totalPage === page || movies.length === 0){
        nextButton.current.style.visibility = 'hidden';
        }
      else{
        nextButton.current.style.visibility = 'visible';
        }
      if(page === 1){
        prevButton.current.style.visibility = 'hidden';
      }
      else{
        prevButton.current.style.visibility = 'visible';
      }
    }
    }
    
  }, [loading])

  useEffect(() => {
    console.log(savedMovies)
    localStorage.setItem('movie', JSON.stringify(savedMovies))
  }, [savedMovies])



  
  if (displayMovies === false){
    return (
      <div>
        <h1 className='title'>Search</h1>
        <form onSubmit={handleSubmit}>
        <input className='search-input' placeholder='Search your movie here...' type='text' onChange={(e) => setValue(e.target.value)}/>
        <button className='search-button' type='submit'>Search</button>
        </form>
    
      </div>
      )
  }
  else{
    if(loading === true){
      return <div>
      <h1 className='title'>Search</h1>
      <form onSubmit={handleSubmit}>
      <input className='search-input' type='text' onChange={(e) => setValue(e.target.value)}/>
      <button className='search-button' type='submit'>Search</button>
      </form>
      <div className='movie-card-container'>  
     <LoadingGIF/>  
     <div className='container-bottom'>
      <button visibility='hidden' className='previous-button' onClick={prevPage} ref={prevButton}>Previous</button>
      <button visibility='hidden' className='next-button' onClick={nextPage} ref={nextButton}>Next</button>   
     </div>
     
      </div>
    </div>
    }

    if(error === true){
      return <div>
      <h1 className='title'>Search</h1>
      <form onSubmit={handleSubmit}>
      <input className='search-input' type='text' onChange={(e) => setValue(e.target.value)}/>
      <button className='search-button' type='submit'>Search</button>
      </form>
      <div className='movie-card-container'>  
     <p className='movie-card-container-text'>Something went wrong...</p>
     <div className='container-bottom'>
      <button visibility='hidden' className='previous-button' onClick={prevPage} ref={prevButton}>Previous</button>
      <button visibility='hidden' className='next-button' onClick={nextPage} ref={nextButton}>Next</button>   
     </div>
     
      </div>
    </div>
    }

    if(movies.length === 0){
      return <div>
        <h1 className='title'>Search</h1>
        <form onSubmit={handleSubmit}>
        <input className='search-input' type='text' onChange={(e) => setValue(e.target.value)}/>
        <button className='search-button' type='submit'>Search</button>
        </form>
        <div className='movie-card-container'>  
       <p className='movie-card-container-text'>Your searched movie didn't exist in the server</p>    
       <div className='container-bottom'>
        <button visibility='hidden' className='previous-button' onClick={prevPage} ref={prevButton}>Previous</button>
      <button visibility='hidden' className='next-button' onClick={nextPage} ref={nextButton}>Next</button>
        </div>    
       
        </div>
      </div>
    }
    return (
      <div>
        <h1 className='title'>Search</h1>
        <form onSubmit={handleSubmit}>
        <input className='search-input' type='text' onChange={(e) => setValue(e.target.value)}/>
        <button className='search-button' type='submit'>Search</button>
        </form>
        <div className='movie-card-container'>
        {
        //
        
        movies.map((movie) =>{
           if(savedMovies.some(savedMovie => savedMovie.id == movie.id)){
          return <MovieCard key= {movie.id} id={movie.id}imgLink={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
        title={movie.title} releaseDate={movie.release_date} rating = {movie.vote_average} buttonMessage={'Remove from my list'}
        handleClick={removeMovie}/>
           }
           return <MovieCard key= {movie.id} id={movie.id}imgLink={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
           title={movie.title} releaseDate={movie.release_date} rating = {movie.vote_average} buttonMessage={'Add to my list'}
           handleClick={getMovieData}/>
           })
        //
        }
        
        <div className='container-bottom'>
        <button className='previous-button' onClick={prevPage} ref={prevButton}>Previous</button>
        <p className='pagination'>Page {page} of {totalPage}</p>
        <button className='next-button' onClick={nextPage} ref={nextButton}>Next</button>
        </div>
        
        
        
        </div>
      </div>
      )
  }
    
}
  


export default Search