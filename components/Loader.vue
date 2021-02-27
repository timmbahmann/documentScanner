<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 44 44"
    :style="style"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M44 22C44 34.1503 34.1503 44 22 44C9.84974 44 0 34.1503 0 22H4C4 31.9411 12.0589 40 22 40C31.9411 40 40 31.9411 40 22C40 12.0589 31.9411 4 22 4V0C34.1503 0 44 9.84974 44 22Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    speed: {
      type: Number,
      default: 1.2,
    },
    size: {
      type: Number,
      default: 44,
    },
    color: {
      type: String,
      default: 'white',
      validator(type) {
        return ['primary', 'normal', 'alert', 'success', 'white'].includes(type)
      },
    },
  },
  computed: {
    style() {
      return {
        fill: 'currentColor',
        animation: `spin ${this.speed}s linear infinite`,
        color: `var(--${this.color}-color)`,
      }
    },
  },
}
</script>

<style lang="sass">
@keyframes spin
  100%
    transform: rotate(360deg)
</style>
