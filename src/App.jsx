import { FaSearch } from 'react-icons/fa';
import { useGlobalContext } from './context';
import { useEffect, useRef } from 'react';
import Photo from './Photo';

function App() {
  const {
    query,
    setQuery,
    loading,
    // newImages,
    // setNewImages,
    photos,
    setPhotos,
    setPage,
    page,
    fetchPhotos
  } = useGlobalContext()
  // const mounted = useRef(false);


  useEffect(() => {
    // if (!mounted.current) {
    //   mounted.current = true;
    //   return;
    // }
    setPage((oldPage) => oldPage + 1);
  }, []);


  // const event = () => {
  //   if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
  //     return
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', event);
  //   return () => window.removeEventListener('scroll', event);
  // }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchPhotos();
    }
    setPage(1);
  }


  if(loading) {
    return <div style={{textAlign:"center"}}>
      <h1 className='loading'>Loading...</h1>
      </div>
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
            <FaSearch/>
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image, index) => {
            return <Photo key={index} {...image}/>
          })}
        </div>
      </section>
    </main>
  )
}

export default App
