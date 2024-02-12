import { Timestamp } from "firebase/firestore"

export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION
}

export const isDev = () => process.env.NODE_ENV === "development"

export const NavNames = {
  signup: "/signup",
  login: "/login",
  home: "/home",
  root: "/",
}
