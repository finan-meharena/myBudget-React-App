import { BanknotesIcon, TrashIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { Form, Link } from 'react-router-dom';
import { calculateSpentByBudget, fomratPercentage, formatCurrency } from '../helpers';

const BudgetItem = ({budget, showDelete = false}) => {

    const {id, name, amount , color} = budget;
    const spent = calculateSpentByBudget(id)

  return (

    <div className='budget' style={{"--accent" : color}}>
        <div className="progress-text">
            <h3> {name} </h3>
            <p> {formatCurrency(amount)} Budgeted </p>
        </div>
        <progress max={amount} value={spent}>
            {fomratPercentage(spent/amount)}
        </progress>

        <div className="progress-text">
            <small>{formatCurrency(spent)} spent</small>
            <small> {formatCurrency(amount - spent)} remaining</small>
        </div>

        {
            showDelete ? 
            (
                <Form method='post' action='delete'
                    onSubmit={(event) => {
                        if(!confirm("Are sure you wanna delete this budget ?")){
                            event.preventDefault()
                        }
                    }}
                    >
                    <button type='submit' className='btn'>
                        Delete Budget
                        <TrashIcon width={20} />

                    </button>

                    <input type="hidden" name='_action' value={budget.id} />
                </Form>
            )
            :
            (
                <div className="flex-sm">
                 <Link to={`budget/${name}`} className="btn">
                    <span>View Details</span>
                    <BanknotesIcon width={20} />
                </Link>
                </div>
            )
        }

    </div>
  )
}

export default BudgetItem