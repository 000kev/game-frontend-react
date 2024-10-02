import { Form } from "react-router-dom";
export default function TeamModal({ teams, username, onJoin }) {
  return (
    <ul className="w-full">
      {teams.map((team) => {
        const isMember = () => {
          return team.teamMembers.includes(username);
        };
        const isPending = () => {
          return team.teamRequests.includes(username);
        };
        const btnClass = isMember() ? "bg-gray-400/[.6] px-4 py-1 text-xl rounded-2xl"
            : isPending() ? "bg-yellow-200/[.6] px-4 py-1 text-xl rounded-2xl"
            : "bg-sky-400/[.6] px-4 py-1 text-xl rounded-2xl"
        const spanClass = isMember() ? "flex flex-row gap-x-10 bg-blue-600/[.7] p-5 mb-3 rounded-3xl text-xl order-first"
            : isPending() ? "flex flex-row gap-x-10 bg-blue-600/[.7] p-5 mb-3 rounded-3xl text-xl order-last"
            : "flex flex-row gap-x-10 bg-blue-600/[.7] p-5 mb-3 rounded-3xl text-xl" 

        return (
          <Form
            method="post"
            onSubmit={(event) => onJoin(event, team.teamName)}
            action="/navigation"
            key={team.teamName}
            className={spanClass}
          >
            <p>{team.teamName}</p>
            <span className="ml-auto flex flex-row gap-x-10">
              <p className={!isPending() ? "mr-9" : ""}>
                {team.currentMembers} / {team.maxMembers}
              </p>
              <button
                type="submit"
                disabled={isMember() || isPending()}
                className={btnClass}
              >
                {isPending() ? "Pending" : "Join" }
              </button>
            </span>
          </Form>
        );
      })}
    </ul>
  );
}
