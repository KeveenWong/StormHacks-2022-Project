import BodyComponent from './components/BodyComponent';
import Articles from './components/Articles';
import { useEffect , useState } from 'react';
function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
    <BodyComponent/>
    <Articles

    name = "king" 
    article = "king" 
    source = "king"

    />
    <p>{data}</p>
    </div>
  );
}

export default App;
