/**
 * Created by yos on 25/07/17.
 */
const $ = require ("jquery");
import PubSub from "pubsub-js";

export default class SongsListManager {

    constructor (songsService, uiManager, pubSub) {
        this.songsService = songsService;
        this.uiManager = uiManager;
        this.pubSub = pubSub;
    }

    init(){
        this.loadSongs();
        PubSub.subscribe("new-song", (topic, song) => {
           this.loadSongs();
        })
    }

    loadSongs(){
        this.songsService.list(songs => {
            if (songs.length == 0) {
                this.uiManager.setEmpty();
            } else {
                this.renderSongs(songs);
                this.uiManager.setIdeal();
            }
        }, error => {
            this.uiManager.setError();
            console.log("Error while loading the songs", error);
        });
    }

    renderSongs(songs){
        let html = "";
        for (let song of songs) {
            html += this.renderSong(song);
        }
        this.uiManager.setIdealHtml(html);
    }

    renderSong(song) {
        return `<article class="song">
                <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover">
                <div class="artist">${song.artist}</div>
                <div class="title">${song.title}</div>
            </article>`
    }


}