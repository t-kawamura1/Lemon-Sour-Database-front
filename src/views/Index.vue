<template>
  <div>
    <button
      type="button"
      name="button"
      @click="getMsg"
    >
      RailsからAPIを取得する
    </button>
    <div
      v-for="(msg, i) in msgs"
      :key="i"
    >
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msgs: []
    }
  },
  methods: {
    getMsg () {
      this.$axios.get('http://localhost:3000/api/v1/hello')
        .then(res => {
          this.msgs.push(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>