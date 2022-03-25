<template>
  <navbar v-if="isLogIn && vnavbar"/>
  <navbarLogin v-if="!isLogIn && vnavbar"/>
  <router-view/>
</template>


<style lang="scss">
@import "assets/scss/main.scss";
  a {
    &.router-link-exact-active {
      color: #42b983 !important;
    }
  }
</style>

<script setup scoped>
//CSS
import 'bootstrap';

import {onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { useRoute } from "vue-router";

//Componentes
import Navbar from "./components/Navbar.vue"
const navbar = Navbar;
import NavbarLogin from "./components/NavbarLogin.vue"



const navbarLogin = NavbarLogin;
//Variables
const isLogIn = ref(false);
const vnavbar = ref(true);
const router = useRoute();

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
      if(router.meta.navbar !== undefined){
        vnavbar.value = router.meta.navbar;
      }
  });
});
</script>