import React, { useState, useEffect } from 'react';
import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c1e0d11feb1d7b188bdcd46d4a2e2ac7&page=1";



const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=c1e0d11feb1d7b188bdcd46d4a2e2ac7&query=";

function App() {
  const [movies, setmovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect(() =>{
    fetch(FEATURED_API)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setmovies(data.results);
    });
  }, []);

  const handleOnSubmit = (e) =>{
    e.preventDefault();
    if(searchTerm){
      fetch(SEARCH_API + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setmovies(data.results);
      });
      setSearchTerm('');
  }
  };

  const handleOnChange = (e) =>{
    setSearchTerm(e.target.value);
  }

  return(
  <>
    <header>
      <form onSubmit={handleOnSubmit}>
      <input
     className="search" 
      type="text"
       placeholder="search..."
       value={searchTerm}
       onChange={handleOnChange}
       />
      </form>
      
    </header>
    <div className="movie-container">
    {movies.map((movie) => 
    <Movie key={movie.id} {...movie} />)} 
    </div>
    </>
    );
    
 
}

export default App;
