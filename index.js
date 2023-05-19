// ==UserScript==
// @name         __cheat_learningapp
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Dont spend your time at teacher.
// @author       neoformal
// @match        https://learningapps.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=learningapps.org
// @grant        none
// ==/UserScript==

function Modal() {
    const modal = document.createElement("div");
    modal.style = `
    position: fixed;
    background: rgba(24,24,24, .1);
    backdrop-filter: blur(2px) invert(60%);
    color: #fff;
    min-width: 400px;
    min-height: 200px;
    max-width: 400px;
    max-height: 400px;
    overflow-y: scroll;
    left: 20px;
    top: 20px;
    z-index: 99999;
    font-size: 15px;
    `;
    modal.addEventListener("mouseover", () => {
    modal.style = `
    position: fixed;
    background: rgba(24,24,24, .9);
    backdrop-filter: blur(2px) invert(60%);
    color: #fff;
    min-width: 400px;
    min-height: 200px;
    max-width: 400px;
    max-height: 400px;
    overflow-y: scroll;
    left: 20px;
    top: 20px;
    z-index: 99999;
    font-size: 15px;
    `;
    });
    modal.addEventListener("mouseout", () => {
    modal.style = `
    position: fixed;
    background: rgba(24,24,24, .1);
    backdrop-filter: blur(2px) invert(60%);
    color: #fff;
    min-width: 400px;
    min-height: 200px;
    max-width: 400px;
    max-height: 400px;
    overflow-y: scroll;
    left: 20px;
    top: 20px;
    z-index: 99999;
    font-size: 15px;
    `;
    });
    document.body.appendChild(modal);
    return modal;
}

function replaceAll(text, replace, to) {
    if(text.includes(replace)) return replaceAll(text.replace(replace, to), replace, to);
    return text;
}

(function() {
    'use strict';

    setTimeout(() => {
        const linkInfo = new URL(location.href);
        const AppID = linkInfo.searchParams.get("id");
        const AppClientLanguage = "UK";

        if(!AppClient) AppClient = new AppClientClass(AppID,false,0);
        
        if(AppClient.Tool === "71") {
          var answers = decodeURI(AppClient.parametersJSON.initparameters)
          .split("|")
          .filter((e, i) => e !== "")
          .filter((e,i) => i%2)
          .map((e,i) => i%2 ? e+"<br/><br/>" : "<b>"+e+"</b><br/>")
          .join("");

          if(answers.includes("%2C")) answers = replaceAll(answers, "%2C", ",");

            const modal = Modal();
            modal.innerHTML = answers;
        } else {
            const modal = Modal();
            modal.innerHTML = "<b>Для цього типу задач ще не знайдено лазейки :(</b>";
        }
    }, 1000);
})();