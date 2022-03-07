<template>
    <div class="column is-10-desktop m-auto">
        <div class="box">
            <div class="level">
                <div class="level-left">
                    <h1>Panel de Control</h1>
                </div>                
            </div>
            <hr>
            <div class="content">
                <FormUser />
            </div>
        </div>
    </div>
</template>

<script setup>
   import formUser from "../components/FormUser.vue";
    const FormUser = formUser;
</script>