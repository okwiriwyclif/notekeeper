<template>
  <div class="systemsettings">
      <div>
          <settingsicon></settingsicon>
      </div>
  </div>
</template>

<script>
import settingsicon from '../icons/settingsicon.vue'
export default {
  components: { settingsicon },

}
</script>

<style>
.systemsettings{
    margin: 0 auto;
    padding: 12px 0;
}
.systemsettings svg{
    color: white;
    width: 26px;
    height: auto;
}

</style>