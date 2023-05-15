# STOCK-PHOTOS

## App.jsx
```js
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

```

## Photo.jsx
```js
const Photo = ({
urls: {regular},
alt_description,
likes,
user: {
    name,
    portfolio_url,
    profile_image: { medium },
    location
},

}) => {
    return (
        <article className='photo'>
            <img className='photo-grid' src={regular} alt={alt_description} />
            <div className='photo-info'>
                <div>
                    <h4>{name}</h4>
                    <p>{likes} likes</p>
                    
                </div>
                <div>
                    <p>{location}</p>
                </div>
                <a href={portfolio_url}>
                    <img src={medium} alt='' className='user-img' />
                </a>
            </div>
        </article>
    )
}

export default Photo
```

## context.jsx
```js
import { createContext, useContext, useEffect, useState } from "react";


const AppContext = createContext();

export const useGlobalContext = () => {
    return useContext(AppContext)
};

const clientID = `?client_id=-WsG44wZbP_-YsLll3ho70imGuxqUSGtc2kbBajE7Bc`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

export const AppProvider = ({ children }) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    // const [newImages, setNewImages] = useState(false);
    const [photos, setPhotos] = useState([]);

    const fetchPhotos = async () => {
        setLoading(true)
        let url;
        const urlPage = `&page=${page}`;
        const urlQuery = `&query=${query}`
        if (query) {
            url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
        } else {
            url = `${mainUrl}${clientID}${urlPage}`
        }
        console.log(url)
        try {
            const res = await fetch(url);
            const data = await res.json();
            setPhotos((oldPhotos) => {
                if (query && page === 1) {
                    return data.results;
                } else if (query) {
                    return [...oldPhotos, ...data.results];
                } else {
                    return [...oldPhotos, ...data];
                }
            });
            console.log(data)
            // setNewImages(false);
            setLoading(false);
        } catch (error) {
            console.log(error)
            // setNewImages(false);

            setLoading(false);
        }
    }


    useEffect(() => {

        fetchPhotos()
    }, [page]);


    return (
        <AppContext.Provider value={{
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
        }}>
            {children}
        </AppContext.Provider>
    )
}
```

