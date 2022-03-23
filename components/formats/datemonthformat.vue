<template>
  <div class="dateformat">
      {{dateFormat}}
  </div>
</template>

<script>
export default {
    props:['date'],
    computed:{
        dateFormat(){
            
            let date=new Date(this.date);
            if(!this.date){
                date=new Date();
            }
            let year=date.getFullYear();
            let month=date.getMonth()+1;
            let months=['January','February','March','April','May','June','July','August','September','October','November','December']
            month=months[month-1];
            let day=date.getDate();
            return month+" "+day;
            
        }
    },
    Date(){
        return this.date
    }
}
</script>

<style>
.dateformat{
    text-transform: capitalize;
}
</style>