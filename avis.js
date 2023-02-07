export function ajoutListenersAvis() {
  const piecesElements = document.querySelectorAll(".fiches article button");

  for (let i = 0; i < piecesElements.length; i++) {
    piecesElements[i].addEventListener("click", async function (event) {
      const id = event.target.dataset.id;
      const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
      const avis = await reponse.json()
      const pieceElements = event.target.parentElement;
      const avisElement = document.createElement("p");
      for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += `<b>${avis[i].utilisateur}</b> : ${avis[i].commentaire}<br>`
      };
      pieceElements.appendChild(avisElement);
    });
  }
}

export function listenerEventForm() {
    const formAvis = document.querySelector(".formulaire-avis")
    formAvis.addEventListener("submit", (event) => {
        event.preventDefault()
        const avis = {
            pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
            utilisateur: event.target.querySelector("[name=utilisateur]").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
            nbEtoile: event.target.querySelector("[name=nbetoile]").value
        };
        const message = JSON.stringify(avis);
        console.log(avis);
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: {"Contente-Types": "application/json"},
            body: message
        });
    });
}
