import React from "react";
import { Link} from "react-router-dom";


function MovieCard(props){
    return(
        
        <div className="movie-card" id={props.id}>
            <img className="movie-image" src={props.imgLink}  height='300px' alt={props.title}/>
            <Link  to = {`/movie/${props.id}`}>
            <p>{props.title}</p>
            </Link>
            <p>{props.releaseDate}</p>
            <p>{props.rating}<img alt ="star icon" src="star-icon2.png" width='18px' height='18px'/></p>
            <button className="add-to-my-list-button" onClick={props.handleClick}>{props.buttonMessage}</button>
        </div>
        
    )
}

export default MovieCard