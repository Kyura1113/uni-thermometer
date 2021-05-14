<template>
  <canvas v-if="canvasId && !imgBase64" class="ec-canvas"
  		:id="canvasId" :canvasId="canvasId" @touchstart="touchStart"
  		@touchmove="touchMove" @touchend="touchEnd" @error="error"></canvas>
</template>

<script>
  import WxCanvas from './wx-canvas';
  import * as echarts from '@/assets/echarts.min.js'; /*chart.min.js为在线定制*/

  export default {
    props: {
      canvasId: {
        type: String,
        default: 'ec-canvas'
      },
      lazyLoad: {
        type: Boolean,
        default: false
      },
      disableTouch: {
        type: Boolean,
        default: true
      },
      throttleTouch: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return {
        imgBase64: ''
      }
    },
    onReady() {
      if (!echarts) {
        console.warn('组件需绑定 echarts 变量，例：<ec-canvas id="mychart-dom-bar" ' +
          'canvas-id="mychart-bar" :echarts="echarts"></ec-canvas>');
        return;
      }
      if (!this.lazyLoad) this.init();
    },
    methods: {
      init() {
        let self = this;
        const version = wx.version.version.split('.').map(n => parseInt(n, 10));
        const isValid = version[0] > 1 || (version[0] === 1 && version[1] > 9) || (version[0] === 1 && version[1] ===
          9 && version[2] >= 91);
        if (!isValid) {
          console.error('微信基础库版本过低，需大于等于 1.9.91。' + '参见：https://github.com/ecomfe/echarts-for-weixin' +
            '#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82');
          return;
        }


        const canvasId = this.canvasId;
        this.ctx = wx.createCanvasContext(canvasId, this);

        const canvas = new WxCanvas(this.ctx, canvasId);

        echarts.setCanvasCreator(() => canvas);

        const query = wx.createSelectorQuery().in(this);
        query
          .select(`#${canvasId}`)
          .boundingClientRect(res => {
            if (!res) { 
              return;
            }

            this.chart = this.$emit('onInit', {
              canvas,
              width: res.width,
              height: res.height
            });
            // setTimeout(() => {
            //   self.canvasToImg({
            //     width: res.width,
            //     height: res.height
            //   })
            // }, 500);  
          })
          .exec();
      },
      canvasToTempFilePath(opt) {
        const {
          canvasId
        } = this;
        this.ctx.draw(true, () => {
          wx.canvasToTempFilePath({
            canvasId,
            ...opt
          });
        });
      },
      touchStart(e) {
        const {
          disableTouch
        } = this;
        if (disableTouch || !e.mp.touches.length) return;
        const touch = e.mp.touches[0];
        echarts._zr.handler.dispatch('mousedown', {
          zrX: touch.x,
          zrY: touch.y
        });
        echarts._zr.handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
      },
      touchMove(e) {
        const {
          disableTouch,
          throttleTouch,
          lastMoveTime
        } = this;
        if (disableTouch || !e.mp.touches.length) return;

        if (throttleTouch) {
          const currMoveTime = Date.now();
          if (currMoveTime - lastMoveTime < 240) return;
          this.lastMoveTime = currMoveTime;
        }

        const touch = e.mp.touches[0];
        echarts._zr.handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
      },
      touchEnd(e) {
        const {
          disableTouch
        } = this;
        if (disableTouch) return;
        const touch = e.mp.changedTouches ? e.mp.changedTouches[0] : {};
        echarts._zr.handler.dispatch('mouseup', {
          zrX: touch.x,
          zrY: touch.y
        });
        echarts._zr.handler.dispatch('click', {
          zrX: touch.x,
          zrY: touch.y
        });
      },
      // canvas转图片
      canvasToImg(options){
        let self = this;
        uni.canvasToTempFilePath({
            x: 0, // 起点坐标
            y: 0,
            width: options.width, // canvas 宽
            height: options.height, // canvas 高
            canvasId: self.canvasId, // canvas id
            success(res) {
              
              const savedFilePath = res.tempFilePath //相对路径
              uni.getFileSystemManager().readFile({
                  filePath: savedFilePath, //选择图片返回的相对路径
                  encoding: 'base64', //编码格式
                  success: res1 => { //成功的回调
                      self.imgBase64 = 'data:image/jpeg;base64,' + res1.data //不加上这串字符，在页面无法显示的哦
                  },fail: (e) => {
                      self.imgBase64 = savedFilePath;
                      console.log("图片转换失败");
                  }
              })
            },
            fail(err){
              console.log(err)
            }
        },this)   
      }
    }
  };
</script>

<style scoped>
  .ec-canvas {
	width: 100%;
	height: 100%;
  }
</style>