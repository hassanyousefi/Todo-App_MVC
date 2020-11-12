var app = {};
app.Model = (function(){
    var todos = [];
    function addInArray(D){
        var NewTodo = {text:D , completed:false};
        todos.push(NewTodo);
    }

    function checked(check, index){ 
        todos[index].completed=check;
    }

    function edit(textN ,index){
        todos[index].text= textN;
    }

    function remove(index){
        todos.splice(index,1);
    }
    return{
            addInArray:addInArray,
            checked:checked,
            edit:edit,
            remove:remove,
            todos:todos={
                set:function(todo){
                    todos = todo;
                },
                get:function(){
                    return todos;
                }
            }

    }
}());


