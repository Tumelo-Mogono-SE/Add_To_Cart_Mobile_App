ADD TO CART MOBILE APP

*The following project is a mobile app for adding items you need to buy in a cart. You simply type out the item you need inside the input field and click the add button to add it to a list. 
*To delete the item, you just double click the item you want to delete.

* This project was build using HTML, CSS, Javascript and Firebase for the database.

* Inside the Javascript, Firebase server libraries mobules are imported to be used to initialize the app and interact with the database at real time.

* A database URL for the database is assigned to a variable so that it can be used to initialize the app 

* Once the app is initialized, a database reference is assigned to a variable which will be used to create a node to access the database at real time.

* An event listener is added for a click which has a callback function which pushes the input field value to the database in real time and clears the inputfield using a function.

* An onValue function is used to listen and react to changes to the database node with a function which has a condition checking if the database has data inside, if it does it converts the object insdie the database into an array and clears the unorganized list and runs a loop which will print the array value inside the unorganized list using a function called.

* SAnother function is used to create a new element which is a list which will have content which is the array value from the parameter and this list element is inserted inside the unorganized list. The function also had an event listener for the new list element for which when double clicked it references the array key inside the database node in the database and then removes the list using the key.
