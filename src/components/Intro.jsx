import { UserPlusIcon } from "@heroicons/react/24/solid"
import { Form } from "react-router-dom"

// assets 
import illustration from "../assets/illustration.jpg"

const Intro = () =>{
    return (
        <div className="intro">
           <div>
            <h1>
                Take Control of <span className="accent"> Your Money</span>
            </h1>
            <p>
                Personal budgetting is the secret to financial freedom. Start your journey today!
            </p>

            <Form method="post">
                <input type="hidden" name="_action" value="newUser" />
                <input type="text" name="userName" required placeholder="what is your name ?" aria-label="Your Name"
               />

               <button type="submit" className="btn btn--dark">
                <span>Create Account</span>
                <UserPlusIcon width={20}/>
               </button>
            </Form>
           </div>
            <img src={illustration} alt="" />

        </div>
    )
}


export default Intro