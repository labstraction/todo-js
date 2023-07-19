

let manager;

DBService.getAllTodos().then(todos => {
    manager = new Manager(todos);
    render();
})


function render(){
    
    const todoContainer=document.getElementById('todo-container'); 
    todoContainer.innerHTML= '';

    for (let i = 0; i < manager.todoArray.length; i++) {

        const todo = manager.todoArray[i];

        const div=document.createElement('div');
        div.classList.add('todo-card');

        if(todo.isCompleted){
            // div.classList.add('todo-completed');
            div.style.borderColor='lime';
        }

        const titleStrong=document.createElement('strong');
        const titleNode=document.createTextNode(todo.title);

        titleStrong.appendChild(titleNode);
        div.appendChild(titleStrong);
        
        const dateSpan=document.createElement('span');
        const dateNode=document.createTextNode(todo.creationDate.toISOString());

        dateSpan.appendChild(dateNode);
        div.appendChild(dateSpan);

        const completeBtn = document.createElement('button');
        const completeNode = document.createTextNode( todo.isCompleted ? 'da completare' : 'completato');
        completeBtn.addEventListener('click', () => {

            const modifiedTodo = {...todo};

            if (modifiedTodo.isCompleted === true) {
                modifiedTodo.isCompleted = false;
            } else {
                modifiedTodo.isCompleted = true;
            }

            // modifiedTodo.isCompleted = !modifiedTodo.isCompleted;

            DBService.updateTodo(modifiedTodo).then(res => {
                manager.changeCompleteStatus(i);
                render();
            })

            
            // StorageService.saveData(manager.todoArray);
            
        });
        // completeBtn.addEventListener('mouseover', () => div.style.borderWidth = '3px');
        // completeBtn.addEventListener('mouseleave', () => div.style.borderWidth = '1px');

        completeBtn.appendChild(completeNode);
        div.appendChild(completeBtn);


        const deleteBtn = document.createElement('button');
        const deleteNode = document.createTextNode('cancella');
        deleteBtn.addEventListener('click', () => {

            DBService.deleteTodo(todo.id).then(() => {
                manager.deleteTodo(i);
                render();
            });
            
            
            // StorageService.saveData(manager.todoArray);
            
        });
        // completeBtn.addEventListener('mouseover', () => div.style.borderWidth = '3px');
        // completeBtn.addEventListener('mouseleave', () => div.style.borderWidth = '1px');

        deleteBtn.appendChild(deleteNode);
        div.appendChild(deleteBtn);


        const detailBtn = document.createElement('button');
        const detailBtnNode = document.createTextNode('dettaglio');
        detailBtn.addEventListener('click', () => {
            sessionStorage.setItem('selectedTodo', JSON.stringify(todo));
            window.location.href = './detail.html';
        });
        // completeBtn.addEventListener('mouseover', () => div.style.borderWidth = '3px');
        // completeBtn.addEventListener('mouseleave', () => div.style.borderWidth = '1px');

        detailBtn.appendChild(detailBtnNode);
        div.appendChild(detailBtn);

        todoContainer.appendChild(div);
    }
}

// render();

// function render2(){

//     const todoContainer=document.getElementById('todo-container'); 
//     todoContainer.innerHTML= '';

//     for (let i = 0; i< manager.todoArray.length; i++)  {

//         const todo = manager.todoArray[i];

//         let additionalClass = '';
//         if (todo.isCompleted) {
//             additionalClass = 'todo-completed'
//         }
        
//         const template = `<div class="todo-card ${additionalClass}">
//                             <strong>${todo.title}</strong>
//                             <span>${todo.creationDate.toISOString()}</span>
//                             <button id="complete-btn${i}">completato</button>
//                           </div>`;
        
//         const template = `<div class="todo-card ${todo.isCompleted ? 'todo-completed' : ''}">
//                             <strong>${todo.title}</strong>
//                             <span>${todo.creationDate.toISOString()}</span>
//                           </div>`;

//         todoContainer.innerHTML += template;

//     }

//     for (let i = 0; i < manager.todoArray.length; i++) {
//         const todo = manager.todoArray[i];
//         const completeBtn = document.getElementById('complete-btn' + i);
//         completeBtn.addEventListener('click', () => {
//             todo.isCompleted = !todo.isCompleted;
//             render2();
//         });
   
//     }
// }

// render2();

function orderByTitle(){
    manager.orderTodosByTitle();
    render();
}

function orderByDate(){
    manager.orderTodosByDate();
    render();
}

///1) aggiungere il tasto cancella su ogni todo
///2) aggiungere la possibilità di aggiungere todo alla lista 
//////tramite una input e un bottone aggiungi 

function addTodo(){
    const input = document.getElementById('add-todo-input')
    const newTodoTitle = input.value;
    if(newTodoTitle.trim() !== ''){

        const newTodo = new Todo(newTodoTitle, false, new Date());

        DBService.saveTodo(newTodo).then(res => {
            manager.addTodo(res);
            input.value = '';
            render();
        })

        // const newTodo = new Todo(newTodoTitle);
        // manager.addTodo(newTodo);
        //manager.addTodoWithTitle(newTodoTitle);
        //StorageService.saveData(manager.todoArray);
        //input.value = '';
    }
    //render();

    // let inputValue = document.getElementById('add-todo-input').value;
    // if (inputValue.trim()) {
    //     manager.addTodoWithTitle(inputValue);
    //     document.getElementById('add-todo-input').value = '';
    // }
    // render();
}


function changeHeader(){
    document.querySelector('h1').innerHTML='lo sapevo che non avresti resistito!!!'
}
