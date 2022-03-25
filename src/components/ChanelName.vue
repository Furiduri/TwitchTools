<template>
  <div class="column">
    <div class="field-body">
      <div class="field">
        <label class="label">Ligar con Twitch</label>
        <div class="control">
          <a :href="URL_AuthTwitch" class="button">Dar Accesos</a> <br />
          <p class="tag">
            *Se usa una vez, o cada vez que notes que algo va mal con la
            conexion
          </p>
        </div>
      </div>
      <div class="field">
        <label for="" class="label">Nombre del Canal a usar</label>
        <div class="control">
          <input
            type="text"
            name="Canal"
            id="txtChanel"
            class="input"
            v-model="InfoChanel.ChanelName"
            @change="OnChange_txtChanel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import axios from "axios";
import DBUserInfo from "../DB/DBUserInfo";
import TwitchKey from "../private/TwitchKey";

const route = useRoute();
const URL_AuthTwitch = ref("");
const InfoChanel = ref({ ChanelName: "" });
const OnChange_txtChanel = () => {
  DBUserInfo.SetInfoChanel(InfoChanel.value);
};

onMounted(async () => {
  URL_AuthTwitch.value =
    `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${TwitchKey.clientId}` +
    `&redirect_uri=${window.location.origin}/cpanel` +
    `&scope=chat:read chat:edit` +
    `&state=1`;

  let res = await DBUserInfo.GetInfoChanel();
  if (typeof res != "undefined") {
    InfoChanel.value = res;
  } else {
    InfoChanel.value = { ChanelName: "" };
    console.log("No se ecnontraron datos");
  }
  if (typeof route.query["code"] != "undefined") {
    let codeToken = route.query["code"];
    axios
      .post(
        `https://id.twitch.tv/oauth2/token?client_id=${TwitchKey.clientId}` +
          `&client_secret=${TwitchKey.clientSecret}` +
          `&code=${codeToken}` +
          `&grant_type=authorization_code` +
          `&redirect_uri=${window.location.origin}/cpanel`
      )
      .then(async ({ data }) => {
        await DBUserInfo.SetUserToken(data);
      }).catch(console.error);
  }
});
</script>

<style lang="scss" scoped></style>
