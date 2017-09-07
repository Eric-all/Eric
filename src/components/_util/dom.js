/* eslint-disable */
export function addClass (dom, cls) {
  let classes = dom.className
  let blank = (classes !== '') ? ' ' : ''
  let added = classes + blank + cls
  dom.className = added
}

/* eslint-disable */
export function removeClass (dom, cls) {
  let classes = ' ' + dom.className + ' '
  classes = classes.replace(/(\s+)/gi, ' ')
  let removed = classes.replace(' ' + cls + ' ', ' ')
  removed = removed.replace(/(^\s+)|(\s+$)/g, '')
  dom.className = removed
}

/* eslint-disable */
export function hasClass (dom, cls) {
  const classes = dom.className
  const classeslist = classes.split(/\s+/)
  let x = 0
  for (x in classeslist) {
    if (classeslist[x] === cls) {
      return true
    }
  }
  return false
}
