import { db } from "@/firebase"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { Test } from "./interfaces"

export const getTests = async () => {
  // ref of the collection
  const colRef = collection(db, "tests")
  // snapshot of the docs
  try {
    const snapshot = await getDocs(colRef)
    // all the docs
    console.log({ snapshot })
    console.log("size : ", snapshot.size)
    console.log("is empty :", snapshot.empty)

    const docs = snapshot.docs
    //
    console.log({ docs })

    let tests: any = []
    docs.forEach((doc) => {
      // each doc contain method name data which return the data of the doc
      // and and id which is the id of the doc
      tests.push({ ...doc.data(), id: doc.id })
    })
    console.log({ tests })
  } catch (error) {
    console.log(error.message)
  }
}

export const getTestsSnap = async () => {
  // ref of the collection
  const colRef = collection(db, "tests")
  // snapshot of the docs
  try {
    const snapshot = await getDocs(colRef)
    // all the docs
    console.log({ snapshot })
    console.log("size : ", snapshot.size)
    console.log("is empty :", snapshot.empty)

    // each time there is a change in the collection of tests
    //  the snapshot callback function will invoked
    const unSubscribe: any = onSnapshot(colRef, (snapshot) => {
      console.log("there is a change in data items ")
      let tests: any = []
      snapshot.forEach((snapshotDoc) => {
        // each doc contain method name data which return the data of the doc
        // and and id which is the id of the doc
        tests.push({ ...snapshotDoc.data(), id: snapshotDoc.id })
      })
      console.log({ tests })
      return unSubscribe
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const addTest = async (test: Test) => {
  const colRef = collection(db, "tests")
  // add test do collection

  try {
    // const testWithDate = { ...test }
    // because of the function of serverTimestamp, it will take more time
    // and the getTestsSnap() function in useEffect will be invoked twice
    const testWithDate = { ...test, createdAt: serverTimestamp() }
    const docRef = await addDoc(colRef, testWithDate)
    console.log({ docRef })
  } catch (error) {
    console.log(error.message)
  }
}
export const deleteTest = async (testId: string) => {
  try {
    // get doc by its id
    const docRef = doc(db, "tests", testId)
    // delet the doc by dhe doc ref
    await deleteDoc(docRef)
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteAllTests = async () => {
  const colRef = collection(db, "tests")

  try {
    const querySnapshot = await getDocs(colRef)

    let deletePromises: any = []
    // you can use querySnapshot.docs or just querySnapshot
    // doc and docSnap both have the .id option
    // querySnapshot.docs.forEach((docItem) => {
    querySnapshot.forEach((docSnap) => {
      console.log("deleting doc with id " + docSnap.id, "and the doc is ")
      console.log(docSnap.data())
      const docRef = doc(db, "tests", docSnap.id)
      deletePromises.push(deleteDoc(docRef))
    })

    await Promise.all(deletePromises)
    console.log(`All documents in tests have been deleted`)
  } catch (error) {
    console.log(error.message)
  }
}

export const getSnapshotForDoc = (name: string) => {
  const colRef = collection(db, "tests")

  // const q = query(colRef, where("name", "==", name))

  // can order the docs according to a field in the doc
  // const q = query(colRef, where("name", "==", name), orderBy("name"))

  const q = query(colRef, where("count", "==", 2), orderBy("name"))
  //  each time there is a change in doc which comes from that query,
  // it will be watched in snapshot
  const unSubscribe: any = onSnapshot(q, (snapshot) => {
    console.log("doc with name of " + name + "has changed to ")
    let tests: any = []
    snapshot.forEach((docSnap) => {
      // each doc contain method name data which return the data of the doc
      // and and id which is the id of the doc
      tests.push({ ...docSnap.data(), id: docSnap.id })
    })
    console.log({ tests })
    return unSubscribe
  })
}

export const getTestsQuery = async () => {
  // ref of the collection
  const colRef = collection(db, "tests")
  try {
    // when using he orderBy function, you will have an error with a link
    // when you click it , you will create an index for each type of order
    // one for asc and for desc
    // snapshot of the docs
    // const q = query(colRef, where("count", "==", 2), orderBy("name", "desc"))
    // const q = query(colRef, where("count", "==", 2), orderBy("name", "asc"))
    // const q = query(
    //   colRef,
    //   where("count", "==", 2),
    //   where("name", "!=", "test1"),
    //   orderBy("name", "desc")
    //   )

    // by default its asc
    // and I dont need the where in the middle
    // const q = query(colRef, orderBy("createdAt"))
    const q = query(colRef, orderBy("createdAt", "desc"))

    const snapshot = await getDocs(q)

    let tests: any = []
    snapshot.forEach((snapDoc) => {
      // each doc contain method name data which return the data of the doc
      // and and id which is the id of the doc
      tests.push({ ...snapDoc.data(), id: snapDoc.id })
    })
    console.log({ tests })
  } catch (error) {
    console.log(error.message)
  }
}

export const getTestsById = async (id: string) => {
  // doc function return a docRef
  const docRef = doc(db, "tests", id)

  // get the doc from the getDoc function
  const docItem = await getDoc(docRef)

  const testItem = {
    ...docItem.data(),
    id: docItem.id,
  }
  console.log(testItem)
  // const doc = await getDoc(colRef)
}

export const getTestsByIdSnap = (id: string) => {
  // doc function return a docRef
  const docRef = doc(db, "tests", id)

  // in onSnapshot the first argument can be docRef, colRef or a query
  // will be fire each time  when that docRef is changed
  const unSubscribe = onSnapshot(docRef, (doc) => {
    console.log("on snap ", doc.id, doc.data())
  })
  return unSubscribe
}

export const editTest = async (id: string, data: any) => {
  const docRef = doc(db, "tests", id)

  // the data is an object that can contain part of the fields of test
  // its can contain all of the fields or just part of them
  updateDoc(docRef, data)
}
