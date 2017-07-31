window.$ = window.jquery = require("jquery");

import SongsService from "./SongsService";
import SongsListManager from "./SongsListManager";
import SongFormManager from "./SongFormManager";
import PubSub from "pubsub-js";

const songsService = new SongsService("/songs/");

const songsListManager = new SongsListManager(".songs-list", songsService, PubSub);
songsListManager.init();

const songFormManager = new SongFormManager(".song-form", songsService, PubSub );
songFormManager.init();


