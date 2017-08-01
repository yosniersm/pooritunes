/**
 * Created by yos on 25/07/17.
 */
const $ = require ("jquery");

export default class SongsService {

    constructor(url){
        this.url = url;
    }

    list(succesCallback, erroCallback){
        $.ajax({
            url: this.url,
            success: succesCallback,
            error: erroCallback
        });
    }

    save (song, successCallback, errorCallback){
        if (song.id){
            this.update(song, successCallback, errorCallback);
        } else {
            this.create(song, successCallback, errorCallback);
        }
    }

    create (song, successCallback, errorCallback){
        $.ajax({
            url: this.url,
            method:"post",
            data: song,
            success:successCallback,
            error: errorCallback
        })
    }

    getDetail(songId, successCallback, errorCallback){
        $.ajax({
            url: `${this.url}${songId}`,
            success: successCallback,
            error: errorCallback
        })
    }

    update (song, successCallback, errorCallback){
        $.ajax({
            url: `${this.url}${song.id}`,
            method: "put",
            data: song,
            success: successCallback,
            error: errorCallback
        })
    }

    delete(songId, successCallback, errorCallback) {
        $.ajax({
            url:`${this.url}${songId}`,
            method:"delete",
            success: successCallback,
            error:errorCallback
        })
    }

}