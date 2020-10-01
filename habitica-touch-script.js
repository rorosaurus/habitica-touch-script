// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  simplify habitica web page for touch
// @author       roryohayes@gmail.com
// @match        https://habitica.com/
// @run-at document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Not loaded at first, so wait a bit
    setTimeout(function(){
        removeExtraStuff();
        adjustStyle();
        keepTagsOpen();
    }, 4000);
})();

function keepTagsOpen() {
    openTags();
    setTimeout(function(){
        keepTagsOpen();
    }, 100);
}

function removeExtraStuff() {
    // remove the rewards column
    document.getElementsByClassName("reward")[0].remove();

    // remove all top banners
    var name = "habitica-top-banner";
    var count = document.getElementsByClassName(name).length;
    for (var i = 0; i < count; i++) {
        document.getElementsByClassName(name)[0].remove();
    }

    // remove the navbar
    document.getElementsByClassName("navbar")[0].remove();


    // remove the app header
    document.getElementById("app-header").remove();

    // remove create task button
    document.getElementsByClassName("create-task-area")[0].remove();

    // remove footer
    document.getElementsByClassName("footer-row")[0].remove();

    // remove drawer
    document.getElementsByClassName("drawer-wrapper")[0].remove();
}

function adjustStyle() {
    var sheet = document.createElement('style');

    // widen the 3 columns
    sheet.innerHTML = ".col-lg-3{flex:0 0 33%;max-width:33%}";

    // widen and left align the search/tag div
    sheet.innerHTML += ".offset-md-4 {margin-left:0%;} .offset-md-4 {flex:0 0 100%;max-width:100%}";

    // reduce width of each tag to fit 4 tags per row
    sheet.innerHTML += ".col-6{flex:0 0 25%;max-width:25%}";

    // widen and left align the tags window
    sheet.innerHTML += ".filter-panel[data-v-0e3ec46c] {max-width:100%; position: initial; left: 0vw;}";

    // tags window padding
    sheet.innerHTML += ".filter-panel .tags-category[data-v-0e3ec46c] {padding-bottom: 0px; padding-top: 12px;}";

    // add the style changes
    document.body.appendChild(sheet);
}

function openTags() {
    // remove payment popup if present
    if (document.getElementsByClassName("close-icon").length > 0){
        document.getElementsByClassName("close-icon")[0].click();
    }

    // remove daily popup if present
    if (document.getElementsByClassName("btn-primary").length > 0){
        document.getElementsByClassName("btn-primary")[0].click();
    }

    if (document.getElementsByClassName("filter-panel").length < 1){

        document.getElementsByClassName("search-button")[0].click();

        // remove the edit and clear rows
        setTimeout(function(){
            document.getElementsByClassName("tags-header")[0].remove();
            document.getElementsByClassName("filter-panel-footer")[0].remove();
        }, 500);

    }
}