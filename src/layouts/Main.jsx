
// rrd imports
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"

//helper functions
import { fetchData } from "../helpers"

// assets 

import wave from "../assets/wave.svg"

// components
import Nav from "../components/Nav"


// loader 
export function mainLoader(){
    const userName = fetchData("userName")

    return {userName}
}

const Main = () => {

    const {userName} = useLoaderData()

    return (
        
        <div className="layout">
            <Nav userName= {userName}/>
            <main>
                <Outlet></Outlet>
            </main>
            <img src={wave}  />
            
        </div>
    )
}

export default Main