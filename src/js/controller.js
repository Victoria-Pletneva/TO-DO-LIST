class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;

        this.model.bindToDoListChanged(this.handleChangeToDos);
        this.view.bindAddToDo(this.handleAddToDo);
        this.view.bindDelete(this.handleDeleteToDo);
        this.view.bindCompleted(this.handleToggleCompleted);
        this.view.bindEditToDo(this.handleEditToDo);

        this.handleChangeToDos(this.model.getToDos);
    }

    handleChangeToDos = (todos) => {
        this.view.renderToDoList(todos);
    };
    
    handleEditToDo = (id, newText, completed) => {   
        this.model.editTodo(id, newText, completed);
    };
    
    handleDeleteToDo = (id) => {
        this.model.deleteToDo(id);
    };
    
    handleToggleCompleted = (id, text, completed) => {   
        this.model.editTodo(id, text, completed);
    };

    handleAddToDo = (text) => {
        this.model.addToDo(text);
    };
}
export {Controller};