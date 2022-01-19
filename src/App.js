import React from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {addCustomerAction, removeCustomerAction} from "./store/customerReducer";
import {addCashAction, getCashAction} from "./store/cashReducer";
import {fetchCustomers} from "./asyncAction/customers";



function App() {
    const dispatch = useDispatch()
    const cash = useSelector(state => state.cash.cash)
    const customers = useSelector(state => state.customers.customers)

    const addCash = (cash) => {
        dispatch(addCashAction(cash))
    }

    const getCash = (cash) => {
        dispatch(getCashAction(cash))
    }

    const addCustomer = (name) => {
        const customer = {
            name,
            id: Date.now(),
        }
        dispatch(addCustomerAction(customer))
    }

    const removeCustomer = (customer) => {
        dispatch(removeCustomerAction(customer.id))
    }

    return (
        <div className={'app'}>
            <div className={'cash'}>{cash}</div>
            <div style={{display: 'flex'}}>
                <button onClick={() => addCash(Number(prompt()))}>Пополнить счет</button>
                <button onClick={() => getCash(Number(prompt()))}>Снять со счета</button>
            </div>
            <div>
                {customers.length > 0 ?
                    <div className={'cash'}>
                        {customers.map(customer =>
                            <div onClick={() => removeCustomer(customer)} className={'customer'}>{customer.name}</div>
                        )}
                    </div>
                    :
                    <div className={'cash'}>
                        Пользователи отсутствуют!
                    </div>
                }
                <button onClick={() => addCustomer(prompt())}>Добавить пользователя</button>
                <button onClick={() => dispatch(fetchCustomers())}>Получить пользователей</button>
            </div>
        </div>
    );
}

export default App;
