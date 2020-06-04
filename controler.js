var CONTROLER={

    newInput:function(){
        if (!VIEW.validateData())
        return 
        MODEL.addInArray(VIEW.dataInput);
        CONTROLER.Render(0);
    },


    Render:function(StateButton){
        VIEW.cleanList();
        for(var i=0; i<todos.length;i++){
            if(StateButton==2 && !todos[i].completed)
            continue;
            if(StateButton==1 && todos[i].completed)
            continue;
            
            VIEW.createCell(todos[i]);
        }
        VIEW.SetStatesButtonColor(StateButton);
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
        VIEW.oldInput= todos[VIEW.Index].text;
        VIEW.EditInp();
    },


    CheckBoxTodo:function(){
        VIEW.checked(this);
        MODEL.checked(VIEW.check, VIEW.index);
        CONTROLER.Render(0);
    },


    changeStateButton:function(stateNumber){
        CONTROLER.Render(stateNumber);
    }

}