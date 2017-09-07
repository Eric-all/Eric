<template>
  <ul class="ant-rate" :class="{'ant-rate-disabled': disabled}" @mouseleave="handleMouseLeave" ref="rate">
    <star v-for="(item, i) in count" :key="i"
          :index="i"
          :value="!hoverValue ? defaultValue : hoverValue"
          :allow-half="allowHalf"
          :icon="icon"
          :disabled="disabled"
          :hover="handleHover"
          :click="handleClick"
    ></star>
  </ul>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import Star from './Star'
  import { getOffsetLeft } from '../_util/util'
  export default {
    name: 'Rate',
    props: {
      count: {
        type: Number,
        default: 5
      },
      value: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      allowHalf: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: 'star'
      }
    },
    data () {
      return {
        hoverValue: null,
        defaultValue: this.value
      }
    },
    methods: {
      handleClick (event, index) {
        this.defaultValue = this.getStarValue(index, event.pageX)
        this.handleMouseLeave()
        this.$emit('onChange', this.defaultValue)
      },
      handleHover (event, index) {
        this.hoverValue = this.getStarValue(index, event.pageX)
      },
      getStarValue (index, x) {
        let value = index + 1
        if (this.allowHalf) {
          let el = this.$refs.rate
          const leftEdge = el.offsetLeft
          const width = getOffsetLeft(this.getStarDOM(1)) - leftEdge
          if ((x - leftEdge - width * index) < width / 2) {
            value -= 0.5
          }
        }
        return value
      },
      handleMouseLeave () {
        if (this.disabled) return null
        this.hoverValue = null
      },
      getStarDOM (index) {
        let el = this.$refs.rate
        return el.children[index]
      }
    },
    components: {
      Star
    }
  }
</script>
