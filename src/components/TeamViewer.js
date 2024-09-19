import { useLoaderData } from "react-router";
import TeamModal from "./TeamModal";
import { useSubmit } from "react-router-dom";
import { redirect } from "react-router";

export default function TeamViewer() {
  const loaderData = useLoaderData();
  const username = localStorage.getItem("username");
  const submit = useSubmit()

  const joinHandler = (event, teamname) => {
    event.preventDefault()
    let formData = new FormData()
    formData.append("teamname", teamname)
    submit(formData, { method: "post", action: "/navigation"})
  }

  return (
    <div className="flex flex-col w-full h-1/3 items-center mx-auto text-white">
      <h1 className="text-2xl p-10">Team Viewer</h1>
      <div className=" bg-blue-500/[.3] w-1/2 mx-auto rounded-3xl p-10">
        <TeamModal teams={loaderData} username={username} onJoin={joinHandler} />   
      </div>
    </div>
  );
}

export async function ViewerAction({request}) {
    const { teamname } = Object.fromEntries(await request.formData())
    const token = localStorage.getItem("token")

    try {
        const response = await fetch(`http://localhost:7546/team/request/${teamname}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) return { error: "Response not ok!"}
        return redirect("/navigation")
    } catch (err) {
        return {error: err}
    }
}

export async function ViewerLoader() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:7546/team/viewAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { error: "Yikes on bikes" };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return { error: "Uh oh." };
  }
}
