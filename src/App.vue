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
    if(localStorage.getItem('shopCart')){
      this.shopCart = JSON.parse(localStorage.getItem('shopCart'))
      console.log("shopCart parsed")
    }else{
      const parsed = JSON.stringify(this.shopCart)
      localStorage.setItem("shopCart", parsed)
      console.log("shopCart created")
    }

  },
  data: function(){
    return {
      shopCart:[{
        productId: 1,
        quantity: 8
      },
      {
        productId: 4,
        quantity: 2
      },
      {
        productId: 3,
        quantity: 1
      }],
    }
  }
}
</script>