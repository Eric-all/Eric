<template>

  <div :class="classes">
    <div :class="contentClasses" :style="tabContent" v-if="position === 'bottom'">
      <slot></slot>
    </div>
    <div role="tablist" class="ant-tabs-bar" tabindex="0" ref="tablist">
      <div class="ant-tabs-nav-container">
        <div class="ant-tabs-nav-wrap">
          <div class="ant-tabs-nav-scroll">
            <div class="ant-tabs-nav ant-tabs-nav-animated">
              <div class="ant-tabs-ink-bar ant-tabs-ink-bar-animated" :style="styles"></div>
              <div role="tab" class="ant-tabs-tab"
                   v-for="(tab, index) in tabTitle"
                   :aria-disabled="tab.disabled"
                   :aria-selected="tab.active"
                   :class="{'ant-tabs-tab-active': tab.active, 'ant-tabs-tab-disabled': tab.disabled}"
                   @click="handleClick(index)"
                   ref="tab"
              ><span v-if="tab.icon"><i :class="['anticon anticon-' + tab.icon]"></i></span> {{ tab.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="contentClasses" :style="tabContent" v-if="position !== 'bottom'">
      <slot></slot>
    </div>
  </div>

</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import { isPreset } from '../_util/util'
  export default {
    name: 'Tab',
    props: {
      active: {
        type: [String, Number],
        default: 0
      },
      type: {
        type: String,
        default: 'line',
        validator (val) {
          return isPreset(val, ['line', 'card', 'editable-card'])
        }
      },
      position: {
        type: String,
        default: 'top',
        validator (val) {
          return isPreset(val, ['top', 'right', 'bottom', 'left'])
        }
      },
      size: {
        type: Boolean,
        default: false
      },
      animated: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        tabTitle: [],
        styles: {},
        tabContent: {}
      }
    },
    mounted () {
      this.getTabTitle()
    },
    methods: {
      getTabTitle () {
        let active = this.active
        let state = active !== 0 || active !== '0' || active !== undefined ? active : 0
        this.$children.forEach((child, index) => {
          if (state) {
            if (child.name === state) {
              child.active = true
              this.$nextTick(() => {
                this.getTabDOM(index)
              })
            }
          } else {
            if (index === state) {
              child.active = true
              this.$nextTick(() => {
                this.getTabDOM(index)
              })
            }
          }
          this.tabTitle.push({
            title: child.title,
            active: child.active,
            icon: child.icon,
            disabled: child.disabled
          })
        })
      },
      getTabDOM (i) {
        let domNode = this.$refs.tab
        if (this.position === 'top' || this.position === 'bottom') {
          if (this.type !== 'card') {
            this.tabContent = {
              marginLeft: `-${i * 100}%`
            }
          }
          this.styles = {
            display: 'block',
            transform: `translate3d(${domNode[i].offsetLeft}px, 0px, 0px)`,
            width: domNode[i].offsetWidth + 'px'
          }
        } else if (this.position === 'left' || this.position === 'right') {
          this.tabContent = {
            marginTop: `-${i * 100}%`
          }
          this.styles = {
            display: 'block',
            transform: `translate3d(0px, ${domNode[i].offsetTop}px, 0px)`,
            height: domNode[i].offsetHeight + 'px'
          }
        }
      },
      handleClick (i) {
        this.getTabDOM(i)
        this.$children.forEach((child, index) => {
          if (i === index) {
            child.active = true
            this.tabTitle[i].active = true
          } else if (i !== index) {
            child.active = false
            this.tabTitle[index].active = false
          }
        })
      }
    },
    computed: {
      classes () {
        return {
          'ant-tabs': true,
          [`ant-tabs-${this.position}`]: this.position,
          [`ant-tabs-${this.type}`]: this.type,
          'ant-tabs-mini': this.size,
          'ant-tabs-vertical': this.position === 'left' || this.position === 'right'
        }
      },
      contentClasses () {
        return {
          'ant-tabs-content': true,
          'ant-tabs-content-animated': this.animated && this.type !== 'card',
          'ant-tabs-content-no-animated': !this.animated || this.type === 'card'
        }
      }
    }
  }
</script>
