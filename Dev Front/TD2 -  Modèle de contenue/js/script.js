go();

async function go() {
  const partitions = await fetchData("data/partitions.json");
  const etudiants = await fetchData("data/etudiants.json");

  const etudiantsTries = trierEtudiantsParNomPrenom(etudiants);
  processDatas(partitions, etudiantsTries);
}

function trierEtudiantsParNomPrenom(etudiants) {
  return [...etudiants].sort((a, b) => {
    const cmpNom = (a.nom_disp || "").localeCompare(b.nom_disp || "", "fr");
    if (cmpNom !== 0) return cmpNom;
    return (a.prenom || "").localeCompare(b.prenom || "", "fr");
  });
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status} pour ${url}`);
  }
  return response.json();
}

function processDatas(partitions, etudiants) {
  console.log("Partitions chargées:", partitions);
  console.log("Étudiants chargés:", etudiants);
  afficher(partitions);

  function afficher(data) {
    const main = document.querySelector("main");
    Object.values(data).forEach((partition) => {
      const groupes = partition.groups ? Object.values(partition.groups) : [];
      groupes.forEach((groupe) => {
        main.appendChild(template_groupe(groupe));
      });
    });
  }

  /* Dès qu'on a besoin d'ajouter un groupe, on peut alors utiliser cette fonction */

  function template_groupe(groupe) {
    // Création du conteneur
    let div = document.createElement("div");

    // Ajout des attributs
    div.className = "groupe";
    div.dataset.idgroupe = groupe.id; // DATASET - voir ci-dessous

    // Insertion du contenu
    div.innerHTML = `
            <span class="editing move">||</span>
            <span>${groupe.group_name}</span>
            <span class="editing modif">✏️</span>
            <span class="editing suppr">❌</span>`;

    // Gestion des événements (stubs pour éviter les erreurs)
    div.addEventListener("click", (e) => filtre(e));
    div.querySelector(".move").addEventListener("mousedown", (e) => moveStart(e));
    div.querySelector(".modif").addEventListener("click", (e) => editText(e));
    div.querySelector(".suppr").addEventListener("click", (e) => suppr(e));

    // Renvoie du conteneur
    return div;
  }
}
