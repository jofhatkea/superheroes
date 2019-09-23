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
      heroes.forEach(hero => {
        const template = document.querySelector("template").content;
        const copy = template.cloneNode(true);
        copy.querySelector("h1").textContent = hero.name;
        copy.querySelector("h2").textContent = hero.realname;
        copy.querySelector("p").textContent = hero.powers;
        document.querySelector("#app").appendChild(copy);
      });
    });
}
get();
