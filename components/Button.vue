<template>
  <button type="button" :style="style" @click="onClick">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'MyButton',

  props: {
    /**
     * The text inside the Button
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * 3 Types: primary, alert and normal.
     * Primary with primary background and white color.
     * Alert with no background and alert color.
     * Normal with no background and primary color
     */
    type: {
      type: String,
      default: 'primary',
      validate(type) {
        return ['primary', 'normal', 'alert'].includes(type)
      },
    },
  },

  computed: {
    style() {
      const style = {}
      switch (this.type) {
        case 'primary':
          style.backgroundColor = 'var(--primary-color)'
          style.color = '#fff'
          break
        case 'alert':
          style.color = 'var(--alert-color)'
          style.backgroundColor = 'rgba(0,0,0,0)'
          break
        case 'normal':
          style.color = 'var(--primary-color)'
          style.backgroundColor = 'rgba(0,0,0,0)'
      }
      return style
    },
  },

  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>
<style lang="sass">
@import '~/assets/sass/main.sass'
button
  border: 0
  padding: 1em 2em
  text-transform: uppercase
</style>
