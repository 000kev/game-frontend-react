import { useState } from "react"
import { Form, redirect, useActionData, useSubmit } from "react-router-dom"
import ModeButton from "./components/ModeButton"


export default function RegistrationPage() {
    const submit = useSubmit()
    const [mode, setMode] = useState('Login')
    const [error, setError] = useState("")
    
    const actionData = useActionData()

    const authHandler = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        // console.log(data)
        if ( data.username!== "" && data.password!=="" ) {
            submit(event.target)
        } 
        else if ( data.username === "" || data.password === "") {
            setError(`Please enter a ${data.username === "" ? "username" : ""}${data.password === "" ? "password" : ""}`)
        }
        else {
            setError("Please enter a username and password")
        }
    } 


  return (
    <Form method="post" action="/" onSubmit={authHandler} className="h-screen w-screen p-20">
        <input hidden name="mode" value={mode}  readOnly/>
        <div className="flex flex-col w-1/2 h-3/4 mx-auto rounded-sm items-center gap-y-20">
            <ModeButton key="mode-button" mode={mode} setMode={setMode} />
            <div>
                <div className="flex flex-col">
                    <p className="text-red-300 mx-auto">{error || (actionData && actionData.error && actionData.error) }</p>
                </div>
                <div className="flex flex-col w-96">
                    <input onChange={() => setError()} placeholder="Email:" id="username" type="email" name="username" className="bg-blue-200 text-blue-700 placeholder-blue-700 h-10 pl-5 rounded-md"></input>
                </div>
                <br/>
                <div className="flex flex-col mt-5">
                    <input onChange={() => setError()} placeholder="Password:" id="password" type="password" name="password" minLength="8" className="bg-blue-200 text-blue-700 placeholder-blue-700 h-10 pl-5 rounded-md"></input>
                </div>
            </div>
            <button type="submit" className="w-96 bg-blue-200 text-xl p-4 rounded-full text-blue-700 font-semibold mb-5 drop-shadow-lg">
                { mode === 'Login' ? "LOG IN TO ACCOUNT" : "REGISTER FOR ACCOUNT" } 
            </button>
        </div>
    </Form>
  )
}

export async function AuthAction({ request }) {
    const {username, password, mode} = Object.fromEntries(await request.formData());

    const user = {
      username,
      password,
    };
    if (mode === "Login") {
        try {
            const response = await fetch("http://localhost:7546/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
              });
              if (!response.ok) {
                console.log('False credentials!')
                return { error: "False credentials!"}
              } else {
                const data = await response.json();
                console.log(data)
                sessionStorage.setItem("username", data.username)
                sessionStorage.setItem("score", data.score)
                sessionStorage.setItem("token", data.token)
                console.log('Successfully logged in!')
                return redirect("/navigation")
              }
        } catch(err) {

        }
    } else {
        try {
            const response = await fetch("http://localhost:7546/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
              });
              if (!response.ok) {
                console.log('User already exists!')
                return { error: "User already exists!"}
              } else {
                const data = await response.json();
                sessionStorage.setItem("username", data.username);
                sessionStorage.setItem("score", data.score);
                sessionStorage.setItem("token", data.token);
                console.log('Successfully registered!')
                return redirect("/Navigation")
              }
        } catch(err) {

        }
    }
    
    return null;
  }