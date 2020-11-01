"use strict";

const form = document.querySelector("#search-form");
const input = document.querySelector('[name = "search-field"]');
const Name = document.getElementById("Name");

const doFetch = async (TypeOfMovie) => {
  const response = await fetch(
    `http://api.tvmaze.com/search/shows?q=${TypeOfMovie}`
  );
  if (response.ok) {
    const arrayInfo = await response.json();

    for (let i = 0; i < arrayInfo.length; i++) {
      console.log(arrayInfo[i]);

      const arrayPic =
        arrayInfo[i].show.image == null
          ? "http://placekitten.com/200/300"
          : arrayInfo[i].show.image.medium;

      const article = document.createElement("article");
      const figcaption = document.createElement('figcaption');
      const figure = document.createElement("figure");

      article.innerHTML += `<p>Name:  ${arrayInfo[i].show.name}</p>`;
      figure.innerHTML += `<img src="${arrayPic}" alt="Default image"/>`;
      figcaption.innerHTML += `<p> Introduction: ${arrayInfo[i].show.summary}</p>`;
      article.innerHTML += `Official website: <a href="${arrayInfo[i].show.officialSite}">Link</a>`;

      figcaption.appendChild(figure);
      Name.appendChild(figcaption);
      Name.appendChild(article);
    }
  } else {
    console.log("Loading wrong");
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = input.value;
  doFetch(inputValue);
});



