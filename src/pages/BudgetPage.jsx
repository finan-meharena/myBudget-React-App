import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import AddExpenseForm from '../components/AddExpenseForm'
import BudgetItem from '../components/BudgetItem'
import Table from '../components/Table'
import { createExpense, deleteItem, getAllMatchingItems } from '../helpers'


export async function budgetLoader({params}){
    const budget = await getAllMatchingItems({
        category : "budgets",
        key : "name",
        value : params.id
    })[0]

    const expenses = await getAllMatchingItems({
        category : "expenses",
        key : "budgetId",
        value : budget.id
    })

    if(!budget){
        throw new Error("The budget you'are trying to find doesn't exist")
    }

    return {budget, expenses}
}

// action 
export async function budgetPageAction({request}){
    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data)

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

const BudgetPage = () => {

    const {budget, expenses} = useLoaderData()
  return (
    <div className='grid-lg' style={{"--accent" : budget.color}}>
        <h1 className="h2">
            <span className="accent">{budget.name}</span> Overview
        </h1>

        <div className="flex-lg">
            <BudgetItem  budget={budget} showDelete={true}/>
            <AddExpenseForm budgets={[budget]} />
                       
        </div>

        {
            expenses && expenses.length > 0 && 
            (
                <div className="grid-md">
                    <h2><span className="accent">{budget.name}</span> Expenses</h2>
                    <Table expenses={expenses} />
                </div>
            )
        }
    </div>
  )
}

export default BudgetPage