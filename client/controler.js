

var CONTROLER={
    loadPage:function(){
        if(localStorage["guestMode"] == "true"){
            VIEW.hideBtn()
            var inf = JSON.parse(localStorage["guestInf"]);
        }
        else{
            var inf = JSON.parse(localStorage["information"]);
        }

        MODEL.todos = inf.list;
        CONTROLER.changeStateButton(Number(localStorage["state"]));
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
        if(localStorage["guestMode"] == "true"){
            var inf = JSON.parse(localStorage["guestInf"]);
            inf.list = MODEL.todos;
            localStorage["guestInf"]= JSON.stringify(inf);
        }
        else{
            var inf = JSON.parse(localStorage["information"]);
            inf.list = MODEL.todos;
            localStorage["information"]= JSON.stringify(inf);
        }

        
        
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
        localStorage["state"] = stateNumber;
    },


    downloadBtn:function() {
    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var resTemp = this.responseText;
                if(!resTemp) return;
                MODEL.todos=JSON.parse(this.responseText);    
                CONTROLER.Render(0);
                alert("download successfuly!");
            }
        };
        const JWT = localStorage["information"];
        xhttp.open('GET', 'download', true);
        xhttp.setRequestHeader('authorization', JWT);
        xhttp.send();
    },


    uploadBtn:function(){
        const JWT = localStorage["information"];
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var resTemp = this.responseText;
                if(!resTemp) return;
                alert("upload successfuly!");
            }
        }
        xhttp.open("POST", "upload", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader('authorization', JWT);
        xhttp.send(JSON.stringify(MODEL.todos));
    }
    

}


