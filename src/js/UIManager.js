/**
 * Created by yos on 25/07/17.
 */
const $ = require("jquery");

export default class UIManager {
    constructor(selector){
        this.uiStateClasses = "empty loading error partial ideal";
        this.element = $(selector);
    }

    setEmpty() {
        this.element.removeClass(this.uiStateClasses).addClass("empty");
    }

    setLoading() {
        this.element.removeClass(this.uiStateClasses).addClass("loading");
    }

    setError() {
        this.element.removeClass(this.uiStateClasses).addClass("error");
    }

    setPartial() {
        this.element.removeClass(this.uiStateClasses).addClass("partial");
    }

    setIdeal() {
        this.element.removeClass(this.uiStateClasses).addClass("ideal");
    }

}