<template>
  <canvas ref="qrcodeCanvas" :width="size" :height="size"></canvas>
</template>

<script>
import { onMounted, ref } from 'vue'
import UQRCode from 'uqrcode' // 引入uqrcode库

export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 200,
    },
  },
  setup(props) {
    const qrcodeCanvas = ref(null)

    onMounted(() => {
      const qr = new UQRCode()
      qr.data = props.content
      qr.size = props.size
      qr.make()

      const canvas = qrcodeCanvas.value
      const canvasContext = canvas.getContext('2d')
      qr.canvasContext = canvasContext
      qr.drawCanvas()
    })

    return {
      qrcodeCanvas,
    }
  },
}
</script>
