<template>
<div class="note-wrapper" v-if="loadNote">
  <div class="note flex flex-col" :class="{todoactive:addTodo,completed:todosCompleted}" >

    <div class="head flex justify-between items-center">
        <div class="title flex w-full">
            <span v-if="addTodo">
                <span v-if="todosCompleted">
                    Tasks completed
                </span>
                <span v-else>
                    Tasks
                </span>
            </span>

            <input v-else placeholder="Note title" type="text" v-model="note.title" @input="saveNote"> 
        </div> 

        <div>
            <div class="actionsmodal">

                <div class="icon ml-2" @click="actionsmodal=!actionsmodal">
                    <chevrondownicon/>
                </div>

                <div class="relative"  >

                    <div class="modal"  @click="actionsmodal=false">

                        <div class="action" @click="addTodo=!addTodo">
                           <span v-if="!addTodo">Todos</span> <span v-else >Note</span>
                        </div>

                        <div class="action">
                           <span>Delete</span> 
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>  

      <div class="main h-full">

        <div class="info flex" v-if="!addTodo" >

            <textarea @input="saveNote" placeholder="Write somenthing..." v-model="note.description" name="note" id="note" cols="20" rows="6" ></textarea>

        </div>

        <div class="todos h-full flex flex-col justify-between" v-else>

            <div class="todolist h-full pr-1" id="todolist" :class="{todoHeight:todosCompleted}">

                <div class="emptytodo p-4 py-12 text-center" v-if="!note.todos.length">
                    Empty tasks list!
                </div>

                <div v-if="note.todos.length" >

                    <div class="todo " v-for="todo in sortedTodos " :key="todo.id" >

                        <div class="flex items-center w-full" :class="{done:todo.done}" @click="upadateTodo(todo)" >

                            <span class="icon flex items-center justify-center mr-1"  >
                                <checkicon v-show="todo.done" />
                            </span>
                            <span > {{todo.name}}</span> 

                        </div>

                    </div>

                </div>

            </div>


            <div class="addtodo my-2" v-show="addTodo && !todosCompleted">

                <div class="input flex items-center" @keyup.enter="saveTodo" >

                    <input v-model="todo.name" placeholder="Add to do" type="text" class="w-full">

                    <div class="primary-button ml-2" @click="saveTodo">
                        Save
                    </div>

                </div>

            </div>

        </div>

      </div>

      <div class="footer py-2">
          <div class="date">
              <datetimeformat :date="propNote.created"/>
          </div>
      </div>

    
  </div>

</div>
</template>

<script>
export default {

    props:['propNote'],

    data() {
        return {

            actionsmodal:false,
            addTodo:false,

            todo:{
                id:new Date(),
                idNumber:Date.now(),
                name:'',
                created:new Date(),
                done:false,
                edited:new Date(),

            },

            note:{
                id:'',
                noteNumber:null,
                title:'',
                description:'',
                todos:[],
                created: null,
                edited:null,
                backgroundColor:'',
            }
        }
    },

    computed:{

        todosCompleted(){

            

            let todos=this.note.todos;

            if(!todos.length){
                return
            }

            let done=todos.filter(todo=>todo.done==true);

            
            return todos.length==done.length
            

        },

        todoListActive(){
        

        },

        loadNote(){
            
            if(this.propNote){

                let note=this.propNote;

                this.note=JSON.parse ( JSON.stringify ( note) );


            }
            

            return this.propNote
        },

        sortedTodos(){

            let sorted=this.note.todos;

            sorted=sorted.sort((a,b)=>a.idNumber-b.idNumber);

            return sorted

        },

        
    },

    mounted() {
        
         if(this.note.todos.length){
                this.addTodo=true
            }
    },

    methods: {

        sortTodos(list){

            let sorted=list;

            sorted=list.sort((a,b)=>a.idNumber-b.idNumber);

            return sorted

        },

 
        saveNote(){

            this.note.edited=new Date();

            this.$store.dispatch('notes/updateNote',{...this.note}) ;
        },
        saveTodo(){

            if(!this.todo.name){
                return
            }

            this.todo.id=Date.now()+this.todo.name;

            this.todo.idNumber=Date.now();

            this.todo.created=new Date();

            this.note.todos.push(this.todo);

            this.note.edited=new Date();

            this.$store.dispatch('notes/updateNote',{...this.note}) ;


            this.todo={
                id:new Date(),
                idNumber:Date.now(),
                name:'',
                created:new Date(),
                done:false,
                edited:new Date(),
            };

            const element = document.getElementById('todolist');

            element.scrollTop = element.scrollHeight;

            

        },

        upadateTodo(todo){

            this.note.todos.splice(this.note.todos.indexOf(todo),1);

            if(!todo.done){

                todo.done=true;

            }else{

                todo.done=false;

            }
            

            todo.edited=new Date();

            this.note.todos.push(todo);

            this.note.edited=new Date();

            this.$store.dispatch('notes/updateNote',{...this.note}) ;

        }
    },

}
</script>

<style>
.note-wrapper{
    padding: 16px;
}
.note{

    width: 100%;
    height: 26rem;
    border-radius: 24px;
    padding: 1.2rem;
    margin-bottom: 12px;
    background: #171C26;

}

.note .main{
    color: #cecece;
}


.note .actionsmodal .modal{
    position: absolute;
    right: 0;
    width: 10rem;
    /* min-height: 8rem; */
    background: #171C26;
    background: #242c3b;
    /* box-shadow: 0px 16px 32px 0 rgba(35, 38, 47, 0.3); */
    box-shadow: 0px 16px 32px 0 #171c2610;
    border-radius: 8px;
    padding: 6px ;
    display: none;
}

.note .actionsmodal:hover .modal{
    transition: .8s;
    display: block;
}

.note .actionsmodal svg{
    cursor: pointer;
}

.note .actionsmodal .action{
    /* font-size: 15px; */
    padding: 6px 6px;
    cursor: pointer;
}

.note .main{
    border-bottom: 2px solid rgba(172, 172, 172, 0.191);
    padding: .6rem 0;
    padding-bottom: .2rem;
}

.note .main .todolist{
    height: 12.4rem;
    overflow: hidden;
    overflow-y:auto ;
    margin: 0;
    border: none;
    /* display: flex; */
}

.note .main .todolist.todoHeight{
    height: 16rem;
    
}

.note .title{
    font-size: 32px;
    font-size: 24px;
    font-weight: bold;
}
.note .addtodo  .input{
     padding: 4px 4px;
     background: none;
     border-radius: 1px;
     /* border: 2px solid #E6E8EC; */
     border-radius: 12px;
     border-radius: 16px;
     background: rgba(0, 0, 0, 0.349);
     background: rgba(255, 255, 255, 0.048);
}

.note .addtodo .input input{
    padding: 6px 8px;
    background: none;
    border: none;
    outline: none;
    text-overflow: ellipsis;
}
.note .addtodo .primary-button{
     padding: 8px 14px;
     border-radius: 12px;
     font-size: 14px;
     border-radius: 16px;
     color: white;
     /* background: #171C26; */
}

.note .title input{
    /* font-size: 32px; */
    font-weight: bold;
    border: none;
    background:  none;
    margin: none;
    outline: none;
    width:100% ;
    margin-bottom:6px ;
    text-overflow: ellipsis;
}

.note .date{
    /* color: #656d81; */
    padding: 6px 0;
}


.note textarea{
    background: none;
    border: none;
    width: 100%;
    height:15rem ;
    /* height: 100%; */
    
    columns: auto;
    outline: none;
    resize: none;
}

.todoactive{
    background: #3369FF ;
    background: #2245a7 ;
    background: #19337c ;
    background: #0f1d46 ;
    /* background: #0a132e ; */
    background: #3369ff;
    color: white;
}

.note .todolist .todo{
    padding: 6px 4px;
    margin-bottom: 6px;
    cursor: pointer;
    border-radius: 10px;
    font-size: 16px;
}

.note .todolist .todo:hover{
    background: #ffffff21;
}
.note .todo .done{
    text-decoration: line-through;
    transition: .8s;
}

.note .todo .icon{
    min-width: 1.4rem;
    width: 1.4rem;
    height: 1.4rem;
    /* border: 2px solid rgb(240, 240, 240); */
    box-shadow: inset 0 0 0 2px rgb(240, 240, 240);
    border-radius: 2rem;
    margin-right: 8px;
}

.note .todo .done .icon{
    background: #ececec;
    color: #171C26;
}

.note .todo .icon svg{
    width: 14px;
    height: auto;
    stroke-width: 4px;
}

.completed{
    background: #FF7746 ;

    /* background: #b1502d ; */
    background: rgb(42, 87, 42);
    background: #44726c;

    color: white;
    background: #f7a400;
}

.completed textarea{
    color: white;
    /* background: #f7a400; */
}

.addtodo input{
    color: white;
    /* background: #f7a400; */
}
</style>