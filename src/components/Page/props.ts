
export const myMixin = {
  props: {
    parems: {
      type: Object,
      default: () => { }
    },
    list: {
      type: Array,
      default: () => [],
    },
    url: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: '36px'
    },
    listLabel: {
      type: String,
      default: 'Record'
    }
  }
}