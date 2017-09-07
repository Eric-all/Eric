/**
 * 判断参数是否是其中之一
 * @param value
 * @param validList
 * @returns {boolean}
 * @url https://github.com/iview/iview/blob/2.0/src/utils/assist.js
 */

export function isPreset (value, validList) {
  if (!value) { return false }
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
}

function getScroll (w, top) {
  let ret = top ? w.pageYOffset : w.pageXOffset
  const method = top ? 'scrollTop' : 'scrollLeft'
  if (typeof ret !== 'number') {
    const d = w.document
    // ie6,7,8 standard mode
    ret = d.documentElement[method]
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method]
    }
  }
  return ret
}

function getClientPosition (elem) {
  let box
  let x
  let y
  const doc = elem.ownerDocument
  const body = doc.body
  const docElem = doc && doc.documentElement
  box = elem.getBoundingClientRect()
  x = box.left
  y = box.top
  x -= docElem.clientLeft || body.clientLeft || 0
  y -= docElem.clientTop || body.clientTop || 0
  return {
    left: x,
    top: y
  }
}

export function getOffsetLeft (el) {
  const pos = getClientPosition(el)
  const doc = el.ownerDocument
  const w = doc.defaultView || doc.parentWindow
  pos.left += getScroll(w)
  return pos.left
}

export function scrollTop (el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll (start, end, step) {
    if (start === end) return

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}
