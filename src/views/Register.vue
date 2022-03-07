<template>
  <section class="gradient-form h-100">
    <div class="container py-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">
                  <div class="text-center">
                    <img
                      src="@/assets/TwitchTools_Banner.png"
                      style="width: 185px"
                      alt="logo"
                    />
                    <h4 class="mt-1 mb-5 pb-1">Registrarse en Twitch Tools</h4>
                  </div>
                  <div class="text-center">
                    <button
                      @click="RegisterByGoogle"
                      class="btn btn-outline-danger"
                    >
                      <i class="fab fa-google"></i>
                      Registarse con Google
                    </button>
                  </div>
                  <hr />
                  <form @submit.prevent="Register">
                    <div class="form-outline mb-4">
                      <div class="input-group">
                        <div class="input-group-text">
                          <i class="fa fa-at"></i>
                        </div>
                        <input
                          type="email"
                          placeholder="Ingrese el Correo"
                          v-model="email"
                          class="form-control"
                        />
                      </div>
                      <label class="form-label" for="form2Example11"
                        >Correo</label
                      >
                    </div>

                    <div class="form-outline mb-4">
                      <div class="input-group">
                        <div class="input-group-text">
                          <i class="fa fa-lock"></i>
                        </div>
                        <input
                          type="password"
                          placeholder="Contraseña"
                          v-model="password"
                          class="form-control"
                        />
                      </div>
                      <label class="form-label" for="form2Example22"
                        >Contraseña</label
                      >
                    </div>

                    <div class="form-outline mb-4">
                      <div class="input-group">
                        <div class="input-group-text">
                          <i class="fa fa-lock"></i>
                        </div>
                        <input
                          type="password"
                          placeholder="Repite tu Contraseña"
                          v-model="password2"
                          class="form-control"
                        />
                      </div>
                      <label class="form-label" for="form2Example22"
                        >Repite tu contraseña Contraseña</label
                      >
                    </div>
                    <div v-if="errorMSG" class="text-center text-danger">
                      <p>{{ errorMSG }}</p>
                    </div>
                    <div class="text-center pt-1 pb-1">
                      <button
                        class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                        type="submit"
                      >
                        Enviar Registro
                      </button>
                    </div>
                    <hr />
                    <div
                      class="d-flex align-items-center justify-content-center pb-4"
                    >
                      <p class="mb-0 me-2">Ya tienes cuenta?</p>
                      <button type="button" class="btn btn-outline-success">
                        Ingresa aqui
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                <div class="card mx-md-4 px-3 py-4">
                  <h4 class="mb-4">Herramienta para stream</h4>
                  <p class="small mb-0">
                    Creada por
                    <a href="https://www.twitch.tv/furiduri">@Furiduri</a>, para
                    experimentar y matar el ocio, si tienes algun comentario, no
                    duden en mandarme un susuro por Twitch 💚.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { Utils } from "../utils/Utils";
//Variables
const email = ref("");
const password = ref("");
const password2 = ref("");
const router = useRouter();
const errorMSG = ref();
//Funciones
const Register = () => {
  // eslint-disable-line no-unused-vars
  if (password.value === password2.value && password.value.length > 6) {
    if (Utils.RegEmail(email.value)) {
      createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((res) => {
          console.log("Registro echo!", res);
          router.push("/cpanel");
        })
        .catch((error) => {
          console.log(error.code);
          errorMSG.value = error.code;
        });
    } else {
      errorMSG.value = "Correo no valido!";
    }
  } else {
    errorMSG.value = "Las contraseñas no son iguales, o son menos de 6 caracteres!";
  }
};
const RegisterByGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(() => {
      router.push("/cpanel");
    })
    .catch((error) => {
      console.log(error.code);
      errorMSG.value = error.code;
    });
}; // eslint-disable-line no-unused-vars
</script>

<style scoped>
.gradient-custom-2 {
  /* fallback for old browsers */
  background: #742ce4;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    #b36cfb,
    #8442e7,
    #c4a3f4,
    #dfd0fa
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, #b36cfb, #8442e7, #c4a3f4, #dfd0fa);
}

@media (min-width: 768px) {
  .gradient-form {
    height: 100vh !important;
  }
}
@media (min-width: 769px) {
  .gradient-custom-2 {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
}
</style>
