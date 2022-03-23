import { list } from "postcss";


export const state=()=>({
    list:[]
})


export const mutations={

    updateNote(state,note){

        // state.list.splice(state.list.indexOf(note),1);

        let item = state.list.find(
            item => {
                return item.id == note.id
            }
        );

        let noteList=state.list;

        
        if (item) {

            state.list.splice(state.list.indexOf(item), 1);

            state.list.push(note);
            
        }

        

        
        // state.list[find]=note;



    },

    addNote(state,note){

        state.list.push(note);

    }
}

export const actions={

    addNote({commit},note){

        commit('addNote',note);

    },
    
    updateNote({commit},note){

        commit('updateNote',note);

    }

}