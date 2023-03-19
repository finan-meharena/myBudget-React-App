import { redirect, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";

function deleteBudget({params}){



    const targetBudget = getAllMatchingItems({
        category : "budgets",
        key : "name",
        value : params.id
    })[0]

    console.log(targetBudget)

    const associatedExpenes = getAllMatchingItems({
        category : "expenses",
        key : "budgetId",
        value : targetBudget.id

    })

    try {
        deleteItem({
            key : "budgets",
            id : targetBudget.id
        })


        associatedExpenes.forEach((expense) => {
            deleteItem({
                key : "expenses",
                id : expense.id
            })
        })
    } catch(e){
        throw new Error("There was a problem deleting your budget")
    }

   return redirect("/") 

}

export default deleteBudget;
