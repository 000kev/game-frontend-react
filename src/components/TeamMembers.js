import { Form, useLoaderData, useSubmit } from "react-router-dom";

export default function TeamMembers() {
 
  const submit = useSubmit();
  const loaderData = useLoaderData();
  const loginUser = sessionStorage.getItem("username");

  const removeHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, teamname, mode } = Object.fromEntries(formData.entries())
    submit(
      { username, teamname, mode },
      { method: "post", action: `/navigation/manage/${loaderData.teamName}` }
    );
  };

  return (
    <Form
      method="post"
      onSubmit={removeHandler}
      className="bg-slate-100/[.1] w-1/2 mx-auto rounded-3xl p-6"
    >
      <h1 className="relative bottom-14 font-semibold text-lg text-blue-50">
        Team Members {loaderData.currentMembers} / {loaderData.maxMembers}
      </h1>
      <ul className="relative bottom-4 flex flex-col gap-y-5">
        {loaderData.teamMembers.map((member) => {
          return (
            member && (
              <li
                key={member}
                className="bg-blue-700/[.2] p-3 rounded-3xl shadow-lg flex flex-row"
              >
                <p className="pl-10 font-medium basis-3/4 pt-2">{member}</p>
                <input name="username" hidden readOnly value={member} />
                <input
                  name="teamname"
                  hidden
                  readOnly
                  value={loaderData.teamName}
                />
                <input name="mode" hidden readOnly value="remove" />
                { loginUser !== member && (
                  <button
                    type="submit"
                    className="bg-red-200/[.6] rounded-3xl h-10 text-red-800/[.8] font-semibold basis-1/4"
                  >
                    REMOVE
                  </button>
                )}
              </li>
            )
          );
        })}
      </ul>
    </Form>
  );
}
