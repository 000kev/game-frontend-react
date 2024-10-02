import { useState } from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";

export default function TeamDetails() {
  const [edit, setEdit] = useState(false);
  const submit = useSubmit();
  const loaderData = useLoaderData();

  return (
    <Form
      method="post"
      action={`/navigation/manage/${loaderData.teamName}`}
      onSubmit={(event) => {
        setEdit(false);
        event.preventDefault();
        const formData = new FormData(event.target)
        if (formData.get("newTeamname") !==null || formData.get("maxMembers") !== null)
            submit(event.target);
      }}
      className="bg-slate-100/[.1] w-1/2 mx-auto rounded-3xl p-6"
    >
      <h1 className="relative bottom-14 font-semibold text-xl text-blue-50">
        Team Details
      </h1>
      <input hidden name="mode" value="details" readOnly />
      <input hidden name="oldTeamname" value={loaderData.teamName} readOnly />
      <div className=" flex flex-row">
        <input
          id="teamname"
          name="newTeamname"
          placeholder={loaderData.teamName}
          className="bg-blue-300/[.6] w-full h-10 rounded-3xl text-blue-700 placeholder-blue-700 pl-28"
          type="text"
          disabled={!edit}
        />

        <label className="absolute mt-2 ml-4 text-blue-700 font-medium">
          Team Name:
        </label>
      </div>

      <div className="flex flex-row-reverse">
        <button
          type="button"
          onClick={() => setEdit(true)}
          className={`text-blue-700 font-semibold flex-row-reverse px-10 h-10 rounded-3xl relative bottom-10 ${
            edit ? "bg-slate-300/[.5]" : "bg-blue-200"
          }`}
        >
          EDIT
        </button>
      </div>

      <div className=" flex flex-row">
        <input
          id="maxMembers"
          name="maxMembers"
          placeholder={loaderData.maxMembers}
          className="bg-blue-300/[.6] w-1/2 h-10 rounded-3xl text-blue-700 placeholder-blue-700 pl-44"
          type="number"
          disabled={!edit}
          min={10}
        />

        <label className="absolute mt-2 ml-4 text-blue-700 font-medium">
          Maximum Members:
        </label>
      </div>

      <div className="flex flex-row-reverse">
        <button
          type="submit"
          className="text-blue-700 font-semibold flex-row-reverse bg-blue-200 px-10 h-10 rounded-3xl relative bottom-10"
        >
          SAVE
        </button>
      </div>
    </Form>
  );
}

export async function DetailsLoader({ params }) {
  const teamname = params.teamname;
  const token = sessionStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:7546/team/view/${teamname}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) return { error: "Response not ok!" };
    const data = await response.json();
    return data;
  } catch (err) {
    return { error: err };
  }
}
