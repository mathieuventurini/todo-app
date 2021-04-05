

// DARK MODE

let body = document.querySelector('.body');
let modeBtn = document.querySelector('.change-mode-btn');
let bgImg = document.querySelector('.background-img');
let mainTodo = document.querySelector('.todo');
let todoInput = document.querySelector('.todo-input');

modeBtn.addEventListener('click', () => {
    modeBtn.classList.toggle('darkmode-btn');
    body.classList.toggle('dark');
    bgImg.classList.toggle('dark');
    mainTodo.classList.toggle('dark');
    todoInput.classList.toggle('dark');
})


// LIST

let menu = document.querySelector('.menu');
const todos = []


todoInput.addEventListener('keyup', function(e){

    if(todoInput.value == ""){    
    }

    else if(e.key === "Enter" || e.keyCode === 13){
        todos.push(e.target.value);
        newTodo(e.target.value);
        menu.style.display = "flex";
        todoInput.value = "";
        itemsLeft();
        console.log(todos);
        console.log(test);
    }

});



function newTodo(value){

    const todo = document.createElement("div");
    const circlesOnList = document.createElement("div");
    const todoInputList = document.createElement("input");
    const todoCross = document.createElement("span");

    document.querySelector('.todo-list').appendChild(todo);
    todo.classList.add('todos');
    todo.appendChild(circlesOnList);
    circlesOnList.classList.add('circle')
    circlesOnList.addEventListener('click', () =>{
            circlesOnList.classList.toggle('circle-active');
            todoInputList.classList.toggle('active');
        });
    

    todo.appendChild(todoInputList);
    todoInputList.classList.add('todo-input');
    todoInputList.type = "text";
    todoInputList.value = value;
    


    todo.appendChild(todoCross);
    todoCross.textContent = 'X'
    todoCross.addEventListener('click', (e) =>{
        e.target.parentElement.remove();
    });

};

let itemsLeftText = document.getElementById('items-left');
let itemsNumber = document.querySelectorAll('.todos');

function itemsLeft(){
    if(todos.length === 1){
        itemsLeftText.innerHTML = "1 item left";
    }

    else {
        itemsLeftText.innerHTML = todos.length + ' items left';
    }
        


};