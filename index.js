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
        let side = "left: 20px;";
        const basic_styles = `
        position: fixed;
        background: rgba(24,24,24, .05);
        backdrop-filter: blur(2px) invert(60%);
        color: #fff;
        min-width: 400px;
        min-height: 200px;
        max-width: 400px;
        max-height: 400px;
        overflow-y: scroll;
        top: 20px;
        z-index: 99999;
        font-size: 15px;`;
        modal.style = basic_styles;

        modal.addEventListener("click", (e) => {

            if(modal.style.left) {
                modal.style.right = "20px";
                modal.style.left = undefined;
                side = "right: 20px;";
            } else if (modal.style.right){
                modal.style.top = "20000px";
                modal.style.right = undefined;
                side = "top: 20000px;";
                setTimeout(() => {
                    modal.style.top = "20px";
                modal.style.right = undefined;
                side = "top: 20px;";
                }, 5000)
            } else {
                modal.style.left = "20px";
                modal.style.right = undefined;
                side = "left: 20px;";
            }
        })
        modal.addEventListener("mouseover", () => {
        modal.style = basic_styles+"background: rgba(24,24,24, .7);"+side;
        });
        modal.addEventListener("mouseout", () => {
        modal.style = basic_styles+side;
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

            switch(AppClient.Tool) {
                case "40": {
                    let answers = decodeURI(AppClient.parametersJSON.initparameters).split("|")
                        .slice(2)
                        .filter(e => !e.startsWith("&"))
                        .map(e => e.includes("&") ? e.slice(0, e.indexOf("&")) : e);
                    if(!answers%2) return;

                    let newList = new Array();

                    answers.forEach((e,i) => {
                        !i%2 ? newList[i+1] = e : newList[i-1] = e;
                    });
                    newList = newList.map((e, i) => i%2 ? e+"<br/><br/>" : "<b>"+e+"</b><br/>")
                        .join("");

                    if(newList.includes("%2C")) newList = replaceAll(newList, "%2C", ",");

                    const modal = Modal();
                    modal.innerHTML = newList;
                    break;
                }
                case "71": {
                    let answers = decodeURI(AppClient.parametersJSON.initparameters)
                        .split("|")
                        .filter((e, i) => e !== "")
                        .filter((e,i) => i%2)
                        .map((e,i) => i%2 ? e+"<br/><br/>" : "<b>"+e+"</b><br/>")
                        .join("");
                    if(answers.includes("%2C")) answers = replaceAll(answers, "%2C", ",");

                    const modal = Modal();
                    modal.innerHTML = answers;
                    break;
                }
                case "83": {
                    const url = new URL(location.href)
                    url.pathname = "/create"
                    url.searchParams.set("new", AppClient.Tool);
                    url.searchParams.set("from", AppClient.showID);
                    
                    const modal = Modal();
                    modal.innerHTML = `<b>Цей тип задачі можна вирішити більш консервативним методом
                        <br/>
                        <br/>
                        <a
                            href="${url.href}" style="background: black; padding: 2px; text-decoration: underline">
                            Перейдіть за посиланням, сюди.
                        </a>
                        `;
                    break;
                }
                case "86": {
                    const answers = decodeURI(AppClient.parametersJSON.initparameters).split("|")
                        .filter(e => e.startsWith("0") ? e.includes("cluster") : true && e !== "");

                    let newList = answers
                        .map((e,i) => e.includes("cluster") ?
                            `<br/><br/><b>${answers[i+1]}</b><br/>`
                            : answers[i-1].includes("cluster") ?
                                null
                                : `
                                    <span
                                        style="display: block; background: gray; margin: 2px 0;"
                                    >
                                        ${e}
                                    </span>
                                `
                        )
                        .filter(e => e !== null || e !== undefined)
                        .join("");
                    newList = replaceAll(newList, "%2C", ",");
                    
                    const modal = Modal();
                    modal.innerHTML = newList;
                    break;
                }
                case "140":{
                    let answers = decodeURI(AppClient.parametersJSON.initparameters).split("&cloze")
                        .slice(2);
                    answers[answers.length-1] = answers[answers.length-1].slice(0, answers[answers.length-1].indexOf("&"));
                    answers = answers.join("<br/>");

                    const modal = Modal();
                    modal.innerHTML = answers;
                    break;
                }
                default:
                    let answers = decodeURI(AppClient.parametersJSON.initparameters);

                    const modal = Modal();
                    modal.innerHTML = `<b>Для цього типу задач ще не знайдено лазейки :(
                        <br/>Тип задачі: ${AppClient.Tool}
                        <br/>
                        <br/>${answers}</b>`;
                    break;
            }
        }, 1000);
    })();