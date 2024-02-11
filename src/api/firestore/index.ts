import {
  addTest as addTestApi,
  deleteAllTests as deleteAllTestsApi,
  deleteTest as deleteTestApi,
  editTest as editTestApi,
  getSnapshotForDoc as getSnapshotForDocApi,
  getTests as getTestsApi,
  getTestsById as getTestsByIdApi,
  getTestsByIdSnap as getTestsByIdSnapApi,
  getTestsQuery as getTestsQueryApi,
  getTestsSnap as getTestsSnapApi,
} from "./test"
import { addUser as addUserApi } from "./user/addUser"

export {
  addUserApi,
  getTestsApi,
  getTestsSnapApi,
  addTestApi,
  deleteTestApi,
  deleteAllTestsApi,
  getSnapshotForDocApi,
  getTestsQueryApi,
  getTestsByIdApi,
  getTestsByIdSnapApi,
  editTestApi,
}
