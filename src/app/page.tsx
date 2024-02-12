"use client"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"

import { Timestamp } from "firebase/firestore"
import { Button, Input } from "@mui/material"

import { Test } from "@/api/firestore/test/interfaces"
import {
  addTestApi,
  deleteAllTestsApi,
  deleteTestApi,
  editTestApi,
  getSnapshotForDocApi,
  getTestsApi,
  getTestsByIdApi,
  getTestsByIdSnapApi,
  getTestsQueryApi,
  getTestsSnapApi,
} from "@/api/firestore"
import Navbar from "@/components/navbar"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import ProtectedRout from "@/components/protectedRout"

// const newTest: Test = {
//   name: "test12",
//   count: 3,
// }
//  this page is protected by ProtectedRout component
const HomePage = observer(() => {
  const [name, setName] = useState<string>("")
  const [count, setCount] = useState<number>(0)
  const [testId, setTestId] = useState<string>("")

  useEffect(() => {
    // getTestsSnapApi()
    const unSubscribe = getTestsByIdSnapApi("C6OGYvaAyHCrY7R8Oblk")
    // getSnapshotForDocApi("test1")
    return () => unSubscribe()
  }, [])

  return (
    <ProtectedRout>
      <div
        className="w-full  h-[100vh] flex flex-col items-center  relative
      overflow-hidden  "
      >
        <Navbar />
        <div className="w-full flex justify-center items-center font-bold text-xl pb-10">
          test the data in firestroe{" "}
        </div>
        <div className="w-[50%]  flex flex-wrap justify-between gap-5 ">
          <Button variant="outlined" className="" onClick={getTestsApi}>
            get all tests
          </Button>
          <div className="flex  flex-col justify-center items-center">
            <Input
              onChange={(e) => setTestId(e.target.value)}
              value={testId}
              placeholder="test id "
            />
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="name"
            />
            <Input
              onChange={(e) => setCount(parseInt(e.target.value))}
              value={count}
              placeholder="count"
              type="number"
            />
            <Button
              variant="outlined"
              className=""
              onClick={
                () => editTestApi(testId, { count, name })
                // editTest("C6OGYvaAyHCrY7R8Oblk", { name: "a new name is good" })
              }
            >
              edit Test
            </Button>
          </div>
          <Button variant="outlined" className="" onClick={getTestsQueryApi}>
            get Tests Query
          </Button>
          <div className="flex  flex-col justify-center items-center">
            <Input
              onChange={(e) => setTestId(e.target.value)}
              value={testId}
              placeholder="test id "
            />
            <Button
              variant="outlined"
              className=""
              onClick={() => getTestsByIdApi(testId)}
            >
              get Test By Id
            </Button>
          </div>
          <div className="flex  flex-col justify-center items-center">
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="name"
            />
            <Input
              onChange={(e) => setCount(parseInt(e.target.value))}
              value={count}
              placeholder="count"
              type="number"
            />
            <Button
              variant="outlined"
              className=""
              onClick={() => {
                addTestApi({ name, count })
                setName("")
                setCount(0)
              }}
            >
              add test
            </Button>
          </div>
          <div className="flex  flex-col justify-center items-center">
            <Input
              onChange={(e) => setTestId(e.target.value)}
              value={testId}
              placeholder="test id "
            />
            <Button
              variant="outlined"
              className=""
              onClick={() => deleteTestApi(testId)}
            >
              delete test
            </Button>
          </div>
          <Button
            variant="outlined"
            className=""
            onClick={() => deleteAllTestsApi()}
          >
            delete all tests
          </Button>
        </div>
      </div>
    </ProtectedRout>
  )
})

export default HomePage
