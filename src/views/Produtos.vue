<template>
  <div v-if="products.length" class="page" id="container_produtos">
    <div id="produto_alert_container">
      <div v-if="btn_buy_ini" class="w3-animate-right buy_alert">
        <span>Compra adicionado ao carrinho!</span>
        <a @click="closeAlert('ini')" class="buy_close">&times;</a>
      </div>
      <div v-if="btn_buy_int" class="w3-animate-right buy_alert">
        <span>Compra adicionado ao carrinho!</span>
        <a @click="closeAlert('int')" class="buy_close">&times;</a>
      </div>
      <div v-if="btn_buy_ava" class="w3-animate-right buy_alert">
        <span>Compra adicionado ao carrinho!</span>
        <a @click="closeAlert('ava')" class="buy_close">&times;</a>
      </div>
      <div v-if="btn_buy_cch" class="w3-animate-right buy_alert">
        <span>Compra adicionado ao carrinho!</span>
        <a @click="closeAlert('cch')" class="buy_close">&times;</a>
      </div>
      <div v-if="buy_cart == 1" class="w3-animate-right buy_alert" id="buy_alert_cart">
        <span>Acesse o carrinho no ícone acima!</span>
        <a @click="closeAlert('cart')" class="buy_close" id="buy_close_cart">&times;</a>
      </div>
      <div v-if="buy_nothing" class="w3-animate-right buy_alert" id="buy_alert_nothing">
        <span>Adicione uma quantidade de crédito para comprar!</span>
        <a @click="closeAlert('not')" class="buy_close" id="buy_close_nothing">&times;</a>
      </div>
    </div>
    <h2 class="w3-center">Produtos:</h2>
    <h3>Como funciona:</h3>
    <h4>
      Compre créditos para desbloquear video aulas exclusivas ou créditos para
      agendar aulas ao vivo com nossos coachs!!!
    </h4>
    <h4>Vale tanto para Lol como TFT.</h4>
    <h4>
      Já possui créditos?
      <router-link to="/produtos/video-aulas">
        <a class="w3-btn w3-xlarge w3-cyan w3-margin" >Lista de Vídeo Aulas disponíveis</a>
      </router-link>
      <router-link to="/usuario">
        <a class="w3-btn w3-xlarge w3-cyan w3-margin" >Agende sua aula ao vivo com Coach</a>
      </router-link>
    </h4>

    <h1 class="w3-center">Vídeo Aulas</h1>
    <div id="container_comprar_videos">
      <div class="w3-card-4 item w3-center">
        <header class="w3-container w3-brown produto_header">
          <h4>Iniciante</h4>
          <img
            class="produto_elo"
            src="../img/Emblem_Iron.png"
            alt="Icone elo Ferro"
          />
          <img
            class="produto_elo"
            src="../img/Emblem_Bronze.png"
            alt="Icone Elo Bronze"
          />
          <img
            class="produto_elo"
            src="../img/Emblem_Silver.png"
            alt="Icone Elo Prata"
          />
        </header>

        <div class="w3-container">
          <h5>Preço: R$ {{ getProductIndexById(1)["info"]["price"] }}</h5>
          <br />
          <span class="produto_inputtext">Quantidade:</span>
          <input
            v-model="cart[0].quantity"
            class="w3-border w3-center produto_input produto_inputtext"
            type="number"
            min="0"
          />
          <img
            class="produtos_coin"
            src="../img/coinVBronze.png"
            alt="Moeda Video Iniciante"
          />
          <button
            @click="buy_product('ini')"
            class="w3-button w3-hover-indigo w3-blue produto_button"
          >
            Comprar
          </button>
        </div>
      </div>

      <div class="w3-card-4 item w3-center">
        <header class="w3-container w3-center w3-blue-grey produto_header">
          <h4>Intermediário</h4>
          <img
            class="produto_elo"
            src="../img/Emblem_Gold.png"
            alt="Icone elo Ouro"
          />
          <img
            class="produto_elo"
            src="../img/Emblem_Platinum.png"
            alt="Icone Elo Platina"
          />
        </header>

        <div class="w3-container">
          <h5>Preço: R$ {{ getProductIndexById(2)["info"]["price"] }}</h5>
          <br />
          <span class="produto_inputtext">Quantidade:</span>
          <input
            v-model="cart[1].quantity"
            class="w3-border w3-center produto_input produto_inputtext"
            type="number"
            min="0"
          />
          <img
            class="produtos_coin"
            src="../img/coinVSilver.png"
            alt="Moeda Video Intermediário"
          />
          <button
            @click="buy_product('int')"
            class="w3-button w3-hover-indigo w3-blue produto_button"
          >
            Comprar
          </button>
        </div>
      </div>

      <div class="w3-card-4 item w3-center">
        <header
          class="w3-container w3-center w3-amber w3-text-white produto_header"
        >
          <h4>Avançado</h4>
          <img
            class="produto_elo"
            src="../img/Emblem_Diamond.png"
            alt="Icone elo Diamante"
          />
          <img
            class="produto_elo"
            src="../img/Emblem_Master.png"
            alt="Icone Elo Mestre"
          />
        </header>

        <div class="w3-container">
          <h5>Preço: R$ {{ getProductIndexById(3)["info"]["price"] }}</h5>
          <br />
          <span class="produto_inputtext">Quantidade:</span>
          <input
            v-model="cart[2].quantity"
            class="w3-border w3-center produto_input produto_inputtext"
            type="number"
            min="0"
          />
          <img
            class="produtos_coin"
            src="../img/coinV.png"
            alt="Moeda Video Avançado"
          />
          <button
            @click="buy_product('ava')"
            class="w3-button w3-hover-indigo w3-blue produto_button"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
    <br /><br />
    <h1 class="w3-center">Contratar Coach</h1>
    <div id="container_comprar_coachs">
      <div class="w3-card-4">
        <header class="w3-container w3-deep-orange produto_header">
          <h3>Cada crédito equivale à 1 hora.</h3>
          <h4>Agende seu horário na página de usuário.</h4>
          <h4></h4>
        </header>

        <div class="w3-container">
          <h5>Preço: R$ {{ getProductIndexById(4)["info"]["price"] }}</h5>
          <br />
          <span class="produto_inputtext">Quantidade:</span>
          <input
            v-model="cart[3].quantity"
            class="w3-border w3-center produto_input produto_inputtext"
            type="number"
            min="0"
          />
          <img class="produtos_coin" src="../img/coinC.png" alt="Moeda Coach" />
          <button
            @click="buy_product('cch')"
            class="w3-button w3-hover-indigo w3-blue produto_button"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Produtos',
  // get the coins from the coins (product 3) from the DB
  mounted(){
      fetch('http://localhost:3000/produtos/3')
      .then(res => res.json())
      .then(data => this.products = data)

    // get the shopCart from the local storage
     if(localStorage.getItem('shopCart')){
        this.shopCart = JSON.parse(localStorage.getItem('shopCart'))
      }
  },
  updated(){
    // updates the local storage shopCart
    if(localStorage.getItem('shopCart')){
      let parsed = JSON.stringify(this.shopCart)
      localStorage.setItem("shopCart", parsed)
    }else{
      const parsed = JSON.stringify(this.shopCart)
      localStorage.setItem("shopCart", parsed)
    }
  },
  data: function () {
    return {
      cart:[
        {productId:1, quantity: 0},
        {productId:2, quantity: 0},
        {productId:3, quantity: 0},
        {productId:4, quantity: 0}
      ],


      products: [],
      shopCart:[],


      btn_buy_ini: false,
      btn_buy_int: false,
      btn_buy_ava: false,
      btn_buy_cch: false,
      buy_nothing: false,
      buy_cart: -1,


      clear_buy_ini: -1,
      clear_buy_int: -1,
      clear_buy_ava: -1,
      clear_buy_cch: -1,
      clear_buy_cart: -1,
    }
  },
  methods: {
    // using the product id as a parameter gets the product index
    getProductIndexById: function(productId){
      const result = this.products.find( ({id}) => id === productId )
      return result
    },

    // merge the produtos shopCart with the local storage shopCart
    mergeShopCart: function(cartIndex){

      const res = this.shopCart.find(({productId}) => productId === this.cart[cartIndex].productId)
      if (res){
        res.quantity = parseInt(this.cart[cartIndex].quantity)
      }else{
        const temp = {productId: this.cart[cartIndex].productId, quantity: this.cart[cartIndex].quantity}
        this.shopCart.push(temp)
      }
    },

    // verify every purchase made, and send relevant notifications if it goes through or doesn't
    buy_product: function(param) {
      if(param == 'ini' && this.cart[0].quantity > 0) {
        if(this.btn_buy_ini) {
            this.btn_buy_ini = false;
            clearTimeout(this.clear_buy_ini);
        }
        setTimeout(() => this.btn_buy_ini= true, 100);
        this.clear_buy_ini = setTimeout(() => this.btn_buy_ini = false, 5000);
        this.mergeShopCart(0)
      }
      else if(param == 'int' && this.cart[1].quantity > 0) {
        if(this.btn_buy_int) {
          this.btn_buy_int = false;
          clearTimeout(this.clear_buy_int);
        }
        setTimeout(() => this.btn_buy_int= true, 100);
        this.clear_buy_int = setTimeout(() => this.btn_buy_int = false, 5000);
        this.mergeShopCart(1)
      }
      else if(param == 'ava' && this.cart[2].quantity > 0) {
        if(this.btn_buy_ava) {
          this.btn_buy_ava = false;
          clearTimeout(this.clear_buy_ava);
        }
        setTimeout(() => this.btn_buy_ava = true, 100);
        this.clear_buy_ava = setTimeout(() => this.btn_buy_ava = false, 5000);
        this.mergeShopCart(2)
      }
      else if(param == 'cch' && this.cart[3].quantity > 0) {
        if(this.btn_buy_cch) {
          this.btn_buy_cch = false;
          clearTimeout(this.clear_buy_cch);
        }
        setTimeout(() => this.btn_buy_cch = true, 100);
        this.clear_buy_cch = setTimeout(() => this.btn_buy_cch = false, 5000);
        this.mergeShopCart(3)
      }
      else {
        if(this.buy_nothing) {
          this.buy_nothing = false;
        }
        setTimeout(() => this.buy_nothing = true, 100);
        return;
      }
      if(this.buy_cart == -1) {
        this.showCart();
      }
      return;

    },

    // close the currently openned Alerts
    closeAlert: function(param) {
      if(param == 'ini') {
        this.btn_buy_ini = false;
        clearTimeout(this.clear_buy_ini);
      }
      else if(param == 'int') {
        this.btn_buy_int = false;
        clearTimeout(this.clear_buy_int);
      }
      else if(param == 'ava') {
        this.btn_buy_ava = false;
        clearTimeout(this.clear_buy_ava);
      }
      else if(param == 'cch') {
        this.btn_buy_cch = false;
        clearTimeout(this.clear_buy_cch);
      }
      else if(param == 'cart') {
        this.buy_cart = 0;
        clearTimeout(this.clear_buy_cart);
      }
      else if(param == 'not') {
        this.buy_nothing = 0;
      }
      return;
    },

    // shows notification to check cart periodically
    showCart: function() {
      setTimeout(() => this.buy_cart = 1, 3000);
      this.clear_buy_cart = setTimeout(() => this.buy_cart = 0, 9000);
    },
  },
}
</script>