<template>
  <div>
    <h1>Juego Who's That Pokemon?</h1>
    <div class="buttons" v-if="MSGerror == ''">
      <a class="button" :href="urlGame.href" target="_blank">Ir al juego</a>
      <span class="tag is-black is-bold is-medium">
        OBS URL: 
        <span class="ml-1" @click="copy">
            {{ FullUrl }}            
        </span> 
      </span>
    </div>
    <span v-if="MSGerror != ''" class="tag is-medium is-danger">{{MSGerror}}</span>
  </div>
</template>

<script setup>
//import { ref } from "@vue/reactivity";
import { computed, onMounted, ref } from "@vue/runtime-core";
import {Utils} from '../utils/Utils'
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";
const urlGame = ref("");
const MSGerror = ref("");
const FullUrl = computed(()=> window.location.protocol+"//"+ window.location.host + urlGame.value.href);
const router = useRouter();
function copy(e){Utils.Copy(e.srcElement.innerText);}
onMounted(() => {
  let user = getAuth().currentUser;
  if (user != null) {
      
    urlGame.value = router.resolve({
      name: "WhoPokemon.userID",
      params: { userID: user.uid },
    });
  } else {
    MSGerror.value = "No se pudo cargar el link!";
  }
});
</script>

<style lang="scss" scoped></style>
