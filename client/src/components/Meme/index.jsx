import React, { useEffect, useState } from "react";

// React Router
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";

// Styles

const Meme = ({ meme, setMeme }) => {
  const { id } = useParams();
  const [memeData, setMemeData] = useState({
    template_id: id,
    username: "Rambe",
    password: "MemeGenerated",
    values: [],
  });
  const navigate = useNavigate();

  let url = `https://api.imgflip.com/caption_image?template_id=${memeData.template_id}&username=${memeData.username}&password=${memeData.password}`;
  memeData.values.map(
    (items, index) => (url += `&boxes[${index}][text]=${items.text}`)
  );

  const generateMeme = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(url, { method: "POST" });
      const json = await res.json();

      setMeme({ ...meme, url: json.data.url });
    } catch (e) {
      alert("Fill out the captions input");
    }
  };

  const inputs = [...Array(meme.box_count)].map((item, index) => {
    const handleChange = (e) => {
      let newValues = memeData.values;
      newValues[index] = { text: e.target.value };
      setMemeData((prevState) => {
        return {
          ...prevState,
          values: newValues,
        };
      });
    };

    return (
      <>
        <br />
        <label
          class="text-white text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="name"
        >
          Text {index + 1}
        </label>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          key={index}
          name={`input${index}`}
          placeholder={`Enter Text Here`}
          onChange={handleChange}
          value={memeData.values.text}
        />
      </>
    );
  });

  const downloadImage = async (imageSrc) => {
    const image = await fetch(imageSrc);
    const imageBlob = await image.blob();
    const imageUrl = URL.createObjectURL(imageBlob);

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = meme.name;
    document.body.appendChild(link);
    link.click();
    //www.youtube.com/watch?v=61EGpAy4Ids
    https: document.body.removeChild(link);
  };

  const backToHome = () => {
    setMeme(null);
    navigate("/");
  };

  return (
    <div
      id="divv"
      class="flex flex-col items-center justify-center gap-6 p-6 md:flex-row md:gap-12"
    >
      <img className="imgg" src={meme.url} alt="" />
      <div class="space-y-4">
        <div class="space-y-2">
          <h2 class="text-3xl font-bold text-white">{meme.name}</h2>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          class="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div class="space-y-2">{inputs}</div>
          <br />
          <div class="flex flex-col gap-2 sm:flex-row">
            <button
              id="btn"
              type="submit"
              onClick={generateMeme}
              class=" inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-1"
              fdprocessedid="1oddx"
            >
              Generate Meme
            </button>
            <button
              id="btn"
              type="submit"
              onClick={() => downloadImage(meme.url)}
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1"
              fdprocessedid="frlf4p"
            >
              Download Meme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Meme;
