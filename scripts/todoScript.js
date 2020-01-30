var todoList = {
  todos: [],
    
  todoDisplayMode: 1, 
    
  addTodos: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },

  changeTodos: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },

  deleteTodos: function(position) {
    this.todos.splice(position, 1);
  },

  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },

  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
      //Check for how many todos are completed
    this.todos.forEach (function(item) { 
      if (item.completed === true) {
        completedTodos++;
      }
    })
      //If all the todos are completed
    if (totalTodos === completedTodos) {
      this.todos.forEach (function(item) {
        item.completed = false;
      })
    }
      //If all todos are not completed
    else {
      this.todos.forEach (function(item) {
        item.completed = true;
      })
    }
  },
    
    clearAllCompleted: function() {  
        for (var i = this.todos.length - 1; i >= 0; --i) {
            if (this.todos[i].completed === true) {
                this.deleteTodos(i);
            }
        }
    },
    
    //Sets up view.displaytodos to display all items
    setDisplayModeAll: function() {
        this.todoDisplayMode = 1;   
    },
    
    //display incomplete items only
    setDisplayModeActive: function() {
        this.todoDisplayMode = 2;
    },
    
    //displays completed items only
    setDisplayModeCompleted: function() {
        this.todoDisplayMode = 3;
    }
};

//Handlers for HTML button that are routed here 
var handlers = {
    
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    },
    
    addTodos: function(addTodosTextInput) {
        todoList.addTodos(addTodosTextInput);
        var addTodosTextInputValue = document.getElementById('addTodosTextInput');
        addTodosTextInputValue.value = '';
        view.displayTodos();
    },
    
    changeTodos: function(position, todosText) {
        todoList.changeTodos(position, todosText);
        view.displayTodos();
    },
    
    deleteTodos: function(position) {
        todoList.deleteTodos(position);
        view.displayTodos();
    },
    
   toggleCompleted: function(position) {
        todoList.toggleCompleted(position);
        view.displayTodos();
   },
    
    clearAllCompleted: function() {
        todoList.clearAllCompleted();
        view.displayTodos();
    },
    
    setDisplayModeAll: function() {
        todoList.setDisplayModeAll();
        view.displayTodos();
    },
    
    setDisplayModeActive: function() {
        todoList.setDisplayModeActive();
        view.displayTodos();
    },
    
    setDisplayModeCompleted: function() {
        todoList.setDisplayModeCompleted();
        view.displayTodos();
    }
};

var view = { 
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        var todos = todoList.todos;

        todos.forEach(function(item, position){
            var todosLi = document.createElement('li');
            var todoTextWithCompletion = item.todoText;

            //Creates and appends delete button, text box, check box and appends to the container
            var todosDivElement = view.createDivElement();
            var checkIconContainer = view.createCheckIconContainer();
            todosDivElement.id = position;
            todosDivElement.className = 'div';
            todosDivElement.appendChild(checkIconContainer);
            checkIconContainer.appendChild(view.createCheckIcon());
            var todosTextBox = todosDivElement.appendChild(view.createTextBox());
            todosTextBox.textContent = todoTextWithCompletion;
            todosDivElement.appendChild(view.createDeleteButton());
            todosLi.appendChild(todosDivElement);
            todosUl.appendChild(todosLi);
        })
        var divElement = document.getElementsByClassName('div');
        if (todoList.todoDisplayMode === 2) {
            for (var i = 0; i < todoList.todos.length; i++) {
                if (todoList.todos[i].completed === true) {
                    divElement[i].style.display = 'none';
                } else {
                    divElement[i].style.display = '';
                }
            }
        }
        if (todoList.todoDisplayMode === 3) {
            for (var i = 0; i < todoList.todos.length; i++) {
                if (todoList.todos[i].completed === false) {
                    divElement[i].style.display = 'none';
                } else {
                    divElement[i].style.display = '';
                }
            }
        }
    
        //Counter showing how many items left 
        var counter = document.getElementById('counter');
        var incompleteTodos = 0;
        var counterText = '';
        todoList.todos.forEach(function(item){
            if (item.completed === false) {
                incompleteTodos++
            }
        })
       
        if (todoList.todos.length === 1) {
            counterText = incompleteTodos + ' item left';
            }
        else {
            counterText = incompleteTodos + ' items left';
        }
        counter.textContent = counterText;
        
        view.cssStylers(); //Run the conditional styler everytime an update is made
    },
    
    createDivElement: function() {
        var divElement = document.createElement('div');
        return divElement;
    },
    
    createCheckIconContainer: function() {
        var checkIconContainer = document.createElement('span');
        checkIconContainer.setAttribute('class', 'CheckIconContainer');
        todoList.todos.forEach(function(item, position){
            checkIconContainer.id = ('checkiconcontainer' + position)
        })
        return checkIconContainer;
    },
    
    createCheckIcon: function() {
        var checkIcon = document.createElement('i');
        checkIcon.setAttribute('class', 'icon-ok-3');
        return checkIcon;
    },
    
    createTextBox: function() {
        var textBox = document.createElement('Textarea');
        textBox.setAttribute('maxlength', '180');
        textBox.className = 'TextBox';
        todoList.todos.forEach(function(item, position){
           textBox.id = ('textbox' + position);
       })
        return textBox;
    },
    
    createDeleteButton: function() {
        var deleteButton = document.createElement('span');
        deleteButton.textContent = 'X'
        deleteButton.className = 'DeleteButton';
        return deleteButton;
    
    },
      
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) {
            var elementClicked = event.target;
            if (elementClicked.className === 'DeleteButton')  {
               handlers.deleteTodos(parseInt(elementClicked.parentNode.id));
            }
            if (elementClicked.className === 'CheckIconContainer') {
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }
            if (elementClicked.className === 'icon-ok-3') {
                handlers.toggleCompleted(parseInt(elementClicked.parentElement.parentNode.id));
            }
        });
        todosUl.addEventListener('keyup', function(event){
            var elementPressed = event.target;
            if (elementPressed.className === 'TextBox') {
                if (event.which === 13) {
                    handlers.changeTodos(parseInt(elementPressed.parentNode.id), elementPressed.value);
                }
            }
        })
        var addTodosTextInput = document.getElementById('addTodosTextInput');
        addTodosTextInput.addEventListener('keyup', function(event){
            var elementPressed = event.target;
            if (event.which === 13) {
                handlers.addTodos(elementPressed.value);
                var elementPressed = event.target;
                event.preventDefault();
            }
        })
    }, 
    
    cssStylers: function() {
        //Leaves only add todos text bar before an item is added
        var bottomMenu = document.getElementById('menucontainer');
        var toggleAllCheckBox = document.getElementById('checkboxicon');
        if (todoList.todos.length === 0) {
            bottomMenu.style.display = 'none';
            toggleAllCheckBox.style.opacity = '0';
            checkboxicon
        } else {
            bottomMenu.style.display = '';
            toggleAllCheckBox.style.opacity = '';
        }
        // Sets todolist item to automatically expand and resize 
        var tx = document.getElementsByClassName('TextBox');
        for (var i = 0; i < tx.length; i++) {
              tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
              tx[i].addEventListener("input", OnInput, false);  
              tx[i].addEventListener('keypress', function(event){
                if (event.which === 13) {
                    event.preventDefault();
                 }        
            })
        }
        function OnInput () {
          this.style.height = 'auto';
          this.style.height = (this.scrollHeight) + 'px';
        }
        //Sets 'Clear All Completed' to only appear when there are completed items
        var clearAll = document.getElementById('clearAll');
        var completedTodos = 0;
        todoList.todos.forEach(function(item) {
            if (item.completed === true) {
                completedTodos++
            }
        })
        if (completedTodos === 0) {
            clearAll.style.opacity = '0';
            clearAll.disabled = true;
        }
        else {
            clearAll.style.opacity = '';
            clearAll.disabled = false;
        }
        
        //Styles text and checkmark according to completed and active states
        var check = document.getElementsByClassName('CheckIconContainer');
        for (var i = 0; i < check.length; i++) {
            if (todoList.todos[i].completed === true) {
                check[i].style.color = '#2ed573';
                tx[i].style.color = '#ced6e0';
                tx[i].style.textDecoration = 'line-through';
            } else {
                check[i].style.color = '';
                tx[i].style.color = '';
                tx[i].style.textDecoration = '';
            }
        }    
            
    }
};



view.setUpEventListeners();
view.displayTodos();
view.cssStylers();

 



