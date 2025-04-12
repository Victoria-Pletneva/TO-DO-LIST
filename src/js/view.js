class View {
    constructor() {
        this.form = document.querySelector(".to-do-form");
        this.input = document.querySelector(".form-input");
        this.toDoList = document.querySelector(".to-do-list");
        this.currentEditingText = "";
    }

    get toDoText() {
        return this.input.value;
    }

    resetInput() {
        this.input.value = "";
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

    renderToDoList(toDoList) {
        this.toDoList.innerHTML = "";
    
        if (!toDoList?.length) {
            const emptyListText = this.createElement("p", "empty-list");
            emptyListText.textContent = "Нет задач";
            this.toDoList.appendChild(emptyListText); //добавляем в контейнер
            return;
        }

        toDoList.forEach(listItem => {
            const toDoItem = this.createElement("div", "list-item");
            toDoItem.id = listItem.id;

            const checkbox = this.createElement("input", "list-item_checkbox");
            checkbox.type = "checkbox";
            checkbox.checked = listItem.completed;

            const textElement = this.createElement("span", "list-item_text"); //отображение
            textElement.textContent = listItem.text;
            textElement.contentEditable = false;
            
            if (listItem.completed) {
                textElement.classList.add("completed");
            } else {
                textElement.classList.remove("completed");
            }
    
            const deleteBtn = this.createElement("button", "list-item_button");
            deleteBtn.classList.add("delete");
            deleteBtn.textContent = "Удалить";
    
            const editBtn = this.createElement("button", "list-item_button");
            editBtn.classList.add("edit");
            editBtn.textContent = "Редактировать";
    
            const saveBtn = this.createElement("button", "list-item_button");
            saveBtn.classList.add("save");
            saveBtn.textContent = "Сохранить";
            saveBtn.style.display = "none";
    
            toDoItem.append(checkbox, textElement, editBtn, saveBtn, deleteBtn);
            this.toDoList.appendChild(toDoItem);
        });
    }

    bindAddToDo(handler) { //добавление задачи
        this.form.addEventListener('submit', (event) => {
            event.preventDefault(); //не перезагружаем страницу
            if (this.toDoText.trim()) { //строка не пустая
                handler(this.toDoText);
                this.resetInput();
            }
        });
    }

    bindDelete(handler) {
        this.toDoList.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete')) {
                const id = Number(event.target.closest('.list-item').id);
                handler(id);
            }
        });
    }

    bindCompleted(handler) {
        this.toDoList.addEventListener("change", (event) => { //изменение состояния
            if (event.target.classList.contains("list-item_checkbox")) {
                const item = event.target.closest(".list-item");
                const id = Number(item.id);
                const textElement = item.querySelector(".list-item_text"); //получение текста
                const completed = event.target.checked;

                // Обновляем визуальное состояние
                textElement.classList.toggle("completed", completed);
                item.dataset.completed = completed;
                
                // Сохраняем изменения
                handler(id, textElement.textContent, completed);
            }
        });
    }

    bindEditToDo(handler) {
        this.toDoList.addEventListener("click", (event) => {
            if (event.target.classList.contains("edit")) {
                const item = event.target.closest(".list-item");
                const textElement = item.querySelector(".list-item_text");
                const checkbox = item.querySelector(".list-item_checkbox");
                const editBtn = event.target;
                const saveBtn = item.querySelector(".save");

                //сохранить исходные значения
                const originalText = textElement.textContent;
                const originalCompleted = checkbox.checked;

                //включить режим редактирования
                textElement.contentEditable = true;
                textElement.focus();
                editBtn.style.display = "none";
                saveBtn.style.display = "inline-block";

                const finishEditing = () => {
                    const newText = textElement.textContent.trim();
                    const currentCompleted = checkbox.checked;

                    if (newText) {
                        handler(Number(item.id), newText, currentCompleted);
                    } else {
                        // Если текст пустой, восстанавливаем оригинал
                        textElement.textContent = originalText;
                        checkbox.checked = originalCompleted;
                        textElement.classList.toggle("completed", originalCompleted);
                        item.dataset.completed = originalCompleted;
                    }

                    // Выключаем режим редактирования
                    textElement.contentEditable = false;
                    editBtn.style.display = "inline-block";
                    saveBtn.style.display = "none";
                    
                    // Удаляем обработчики
                    saveBtn.removeEventListener("click", finishEditing);
                    textElement.removeEventListener("blur", finishEditing);
                };

                saveBtn.addEventListener("click", finishEditing);
                textElement.addEventListener("blur", finishEditing);
            }
        });
    }
}
export { View };