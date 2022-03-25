<template>
  <!-- Errores y carga -->
  <div  v-if="statusNumber === 0" >
    <div style="margin: auto;width: 250px;">
      <div class="pokeball">
        <div class="pokeball__button"></div>
      </div>
      <p v-if="MSGerror == ''" class="text">Cargando...</p>
      <p class="nes-text is-error text">{{ MSGerror }}</p>
    </div>
  </div>
  <!-- Pantalla de incio -->
  <div v-if="statusNumber === 1">
    <div class="nes-container is-dark member-card">
      <p class="title">Who's that Pokémon?</p>
      <div class="content">
        <div class="avatar">
          <img
            :src="DataUser?.profilePictureUrl"
            :alt="DataUser?.displayName"
            class="Twitch-Picture"
          />
        </div>

        <div class="profile">
          <p>
            Hola Bienvenidos, para comenzar a jugar el buen @{{
              DataUser?.displayName
            }}, debera usar el comando
            <span class="nes-badge">
              <span class="is-primary">{{ CommansList.Start }}</span>
            </span>
          </p>
          <p>Para Jugar usa estos comandos:</p>
          <div class="lists">
            <ul>
              <li>
                <p>
                  Para adivinar al pokemon:
                  <span class="nes-badge">
                    <span class="is-success">{{ CommansList.Is }}</span>
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Juego -->
  <div v-if="statusNumber >= 2">
    <div class="Pokemon-Content">
      <div class="nes-container is-dark with-title">
        <p class="title">Who's that Pokémon?</p>
        <div class="content">
          <div class="avatar">
            <div class="PokeContent">
              <div class="pokeball">
                <div class="pokeball__button"></div>
              </div>
              <img v-if="ActualPoke != null"
                :src="ActualPoke?.image"
                :class="{'Poke-Hiden': !PokeIsVisible, 'Poke-Show': PokeIsVisible}"
              />
            </div>
            <p v-if="PokeIsVisible" class="is-success nes-text" style="text-align: center;" >{{MsgWiner}}</p>
          </div>
          <div class="profile">
            <p v-if="ActualPoke != null">
              Poke-Tip: <br>
              El pokemon es de tipo:
              <ul>
                <li v-for="(type, index) in ActualPoke.types" :key="index">
                  <span>
                    {{type}}
                  </span>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// script.js
import modalAlert from "../utils/Modals_alerts";
import "../assets/scss/Pokeball.scss";
import "nes.css/css/nes.css";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import DBUserInfo from "../DB/DBUserInfo";
import { GetUserStream, GetChatClient } from "../Twurple/Utils";
import PokeApi from '../utils/PokeApi';

//const router = useRouter();
const route = useRoute();
const Client = ref("");
const UserID = ref("");
const MSGerror = ref("");
/* Status code  
    -3 = Desconexion del Chat
    -2 = Error en DB
    -1 = Error en UserID
    0 = Inicio Todo OK
    1 = Instrucciones y conectado
    2 = En proseso de adivinar
    3 = Adivinado
*/
const statusNumber = ref(0);
const DataUser = ref();
const ActualPoke = ref();
const PokeIsVisible = ref(false);
const MsgWiner = ref("");
const CommansList = {
  Ping: "!PokePing",
  Start: "!PokeStart",
  Is: "!Is {pokemon}",
  Restart: "!PokeReStart",
};

onMounted(async () => {
  UserID.value = route.params.userID;
  if (typeof UserID.value != "undefined") {
    let infoChanel = await DBUserInfo.GetInfoChanel(UserID.value);
    if (typeof infoChanel != "undefined") {
      DataUser.value = await GetUserStream(infoChanel.ChanelName);
      if (DataUser.value != null) {
        Client.value = await GetChatClient(
          UserID.value,
          DataUser.value.displayName
        );
        if (!Client.isConnected) {
          Client.value.connect();
          //Linesers
          Client.value.onMessage(onMessage_Client);
          Client.value.onConnect(() => {
            if(statusNumber.value === 0)
                statusNumber.value = 1;
            else if(ActualPoke.value !== null)
              statusNumber.value = 2;

            console.log("Connect!");
          });
          Client.value.onDisconnect((manually, reason) => {
            statusNumber.value = -3;
            MSGerror.value = `[${manually}] Upss, ${reason}`;
            console.log(`[${manually}] Upss, ${reason}`);
          });
        }
      } else {
        MSGerror.value =
          "No se encontro tu Canal de Twitch: " + infoChanel.ChanelName;
        statusNumber.value = -2;
      }
    } else {
      MSGerror.value = "U.U No es posible jugar sin cuenta";
      statusNumber.value - 2;
    }
  } else {
    MSGerror.value = "U.U No es posible jugar sin cuenta";
    statusNumber.value = -1;
  }
});
const onMessage_Client = (channel, user, message, msg) => {
  if (!message.startsWith("!")) return;
  console.log(`User: ${user}, MSG: ${message}`);

  const args = message.split(" ");
  const command = args.shift().toLowerCase();

  console.log(msg.tags);
  
  switch (command) {
    case CommansList.Ping.toLowerCase():
      Client.value.say(
        channel,
        `PokePong! My buen ${user}  MSG:[ ${args.join(" ")}]`
      );
      break;
    case CommansList.Start.toLowerCase():
      PokeApp.Iniciar(msg);
      break;
    case CommansList.Is.split(" ").shift().toLowerCase():
      PokeApp.ValidatePoke(args.join("").toLowerCase(), msg);
      break;
  }
};

const PokeApp = {
  Iniciar: (msg) => {
    let badges = msg.tags.get("badges");    
    if(badges.includes('broadcaster')){
        if(statusNumber.value == 1){
          statusNumber.value = 2;
          PokeApi.GetPokemon().then(NewPokemon=>{ActualPoke.value = NewPokemon;});  
        }else{
          if(ActualPoke.value !== null)
            MsgWiner.value =`Es ${ActualPoke.value.name}!`;
          PokeApp.ChangePokemon();
        }
    }else{
      modalAlert.ToasError(`Tus Badges: ${badges}, ocupas [broadcaster]`);
    }
  },
  ValidatePoke:  (pokemon, msg)=>{
    if(statusNumber.value === 2){
      console.log(pokemon, msg);
      if(ActualPoke.value.name.toLowerCase() == pokemon){        
        MsgWiner.value = `Es ${ActualPoke.value.name}, correcto ${msg.userInfo.displayName}!`;
        Client.value.say(
          msg.target.value,
          MsgWiner.value
        );
        PokeApp.ChangePokemon();        
      }else{
        modalAlert.ToasError(`${msg.userInfo.displayName} piensa que es ${pokemon}, pero NO!`);
      }
    }else{
      Client.value.say(
          msg.target.value,
          `Comando ${CommansList.Start} para iniciar`
        );
    }
  },
  ChangePokemon: ()=>{
    PokeIsVisible.value = true;
    statusNumber.value = 3;
    setTimeout(()=>{
          PokeIsVisible.value = false;
          ActualPoke.value = null;
          MsgWiner.value = "";
          setTimeout(()=>{
            statusNumber.value = 2;
            PokeApi.GetPokemon().then(NewPokemon=>{ActualPoke.value = NewPokemon;});             
          }, 1000);
          console.log("Cambio de Pokemon");
    },5000);
  }
};
</script>

<style lang="scss" >
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
html{
  background-color: transparent !important;
}
body {
  background-color: transparent !important;
}
.pokeball{
      animation: fall 0.25s ease-in-out, shake 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}
.Twitch-Picture {
  background-color: white;
}
.nes-badge {
  width: auto !important;
  &.is-icon span:last-child,
  span:last-child {
    width: auto !important;
  }
}
.nes-container{
  animation: fall 1.25s ease-in-out;
  p{
    animation: fall 1.25s ease-in-out;
  }
}
.nes-container .content {
  display: flex;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  .avatar > img {
    display: block;
    width: 10em;
    height: 10em;
    border-radius: 50%;
  }
  > .profile {
    margin-left: 1.5rem;
  }
}
.Pokemon-Content {
  width: 100vw;
  .PokeContent {
    width: 200px;
    height: 200px;
    .pokeball {
      position: absolute;
      z-index: 0;
    }
    img {
      width: 80%;
      z-index: 15;
      display: inline-block;
      margin: 5% 0px 0px 7%;
      &.Poke-Hiden {
        filter: brightness(0);
        animation: fall 0.25s ease-in-out;
      }
      &.Poke-Show {
        filter: brightness(1);
        animation: fall 0.25s ease-in-out,shake 2s infinite;
      }
    }
  }
}
</style>
