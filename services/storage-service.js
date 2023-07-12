class StorageService{

    static saveData(data){
        const dataString = JSON.stringify(data);
        localStorage.setItem('todoArray', dataString);
    }

    static loadTodos(){

        const dataString = localStorage.getItem('todoArray');
        if (dataString) {
            const data = JSON.parse(dataString);

            const tempArray = [];

            for (const object of data) {
                const newTodo = new Todo(object.title, object.isCompleted, new Date(object.creationDate));
                tempArray.push(newTodo);
            }

            return tempArray;
        }

        return null;
    }


}