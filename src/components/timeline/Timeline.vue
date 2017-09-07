<template>
  <ul :class="classes">
    <slot></slot>
    <Timeline-Item v-if="pending">
      <div v-html="pending" v-if="type"></div>
    </Timeline-Item>
  </ul>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import TimelineItem from './TimelineItem'
  export default {
    name: 'Timeline',
    props: {
      pending: [Boolean, String]
    },
    data () {
      return {
        type: false
      }
    },
    mounted () {
      this.isSetPending()
    },
    methods: {
      isSetPending () {
        let len = this.$children.length
        this.$children[len - (this.pending ? 2 : 1)].last = true
        if (this.pending) {
          this.$children[len - (this.pending ? 1 : null)].pending = true
        }
        if (typeof this.pending === 'string') {
          this.type = true
        }
      }
    },
    computed: {
      classes () {
        return {
          'ant-timeline': true,
          'ant-timeline-pending': this.pending
        }
      }
    },
    components: {
      TimelineItem
    }
  }
</script>
