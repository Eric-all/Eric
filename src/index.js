import Alert from './components/alert'
import Card from './components/card'
import Icon from './components/icon'
import Message from './components/message'
import Avatar from './components/avatar'
import Badge from './components/badge'
import BackTop from './components/back-top'
import { Row, Column } from './components/grid'
import Rate from './components/rate'
import Radio from './components/radio'
import Tag from './components/tag'
import Switch from './components/switch'
import Tab from './components/tab'
import Timeline from './components/timeline'
import Spin from './components/spin'
import Button from './components/button'
import InputNumber from './components/input-number'
import Collapse from './components/collapse'
import Notice from './components/notice'

const Eric = {
  Alert,
  Card,
  Icon,
  Avatar,
  Badge,
  BackTop,
  Row,
  Column,
  Rate,
  Message,
  Notice,
  IRadio: Radio,
  RadioGroup: Radio.Group,
  RadioButton: Radio.Button,
  Tag,
  ISwitch: Switch,
  Tab,
  TabPane: Tab.Pane,
  Timeline,
  TimelineItem: Timeline.Item,
  Spin,
  IButton: Button,
  ButtonGroup: Button.Group,
  InputNumber,
  Collapse,
  CollapsePanel: Collapse.Panel
}
const install = (Vue, option = {}) => {
  Object.keys(Eric).forEach((key) => {
    Vue.component(key, Eric[key])
  })
  Vue.prototype.$message = Message
  Vue.prototype.$notice = Notice
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Object.assign(Eric, {install})
