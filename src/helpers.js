
export const waait = () => new Promise( res => setTimeout(res , Math.random() * 800))

const generateRandomColor = () => {
    const existingBudgetsLength = fetchData("budgets")?.length ?? 0;

    return `${existingBudgetsLength * 34} 65% 50%`
}

// local storage

import { json } from "react-router-dom"

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}


export const createBudget = ({name, amount}) => {
    const newItem = {
        id : crypto.randomUUID(),
        name : name, 
        createdAt : Date.now(),
        amount : +amount,
        color : generateRandomColor()
        
    }

    const existingBudgets = fetchData("budgets") ?? []

    return localStorage.setItem("budgets" , JSON.stringify([...existingBudgets, newItem]))
}


export function myDel(){
    
    return localStorage.removeItem("budgets")
}


export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];

    return data.filter((item) =>item[key] === value)
}


export const createExpense= ({name, amount, budgetId}) => {

    const newItem = {
        id : crypto.randomUUID(),
        name : name, 
        createdAt : Date.now(),
        amount : +amount,
        color : generateRandomColor(),
        budgetId: budgetId, 
        
    }


    const existingExpenses = fetchData("expenses") ?? []
    // const newExpenseHolder = [...existingExpenses, newItem]
    // console.log("New one : " , newExpenseHolder)

    return localStorage.setItem("expenses" , JSON.stringify([...existingExpenses, newItem]))


}

export const deleteItem = ({key, id}) =>{
    const existingData = fetchData(key)

    if(id){
        const newData = existingData.filter(item => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData))
    }

    return localStorage.removeItem(key)
}


// fomratting 

export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style : "currency", 
        currency : "USD"
    })
}

export const formatDateToLocaleString = (epoch) => 
    new Date(epoch).toLocaleDateString()



export const fomratPercentage = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "percent", 
        minimumFractionDigits : 0
    })
}

// totoal spent by budget 

export const calculateSpentByBudget = (id) => {
    const expenes = fetchData("expenses") ?? [];

  
    let budgeSpent = 0;

    for (const exp of expenes){
        if(exp.budgetId === id){
            budgeSpent+=exp.amount
        }   
    }


    // const budgeSpent = expenes.reduce((acc, expense) => {
    //     // check if expense id matches the id passed in, 

    //     if(expense.budgetId !== budgetId) return acc 

    //     // add the current amount to my total 

    //     return acc += expense.amount
    // }, 0)

    return budgeSpent;
}
