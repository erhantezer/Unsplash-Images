
import { FaSearch } from 'react-icons/fa';
import { useGlobalContext } from './context';



function App() {
  const {
    query,
    setQuery,
    loading,
    newImages,
    setNewImages,
    photos,
    setPhotos,
    setPage,
    page
  } = useGlobalContext()





  const handleSubmit = (e) => {
    e.preventDefault();

  }

  if(loading) {
    return <div style={{textAlign:"center"}}>Loading...</div>
  }

  return (
    <main>
      <section className="search">
        <form className="search-form" onSubmit={handleSubmit}>
          <input 
          type="text" 
          placeholder="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-input"
          />
          <button type="submit" className="submit-btn">
            Search <FaSearch/>
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">

        </div>
      </section>
    </main>
  )
}

export default App
