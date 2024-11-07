<template>
  <div class="loading-container">
    <i class="slack-loader"><i class="slack-loader"></i></i>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.629);
  z-index: 1000;
  transition: opacity 0.5s ease;
}

body {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slack-loader {
  position: relative;
  width: 42px;
  height: 42px;
  transform: rotate(-20deg);
}
.slack-loader:after, .slack-loader:before {
  content: "";
  position: absolute;
  width: 14px;
  height: calc(100% + 28px);
  border-radius: 20px;
  opacity: 0.65;
}
.slack-loader:after {
  left: 0;
  background-color: #1ae8b1;
  -webkit-animation: loader-bottom 2s linear infinite;
          animation: loader-bottom 2s linear infinite;
}
@-webkit-keyframes loader-bottom {
  0% {
    bottom: -14px;
  }
  25% {
    height: calc(100% + 28px);
  }
  50% {
    height: 14px;
    bottom: -14px;
  }
  70% {
    bottom: calc(100% - 0px);
  }
  75% {
    height: 14px;
    bottom: calc(100% - 0px);
  }
  100% {
    bottom: -14px;
  }
}
@keyframes loader-bottom {
  0% {
    bottom: -14px;
  }
  25% {
    height: calc(100% + 28px);
  }
  50% {
    height: 14px;
    bottom: -14px;
  }
  70% {
    bottom: calc(100% - 0px);
  }
  75% {
    height: 14px;
    bottom: calc(100% - 0px);
  }
  100% {
    bottom: -14px;
  }
}
.slack-loader:before {
  right: 0;
  background-color: #F7B733;
  -webkit-animation: loader-top 2s linear infinite;
          animation: loader-top 2s linear infinite;
}
@-webkit-keyframes loader-top {
  0% {
    top: -14px;
  }
  25% {
    height: calc(100% + 28px);
  }
  50% {
    height: 14px;
    top: -14px;
  }
  70% {
    top: calc(100% - 0px);
  }
  75% {
    height: 14px;
    top: calc(100% - 0px);
  }
  100% {
    top: -14px;
  }
}
@keyframes loader-top {
  0% {
    top: -14px;
  }
  25% {
    height: calc(100% + 28px);
  }
  50% {
    height: 14px;
    top: -14px;
  }
  70% {
    top: calc(100% - 0px);
  }
  75% {
    height: 14px;
    top: calc(100% - 0px);
  }
  100% {
    top: -14px;
  }
}
.slack-loader .slack-loader {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(90deg);
}
.slack-loader .slack-loader:after {
  background-color: #6DB9EF;
}
.slack-loader .slack-loader:before {
  background-color: #FC4A1A;
}
</style>
