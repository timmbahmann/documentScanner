<template>
  <div>
    <video ref="camera" :style="styleVideo" autoplay></video>
    <canvas
      ref="canvas"
      :width="width"
      :height="height"
      :style="styleCanvas"
      @mousedown="startCanvasDrag"
      @touchstart="startCanvasDrag"
      @mouseup="stopCanvasDrag"
      @touchend="stopCanvasDrag"
      @mousemove="canvasDrag"
      @touchmove="canvasDrag"
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
    documentPosition: {
      type: Array,
      default: () => [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    },
  },
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      ratioX: 0,
      ratioY: 0,
      imageWidth: 0,
      imageHeight: 0,
      dragging: false,
      dragged: false,
      dragIndex: 0,
      canvasPos: null,
      imageData: null,
      savedImageData: null,
      newDocumentPosition: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
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
      this.draw()
    },
    width() {
      this.updateCanvasSize()
    },
    height() {
      this.updateCanvasSize()
    },
    data: {
      handler() {
        if (this.data) {
          const image = new Image()
          image.onload = () => {
            this.imageData = image
            this.drawData(true)
          }
          image.src = this.data
        }
      },
      immediate: true,
    },
    documentPosition: {
      handler() {
        if (
          JSON.stringify(this.documentPosition) !==
          JSON.stringify([
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
          ])
        ) {
          this.newDocumentPosition = this.documentPosition
        }
      },
      immediate: true,
      deep: true,
    },
    newDocumentPosition() {
      this.dragged = true
      this.dragging = true
      this.draw()
      this.dragging = false
      this.dragged = false
    },
  },
  mounted() {
    this.createCameraElement()
  },
  methods: {
    repositionDocument(old) {
      this.newDocumentPosition = this.newDocumentPosition.map(([x, y]) => {
        const relativeXPosOnCanvas = (x - old.offsetX) / old.canvasWidth
        const relativeYPosOnCanvas = (y - old.offsetY) / old.canvasHeight
        const newXPosOnCanvas =
          this.offsetX + relativeXPosOnCanvas * this.canvasWidth
        const newYPosOnCanvas =
          this.offsetY + relativeYPosOnCanvas * this.canvasHeight
        return [newXPosOnCanvas, newYPosOnCanvas]
      })
    },
    updateCanvasSize() {
      if (this.imageData) {
        this.$nextTick(function () {
          const oldSize = {
            canvasWidth: this.canvasWidth,
            canvasHeight: this.canvasHeight,
            offsetX: this.offsetX,
            offsetY: this.offsetY,
          }
          this.imageHeight = this.imageData.height
          this.imageWidth = this.imageData.width
          this.resizeFrame('contain')
          this.repositionDocument(oldSize)
        })
      }
    },
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
    drawImage(image, saveImg = false) {
      const ctx = this.$refs.canvas.getContext('2d')
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
      ctx.drawImage(
        image,
        this.offsetX,
        this.offsetY,
        this.canvasWidth,
        this.canvasHeight
      )
      if (saveImg) {
        const newImg = new Image()
        newImg.onload = () => {
          this.imageData = newImg
        }
        newImg.src = this.$refs.canvas.toDataURL()
      }
    },
    drawData(saveImg = false) {
      this.imageHeight = this.imageData.height
      this.imageWidth = this.imageData.width
      this.resizeFrame('contain')
      this.drawImage(this.imageData, saveImg)
      this.drawInteractiveElements()
    },
    drawFrame() {
      const {
        width,
        height,
      } = this.$refs.camera.srcObject.getTracks()[0].getSettings()
      this.imageHeight = height
      this.imageWidth = width
      this.resizeFrame('cover')
      this.drawImage(this.$refs.camera, true)
      this.drawInteractiveElements()
    },
    drawRect(ctx) {
      ctx.lineWidth = 1
      ctx.strokeStyle = '#ff0000'
      ctx.beginPath()
      ctx.moveTo(...this.newDocumentPosition[0])
      ctx.lineTo(...this.newDocumentPosition[1])
      ctx.lineTo(...this.newDocumentPosition[2])
      ctx.lineTo(...this.newDocumentPosition[3])
      ctx.closePath()
      ctx.stroke()
    },
    drawCircle(ctx, pos, radius) {
      ctx.beginPath()
      ctx.arc(...this.newDocumentPosition[pos], radius, 0, 2 * Math.PI)
      ctx.stroke()
    },
    drawDragger(ctx) {
      const r = 10
      for (const i in [...Array(4).keys()]) {
        this.drawCircle(ctx, i, r)
      }
    },
    getMagnifiedImagePositions() {
      const result = {
        magnifySize: 40,
        offset: 20,
        sizefactor: 2,
        imageOffsetX: 0,
        imageOffsetY: 0,
        directionX: 1,
        directionY: 1,
        scalefactor: this.imageData.width / this.canvasWidth,
      }
      result.crossPosition = result.magnifySize / 3
      switch (this.dragIndex) {
        case 1:
          result.directionX = -1
          result.imageOffsetX = -result.crossPosition
          break
        case 2:
          result.directionX = -1
          result.directionY = -1
          result.imageOffsetX = -result.crossPosition
          result.imageOffsetY = -result.crossPosition
          break
        case 3:
          result.directionY = -1
          result.imageOffsetY = -result.crossPosition
          break
      }
      return result
    },
    drawCross(ctx, v) {
      ctx.beginPath()
      ctx.strokeStyle = '#ff0000'
      ctx.moveTo(
        this.newDocumentPosition[this.dragIndex][0] +
          v.directionX * (+v.crossPosition * v.sizefactor + v.offset),
        this.newDocumentPosition[this.dragIndex][1] +
          v.directionY * (+v.crossPosition * v.sizefactor + v.offset)
      )
      ctx.lineTo(
        this.newDocumentPosition[this.dragIndex][0] +
          v.directionX * (v.crossPosition * v.sizefactor + v.offset),
        this.newDocumentPosition[this.dragIndex][1] +
          v.directionY * (v.magnifySize * v.sizefactor + v.offset)
      )
      ctx.moveTo(
        this.newDocumentPosition[this.dragIndex][0] +
          v.directionX * (+v.crossPosition * v.sizefactor + v.offset),
        this.newDocumentPosition[this.dragIndex][1] +
          v.directionY * (+v.crossPosition * v.sizefactor + v.offset)
      )
      ctx.lineTo(
        this.newDocumentPosition[this.dragIndex][0] +
          v.directionX * (+v.magnifySize * v.sizefactor + v.offset),
        this.newDocumentPosition[this.dragIndex][1] +
          v.directionY * (+v.crossPosition * v.sizefactor + v.offset)
      )
      ctx.stroke()
    },
    drawMagnifyGlass(ctx) {
      const v = this.getMagnifiedImagePositions()
      ctx.save()
      ctx.beginPath()
      ctx.fillStyle = '#fff'
      ctx.arc(
        this.newDocumentPosition[this.dragIndex][0] +
          v.directionX * (v.offset + (v.magnifySize * v.sizefactor) / 2),
        this.newDocumentPosition[this.dragIndex][1] +
          v.directionY * (v.offset + (v.magnifySize * v.sizefactor) / 2),
        (v.magnifySize * v.sizefactor) / 2,
        0,
        2 * Math.PI
      )
      ctx.fill()
      ctx.clip()
      ctx.drawImage(
        this.imageData,
        (this.newDocumentPosition[this.dragIndex][0] -
          v.crossPosition +
          v.imageOffsetX -
          this.offsetX) *
          v.scalefactor,
        (this.newDocumentPosition[this.dragIndex][1] -
          v.crossPosition +
          v.imageOffsetY -
          this.offsetY) *
          v.scalefactor,
        v.magnifySize * v.scalefactor,
        v.magnifySize * v.scalefactor,
        this.newDocumentPosition[this.dragIndex][0] +
          v.directionX * (v.offset + (v.magnifySize * v.sizefactor) / 2) -
          (v.magnifySize * v.sizefactor) / 2,
        this.newDocumentPosition[this.dragIndex][1] +
          v.directionY * (v.offset + (v.magnifySize * v.sizefactor) / 2) -
          (v.magnifySize * v.sizefactor) / 2,
        v.magnifySize * v.sizefactor,
        v.magnifySize * v.sizefactor
      )
      this.drawCross(ctx, v)
      ctx.restore()
    },
    drawInteractiveElements() {
      if (
        JSON.stringify(this.newDocumentPosition) !==
        JSON.stringify([
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ])
      ) {
        const ctx = this.$refs.canvas.getContext('2d')
        ctx.lineWidth = 1
        ctx.strokeStyle = '#ff0000'
        this.drawRect(ctx)
        this.drawDragger(ctx)
        if (this.dragging && !this.dragged) {
          this.drawMagnifyGlass(ctx)
        }
      }
    },
    draw() {
      if (this.showStaticImage && !this.data && !this.dragging) {
        this.drawFrame()
      } else {
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
    pointDistance(point1, point2) {
      return Math.sqrt(
        Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2)
      )
    },
    getTouchClickEvent(e) {
      if (e.changedTouches) {
        if (e.changedTouches.length > 1) return null
        e.preventDefault()
        return e.changedTouches[0]
      } else {
        e.preventDefault()
        return e
      }
    },
    startCanvasDrag(e) {
      const canvasPos = e.target.getBoundingClientRect()
      this.canvasPos = [Math.floor(canvasPos.x), Math.floor(canvasPos.y)]
      const touchClickEvent = this.getTouchClickEvent(e)
      if (!touchClickEvent) return
      const mousePoint = [
        touchClickEvent.clientX - this.canvasPos[0],
        touchClickEvent.clientY - this.canvasPos[1],
      ]
      this.dragging = false
      // check if one point is below treshold
      for (let i = 0; i < this.newDocumentPosition.length; i++) {
        if (this.pointDistance(mousePoint, this.newDocumentPosition[i]) <= 10) {
          this.dragging = true
          this.dragIndex = i
          return
        }
      }
    },
    canvasDrag(e) {
      if (!this.dragging) return
      const touchClickEvent = this.getTouchClickEvent(e)
      if (!touchClickEvent) return
      this.newDocumentPosition[this.dragIndex] = [
        touchClickEvent.clientX - this.canvasPos[0],
        touchClickEvent.clientY - this.canvasPos[1],
      ]
      this.draw()
    },
    stopCanvasDrag() {
      if (!this.dragging) return
      this.dragged = true
      this.draw()
      this.dragging = false
      this.dragged = false
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
