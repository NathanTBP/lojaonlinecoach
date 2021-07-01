<template id="register">
  <div id="card_register" class="w3-modal">
    <div class="w3-modal-content w3-animate-top w3-card-4 loginreg_card">
      <header class="w3-container w3-center w3-indigo"> 
        <button class="w3-btn w3-xxlarge w3-display-topright" id="close_register">&times;</button>
        <img class="w3-image" id="login_logo_coach" src="img/logo_coach.png" alt="Site logo">
        <br><br>
        <span class="w3-text-white" id="login_header_text">Preencha os campos para se registrar!</span>
      </header>
      <form class="w3-container" action="">
        <div class="w3-row w3-section">
          <span>Email:</span>
          <input class="w3-input w3-border" name="regemail" type="text" placeholder="Ex:example@email.com">
        </div>
        <div class="w3-row w3-section">
          <span>Confirmar Email:</span>
          <input class="w3-input w3-border" name="regemail2" type="text" placeholder="Repetir Email">
        </div>
        <div class="w3-row w3-section">
          <span>Nome Completo:</span>
          <input class="w3-input w3-border" type="text" name="nomecompleto" placeholder="Ex:Annie Hastur">
        </div>
        <div class="w3-row w3-section">
          <span>Celular:</span>
          <input class="w3-input w3-border" type="tel" name="regtel" placeholder="(xx)xxxxx-xxxx apenas número" id="regtel">
        </div>
        <div class="w3-row w3-section">
          <span>Senha:</span>
          <input class="w3-input w3-border" name="regsenha" type="password" placeholder="Senha">
        </div>
        <div class="w3-row w3-section">
          <span>Confirmar Senha:</span>
          <input class="w3-input w3-border" name="regsenha2" type="password" placeholder="Repetir Senha">
        </div>
        <div class="w3-row w3-section loginreg_text">
          <div class="w3-col s6 l6 w3-margin-left w3-left"><input class="w3-check" type="checkbox"> Li e concordo com os termos de uso</div>
          <button class="w3-button s4 l4 w3-blue" id="button_register">Registrar-se</button>
          <div class="w3-container w3-center w3-padding-small">
            <span>Já tem conta? <button class="w3-text-blue" id="button_to_login">Faça login aqui!</button></span>
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
      viewRegister: false
    }
  },
}
</script>