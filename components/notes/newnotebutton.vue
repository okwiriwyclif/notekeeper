<template>
<div>
  <div class="new-note-button flex items-center justify-center" @click="newNote">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  </div>
  </div>
</template>

<script>
export default {

    data() {
        return {

            id:0,
            note:{
                id:0,
                title:'Title',
                description:'',
                todos:[],
                created: Date.now(),
                edited:new Date(),
                backgroundColor:'rgb(39, 39, 39)',
            }
        }
    },

    methods: {

        newNote(){

            let notes=this.$store.state.notes.list.length;

            this.note.id=notes+1;

            this.note.title='Note'+this.note.id;

            // this.note.id=this.note.id+this.note.title+this.id ;

            this.note.backgroundColor=this.background(this.colors);

            this.id=this.id+1;

            const create=this.$store.dispatch('notes/addNote',{...this.note});

            let elementId='note'+(notes+1);

            window.scrollTo({ top: 0, behavior: 'smooth' });


        },

        background(items){

            var item = items[Math.floor(Math.random()*items.length)];

            return item

        }

    },

    computed:{

        colors(){

           let colors= [ 'rgb(39, 39, 39)', '#000080', '#007575', '#55002A','#755800', '#694f00', '#555D50',' #75003A'];

           return colors
        }
    }

}
</script>

<style>

.new-note-button{
    height: 2.4rem;
    width: 2.4rem;
    padding: 8px;
    background: rgb(218, 218, 218);
    border-radius: 14px;
    color: gray;
    cursor: pointer;
}

.new-note-button:hover{
    background: white;
    transition: .8s;
    box-shadow: 0 0 2px 6px rgba(128, 128, 128, 0.143);

}


@media (max-width:800px) {
    .new-note-button{
        position: fixed;
        right: 10%;
        bottom: 8%;
    }
}

</style>