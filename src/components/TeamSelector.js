import { useLoaderData } from "react-router"
import SelectTeamModal from "./SelectTeamModal"

export default function TeamSelector() {
    const loaderData = useLoaderData()
    console.log(loaderData)

    return (
        <div className="flex flex-col w-full h-1/3 items-center mx-auto text-white">
      <h1 className="text-2xl p-10">Team Manager</h1>
      <div className=" bg-blue-500/[.3] w-1/2 mx-auto rounded-3xl p-10">
        <SelectTeamModal teams={loaderData} />
      </div>
    </div>
    )
}

export async function TeamLoader() {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:7546/team/viewOwned",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        )

        if (!response.ok) return {error: "Response not ok!"}
        const data = await response.json()
        return data
    } catch (err) {
        return { error: err }
    }
}