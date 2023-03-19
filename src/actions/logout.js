import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem } from "../helpers";

export async function logoutAction(){
    // delete use
    deleteItem({key:"userName"})
    deleteItem({key:"expenses"})
    deleteItem({key:"budgets"})
    toast.success("You've deleted your account!")

    // redirect 
    return redirect("/")
}