<template>
  <navbar v-if="isLogIn"/>
  <navbarLogin v-if="!isLogIn"/>
  <router-view/>
</template>

<style lang="less">
  a {
    &.router-link-exact-active {
      color: #42b983 !important;
    }
  }
</style>

<script setup>
import {onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";

//Componentes
import Navbar from "./components/Navbar.vue"
const navbar = Navbar;
import NavbarLogin from "./components/NavbarLogin.vue"
const navbarLogin = NavbarLogin;
//Variables
const isLogIn = ref(false);
//eventos
let auth;
onMounted(()=>{
  auth = getAuth();
  onAuthStateChanged (auth, (user)=>{
      if(user){
        isLogIn.value = true;
      }else{
        isLogIn.value = false;
      }
  });
});
</script>
