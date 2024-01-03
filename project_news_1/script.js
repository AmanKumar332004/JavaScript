// Jai Shree Ram

const api_key = `11c35207633b42e3a0d863c2c247bcca`
let api_url = `https://newsapi.org/v2/everything?q=` //tesla&from=2023-12-20
let cardsContainer = document.querySelector('.cards_container')
let newsCardTemplate = document.querySelector('#template_news_card')



async function fetchNews(query){
    let res = await fetch(`${api_url}${query}&from=2023-12-26&apiKey=${api_key}`)
    let data = await res.json();
    console.log(data)
    bindData(data.articles)
}

// fetchNews('India');
window.addEventListener('load',fetchNews('India'))

function reload(){
    window.location.reload();
}
function bindData(articles){
    cardsContainer.innerHTML = ' ';

    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        let cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone)
    })
}

function fillDataInCard(cardClone,article){
    let newsImg = cardClone.querySelector('#card_img')
    let newsTitle = cardClone.querySelector('#news_title')
    let newsSource = cardClone.querySelector('#news_source')
    let newsDescription = cardClone.querySelector('#news_description')

    newsImg.src = article.urlToImage
    newsTitle.innerHTML = article.title
    newsDescription.innerHTML = article.description

    
    let date = new Date(article.publishedAt).toLocaleDateString()
    newsSource.innerHTML = `${article.source.name}.${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank")
    })
}


function onNavItemClick(id){
    fetchNews(id)
}

const searchButton = document.querySelector('.search_button')
let searchInput = document.querySelector('.news_input')

searchButton.addEventListener('click',()=>{
    const query = searchInput.value
    if(!query) return;
    fetchNews(`${query}`)
})