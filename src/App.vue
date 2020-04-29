<template>
  <div id="app">
    <a-button>按钮</a-button>
    <div id="nav">
      <router-link to="/">home</router-link>|
      <router-link to="/about">about</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less"></style>
