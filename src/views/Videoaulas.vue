<template>
  <div>
    <br>
    <div class="w3-container">
    <h2 class="w3-center">Video Aulas:</h2>

    <input type="text" class="w3-margin" placeholder="Titulo ou Professor" v-model="videoaulaSearch">
          <table class="w3-table-all w3-hoverable">
            <tr>
              <th></th>
              <th>Jogo</th>
              <th>Dificuldade</th>
              <th>Titulo</th>
              <th>Professor</th>
              <th>Descrição</th>
              <th></th>
            </tr>
            <tr v-for="videoaula in videoaulasFilter" :key="videoaula.id">
              <td> <img class="thumbnail" :src="videoaula.thumbnail" alt="Thumbnail"> </td>
              <td> {{videoaula.name_game}} </td>
              <td> {{videoaula.difficulty}} </td>
              <td> {{videoaula.title}} </td>
              <td> {{videoaula.professor}} </td>
              <td> {{videoaula.description}} </td>
              <td><input class="unlock" type="button" value=" Desbloquear " @click.prevent="unlockVideoAula(videoaula._id, videoaula.difficulty)"></td>
            </tr>
          </table><br><br><br><br>

    </div>
    <!--Bottom bar with credits-->
    <div v-if="usertype==1" class="w3-bottom bar_bottom w3-black w3-xxxlarge">
        <div class="w3-third">
          <img
            class="videoaulas_coin"
            src="../img/coinVBronze.png"
            alt="Moeda Video Iniciante"
          />
          <span> {{creditini}} </span>
        </div>
        <div class="w3-third">
          <img
            class="videoaulas_coin"
            src="../img/coinVSilver.png"
            alt="Moeda Video Iniciante"
          />
          <span> {{creditint}} </span>
        </div>
        <div class="w3-third">
          <img
            class="videoaulas_coin"
            src="../img/coinV.png"
            alt="Moeda Video Iniciante"
          />
          <span> {{creditava}} </span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // get the user type from the local storage
    usertype() {
    return localStorage.getItem('usertype');
    },
    // get the user id from the local storage
    userid() {
    return localStorage.getItem('userid');
    },

    // filter the videoAulas to include only the ones that match the search input
    videoaulasFilter() {
      return this.videoaulas.filter(videoaula => {
      if(videoaula.title.toLowerCase().includes(this.videoaulaSearch))
        return videoaula;
      else if(videoaula.professor.toLowerCase().includes(this.videoaulaSearch))
        return videoaula;
      });
    }
  },
  async mounted() {
    // if the user is a client (type 1), gets user info
    if (this.usertype == 1)
      await this.getUserInfos();

    await this.getVideoAulas();
  },
  data: function () {
    return {
      videoaulas: [],
      unlockedvideoaulas: [],

      videoaulaSearch: "",

      creditini: 0,
      creditint: 0,
      creditava: 0
    }
  },
  methods: {
    // get user informations from the DB
    getUserInfos: async function () {
      let url = "https://server-online-coach.herokuapp.com/usuarios";
      let status;
      let self = this;

     await fetch(url + '/' + self.userid)
      .then(function(response) {
          status = response.ok;
          if(status)
            return response.json();
          else
            alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando.');
        })
      .then(function(response) {
        let user = response;
        if(status) {
          if(user.remaining_classes) {
            for(let j = 0; j < user.remaining_classes.length; j++) {
              if(user.remaining_classes[j].product_id == 1) {
                self.creditini = user.remaining_classes[j].quantity;
              }
              else if(user.remaining_classes[j].product_id == 2) {
                self.creditint = user.remaining_classes[j].quantity;
              }
              else if(user.remaining_classes[j].product_id == 3) {
                self.creditava = user.remaining_classes[j].quantity;
              }
            }
          }
          self.unlockedvideoaulas = user.acquired_classes;
        }
      })
      .catch(function(error) {
          console.log('Error ' + error.message)
        })
    },
    // get the video Aulas list from the DB
    getVideoAulas: async function () {
      const self = this;
      let url = "https://server-online-coach.herokuapp.com/produtos/1";
      let status;
      self.videoaulas = [];

      await fetch(url)
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
              let videoaula = response[i];
              let isunlocked = false;
              for(let j = 0; j < self.unlockedvideoaulas.length; j++) {
                if(self.unlockedvideoaulas[j]._id == videoaula._id) {
                  isunlocked = true;
                  break;
                }
              }
              if(!isunlocked)
                self.videoaulas.push(videoaula);
            }
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
    },
    // unlocks the selected Video Aula
    unlockVideoAula: async function(videoaulaid, difficulty) {
      const self = this;
      let urlUser = "https://server-online-coach.herokuapp.com/usuarios";
      let urlVideoAula = "https://server-online-coach.herokuapp.com/produtos/1";
      let status;
      let isCredit = true;
      let credit;
      let user;
      let videoaula;

      if(self.usertype == 1) {
        await fetch(urlUser + '/' + self.userid)
        .then(function(response) {
            status = response.ok;
            if(status)
              return response.json();
            else
              alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando.');
          })
        .then(function(response) {
          if(status) {
            user = response;
            user.acquired_classes.push ({_id: videoaulaid});
            if(difficulty == "basico" && self.creditini == 0) {
              isCredit = false;
            }
            else if(difficulty == "intermediario" && self.creditint == 0) {
              isCredit = false;
            }
            else if (difficulty == "avancado" && self.creditava == 0) {
              isCredit = false;
            }
            if(isCredit) {
              if(difficulty == "basico") {
                self.creditini = self.creditini - 1;
                credit = 1;
              }
              else if(difficulty == "intermediario") {
                self.creditint =  self.creditint - 1;
                credit = 2;
              }
              else if (difficulty == "avancado") {
                self.creditava = self.creditava - 1;
                credit = 3;
              }
              for(let i = 0; i < user.remaining_classes.length; i++) {
                if(user.remaining_classes[i].product_id == credit) {
                  user.remaining_classes[i].quantity = user.remaining_classes[i].quantity - 1;
                  break;
                }
              }
            }
          }
        })
        .then(() => {
          if(isCredit) {
            //modify user data
            fetch(urlUser + '/' + self.userid, {
              method: 'PATCH', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
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
              if(status) {
                //increase video quantity
                fetch(urlVideoAula + '/' + videoaulaid)
                .then(function(response) {
                  status = response.ok;
                  if(status)
                    return response.json();
                  else
                    alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando.');
                })
                .then(function(response) {
                  if(status) {
                    videoaula = response;
                    videoaula.quantity = videoaula.quantity + 1;
                    fetch(urlVideoAula + '/' + videoaulaid, {
                      method: 'PATCH', // or 'PUT'
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(videoaula),
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
                      if(status) {
                        for(let k = 0; k < self.videoaulas.length; k++) {
                          if(self.videoaulas[k]._id == videoaulaid) {
                            self.videoaulas.splice(k, 1);
                            break;
                          }
                        }
                        alert('Desbloqueio realizada com sucesso! Acesse a pagina de usuário para ver o link da aula!');
                      }
                    })
                  }
                })
              }
            })
            .catch(function(error) {
              console.log('Error ' + error.message)
            })
          }
          else {
            alert('Credito insuficiente!!');
          }
        })
      }
      else {
        alert("Faça login para poder comprar!");
      }
    }
  }
}
</script>