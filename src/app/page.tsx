"use client"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"

import { Timestamp } from "firebase/firestore"
import { Button } from "@mui/material"

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

const newTest: Test = {
  name: "test12",
  count: 3,
}

const HomePage = observer(() => {
  useEffect(() => {
    // getTestsSnapApi()
    const unSubscribe = getTestsByIdSnapApi("C6OGYvaAyHCrY7R8Oblk")
    // getSnapshotForDocApi("test1")
    return () => unSubscribe()
  }, [])
  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="w-full font-bold flex justify-center items-center ">
        test the data in firestroe{" "}
      </div>
      <div className="w-full  flex justify-center items-center ">
        the functions and structure will help you learn on the firestore and the
        auth functions .{" "}
      </div>
      <Button variant="outlined" className="" onClick={getTestsApi}>
        get all tests
      </Button>
      <Button
        variant="outlined"
        className=""
        onClick={
          () => editTestApi("C6OGYvaAyHCrY7R8Oblk", { amount: 123 })
          // editTest("C6OGYvaAyHCrY7R8Oblk", { name: "a new name is good" })
        }
      >
        edit Test
      </Button>
      <Button variant="outlined" className="" onClick={getTestsQueryApi}>
        get Tests Query
      </Button>
      <Button
        variant="outlined"
        className=""
        onClick={() => getTestsByIdApi("4oKZubI3CdRGSvt7PckG")}
      >
        get Tests By Id
      </Button>
      <Button
        variant="outlined"
        className=""
        onClick={() => addTestApi(newTest)}
      >
        add test
      </Button>
      <Button
        variant="outlined"
        className=""
        onClick={() => deleteTestApi("747LODYvcIp3th66D0BL")}
      >
        delete test
      </Button>
      <Button
        variant="outlined"
        className=""
        onClick={() => deleteAllTestsApi()}
      >
        delete all tests
      </Button>
    </div>
  )
})

export default HomePage
