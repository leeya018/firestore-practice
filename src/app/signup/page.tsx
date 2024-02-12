"use client"
import React, { useEffect, useRef, useState } from "react"
import Input from "@mui/material/Input"
import { observer } from "mobx-react-lite"
import { Button } from "@mui/material"
import Link from "next/link"
import { NavNames } from "@/util"
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "@/firebase"

function signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const signup = async () => {
    console.log(email, password)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      console.log(cred.user)
      console.log("user has been created")
      setMessage("user has been created")
    } catch (error) {
      setMessage(error.message)
    }
  }
  const logout = async () => {
    try {
      await signOut(auth)
      console.log("user Logged out")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div
      className="w-full  h-[100vh] flex  relative top-20 justify-center 
   overflow-hidden  "
    >
      <div className="w-[40%] h-[40%]  p-10 flex-col">
        <div className="flex justify-center items-center font-bold text-4xl">
          signup
        </div>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="w-full h-full flex flex-col justify-center">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              // ref={emailRef}
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center ">
          <Button variant="outlined" className="w-20 h-10" onClick={signup}>
            signup
          </Button>
          <Link
            className="mt-5 hover:underline text-color-blue hover:text-opacity-70"
            href={NavNames.login}
          >
            to login
          </Link>
          <div className="w-full flex justify-center items-center">
            {message}
          </div>
          <Button variant="outlined" className="w-20 h-10" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
export default observer(signup)
