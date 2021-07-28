<template>
  <div>
    <div class="w3-top w3-margin-right">
      <div class="w3-bar w3-black w3-xxxlarge">
        <!--<img class="w3-image w3-left" id="menu_button" src="../img/menu_button.png" alt="Botão de Menu">-->
        <router-link to="/"><img class="w3-image w3-left" id="home_logo_coach" src="../img/logo_coach.png" alt="Logo do Site"></router-link>
        <router-link to="/"><a class="w3-bar-item w3-button bar_item" id="bar_inicio">Início</a></router-link>
        <router-link to="/produtos"><a class="w3-bar-item w3-button bar_item" id="bar_produtos">Produtos</a></router-link>
        <router-link to="/quem-somos"><a class="w3-bar-item w3-button bar_item" id="bar_quemsomos">Quem Somos</a></router-link>
        <router-link to="/contato"><a class="w3-bar-item w3-button bar_item" id="bar_contato">Contato</a></router-link>
        <button class="w3-bar-item w3-button w3-blue bar_item" id="button_entrar" @click.prevent="toLogin()" v-if="tipousuario==0">Entrar</button>
        <router-link to="/usuario"><a class="w3-bar-item w3-button bar_item w3-hover-blue w3-hover-text-white" id="bar_logado_usr" v-if="tipousuario==1" :style="{width: usuariowidth + '%'}">
          <img class="w3-bar-item" id="user_logo" src="../img/user_white.png">
          Bem Vindo(a) {{nomeusuario}}!
          </a></router-link>
        <router-link to="/admin"><a class="w3-bar-item w3-button bar_item w3-hover-blue w3-hover-text-white" id="bar_logado_prof" v-if="tipousuario==2">Bem Vindo(a) professor(a) {{nomeusuario}}! </a></router-link>
        <router-link to="/"><a class="w3-bar-item w3-button bar_item w3-hover-red w3-hover-text-white" @click="Logout()" v-if="tipousuario != 0">Sair</a></router-link>
        
        <router-link to="/carrinho"><img class="w3-image w3-right" id="menu_cart" src="../img/cart.png" alt="Carrinho"></router-link>
      </div>
    </div>
    <login @loginConfirmed="userLogged"></login>
    <Register />
  </div>
</template>

<script>
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

export default {
  name: 'Navbar',
  components: {
    Login,
    Register
  },
  setup() {
    // removes the stored user types so it has to log in again
    localStorage.removeItem('usertype');
    localStorage.setItem('usertype', '0');
    localStorage.removeItem('userid');
    localStorage.setItem('userid', '0');
  },
  data () {
    return {
      tipousuario: 0,
      nomeusuario: '',
      idusuario: null,

      
      usuariowidth: null
    }
  },
  methods: {
    toLogin() {
      document.getElementById('card_login').style.display='block';
    },
    // checks if the user can log in, and does it if it is possible
    userLogged: function(tipousuario, nomeusuario, idusuario) {
      this.usuariowidth = null;
      this.tipousuario = tipousuario;
      this.nomeusuario = nomeusuario;
      localStorage.removeItem('usertype');
      localStorage.setItem('usertype', tipousuario);
      this.usuariowidth = 19 + this.nomeusuario.length;
      this.idusuario = idusuario;
      localStorage.removeItem('userid');
      localStorage.setItem('userid', idusuario.toString());
    },
    // logs the user out
    Logout: function() {
      this.tipousuario = 0;
      localStorage.removeItem('usertype');
      localStorage.setItem('usertype', '0');
      localStorage.removeItem('userid');
      localStorage.setItem('userid', '0');
    }
  }
}
</script>
