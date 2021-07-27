<template>
  <div v-if="usertype==2" class="w3-container">
    <br><br>
    <div class="w3-row-padding">
      <div class="w3-responsive w3-small">
        <div id="card_admin" class="w3-center w3-card-4">
          <header class="w3-container w3-blue"><h2>Informações</h2></header>
          <div class="w3-container">
            <h6>Video aulas Iniciante total: {{ initotal }}</h6>
            <h6>Video aulas Intermediário total: {{ inttotal }}</h6>
            <h6>Video aulas Avançado total: {{ avatotal }}</h6>
            <h6>Aulas coach total: {{ cchtotal }}</h6>
          </div>
          <footer class="w3-container w3-green">
            <h2>Lucro total: {{ lucrototal }}</h2>
          </footer>
        </div>
        <div class="w3-col w3-container">

          <!--Card adicionar videoaula -->
          <div id="card_adic_videoaula" class="w3-modal">
            <div class="w3-modal-content w3-animate-top w3-card-4 loginreg_card">
              <header class="w3-container w3-center w3-indigo">
                <button class="w3-btn w3-display-topright" @click.prevent="closeAdicVideoAula()">&times;</button>
                <h4 class="w3-text-white">Adicionar Video Aula</h4>
              </header>
              <p v-if="errors.length">
                <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
                <ul>
                  <li :key="error.id" v-for="error in errors">{{ error }}</li>
                </ul>
              </p>
              <div class="w3-container">
                <div class="w3-row w3-section">
                  <span>Game:</span>
                  <input class="w3-radio" type="radio" name="game" value="lol" v-model="videoaulaGame">
                  <label> Lol </label>
                  <input class="w3-radio" type="radio" name="game" value="tft" v-model="videoaulaGame">
                  <label> TFT </label>
                </div>
                <div class="w3-row w3-section">
                  <span>Dificuldade:</span>
                  <input class="w3-radio" type="radio" name="difficulty" value="basico" v-model="videoaulaDifficulty">
                  <label> Básico </label>
                  <input class="w3-radio" type="radio" name="difficulty" value="intermediario" v-model="videoaulaDifficulty">
                  <label> Intermediário </label>
                  <input class="w3-radio" type="radio" name="difficulty" value="avancado" v-model="videoaulaDifficulty">
                  <label> Avançado </label>
                </div>
                <div class="w3-row w3-section">
                  <span>Titulo:</span>
                  <input class="w3-input w3-border" type="text" v-model="videoaulaTitle">
                </div>
                <div class="w3-row w3-section">
                  <span>Thumbnail:</span>
                  <input class="w3-input w3-border" type="url" v-model="videoaulaThumbnail">
                </div>
                <div class="w3-row w3-section">
                  <span>Descrição:</span>
                  <input class="w3-input w3-border" type="text" v-model="videoaulaDescription">
                </div>
                <div class="w3-row w3-section">
                  <span>Link da Aula:</span>
                  <input class="w3-input w3-border" type="url" v-model="videoaulaLink">
                </div>
              </div>
                <button class="w3-button w3-hover-indigo w3-blue produto_button" @click.prevent="adicVideoAula()">Adicionar</button>
            </div>
          </div>

          <h1>Video Aulas</h1>
          <input type="button" class="w3-button w3-gray w3-margin-right" value="Adicionar Video Aula" @click.prevent="toAdicVideoAula()">
          <h2> League of Legends </h2>
          <h4>Vídeo Aulas Iniciante</h4>
          <input type="text" class="w3-margin" placeholder="Search" v-model="videoaulaLolIniSearch">
          <table class="w3-table-all w3-hoverable">
            <tr>
              <th>Id</th>
              <th>Título</th>
              <th>Professor</th>
              <th>Quantidade</th>
              <th>Cancelar</th>
            </tr>
            <tr v-for="videoaulaLolIni in videoaulasLolIniFilter" :key="videoaulaLolIni.id">
              <td> {{videoaulaLolIni._id}} </td>
              <td> {{videoaulaLolIni.title}} </td>
              <td> {{videoaulaLolIni.professor}} </td>
              <td> {{videoaulaLolIni.quantity}} </td>
              <td><input class="cancel" type="button" value="  X  " @click.prevent="deleteVideoAula('lol', 'basico', videoaulaLolIni._id)"></td>
            </tr>
          </table><br><br>
          <h4>Vídeo Aulas Intermediário</h4>
          <input type="text" class="w3-margin" placeholder="Search" v-model="videoaulaLolIntSearch">
          <table class="w3-table-all w3-hoverable">
            <tr>
              <th>Id</th>
              <th>Título</th>
              <th>Professor</th>
              <th>Quantidade</th>
              <th>Cancelar</th>
            </tr>
            <tr v-for="videoaulaLolInt in videoaulasLolIntFilter" :key="videoaulaLolInt.id">
              <td> {{videoaulaLolInt._id}} </td>
              <td> {{videoaulaLolInt.title}} </td>
              <td> {{videoaulaLolInt.professor}} </td>
              <td> {{videoaulaLolInt.quantity}} </td>
              <td><input class="cancel" type="button" value="  X  " @click.prevent="deleteVideoAula('lol', 'intermediario', videoaulaLolInt._id)"></td>
            </tr>
          </table><br><br>
          <h4>Vídeo Aulas Avançado</h4>
          <input type="text" class="w3-margin" placeholder="Search" v-model="videoaulaLolAvaSearch">
          <table class="w3-table-all w3-hoverable">
            <tr>
              <th>Id</th>
              <th>Título</th>
              <th>Professor</th>
              <th>Quantidade</th>
              <th>Cancelar</th>
            </tr>
            <tr v-for="videoaulaLolAva in videoaulasLolAvaFilter" :key="videoaulaLolAva.id">
              <td> {{videoaulaLolAva._id}} </td>
              <td> {{videoaulaLolAva.title}} </td>
              <td> {{videoaulaLolAva.professor}} </td>
              <td> {{videoaulaLolAva.quantity}} </td>
              <td><input class="cancel" type="button" value="  X  " @click.prevent="deleteVideoAula('lol', 'avancado', videoaulaLolAva._id)"></td>
            </tr>
          </table><br><br>
        </div>

        <div class="w3-col w3-container">
          <h2> TeamFight Tactics </h2>
          <h4>Vídeo Aulas Iniciante</h4>
          <input type="text" class="w3-margin" placeholder="Search" v-model="videoaulaTftIniSearch">
          <table class="w3-table-all w3-hoverable">
            <tr>
              <th>Id</th>
              <th>Título</th>
              <th>Professor</th>
              <th>Quantidade</th>
              <th>Cancelar</th>
            </tr>
            <tr v-for="videoaulaTftIni in videoaulasTftIniFilter" :key="videoaulaTftIni.id">
              <td> {{videoaulaTftIni._id}} </td>
              <td> {{videoaulaTftIni.title}} </td>
              <td> {{videoaulaTftIni.professor}} </td>
              <td> {{videoaulaTftIni.quantity}} </td>
              <td><input class="cancel" type="button" value="  X  " @click.prevent="deleteVideoAula('tft', 'basico', videoaulaTftIni._id)"></td>
            </tr>
          </table><br><br>
          <h4>Vídeo Aulas Intermediário</h4>
          <input type="text" class="w3-margin" placeholder="Search" v-model="videoaulaTftIntSearch">
          <table class="w3-table-all w3-hoverable">
            <tr>
              <th>Id</th>
              <th>Título</th>
              <th>Professor</th>
              <th>Quantidade</th>
              <th>Cancelar</th>
            </tr>
            <tr v-for="videoaulaTftInt in videoaulasTftIntFilter" :key="videoaulaTftInt.id">
              <td> {{videoaulaTftInt._id}} </td>
              <td> {{videoaulaTftInt.title}} </td>
              <td> {{videoaulaTftInt.professor}} </td>
              <td> {{videoaulaTftInt.quantity}} </td>
              <td><input class="cancel" type="button" value="  X  " @click.prevent="deleteVideoAula('tft', 'intermediario', videoaulaTftInt._id)"></td>
            </tr>
          </table><br><br>
          <h4>Vídeo Aulas Avançado</h4>
          <input type="text" class="w3-margin" placeholder="Search" v-model="videoaulaTftAvaSearch">
          <table class="w3-table-all w3-hoverable">
            <tr>
              <th>Id</th>
              <th>Título</th>
              <th>Professor</th>
              <th>Quantidade</th>
              <th>Cancelar</th>
            </tr>
            <tr v-for="videoaulaTftAva in videoaulasTftAvaFilter" :key="videoaulaTftAva.id">
              <td> {{videoaulaTftAva._id}} </td>
              <td> {{videoaulaTftAva.title}} </td>
              <td> {{videoaulaTftAva.professor}} </td>
              <td> {{videoaulaTftAva.quantity}} </td>
              <td><input class="cancel" type="button" value="  X  " @click.prevent="deleteVideoAula('tft', 'avancado', videoaulaTftAva._id)"></td>
            </tr>
          </table><br><br>
        </div>

        <!--Card adicionar professor -->
        <div id="card_adic_prof" class="w3-modal">
          <div class="w3-modal-content w3-animate-top w3-card-4 loginreg_card">
            <header class="w3-container w3-center w3-indigo">
              <button class="w3-btn w3-display-topright" @click.prevent="closeAdicProf()">&times;</button>
              <h4 class="w3-text-white">Adicionar Professor</h4>
            </header>
            <p v-if="errors.length">
              <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
              <ul>
                <li :key="error.id" v-for="error in errors">{{ error }}</li>
              </ul>
            </p>
            <div class="w3-container">
              <div class="w3-row w3-section">
                <span>Link Foto:</span>
                <input class="w3-input w3-border" type="url" v-model="proffoto">
              </div>
              <div class="w3-row w3-section">
                <span>Email:</span>
                <input class="w3-input w3-border" type="text" v-model="profemail">
              </div>
              <div class="w3-row w3-section">
                <span>Nickname:</span>
                <input class="w3-input w3-border" type="text" v-model="profnickname">
              </div>
              <div class="w3-row w3-section">
                <span>Nome:</span>
                <input class="w3-input w3-border" type="text" v-model="profnome">
              </div>
              <div class="w3-row w3-section">
                <span>Sobrenome:</span>
                <input class="w3-input w3-border" type="text" v-model="profsobrenome">
              </div>
              <div class="w3-row w3-section">
                <span>Celular:</span>
                <input class="w3-input w3-border" type="tel" v-model="profcel">
              </div>
              <div class="w3-row w3-section">
                <span>Senha:</span>
                <input class="w3-input w3-border" type="password" v-model="profsenha">
              </div>
              <div class="w3-row w3-section">
                <span>Confirmar Senha:</span>
                <input class="w3-input w3-border" type="password" v-model="profsenha2">
              </div>
            </div>
              <button class="w3-button w3-hover-indigo w3-blue produto_button" @click.prevent="checkFormProf()">Adicionar</button>
          </div>
        </div>
        <!--Card edit professor -->
        <div id="card_edit_prof" class="w3-modal">
          <div class="w3-modal-content w3-animate-top w3-card-4 loginreg_card">
            <header class="w3-container w3-center w3-indigo">
              <button class="w3-btn w3-display-topright" @click.prevent="closeEditProf()">&times;</button>
              <h4 class="w3-text-white">Editar Professor</h4>
            </header>
            <p v-if="errors.length">
              <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
              <ul>
                <li :key="error.id" v-for="error in errors">{{ error }}</li>
              </ul>
            </p>
            <div class="w3-container">
              <div class="w3-row w3-section">
                <span>Id*:</span>
                <input class="w3-input w3-border" type="text" v-model="profid">
              </div>
              <div class="w3-row w3-section">
                <span>Link Foto:</span>
                <input class="w3-input w3-border" type="url" v-model="proffoto">
              </div>
              <div class="w3-row w3-section">
                <span>Email:</span>
                <input class="w3-input w3-border" type="text" v-model="profemail">
              </div>
              <div class="w3-row w3-section">
                <span>Nickname:</span>
                <input class="w3-input w3-border" type="text" v-model="profnickname">
              </div>
              <div class="w3-row w3-section">
                <span>Nome:</span>
                <input class="w3-input w3-border" type="text" v-model="profnome">
              </div>
              <div class="w3-row w3-section">
                <span>Sobrenome:</span>
                <input class="w3-input w3-border" type="text" v-model="profsobrenome">
              </div>
              <div class="w3-row w3-section">
                <span>Celular:</span>
                <input class="w3-input w3-border" type="tel" v-model="profcel">
              </div>
              <div class="w3-row w3-section">
                <span>Senha:</span>
                <input class="w3-input w3-border" type="password" v-model="profsenha">
              </div>
              <button class="w3-button w3-hover-indigo w3-blue produto_button" @click.prevent="editProf()">Editar</button>
              <button class="w3-button w3-hover-deep-orange w3-red produto_button" @click.prevent="deleteProf()">Excluir</button>
            </div>
          </div>
        </div>
        <div class="w3-container">
          <h4>Professores</h4>
          <input type="text" class="w3-margin-right" placeholder="Search" v-model="profSearch">
          <input type="button" class="w3-button w3-gray w3-margin-right" value="Adicionar Professor" @click.prevent="toAdicProf()">
          <input type="button" class="w3-button w3-gray" value="Editar Professor" @click.prevent="toEditProf()">
        </div><br>
        <table class="w3-table-all w3-hoverable prof_table">
          <tr>
            <th>Foto</th>
            <th>Id</th>
            <th>Nickname</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>
          <tr v-for="prof in profsFilter" :key="prof.id">
            <td> <img class="photo" :src="prof.photo" alt="Foto prof"> </td>
            <td> {{prof._id}} </td>
            <td> {{prof.nickname}} </td>
            <td> {{prof.first_name}} </td>
            <td> {{prof.last_name}} </td>
            <td> {{prof.email}} </td>
            <td> {{prof.celular}} </td>
          </tr>
        </table> <br>

        <div class="w3-container">
            <h4>Alunos</h4>
            <input type="text" class="w3-margin-right" placeholder="Search" v-model="alunoSearch">
            <input type="button" class="w3-button w3-gray" value="Editar Aluno" @click.prevent="toEditAluno()">
        </div><br>
        <!--Card edit aluno -->
        <div id="card_edit_aluno" class="w3-modal">
          <div class="w3-modal-content w3-animate-top w3-card-4 loginreg_card">
            <header class="w3-container w3-center w3-indigo">
              <button class="w3-btn w3-display-topright" @click.prevent="closeEditAluno()">&times;</button>
              <span class="w3-text-white">Editar Aluno</span>
            </header>
            <p v-if="errors.length">
              <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
              <ul>
                <li :key="error.id" v-for="error in errors">{{ error }}</li>
              </ul>
            </p>
            <div class="w3-container">
              <div class="w3-row w3-section">
                <span>Id*:</span>
                <input class="w3-input w3-border" type="text" v-model="alunoid">
              </div>
              <div class="w3-row w3-section">
                <span>Email:</span>
                <input class="w3-input w3-border" type="text" v-model="alunoemail">
              </div>
              <div class="w3-row w3-section">
                <span>Nome:</span>
                <input class="w3-input w3-border" type="text" v-model="alunonome">
              </div>
              <div class="w3-row w3-section">
                <span>Sobrenome:</span>
                <input class="w3-input w3-border" type="text" v-model="alunosobrenome">
              </div>
              <div class="w3-row w3-section">
                <span>Celular:</span>
                <input class="w3-input w3-border" type="tel" v-model="alunocel">
              </div>
              <div class="w3-row w3-section">
                <span>Senha:</span>
                <input class="w3-input w3-border" type="password" v-model="alunosenha">
              </div>
              <div class="w3-row w3-section">
                <span>Adicionar Crédito Iniciante:</span>
                <input class="w3-input w3-border" type="number" min="0" v-model="alunoini">
              </div>
              <div class="w3-row w3-section">
                <span>Adicionar Crédito Intermediário:</span>
                <input class="w3-input w3-border" type="number" min="0" v-model="alunoint">
              </div>
              <div class="w3-row w3-section">
                <span>Adicionar Crédito Avançado:</span>
                <input class="w3-input w3-border" type="number" min="0" v-model="alunoava">
              </div>
              <div class="w3-row w3-section">
                <span>Adicionar Crédito Coach:</span>
                <input class="w3-input w3-border" type="number" min="0" v-model="alunocch">
              </div>
              <button class="w3-button w3-hover-indigo w3-blue produto_button" @click.prevent="editAluno()">Editar</button>
              <button class="w3-button w3-hover-deep-orange w3-red produto_button" @click.prevent="deleteAluno()">Excluir</button>
            </div>
          </div>
        </div>
        <table class="w3-table-all w3-hoverable">
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Créditos Iniciante</th>
            <th>Créditos Intermediário</th>
            <th>Créditos Avançado</th>
            <th>Nº Aulas Coach Dispon.</th>
          </tr>
          <tr v-for="aluno in alunosFilter" :key="aluno.id">
            <td> {{aluno._id}} </td>
            <td> {{aluno.first_name}} </td>
            <td> {{aluno.last_name}} </td>
            <td> {{aluno.email}} </td>
            <td> {{aluno.celular}} </td>
            <td> {{aluno.quant_aulas.ini}} </td>
            <td> {{aluno.quant_aulas.int}} </td>
            <td> {{aluno.quant_aulas.ava}} </td>
            <td> {{aluno.quant_aulas.cch}} </td>
          </tr>
        </table>
        <br>
        <div class="w3-col s12 w3-container">
          <h4>Aulas Confirmadas</h4>
          <table class="w3-table-all w3-hoverable">
            <tr>
              <th>N° Pedido</th>
              <th>Email Aluno</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Professor</th>
              <th>Jogo</th>
              <th>Nível</th>
              <th>Quant aulas</th>
              <th>Cancelar</th>
            </tr>
            <tr>
              <td>000002</td>
              <td>will_smith123@hotmail.com</td>
              <td>29/05/2021</td>
              <td>12:00</td>
              <td>Cadinho de Michael</td>
              <td>TFT</td>
              <td>Iniciante</td>
              <td>1</td>
              <td><input class="cancel" type="button" value="  X  "></td>
            </tr>
          </table>

        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  mounted: function() {
    this.getVideoAulas();
    this.getProfs();
    this.getAlunos();
  },
  computed: {
    usertype() {
    return localStorage.getItem('usertype');
    },
    userid() {
    return localStorage.getItem('userid');
    },
    videoaulasLolIniFilter() {
      return this.videoaulasLolIni.filter(videoaula => {
      if(videoaula.title.toLowerCase().includes(this.videoaulaLolIniSearch))
        return videoaula;
      else if(videoaula.professor.toLowerCase().includes(this.videoaulaLolIniSearch))
        return videoaula;
      });
    },
    videoaulasLolIntFilter() {
      return this.videoaulasLolInt.filter(videoaula => {
      if(videoaula.title.toLowerCase().includes(this.videoaulaLolIntSearch))
        return videoaula;
      else if(videoaula.professor.toLowerCase().includes(this.videoaulaLolIntSearch))
        return videoaula;
      });
    },
    videoaulasLolAvaFilter() {
      return this.videoaulasLolAva.filter(videoaula => {
      if(videoaula.title.toLowerCase().includes(this.videoaulaLolAvaSearch))
        return videoaula;
      else if(videoaula.professor.toLowerCase().includes(this.videoaulaLolAvaSearch))
        return videoaula;
      });
    },
    videoaulasTftIniFilter() {
      return this.videoaulasTftIni.filter(videoaula => {
      if(videoaula.title.toLowerCase().includes(this.videoaulaTftIniSearch))
        return videoaula;
      else if(videoaula.professor.toLowerCase().includes(this.videoaulaTftIniSearch))
        return videoaula;
      });
    },
    videoaulasTftIntFilter() {
      return this.videoaulasTftInt.filter(videoaula => {
      if(videoaula.title.toLowerCase().includes(this.videoaulaTftIntSearch))
        return videoaula;
      else if(videoaula.professor.toLowerCase().includes(this.videoaulaTftIntSearch))
        return videoaula;
      });
    },
    videoaulasTftAvaFilter() {
      return this.videoaulasTftAva.filter(videoaula => {
      if(videoaula.title.toLowerCase().includes(this.videoaulaTftAvaSearch))
        return videoaula;
      else if(videoaula.professor.toLowerCase().includes(this.videoaulaTftAvaSearch))
        return videoaula;
      });
    },
    profsFilter() {
      return this.profs.filter(prof => {
        if(prof.first_name.toLowerCase().includes(this.profSearch))
          return prof;
        else if(prof.last_name.toLowerCase().includes(this.profSearch))
          return prof;
        else if(prof.email.toLowerCase().includes(this.profSearch))
          return prof;
        else if(prof.nickname.toLowerCase().includes(this.profSearch))
          return prof;
      
      });
    },
    alunosFilter() {
      return this.alunos.filter(aluno => {
        if(aluno.first_name.toLowerCase().includes(this.alunoSearch))
          return aluno;
        else if(aluno.last_name.toLowerCase().includes(this.alunoSearch))
          return aluno;
        else if(aluno.email.toLowerCase().includes(this.alunoSearch))
          return aluno;
      });
    }
  },
  data () {
    return {
      errors: [],
      videoaulaGame: null,
      videoaulaDifficulty: null,
      videoaulaTitle: null,
      videoaulaThumbnail: null,
      videoaulaDescription: null,
      videoaulaLink: null,
      videoaulasLolIni: [],
      videoaulasLolInt: [],
      videoaulasLolAva: [],
      videoaulaLolIniSearch: "",
      videoaulaLolIntSearch: "",
      videoaulaLolAvaSearch: "",
      videoaulasTftIni: [],
      videoaulasTftInt: [],
      videoaulasTftAva: [],
      videoaulaTftIniSearch: "",
      videoaulaTftIntSearch: "",
      videoaulaTftAvaSearch: "",
      profs: [],
      profSearch: "",
      profid: null,
      proffoto: null,
      profemail: null,
      profnickname: null,
      profnome: null,
      profsobrenome: null,
      profcel: null,
      profsenha: null,
      profsenha2: null,
      alunos: [],
      dados: [],
      alunoSearch: "",
      alunoid: null,
      alunoemail: null,
      alunonome: null,
      alunosobrenome: null,
      alunocel: null,
      alunosenha: null,
      alunoini: 0,
      alunoint: 0,
      alunoava: 0,
      alunocch: 0
    }
  },
  methods: {
    getVideoAulas: function() {
      const self = this;
      let url = "http://localhost:3000/produtos/1";
      let status;
      self.videoaulasLolIni = [];
      self.videoaulasLolInt = [];
      self.videoaulasLolAva = [];
      self.videoaulasTftIni = [];
      self.videoaulasTftInt = [];
      self.videoaulasTftAva = [];

      fetch(url)
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
              let game = response[i].name_game;
              let difficulty = response[i].difficulty;
              let videoaula = response[i];
              //lol
              if(game === "lol") {
                if(difficulty === "basico") {
                  self.videoaulasLolIni.push(videoaula);
                }
                else if(difficulty === "intermediario") {
                  self.videoaulasLolInt.push(videoaula);
                }
                else if(difficulty === "avancado") {
                  self.videoaulasLolAva.push(videoaula);
                }
              }
              //tft
              else if(game === "tft") {
                if(difficulty === "basico") {
                  self.videoaulasTftIni.push(videoaula);
                }
                else if(difficulty === "intermediario") {
                  self.videoaulasTftInt.push(videoaula);
                }
                else if(difficulty === "avancado") {
                  self.videoaulasTftAva.push(videoaula);
                }
              }
            }
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
    },
    toAdicVideoAula: function () {
      document.getElementById('card_adic_videoaula').style.display='block';
    },
    closeAdicVideoAula: function () {
      this.clearProf();
      document.getElementById('card_adic_videoaula').style.display='none';
    },
    adicVideoAula: function () {
      const self = this;
      let urlProf = "http://localhost:3000/usuarios";
      let urlVideoAula = "http://localhost:3000/produtos/1"
      let status;

      this.errors = [];
      if (!this.videoaulaGame) {
        this.errors.push('O game é obrigatório.');
      }
      if (!this.videoaulaDifficulty) {
        this.errors.push('A dificuldade é obrigatório.');
      }
      if (!this.videoaulaTitle) {
        this.errors.push('O titulo é obrigatório.');
      }
      if (!this.videoaulaThumbnail) {
        this.errors.push('A thumbnail é obrigatório.');
      }
      if (!this.videoaulaDescription) {
        this.errors.push('A descrição é obrigatório.');
      }
      if (!this.videoaulaLink) {
        this.errors.push('O link é obrigatório.');
      }
      //tudo preenchido
      if (!this.errors.length) {
        let dados = {
        name_game: self.videoaulaGame,
        difficulty: self.videoaulaDifficulty,
        title: self.videoaulaTitle,
        thumbnail: self.videoaulaThumbnail,
        description: self.videoaulaDescription,
        link: self.videoaulaLink,
        quantity: 0
        };

        fetch(urlProf + '/' + self.userid)
        .then(function(response) {
          status = response.ok;
          if(status)
            return response.json();
          else
            alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando.');
        })
        .then(function(response) {
          if(status) {
            dados.professor = response.nickname;
            console.log(response.nickname);
            //insercao da video aula
            fetch(urlVideoAula, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify(dados)
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
                alert('Cadastro de Video aula registrado com sucesso!');
                self.getVideoAulas();
              }
            })
            .catch(function(error) {
              console.log('Error ' + error.message)
            })
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
      }
    },
    deleteVideoAula: function (game, difficulty, id) {
      if(confirm('Deseja realmente excluir essa video aula?')) {
        console.log(game, difficulty, id);
        let url = "http://localhost:3000/produtos/1";
        let status;
        let self = this;

        fetch(url + '/' + id, {
          method: 'DELETE',
        })
        .then(function(response) {
        status = response.ok;
        if(status) {
          return response.json();
        }
        else {
          alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando ou id do aluno não existe!.');
          return;
        }
        })
        .then(function() {
          if(status)
            alert('Video Aula excluído com sucesso!!!');
            self.getVideoAulas();
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
        }
    },
    clearProf: function () {
      this.errors = [];
      this.profs = [];
      this.profid = null;
      this.proffoto = null;
      this.profemail = null;
      this.profnickname = null;
      this.profnome = null;
      this.profsobrenome = null;
      this.profcel = null;
      this.profsenha = null;
      this.profsenha2 = null;
    },
    getProfs: function () {
      const self = this;
      let url = "http://localhost:3000/usuarios";
      let status;
      self.profs = [];

      fetch(url)
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
              let user = response[i];
              if (user.type_user == 2) {
                self.profs.push(user);
              }
            }
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
    },
    toAdicProf: function () {
      document.getElementById('card_adic_prof').style.display='block';
    },
    closeAdicProf: function () {
      this.clearProf();
      document.getElementById('card_adic_prof').style.display='none';
    },
    toEditProf: function () {
      document.getElementById('card_edit_prof').style.display='block';
    },
    closeEditProf: function () {
      this.clearProf();
      document.getElementById('card_edit_prof').style.display='none';
    },

    checkFormProf: function () {
      this.errors = [];

      if (!this.proffoto) {
        this.errors.push('O link da foto é obrigatório.');
      }
      if (!this.profemail) {
        this.errors.push('O email é obrigatório.');
      } else if (!this.validEmail(this.profemail)) {
        this.errors.push('Utilize um e-mail válido.');
      }
      if (!this.profnickname) {
        this.errors.push('O nickname é obrigatório.');
      }
      if (!this.profnome) {
        this.errors.push('O nome é obrigatório.');
      }
      if (!this.profsobrenome) {
        this.errors.push('O sobrenome é obrigatório.');
      }
      if (!this.profcel) {
        this.errors.push('O número é obrigatório.');
      }
      if (!this.profsenha) {
        this.errors.push('Digite uma senha.');
      }
      if (this.profsenha !== this.profsenha2) {
        this.errors.push('Senhas não coincidem.');
      }
      if (!this.errors.length) {
        this.verifyProf();
        return true;
      }
    },
    verifyProf: function() {
      const self = this;
      let existEmail = false;
      let existNickname = false;
      let url = "http://localhost:3000/usuarios";
      let status;

      this.errors = [];
      fetch(url)
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
              let user = response[i];
              if(self.profemail == user.email) {
                existEmail = true;
                break;
              }
              if(self.profnickname == user.nickname) {
                existNickname = true;
              }
            }
            if(existEmail) {
              self.errors.push('Email já existe!');
              return;
            }
            if(existNickname) {
              self.errors.push('Nickname já existe!');
              return;
            }
            else {
              self.profregisterConfirmed();
            }
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
    },
    profregisterConfirmed: function() {
      const self = this;
      let url = "http://localhost:3000/usuarios";
      let status;
      let dados = {
        first_name: self.profnome,
        last_name: self.profsobrenome,
        celular: self.profcel,
        nickname: self.profnickname,
        photo: self.proffoto,
        email: self.profemail,
        password: self.profsenha,
        type_user: 2,
        live_classes: []
      };

      fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(dados)
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
        alert('Cadastro de professor registrado com sucesso!');
        self.getProfs();
      })
      .catch(function(error) {
        console.log('Error ' + error.message)
      })

      this.clearProf();
    },

    verifyEditProf: async function () {
      let self = this;
      let url = "http://localhost:3000/usuarios";
      let status;
      let isvalidEmail;
      self.dados = {};
      self.errors = [];

      //id
      if (!self.profid) {
        self.errors.push('Id é obrigatório.');
        return false;
      }
      //email
      if (self.profemail) {
        if (!self.validEmail(self.profemail)) {
          self.errors.push('Email inválido.');
          return false;
        }
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
              let user = response[i];
              if(self.profemail == user.email) {
                if(self.profid == user.id) {
                  self.errors.push('Mesmo email!');
                  isvalidEmail = false;
                }
                else {
                  self.errors.push('Email já registrado por outro usuário!');
                  isvalidEmail = false;
                }
              }
            }
            self.dados.email = self.profemail;
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
        if(!isvalidEmail)
          return false;
      }
      if (self.profid) {
      self.dados._id = self.id;
      }
      if (self.proffoto) {
      self.dados.photo = self.proffoto;
      }
      if (self.profnickname) {
      self.dados.nickname = self.profnickname;
      }
      if (self.profnome) {
      self.dados.first_name = self.profnome;
      }
      if (self.profsobrenome) {
        self.dados.last_name = self.profsobrenome;
      }
      if (self.profcel) {
        self.dados.celular = self.profcel;
      }
      if (self.profsenha) {
        self.dados.password = self.profsenha;
      }
      return true;
    },
    editProf: async function() {
      let self = this;
      let url = "http://localhost:3000/usuarios";
      let status;
      this.errors = [];

      const result = await new Promise(resolve => {
          setTimeout(() => {
            resolve(self.verifyEditProf());
          }, 100);
        })
      if(result) {
        fetch(url + '/' + self.profid, {
          method: 'PATCH', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(self.dados),
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
            alert('Professor editado com sucesso!');
            self.getProfs();
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
        self.clearAluno();
      }
      else {
        alert('Verifique os erros!');
      }
    },
    deleteProf: function() {
      let url = "http://localhost:3000/usuarios";
      let status;
      let self = this;

      fetch(url + '/' + self.profid, {
        method: 'DELETE',
      })
      .then(function(response) {
      status = response.ok;
      if(status) {
        return response.json();
      }
      else {
        alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando ou id do aluno não existe!.');
        return;
      }
      })
      .then(function() {
        if(status) {
          alert('Professor excluído com sucesso!!!');
          self.getProfs();
        }
      })
      .catch(function(error) {
        console.log('Error ' + error.message)
      })
    },
    clearAluno: function () {
      this.errors = [];
      this.dados = [];
      this.alunoid = null;
      this.alunoemail = null;
      this.alunonome = null;
      this.alunosobrenome = null;
      this.alunocel = null;
      this.alunosenha = null;
      this.alunoini = 0;
      this.alunoint = 0;
      this.alunoava = 0;
      this.alunocch = 0;
    },
    getAlunos: function () {
      const self = this;
      let url = "http://localhost:3000/usuarios";
      let status;
      self.alunos = [];

      fetch(url)
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
              let user = response[i];
              if (user.type_user == 1) {
                let quant_aulas = {ini: 0, int: 0, ava: 0, cch: 0};
                if(user.remaining_classes) {
                  for(let j = 0; j < user.remaining_classes.length; j++) {
                    if(user.remaining_classes[j].product_id == 1) {
                      quant_aulas.ini = user.remaining_classes[j].quantity;
                    }
                    else if(user.remaining_classes[j].product_id == 2) {
                      quant_aulas.int = user.remaining_classes[j].quantity;
                    }
                    else if(user.remaining_classes[j].product_id == 3) {
                      quant_aulas.ava = user.remaining_classes[j].quantity;
                    }
                    else if(user.remaining_classes[j].product_id == 4) {
                      quant_aulas.cch = user.remaining_classes[j].quantity;
                    }
                  }
                }
                user.quant_aulas = quant_aulas;
                self.alunos.push(user);
              }
            }
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
    },
    toEditAluno: function () {
      document.getElementById('card_edit_aluno').style.display='block';
    },
    closeEditAluno: function () {
      this.clearAluno();
      document.getElementById('card_edit_aluno').style.display='none';
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    verifyEditAluno: async function () {
      let self = this;
      let url = "http://localhost:3000/usuarios";
      let status;
      let user_remaining_classes;
      let isvalidEmail;
      let existclass = [false, false, false, false];
      self.dados = {};
      self.errors = [];

      //creditos
      await fetch(url + '/' + self.alunoid)
      .then(function(response) {
        status = response.ok;
        if(status)
          return response.json();
        else
          alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando.');
      })
      .then(function(user) {
        if(status) {
          self.dados = user;
          user_remaining_classes = user.remaining_classes;
          for(let j = 0; j < user_remaining_classes.length; j++) {
            if(user.remaining_classes[j].product_id == 1) {
                existclass[0] = true;
                user.remaining_classes[j].quantity += parseInt(self.alunoini);
            }
            else if(user.remaining_classes[j].product_id == 2) {
              existclass[1] = true;
              user.remaining_classes[j].quantity += parseInt(self.alunoint);
            }
            else if(user.remaining_classes[j].product_id == 3) {
              existclass[2] = true;
              user.remaining_classes[j].quantity += parseInt(self.alunoava);
            }
            else if(user.remaining_classes[j].product_id == 4) {
              existclass[3] = true;
              user.remaining_classes[j].quantity += parseInt(self.alunocch);
            }
          }
          if(!existclass[0]) {
              user_remaining_classes.push({product_id: 1, quantity: parseInt(self.alunoini)});
          }
          if(!existclass[1]) {
              user_remaining_classes.push({product_id: 2, quantity: parseInt(self.alunoint)});
          }
          if(!existclass[2]) {
              user_remaining_classes.push({product_id: 3, quantity: parseInt(self.alunoava)});
          }
          if(!existclass[3]) {
              user_remaining_classes.push({product_id: 4, quantity: parseInt(self.alunocch)});
          }
          self.dados.remaining_classes = user_remaining_classes;
        }
      })
      .catch(function(error) {
        console.log('Error ' + error.message)
      })
      if(!self.alunoid) {
        self.errors.push('Id é obrigatório!');
      }
      if (self.alunonome) {
        self.dados.first_name = self.alunonome;
      }
      if (self.alunosobrenome) {
        self.dados.last_name = self.alunosobrenome;
      }
      if (self.alunocel) {
        self.dados.celular = self.alunocel;
      }
      if (self.alunosenha) {
        self.dados.password = self.alunosenha;
      }

      //email
      if (self.alunoemail) {
        if (!self.validEmail(self.alunoemail)) {
          self.errors.push('Email inválido.');
          return false;
        }
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
              let user = response[i];
              if(self.alunoemail == user.email) {
                if(self.alunoid == user._id) {
                  self.errors.push('Mesmo email!');
                  isvalidEmail = false;
                }
                else {
                  self.errors.push('Email já registrado por outro usuário!');
                  isvalidEmail = false;
                }
              }
            }
            self.dados.email = self.alunoemail;
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
        if(!isvalidEmail)
          return false;
      }
      return true;
    },
    editAluno: async function() {
      const self = this;
      let url = "http://localhost:3000/usuarios";
      let status;
      this.errors = [];

      const result = await new Promise(resolve => {
          setTimeout(() => {
            resolve(self.verifyEditAluno());
          }, 100);
        })
      if(result) {
        fetch(url + '/' + self.alunoid, {
          method: 'PATCH', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(self.dados),
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
            alert('Aluno editado com sucesso!');
            self.getAlunos();
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
        self.clearAluno();
      }
      else {
        alert('Verifique os erros!');
      }
    },
    deleteAluno: function() {
      let url = "http://localhost:3000/usuarios";
      let status;
      let self = this;

      fetch(url + '/' + self.alunoid, {
        method: 'DELETE',
      })
      .then(function(response) {
      status = response.ok;
      if(status) {
        return response.json();
      }
      else {
        alert('Erro de conexão. Verifique se o servidor da pasta /database está funcionando ou id do aluno não existe!.');
        return;
      }
      })
      .then(function() {
        if(status) {
          alert('Aluno excluído com sucesso!!!');
          self.getAlunos();
        }
      })
      .catch(function(error) {
        console.log('Error ' + error.message)
      })
    }
  }
}
</script>