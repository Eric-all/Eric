<template>
  <div :class="inputNumberStyles">
    <div class="ant-input-number-handler-wrap">
      <span unselectable="unselectable" role="button" aria-disabled="false" :class="upStyles" @click="handlerUp">
        <span unselectable="unselectable" class="ant-input-number-handler-up-inner"></span>
      </span>
      <span unselectable="unselectable" role="button" aria-disabled="false" :class="downStyles" @click="handlerDown">
        <span unselectable="unselectable" class="ant-input-number-handler-down-inner"></span>
      </span>
    </div>
    <div class="ant-input-number-input-wrap" role="spinbutton" :aria-valuemin="min" :aria-valuemax="max" :aria-valuenow="defaultValue">
      <input class="ant-input-number-input" autocomplete="off"
             :step="step"
             :min="min"
             :max="max"
             :value="formatWrapper(defaultValue)"
             :disabled="disabled"
             @blur="handlerBlur"
             @keydown.stop="handlerKeyup"
             ref="input">
    </div>
  </div>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import { isPreset } from '../_util/util'
  export default {
    name: 'InputNumber',
    props: {
      min: Number,
      max: Number,
      value: {
        type: Number,
        default: 1
      },
      step: {
        type: Number,
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'default',
        validator (val) {
          return isPreset(val, ['default', 'large', 'small'])
        }
      },
      formatter: Function,
      parser: {
        type: Function,
        /* eslint-disable no-useless-escape */
        default: (val) => {
          return val.replace(/[^\w\.-]+/g, '')
        }
      }
    },
    data () {
      return {
        defaultValue: this.value,
        upDisabled: false,
        downDisabled: false
      }
    },
    computed: {
      inputNumberStyles () {
        return {
          'ant-input-number': true,
          'ant-input-number-disabled': this.disabled,
          [`ant-input-number-${this.size}`]: this.size
        }
      },
      upStyles () {
        return {
          'ant-input-number-handler': true,
          'ant-input-number-handler-up': true,
          'ant-input-number-handler-up-disabled': this.upDisabled || this.defaultValue >= this.max
        }
      },
      downStyles () {
        return {
          'ant-input-number-handler': true,
          'ant-input-number-handler-down': true,
          'ant-input-number-handler-down-disabled': this.downDisabled || this.defaultValue <= this.min
        }
      }
    },
    methods: {
      handlerUp () {
        if (this.disabled || this.upDisabled) return false
        if ((this.defaultValue + this.step) >= this.max) {
          this.defaultValue = this.max
          this.upDisabled = true
          return false
        }
        this.defaultValue = this.defaultValue + this.step
      },
      handlerDown () {
        if (this.disabled || this.downDisabled) return false
        if ((this.defaultValue - this.step) <= this.min) {
          this.defaultValue = this.min
          this.downDisabled = true
          return false
        }
        this.defaultValue = this.defaultValue - this.step
      },
      handlerKeyup (e) {
        if (e.keyCode === 38) {
          e.preventDefault()
          this.handlerUp(e)
        } else if (e.keyCode === 40) {
          e.preventDefault()
          this.handlerDown(e)
        }
      },
      watchDefaultValue (up, down) {
        this.upDisabled = up
        this.downDisabled = down
      },
      formatWrapper (num) {
        if (this.formatter) {
          return this.formatter(num)
        }
        return num
      },
      handlerBlur () {
        if (isNaN(this.parser(this.$refs.input.value))) {
          return (this.$refs.input.value = this.formatWrapper(this.defaultValue))
        }
        if (this.parser(this.$refs.input.value) > this.max) {
          return (this.$refs.input.value = this.formatWrapper(this.max))
        } else {
          return (this.defaultValue = Number(this.parser(this.$refs.input.value)))
        }
      }
    },
    watch: {
      defaultValue (val) {
        this.$emit('onChange', val, this.value)
        if (val >= this.max) {
          this.watchDefaultValue(true, false)
        } else if (val <= this.min) {
          this.watchDefaultValue(false, true)
        } else {
          this.watchDefaultValue(false, false)
        }
      }
    }
  }
</script>
