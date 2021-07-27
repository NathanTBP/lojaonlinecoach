<template>
  <div v-if="products.length" class="page" id="container-carrinho">
    <br>
    <h1>Carrinho</h1>
    <ul class="w3-ul w3-hoverable w3-border">
      <li class="w3-bar" v-for="(item, index) in shopCart" :key="index">
        <span class="w3-bar-item w3-button w3-xlarge w3-right" @click.prevent="removeFromList(index)">&times;</span>
        <span class="w3-large w3-bar-item">
          Aula {{getProductIndexById(item.productId)["name"]}}
        </span>
        
        <input class=" w3-bar-item w3-border w3-round-large"
        v-model="item.quantity"
        type="number"
        min="0"
        style="width: 4em"
        />

        <span class="w3-large w3-bar-item">
          R$ {{getProductIndexById(item.productId)["info"]["price"]}},00
        </span>
        <span class="w3-large w3-bar-item w3-right">
          R$ {{getProductIndexById(item.productId)["info"]["price"] * item.quantity}},00
        </span>
      </li>
      <li class="w3-right w3-margin-right" id="total">
          <h3>Total: R$ {{cartTotal}},00</h3>
      </li>
    </ul>
  
  <!--Aqui começa o card do cartão-->

    <div class="w3-container w3-row w3-margin" id="credit_card_container">
      <div class="w3-col l6 w3-bar w3-card w3-light-grey" style="width: 60%">
        <p v-if="errors.length">
          <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
          <ul>
            <li :key="error.id" v-for="error in errors">{{ error }}</li>
          </ul>
        </p>
        <div class="w3-bar-item">
          <div class="w3-medium">
            <h3 class="w3-center">Informações de Cobrança</h3>
            <label for="fname">Nome Completo  </label>
            <input type="text" id="cartname" name="completename" v-model="cartname" placeholder="Nathan R. Oliveira">
            <br><br>
            <label for="email">Email </label>
            <input type="text" id="cartemail" name="email" v-model="cartemail" placeholder="nathan@example.com">
            <br><br>
            <label for="adr">Endereço  </label>
            <input type="text" id="cartadr" name="address" v-model="cartadr" placeholder="Rua X 555">
            <br><br>
            <label for="city">Cidade  </label>
            <input type="text" id="cartcity" name="city" v-model="cartcity" placeholder="São Carlos">
            <br><br>
            <div style="w3-bar-item w3-small">
                <label for="state">Estado  </label>
                <input type="text" id="cartstate" name="state" v-model="cartstate" placeholder="SP">
                <br><br>
              </div>
              <div style="w3-bar-item w3-small">
                <label for="zip">CEP  </label>
                <input type="text" id="cartcep" name="cep" v-model="cartcep" placeholder="XXXXX-XXX">
                <br><br>
              </div>
          </div>
        </div>
        <div style="w3-bar-item w3-small">
          <br>
          <h3 class="w3-center">Pagamento</h3>
          <label for="cname">Nome no Cartão  </label>
          <input type="text" id="ccname" name="cardname" v-model="ccname" placeholder="NATHAN R OLIVEIRA">
          <br><br>
          <label for="ccnum">Número do Cartão  </label>
          <input type="text" id="ccnum" name="cardnumber" v-model="ccnum" placeholder="1111-2222-3333-4444">
          <br><br>
          <label for="expmonth">Data de Validade  </label>
          <input type="text" id="ccexpmonth" name="expmonth" v-model="ccexpmonth" placeholder="MM/AA">
          <label for="fname" class="w3-left">Cartões Aceitos : </label> <br>
            <div class="icon-container">
            <i class="w3-bar-item w3-center fa fa-cc-visa" style="color:navy;"></i>
            <i class="w3-bar-item w3-center fa fa-cc-mastercard" style="color:red;"></i>
          </div>
          <br><br>
          <div style="w3-margin w3-bar-item w3-small">
              <label for="cvv">Código de Segurança  </label>
              <input type="text" id="cvv" name="cvv" v-model="cvv" placeholder="352">
              <br><br>
          </div>
        </div>
      </div>
      <div class="w3-container w3-col l5 w3-center w3-display-bottomright">
        <button id="purchase-button" class="w3-button w3-round w3-xxlarge w3-hover-text-white w3-hover-green" @click="checkBuy()">Finalizar Compra</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartTotal: function() {
      let accumulator = 0
      for (let i = 0; i < this.shopCart.length; i++)
      {
        const currPrice = this.getProductIndexById(this.shopCart[i].productId)["info"]["price"]
        accumulator += currPrice * this.shopCart[i].quantity
      }
      return accumulator
    }
  },
  mounted(){
    fetch('http://localhost:3000/produtos/3')
      .then(res => res.json())
      .then(data => this.products = data)

    if(localStorage.getItem('shopCart')){
      this.shopCart = JSON.parse(localStorage.getItem('shopCart'))
    }
  },
  updated(){
    if(localStorage.getItem('shopCart')){
      let parsed = JSON.stringify(this.shopCart);
      localStorage.setItem("shopCart", parsed);
    }
  },
  data: function() {
    return {
      products: [],
      shopCart:[],
      errors: [],
      cartname: '',
      cartemail: '',
      cartadr: '',
      cartcity: '',
      cartstate: '',
      cartcep: '',
      ccname: '',
      ccnum: '',
      ccexpmonth: '',
      cvv: ''
    }
  },
  methods:{
    getProductIndexById: function(productId){
      const result = this.products.find( ({id}) => id === productId );
      return result;
    },
    removeFromList: function(index){
      this.shopCart.splice(index, 1);
    },
    checkBuy: function(e) {
      this.errors = [];
      let tipousuario;

      if (!this.cartname) {
        this.errors.push('Nome de cobrança é obigatório.');
      }
      if (!this.cartemail) {
        this.errors.push('Email de cobrança é obrigatório.');
      } else if (!this.validEmail(this.cartemail)) {
        this.errors.push('Utilize um email de cobrança válido.');
      }
      if (!this.cartadr) {
        this.errors.push('Endereço de cobrança é obigatório.');
      }
      if (!this.cartcity) {
        this.errors.push('Cidade de cobrança é obigatório.');
      }
      if (!this.cartstate) {
        this.errors.push('Estado de cobrança é obigatório.');
      }
      if (!this.cartcep) {
        this.errors.push('CEP de cobrança é obigatório.');
      }
      if (!this.ccname) {
        this.errors.push('Nome do cartão é obigatório.');
      }
      if (!this.ccnum) {
        this.errors.push('Número do cartão é obigatório.');
      }
      if (!this.ccexpmonth) {
        this.errors.push('Data de vencimento é obigatório.');
      }
      if (!this.cvv) {
        this.errors.push('CVV do cartão é obigatório.');
      }
      tipousuario = localStorage.getItem('usertype');
      if(tipousuario == '0')
        alert('Logue no site para realizar a compra! Não tem uma conta? Registre-se em Entrar');
      if (!this.errors.length && tipousuario == '1' && localStorage.getItem('shopCart')) {
        this.buyConfirmed();
        return true;
      }
      if(e)
        e.preventDefault();
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    buyConfirmed: function() {
      let idusuario = localStorage.getItem('userid');
      let url = "http://localhost:3000/usuarios";
      let status;
      let self = this;
      let user_remaining_classes;
      let existclass;
      let productid;
      let shopCartquant;
      let dados;

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
              if(idusuario == user._id) {
                user_remaining_classes = user.remaining_classes;
                for(let i = 0; i < self.shopCart.length; i++) {
                  existclass = false;
                  for(let j = 0; j < user_remaining_classes.length; j++) {
                    if(user_remaining_classes[j].product_id == self.shopCart[i].productId) {
                      existclass = true;
                      productid = j;
                      break;
                    }
                  }
                  shopCartquant = parseInt(self.shopCart[i].quantity);
                    if(existclass) {
                      user_remaining_classes[productid].quantity += shopCartquant;
                    }
                    else {
                      user_remaining_classes.push({product_id: self.shopCart[i].productId, quantity: shopCartquant});
                    }
                }
                dados = {remaining_classes: user_remaining_classes}
                fetch(url + '/' + idusuario, {
                  method: 'PATCH', // or 'PUT'
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(dados),
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
                  alert('Compra realizada com sucesso!!!');
                })
                .catch(function(error) {
                  console.log('Error ' + error.message)
                })
                break;
              }
            }
          }
        })
        .catch(function(error) {
          console.log('Error ' + error.message)
        })
    }
  },
}
</script>
