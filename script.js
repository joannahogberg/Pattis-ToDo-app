//Kod för struktur av sidan samt 
var wrapper = document.createElement('div');
wrapper.id = 'wrapper';
document.body.appendChild(wrapper);

var header = document.createElement('header');
wrapper.appendChild(header);

var h1 = document.createElement('h1');
header.appendChild(h1);


var head1 = document.createTextNode("Create your own ToDo-List");
h1.appendChild(head1);

var main = document.createElement('main');
wrapper.appendChild(main);

var div = document.createElement('div');
div.id = 'createList';
main.appendChild(div);

var h3 = document.createElement('h3');
div.appendChild(h3);
var head3 = document.createTextNode("");
h3.appendChild(head3);

var p = document.createElement('p');
div.appendChild(p);
var info = document.createTextNode("Create a list of the tasks you need to finish by adding a task at a time. When you are done with a task you can move it to your list of done tasks.");
p.appendChild(info);
var p = document.createElement('p');
div.appendChild(p);
var info = document.createTextNode("If you notice that you might didn't finish a task that you moved to your done list you can always move it back to your ToDo list. If you feel that you added a task that you will never put your hands on you can just delete it.");
p.appendChild(info);
var p = document.createElement('p');
div.appendChild(p);
var info = document.createTextNode("Hope you will have use of this app to structure your day, week or maybe just your morning.");
p.appendChild(info);

var input = document.createElement('input');
input.id = 'input';
div.appendChild(input);


var addBtn = document.createElement('button');
var plus = document.createTextNode("ADD TASK");
addBtn.appendChild(plus);
addBtn.id = 'addTask';
addBtn.title = "Add task to your ToDo list";
div.appendChild(addBtn);
//Vid klick så anropas funktionen add
document.getElementById("addTask").onclick = add;


var list1 = document.createElement('div');
wrapper.appendChild(list1);
list1.id = 'myList';

var h3ToDo = document.createElement('h3');
var headToDo = document.createTextNode("MY ToDo LIST:");
h3ToDo.style.textAlign = "center";
h3ToDo.appendChild(headToDo);
list1.appendChild(h3ToDo);

var toDo = document.createElement('ul');
toDo.id = 'toDo';
list1.appendChild(toDo);


var list2 = document.createElement('div');
wrapper.appendChild(list2);
list2.id = 'doneTasks';


var h3Done = document.createElement('h3');
var headDone = document.createTextNode("MY DONE LIST:");
h3Done.style.textAlign = "center";
h3Done.appendChild(headDone);
list2.appendChild(h3Done);

var done = document.createElement('ul');
done.id = 'done'
list2.appendChild(done);

var footer = document.createElement('footer');
footer.id = 'footer';
document.body.appendChild(footer);


//Funktion som läser av användarens input 
function add() {

    var task = input.value.toLocaleUpperCase();
    if (task) {
        toDos(task); //Anropar funktionen toDos och skickar med parametern task 
        document.getElementById("input").value = ''; //tömmer inputrutan
    } else {
        alert("Please add a task!");
    }
}


//Funktion som lägger till "task" i listan för uppgifter som skall utföras
function toDos(x) {

    var task = document.createElement('li');
    toDo.insertBefore(task, toDo.childNodes[0]); //lägger till överst i listan

    task.innerHTML = x;
    task.id = 'tasks';

    var buttons = document.createElement('div');
    buttons.id = 'buttons';

    //Knapp för klar task
    var rmBtn = document.createElement('button');
    var move = document.createTextNode("DONE");
    rmBtn.appendChild(move);
    buttons.appendChild(rmBtn);
    rmBtn.id = 'move';
    rmBtn.title = "Move to list of tasks done";
    //Händelsehanterare läggs på "DONE" knappen som vid klick anropar funktionen doneTasks
    rmBtn.addEventListener('click', doneTasks);

    //knapp för att ta bort en task
    var delBtn = document.createElement('button');
    var del = document.createTextNode("DELETE");
    delBtn.appendChild(del);
    buttons.appendChild(delBtn);
    delBtn.id = 'delete';
    delBtn.title = "Delete task forever";
    //Händelsehanterare läggs på "DELETE" knappen som vid klick anropar funktionen deleteTasks
    delBtn.addEventListener('click', deleteTask);

    task.appendChild(buttons);

}

//Funktion som flyttar "klara" uppgifter till listan för "done tasks"
function doneTasks() {
    var task = this.parentNode.parentNode;
    var parent = task.parentNode;
    var parentId = parent.id;
    var moveTo;


    if (parentId === 'toDo') { //Flyttar över önskad task

        moveTo = document.getElementById("done");
        //document.getElementById("move").innerHTML = "MAKE UNDONE";
        this.innerHTML = "MAKE UNDONE";
        document.getElementById("move").title = "Move back to list of tasks ToDo";
        task.style.textDecoration = "line-through";
        parent.removeChild(task);
        moveTo.insertBefore(task, moveTo.childNodes[0]);
    } else { //Om användaren ångrar sig går det att flytta tillbaka en uppgift 
        moveTo = document.getElementById("toDo");
        parent.removeChild(task);
        moveTo.insertBefore(task, moveTo.childNodes[0]);
        document.getElementById("move").innerHTML = "DONE";
        document.getElementById("move").title = "Move to list of tasks done";
        task.style.textDecoration = "none";
    }


}

//Funktion som raderar de uppgifter användaren vill ta bort helt
function deleteTask() {
    var task = this.parentNode.parentNode;
    var parent = task.parentNode;
    parent.removeChild(task);
}
