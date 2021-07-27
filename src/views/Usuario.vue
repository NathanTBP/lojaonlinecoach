<template>
  <div v-if="usertype==1" class="page" id="user_container">

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

      <h2 id="marcar-aula"> Marcar aula ao vivo com Coach</h2>
      <div id="container-page-aluascoach">
        <form class="w3-container w3-card-4 w3-bar">
              <div class="w3-bar-item" id="selected-quantity-coach">
                <h3>Quantidade de Aulas</h3>
                <select class="w3-select w3-border w3-large" v-model="selectedCoachQuantity">
                  <option value="" disabled selected>Quantidade</option>
                  <option v-for="(item, index) in coachQuantities" :key="index">
                    {{item}}
                  </option>
                </select>
              </div>
              <div class="w3-bar-item" id="select-hour-chooser">
                  <h3>Professores</h3>
                  <select class="w3-select w3-border w3-large" name="option" v-model="selectedCoachTeacher">
                      <option value="" disabled selected>selecione o professor</option>
                      <option v-for="(item, index) in availableTeachers" :key="index">
                          {{item}}
                      </option>
                  </select>
              </div>
          </form>
        <p><button class="w3-btn w3-cyan" @click="submitCoachClass">Marcar aula</button></p>
      </div>

  </div>
</template>

<script>
export default {
  computed: {
    usertype() {
    return localStorage.getItem('usertype');
    },
    coachQuantities: function(){
      return [...Array(this.cchquantity).keys()].map(i => i + 1)
    }
  },
  mounted() {
    this.getCreditsQuantity()
    this.setProfessors()
  },
  data () {
    return {
      availableTeachers: [],
      selectedCoachTeacher: "",
      selectedCoachQuantity: "",
      iniquantity: 0,
      intquantity: 0,
      avaquantity: 0,
      cchquantity: 0
    }
  },
  methods: {
    setProfessors: function(){
      const url = "http://localhost:3000/usuarios";
      fetch(url)
        .then(function(response){
          console.log(response)
          let users = response.json()
          for (let i = 0; i < users.length; i++){
            console.log(users[i])
          }
        })
    },
    submitCoachClass: function(){
      let currentDate = new Date().toISOString().split('T')
      const time = currentDate[1].split(':')
      currentDate[1] = time[0] + ":" + time[1]
      console.log(this.selectedCoachQuantity, this.selectedCoachTeacher, currentDate.join("-"))
      this.cchquantity -= parseInt(this.selectedCoachQuantity)
    },
    getCreditsQuantity: function() {
      let idusuario = localStorage.getItem('userid');
      let url = "http://localhost:3000/usuarios";
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
            if(user.remaining_classes) {
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
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
    }
  }
}
</script>