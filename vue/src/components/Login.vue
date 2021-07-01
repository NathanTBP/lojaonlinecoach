<template>
  <div id="card_login" class="w3-modal">
    <div class="w3-modal-content w3-animate-top w3-card-4 loginreg_card">
      <header class="w3-container w3-center w3-indigo"> 
        <button class="w3-btn w3-xxlarge w3-display-topright" id="close_login">&times;</button>
        <img class="w3-image" id="login_logo_coach" src="img/logo_coach.png" alt="Site logo">
        <br><br>
        <span class="w3-text-white" id="login_header_text">Faça o Login ou Registre-se</span>
      </header>
      <form class="w3-container" action="">
        <div class="w3-row w3-section">
          <div class="w3-col s1 l1 w3-center"><i class="w3-xlarge flaticon-user"></i></div>
          <div class="w3-col s8 l9">
            <input class="w3-input w3-border" name="loginemail" type="text" placeholder="Email">
          </div>
        </div>
        <div class="w3-row w3-section">
          <div class="w3-col s1 l1 w3-center"><i class="w3-xlarge w3-center flaticon-lock"></i></div>
          <div class="w3-col s8 l9">
            <input class="w3-input w3-border" name="loginsenha" type="password" placeholder="Senha">
          </div>
        </div>
        <div class="w3-row w3-section loginreg_text">
          <div class="w3-col s3 l3 w3-margin-left w3-left"><input class="w3-check" type="checkbox" checked="checked"> Manter Login</div>
          <div class="w3-col s5 l5 w3-center"><button id="button_enter"><i class="w3-xxxlarge flaticon-enter"></i></button></div>
          <span class="w3-col s3 l3 w3-right">Esqueceu a senha?<br><a class="w3-text-blue" href="#" target="_self">Clique aqui!</a></span>
          <div class="w3-container w3-center w3-padding-small">
            <span>Não tem conta? <button class="w3-text-blue" id="button_to_register">Registre-se aqui!</button></span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      viewLogin: false
    }
  },
}
</script>