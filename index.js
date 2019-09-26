const form = document.querySelector("form");
form.setAttribute("novalidate", true);
form.elements.name.addEventListener("focus", e => {
  form.elements.name.classList.remove("notValid");
});
form.elements.name.addEventListener("blur", e => {
  if (form.elements.name.checkValidity()) {
    form.elements.name.classList.remove("notValid");
  } else {
    form.elements.name.classList.add("notValid");
  }
});
form.addEventListener("submit", evt => {
  console.log(evt);
  evt.preventDefault();
});

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
  copy.querySelector("h2>span").textContent = hero.realname;
  copy.querySelector("p").textContent = hero.powers;
  //console.log(hero.powers.split("\n"));
  copy.querySelector("button").addEventListener("click", e => {
    const target = e.target.parentElement;
    target.classList.add("remove");

    e.target.parentElement.addEventListener("transitionend", e => {
      deleteIt(hero._id);
      if (e.propertyName == "opacity") {
        target.remove();
      }
    });
  });
  document.querySelector("#app").prepend(copy);
}
get();

function post() {
  const data = {
    name: form.elements.name.value,
    realname: form.elements.realname.value,
    age: form.elements.age.value,
    powers: form.elements.powers.value
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
      //document.querySelector(`.hero[data-heroid="${id}"]`).remove();
    });
}
