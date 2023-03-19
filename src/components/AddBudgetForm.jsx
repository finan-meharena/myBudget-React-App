import { CurrencyDollarIcon } from "@heroicons/react/24/solid"
import { useEffect, useRef } from "react"
import { Form, useFetcher } from "react-router-dom"


const AddBudgetForm = () => {

   const fetcher = useFetcher()
   const isSubmitting = fetcher.state === "submitting"

   const formRef = useRef()
   const focusRef = useRef()
   useEffect(() => {
    if (!isSubmitting){
        formRef.current.reset()
        focusRef.current.focus()
    }
   }, [isSubmitting])

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Create Budget
            </h2>
            <fetcher.Form 
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="grid-xs">
                    <input type="hidden" value="newBudget" name="_action" />
                    <label htmlFor="newBudget">Budgeet Name</label>
                    <input type="text" name="newBudget" id="newBudget"
                    placeholder="e.g., Groceries" 
                    required
                    ref={focusRef} />
                </div>

                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input
                         type="number"
                         step="0.01"
                         name="newBudgetAmount"
                         id="newBudgeetAmount"
                         placeholder="e.g., $350"
                         required
                         inputMode="decimal"
                    />
                </div>

                <button className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Creating Budget ...</span> : 
                        <>
                            <span>Create Budgtet</span>
                            <CurrencyDollarIcon width={20}/>
                        </>
                    }
                </button>

            </fetcher.Form>
        </div>
    )
}

export default AddBudgetForm