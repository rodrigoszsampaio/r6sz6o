<template>
  <div id="large-header" class="large-header">
    <canvas id="demo-canvas" width="350" height="250" ></canvas>
    <div class="main-title">
      <span>
        <div>
          <div class="row justify-center q-pa-md">
            <div class="col-auto">
              <q-avatar class="image-shadow" size="200px">
                <q-img width="200px" style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/13525903?s=460&v=4"/>
              </q-avatar>
            </div>
          </div>
          <div class="row justify-center q-px-md q-gutter-x-md" :style="this.$q.dark.isActive ? '' : `color: ${foreground}`">
            <div class="col-12 col-md-auto text-h3 text-center">{{ $t('myName.first') }}</div>
            <div class="col-12 col-md-auto text-h3 text-center">{{ $t('myName.middle') }}</div>
            <div class="col-12 col-md-auto text-h3 text-center">{{ $t('myName.last') }}</div>
          </div>
          <div class="row justify-center q-pa-md q-gutter-md">
            <div class="col-auto text-h5 text-center" :style="this.$q.dark.isActive ? '' : `color: ${foreground}`">
              {{ $t('myTitle') }}
              <span class="blink_me">_</span>
            </div>
          </div>
          <!-- <div>
            {{ text }}
            <span class="blink_me">_</span>
          </div> -->
          <!-- <div class="rotate">;)</div> -->
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Matrix',
  props: ['offset', 'text', 'chars', 'background', 'foreground'],
  mounted: function () {
    this.width = window.innerWidth
    this.height = window.innerHeight - this.offset
    this.largeHeader = document.getElementById('large-header')
    this.canvas = document.getElementById('demo-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.style.width = this.width + 'px'
    this.canvas.style.height = this.height + 'px'
    this.animateHeader = true
    this.largeHeader.style.height = this.height + 'px'

    this.CJS_TICKER_FPS = 30
    this.FIRE_WIDTH = 512
    this.FIRE_HEIGHT = 256

    this.firePal = []
    this.firePixels = []
    this.fireBuffer = []
    this.container = null
    this.color = null

    this.fireRGB = [
      0x07, 0x07, 0x07, 0x1F, 0x07, 0x07, 0x2F, 0x0F, 0x07, 0x47, 0x0F, 0x07, 0x57, 0x17, 0x07, 0x67,
      0x1F, 0x07, 0x77, 0x1F, 0x07, 0x8F, 0x27, 0x07, 0x9F, 0x2F, 0x07, 0xAF, 0x3F, 0x07, 0xBF, 0x47,
      0x07, 0xC7, 0x47, 0x07, 0xDF, 0x4F, 0x07, 0xDF, 0x57, 0x07, 0xDF, 0x57, 0x07, 0xD7, 0x5F, 0x07,
      0xD7, 0x5F, 0x07, 0xD7, 0x67, 0x0F, 0xCF, 0x6F, 0x0F, 0xCF, 0x77, 0x0F, 0xCF, 0x7F, 0x0F, 0xCF,
      0x87, 0x17, 0xC7, 0x87, 0x17, 0xC7, 0x8F, 0x17, 0xC7, 0x97, 0x1F, 0xBF, 0x9F, 0x1F, 0xBF, 0x9F,
      0x1F, 0xBF, 0xA7, 0x27, 0xBF, 0xA7, 0x27, 0xBF, 0xAF, 0x2F, 0xB7, 0xAF, 0x2F, 0xB7, 0xB7, 0x2F,
      0xB7, 0xB7, 0x37, 0xCF, 0xCF, 0x6F, 0xDF, 0xDF, 0x9F, 0xEF, 0xEF, 0xC7, 0xFF, 0xFF, 0xFF
    ]

    for (let i = 0; i < 37; i++) {
      this.firePal[i] = {
        r: this.fireRGB[i * 3 + 0], // 16 * i,
        g: this.fireRGB[i * 3 + 1], // 16 * i,
        b: this.fireRGB[i * 3 + 2] // 16 * i
      }
    }
    for (let i = 0; i < this.FIRE_WIDTH * this.FIRE_HEIGHT; i++) {
      this.firePixels[i] = 0
    }
    for (let i = 0; i < this.FIRE_WIDTH; i++) {
      this.firePixels[(this.FIRE_HEIGHT - 1) * this.FIRE_WIDTH + i] = 36
    }
    this.animate()
    this.$nextTick(function () {
      window.addEventListener('resize', this.resize)
    })
  },
  methods: {
    spreadFire (pixel, curSrc, counter, srcOffset, rand, width) {
      if (pixel !== 0) {
        const randIdx = Math.round(Math.random() * 255.0) & 255
        rand = ((rand + 2) & 255)
        const tmpSrc = (curSrc + (((counter - (randIdx & 3)) + 1) & (this.FIRE_WIDTH - 1)))
        this.firePixels[tmpSrc - this.FIRE_WIDTH] = pixel - ((randIdx & 1))
      } else {
        this.firePixels[srcOffset - this.FIRE_WIDTH] = 0
      }
      return rand
    },
    doFire () {
      let counter = 0
      let curSrc = 0
      let srcOffset = 0
      let rand = 0
      let step = 0
      let pixel = 0
      rand = Math.round(Math.random() * 255.0) & 255
      curSrc = this.FIRE_WIDTH
      do {
        srcOffset = (curSrc + counter)
        pixel = this.firePixels[srcOffset]
        step = 2
        rand = this.spreadFire(pixel, curSrc, counter, srcOffset, rand, this.FIRE_WIDTH)
        curSrc += this.FIRE_WIDTH
        srcOffset += this.FIRE_WIDTH
        do {
          pixel = this.firePixels[srcOffset]
          step += 2
          rand = this.spreadFire(pixel, curSrc, counter, srcOffset, rand, this.FIRE_WIDTH)
          pixel = this.firePixels[srcOffset + this.FIRE_WIDTH]
          curSrc += this.FIRE_WIDTH
          srcOffset += this.FIRE_WIDTH
          rand = this.spreadFire(pixel, curSrc, counter, srcOffset, rand, this.FIRE_WIDTH)
          curSrc += this.FIRE_WIDTH
          srcOffset += this.FIRE_WIDTH
        } while (step < this.FIRE_HEIGHT)
        counter++
        curSrc -= ((this.FIRE_WIDTH * this.FIRE_HEIGHT) - this.FIRE_WIDTH)
      } while (counter < this.FIRE_WIDTH)
    },
    drawPixel (x, y, pixel) {
      this.color.data[((this.FIRE_WIDTH * y) + x) * 4 + 0] = pixel.r
      this.color.data[((this.FIRE_WIDTH * y) + x) * 4 + 1] = pixel.g
      this.color.data[((this.FIRE_WIDTH * y) + x) * 4 + 2] = pixel.b
      this.color.data[((this.FIRE_WIDTH * y) + x) * 4 + 3] = 255
    },
    draw: function () {
      this.doFire()
      this.color = this.ctx.getImageData(0, 0, this.FIRE_WIDTH, this.FIRE_HEIGHT)
      for (let h = 0; h < this.FIRE_HEIGHT; h++) {
        for (let w = 0; w < this.FIRE_WIDTH; w++) {
          let p = this.firePixels[h * this.FIRE_WIDTH + w]
          this.drawPixel(w, h, this.firePal[p])
        }
      }

      this.ctx.putImageData(this.color, 0, 0)
    },
    animate: function () {
      if (this.animateHeader) {
        this.draw()
      }
      requestAnimationFrame(this.animate)
    },
    resize: function () {
      if (
        window.innerWidth !== this.width ||
        window.innerHeight - this.offset !== this.height
      ) {
        this.width = window.innerWidth
        this.height = window.innerHeight - this.offset
        this.largeHeader.style.height = this.height + 'px'
        this.canvas.style.width = this.width + 'px'
        this.canvas.style.height = this.height + 'px'
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>
<style scoped>
.large-header {
  position: relative;
  width: 100%;
  background: #333;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  z-index: 1;
}

.rotate {
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.main-title {
  width: 100%;
  position: absolute;
  margin: 0;
  padding: 0;
  color: #f9f1e9;
  text-align: center;
  top: 40%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
}

.main-title span {
  text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 10px #FFC107, 0 0 10px #ffec00,
    0 0 20px #FFC107, 0 0 35px #ffec00, 0 0 40px #FFC107;
}
/* .main-title span {
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #FFC107, 0 0 30px #ffec00,
    0 0 40px #FFC107, 0 0 55px #ffec00, 0 0 75px #FFC107;
} */
.main-parag {
  width: 100%;
  position: absolute;
  margin: 0;
  padding: 0;
  color: #f9f1e9;
  text-align: center;
  top: 80%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
}

/* .main-parag span {
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #FFC107, 0 0 30px #ffec00,
    0 0 40px #FFC107, 0 0 55px #ffec00, 0 0 75px #FFC107;
} */

.image-shadow {
  box-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 4px #FFC107, 0 0 5px #ffec00,
    0 0 5px #FFC107, 0 0 5px #ffec00, 0 0 15px #FFC107;
}

.main-title {
  font-weight: normal;
  font-size: 4em;
  padding-left: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}

.main-parag {
  font-weight: normal;
  font-size: 2em;
  padding-left: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}

.main-title .thin {
  font-weight: 200;
}

@media only screen and (max-width: 768px) {
  .main-title {
    font-size: 3em;
  }
}

.blink_me {
  animation: blinker 0.8s linear infinite;
}

@keyframes blinker {
  50% { opacity: 0; }
}
</style>
