import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://to-do-list-7bb3a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const dataBase = getDatabase(app)
const todoitemsInDB = ref(dataBase, "To-Do-List")

const inputField = document.getElementById("input-field")
const addToListBtn = document.getElementById('addToListBtn')
//const todoArea = document.getElementById('to-do-area')
const todoItems = document.getElementById("to-do-items")

onValue(todoitemsInDB, function(snapshot){
    if(snapshot.exists()) {
        let todoItemsArray = Object.entries(snapshot.val())

        clearToDoItems()

        for (let i = 0; i < todoItemsArray.length; i++){
            let currentToDoItems = todoItemsArray[i]
            let currentToDoItemsID = currentToDoItems[0]
            let currentToDoItemsValue = currentToDoItems[1]

            appendToDoItems(currentToDoItems)
        } 
    } else {
        todoItems.innerHTML = "Nothing to do!"
    }
})

function appendToDoItems(toDoItem){
    let toDoItemID = toDoItem[0]
    let toDoItemValue = toDoItem[1]

    //clearToDoArea()

    let newItem = document.createElement("li")

    newItem.innerHTML = toDoItemValue

    newItem.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(dataBase, `To-Do-List/${toDoItemID}`)

        remove(exactLocationOfItemInDB)
    })

    todoItems.append(newItem)
}

addToListBtn.addEventListener("click", function(){
    let inputValue = inputField.value 

    push(todoitemsInDB, inputValue)

    clearInputField()

})

function clearInputField(){
    inputField.value = ""
}

function clearToDoItems(){
    todoItems.innerHTML = ""
}