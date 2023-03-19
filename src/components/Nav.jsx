
// assets 
import { Form, NavLink } from "react-router-dom"
import logoMark from "../assets/logomark.svg" 

import { ArrowUpCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import { myDel } from "../helpers"

const Nav = ({userName}) => {

    

    return (
        <nav>
            <NavLink to="/" aria-label="Go to Home">
                <img src={logoMark} height={30} />
                <span>HomeBudget</span>
            </NavLink> 
            {
                userName && (
                    <Form 
                        method="post"
                        action="/logout"
                        onSubmit={(event) => {
                            if (!confirm("Delete user and all Data ?")) {
                                event.preventDefault()
                            }
                        }}
                    >

                    <button type="submit" className="btn btn--warning">
                    <span>Delete User</span>
                    <TrashIcon width={20}></TrashIcon>
                    </button>

                    </Form>
                )
            }

        </nav>
    )
}

export default Nav