import React from 'react'
import ExpenseItem from './ExpenseItem'

const Table = ({expenses}) => {
  return (
    <div className='table'>
        <table>
            <thead>
                <tr>
                    {
                        ["Expense" , "Amount", "Data", " Budget",""].map((item, index) => 
                           (
                             <th key={index}>
                                {item}
                            </th>
                            
                            )
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    expenses.map((expense) => (
                        <tr key={expense.id}>
                            <ExpenseItem expense = {expense} />
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table