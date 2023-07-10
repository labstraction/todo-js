class DataServices{
    static getData(){
        const todo1 = new Todo('Comprare il latte', false, new Date(2023, 6, 8))
        const todo2 = new Todo('Scrivere una lettera alla nonna', false, new Date(2023, 5, 3))
        const todo3 = new Todo('Studiare javascript', false, new Date(2023, 4, 1))
        const todo4 = new Todo('Pagare la bolletta dell\'enel', false, new Date(2022, 3, 9))
        const todo5 = new Todo('Comprare il cibo per il cane', true, new Date(2023, 7, 12))
        
        const todoArray = [todo1,todo2,todo3,todo4,todo5];
        return todoArray;
    }

}