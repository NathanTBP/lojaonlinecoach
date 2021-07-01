<template>
  <div class="page" id="container-carrinho">
    <br>
    <h1>Carrinho</h1>
    <ul class="w3-ul w3-hoverable">
      <li class="w3-bar" v-for="(product, index) in shopCart" :key="index">
        <!--<img :src="product.imagesource" @click="printaConsole(product)" class="w3-bar-item w3-circle" style="width:3em" /> !-->
        <span class="w3-large w3-bar-item">{{product.name}}</span>
        <input class="w3-medium w3-bar-item w3-border w3-round-large"
        v-model="product.productInfo.quantity"
        type="number"
        min="0"
        />
        <span class="w3-large w3-bar-item">R$ {{product.productInfo.price}},00</span>
        <span class="w3-large w3-bar-item">
          R$ {{product.productInfo.price * product.productInfo.quantity}},00
        </span>
        <span @click="removeFromList(product.index)"
        class="w3-bar-item w3-button w3-xlarge w3-right">&times;</span>
      </li>
    </ul>

    <button id="purchase-button" class="w3-button w3-blue w3-round" type="submit">Finalizar Compra</button>
  </div>
</template>

<script>
export default {
  mounted(){
    console.log(this.shopCart)
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
      
      carrinho: [{
        productId: 1,
        quantity: 2
        },
        {
        productId: 3,
        quantity: 1
        },
      ],
      shopCart:[],
      total: 0,
    }
  },
  methods:{
    getImgSrc(src){
      return src
    },
    printaConsole: function(product){
      console.log(product.imagesource)
    },
    removeFromList: function(index){
      this.shopCart.splice(index, 1)
    }
  }
}
</script>
