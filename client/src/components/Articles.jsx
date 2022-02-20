import react from "react";
import Typography from '@mui/material/Typography';

function Articles(props){
    return(
        <>
        <Typography variant="h2" component="h2" color="white" gutterBottom ={true} align = "center" paddingLeft="2.5vw" paddingRight="2.5vw">{props.title}</Typography>;
        <img src = {props.img} className="center"/>
        <Typography variant="h4" component="h2" color="white" gutterBottom ={true} align = "center">{props.img_caption}</Typography>;
        <Typography variant="h5" component="h2" color="white" gutterBottom ={true} align = "center" paddingLeft="2.5vw" paddingRight="2.5vw">{props.body}</Typography>;
        </>
    );
}

export default Articles;