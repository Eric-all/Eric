import './style/index.less'
import { isPreset } from '../_util/util'

export default {
  name: 'Badge',
  props: {
    count: Number,
    overflowCount: {
      type: Number,
      default: 99
    },
    showZero: {
      type: Boolean,
      default: false
    },
    dot: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      validator (val) {
        return isPreset(val, ['success', 'processing', 'error', 'warning', 'default'])
      }
    },
    text: String,
    styles: Object
  },
  computed: {
    badgeClass () {
      return {
        'ant-badge': true,
        'ant-badge-status ant-badge-not-a-wrapper': this.status
      }
    },
    supClass () {
      return {
        'ant-badge-dot': this.dot && !this.status,
        'ant-badge-count': this.count || this.showZero && !this.dot && !this.status
      }
    },
    statusClass () {
      return {
        'ant-badge-status-dot': this.status,
        [`ant-badge-status-${this.status}`]: this.status
      }
    }
  },
  render (h) {
    const {
      count,
      overflowCount,
      showZero,
      dot,
      status,
      text,
      styles
    } = this.$props

    const isDot = dot || status
    let displayCount = count > overflowCount ? `${overflowCount}+` : count
    if (isDot) {
      displayCount = ''
    }
    const isZero = displayCount === '0' || displayCount === 0
    const isEmpty = displayCount === null || displayCount === undefined || displayCount === ''
    const hidden = (isEmpty || (isZero && !showZero)) && !isDot

    if (status) {
      return h('span', {
        'class': this.badgeClass
      }, [h('span', {
        'class': this.statusClass
      }), h('span', {
        'class': 'ant-badge-status-text'
      }, text)])
    }

    return h('span', {
      'class': this.badgeClass
    }, [
      this.$slots.default,
      !hidden ? h('sup', {
        'class': this.supClass,
        style: styles
      }, displayCount) : null
    ])
  }
}
