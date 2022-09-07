import React from "react";
import './style.css'
export const PostCard = (props) => {
    

    return (
        <div  className='post'>
            <img src={props.cover} alt={props.title} />
            <div  className="props-content">
                <h1 >{props.title}</h1>
                <p>{props.body}</p>
            </div>
        </div>
    )
}