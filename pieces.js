// const response = await fetch("pieces-autos.json");
// const pieces = await response.json();
const pieces = await fetch("pieces-autos.json").then((pieces) => pieces.json());

// const article = pieces[2];
function genererPieces(pieces) {
  for (let article of pieces) {
    const sectionFiches = document.querySelector(".fiches");
    const piecesElement = document.createElement("article");
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${
      article.prix < 35 ? "$" : "$$$"
    })`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "divers";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description";
    const dispoElement = document.createElement("p");
    dispoElement.innerText = `${
      article.disponibilite ? "stock" : "Rupture de stock"
    }`;
    dispoElement.style.background = `${
      article.disponibilite ? "green" : "red"
    }`;
    dispoElement.classList.add("in_stock");

    sectionFiches.appendChild(piecesElement);
    piecesElement.appendChild(imageElement);
    piecesElement.appendChild(nomElement);
    piecesElement.appendChild(prixElement);
    piecesElement.appendChild(categorieElement);
    piecesElement.appendChild(descriptionElement);
    piecesElement.appendChild(dispoElement);
  }
}

const buttonTree = document.querySelector(".btntree");

buttonTree.addEventListener("click", () => {
  const arrayTree = Array.from(pieces);
  arrayTree.sort((a, b) => {
    return a.prix - b.prix;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(arrayTree);
});

const buttonAbord = document.querySelector(".btnabord");

buttonAbord.addEventListener("click", () => {
  const arrayAbord = pieces.filter((piece) => {
    return piece.prix <= 35;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(arrayAbord);
});

const buttonDecroi = document.querySelector(".btndecroi");

buttonDecroi.addEventListener("click", () => {
  const arrayTree = Array.from(pieces);
  arrayTree.sort((a, b) => {
    return b.prix - a.prix;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(arrayTree);
});

const buttonNullDesc = document.querySelector(".btnnulldesc");

buttonNullDesc.addEventListener("click", () => {
  const arrayNoNullDesc = pieces.filter((piece) => {
    return piece.description;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(arrayNoNullDesc);
});
genererPieces(pieces);

const rangeBar = document.getElementById("prixMax");

rangeBar.addEventListener("input", function (){
  console.log(pieces);
  const arrayTree = pieces.filter(function (piece){
    return piece.prix <= rangeBar.value;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(arrayTree);
});
