<template>
  <div :class="classes">
    <div class="ant-collapse-header" role="tab" :aria-expanded="show" @click="handleClick">
      <i class="arrow"></i>
      {{ header }}
    </div>
    <collapse-transition>
      <div class="ant-collapse-content" role="tabpanel" v-show="show">
        <div class="ant-collapse-content-box">
          <p><slot></slot></p>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import CollapseTransition from '../_util/collapse-transition'
  export default {
    name: 'CollapsePanel',
    props: {
      name: {
        type: [String, Number],
        required: true
      },
      header: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        show: false
      }
    },
    computed: {
      classes () {
        return {
          'ant-collapse-item': true,
          'ant-collapse-item-active': this.show,
          'ant-collapse-item-disabled': this.disabled
        }
      }
    },
    methods: {
      handleClick () {
        if (this.disabled) return false
        this.show = !this.show
        this.$parent.setActiveStatus(this.name)
        this.$emit('onChange', this.name, this.show)
      }
    },
    components: {
      CollapseTransition
    }
  }
</script>
