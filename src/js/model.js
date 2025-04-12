class Model {
    constructor() {
        this.todos = [];
    }

    get getToDos() {
        return this.todos;
    }

    addToDo(text) {
        const todo = {
            id: this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1,
            text: text,
            completed: false
        };
        this.todos.push(todo);
        this.pushToDos(this.todos);
    }

    deleteToDo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.pushToDos(this.todos);
    }

    editTodo(id, newText, completed) {
        this.todos = this.todos.map(todo => 
            todo.id === id ? { ...todo, text: newText, completed } : todo
        );
        this.pushToDos(this.todos);
    }

    bindToDoListChanged(handler) {
        this.onToDoListChanged = handler;
    }

    pushToDos(todos) {
        this.onToDoListChanged(todos);
    }
}

export { Model };