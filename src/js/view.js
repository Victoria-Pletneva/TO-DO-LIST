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
            this.toDoList.appendChild(emptyListText);
            return;
        }

        toDoList.forEach(listItem => {
            const toDoItem = this.createElement("div", "list-item");
            toDoItem.id = listItem.id;
    
            const checkbox = this.createElement("input", "list-item_checkbox");
            checkbox.type = "checkbox";
            checkbox.checked = listItem.completed;
    
            const textElement = this.createElement("span", "list-item_text");
            textElement.textContent = listItem.text;
            textElement.contentEditable = false;
            if (listItem.completed) {
                textElement.classList.add("completed");
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

    bindAddToDo(handler) {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this.toDoText.trim()) {
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
        this.toDoList.addEventListener('change', (event) => {
            if (event.target.classList.contains('list-item_checkbox')) {
                const item = event.target.closest('.list-item');
                const id = Number(item.id);
                const text = item.querySelector('.list-item_text').textContent;
                const completed = event.target.checked;
                
                // Обновляем стиль сразу
                item.querySelector('.list-item_text').classList.toggle('completed', completed);
                
                handler(id, text, completed);
            }
        });
    }

    bindEditToDo(handler) {
        this.toDoList.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit')) {
                const item = event.target.closest('.list-item');
                const textElement = item.querySelector('.list-item_text');
                const editBtn = event.target;
                const saveBtn = item.querySelector('.save');
                
                // Включаем редактирование
                textElement.contentEditable = true;
                textElement.focus();
                editBtn.style.display = 'none';
                saveBtn.style.display = 'inline-block';
                
                // Сохраняем исходный текст
                const originalText = textElement.textContent;
                
                const saveHandler = () => {
                    const newText = textElement.textContent.trim();
                    if (newText) {
                        const completed = item.querySelector('.list-item_checkbox').checked;
                        handler(Number(item.id), newText, completed);
                    } else {
                        textElement.textContent = originalText;
                    }
                    
                    // Отключаем редактирование
                    textElement.contentEditable = false;
                    saveBtn.style.display = 'none';
                    editBtn.style.display = 'inline-block';
                    
                    // Удаляем обработчики
                    saveBtn.removeEventListener('click', saveHandler);
                    textElement.removeEventListener('blur', saveHandler);
                };
                
                saveBtn.addEventListener('click', saveHandler);
                textElement.addEventListener('blur', saveHandler);
            }
        });
    }
}

export { View };