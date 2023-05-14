import { createContext, useContext, useEffect, useState } from "react";


const AppContext = createContext();

export const useGlobalContext = () => {
    return useContext(AppContext)
};

const clientID = `?client_id=-WsG44wZbP_-YsLll3ho70imGuxqUSGtc2kbBajE7Bc`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

export const AppProvider = ({children}) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [newImages, setNewImages] = useState([]);
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
        try {
            const res = await fetch(url);
            const data = await res.json();
            setPhotos(data)
            console.log(data)
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {

        fetchPhotos()
    }, []);


    return (
        <AppContext value={{}}>
            {children}
        </AppContext>
        )
}