<template>
  <nav class="navbar navbar-light bg-light navbar-expand-lg">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
         <img
          src="@/assets/TwitchTools_Banner.png"
          alt=""
          height="32"
          class="d-inline-block align-text-top"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/" class="nav-link ">Inicio</router-link>
          <router-link to="/about" class="nav-link ">Mas información</router-link>
        </div>        
      </div>
      <div class="justify-content-lg-end">
          <button type="button" @click="heandSingOut" class="btn btn-outline-success">
            Cerrar sesión
          </button>
        </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth";

const router = useRouter();
//Funciones
const heandSingOut = () => {
  // eslint-disable-line no-unused-vars
  let auth = getAuth();
  signOut(auth).then(() => {
    router.push("/login");
  });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
