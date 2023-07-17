class DBService{

    //GET
    static getAllTodos(){
        const url = 'https://64b512c1f3dbab5a95c6a48c.mockapi.io/todos';
        return fetch(url)
        .then(resp => resp.json())
        .then(result => this.convertToTodoArray(result))
        .catch(error => console.log(error.message));
    }

    //DELETE
    static deleteTodo(id){
        console.log('delete', id);
        const deleteUrl = 'https://64b512c1f3dbab5a95c6a48c.mockapi.io/todos/' + id;
        console.log(deleteUrl);
        return fetch(deleteUrl, {method: 'delete'}).then(resp => resp.json());
    }

    //PUT
    static updateTodo(todo){

    }

    //UPDATE
    static saveTodo(todo){

    }



    static convertToTodoArray(genericArray){

        const tempArray = [];

        for (const obj of genericArray) {
            const newTodo = new Todo(obj.title, obj.isCompleted, new Date(obj.creationDate), obj.id)
            tempArray.push(newTodo);
        }

        return tempArray;

    }


}