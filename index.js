function get() {
  fetch(`https://frontendautmn2019-5ad1.restdb.io/rest/superheroes`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887443fd86cb75861e25ee",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(heroes => {
      console.log(heroes);
      heroes.forEach(addHeroToTheDOM);
    });
}

function addHeroToTheDOM(hero) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("article.hero").dataset.heroid = hero._id;

  copy.querySelector("h1").textContent = hero.name;
  copy.querySelector("h2").textContent = hero.realname;
  copy.querySelector("p").textContent = hero.powers;
  copy.querySelector("button").addEventListener("click", () => {
    deleteIt(hero._id);
  });
  document.querySelector("#app").prepend(copy);
}
get();

function post() {
  const data = {
    name: "The Backender",
    realname: "!You?",
    age: 40,
    powers: "Node.js\nDatabases"
  };
  addHeroToTheDOM(data);
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
      //addHeroToTheDOM(data);
    });
}

function deleteIt(id) {
  fetch("https://frontendautmn2019-5ad1.restdb.io/rest/superheroes/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887443fd86cb75861e25ee",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      //TODO: delete from DOM
      document.querySelector(`.hero[data-heroid="${id}"]`).remove();
    });
}

document.querySelector("button").addEventListener("click", e => {
  post();
});
