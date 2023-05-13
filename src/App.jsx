import { useState } from "react";


const clientID = `?client_id=-WsG44wZbP_-YsLll3ho70imGuxqUSGtc2kbBajE7Bc`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [search, setSearch] = useState("cat");
  const [loading, setLoading] = useState(false);

  return (
    <>
    </>
  )
}

export default App
