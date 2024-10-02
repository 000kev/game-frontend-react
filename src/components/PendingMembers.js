import { Form, useLoaderData, useSubmit } from "react-router-dom";

export default function PendingMembers() {
  const submit = useSubmit();
  const loaderData = useLoaderData();
//   console.log(loaderData);

  const acceptHandler = (member) => {
    submit(
        { teamname: loaderData.teamName, username: member, mode: "accept" },
        { method: "post", action: `/navigation/manage/${loaderData.teamName}`}
    )
  };
  const removeHandler = (member) => {
    submit(
        { teamname: loaderData.teamName, username: member, mode: "decline" },
        { method: "post", action: `/navigation/manage/${loaderData.teamName}`}
    )
  };

  return (
    <Form
      method="post"
      onSubmit={() => console.log("submit")}
      className="bg-slate-100/[.1] w-1/2 mx-auto rounded-3xl p-6"
    >
      <h1 className="relative bottom-14 font-semibold text-lg text-blue-50">
        Pending Requests
      </h1>
      <ul className="relative bottom-4">
        {
          loaderData.teamRequests.length === 0 ?
          <p className="bg-blue-700/[.2] pl-14 py-4 rounded-3xl shadow-lg flex flex-row">No pending requests</p> :
          loaderData.teamRequests.map((member) => {
            return (
              member && (
                <li
                  key={member}
                  className="bg-blue-700/[.2] p-3 rounded-3xl shadow-lg flex flex-row"
                >
                  <p className="pl-10 pt-2 font-medium basis-3/4">{member}</p>
                  <div className="basis-1/4 flex flex-row gap-x-2">
                    <button
                      type="button"
                      diabled={(loaderData.currentMembers < loaderData.maxMembers).toString()}
                      onClick={() => acceptHandler(member)}
                      className="text-blue-700 font-semibold flex-row-reverse bg-blue-200 px-8 h-10 rounded-3xl"
                    >
                      ACCEPT
                    </button>
                    <button
                      type="button"
                      onClick={() => removeHandler(member)}
                      className="bg-red-200/[.6] rounded-3xl px-8 h-10 text-red-800/[.8] font-semibold"
                    >
                      DECLINE
                    </button>
                  </div>
                </li>
              )
            );
          })
        }
      </ul>
    </Form>
  );
}
