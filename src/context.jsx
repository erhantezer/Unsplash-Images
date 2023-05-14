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
    const [newImages, setNewImages] = useState(false);
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
            setNewImages(false);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setNewImages(false);

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
            newImages,
            setNewImages,
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