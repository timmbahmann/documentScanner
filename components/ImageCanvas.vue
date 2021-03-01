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
      this.captureFrame()
    },
    width() {
      this.captureFrame()
    },
    height() {
      this.captureFrame()
    },
  },
  mounted() {
    this.createCameraElement()
    if (this.showStaticImage && this.data) {
      this.captureFrame()
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
    offsetByFit(axis1, objectFit) {
      let axis2, refLength1, refLength2
      if (axis1 === 'X') {
        axis2 = 'Y'
        refLength1 = 'width'
        refLength2 = 'canvasWidth'
      } else {
        axis2 = 'X'
        refLength1 = 'height'
        refLength2 = 'canvasHeight'
      }
      if (objectFit === 'cover') {
        this['offset' + axis1] = -Math.abs(
          (this[refLength1] - this[refLength2]) / 2
        )
        this['offset' + axis2] = 0
      } else {
        this['offset' + axis1] = Math.abs(
          (this[refLength1] - this[refLength2]) / 2
        )
        this['offset' + axis2] = 0
      }
    },
    resizeFrame(objectFit) {
      this.ratioY = this.imageHeight / this.height
      this.ratioX = this.imageWidth / this.width
      if (this.compByFit(this.ratioX, this.ratioY, objectFit)) {
        this.canvasWidth = this.width
        this.canvasHeight = this.imageHeight / this.ratioX
        this.offsetByFit('Y', objectFit)
      } else {
        this.canvasWidth = this.imageWidth / this.ratioY
        this.canvasHeight = this.height
        this.offsetByFit('X', objectFit)
      }
    },
    drawImage(image) {
      const ctx = this.$refs.canvas.getContext('2d')
      ctx.drawImage(
        image,
        this.offsetX,
        this.offsetY,
        this.canvasWidth,
        this.canvasHeight
      )
    },
    drawData() {
      const image = new Image()
      image.onload = () => {
        this.imageHeight = image.height
        this.imageWidth = image.width
        this.resizeFrame('contain')
        this.drawImage(image)
      }
      image.src = this.data
    },
    drawFrame() {
      this.resizeFrame('cover')
      this.drawImage(this.$refs.camera)
    },
    captureFrame() {
      const canvas = this.$refs.canvas
      if (this.showStaticImage && !this.data) {
        this.drawFrame()
        this.$emit('image', { canvas, image: canvas.toDataURL() })
      } else if (this.data) {
        this.drawData()
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
