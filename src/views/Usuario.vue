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
                          {{item.nickname}}
                      </option>
                  </select>
              </div>
          </form>
        <p><button class="w3-btn w3-cyan" @click="submitCoachClass">Marcar aula</button></p>
      </div>

      <div class="w3-table" id="bought-classes-div">
        <h2>Aulas marcadas</h2>
        <table class="w3-table-all w3-hoverable">
          <tr>
            <th>Professor</th>
            <th>E-mail do professor</th>
            <th>Celular do professor</th>
            <th>Data do pedido</th>
            <th>Horário</th>
            <th>Quant aulas</th>
          </tr>
          <tr v-for="(item, index) in coachClasses.planned" :key="index">
            <td>{{item.professor}}</td>
            <td>{{item.prof_email}}</td>
            <td>{{item.prof_celular}}</td>
            <td>{{getDate(item.date)}}</td>
            <td>{{getTime(item.date)}}</td>
            <td>{{item.quantity}}</td>
          </tr>
        </table>
        <h2>Aulas confirmadas</h2>
        <table class="w3-table-all w3-hoverable">
          <tr>
            <th>Professor</th>
            <th>E-mail do professor</th>
            <th>Celular do professor</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Quant aulas</th>
          </tr>
          <tr v-for="(item, index) in coachClasses.confirmed" :key="index">
            <td>{{item.professor}}</td>
            <td>{{item.prof_email}}</td>
            <td>{{item.prof_celular}}</td>
            <td>{{getDate(item.date)}}</td>
            <td>{{getTime(item.date)}}</td>
            <td>{{item.quantity}}</td>
          </tr>
        </table>
      </div>


  </div>
</template>

<script>
export default {
  computed: {
    usertype() {
      return localStorage.getItem('usertype');
    },
    userid() {
      return localStorage.getItem('userid');
    },
    coachQuantities: function(){
      if (this.cchquantity > 0){
        return [...Array(this.cchquantity).keys()].map(i => i + 1)
      }
      else{
        return 0
      }
    },

  },
  mounted() {
    this.getCreditsQuantity()
    this.getProfessors()
    this.getcoachClasses()
  },
  data () {
    return {
      coachClasses: {
        "planned": [],
        "confirmed": []
      },

      availableTeachers: [],
      selectedCoachTeacher: "",
      selectedCoachQuantity: 0,

      iniquantity: 0,
      intquantity: 0,
      avaquantity: 0,
      cchquantity: 0
    }
  },
  methods: {
    // get all coach classes, planned and confirmed, from DB
    getcoachClasses: async function(){
      const url = "http://localhost:3000/produtos/2"
      let status
      let self = this

      await fetch(url)
      .then(function(response){
        status = response.ok
        if(status){
          self.coachClasses.planned = []
          self.coachClasses.confirmed = []
          return response.json()
        }
        else{
          alert("Erro de conexão")
        }
      })
      .then(function(response){
        for (let i = 0; i < response.length; i++){
          let currClass = response[i]
          if (!currClass.condition){
            self.coachClasses.planned.push(currClass)
          }
          else{
            self.coachClasses.confirmed.push(currClass)
          }
        }
      })
    },
    // get all the available teachers (every user with type 2 permission) from the DB
    getProfessors: async function(){
      const url = "http://localhost:3000/usuarios"
      let status
      let self = this
      let teachers = []
      await fetch(url)
        .then(function(response) {
          status = response.ok
          if(status){
            return response.json()
          }
          else{
            alert('Erro de conexão')
          }
        })
        .then(function(response) {
          if(status) {
            for(let i = 0; i < response.length; i++) {
              let user = response[i]
              if (user.type_user == 2){ //type_user == 2 is the admin/professor permission type
                teachers.push(user)
              }
            }
          }
        }).then(function(){
          self.availableTeachers = teachers
        })
    },
    // get user info from the database using the current user id (saved on the localStorage)
    getUserInfo: async function(){
      let url = "http://localhost:3000/usuarios"
      let userInfo
      let status
      await fetch(url + "/" + this.userid)
      .then(function(response) {
          status = response.ok
          if(status)
            return response.json()
          else
            alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando.')
        })
      .then(function(response){
        userInfo = response
      })
      return userInfo
    },

    // verify if the purchase of the coach class is valid,
    // and if it is spend the wanted ammount of credits, send the purchased class info to the DB
    submitCoachClass: async function(){
      let currentDate = new Date()
      let professor
      for (let i = 0; i < this.availableTeachers.length; i++){
        if (this.availableTeachers[i].nickname == this.selectedCoachTeacher){
          professor = this.availableTeachers[i]
        }
      }
      const coinQuantity = this.selectedCoachQuantity

      if (!(coinQuantity >= 1) || !professor.nickname){
        return
      }
      this.cchquantity -= parseInt(coinQuantity)

      let url = "http://localhost:3000/usuarios"
      let status
      let userInfo = await this.getUserInfo()

      // search for the current ammount of coach classes credits the user have
      for(let i = 0; i < userInfo.remaining_classes.length; i++){
        if (userInfo.remaining_classes[i].product_id == 4){
          // update the userinfo to contain the new ammount of credits
          userInfo.remaining_classes[i].quantity = this.cchquantity
        }
      }

      // send a PATCH request to the DB with the updated ammount of credits
      await fetch(url + "/" + this.userid, {
        method: 'PATCH', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      })
        .then(function(response) {
        status = response.ok
        if(status) {
          return response.json()
        }
        else
          alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando.')
        })
          .then(function() {
          if(status) {
            alert('Agendamento realizado com sucesso')
          }
        })
      
      // 
      const newClass = {
        "condition": false,
        "date": currentDate,
        "professor": professor.nickname,
        "prof_email": professor.email,
        "prof_celular": professor.celular,
        "aluno": userInfo.email,
        "quantity": coinQuantity
      }

      url = "http://localhost:3000/produtos/2"
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(newClass)
      })

      this.getcoachClasses()

    },
    getDate: function(date){
      let formatedDate = new Date(date)
      return formatedDate.toDateString()
    },
    getTime: function(date){
      let time = new Date(date)
      return time.toTimeString()
    },
    // get current logged in user credits from DB
    getCreditsQuantity: async function() {
      let idusuario = this.userid
      let url = "http://localhost:3000/usuarios"
      let status;
      let self = this;

      await fetch(url + '/' + idusuario)
        .then(function(response) {
          status = response.ok;
          if(status)
            return response.json()
          else
            alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando.');
        })
        .then(function(response) {
          if(status) {
            let user = response
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