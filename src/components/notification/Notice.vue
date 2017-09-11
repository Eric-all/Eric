<template>
  <transition :name="transition">
    <div :class="noticeClass" :style="styles">
        <div :class="[`${prefixCls}-notice-content`]" ref="content" v-html="content"></div>
        <a tabIndex="0" @Click="close" :class="[`${prefixCls}-notice-close`]" v-if="closable">
          <span :class="[`${prefixCls}-notice-close-x`]"></span>
        </a>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      duration: {
        type: Number,
        default: 4
      },
      onClose: Function,
      content: null,
      name: null,
      closable: {
        type: Boolean,
        default: false
      },
      transition: {
        type: String,
        default: 'rc-notification-fade'
      },
      styles: Object,
      prefixCls: String
    },
    data () {
      return {
        closeTimer: ''
      }
    },
    mounted () {
      if (this.duration) {
        this.closeTimer = setTimeout(() => {
          this.close()
        }, this.duration * 1000)
      }
    },
    destroyed () {
      this.clearCloseTimer()
    },
    methods: {
      clearCloseTimer () {
        if (this.closeTimer) {
          clearTimeout(this.closeTimer)
          this.closeTimer = null
        }
      },
      close () {
        this.clearCloseTimer()
        this.$parent.remove(this.name)
        this.onClose()
      }
    },
    computed: {
      noticeClass () {
        return {
          [`${this.prefixCls}-notice`]: true,
          [`${this.prefixCls}-notice-closable`]: this.closable
        }
      }
    }
  }
</script>
