const API_KEY ="8002530120524a78a100a3c43232f009";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${URL}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    collectData(data.articles);
}

function collectData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const templateCard = document.getElementById("template-news-card");

    cardsContainer.innerText = "";

    articles.forEach(article => {
        if(!article.urlToImage)return;
        const cardClone = templateCard.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone : "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} . ${date}`;
    
    cardClone.firstElementChild.addEventListener("click", () => {
       window.open(article.url, "_blank");
    })
}

let currentSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
   currentSelectedNav?.classList.remove("active");
   currentSelectedNav = navItem;
   currentSelectedNav.classList.add("active");
}

const searchbtn = document.getElementById("btn");
const searchInput = document.getElementById("search-input");

searchbtn.addEventListener("click", function(){
    const query = searchInput.value;
    if(!query)return;
    fetchNews(query);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = null;
})