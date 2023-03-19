
// rrd imports
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AddBudgetForm from "../components/AddBudgetForm"
import AddExpenseForm from "../components/AddExpenseForm"
import BudgetItem from "../components/BudgetItem"
import Intro from "../components/Intro"
import Table from "../components/Table"

//helper functions
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers"

// loader 
export function dashboardLoader(){
    const userName = fetchData("userName")
    const budgets = fetchData("budgets")
    const expenses = fetchData("expenses")

   
    return {userName, budgets, expenses}
}


// action 
export async function dashboardAction({request}){
    await waait()
    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data)
    console.log(_action)
    const userName = data.get("userName")

    if (_action === "newUser"){
            try{
        localStorage.setItem("userName", JSON.stringify(values.userName))
        return toast.success(`Welcome , ${values.userName}!`)

    } catch(error){
        throw new Error("There was a problem creating your account")
    }

    }

    if (_action === "newBudget"){

        try{
            // create budgeet
            createBudget({
                name : values.newBudget,
                amount : values.newBudgetAmount
            })

            return toast.success("budget added")
        } catch (error){
            throw new Error("There was a problem creating your budget")
        }
       
    }

    if (_action === "createExpense"){

        try{
            // create an expense 
            createExpense({
                name : values.newExpense,
                amount : values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })

            return toast.success(`Expense ${values.newExpense} Added`)
        } catch (error){
            throw new Error("There was a problem Adding your Expense")
        }
       
    }

    if (_action === "deleteExpense"){

        try{

            // create an expense 
            deleteItem({
                key : "expenses", 
                id : values.expenseId
            })
    
            return toast.success(`Expense Deleted`)
        } catch (error){
            throw new Error("There was a problem Deleting your Expense")
        }
       
    }
    
}

const Dashboard = () => {

    const {userName, budgets, expenses} = useLoaderData()

    return (
        <>
           { userName ? (
            <div className="dashboard">
                <h1>Welcome Back, <span className="accent">{userName}</span></h1>
                <div className="grid-sm">
                    { 
                        budgets && budgets.length > 0 ?
                        (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm/>
                                    <AddExpenseForm budgets={budgets}/>
                                </div>
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {
                                        budgets.map((budget) => {
                                            return (
                                                <BudgetItem key={budget.id} budget={budget} />
                                            )
                                        })
                                    }
                                </div>
                                    {
                                        expenses && expenses.length > 0 &&
                                        (
                                            <div className="grid-md">
                                                <h2>Recent Expenses</h2>
                                                <Table expenses = {
                                                    expenses.sort((a,b) => b.createdAt - a.createdAt).slice(0,8)
                                                } />

                                                {
                                                    expenses.length > 8 && 
                                                    (
                                                        <Link to="expenses"
                                                                className="btn btn--dark">
                                                            View All Expenses
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                            </div>
                        ) 
                        : (
                            <div className="grid-sm">
                                <p>Personal budgetting is the secret to financial freedom</p>
                                <p>Create a budget to get started</p>      
                                <AddBudgetForm/>
                            </div>
                        )

                    
                    }
                </div>
            </div>
           ) : <Intro></Intro>}
        </>
    )
}

export default Dashboard