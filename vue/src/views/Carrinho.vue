<template>
  <div class="page" id="container-carrinho">
    <h1>Carrinho</h1>
    <ul class="w3-ul w3-hoverable">
      <li class="w3-bar" v-for="(product, index) in shopCart" :key="index">
        <img src="../img/coinC.png" class="w3-bar-item w3-circle" style="width:70px">
        <span class="w3-large w3-bar-item">{{product.name}}</span>
        <input class="w3-medium w3-bar-item w3-border w3-round-large"
        v-model="product.productInfo.quantity"
        type="number"
        min="0"
        >
        <span class="w3-large w3-bar-item">R$ {{product.productInfo.price}},00</span>
        <span class="w3-large w3-bar-item">
          R$ {{product.productInfo.price * product.productInfo.quantity}},00
        </span>
        <span @click="removeFromList(product.index)"
        class="w3-bar-item w3-button w3-xlarge w3-right">&times;</span>
      </li>
    </ul>

    <button id="purchase-button" type="submit">Finalizar Compra</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      carrinho: {},
      shopCart:[{
        name: "Aula iniciante",
        img: "../img/coinV.png",
        productInfo: {price: "15", quantity: 1}
      },
      {
        name: "Aula ao Vivo",
        img: "../img/coinC.png",
        productInfo: {price: "25", quantity: 1}
      },
      {
        name: "Aula avançada",
        img: "../img/coinVBronze.png",
        productInfo: {price: "20", quantity: 1}
      }],
      total: "0"
    }
  },
  methods:{
    removeFromList: function(index){
      this.shopCart.splice(index, 1)
    }
  }
}
</script>
