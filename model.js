todos = [];
var MODEL={
    addInArray:function(D){
        var NewTodo = {text:D , completed:false};
        todos.push(NewTodo);
    },
    checked:function(check, index){ 
        todos[index].completed=check;
    },
    edit:function(textN ,index){
        todos[index].text= textN;
    },
    remove:function(index){
        todos.splice(index,1);
    }
}


