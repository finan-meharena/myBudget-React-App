import { TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link, useFetcher } from 'react-router-dom'
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from '../helpers'

const ExpenseItemm = ({expense}) => {

  const budget = getAllMatchingItems({
    category : "budgets", 
    key : "id", 
    value : expense.budgetId
  })[0]



  const fether = useFetcher()

  return (
    <>
       <td>
       {expense.name}
       </td>
       <td>
       {formatCurrency(expense.amount)}
       </td>
       <td>
       {formatDateToLocaleString(expense.createdAt)}
       </td>
       <td>
          <Link
              to={`budget/${budget.name}`}
              style={{
                "--accent" : budget.color
              }}>
               {budget.name}
          </Link>
       </td>
       <td>
            <fether.Form method='post'>
              <input type="hidden" name='_action' value="deleteExpense" />
              <input type="hidden" name='expenseId' value={expense.id} />
              <button type='submit' className='btn btn--warning'>
                <TrashIcon width={20} />
              </button>
            </fether.Form>
       </td>

    </>
  )
}

export default ExpenseItemm