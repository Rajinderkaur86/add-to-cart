import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL:"https://realtime-database-5beca-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


onValue(shoppingListInDB, function(snapshot){

if (snapshot.exists())   
{
    let shoppingListArray = Object.entries(snapshot.val())
   
   clearShoppingListEl()
    
    for (let i=0; i<shoppingListArray.length; i++){
    
   let currentItem = shoppingListArray[i]
   let currentItemID = currentItem[0]
   let currentItemValue = currentItem[1]
   appendShoppingItemToList(currentItem)
}
}
else{
    shoppingListEl.innerHTML = "No items here... yet"
    
}

})

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB,inputValue)
    
    clearInputField()
})

function clearInputField(){
    inputFieldEl.value = ""
}
function clearShoppingListEl(){
    shoppingListEl.innerHTML =""
}

function appendShoppingItemToList(item){
      let itemID = item[0]
      let itemValue = item[1]
    
    let listEl = document.createElement("li")
    listEl.textContent += item[1]
    shoppingListEl.append(listEl)
    
    let exactLocationOfIDsInDB = ref(database, `shoppingList/${itemID}`)
    
    listEl.addEventListener("dblclick", function(){
        remove(exactLocationOfIDsInDB)
    })
    
} 
