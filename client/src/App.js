import BodyComponent from './components/BodyComponent';
import Articles from './components/Articles';
import { useEffect , useState } from 'react';
import axios from 'axios';


function createArticle(prop) {
  return <Articles 
    title={prop.title}
    img = {prop.img}
    img_caption = {prop.img_caption}
    body = {prop.body} />
}
function App() {

  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);


  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);


  useEffect(() => {
    fetch("/streak")
      .then((res) => setCount(parseInt(res)))
      .then(() => console.log(count));
  }, []);


  return (
    <div className="App">
    <BodyComponent/>
    <h2> Streak Count : {count}</h2>
    {!data ? "" : data.map(createArticle)}
    </div>
  );
}

export default App;
