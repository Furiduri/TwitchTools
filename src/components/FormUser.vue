<template>
  <div class="column">
    <div class="field-body">
      <div class="field">
        <label for="txtChanel" class="label"> Canal </label>
        <div class="control">
          <input id="txtChanel" type="text" class="input" v-model="ChanelInfo.Channel" @change="SaveChanges" />
        </div>
      </div>
      <div class="field">
        <label for="txtOAuth" class="label">
          Clave OAuth (<a href="https://twitchapps.com/tmi/"> Conseguir clave </a
          >)
        </label>
        <div class="control">
          <input
            class="input"
            type="password"
            id="txtOAuth"
            v-model="ChanelInfo.OAuthChanel"
            @change="SaveChanges"
          />
        </div>
      </div>
      <div class="field">
        <label for="" class="label">Editor Avanzado</label>
        <div class="control">
          <input class="button" type="button" :value="avanceEditor ? 'Ocultar' : 'Mostar'" @click="avanceEditor = !avanceEditor">
        </div>
      </div>
    </div>
  </div>
  <div class="column" v-if="avanceEditor">   
    <div class="content position-absolute" style="z-index: 1;">
      <CodeEdit v-model="tmiConfigString" class="github_dark"  :wrap_code="true" @change="SaveEditor"/>
    </div> 
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import DBUserInfo from "../DB/DBUserInfo";
import {tmiConfig, tmiManager} from "../tmi/tmiConfig";

const avanceEditor = ref(false);
const tmiConfigString = ref("");
const ChanelInfo = ref({
    Channel: '',
    OAuthChanel: ''
});

const SaveChanges = () => {
  if(tmiConfig.channels.length <= 1 )
    tmiConfig.channels = [ChanelInfo.value.Channel];
  tmiConfig.identity.username = ChanelInfo.value.Channel;
  tmiConfig.identity.password = ChanelInfo.value.OAuthChanel;

  DBUserInfo.SetInfoTMI(tmiConfig);
  Load();
};

const SaveEditor = ()=>{
  try {
    let result = JSON.parse(tmiConfigString.value);
    Object.assign(tmiConfig, result);
    DBUserInfo.SetInfoTMI(tmiConfig);
    Load();
  } catch (ex) {
    console.log(ex);
  }
}
const Load = ()=>{
    tmiConfigString.value = JSON.stringify(tmiConfig);
    ChanelInfo.value.Channel = tmiConfig.identity.username;
    ChanelInfo.value.OAuthChanel = tmiConfig.identity.password;
}
onMounted( async ()=>{
    await tmiManager.Get();
    Load();
});
</script>

<style lang="scss" scoped></style>
