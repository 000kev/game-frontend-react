import { Outlet } from "react-router-dom"

const Layout =() =>{
    return(
        <div className="bg-gradient-to-t from-[#1815C7] to-sky-400 h-screen">
            <Outlet/>
        </div>
    )
}

export default Layout;