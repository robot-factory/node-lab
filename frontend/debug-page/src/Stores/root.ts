import LayoutStore from './layout'

class RootStore {
  layout: LayoutStore

  constructor() {
    this.layout = new LayoutStore()
  }
}

export default RootStore