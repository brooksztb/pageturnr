<script lang="ts"></script>

<template>
  <div class="loader">Loading...</div>
</template>

<style scoped>
  .loader,
  .loader:before,
  .loader:after {
    width: 2.5em;
    height: 2.5em;
    -webkit-animation: load7 1.8s infinite ease-in-out;
    animation: load7 1.8s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    border-radius: 50%;
  }
  .loader {
    position: relative;
    margin: 80px auto;
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
    color: var(--white);
    font-size: 10px;
    text-indent: -9999em;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .loader:before,
  .loader:after {
    position: absolute;
    top: 0;
    content: '';
  }
  .loader:before {
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 3.5em;
  }
  @-webkit-keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
  @keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
</style>
