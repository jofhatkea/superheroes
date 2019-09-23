function get() {
  fetch("https://frontendautmn2019-5ad1.restdb.io/rest/superheroes", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887443fd86cb75861e25ee",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(heroes => {
      heroes.forEach(addHeroToTheDOM);
    });
}

function addHeroToTheDOM(hero) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h1").textContent = hero.name;
  copy.querySelector("h2").textContent = hero.realname;
  copy.querySelector("p").textContent = hero.powers;
  document.querySelector("#app").appendChild(copy);
}
get();

function post() {
  const data = {
    name: "The Frontender",
    realname: "You",
    age: 22,
    powers: "CCS\nJS\nUX"
  };

  const postData = JSON.stringify(data);
  fetch("https://frontendautmn2019-5ad1.restdb.io/rest/superheroes", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887443fd86cb75861e25ee",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      //window.location = "";
      addHeroToTheDOM(data);
    });
}

document.querySelector("button").addEventListener("click", e => {
  post();
});
