<template>
  <div class="min-w-screen dark-mode min-h-screen">
    <div >

      <div class="sidebar ">
        <sidenav/>
      </div>

    <div>
      <div class="topbar large-screen">
        <topnav/>
      </div>

      <div class="topbar small-screen default-background">
        <topnav/>
      </div>
      <Nuxt />
    </div>

    </div>
  </div>
</template>

<style>

.topbar{
  padding: 8px 12px;
  /* background: inherit; */
  position: sticky;
  top: 0;
  
}
.sidebar{

  position: fixed;
  height: 100vh;
  overflow: hidden;
  left: 0;
  top: 0;
  bottom: 0;
  background: inherit;
  padding:1rem 12px;
  z-index: 10;
  box-shadow: 1px 1px 1px 1px rgba(255, 255, 255, 0.178);

}

@media (max-width:800px) {
  .sidebar{
    display: none;
  }
}
</style>
