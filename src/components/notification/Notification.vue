<template>
  <div :class="classes" :style="styles">
    <span>
      <Notice
        v-for="notice in notices"
        :key="notice.name"
        :name="notice.name"
        :prefix-cls="prefixCls"
        :content="notice.content"
        :duration="notice.duration"
        :styles="notice.styles"
        :closable="notice.closable"
        :transition="transitionName"
        :on-close="notice.onClose"
      ></Notice>
    </span>
  </div>
</template>

<script>
  import Notice from './Notice'

  let seed = 0
  const now = Date.now()

  function getUuid () {
    return `Notification_${now}_${seed++}`
  }

  export default {
    components: {
      Notice
    },
    props: {
      prefixCls: {
        type: String,
        default: 'rc-notification'
      },
      transitionName: {
        type: String,
        default: 'rc-notification-fade'
      },
      styles: {
        type: Object,
        default: () => {
          return {
            top: 15 + 'px',
            left: 45 + '%'
          }
        }
      }
    },
    data () {
      return {
        notices: []
      }
    },
    methods: {
      add (notice) {
        const key = notice.name = notice.name || getUuid()
        const notices = this.notices
        if (!notices.filter(v => v.name === key).length) {
          return (this.notices = notices.concat(notice))
        }
      },
      remove (key) {
        const notices = this.notices
        return (this.notices = notices.filter(notice => notice.name !== key))
      },
      removeAll () {
        this.notices = []
      }
    },
    computed: {
      classes () {
        return {
          [`${this.prefixCls}`]: true
        }
      }
    }
  }
</script>
