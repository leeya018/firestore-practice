import { NavNames } from "@/util"
import { makeAutoObservable } from "mobx"

class Nav {
  nav: string = NavNames.home
  constructor() {
    makeAutoObservable(this)
  }

  setNav = (n: string) => {
    this.nav = n
  }
}

const navStore = new Nav()
export default navStore
