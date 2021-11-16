import React, { useState } from "react";
import axios from "axios";

import styles from "./Search.module.css";

const Search = () => {
    const [params, setParams] = useState({
        artist: "",
        song: "",
    });
    const [lyrics, setLyrics] = useState("");

    const submitParams = (e) => {
        e.preventDefault();
        console.log("Params: ", params);
        axios.get(`https://api.lyrics.ovh/v1/${params.artist}/${params.song}`)
        .then(res => {
            if(res.status === 200) {
                console.log(res.data.lyrics);
                setLyrics(res.data.lyrics);
                console.log("Lyrics:", lyrics);
                var html = document.getElementById("lyrics");
                html.innerHTML = res.data.lyrics.replace(/[\r\n]/g, '<br />');
            }
        })
        .catch(err => {
            alert(err);
        })
    }

    const startOver = (e) => {
        e.preventDefault();
        setLyrics({
            artist: "",
            song: "",
        });
        window.location.reload();
    }

    return (
        <div className={styles.search}>
            <div className={styles.search__header}>
                Find My Lyrics - The Web Resource for Song Lyrics
            </div>
            <div className={styles.search__searchbar}>
                <input
                    type="text"
                    className={styles.search__artist}
                    placeholder="Name of artist/band..."
                    onChange={(e) => setParams({...params, artist: e.target.value})}
                />
                <input
                    type="text"
                    className={styles.search__song}
                    placeholder="Name of song..."
                    onChange={(e) => setParams({...params, song: e.target.value})}
                />
                <input
                    type="submit"
                    className={styles.search__submit}
                    value="Search!"
                    onClick={(e) => submitParams(e)}
                />
            </div>
            { lyrics ? (
                <div className={styles.search__lyrics}>
                    <h2>{params.song} - {params.artist}</h2>
                    <div id="lyrics"></div>
                    <input
                        type="reset"
                        className={styles.search__submit}
                        value="Start Over"
                        onClick={(e) => startOver(e)}
                    />
                </div>
            ) : null}
        </div>
    )
}

export default Search;