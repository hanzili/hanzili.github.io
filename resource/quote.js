 
const quoteContainer = document.getElementById('quotesection');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-buttom');
const newQuoteBtn = document.getElementById('next-quote');
const Loader = document.getElementById('loader');
console.log(quoteText);
console.log(twitterBtn);
//const loader = document.getElementById('loader');
let quotelist = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
  
  // Remove Loading Spinner
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

async function GetQuote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        quotelist = await response.json();
        console.log(quotelist);
        UpdateQuote();
    } catch(error){}
}

function UpdateQuote() {
    console.log("giao");
    let randomNum = Math.floor(Math.random() * quotelist.length);
    console.log(randomNum);
    let quote = quotelist[randomNum];
    if (!quote.author) {
        authorText.textContent = 'Unknown';
      } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
      } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}
  
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', GetQuote);

GetQuote();