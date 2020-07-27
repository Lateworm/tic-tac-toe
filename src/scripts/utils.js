const utils = {
  equal: (array) => {
    for (let i = 1; i <= array.length-1; i++) {
      if (array[i] !== array[0]) {
        return false
      }
    }

    return true
  }
}

export default utils