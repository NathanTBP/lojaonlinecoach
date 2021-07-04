<template id="register">
  <div id="card_register" class="w3-modal">
    <div class="w3-modal-content w3-animate-top w3-card-4 loginreg_card">
      <header class="w3-container w3-center w3-indigo"> 
        <button class="w3-btn w3-xxlarge w3-display-topright" id="close_register" @click.prevent="closeRegister()">&times;</button>
        <img class="w3-image" id="login_logo_coach" src="../img/logo_coach.png" alt="Site logo">
        <br><br>
        <span class="w3-text-white" id="login_header_text">Preencha os campos para se registrar!</span>
      </header>
      <p v-if="errors.length">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <li :key="error.id" v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <div class="w3-container" novalidate="true" @keyup.enter="checkForm()">
        <div class="w3-row w3-section">
          <span>Email:</span>
          <input class="w3-input w3-border" name="regemail" type="text" id="regemail" v-model="regemail" placeholder="Ex:example@email.com">
        </div>
        <div class="w3-row w3-section">
          <span>Confirmar Email:</span>
          <input class="w3-input w3-border" name="regemail2" type="text" id="regemail2" v-model="regemail2" placeholder="Repetir Email">
        </div>
        <div class="w3-row w3-section">
          <span>Nome:</span>
          <input class="w3-input w3-border" type="text" name="nome" id="nome" v-model="nome" placeholder="Ex:Annie">
        </div>
        <div class="w3-row w3-section">
          <span>Sobrenome:</span>
          <input class="w3-input w3-border" type="text" name="sobrenome" id="sobrenome" v-model="sobrenome" placeholder="Ex:Hastur">
        </div>
        <div class="w3-row w3-section">
          <span>Celular:</span>
          <input class="w3-input w3-border" type="tel" name="regcel" id="regcel" v-model="regcel" placeholder="(xx)xxxxx-xxxx">
        </div>
        <div class="w3-row w3-section">
          <span>Senha:</span>
          <input class="w3-input w3-border" name="regsenha" type="password" id="regsenha" v-model="regsenha" placeholder="Senha">
        </div>
        <div class="w3-row w3-section">
          <span>Confirmar Senha:</span>
          <input class="w3-input w3-border" name="regsenha2" type="password" id="regsenha2" v-model="regsenha2" placeholder="Repetir Senha">
        </div>
        <div class="w3-row w3-section loginreg_text">
          <div class="w3-col s6 l6 w3-margin-left w3-left"><input class="w3-check" type="checkbox"> Li e concordo com os termos de uso</div>
          <button class="w3-button s4 l4 w3-blue" id="button_register" @click.prevent="checkForm()">Registrar-se</button>
          <div class="w3-container w3-center w3-padding-small">
            <span>Já tem conta? <button class="w3-text-blue" id="button_to_login" @click.prevent="regtoLogin()">Faça login aqui!</button></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      errors: [],
      regemail: null,
      regemail2: null,
      nome: null,
      sobrenome: null,
      regcel: null,
      regsenha: null,
      regsenha2: null,
    }
  },
  methods: {
    closeRegister: function() {
      this.clearAll();
      document.getElementById('card_register').style.display='none';
    },
    regtoLogin: function() {
      this.clearAll();
      document.getElementById('card_register').style.display='none';
      document.getElementById('card_login').style.display='block';
    },
    checkForm: function (e) {
      this.errors = [];

      if (!this.regemail) {
        this.errors.push('O email é obrigatório.');
      } else if (!this.validEmail(this.regemail)) {
        this.errors.push('Utilize um e-mail válido.');
      }
      if (this.regemail !== this.regemail2) {
        this.errors.push('Emails não coincidem.')
      }
      if (!this.nome) {
        this.errors.push('O nome é obrigatório.');
      }
      if (!this.sobrenome) {
        this.errors.push('O sobrenome é obrigatório.');
      }
      if (!this.regcel) {
        this.errors.push('O número é obrigatório.');
      }
      if (!this.regsenha) {
        this.errors.push('Digite uma senha.');
      }
      if (this.regsenha !== this.regsenha2) {
        this.errors.push('Senhas não coincidem.');
      }
      if (!this.errors.length) {
        this.verifyRegister();
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
      this.regemail = null;
      this.regemail2 = null;
      this.nome = null;
      this.sobrenome = null;
      this.regcel = null;
      this.regsenha = null;
      this.regsenha2 = null;
      return;
    },
    verifyRegister: function() {
      const self = this;
      let existEmail = false;
      let url = "http://localhost:3000/users";
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
              if(self.regemail == user.email) {
                existEmail = true;
                break;
              }
            }
            if(existEmail) {
              self.errors.push('Email já registrado!');
              return;
            }
            else {
              self.registerConfirmed();
            }
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
    },
    registerConfirmed: function() {
      const self = this;
      let url = "http://localhost:3000/users";
      let status;
      let dados = {
        first_name: self.nome,
        last_name: self.sobrenome,
        celular: self.regcel,
        email: self.regemail,
        password: self.regsenha,
        type_user: 1,
        remaining_classes: [],
        acquired_classes: [],
        live_classes: [],
      };

      fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(dados)
      })
      .then(function(response) {
        status = response.ok;
        if(status) {
          return response.json();
        }
        else
          alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando.');
      })
      .then(function() {
        alert('Cadastro registrado com sucesso!!!\nFaça login agora!');
      })
      .catch(function(error) {
        console.log('Error ' + error.message)
      })

      this.closeRegister();
    }
  }
}
</script>