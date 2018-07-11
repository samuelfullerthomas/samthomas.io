export default {
  double: ({ get, set }, key) => {
    const state = get()
    const currentString = state[key]
    const matches = currentString.match(/(\s?send help\s?)*\s(\w+)\s/)
    let nextString = currentString.replace(matches[2], 'send help')
    if (/send/.test(matches[2])) nextString = currentString.repeat(2)
    set({ [key]: nextString })
  }
}
