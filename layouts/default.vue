<template>
  <div class="min-w-screen">
    <div >

      <div class="sidebar">
        <sidenav/>
      </div>

    <div>
      <div class="topbar">
        <topnav/>
      </div>
      <Nuxt />
    </div>

    </div>
  </div>
</template>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.topbar{
  padding: 8px 12px;
  background: inherit;
  position: sticky;
  top: 0;
  background: rgba(0, 0, 0, 0.972);
}
.sidebar{

  position: fixed;
  height: 100vh;
  overflow: hidden;
  left: 0;
  top: 0;
  bottom: 0;
  background: inherit;
  background: rgba(0, 0, 0, 0.856);
  padding: 8px;
  z-index: 10;
  box-shadow: 0 0 0px 2px rgba(75, 75, 75, 0.219);
}

@media (max-width:800px) {
  .sidebar{
    display: none;
  }
}
</style>
