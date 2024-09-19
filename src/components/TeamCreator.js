import { Form, redirect, useActionData, useSubmit } from "react-router-dom"

export default function TeamCreationPage() {
  const submit = useSubmit()
  const actionData = useActionData()

  console.log('Action Data:', actionData)

  const createHandler = (event) => {
    event.preventDefault()
    submit(event.target)
  }

  return (
    <Form method="post" action="/navigation/create" onSubmit={createHandler} className="flex flex-col w-full h-1/3 items-center mx-auto">
      <h1 className="text-2xl text-white p-10">Team Creator</h1>
      <div className=" bg-blue-500/[.3] w-1/2 mx-auto rounded-3xl p-10">
        <div className="flex flex-col w-96 gap-y-10 mx-auto">
          <input
            name="teamName"
            placeholder="Team Name:"
            className="bg-blue-200 text-blue-700 placeholder-blue-700 h-10 pl-5 rounded-md"
          ></input>
          <input
            name="maxMembers"
            placeholder="Maximum Nembers:"
            className="bg-blue-200 text-blue-700 placeholder-blue-700 h-10 pl-5 rounded-md"
          ></input>
          <button type="submit" className="mx-auto w-96 bg-blue-200 hover:bg-blue-300 text-xl p-4 rounded-full text-blue-700 font-bold mb-5 drop-shadow-lg">
            CREATE
          </button>
        </div>
      </div>
    </Form>
  );
}

export async function CreatorAction({ request }) {
  const { teamName, maxMembers } = Object.fromEntries(await request.formData());

  const team = {
    teamName,
    maxMembers,
  };
  const token = localStorage.getItem("token");
  localStorage.setItem("teamName", teamName)
  
  try {
    const response = await fetch("http://localhost:7546/team/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(team),
    })

    if (!response.ok) {
      return { error: "Somehing bad happened here..." }
    }

    const data = await response.json()
    console.log(data)
    localStorage.setItem("role", "TEAM_LEADER")
    return redirect('/navigation')

  } catch (err) {
    console.log("Error!", err)
    return {error: "You already own a team!"}
  }
}
