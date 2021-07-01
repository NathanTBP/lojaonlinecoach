<template>
  <div class="page" id="container_contato">
    <h2>Contate conosco</h2>
    <h3>
      Preencha todos os campos abaixo ou mande um email para: example@email.com
    </h3>
    <form class="w3-container" id="contato_forms" action="">
      <div class="w3-row w3-section">
        <span>Nome:</span>
        <input class="w3-input w3-border" type="text" name="nomecompleto" />
      </div>
      <div class="w3-row w3-section">
        <span>Email:</span>
        <input class="w3-input w3-border" name="regemail" type="text" />
      </div>
      <div class="w3-row w3-section">
        <span>Assunto:</span>
        <input class="w3-input w3-border" type="text" name="assunto" />
      </div>
      <div class="w3-row w3-section">
        <span>Mensagem:</span>
        <textarea name="mensagem" id="mensagem" rows="6"></textarea>
      </div>
      <div class="w3-row w3-section w3-center">
        <button class="w3-button s4 l4 w3-blue" id="button_contato">Enviar</button>
      </div>
    </form>
  </div>
</template>
