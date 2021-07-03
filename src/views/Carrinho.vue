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

    <button id="purchase-button" class="w3-button w3-blue w3-round" type="submit">Finalizar Compra</button>
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
