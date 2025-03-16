class Model {
    constructor(){        //this.todos(id , text, completed)
        this.todos=[];

    }
    get getToDos(){
        return this.todos;
    }

    addToDo(toDoText) {
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1, 
            text: toDoText,
            completed: false
        };

        this.todos.push(todo); //конец массива
        this.pushToDos(this.todos); // View
    }

    deleteToDo(id){
        this.todos = this.todos.filter((todo) => todo.id !== id); //filter - оставить 
        this.pushToDos(this.todos);
    }

    toggleCompleted(id, newText) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed, text: newText } : todo
        );
        this.pushToDos(this.todos);
    }
    

    editTodo(id, newText) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
        );
        this.pushToDos(this.todos);
    }
    
    bindToDoListChanged(handler){
        this.onToDoListChanget = handler;
    }

    pushToDos(todos) {
        this.onToDoListChanget(todos);
    }
}

export{Model};