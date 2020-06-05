
var MODEL={
    todos : [],
    addInArray:function(D){
        var NewTodo = {text:D , completed:false};
        this.todos.push(NewTodo);
    },
    checked:function(check, index){ 
        this.todos[index].completed=check;
    },
    edit:function(textN ,index){
        this.todos[index].text= textN;
    },
    remove:function(index){
        this.todos.splice(index,1);
    }
}


