<template>
  <div id="app">
    <nav-bar></nav-bar>
    <br><br><br>
    <router-view/>
  </div>
</template>

<script>
export default {
  name:"app",
  mounted(){
    let parsed = JSON.stringify(this.shopCart)
    localStorage.setItem("shopCart", parsed)
  },
  data: function(){
    return {
      shopCart:[{
        name: "Aula iniciante",
        productInfo: {price: 15, quantity: 1}
      },
      {
        name: "Aula ao Vivo",
        productInfo: {price: 25, quantity: 1}
      },
      {
        name: "Aula avançada",
        productInfo: {price: 20, quantity: 1}
      }],
    }
  }
}
</script>