import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import Table from '../components/Table'
import { deleteItem, fetchData } from '../helpers'


// loader 
export function expensesLoader(){
    const expenses = fetchData("expenses")
    return {expenses}
}


export async function expensePageAction({request}){

    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data);

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


   




const ExpensesPage = () => {

    const {expenses} = useLoaderData()

  return (
    <div className='grid-lg'>
        <h1>All Expenses</h1>
        {
            expenses && expenses.length > 0 ? (
                <div className="grid-md">
                    <h2>Recent Expenses <small>({expenses.length})</small></h2>
                    <Table expenses={expenses} />
                </div>
            ) : <p>No Expenses to show here</p>
        }
    </div>
  )
}

export default ExpensesPage