import { useState } from "react"
import LoginComponent from "@/components/Login"

export default function Login(){
    const [loggedIn, setloggedIn] = useState(false)

  function callbackFunction(childData: boolean) {
    setloggedIn(childData)
  }
    return <LoginComponent parentCallback={callbackFunction} />
}