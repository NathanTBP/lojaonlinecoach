<template>
  <div v-if="products.length" class="page" id="container-carrinho">
    <br>
    <h1>Carrinho</h1>
    <ul class="w3-ul w3-hoverable">
      <li class="w3-bar" v-for="(item, index) in shopCart" :key="index">
        <span @click="removeFromList(index)"
        class="w3-bar-item w3-button w3-xlarge w3-right">&times;</span>
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
    </ul>

  <!--Aqui começa o card do cartão-->

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="w3-display-container" >
  <div class="w3-card w3-left w3-light-grey" style="width:30%;">
    <div style="flex: 75%;">
      <div class="container">
        <div class="w3-margin  w3-bar">
          <div class="w3-margin  w3-bar-item w3-small">
            <h3 class="w3-center">Informações de Cobrança</h3>
            <label for="fname"><i class="w3-bar-item fa fa-user"></i>Nome Completo  </label>
            <input type="text" id="fname" name="completename" placeholder="Nathan R. Oliveira">
            <br><br>
            <label for="email"><i class="w3-bar-item fa fa-envelope"></i>Email </label>
            <input type="text" id="email" name="email" placeholder="nathan@example.com">
            <br><br>
            <label for="adr"><i class="w3-bar-item w3-left fa fa-address-card-o"></i>Endereço  </label>
            <input type="text" id="adr" name="address" placeholder="Rua X 555">
            <br><br>
            <label for="city"><i class="w3-bar-item fa fa-institution"></i>Cidade  </label>
            <input type="text" id="city" name="city" placeholder="São Carlos">
            <br><br>
          </div>

          <div class="w3-margin w3-bar-item w3-small">
              <div style="w3-bar-item w3-small">
                <label for="state">Estado  </label>
                <input type="text" id="state" name="state" placeholder="SP">
                <br><br>
              </div>
              <div style="w3-bar-item w3-small">
                <label for="zip">CEP  </label>
                <input type="text" id="zip" name="zip" placeholder="XXXXX-XXX">
                <br><br>
              </div>
          </div>

          <div style="w3-margin w3-bar-item w3-small">
            <br>
            <h3 class="w3-center">Pagamento</h3>
            <label for="cname">Nome no Cartão  </label>
            <input type="text" id="cname" name="cardname" placeholder="NATHAN R OLIVEIRA">
            <br><br>
            <label for="ccnum">Número do Cartão  </label>
            <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444">
            <br><br>
            <label for="expmonth">Data de Validade  </label>
            <input type="text" id="expmonth" name="expmonth" placeholder="MM/AA">
            <label for="fname" class="w3-left">Cartões Aceitos : </label> <br>
              <div class="icon-container">
              <i class="w3-bar-item w3-center fa fa-cc-visa" style="color:navy;"></i>
              <i class="w3-bar-item w3-center fa fa-cc-mastercard" style="color:red;"></i>
            </div>
            <br><br>

            <div style="w3-margin w3-bar-item w3-small">
                <label for="cvv">Código de Segurança  </label>
                <input type="text" id="cvv" name="cvv" placeholder="352">
                <br><br>
            </div>
          </div>
        </div>

        

        </div>
      </div>
    </div>
    <button id="purchase-button" class="w3-button w3-middle w3-blue w3-round" type="submit">Finalizar Compra</button>
  </div>


  </div>
</template>

<script>
export default {
  mounted(){
      fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => this.products = data)

     if(localStorage.getItem('shopCart')){
      this.shopCart = JSON.parse(localStorage.getItem('shopCart'))
    }
  },
  updated(){
    if(localStorage.getItem('shopCart')){
      let parsed = JSON.stringify(this.shopCart)
      localStorage.setItem("shopCart", parsed)
    }
  },
  data: function() {
    return {
      products: [],
      shopCart:[],
      total: 0,
    }
  },
  methods:{
    getProductIndexById: function(productId){
      const result = this.products.find( ({id}) => id === productId )
      return result
    },
    removeFromList: function(index){
      this.shopCart.splice(index, 1)
    }
  }
}
</script>
