var todos = [];
var newTodoM={
    addInArray:function(D){
        var NewTodo = {text:D , completed:false};
        todos.push(NewTodo);
    }
};

var checkIndex={
    change:function(check, index){
        todos[index].completed=check;
    }
}

var editTodo={
    edit:function(textN ,index){
        todos[index].text= textN;
    }
}

var removeTodo={
    remove:function(index){
        todos.splice(index,1);
    }
}

