import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  function hagoClick(id) {
    setSelectedCard(id);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
      .then((user) => {
        setCardData(user);
      });
  }

  return (
    <div className="App">
      {selectedCard && cardData ? (
        <div className="card-selected">
          <div className="card-header-selected">
            <strong>{cardData.title}</strong>
          </div>
          <div className="card-body">
            <p>{cardData.body}</p>
          </div>
        </div>
      ) : (
        <div className="card-container">
          {list.map((usuario) => (
            <div className="card" key={usuario.id} onClick={() => hagoClick(usuario.id)}>
              <div className="card-header">
                <strong>{usuario.title}</strong>
              </div>
              <div className="card-body">
                Haz click para obtener más información.
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;