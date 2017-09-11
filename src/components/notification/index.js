import Notification from './Notification'
import Vue from 'vue'

Notification.newInstance = function newNotificationInstance (Properties) {
  const prop = Properties || {}
  const Instance = new Vue({
    data: prop,
    render (h) {
      return h(Notification, {
        props: prop
      })
    }
  })
  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const notification = Instance.$children[0]
  return {
    notice (noticeProps) {
      notification.add(noticeProps)
    },
    remove (key) {
      notification.remove(key)
    },
    component: notification,
    destroy (el) {
      notification.removeAll()
      setTimeout(function () {
        document.body.removeChild(document.getElementsByClassName(el)[0])
      }, 500)
    }
  }
}
export default Notification
