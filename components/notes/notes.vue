<template>

<div class="notes">

    <div class="header">
        <div class="boldtitle">
            Notes
        </div>
    </div>
    
  <div class=" flex flex-wrap" v-if="notes.length">
      <div class="w-full md:w-1/2 lg:w-1/3" v-for="note in notes" :key="note.id">
          <note :propNote="note"/>
      </div>
  </div>

  <div class="small-screen">
      <newnotebutton/>
  </div>
</div>
</template>

<script>
export default {

    data() {
        return {
            note:{
                id:0,
                noteNumber:0,
                title:'Title',
                description:'',
                todos:[],
                created:new Date(),
                edited:new Date(),
                backgroundColor:'rgb(39, 39, 39)',
            }
        }
    },

    mounted() {

         if(!this.notes.length){

                this.note.id=Date.now();

                this.$store.dispatch('notes/addNote',this.note);
        }
    },

    computed:{

        notes(){

            let notes=[...this.$store.state.notes.list];

            notes=notes.sort((a,b)=>b.id-a.id);

            return [...notes]
        }

    }

}
</script>

<style>

.notes .header .boldtitle{
    font-weight: 600;
    font-size: 32px;
    padding: 4px;
}

.notes .header {
    
    padding: 4px 12px;
    color: rgb(243, 243, 243);
}



</style>