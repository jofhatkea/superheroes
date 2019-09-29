const form = document.querySelector("form#addForm");
const formEdit = document.querySelector("form#editForm");
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

formEdit.addEventListener("submit", evt => {
  evt.preventDefault();
  put();
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
  copy.querySelector("button.btnDelete").addEventListener("click", e => {
    const target = e.target.parentElement;
    target.classList.add("remove");

    e.target.parentElement.addEventListener("transitionend", e => {
      deleteIt(hero._id);
      if (e.propertyName == "opacity") {
        target.remove();
      }
    });
  });

  copy.querySelector("button.btnEdit").addEventListener("click", e => {
    fetchAndPopulate(hero._id);
  });

  document.querySelector("#app").prepend(copy);
}
get();
function fetchAndPopulate(id) {
  fetch(`https://frontendautmn2019-5ad1.restdb.io/rest/superheroes/${id}`, {
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
      formEdit.elements.name.value = heroes.name;
      formEdit.elements.realname.value = heroes.realname;
      formEdit.elements.age.value = heroes.age;
      formEdit.elements.powers.value = heroes.powers;
      formEdit.elements.id.value = heroes._id;
    });
}
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

function put() {
  let data = {
    name: formEdit.elements.name.value,
    realname: formEdit.elements.realname.value,
    age: formEdit.elements.age.value,
    powers: formEdit.elements.powers.value
  };
  let postData = JSON.stringify(data);
  const superID = formEdit.elements.id.value;
  fetch(
    "https://frontendautmn2019-5ad1.restdb.io/rest/superheroes/" + superID,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5d887443fd86cb75861e25ee",
        "cache-control": "no-cache"
      },
      body: postData
    }
  )
    .then(d => d.json())
    .then(updatedHero => {
      //find the parent
      const parentElement = document.querySelector(
        `.hero[data-heroid="${updatedHero._id}"]`
      );
      // update the dom
      parentElement.querySelector("h1").textContent = updatedHero.name;
      parentElement.querySelector("h2>span").textContent = updatedHero.realname;
      parentElement.querySelector("p").textContent = updatedHero.powers;
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
