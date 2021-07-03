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
    }else{
      const parsed = JSON.stringify(this.shopCart)
      localStorage.setItem("shopCart", parsed)
    }

  },
  data: function(){
    return {
      shopCart:[],
    }
  }
}
</script>