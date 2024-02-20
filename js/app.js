
let inputElem = document.getElementById('itemInput');
let addButton = document.getElementById('addButton');
let clearButton = document.getElementById('clearButton');
let todoList = document.getElementById('todoList');

let todoArray = []

function addNewTodo(){

    let newTodoTitle = inputElem.value

    let newTodosObj = {
        id: todoArray.length +1,
        title: newTodoTitle,
        complete: false
    }
    todoArray.push(newTodosObj);
    setLocalStorage1(todoArray);
    todoGenerator(todoArray);
    inputElem.value = ''
    
}

function setLocalStorage1 (newTodo){
    localStorage.setItem('todos' , JSON.stringify(newTodo))
}

function todoGenerator(todosList){
    todoList.innerHTML = '';

    todosList.forEach(todo => {
    let newLi = document.createElement('li');
    newLi.className = "completed well";

    let newLable = document.createElement('label');
    newLable.innerHTML = todo.title

    let newcomleteBtn = document.createElement('button');
    newcomleteBtn.innerHTML = 'Complete'
    newcomleteBtn.className = "btn btn-success";
    newcomleteBtn.setAttribute('onclick' , 'editTodo(' + todo.id + ')')
    
    let newdeleteBtn = document.createElement('button');
    newdeleteBtn.innerHTML = 'Delete'
    newdeleteBtn.className = "btn btn-danger";
    newdeleteBtn.setAttribute('onclick' , 'removeItem('+ todo.id + ')')

    if(todo.complete){
        newcomleteBtn.innerHTML = 'UnComplete';
        newLi.className = "uncompleted well";
    }

    newLi.append(newLable, newcomleteBtn, newdeleteBtn)
    
    todoList.append(newLi)
    })
}

function editTodo(todoId){
    let localStorageTodo = JSON.parse(localStorage.getItem('todos'))
    todoArray = localStorageTodo

    todoArray.forEach((todo)=>{
        if(todo.id === todoId){
            todo.complete = !todo.complete
        }
    })
    setLocalStorage1(todoArray)
    todoGenerator(todoArray)
}

function removeItem(todoId){
    let localStorageTodo = JSON.parse(localStorage.getItem('todos'))
    todoArray = localStorageTodo

    let mainTodoIndex = todoArray.findIndex((todo)=>{
       return todo.id === todoId
    })

    todoArray.splice(mainTodoIndex, 1);
    setLocalStorage1(todoArray)
    todoGenerator(todoArray)
}

function getLocalStorage(){
    let localStorageTodo = JSON.parse(localStorage.getItem('todos'))

    if(localStorageTodo){
        todoArray = localStorageTodo
    }else{
        todoArray = []
    }

    todoGenerator(todoArray)

}

function clearTodoList(){
    todoArray = []
    todoGenerator(todoArray)
    localStorage.removeItem('todos')
}

window.addEventListener('load' , getLocalStorage)
addButton.addEventListener('click', addNewTodo)
clearButton.addEventListener('click' , clearTodoList)
inputElem.addEventListener('keydown' , function(event){
    if(event.code === 'Enter'){
        addNewTodo()
    }
})