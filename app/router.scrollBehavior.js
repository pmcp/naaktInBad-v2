export default function(to, from, savedPosition) {
  if (to.hash) {
    return {
      el: to.hash
    }
  }
  return { x: 0, y: 0 }
}
