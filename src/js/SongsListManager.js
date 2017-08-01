/**
 * Created by yos on 25/07/17.
 */
const $ = require ("jquery");
import PubSub from "pubsub-js";
import UIManager from "./UIManager";

export default class SongsListManager extends UIManager {

    constructor (elementSelector, songsService, pubSub) {
        super(elementSelector);
        this.songsService = songsService;
        this.pubSub = pubSub;
    }

    init(){
        this.loadSongs();
        let self = this;
        this.element.on("click",".song", function(){
            let songId = this.dataset.id;
            self.deleteSong(songId);
        });
        PubSub.subscribe("new-song", (topic, song) => {
           this.loadSongs();
        })
    }

    loadSongs(){
        this.songsService.list(songs => {
            if (songs.length == 0) {
                this.setEmpty();
            } else {
                this.renderSongs(songs);
                this.setIdeal();
            }
        }, error => {
            this.setError();
            console.log("Error while loading the songs", error);
        });
    }

    renderSongs(songs){
        let html = "";
        for (let song of songs) {
            html += this.renderSong(song);
        }
        this.setIdealHtml(html);
    }

    renderSong(song) {
        let cover_url = song.cover_url;
        let srcset = "";
        if (cover_url == ""){
            cover_url = "img/disk-150px.png";
            srcset = "img/disk-150px.png 150w, img/disk-250px.png 250w, img/disk-300px.png 300w";
        }
        return `<article class="song" data-id="${song.id}">
                <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover"${srcset}>
                <div class="artist">${song.artist}</div>
                <div class="title">${song.title}</div>
            </article>`
    }

    deleteSong (songId) {
        this.setLoading();
            this.songsService.delete(songId, success => {
                this.loadSongs();
            }, error => {
                this.setError();
            }
        );
    }
}