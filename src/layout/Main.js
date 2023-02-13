import React from 'react'
import Navbar from '../pages/Navbar'
import  { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from '../pages/Home';
import MyStash from '../pages/MyStash';
import Search from '../pages/Search';
import MovieData from '../pages/MovieData';
import About from '../pages/About';


function Main() {
  return (
   
      <BrowserRouter>
        <Navbar webName={'MovieStash'}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/mystash" element={<MyStash/>}/>
          <Route path="/search" element={<Search/>}/>   
          <Route path="/movie/:id" element={<MovieData/>}/>               
          <Route path='/about' element={<About/>}/>                           
        </Routes>          
          
      </BrowserRouter> 
   
  )
}

export default Main