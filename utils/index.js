export default {
  capitalizeFirstLetter (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
  scrollToTop () {
    return window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  },
  generateRtRwOptions (val) {
    switch (val) {
      case 'rw': {
        const listRw = []
        for (let i = 0; i < 60; i++) {
          listRw.push({
            name: i + 1,
            id: i + 1
          })
        }
        return [
          { name: 'Pilih RW' },
          ...listRw
        ]
      }
      case 'rt': {
        const listRt = []
        for (let i = 0; i < 50; i++) {
          listRt.push({
            name: i + 1,
            id: i + 1
          })
        }
        return [
          { name: 'Pilih RT' },
          ...listRt
        ]
      }
      default:
        return []
    }
  }
}
