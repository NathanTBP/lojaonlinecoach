<template>
  <div class="page" id="user_container">

      <br>

      <h1>Meus Créditos:</h1>

      <h2>Vídeo Aulas: </h2> 
      <li class="w3-bar" style="list-style-type: none;">
      <img src="../img/coinVBronze.png" class="w3-bar-item w3-circle" style="width:70px"> 
      <span class="w3-bar-item w3-large"> {{iniquantity}} </span>
      <span class="w3-bar-item w3-large"> Iniciante </span>
      <img src="../img/coinVSilver.png" class="w3-bar-item w3-circle" style="width:70px"> 
      <span class="w3-bar-item w3-large"> {{intquantity}} </span>
      <span class="w3-bar-item w3-large"> Intermediárias </span>
      <img src="../img/coinV.png" class="w3-bar-item w3-circle" style="width:70px"> 
      <span class="w3-bar-item w3-large"> {{avaquantity}} </span>
      <span class="w3-bar-item w3-large"> Avançadas </span>
      </li>

      <h2> Aulas ao vivo com o coach </h2>
      <span class="w3-bar">
      <img src="../img/coinC.png" class="w3-bar-item w3-circle" style="width:70px"> 
      <span class="w3-bar-item w3-large"> {{cchquantity}} </span>
      <span class="w3-bar-item w3-large"> Coach </span>
      </span>

      <h2> Marcar aula ao vivo com Coach</h2>

      <h2> Aulas ao vivo com coach confirmadas </h2>

  </div>
</template>

<script>
export default {
  mounted() {
    this.getCreditsQuantity();
  },
  data () {
    return {
      iniquantity: 0,
      intquantity: 0,
      avaquantity: 0,
      cchquantity: 0
    }
  },
  methods: {
    getCreditsQuantity: function() {
      let idusuario = parseInt(localStorage.getItem('userid'));
      let url = "http://localhost:3000/users";
      let status;
      let self = this;

      fetch(url + '/' + idusuario)
        .then(function(response) {
          status = response.ok;
          if(status)
            return response.json();
          else
            alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando.');
        })
        .then(function(response) {
          if(status) {
            let user = response;
            for(let i = 0; i < user.remaining_classes.length; i++) {
              if(user.remaining_classes[i].product_id == 1) {
                self.iniquantity = user.remaining_classes[i].quantity;
              }
              else if(user.remaining_classes[i].product_id == 2) {
                self.intquantity = user.remaining_classes[i].quantity;
              }
              else if(user.remaining_classes[i].product_id == 3) {
                self.avaquantity = user.remaining_classes[i].quantity;
              }
              else if(user.remaining_classes[i].product_id == 4) {
                self.cchquantity = user.remaining_classes[i].quantity;
              }
            }
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
    }
  }
}
</script>