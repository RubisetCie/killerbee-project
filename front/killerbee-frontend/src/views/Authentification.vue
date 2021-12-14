<template>
    <v-container>
        <div id="Header">
            <v-app-bar app color="#087A57" dark>
                <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
                <h2 style="text-decoration: cursive">LOGIN</h2>
                <v-spacer></v-spacer>
                <h2 style="text-decoration: cursive">Killerbee</h2>
            </v-app-bar>
        </div>
        <div id="ContentAuthentification">
            <div class="card card-container">
                <img id="profile-img" :src="srcPicture" class="profile-img-card"/>
                <v-divider class="mx-4"></v-divider>
                <h2 class="title">LOGIN</h2>
                <validation-observer ref="observer">
                    <v-form @submit.prevent="submit">
                        <validation-provider  v-slot="{ errors }" name="Email" rules="required|email">
                            <v-text-field v-model="email" class="zone" :error-messages="errors" label="Email" required outlined dark filled dense></v-text-field>
                        </validation-provider>
                        <validation-provider color="#087A57" v-slot="{ errors }" name="Password" rules="required">
                            <v-text-field v-model="password" class="zone" :error-messages="errors" label="Password" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPass = !showPass" required outlined dense dark filled :type="showPass ? 'text' : 'password'"></v-text-field>
                        </validation-provider>
                        <div class="text-center">
                            <v-btn class="signin-btn" type="submit" rounded color="#087A57" dark>
                                Sign In
                            </v-btn>
                        </div>
                    </v-form>
                </validation-observer>
            </div>
        </div>  
    </v-container>
</template>

<script>
    import { required, email } from "vee-validate/dist/rules";
import {extend, ValidationProvider, setInteractionMode, ValidationObserver,} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  name: "Login",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    email: "",
    password: null,
    showPass: false,
    srcPicture: require("../assets/img/account-circle (1).png"),
  }),
  computed: {
    params() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.login(this.params);
      }
    },
    clear() {
      this.email = "";
      this.password = null;
      this.$refs.observer.reset();
    },
    login(params) {
      this.$store.dispatch("login", params).then((res) => {
        if (res) {
          this.$router.push({ name: "Home" });
        } else {
          document.getElementsByClassName("error-login-msg")[0].style.display =
            "block";
        }
      });
    },
  },
};
</script>

<style scoped>
.title{
    text-align: center;
    color: #087A57;
}
.zone{
    color: #087A57;
    width: auto;
    height: auto;
}
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #CBCFCE;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.error-feedback {
  color: red;
}
</style>