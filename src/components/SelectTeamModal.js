import { Form } from "react-router-dom";

export default function SelectTeamModal({ teams }) {
  return (
    <ul className="w-full">
      {teams.map((team) => {
        // const isMember = () => {
        //   return team.teamMembers.includes(username);
        // };
        // const isPending = () => {
        //   return team.teamRequests.includes(username);
        // };
        const btnClass = "bg-blue-600/[.6] px-5 py-1 text-md text-sky-400 rounded-2xl";
        const spanClass =
          "flex flex-row gap-x-10 bg-sky-400/[.6] p-5 mb-3 rounded-3xl text-xl";

        return (
          <Form
            method="post"
            onSubmit={(event) => console.log("Click")}
            action="/navigation"
            key={team.teamName}
            className={spanClass}
          >
            <p>Team {team.teamName}</p>
            <span className="ml-auto flex flex-row gap-x-5">
              <button className={btnClass}>
                EDIT
              </button>
              <button className={btnClass}>
                DELETE
              </button>
            </span>
          </Form>
        );
      })}
    </ul>
  );
}
