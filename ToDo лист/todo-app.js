(function(){
    let listArray = [];
    let listName = ''
    function createAppTitle(title) {// создаём и возвращаем заголовок приложения
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
}
    function createTodoItemForm() { //создаём и возвращаем форму для создания дела
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group','mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn','btn-primary');
        button.textContent = 'Добавить дело';
        button.setAttribute('disabled', 'disabled');

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return{
            form,
            input,
            button,
        };
    } 

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }
    function createTodoItem(obj){
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        //Устанавливаем стили для элемента списка, а также для размещения кнопок
        //в его правой части с помощью flex
        item.classList.add('list-group-item','d-flex','justify-content-between','align-item-center');
        item.textContent = obj.name;

        buttonGroup.classList.add('btn-group','btn-group-sm');
        doneButton.classList.add('btn','btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn','btn-danger');
        deleteButton.textContent = 'Удалить';
        //вкладываем кнопки в отдельный элемент, чтобы они объединялись в один блок
        if(obj.done==true) item.classList.add('list-group-item-success');
        
            //добавляем обработчики на кнопки
        doneButton.addEventListener('click', function(){
            item.classList.toggle('list-group-item-success');
            
            for(const listItem of listArray) {
                if(listItem.id == obj.id) listItem.done = !listItem.done
            }
            savelist(listArray,listName)
        });
        deleteButton.addEventListener('click', function(){
            if(confirm('Вы уверены?')){
                item.remove();
                
                for(let i=0; i<listArray.length;i++){
                    if(listArray[i].id == obj.id) listArray.splice(i,1)
                }
            }
            savelist(listArray,listName)
        });
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);
        //приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
        return{
            item
        };
    }
    function savelist(arr, keyName){
        localStorage.setItem(keyName, JSON.stringify(arr));
    }
    function createTodoApp(container, title = 'Список дел', keyName, defArray = [] ) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        listName = keyName;
        listArray = defArray;
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        let localData = localStorage.getItem(listName)
        
        if(localData !== null && localData !== '') listArray = JSON.parse(localData)

        for(const itemlist of listArray){
            let todoItem = createTodoItem(itemlist);
            todoList.append(todoItem.item);
        }
        
        todoItemForm.input.addEventListener('input', function(e){
            if(!e.target.value){
                todoItemForm.button.disabled = true;
            } else{
            todoItemForm.button.disabled = false;
            }
        });
        function handleSuccess(){
        //браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function(e){
            //эта строчка необходима, чтобы предотвартить стандартное действия браузера
            // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();
            //игнорируем создание элемента,если пользователь ничего не ввёл в поле
            if(!todoItemForm.input.value) {
                return;
            }
            
            let newItem = {
                id:ListArray.length+1,
                name:todoItemForm.input.value,
                done: false
            }
            savelist(listArray,listName)
            let todoItem = createTodoItem(newItem);
            listArray.push(newItem);
        
            todoList.append(todoItem.item);
            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true;
        });   
       }
       handleSuccess()
    }
    window.createTodoApp = createTodoApp;
})();