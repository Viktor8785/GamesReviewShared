import{gamesData}from"./games-data.js";const gamesTitle=document.querySelector(".games__title"),gamesList=document.querySelector(".games__list"),watchButton=document.querySelector("#watch-button"),elementTemplate=document.querySelector("#element-template").content.querySelector(".games__item");let urlParams=new URLSearchParams(window.location.search),param=urlParams.get("param"),gamesFiltered=[];"watch"==param?(gamesFiltered=getWatchGames(),gamesTitle.textContent="Watchlist",watchButton.classList.add("main-nav__item--active")):(gamesFiltered=getFilteredGames(),gamesTitle.textContent=param+" Games");let gamesLength=gamesFiltered.length;if(gamesLength>0)for(let e=0;e<gamesLength;e++){const t=elementTemplate.cloneNode(!0);t.querySelector(".games__text").textContent=gamesFiltered[e].name,t.querySelector(".games__img").src=gamesFiltered[e].imgIconMobile,t.querySelector(".games__img").alt=gamesFiltered[e].name,t.addEventListener("click",(()=>{t.querySelector(".games__link").href="game.html?param="+gamesFiltered[e].id})),gamesList.appendChild(t)}function getFilteredGames(){return gamesData.filter((e=>{if(e.genre==param)return!0}))}function getWatchGames(){let e=localStorage.getItem("watch"),t=[];if(e&&e.length>0)for(let a=0;a<e.length/3;a++){let m=3*a,r=e.slice(m,m+2);gamesData.forEach((e=>{e.id==r&&(t[a]=e)}))}return t}watchButton.addEventListener("click",(()=>{watchButton.href="games.html?param=watch"}));