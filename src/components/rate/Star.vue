<template>
  <li class="ant-rate-star" :class="classes" @click="handleClick" @mousemove="handleHover">
    <div class="ant-rate-star-first">
      <i :class="[`anticon anticon-${icon}`]"></i>
    </div>
    <div class="ant-rate-star-second">
      <i :class="[`anticon anticon-${icon}`]"></i>
    </div>
  </li>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  export default {
    name: 'Star',
    props: {
      value: Number,
      index: Number,
      allowHalf: Boolean,
      disabled: Boolean,
      icon: String,
      hover: Function,
      click: Function
    },
    computed: {
      classes () {
        const starValue = this.index + 1
        if (this.allowHalf && this.value + 0.5 === starValue) {
          return 'ant-rate-star-half ant-rate-star-active'
        }
        return starValue <= this.value ? 'ant-rate-star-full' : 'ant-rate-star-zero'
      }
    },
    methods: {
      handleClick (e) {
        if (this.disabled) return null
        this.click(e, this.index)
      },
      handleHover (e) {
        if (this.disabled) return null
        this.hover(e, this.index)
      }
    }
  }
</script>
