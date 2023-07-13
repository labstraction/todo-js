class MyArray{

    constructor(internalArray = []){
        this.internalArray = internalArray;
    }

    static fromArgs(...args){
        const startingArray = args;
        console.log('args', startingArray);
        const newMyArray = new MyArray(startingArray);
        return newMyArray;
    }

    static fromObject(object){
        const startingArray = Object.values(object);
        const newMyArray = new MyArray(startingArray);
        return newMyArray;
    }

}