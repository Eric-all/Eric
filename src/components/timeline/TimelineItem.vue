<template>
  <li :class="itemClasses">
    <div class="ant-timeline-item-tail"></div>
    <div class="ant-timeline-item-head" :class="itemHeadClasses" :style="stylees">
      <i :class="itemHeadIconClasses" style="font-size: 16px;" v-if="icon"></i>
    </div>
    <div class="ant-timeline-item-content"><slot></slot></div>
  </li>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import { isPreset } from '../_util/util'
  const arrList = ['blue', 'red', 'green']

  export default {
    name: 'TimelineItem',
    props: {
      color: {
        type: String,
        default: 'blue'
      },
      icon: String
    },
    data () {
      return {
        stylees: this.setColor(this.color),
        last: false,
        pending: false
      }
    },
    watch: {
      color (val) {
        this.stylees = this.setColor(val)
      }
    },
    computed: {
      itemClasses () {
        return {
          'ant-timeline-item': true,
          'ant-timeline-item-last': this.last,
          'ant-timeline-item-pending': this.pending
        }
      },
      itemHeadClasses () {
        return {
          'ant-timeline-item-head-custom': this.icon,
          [`ant-timeline-item-head-${this.color}`]: isPreset(this.color, arrList)
        }
      },
      itemHeadIconClasses () {
        return {
          'anticon': true,
          [`anticon-${this.icon}`]: this.icon
        }
      }
    },
    methods: {
      setColor (val) {
        return {
          borderColor: (val && !isPreset(val, arrList)) ? val : null,
          color: (val && !isPreset(val, arrList)) ? val : null
        }
      }
    }
  }
</script>
