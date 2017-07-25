/**
 * Created by yos on 25/07/17.
 */
const $ = require ("jquery");

export default class SongsListManager {

    constructor (songsService, uiManager) {
        this.songsService = songsService;
        this.uiManager = uiManager;
    }

    init(){
        this.loadSongs();
    }

    loadSongs(){

    }

    renderSongs(songs){

    }

}