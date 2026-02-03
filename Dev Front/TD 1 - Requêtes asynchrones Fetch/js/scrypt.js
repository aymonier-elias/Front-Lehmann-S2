let dataContainer = document.getElementById("data");

async function fetchData() {
    let data = await fetch("../data.json");
    let json = await data.json();
    return json;
}

dataContainer.innerHTML = fetchData();
