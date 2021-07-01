<template>
  <div class="page">
    <h1>Carrinho</h1>
    <!--<ul>
      <li v-for="(product, index) in shopCart" :key="index">
        {{product.name}}
        <ul id="produtos-carrinhos" style="display: inline-block;">
          <li :v-for="info in product.productInfo" >
            <input type="number" v-model="info.quantity" min="1" max="20" > x R${{info.price}} =  R$ {{info.price * info.quantity}}
          </li>
        </ul>
        <button id="remove-item-button" @click="removeFromList(index)" style="border-radius: 999px;" >&#10006;</button>
      </li>
      <div id="separation">----------------------------</div>
      <li>Total: R${{total}}</li>
    </ul>
    <br><br><br>
    <div id="payment-method-box">Cartão de crédito</div>!-->
    <button id="purchase-button" type="submit">Finalizar Compra</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      shopCart:[{
        name: "Aula avançada",
        productInfo: [{price: "15", quantity: "1"}]
      },
      {
        name: "Aula ao Vivo",
        productInfo: [{price: "25", quantity: "1"}]
      },
      {
        name: "Aula avançada",
        productInfo: [{price: "20", quantity: "1"}]
      }],
      total: "100"
    }
  },
  methods:{
    //TODO funcao não consegue mudar o valor do elemento (problema com vuejs)
    filtrarQuantidade: function(event){
      let character = event.data
      //let currentValue = event.target.value
      if (isNaN(character)){
          event.target.value = "1"
      }
    },
    removeFromList: function(index){
      this.shopCart.splice(index, 1)
    }
  }
}
</script>
