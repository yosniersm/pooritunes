/**
 * Created by yos on 25/07/17.
 */
import UIManager from "./UIManager"

export default class SongFormManager extends UIManager {

    init() {
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler(){
        this.element.on("submit", () =>{
            this.validateAndSendData();
            return false;
        } );
    }

    validateAndSendData(){
        if (this.isValid()) {
            this.send();
        }
        return false; // in jquery es hacer un event.preventDefault()
    }

    isValid(){
        const inputs = this.element.find("input");

        for(let input of inputs){
           if(input.checkValidity() == false) {
               const errorMessage = input.validationMessage;
               input.focus();
               this.setErrorHtml(errorMessage);
               this.setError();
               return false
           }
        }
        this.setIdeal();
        return true;
    }

    send(){
        this.setLoading();
        const song = {
            artist: this.element.find("#artist").val,
            title: this.element.find("#title").val,
            cover_url: this.element.find("#cover_url").val
        };
        this.songsService.save(song, success =>{
            // TODO: RECARGAR EL LISTADO DE CANCIONES
           this.resetForm();
            this.setIdeal()
        }, error => {
            this.setErrorHtml("Se ha producido un error al guardar la cancion.");
            this.setError();
        });
    }

    resetForm (){
        this.element[0].reset();
    }

    disableFormControls(){
        this.element("input, button").attr("disabled", true);
    }

    enableFormControls(){
        this.element("input, button").attr("disabled", false);
    }

    setLoading(){
        super.setLoading();
        this.disableFormControls();
    }

    setError(){
        super.setError();
        this.enableFormControls();
    }

    setIdeal(){
        super.setIdeal();
        this.enableFormControls();
    }
}