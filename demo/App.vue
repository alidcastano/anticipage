<template>
  <div id="app" class="component">
    <component :is="currentView" />
  </div>
</template>


<script>
const routes = {
  '/': { template: `<h1>Vuency</h1>` }
}

export default {
  data: () => ({
    currentRoute: window.location.pathname
  }),
  computed: {
    currentView() {
      return routes[this.currentRoute] || NotFound
    }
  }
}
</script>
