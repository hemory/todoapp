const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names 
const CHECK = "fas fa-check-circle";
const UNCHECK = "far fa-circle";
const LINE_THROUGH = "lineThrough";

// variables
let LIST, id;

// get item from local storage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one on the list
    loadList(LIST); // load the lsit to teh user interface
}else {
    // if data is not empty
    LIST = [];
    id = 0;
}

// load items to user interface 

function loadList(array){
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// Show todays date
const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add todo function

function addToDo(toDo, id, done, trash) {

    if(trash){return; }

const DONE = done ? CHECK : UNCHECK; 
const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
               <i class="${DONE}" job="complete" id=${id}></i>
               <p class="text" ${LINE}>${toDo}</p>
               <i class="fas fa-trash-alt" job="delete" id="${id}"></i>
               </li>
             `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// add an item to the list using the enter key
document.addEventListener("keyup", function(event){
    if(event.keyCode ==13){
        const toDo = input.value;

        // if toDo is not empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            // add item to local storage / This code must be added everywhere we update our list array
localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value ="";
    }
});

// complete to do 
function completeToDo(element){
    element.classList.toggle('fas', 'fa-check-circle');
    element.classList.toggle('far', 'fa-circle');
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

// remove to do 
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

 // targer the items created dynamically

 list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
     }else if(elementJob == "delete"){
            removeToDo(element);
     } 

     // add item to local storage / This code must be added everywhere we update our list array
localStorage.setItem("TODO", JSON.stringify(LIST));
 });
