import React, { useContext } from "react"
import { UserContext } from "../../../.."

function UpdatePasswordForm() {
  const { authUser } = useContext(UserContext)
  console.log(authUser)
  return <div>UpdatePasswordForm</div>
}

export default UpdatePasswordForm
