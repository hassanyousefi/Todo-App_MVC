function newInput(){
    if (!newInputV.validate())
    return
        newTodoM.addInArray(newInputV.dataInput);
        Render(0);
}

function Render(StateButton){
    RenView.cleanList();
    for(var i=0; i<todos.length;i++){
        if(StateButton==2 && !todos[i].completed)
        continue;
        if(StateButton==1 && todos[i].completed)
        continue;
        
        RenView.createCell(todos[i]);
    }
    changeVState.SetStatesButtonColor(StateButton);
}


function CheckBoxTodo(){
    checkV.change(this);
    checkIndex.change(checkV.check, checkV.index);
    Render(0);
}


function EditTodo(){
    editV.findIndex(this);
    editV.oldInput= todos[editV.Index].text;
    editV.EditInp();
}


function OkEditButton(){
    editV.OkEdit();
    editTodo.edit(editV.newInput, editV.Index);
    Render(0);
}

function RemoveRow(){
    if(removeV.removeTodoView(this))
    removeTodo.remove(removeV.Index)
    Render(0);
}

function changeStateButton(stateNumber){
    Render(stateNumber);
}