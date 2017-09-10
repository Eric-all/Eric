export default {
  props: {
    name: null,
    checked: {
      type: Boolean,
      default: false
    },
    value: null,
    disabled: {
      type: Boolean,
      default: false
    },
    label: null
  },
  data () {
    return {
      select: this.checked,
      radioName: this.name,
      radioValue: this.value ? this.value : 'no'
    }
  },
  methods: {
    handlerChecked (event) {
      if (this.disabled || this.select) return false
      let name = this.$parent.$options.name
      if (name === 'RadioGroup') {
        this.$parent.handlerChecked(this.radioValue)
      } else {
        this.select = true
      }
      let radioValue = this.radioValue ? this.radioValue : this.select
      this.$emit('onChange', radioValue)
    }
  }
}
