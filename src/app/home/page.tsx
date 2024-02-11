"use client"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"

import { Timestamp } from "firebase/firestore"
import { Button } from "@mui/material"

import {
  addTest,
  deleteAllTests,
  deleteTest,
  editTest,
  getSnapshotForDoc,
  getTests,
  getTestsById,
  getTestsByIdSnap,
  getTestsQuery,
  getTestsSnap,
} from "@/api/firestore/test"
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

const newMessage = {
  userId: "1232",
  amount: 1,
  createdDate: Timestamp.now(),
}
const newLike = {
  userId: "pluyf1",
  likeUrl: "p903kslpp3l3/tinder/l3893789",
  createdDate: Timestamp.now(),
}
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
    <div>
      <div>test the data in firestroe </div>
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
