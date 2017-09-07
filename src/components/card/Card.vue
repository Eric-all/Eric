<template>
  <div :class="classes" :style="styles">
    <div class="ant-card-head" v-if="title">
      <div class="ant-card-head-title" v-if="title">{{ title }}</div>
      <div class="ant-card-extra" v-html="extra" v-if="extra">
        {{ extra }}
      </div>
    </div>
    <div class="ant-card-body" :style="body">
      <slot></slot>
      <div class="ant-card-loading-content" v-if="load">
        <p class="ant-card-loading-block" style="width: 94%;"></p>
        <p>
          <span class="ant-card-loading-block" style="width: 28%;"></span>
          <span class="ant-card-loading-block" style="width: 62%;"></span>
        </p>
        <p>
          <span class="ant-card-loading-block" style="width: 22%;"></span>
          <span class="ant-card-loading-block" style="width: 66%;"></span>
        </p>
        <p>
          <span class="ant-card-loading-block" style="width: 56%;"></span>
          <span class="ant-card-loading-block" style="width: 39%;"></span>
        </p>
        <p>
          <span class="ant-card-loading-block" style="width: 21%;"></span>
          <span class="ant-card-loading-block" style="width: 15%;"></span>
          <span class="ant-card-loading-block" style="width: 40%;"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  export default {
    name: 'Card',
    props: {
      title: String,
      extra: String,
      bordered: {
        type: Boolean,
        default: true
      },
      hovering: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      styles: Object,
      body: Object
    },
    data () {
      return {
        load: this.loading
      }
    },
    computed: {
      classes () {
        return {
          'ant-card': true,
          'ant-card-bordered': this.bordered,
          'ant-card-loading': this.load,
          'ant-card-no-hovering': this.hovering
        }
      }
    },
    updated () {
      let slot = this.$slots.default
      if (slot !== undefined) {
        this.load = false
      } else {
        this.load = this.loading
      }
    }
  }
</script>
