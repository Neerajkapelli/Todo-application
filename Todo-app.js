let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton=document.getElementById("saveTodoButton");

function getTodoListfromLocalStorage(){
    let stringifiedTodoList=localStorage.getItem("todoList");
    let parsedTodoList=JSON.parse(stringifiedTodoList);
    if(parsedTodoList===null){
        return [];
    }
    else{
        return parsedTodoList;
    }
}
let todoList = getTodoListfromLocalStorage();
let todosCount=todoList.length;
saveTodoButton.onclick=function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}
function todoStatusChange(checkboxId,labelId,todoId){
    let todoElementStatus=document.getElementById(checkboxId);
    let labelElementStatus=document.getElementById(labelId);
    labelElementStatus.classList.toggle("checked");
    let objectIndex=todoList.findIndex(function(eachTodo){
        let eachTodoId="todo"+eachTodo.uniqueNo;
        if(eachTodoId===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    let todoObject=todoList[objectIndex];
    if(todoObject.isChecked===true){
        todoObject.isChecked=false;
    }
    else{
        todoObject.isChecked=true;
    }
}
function deleteTodo(todoId){
    let todoDeleteElement=document.getElementById(todoId);
    todoItemsContainer.removeChild(todoDeleteElement);
    let todoDeleteIndex=todoList.findIndex(function(eachTodo){
        let eachTodoId="todo"+eachTodo.uniqueNo;
        if(eachTodoId===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    todoList.splice(todoDeleteIndex,1);
    console.log(todoList);
}
function createAndAppendTodo(todo) {
  let todoId = 'todo' + todo.uniqueNo;
  let checkboxId = 'checkbox' + todo.uniqueNo;
  let labelId = 'label' + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
    inputElement.checked=todo.isChecked;
  inputElement.classList.add("checkbox-input");
  inputElement.onclick=function(){
      todoStatusChange(checkboxId,labelId,todoId);
  };
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if(todo.isChecked===true){
      labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick=function(){
        deleteTodo(todoId);
    }
  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList){
    createAndAppendTodo(todo);
}
function onAddTodo(){
    let todoUserInput=document.getElementById("todoUserInput");
    let todoUserInputValue=todoUserInput.value;
    if(todoUserInputValue===''){
        alert("Enter valid input");
        return;
    }
    todosCount=todosCount+1;
    let newTodo={
        text:todoUserInputValue,
        uniqueNo:todosCount,
        isChecked:false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoUserInput.value="";
}
addTodoButton.onclick=function(){
    onAddTodo();
}
