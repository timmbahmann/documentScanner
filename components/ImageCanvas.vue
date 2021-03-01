<template>
  <div>
    <video ref="camera" :style="styleVideo" autoplay></video>
    <canvas
      ref="canvas"
      :width="width"
      :height="height"
      :style="styleCanvas"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: 'ImageCanvas',
  props: {
    showStaticImage: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    data: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      canvasWidth: 0,
      canvasHeight: 0,
      offsetX: 0,
      offsetY: 0,
      ratioX: 0,
      ratioY: 0,
      imageWidth: 0,
      imageHeight: 0,
    }
  },
  computed: {
    styleCanvas() {
      const style = {
        width: this.width + 'px',
        height: this.height + 'px',
      }
      if (!this.showStaticImage) {
        style.display = 'none'
      }
      return style
    },
    styleVideo() {
      const style = {
        width: this.width + 'px',
        height: this.height + 'px',
      }
      if (this.showStaticImage) {
        style.display = 'none'
      }
      return style
    },
  },
  watch: {
    showStaticImage() {
      this.proceed()
    },
    width() {
      this.proceed()
    },
    height() {
      this.proceed()
    },
  },
  mounted() {
    this.createCameraElement()
    if (this.showStaticImage && this.data) {
      this.proceed()
    }
  },
  methods: {
    compByFit(a, b, objectFit) {
      if (objectFit === 'cover') {
        return a < b
      } else {
        return a > b
      }
    },
    resize(objectFit) {
      this.ratioY = this.imageHeight / this.height
      this.ratioX = this.imageWidth / this.width
      if (this.compByFit(this.ratioX, this.ratioY, objectFit)) {
        this.canvasWidth = this.width
        this.canvasHeight = this.imageHeight / this.ratioX
        if (objectFit === 'cover') {
          this.offsetY = -Math.abs((this.height - this.canvasHeight) / 2)
          this.offsetX = 0
        } else {
          this.offsetY = Math.abs((this.height - this.canvasHeight) / 2)
          this.offsetX = 0
        }
      } else {
        this.canvasWidth = this.imageWidth / this.ratioY
        this.canvasHeight = this.height
        if (objectFit === 'cover') {
          this.offsetX = -Math.abs((this.width - this.canvasWidth) / 2)
          this.offsetY = 0
        } else {
          this.offsetX = Math.abs((this.width - this.canvasWidth) / 2)
          this.offsetY = 0
        }
      }
    },
    proceed() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      if (this.showStaticImage && !this.data) {
        this.resize('cover')
        ctx.drawImage(
          this.$refs.camera,
          this.offsetX,
          this.offsetY,
          this.canvasWidth,
          this.canvasHeight
        )
        this.$emit('image', { canvas, image: canvas.toDataURL() })
      } else if (this.data) {
        const image = new Image()
        image.onload = () => {
          this.imageHeight = image.height
          this.imageWidth = image.width
          this.resize('contain')
          ctx.drawImage(
            image,
            this.offsetX,
            this.offsetY,
            this.canvasWidth,
            this.canvasHeight
          )
        }
        image.src = this.data
      }
    },
    createCameraElement() {
      const constraints = (window.constraints = {
        audio: false,
        video: true,
      })

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.$refs.camera.srcObject = stream
          const { width, height } = stream.getTracks()[0].getSettings()
          this.imageWidth = width
          this.imageHeight = height
        })
        .catch((error) => {
          alert(
            "May the browser didn't support or there is some errors. " + error
          )
        })
    },
  },
}
</script>
<style lang="sass" scoped>
canvas, video, div
  width: 100vw
  height: 100vh
  position: relative
  object-fit: cover
  padding: 0
  margin: 0
</style>
