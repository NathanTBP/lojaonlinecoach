<template>
  <div id="card_login" class="w3-modal">
    <div class="w3-modal-content w3-animate-top w3-card-4 loginreg_card">
      <header class="w3-container w3-center w3-indigo"> 
        <button class="w3-btn w3-xxlarge w3-display-topright" id="close_login" @click.prevent="closeLogin()">&times;</button>
        <img class="w3-image" id="login_logo_coach" src="../img/logo_coach.png" alt="Site logo">
        <br><br>
        <span class="w3-text-white" id="login_header_text">Faça o Login ou Registre-se</span>
      </header>
      <p v-if="errors.length">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <li :key="error.id" v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <div class="w3-container" novalidate="true" @keyup.enter="checkForm()">
        <div class="w3-row w3-section">
          <div class="w3-col s1 l1 w3-center"><i class="w3-xlarge flaticon-user"></i></div>
          <div class="w3-col s8 l9">
            <input class="w3-input w3-border" name="loginemail" type="email" id="loginemail" v-model="loginemail" placeholder="Email">
          </div>
        </div>
        <div class="w3-row w3-section">
          <div class="w3-col s1 l1 w3-center"><i class="w3-xlarge w3-center flaticon-lock"></i></div>
          <div class="w3-col s8 l9">
            <input class="w3-input w3-border" name="loginsenha" type="password" id="loginsenha" v-model="loginsenha" placeholder="Senha">
          </div>
        </div>
        <div class="w3-row w3-section loginreg_text">
          <div class="w3-col s3 l3 w3-margin-left w3-left"><input class="w3-check" type="checkbox" checked="checked"> Manter Login</div>
          <div class="w3-col s5 l5 w3-center"><button id="button_enter" @click.prevent="checkForm()"><i class="w3-xxxlarge flaticon-enter"></i></button></div>
          <span class="w3-col s3 l3 w3-right">Esqueceu a senha?<br><a class="w3-text-blue" href="#" target="_self">Clique aqui!</a></span>
          <div class="w3-container w3-center w3-padding-small">
            <span>Não tem conta? <button class="w3-text-blue" id="button_to_register" @click.prevent="toRegister()">Registre-se aqui!</button></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      errors: [],
      loginemail: null,
      loginsenha: null,
      tipousuario: null,
      nomeusuario: null,
      idusuario: null
    }
  },
  methods: {
    closeLogin: function() {
      this.clearAll();
      document.getElementById('card_login').style.display='none';
    },
    toRegister: function() {
      this.clearAll();
      this.errors = [];
      document.getElementById('card_login').style.display='none';
      document.getElementById('card_register').style.display='block';
    },
    checkForm: function (e) {
      this.errors = [];

      if (!this.loginemail) {
        this.errors.push('Digite o email.');
      } else if (!this.validEmail(this.loginemail)) {
        this.errors.push('Utilize um e-mail válido.');
      }
      if (!this.loginsenha) {
        this.errors.push('Digite a senha.');
      }
      if (!this.errors.length) {
        this.verifyLogin();
        return true;
      }
      if(e)
        e.preventDefault();
        
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    clearAll: function() {
      this.errors = [];
      this.loginemail = null;
      this.loginsenha = null;
    },
    verifyLogin: function() {
      const self = this;
      let confirmEmail = false;
      let confirmLogin = false;
      let url = "http://localhost:3000/usuarios";
      let status;

      this.errors = [];
      fetch(url)
        .then(function(response) {
          status = response.ok;
          if(status)
            return response.json();
          else
            alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando.');
        })
        .then(function(response) {
          if(status) {
            for(let i = 0; i < response.length; i++) {
              let user = response[i];
              if(self.loginemail == user.email) {
                confirmEmail = true;
                if(self.loginsenha == user.password) {
                  confirmLogin = true;
                  self.tipousuario = user.type_user;
                  self.nomeusuario = user.first_name;
                  self.idusuario = user._id;
                  break;
                }
              }
            }
            if(!confirmEmail) {
              self.errors.push('Email inválido.');
              return;
            }
            else if(!confirmLogin) {
              self.errors.push('Senha inválida.');
              return;
            }
            if(confirmLogin)
              self.loginConfirmed();
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
    },
    loginConfirmed: function() {
      this.closeLogin();
      this.$emit('loginConfirmed', this.tipousuario, this.nomeusuario, this.idusuario);
    }
  }
}
</script>