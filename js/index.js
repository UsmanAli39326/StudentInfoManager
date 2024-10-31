const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
let studentArray = localStorage.getItem('studentArray') ? JSON.parse(localStorage.getItem('studentArray')) : [];
let filterArray = [...studentArray];
const filterbutton = document.getElementById("filterbutton");
const filterinput = document.getElementById("filterinput");

addBtn.onclick = function () {
    window.open("input.html", "_blank", 'width=1920,height=1080,toolbar=no,scrollbars=no');
};

window.addEventListener('storage', (event) => {
    if (event.key === 'studentArray') {
        studentArray = JSON.parse(event.newValue);

        tableBody.innerHTML = "";
        studentArray.forEach(element => {
            addRow(element);
        });
    }
});

const addRow = function (person) {
    const row = document.createElement("tr");
    row.setAttribute('data-index', tableBody.children.length);
    row.classList.add('odd:bg-gray-900', 'even:bg-gray-800', 'border-b', 'border-gray-700');

    const headingCell = document.createElement("th");
    headingCell.classList.add('px-6', 'py-4', 'font-medium', 'text-white', 'whitespace-nowrap');
    headingCell.innerText = person.roll;

    const nameCell = document.createElement("td");
    nameCell.classList.add("py-4", "px-6");
    nameCell.innerText = `${person.fname} ${person.lname}`;

    const fatherCell = document.createElement("td");
    fatherCell.classList.add("py-4", "px-6");
    fatherCell.innerText = `${person.ffname} ${person.flname}`;

    const phoneCell = document.createElement("td");
    phoneCell.classList.add("py-4", "px-6");
    phoneCell.innerText = `${person.phone}`;

    const emailCell = document.createElement("td");
    emailCell.classList.add("py-4", "px-6");
    emailCell.innerText = `${person.email}`;

    const actionCell = document.createElement("td");
    actionCell.classList.add("py-4", "px-6");

    const viewBtn = document.createElement("button");
    viewBtn.classList.add('text-white', 'bg-blue-700', 'hover:bg-blue-800', 'focus:ring-4', 'focus:ring-blue-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'me-2', 'mb-2', 'view');
    viewBtn.innerText = "View";
    viewBtn.onclick = function () {
        window.open("view.html", "_blank", 'width=1920,height=1080,toolbar=no,scrollbars=no');
        localStorage.setItem("viewObject", JSON.stringify(person));
    };

    const editBtn = document.createElement("button");
    editBtn.classList.add('text-white', 'bg-green-700', 'hover:bg-green-800', 'focus:ring-4', 'focus:ring-green-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'me-2', 'mb-2', 'edit');
    editBtn.innerText = "Edit";

    editBtn.onclick = function () {
        localStorage.setItem("EditingObject", JSON.stringify(person));
        
        const currentIndex = parseInt(row.getAttribute('data-index'));
        window.open("input.html", "_blank", 'width=1920,height=1080,toolbar=no,scrollbars=no');

        if(localStorage.getItem(EditingObject)){
            alert("Edit not complete: please try again");
            localStorage.removeItem("EditingObject");
        }else{
            studentArray.splice(currentIndex, 1);
            localStorage.setItem("studentArray", JSON.stringify(studentArray));
        }
        tableBody.innerHTML = ""; 
        studentArray.forEach(element => addRow(element));
    };
    
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add('text-white', 'bg-red-700', 'hover:bg-red-800', 'focus:ring-4', 'focus:ring-red-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'me-2', 'mb-2', 'delete');
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = function () {
        const currentIndex = parseInt(row.getAttribute('data-index'));
        studentArray.splice(currentIndex, 1);

        localStorage.setItem("studentArray", JSON.stringify(studentArray));
        tableBody.innerHTML = ""; 
        studentArray.forEach(element => addRow(element));
    };

    row.appendChild(headingCell);
    row.appendChild(nameCell);
    row.appendChild(fatherCell);
    row.appendChild(phoneCell);
    row.appendChild(emailCell);

    actionCell.appendChild(viewBtn);
    actionCell.appendChild(editBtn);
    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
};

    filterbutton.addEventListener("click",()=>{
        console.log(filterbutton);
        filterinput.classList.toggle("hidden");
        filterinput.classList.toggle("flex");
    })

    filterinput.querySelectorAll("input").forEach((element) => {
        element.addEventListener("input", (e) => {
            if (e.target.value) {
                console.log(e.target);
                const str = String(e.target.value).toLowerCase();
                const key = e.target.dataset.key;
    
                filterArray = filterArray.filter(item => item[key].toLowerCase().includes(str) );
    
                tableBody.innerHTML = "";
    
                filterArray.forEach(item => addRow(item));
            }
        });
    });

document.addEventListener("DOMContentLoaded", () => {
    if (!studentArray.length) {
        return;
    }
    
    studentArray.forEach(element => {
        addRow(element);
    });
});