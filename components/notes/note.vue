<template>
<div class="note-wrapper" v-if="loadNote">
  <div class="note flex flex-col" :class="{completed:todosCompleted}" >

    <div class="head flex justify-between items-center">
        <div class="title flex w-full">
            <input placeholder="Note title" type="text" v-model="note.title" @input="saveNote"> 
        </div> 

        <div>
            <div class="actionsmodal">

                <div class="icon ml-2" @click="actionsmodal=!actionsmodal">
                    <chevrondownicon/>
                </div>

                <div class="relative" v-if="actionsmodal" >

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

            <div class="todolist h-full">

                <div class="emptytodo p-4 py-12 text-center" v-if="!note.todos.length">
                    Empty tasks list!
                </div>

                <div class="todo" v-for="todo in note.todos" :key="todo.id" >
                    {{todo.name}}
                </div>

            </div>


            <div class="addtodo my-2">
                <div class="input flex items-center" @keyup.enter="saveTodo">

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
                name:'',
                created:new Date(),
                done:false,

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

        
    },

    mounted() {
        this.loadNote;
    },

    methods: {

 
        saveNote(){

            this.note.edited=new Date();

            this.$store.dispatch('notes/updateNote',{...this.note}) ;
        },
        saveTodo(){

            if(!this.todo.name){
                return
            }

            this.todo.id=Date.now()+this.todo.name;

            this.todo.created=new Date();

            this.note.todos.push(this.todo);

            this.note.edited=new Date();

            this.$store.dispatch('notes/updateNote',{...this.note}) ;


            this.todo={
                id:Date.now(),
                name:'',
                created:new Date(),
                done:false,

            };

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
    height: 24rem;
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
    width: 8rem;
    background: #171C26;
    background: #242c3b;
    /* box-shadow: 0px 16px 32px 0 rgba(35, 38, 47, 0.3); */
    box-shadow: 0px 16px 32px 0 #171c2610;
    border-radius: 16px;
    padding: 6px ;
}

.note .actionsmodal svg{
    cursor: pointer;
}

.note .actionsmodal .action{
    font-size: 14px;
    padding: 6px 6px;
    cursor: pointer;
}

.note .main{
    border-bottom: 2px solid rgba(172, 172, 172, 0.191);
    padding: .6rem 0;
    padding-bottom: .2rem;
}

.note .main .todolist{
    height: 11rem;
    overflow: hidden;
    overflow-y:auto ;
    /* display: flex; */
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
     background: rgba(0, 0, 0, 0.171);
     background: rgba(0, 0, 0, 0.349);
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

/* .note .date{
    color: #656d81;
} */


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
}

.note .todolist .todo{
    padding: 4px 4px;
    margin-bottom: 2px;
    cursor: pointer;
}

.completed{
    background: #FF7746 ;
    background: #b1502d ;
}
</style>