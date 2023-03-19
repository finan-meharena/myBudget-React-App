import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate, useRouteError } from "react-router-dom";


const Error = () => {

    const error = useRouteError()
    const navigate = useNavigate()
    return (
        <div className="error">
           <h1>Uh oh!, We've got a problem.</h1>
           <p>{error.message || error.status}</p>
           <div className="flex-md">
                <button onClick={() => {navigate(-1)}} className="btn btn--dark">
                    <ArrowUturnLeftIcon width={20}/>
                    <span>Go Back</span></button>   
                <Link className="btn btn--dark" to="/">
                    <HomeIcon width={20}/>
                    <span>Go Home</span>
                </Link>
           </div>
        </div>
    )
}

export default Error;

