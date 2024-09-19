import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import homeIcon from "./home.svg";

export default function ModeLayout() {
  const username = localStorage.getItem("username");
  const isLeader =
    localStorage.getItem("role") === "TEAM_LEADER" ? true : false;

  const inactiveLink = "mx-auto text-center w-96 bg-blue-200 hover:bg-blue-300 text-xl p-4 rounded-full text-blue-700 font-bold mb-5 drop-shadow-lg"
  const activeLink = "mx-auto text-center w-96 bg-blue-300 hover:bg-blue-300 text-xl p-4 rounded-full text-blue-700 font-bold mb-5 drop-shadow-lg"

  return (
    <div className="flex flex-row w-full h-full">
      <nav className="basis-1/4 h-full bg-gradient-to-t from-[#1815C7] to-blue-600 flex flex-col gap-y-10">
        <p className="mx-auto text-white text-2xl mt-10">Welcome {username}</p>
        <p className="mx-auto text-white text-2xl mb-10">
          {isLeader ? "Team Leader" : "Team Member"}
        </p>
        <NavLink
          className={({isActive}) => (isActive ? activeLink : inactiveLink)}
          to="create"
        >
          CREATE A TEAM
        </NavLink>
        {isLeader && (
          <NavLink
          className={({isActive}) => (isActive ? activeLink : inactiveLink)}
          to="manage"
          >
            MANAGE TEAM
          </NavLink>
        )}
        <NavLink type="button" className="mx-auto mt-auto mb-10 flex-col-reverse" to="">
          <img className="w-20" src={homeIcon} alt="Back home" />
        </NavLink>
      </nav>
      <div className="basis-3/4 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
