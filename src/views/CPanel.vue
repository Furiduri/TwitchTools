<template>
    <div class="column is-11-desktop m-auto">
        <div class="box">
            <div class="content">
                <div class="column">
                    <h1>Panel de Control</h1>
                </div>
                <ChanelName />
                <hr>
                <div class="column">
                    <LinkPokemon />
                </div>
            </div>
        </div>
    </div>                  
</template>

<script setup>
//    import formUser from "../components/FormUser.vue";
//     const FormUser = formUser;
import chanelName from '../components/ChanelName.vue';
const ChanelName = chanelName;
import linkPokemon from "../components/LinkPokemon.vue";
const LinkPokemon = linkPokemon;
</script>