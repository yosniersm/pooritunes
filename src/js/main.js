window.$ = window.jquery = require("jquery");

import SongsService from "./SongsService";
import UIManager from "./UIManager";
import SongsListManager from "./SongsListManager";
import SongFormManager from "./SongFormManager";
import PubSub from "pubsub-js";

const songsService = new SongsService("/songs/");
const songsListUIManager = new UIManager(".songs-list");

const songsListManager = new SongsListManager(songsService, songsListUIManager, PubSub);
songsListManager.init();

const songFormManager = new SongFormManager(".song-form", songsService, PubSub );
songFormManager.init();



songsService.list(songs => {
    if (songs.length == 0) {
        songsListUIManager.setEmpty();
    } else {
        let html = "";
        for (let song in songs){
            html += `<article class='song'>
                <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover">
                <div class="artist">${song.artist}</div>
                <div class="title">${song.title}</div>
                </article>`
        }

        $(".songs-list .ui-status.ideal").html(html);
        songsListUIManager.setIdeal();
    }
}, error => {
    songsListUIManager.setError();
    console.error("Error loading the songs", error);
});

