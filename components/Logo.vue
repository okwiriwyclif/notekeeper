<template>

<div class="NuxtLogo">
  <svg width="270" height="270" viewBox="0 0 270 270" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="26" y="26" width="218" height="218" rx="66" stroke="#001F5C" stroke-width="52"/>
  </svg>
</div>
</template>

<style>

.NuxtLogo {
  animation: 1s appear;
  margin: auto;
  max-width: 2.4rem;
}

.NuxtLogo svg{
  width: 100%;
  height: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
