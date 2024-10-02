export default function SelectTeamModal({ teams, onDelete, onEdit }) {

  return (
    <ul className="w-full">
      {teams.map((team) => {
        console.log(team

        )
        return (
          <div
            key={team.teamName}
            className="flex flex-row gap-x-10 bg-blue-700/[.6] p-5 mb-3 rounded-3xl text-xl"
          >
            
            <p>Team {team.teamName}</p>
            <span className="ml-auto flex flex-row gap-x-5">
              <button onClick={() => onEdit(team.teamName)} 
                      className="bg-sky-200/[.6] px-5 py-1 text-md font-bold text-blue-600 rounded-2xl">
                EDIT
              </button>
              <button onClick={() => onDelete(team.teamName)} 
                      className="bg-red-200/[.6] px-5 py-1 text-md font-bold text-red-800/[.8] rounded-2xl">
                DELETE
              </button>
            </span>
          </div>
        );
      })}
    </ul>
  );
}
