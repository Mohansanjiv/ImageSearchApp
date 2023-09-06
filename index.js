const accessKey ="ia7AL8fKvI1a0wqOLdYT6iUGuaNIwc5ZdRN9htsX2fM";
const formE1= document.querySelector("form");
const searchinputE1 = document.getElementById("search-input");
const searchResultE1=document.querySelector('.search-results');
const showMoreButtonE1 =document.getElementById("show-more-button");


let inputData="";
let page =1;
async function searchImages(){
    inputData =searchinputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    console.log(url);
    const response = await fetch(url);
    const data =await response.json();
     

    if(page === 1){
        searchResultE1.innerHTML="";
    }
    
      const results=data.results;

      results.map((result)=>{
        const imageWrapper =document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image =document.createElement("img");
        image.src = result.urls.small;
        image.alt =result.alt_description;
        const imageLink =document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target ="_blank";
        imageLink.textContent=result.alt_description;  

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultE1.appendChild(imageWrapper);
    })
   
   page++;

    if(page > 1){
        showMoreButtonE1.style.display="block";
    }
}

formE1.addEventListener("submit", (event)=>{
    event.preventDefault();
    page=1;
    searchImages();   
});

showMoreButtonE1.addEventListener("click" ,()=>{
    searchImages();
})