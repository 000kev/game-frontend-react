import { redirect, useLoaderData } from "react-router";
import SelectTeamModal from "./SelectTeamModal";
import { useRef, useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import { useSubmit } from "react-router-dom";

export default function TeamSelector() {
  const loaderData = useLoaderData()
  const ref = useRef()
  const submit = useSubmit()
  const [teamname, setTeamname] = useState()

  const deleteHandler = () => {
    ref.current.close()
    submit( {teamname, mode: "delete"}, {method: "post", action: "/navigation/manage"})
  };

  return (
    <div className="flex flex-col w-full h-1/3 items-center mx-auto text-white">
      <ConfirmDelete
        onYes={deleteHandler}
        onNo={() => ref.current.close()}
        ref={ref}
      />
      <h1 className="text-2xl p-10">Team Manager</h1>
      <div className=" bg-blue-500/[.3] w-1/2 mx-auto rounded-3xl p-10 text-center">
        {
            loaderData.length === 0 ? <p className="text-xl">You currently do not manage any teams!</p>
            : <SelectTeamModal
                teams={loaderData}
                onEdit={(teamname) => { 
                    submit( {teamname, mode: "edit"}, {method: "post", action: "/navigation/manage"})
                }}
                onDelete={(teamname) => {
                ref.current.showModal()
                setTeamname(teamname)
                }}
            />
        }
      </div>
    </div>
  );
}

export async function TeamLoader() {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch("http://localhost:7546/team/viewOwned", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return { error: "Response not ok!" };
    const data = await response.json();
    return data;
  } catch (err) {
    return { error: err };
  }
}

export async function TeamAction({ request }) {
  const { teamname, mode } = Object.fromEntries(await request.formData());
  const token = sessionStorage.getItem("token");
  console.log(teamname, mode)

  try {
    if (mode === "delete") {
      const response = await fetch(
        `http://localhost:7546/team/delete/${teamname}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) return { error: "Response not ok!" };
      return redirect("/navigation/manage");
    }
    else {
        return redirect(`/navigation/manage/${teamname}`)
    }
    
  } catch (err) {
    return { error: err };
  }
}
