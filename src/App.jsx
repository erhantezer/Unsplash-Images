import { useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa';

const clientID = `?client_id=-WsG44wZbP_-YsLll3ho70imGuxqUSGtc2kbBajE7Bc`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [newImages, setNewImages] = useState([]);
  const [photos, setPhotos] = useState([]); 


  const fetchPhotos = () => {
    setLoading(true)
    try {
      
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    
    fetchPhotos()
  }, []);

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input 
          type="text" 
          placeholder="search"
          value={search}
          onClick={(e) => setSearch(e.target.value)}
          className="form-input"
          />
        </form>
      </section>
    </main>
  )
}

export default App
