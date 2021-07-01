<template>
  <div class="page" id="container_contato">
    <h2>Contate conosco</h2>
    <h3>
      Preencha todos os campos abaixo ou mande um email para: example@email.com
    </h3>
    <p v-if="errors.length">
      <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ul>
        <li class="contato_error" :key="error.id" v-for="error in errors">{{ error }} </li>
      </ul>
    </p>
    <div class="w3-container" id="contato_forms">
      <div class="w3-row w3-section">
        <span>Nome:</span>
        <input class="w3-input w3-border" type="text" name="nomecompleto" id="nome" v-model="nome"/>
      </div>
      <div class="w3-row w3-section">
        <span>Email:</span>
        <input class="w3-input w3-border" name="regemail" type="text" id="email" v-model="email"/>
      </div>
      <div class="w3-row w3-section">
        <span>Assunto:</span>
        <input class="w3-input w3-border" type="text" name="assunto" id="assunto" v-model="assunto"/>
      </div>
      <div class="w3-row w3-section">
        <span>Mensagem:</span>
        <textarea name="mensagem" id="mensagem" rows="6" v-model="mensagem"></textarea>
      </div>
      <div class="w3-row w3-section w3-center">
        <button class="w3-button s4 l4 w3-blue" id="button_contato" @click.prevent="checkForm()">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contato',
  data() {
    return {
      errors: [],
      nome: null,
      email: null,
      assunto: null,
      mensagem: null
    }
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      if (!this.nome) {
        this.errors.push('Nome é obrigatório.');
      }
      if (!this.email) {
        this.errors.push('Digite o email.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Utilize um e-mail válido.');
      }
      if (!this.assunto) {
        this.errors.push('Assunto é obrigatório.');
      }
      if (!this.mensagem) {
        this.errors.push('Digite uma mensagem descrevendo o que você deseja.');
      }
      if (!this.errors.length) {
        return true;
      }
      if(e)
        e.preventDefault();
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}
</script>