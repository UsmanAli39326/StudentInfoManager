const displayObject = JSON.parse(localStorage.getItem("viewObject"))

for (const key in displayObject) {
    const element = document.getElementById(key);
    if (element) {
        if (key === 'picture') {
            element.src = displayObject[key];
        } else if (key === 'favorite-color') {
            element.style.backgroundColor = displayObject[key];
            element.innerText = displayObject[key];
            document.querySelectorAll("h2").forEach(e=>{
                e.style.backgroundColor = displayObject[key];
            })
        } else {
            element.innerHTML = displayObject[key];
        }
    }
}