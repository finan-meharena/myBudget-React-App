import { CurrencyDollarIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'

function AddExpenseForm({budgets}) {


    const fetcher = useFetcher()
    const formRef = useRef()
    const focusRef = useRef()
    const isSubmitting = fetcher.state === "submitting"

    useEffect(()=>{
        if(!isSubmitting){
            formRef.current.reset()
            formRef.current.focus()
        }

    }, [isSubmitting])
    

    
  return (
    <div className='form-wrapper'>
        <h2 className="h3">Add New <span className="accent">
        {budgets.length === 1 && `${budgets.map((bud) => bud.name)}`}
        </span> Expenses</h2>

        <fetcher.Form
             method='post' 
             className='grid-sm' 
             ref={formRef}
        >
            <div className="expense-input">
                <div className="grid-xm">
                    <label htmlFor="newExpense"> Expense Name </label>
                    <input 
                        type="text" 
                        name='newExpense'
                        // value="newExpense"
                        placeholder='e.g., coffee'
                        ref={focusRef}
                        required
                    />
                </div>

                <div className="grid-xm">
                    <label htmlFor="newExpenseAmount">Amount</label>
                    <input 
                        type="number"
                        step="0.01"
                        name='newExpenseAmount'
                        // value="newExpenseAmount"
                        placeholder='e.g., 3.50'
                        required
                    />
                </div>

                <div className="grid-xm" hidden={budgets.length === 1 }>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select 
                        name="newExpenseBudget" 
                        id="newExpenseBudget"
                    >
                        {
                            budgets.sort((a, b) => a.createdAt - b.createdAt).map((budget) => {
                                return (
                                    <option key={budget.id} value={budget.id}>
                                        {budget.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>

            <input type="hidden" name='_action' value="createExpense" />
            <button className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Adding Expense ...</span> : 
                        <>
                            <span>Add Expense </span>
                            <PlusCircleIcon width={20}/>
                        </>
                    }
                </button>

        </fetcher.Form>

    </div>
  )
}

export default AddExpenseForm
