var input = document.getElementById("NewInput");
var TableList = document.getElementById("table-list");
var EditInp = document.getElementById('editbox');


var newInputV={
    validate:function(){
        var ValueInput = input.value;
        if(!ValueInput){
            alert('Please enter a todo');
            return false;
        }
        this.dataInput=ValueInput;
        input.value="";
        return true;
    },
    dataInput:""
};

var RenView={
    cleanList:function (){
        while (TableList.firstChild) {
            TableList.removeChild(TableList.lastChild);
        }
    },

    createCell:function(Todo){
        var CellTodo = document.createElement('div');
            CellTodo.className = 'todo';
            TableList.appendChild(CellTodo);
            CellTodo.innerHTML=Todo.text;

            
        (function AddRemoveButton(){
            var remove = document.createElement('input');
            remove.type = "button";
            remove.value= "×";
            remove.className = "removebtn";
            remove.onclick = RemoveRow;
            CellTodo.appendChild(remove);
        })();

        if (Todo.completed){
                CellTodo.style.textDecoration='line-through';
                CellTodo.style.backgroundColor='rgb(84, 171, 177)';
            return
        }

        (function AddCheckbox(){
            var check = document.createElement('input');
            check.type = "checkbox";
            check.className= "inpcheckbox";
            check.onclick=CheckBoxTodo;
            CellTodo.appendChild(check); 
            })();

        

        (function AddEditButton(){

            var edit = document.createElement('img');
            edit.className = "editicon";
            edit.src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QA6RXhpZgAATU0AKgAAAAgAA1EQAAEAAAABAQAAAFERAAQAAAABAAAAAFESAAQAAAABAAAAAAAAAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAASABIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7U+C/wY+Gep/AvwR4h8Q+CfC+oX954es9T1LV9X0y3mmmlkt0lmnmmkUsxLMzMzHua8v8c6bo3i/w+1p4K8O2fhXw5rsqjw14f0PS7e3n8ZXcJDrdXsRQKNKjzlhIB5iOWJAaJJdzxJ8OfGvxX/ZL+DXh3wi0a20uh6bPqJk1AWiME09TbrJmGUSxeeYneIoQ6x7TwSD7n8L/AIZXHhN7nX/Euox+IvHupwxx6lrCxeXEiLyttaxknybdCSQucsxLuWYk0Afnx4m+Evwg0zxJq1nrn7S+reFtbt7uWG+0LQLe5h07TrhXIktrWPB2QxsGRFycKqjJor5y/aLYf8NB/E/kf8jRqnf/AKe5aKAOj8ffGXx/4O8feKdC0Dxz4k0PRNO1e8tbLTdN1e4t7a1hSdwkccaOFRFAACqAAKwf+Givitg/8XO8ZdP+g/d//HKKKAPuv4X/AAv8GeIvhn4S1XVfCOhanql9pFpdXd7eabDLNcTPCjPJI7KWZ2YkliSSSSaKKKAP/9k=";
            edit.onclick=EditTodo;
            CellTodo.appendChild(edit);
        })()
 
    }

}

var checkV={
    change:function(cell){
        var mycell = Array.prototype.slice.call(TableList.children);
        var Row = cell.parentNode;
        this.index = mycell.indexOf(Row);
        if(cell.checked)
        this.check = true;
        else
        this.check = false;
    },
    check:false,
    index:0
}

var editV={
    oldInput:"",
    newInput:"",
    Index:0,

    findIndex:function(cell){
        var mycell = Array.prototype.slice.call(TableList.children);
        var Row = cell.parentNode;
        this.Index = mycell.indexOf(Row);        
    },

    EditInp:function(){
        document.getElementsByClassName('container')[0].style.opacity="0.5";
        document.getElementsByClassName('editStation')[0].style.display="block";
        EditInp.value = this.oldInput;
    },

    OkEdit:function(){
        document.getElementsByClassName('container')[0].style.opacity="1";
        document.getElementsByClassName('editStation')[0].style.display="none";
        this.newInput=EditInp.value;
    }
}


var removeV={
    Index:0,
    removeTodoView:function(cell){
        var mycell = Array.prototype.slice.call(TableList.children);
        var Row = cell.parentNode;
        this.Index = mycell.indexOf(Row);
        if(!confirm("do you want delete ")){
            return false;
        }
        return true;
    }
}


var changeVState={
    SetStatesButtonColor:function(S){
        var ButtonsBoxes = document.getElementsByClassName('button-boxes')[0]; 
        for(var i=0 ; i< 4 ; i++){
            if(S+1==i){
                ButtonsBoxes.children[i].style.backgroundColor="rgb(84, 171, 177)";   
            }
            else{
                ButtonsBoxes.children[i].style.backgroundColor="rgb(245, 245, 245)";
            }
        }
    
    }
}
