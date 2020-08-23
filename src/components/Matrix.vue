<template>
  <div id="large-header" class="large-header">
    <canvas id="demo-canvas"></canvas>
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
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')
    this.animateHeader = true
    this.fontSize = 13
    this.columns = this.canvas.width / this.fontSize
    this.drops = []
    for (let x = 0; x < this.columns; x++) {
      this.drops[x] = 1
    }
    this.largeHeader.style.height = this.height + 'px'
    this.animate()
    this.$nextTick(function () {
      window.addEventListener('resize', this.resize)
    })
  },
  methods: {
    draw: function () {
      this.ctx.fillStyle = this.background // 'rgba(0, 0, 0, 0.05)'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.fillStyle = this.foreground // '#ffec00'
      this.ctx.font = this.fontSize + 'px arial'
      for (let i = 0; i < this.drops.length; i++) {
        const text = this.chars[Math.floor(Math.random() * this.chars.length)]
        this.ctx.fillText(
          text,
          i * this.fontSize,
          this.drops[i] * this.fontSize
        )
        if (
          this.drops[i] * this.fontSize > this.canvas.height &&
          Math.random() > 0.975
        ) {
          this.drops[i] = 0
        }
        this.drops[i]++
      }
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
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.columns = this.canvas.width / this.fontSize
        for (let x = 0; x < this.columns; x++) {
          this.drops[x] = 1
        }
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
