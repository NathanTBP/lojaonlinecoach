<template>
  <div class="w3-top w3-margin-right">
    <div class="w3-bar w3-black w3-xxxlarge">
      <Login />
      <Register />
      <!--<img class="w3-image w3-left" id="menu_button" src="../img/menu_button.png" alt="Botão de Menu">-->
      <router-link to="/"><img class="w3-image w3-left" id="home_logo_coach" src="../img/logo_coach.png" alt="Logo do Site"></router-link>
      <router-link to="/"><a class="w3-bar-item w3-button bar_item" id="bar_inicio">Início</a></router-link>
      <router-link to="/produtos"><a class="w3-bar-item w3-button bar_item" id="bar_produtos">Produtos</a></router-link>
      <router-link to="/quem-somos"><a class="w3-bar-item w3-button bar_item" id="bar_quemsomos">Quem Somos</a></router-link>
      <router-link to="/contato"><a class="w3-bar-item w3-button bar_item" id="bar_contato">Contato</a></router-link>
      <button class="w3-bar-item w3-button w3-blue bar_item" id="button_entrar" @click.prevent="toLogin" v-if="tipodousuario==0">Entrar</button>
      <element class="w3-bar-item w3-margin-top" id="bar_logado_usr" v-if="tipodousuario==1">Bem Vindo(a) {{nomedousuario}}! </element>
      <element class="w3-bar-item" id="bar_logado_prof" v-if="tipodousuario==2">Bem Vindo(a) professor(a) {{nomedousuario}}! </element>
      <element class="w3-bar-item" id="bar_logado_adm" v-if="tipodousuario==3">Bem Vindo(a) {{nomedousuario}}! (adm) </element>
      <router-link to="/carrinho"><img class="w3-image w3-right" id="menu_cart" src="../img/cart.png" alt="Carrinho"></router-link>
    </div>
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
  data () {
    return {
      tipodousuario: 0,
      nomedousuario: 0
    }
  },
  methods: {
    updated() {

      //var vm = this;
      this.$eventHub.$on('submit', function(novotipo,novonome){
      this.tipodousuario=novotipo;
      this.nomedousuario=novonome;
      });
    },
    toLogin() {
      
    }
  }
}
</script>
