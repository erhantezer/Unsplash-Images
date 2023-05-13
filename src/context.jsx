import { createContext, useContext, useEffect, useState } from "react";


const AppContext = createContext();

export const useGlobalContext = () => {
    return useContext(AppContext)
};

const clientID = `?client_id=-WsG44wZbP_-YsLll3ho70imGuxqUSGtc2kbBajE7Bc`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

export const AppProvider = ({children}) => {
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
        <AppContext>
            {children}
        </AppContext>
        )
}