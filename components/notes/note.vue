<template>
<div class="note-wrapper" v-if="loadNote" :id="'note'+ loadNote.id">
  <div class="note flex flex-col" :style="{background:propNote.backgroundColor || 'rgb(39, 39, 39)'}">

      <div class="head flex justify-between items-center">
        <div class="title flex w-full">
            <input placeholder="Note title" type="text" v-model="note.title" @input="saveNote"> 
            </div> 
        </div>  

      <div class="main h-full">

        <div class="info flex">

            <textarea @input="saveNote" placeholder="Write somenthing..." v-model="note.description" name="note" id="note" cols="20" rows="6" ></textarea>

        </div>

        <div class="todos">

        </div>

      </div>

      <div class="footer py-2">
          <div class="date">
              <!-- {{propNote.edited}} -->
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

            todo:{
                id:new Date(),
                name:'',
                created:new Date(),
                inProgress:false,
                done:false

            },

            note:null,
        }
    },

    computed:{
        loadNote(){
            let newNote=this.propNote ;

            if(this.propNote){
                this.note={...newNote}
            }

            return newNote
        }
    },

    methods: {
        saveNote(){

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
    height: 20rem;

    border-radius: 24px;
    padding: 1.2rem;
    margin-bottom: 12px;

}

.note .main{
    border-bottom: 2px solid rgba(172, 172, 172, 0.191);
}

.note .title{
    font-size: 32px;
    font-size: 24px;
    font-weight: bold;
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


.note textarea{
    background: none;
    border: none;
    width: 100%;
    height: 100%;
    columns: auto;
    outline: none;
    resize: none;
}
</style>