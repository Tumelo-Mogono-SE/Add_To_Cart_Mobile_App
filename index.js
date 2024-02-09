//The following two lines of code import modules from Firebase server libraries which lets us interact with Firebase realtime database, allowing us to initialize the app and work and handle real time data.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//The appSettings variable contains an objects which specifies the database URL which will be used to iniliaze the app.
const appSettings = {
    databaseURL: "https://playground-10aac-default-rtdb.europe-west1.firebasedatabase.app/"
}

/* 
*Below the initializeApp function is used to initiazile the FireBase app with the provided database URL which is assigned to appSetting.
*The getDataBase function is used with the initiaziled app which returns a reference to Firebase realtime database
*The ref function assigned to shoppingListInDB is used to create a reference to shoppingList which is referenced to the fire base realtime database assigned to the database variable. 
*The shoppingListInDB will be used to push new data,listen for changes and remove data from the shoppingList in real time. */
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");


//The following three lines of code are used to access the elements in the DOM 
const addButtonEl = document.getElementById("add-button");
const inputFieldEl = document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");

//The code below create an event which listen for a click on the button which if clicked has a function which will take the value inside the input field and push it to the shoppingListInDB in real time. Than there is another function which is called to clear the input field.
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);
    clearInputFieldEl();
})
    
/*The code below uses an onValue function which listens to react to changes in the shoppingListInDB which is the database reference, with a callback function which has a condition which checks if a snapshot exist or not. 
*if it exist it converts the snapshot into an array assinging it to itemsArray and then clearing the shoppinglistEl(the unorganised list)
*Then a loop runs which will be used to get key/values inside the array from the database from the first key/value(0), until the last key/value inside the array increasing by one..
*The array key/value is assigned to a variable which will be passed as an argument inside the function which add the value only into a list element which will be inserted inside the unorganized list.
*If the database has nothing inside then the shoppingList (Unorganized list) will have a statement inside it showing "No items here... yet" */
onValue(shoppingListInDB, function(snapshot){
     if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val());
        
        clearShoppingListEl();
            
        for (let i = 0; i < itemsArray.length; i++){
             let currentItem = itemsArray[i];
             let currentItemID = currentItem[0];
              let currentItemValue = currentItem[1];
              appeandItemToShoppingListEl(currentItem);
            }
        } else {
            shoppingListEl.innerHTML = "No items here... yet";
        }
    })
    
//This is a fuction which will be used to clear the shoppingListEL by assigning an empty string to the unorginazed list
function clearShoppingListEl(){
    shoppingListEl.innerHTML = "";
}
    
// This function is used to assign an empty string to the value of the input element.   
function clearInputFieldEl(){
    inputFieldEl.value = "";
}

/*
*this function is used to create and insert new create a new list inside the unorganized list. The parameter of the function is used in a variable to get the value of an array and assign it to the new list element as content. 
*Inside the function there is an event listener for a double click for the new list elements, which when double clicked it locates the key of the array inside the databse using reference shoppingList in database and then removing that key in the database at real time. */
function appeandItemToShoppingListEl(item){
         
    let itemID = item[0];
    let itemValue = item[1]   
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
         
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        remove(exactLocationOfItemInDB);
    })
         
    shoppingListEl.append(newEl);
}
    
    
    
    
    
    
    //The code below works similar to the innerHtml/new.textContent code but differently.
    // let newEl = document.createElement("li");
    // newEl.appendChild(document.createTextNode(inputValue));
    //  shoppingListEl.appendChild(newEl);