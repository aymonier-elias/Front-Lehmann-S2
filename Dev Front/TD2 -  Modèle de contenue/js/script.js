go();

function go() {
  let partitions = fetchData("partitions.json");
  let etudiants = fetchData("etudiants.json");

  processDatas(partitions, etudiants);
}
