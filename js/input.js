const ProfilePictureInput = document.getElementById("profile-pic");
const ProfilePictureDisplay = document.getElementById("profile-display");

let base64 = "";
const fileReader = new FileReader();
fileReader.onload = (e) => {
    base64 = e.target.result;
    console.log(base64);
    ProfilePictureDisplay.src = String(base64);
};

ProfilePictureInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        fileReader.readAsDataURL(file);
    }
});

const EditingObject = localStorage.getItem("EditingObject") ? JSON.parse(localStorage.getItem("EditingObject")) : null;
if (EditingObject) {
    document.getElementById("profile-display").src = String(EditingObject.picture)

    for (const key in EditingObject) {
        const element = document.querySelector(`#${key}`);
        if (element) {
            if (key === 'picture') {
                element.src = EditingObject[key];
            } else if (key === 'favorite-color') {
                element.style.backgroundColor = EditingObject[key];
                element.value = EditingObject[key];
            }else if(key === 'comments') {
                element.querySelector("p").innerHTML = EditingObject[key];
                console.log(element.querySelector("p"))
                console.log(EditingObject[key])
            }
             else {
                element.value = EditingObject[key];
            }
        }
    }
    document.getElementById("submit").innerText = "Update"
}

// Managing multiselect
function getSelectedValues(selector) {
    const selectElement = document.getElementById(`${selector}`);
    const selectedValues = Array.from(selectElement.selectedOptions).map(option => option.value.trim());
    console.log('Selected courses:', selectedValues);
    return selectedValues.join(",");
}

// Creating object to store information
const person = {};
const allInputs = document.querySelectorAll(".inputs");
const form = document.getElementById("form");

const formsubmission = function () {
    allInputs.forEach(element => {
        person[element.id] = element.value || null;
    });

    person.gender = document.querySelector("input[name='gender']:checked")?.value || null;
    person.picture = String(base64);
    person.comments = document.querySelector("#comments p")?.innerHTML || "";
    person.courses = getSelectedValues("courses");
    person.interests = getSelectedValues("interests");
    
    if (!localStorage.getItem("studentArray")) {
        localStorage.setItem("studentArray", JSON.stringify([]));
    }
    
    const newarr = JSON.parse(localStorage.getItem("studentArray"));
    newarr.push(person);
    localStorage.setItem("studentArray", JSON.stringify(newarr));
    console.log(person);
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    formsubmission();

    if(EditingObject){
        localStorage.removeItem("EditingObject");
    }
    window.close();
});