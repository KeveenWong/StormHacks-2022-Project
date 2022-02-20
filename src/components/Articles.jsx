import react from "react";

function Articles(props){
    return(
        <>
        <h1>{props.name}</h1>
        <br></br>
        <h2>{props.article}</h2>
        <h3>{props.source}</h3>
        </>
    );
}

export default Articles;