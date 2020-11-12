app.Controler = (function(){

    function loadPage(){
        if(localStorage["guestMode"] == "true"){
            app.View.hideBtn();
            var inf = JSON.parse(localStorage["guestInf"]);
            app.View.showName("guest", "", "");
        }
        else{
            
            var inf = JSON.parse(localStorage["information"]);
            if(!inf)return;
            var fName = inf.firstName;
            var LName = inf.lastName;
            var UName = inf.username;
            app.View.showName(fName, LName, UName);
        }

        app.Model.todos.set(inf.list);
        if(localStorage["state"]){
            changeStateButton(Number(localStorage["state"]));    
        }
        else
            changeStateButton(0);

    }


    function newInput(){
        if (!app.View.validateData())
        return 
        app.Model.addInArray(app.View.dataInput());
        Render(0);
    }


    function Render(StateButton){
        app.View.cleanList();
        lenTodo = app.Model.todos.get().length
        for(var i=0; i<lenTodo;i++){
            if(StateButton==2 && !app.Model.todos.get()[i].completed)
            continue;
            if(StateButton==1 && app.Model.todos.get()[i].completed)
            continue;
            
            app.View.createCell(app.Model.todos.get()[i]);
        }
        app.View.SetStatesButtonColor(StateButton);
        if(localStorage["guestMode"] == "true"){
            var inf = JSON.parse(localStorage["guestInf"]);
            inf.list = app.Model.todos.get();
            localStorage["guestInf"]= JSON.stringify(inf);
        }
        else{
            var inf = JSON.parse(localStorage["information"]);
            inf.list = app.Model.todos.get();
            localStorage["information"]= JSON.stringify(inf);
        }
    }


    function OkEditButton(){
        app.View.OkEdit();
        app.Model.edit(app.View.newInput(), app.View.index());
        Render(0);
    }


     function RemoveRow(){
        if(app.View.removeTodoView(this))
        app.Model.remove(app.View.index())
        Render(0);
    }


    function EditTodo(){
        app.View.findIndex(this);
        app.View.oldInput.set(app.Model.todos.get()[app.View.index()].text);
        app.View.EditInp();
    }


    function CheckBoxTodo(){
        app.View.checked(this);
        app.Model.checked(app.View.check(), app.View.index());
        Render(0);
    }


    function changeStateButton(stateNumber){
        Render(stateNumber);
        localStorage["state"] = stateNumber;
    }


    function downloadBtn() {
    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var resTemp = this.responseText;
                if(!resTemp) return;
                app.Model.todos.set(JSON.parse(this.responseText));    
                Render(0);
                alert("download successfuly!");
            }
        };
        const JWT = localStorage["information"];
        xhttp.open('GET', 'download', true);
        xhttp.setRequestHeader('authorization', JWT);
        xhttp.send();
    }


    function uploadBtn(){
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
        xhttp.send(JSON.stringify(app.Model.todos.get()));
    }

    
    return{
                newInput:newInput,
                changeStateButton:changeStateButton,
                OkEditButton:OkEditButton,
                RemoveRow:RemoveRow,
                EditTodo:EditTodo,
                CheckBoxTodo:CheckBoxTodo,
                loadPage:loadPage,
                downloadBtn:downloadBtn,
                uploadBtn:uploadBtn
    }

})();


