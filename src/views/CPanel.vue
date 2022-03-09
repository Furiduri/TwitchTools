<template>
    <div class="column is-10-desktop m-auto">
        <div class="box">
            <div class="columns">
                <div class="column">
                    <h1>Panel de Control</h1>
                </div>
                <div class="column">
                    <FormUser />
                </div>                
            </div>
            <hr>
            <div class="content">
                
            </div>
        </div>
    </div>
</template>

<script setup>
   import formUser from "../components/FormUser.vue";
    const FormUser = formUser;
</script>