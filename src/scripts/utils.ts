// TODO: this seems to only be imported into board,
// and not even used there,
// maybe just kill this?

const utils = {
  equal: (array: any[]) => {
    for (let i = 1; i <= array.length-1; i++) {
      if (array[i] !== array[0]) {
        return false
      }
    }

    return true
  }
}

export default utils