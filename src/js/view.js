class View {
    constructor() {
        this.form = document.querySelector(".to-do-form");
        this.input = document.querySelector(".form-input");
        this.toDoList = document.querySelector(".to-do-list");
        this.currentEditingText ="";
        this.onEditListner();
    }
    get toDoText() {
        return this.input.value; //form-input
    }
    onEditListner(){
        this.toDoList.addEventListener("input", (event) => {
            if(event.target.classList.contains('editable')) {
                this.currentEditingText = event.target.innerText;
            }
            
        })
    }
    resetInput(){
        this.input.value ="";
    }

    createElement(tag, className) {
        const element = document.createElement(tag);

        if (className) element.classList.add(className);

        return element;
    }

    renderToDoList(toDoList) {
        this.toDoList.replaceChildren();
    
        if (!toDoList?.length) {
            const emptyListText = this.createElement("p", "empty-list");
            emptyListText.textContent = "Нет задач";
            this.toDoList.appendChild(emptyListText);
        } else {
            const updatedToDoList = toDoList.map((listItem) => {
                const toDoItem = this.createElement("div", "list-item");
                toDoItem.id = listItem.id;
    
                const toDoItemCheckbox = this.createElement("input", "list-item_checkbox");
                toDoItemCheckbox.type = "checkbox";
                toDoItemCheckbox.checked = listItem.completed;
    
                const toDoItemText = this.createElement("span", "list-item_text");
                toDoItemText.textContent = listItem.text;
                toDoItemText.classList.add("editable");
    
              
                if (listItem.completed) {
                    toDoItemText.classList.add("completed");
                } else {
                    toDoItemText.classList.remove("completed");
                }
    
                const deleteBth = this.createElement("button", "list-item_button");
                deleteBth.classList.add("delete");
                deleteBth.textContent = "Удалить";
    
                const editButton = this.createElement("button", "list-item_button");
                editButton.classList.add("edit");
                editButton.textContent = "Редактировать";
    
                const saveButton = this.createElement("button", "list-item_button");
                saveButton.classList.add("save");
                saveButton.textContent = "Сохранить";
                saveButton.style.display = "none";
    
                toDoItem.append(toDoItemCheckbox, toDoItemText, editButton, saveButton, deleteBth);
    
                return toDoItem;
            });
    
            this.toDoList.replaceChildren(...updatedToDoList);
        }
    }
    
    
    bindAdToDo(handler){
        this.form.addEventListener('submit', (event)=>{
            event.preventDefault(); // без перезагрузки
            if (this.toDoText){
                handler(this.toDoText);
                this.resetInput();
            }

        })
    }
    bindDelete(handler){
        this.toDoList.addEventListener('click', (event)=> {
            if (event.target.classList.contains('delete')) {
                const id = Number(event.target.parentElement.id);

                handler(id);
            }
        });

    }
    bindCompleted(handler) {
        this.toDoList.addEventListener("click", (event) => {
            if (event.target.type === "checkbox") {
                const id = Number(event.target.parentElement.id);
                const textElement = event.target.parentElement.querySelector(".list-item_text");
                const newText = textElement.textContent; // Берем новый текст
    
                handler(id, newText);
            }
        });
    }
    

    bindEditToDo(handler) {
        this.toDoList.addEventListener("click", (event) => {
            if (event.target.classList.contains("edit")) {
                const toDoItem = event.target.parentElement;
                const taskText = toDoItem.querySelector(".list-item_text");
                const saveButton = toDoItem.querySelector(".save");

                 
                taskText.contentEditable = true;
                taskText.classList.add("editable");
                taskText.focus();

                 
                event.target.style.display = "none";
                saveButton.style.display = "inline-block";  

                saveButton.addEventListener("click", () => {
                    const newText = taskText.textContent.trim();
                    if (newText && newText !== taskText.textContent) {
                        handler(toDoItem.id, newText, toDoItem.querySelector(".list-item_checkbox").checked);  
                    }
                    taskText.contentEditable = false; // Отключаем редактирование
                    taskText.classList.remove("editable");
                    saveButton.style.display = "none"; // Скрываем кнопку "Сохранить"
                    event.target.style.display = "inline-block"; // Показываем кнопку "Редактировать"
                });
            }
        });
    }
}
export {View };