import React, { useEffect, useState } from "react";

// React Router
import { Routes, Route, useLocation, useMatch } from "react-router-dom";

// Components
import MemeTemplates from "./components/MemeTemplates";
import Meme from "./components/Meme";

// Styles
import GlobalStyle from "./GlobalStyle";

const App = () => {
  const [allMemes, setAllMemes] = useState([]);
  const [meme, setMeme] = useState(JSON.parse(localStorage.getItem("MEME")));
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  if (useMatch("/")) {
    localStorage.setItem("MEME", null);
  } else {
    localStorage.setItem("MEME", JSON.stringify(meme));
  }

  useEffect(() => {
    getMemes("http://localhost:8080/");
    window.addEventListener("scroll", toggleVisible);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("MEME", JSON.stringify(meme));
    document.title = meme ? `Meme Master - ${meme.name}` : "Meme Master";
  }, [meme]);

  const getMemes = async (url) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      const memesData = json.data.memes;

      setAllMemes(memesData);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleVisible = () => {
    if (window.pageYOffset > 450) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <>
      <Routes>
        {useMatch("/") && (
          <Route
            index
            path="/"
            element={<MemeTemplates allMemes={allMemes} setMeme={setMeme} />}
          />
        )}
        <Route
          path="/meme/:id"
          element={<Meme meme={meme} setMeme={setMeme} />}
        />
      </Routes>

      <GlobalStyle />
    </>
  );
};

export default App;
