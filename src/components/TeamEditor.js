import { redirect, useParams } from "react-router";
import TeamDetails from "./TeamDetails";
import TeamMembers from "./TeamMembers";
import PendingMembers from "./PendingMembers";

export default function TeamEditor() {
  const { teamname, maxMembers } = useParams();

  return (
    <div className="flex flex-col w-full h-1/3 items-center mx-auto text-white gap-y-20">
      <h1 className="text-2xl p-10">Edit Team</h1>
      <TeamDetails />
      <TeamMembers />
      <PendingMembers />
    </div>
  );
}

export async function EditorAction({request}) {
    const { 
      mode,
      oldTeamname, newTeamname, maxMembers, 
      username, teamname  } = Object.fromEntries(await request.formData())
    const token = sessionStorage.getItem("token")
    // console.log(Object.fromEntries(await request.formData()))
    const team = {
      teamName: newTeamname,
      maxMembers
    }
    try {
      if (mode === "details") {
        const response = await fetch(`http://localhost:7546/team/edit/${oldTeamname}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(team)
        });
        if (!response.ok)
          return { error: "Edit response failed!"}
        return redirect(`/navigation/manage/${newTeamname}`)
      } 
      
      else if (mode === "remove") {
        // console.log(teamname, mode, username)
        const response = await fetch(`http://localhost:7546/team/remove/${teamname}/${username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        if (!response.ok)
          return { error: "Remove response failed!"}
        return redirect(`/navigation/manage/${teamname}`)
      } 
      
      else if (mode === "accept") {
        // console.log(mode, username, teamname)
        const response = await fetch(`http://localhost:7546/team/request/accept/${teamname}/${username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        if (!response.ok)
          return { error: "Accept response failed!"}
        return redirect(`/navigation/manage/${teamname}`)
      }

      else {
        // console.log(mode, username, teamname)
        const response = await fetch(`http://localhost:7546/team/request/decline/${teamname}/${username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        if (!response.ok)
          return { error: "Decline response failed!"}
        return redirect(`/navigation/manage/${teamname}`)
      }
    } catch(err) {
      return {error: err}
    }

}
