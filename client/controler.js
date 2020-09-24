

var CONTROLER={
    loadPage:function(){
        MODEL.todos = JSON.parse(localStorage["Todos"]);
        CONTROLER.changeStateButton(Number(localStorage.getItem("state")));
    },


    newInput:function(){
        if (!VIEW.validateData())
        return 
        MODEL.addInArray(VIEW.dataInput);
        CONTROLER.Render(0);
    },


    Render:function(StateButton){
        VIEW.cleanList();
        lenTodo = MODEL.todos.length
        for(var i=0; i<lenTodo;i++){
            if(StateButton==2 && !MODEL.todos[i].completed)
            continue;
            if(StateButton==1 && MODEL.todos[i].completed)
            continue;
            
            VIEW.createCell(MODEL.todos[i]);
        }
        VIEW.SetStatesButtonColor(StateButton);
        localStorage["Todos"]= JSON.stringify(MODEL.todos);
    
    },


    OkEditButton:function(){
        VIEW.OkEdit();
        MODEL.edit(VIEW.newInput, VIEW.Index);
        CONTROLER.Render(0);
    },


    RemoveRow:function(){
        if(VIEW.removeTodoView(this))
        MODEL.remove(VIEW.Index)
        CONTROLER.Render(0);
    },


    EditTodo:function(){
        VIEW.findIndex(this);
        VIEW.oldInput= MODEL.todos[VIEW.Index].text;
        VIEW.EditInp();
    },


    CheckBoxTodo:function(){
        VIEW.checked(this);
        MODEL.checked(VIEW.check, VIEW.index);
        CONTROLER.Render(0);
    },


    changeStateButton:function(stateNumber){
        CONTROLER.Render(stateNumber);
        localStorage.setItem("state", stateNumber);
    },


    downloadBtn:function() {
    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                MODEL.todos=JSON.parse(this.responseText);    
                CONTROLER.Render(0);
            }
        };
        xhttp.open('GET', 'download', true);
        xhttp.send();
    },


    uploadBtn:function(){

        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "upload", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(JSON.stringify(MODEL.todos));

    }
    

}