<template>
  <div id="chat" class="content">
    <div class="card-chat" v-for="item in menssajes" :key="item.ID">
      <p class="username"><span class="bages"></span> {{item.UserName}}</p>
      <p v-html="item.message" class="text"></p>
      <p class="timesmap">12:50</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
//import { Utils } from "../utils/Utils";
const tmi = require("tmi.js");
import {  parse } from 'simple-tmi-emotes';

const route = useRoute();
const userName = ref();
const menssajes = ref(new Array());
// const twitchBadgeCache = {
//   data: { global: {} } };
let client;
const options = {
    format: 'default',
    themeMode: 'light',
    scale: '1.0'
    };

function GetUserNameDB() {
  return "furiduri";
}
onMounted(async () => {
  userName.value =
    route.params != undefined ? route.params.chanel : GetUserNameDB();
  if (userName.value != undefined) {
    client = new tmi.Client({
      channels: [userName.value],
    });
    client.connect();
    client.on("message", (channel, tags, message, self) => {
      console.log(channel, tags, message, self);
      if(menssajes.value.length >= 5){
          menssajes.value.shift();
      }
      menssajes.value.push({
          ID: tags["client-nonce"],
          UserName: tags["display-name"],
          Color: tags["color"],
          message: parse(message, tags.emotes, options)
      })
    });
  }
});
</script>

<style lang="scss" scoped>
//Modo oscuro
$Background-Color: #1d1e22;
$TextColor: white;

#chat {
  &.content {
    font-size: 1em;
  }
  .card-chat {
    background-color: $Background-Color;
    padding-left: 0.5em;
    padding-right: 0.6em;
    padding-bottom: 0.6em;
    padding-top: 0.5em;
    border-radius: 0em 2em 2em;
    margin: 0.3em;
    color: $TextColor;
    .username {
      text-align: left;
    }
  }
}
</style>
