"use client"
import React, { useContext, createContext, useState, useEffect } from "react"
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth"
import { auth, db } from "@/firebase"
import { useRouter } from "next/navigation"
import { collection, doc, setDoc } from "firebase/firestore"

import { NavNames } from "@/util"
import { User } from "@/api/firestore/user/interfaces"
import { addUserApi } from "@/api/firestore"

const AuthContext = createContext<AuthReturnType | undefined>(undefined)

type AuthContextProviderType = {
  children: React.ReactNode
}
export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [user])

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(async (UserCredentialImp) => {
        const { email, displayName, uid } = UserCredentialImp.user
        const newUser: User = { email, displayName, userId: uid }
        await addUserApi(newUser)
        router.push(`/${NavNames.home}`)
      })
      .catch((err) => {
        console.log(err.message)
        throw err
      })
  }

  const logOut = () => {
    setIsLoading(true)

    signOut(auth)
    router.push(`/${NavNames.login}`)
  }

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export interface AuthReturnType {
  user: any
  logOut: () => void
  googleSignIn: () => void
}
export const UserAuth = (): AuthReturnType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("UserAuth must be used within AuthContext.Provider")
  }
  return context
}
