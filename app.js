

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
    document.querySelector('.todo-list').classList.toggle('dark');
    menu.classList.toggle('dark');

})


// LIST

let todos = []
let elem = null;

function isBefore(el1, el2){
    for(
        let cur = el1.previousSibling;
        cur && cur.nodeType != 9;
        cur = cur.previousSibling
    )

    if(cur === el2) return true;
    return false;
};

todoInput.addEventListener('keyup', function(e){

    if(todoInput.value == ""){    
    }

    else if(e.key === "Enter" || e.keyCode === 13){
        todos.push(e.target.value);
        newTodo(e.target.value);
        menu.style.display = "flex";
        todoInput.value = "";
        itemsLeft(+1);  
    }

});


function newTodo(value){

    const todo = document.createElement("div");
    const circlesOnList = document.createElement("div");
    const todoInputList = document.createElement("input");
    const todoLabel = document.createElement("label");
    const todoCross = document.createElement("span");

    document.querySelector('.todo-list').appendChild(todo);
    todo.classList.add('todos');
    todo.appendChild(circlesOnList);
    circlesOnList.classList.add('circle')
    circlesOnList.addEventListener('click', () =>{
            circlesOnList.classList.toggle('circle-active');
            todoLabel.classList.toggle('active');
            if(todoInputList.checked){
                todoInputList.checked = false;
                itemsLeft(+1);
            }
            else {
                todoInputList.checked = true;
                itemsLeft(-1);
            }
        });


    todo.appendChild(todoInputList);
    todoInputList.classList.add('todo-input-list');
    todoInputList.type = "checkbox";
    todoInputList.name = "checkbox";
    
    
    todo.appendChild(todoLabel);
    todoLabel.classList.add('label')
    todoLabel.htmlFor = "checkbox";
    todoLabel.innerHTML = value;
    todoLabel.addEventListener('click', ()=>{
        circlesOnList.classList.toggle('circle-active');
        todoLabel.classList.toggle('active');
        if(todoInputList.checked){
            todoInputList.checked = false;
            itemsLeft(+1);
        }
        else {
            todoInputList.checked = true;
            itemsLeft(-1);
        }
    });


    todo.appendChild(todoCross);
    todoCross.textContent = '';
    todoCross.addEventListener('click', (e) =>{
        if(todoInputList.checked == true){
            e.target.parentElement.remove();
        } 
        else{
            itemsLeft(-1);
            e.target.parentElement.remove();
        }
    });
    
    modeBtn.addEventListener('click', () => {
        todoLabel.classList.toggle('dark');
        todoCross.classList.toggle('dark');
    
    });

// DRAG N DROP
    
    todo.draggable = true,
    todo.addEventListener('dragstart', (e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", null);
        elem = e.target;
    });
    todo.addEventListener('dragover', (e) => {
        let el1;
        e.preventDefault();
        if(e.target.classList.contains("todos")){
            el1 = e.target;
        }
        else{
            el1 = e.target.parentElement;
        }
        if(isBefore(elem, el1)){
            el1.parentNode.insertBefore(elem, el1);
        }
        else{
            el1.parentNode.insertBefore(elem, el1.nextSibling);

        }
    });
    todo.addEventListener('dragend', () => {
        elem = null;
        let index = todos.findIndex((t) => t.value === value);
        todos.splice(index, 1);
        if(todo.nextSibling){
            let index1 = todos.findIndex(
                (t) => t.value === todo.nextSibling.querySelector('label').textContent
            );
            todos.splice(index1, 0, {
                value : value,
                checked: todo.querySelector('input').checked,
            });
        }
        else{
            todos.push({
                value: value,
                checked: todo.querySelector('input').checked,
            });
        }
    });

    // MENU

    document.getElementById('all').addEventListener('click', () => {
        todoInputList.parentElement.style.display = 'flex';
        document.getElementById('all').classList.add('blue');
        document.getElementById('active').classList.remove('blue');
        document.getElementById('completed').classList.remove('blue');
    })

    document.getElementById('clear').addEventListener('click', () => {
        if(todoInputList.checked){
            todoInputList.parentElement.remove();
        }
        else{
            return todoInputList;
        }
    });

    document.getElementById('active').addEventListener('click', () => {
        document.getElementById('all').classList.remove('blue');
        document.getElementById('active').classList.add('blue');
        document.getElementById('completed').classList.remove('blue');
        if(todoInputList.checked){
            todoInputList.parentElement.style.display = 'none';
        }
        else if(todoInputList.checked == false){
            todoInputList.parentElement.style.display = 'flex';
        }
    });

    document.getElementById('completed').addEventListener('click', () => {
        document.getElementById('all').classList.remove('blue');
        document.getElementById('active').classList.remove('blue');
        document.getElementById('completed').classList.add('blue');
        if(todoInputList.checked == false){
            todoInputList.parentElement.style.display = 'none';
        }
        else if(todoInputList.checked){
            todoInputList.parentElement.style.display = 'flex';
        }
    });


};


// ITEMS LEFT

let menu = document.querySelector('.menu');
let itemsLeftText = document.getElementById('items-left');
let itemsNumber = document.querySelectorAll('.todos');
let itemsLeftNumber = 0

function itemsLeft(value){
    itemsLeftNumber += value;
    if(itemsLeftNumber == 1){
        itemsLeftText.innerText = itemsLeftNumber + ' item left';
    }
    else{
        itemsLeftText.innerText = itemsLeftNumber + ' items left';
    }

    document.querySelector('span').addEventListener('click', () => {
        if(itemsLeftNumber == 0){
            menu.style.display = 'none';
        }
    });

    document.getElementById('clear').addEventListener('click', () =>{
        if(itemsLeftNumber == 0){
            menu.style.display = 'none';
        }
    })

};

