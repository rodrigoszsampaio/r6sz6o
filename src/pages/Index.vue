<template>
<div>
  <Matrix
    :offset="122"
    :text="$t('myTitle')"
    :chars="$t('matrixName')"
    :background="this.$q.dark.isActive ? 'rgba(0, 0, 0, 0.05)': 'rgba(255, 255, 255, 0.05)'"
    :foreground="this.$q.dark.isActive ? '#FFC107': '#000'"
  />
</div>
</template>

<script>
import Matrix from 'components/Matrix.vue'

export default {
  name: 'PageIndex',
  data () {
    return {
      // timestamp: new Date().getTime()
    }
  },
  components: {
    Matrix
  },
  // created () {
  //   setInterval(this.getNow, 1000)
  // },
  methods: {
    // cancelAutoUpdate () {
    //   clearInterval(this.getNow)
    // },
    // getNow: function () {
    //   this.timestamp = new Date().getTime()
    // }
  },
  computed: {
    // experience () {
    //   const tokenTime = this.$moment.duration(this.timestamp - 1272682800000, 'milliseconds')
    //   return tokenTime
    // },
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    }
  }
  // beforeDestroy () {
  //   this.cancelAutoUpdate()
  // }
}
</script>

<style lang="stylus">
.text-justify
  text-align: justify
  text-justify: inter-word
</style>
