import React, { useState, useEffect, useReducer } from 'react'
import HomeChildren from './homeChildren'
import HomeChildren1 from './homeChildren1'
export const HomeContext = React.createContext({})
const initState = {
    name: 'Home',
    zhName: '父组件',
    count: 0
}
function reducer(state, action) {
    switch (action.type) {
        case 'name':
            return {
                ...state,
                name: action.data
            }
        case 'count':
            return {
                ...state,
                count: state.count + action.data
            }
        default:
            throw new Error()
    }
}
function Home() {
    const [count, setCount] = useState(0)
    const [state, dispatch] = useReducer(reducer, initState)
    const set = () => {
        setCount(count + 1)
        console.log(`count上次值为${count}`)
    }

    useEffect(() => {
        console.log('-------------------------')
        console.log(count)
        return () => {
            console.log('clear')
        }
    }, [])

    return (
        <HomeContext.Provider value={{ name: 'Home', count, setCount, state, dispatch }}>
            <div className="Home">
                <p>{count}</p>
                <button onClick={set}>+</button>
            </div>
            <p>{state.name}====={state.zhName}===={state.count}</p>
            <HomeChildren />
            <HomeChildren1 />
        </HomeContext.Provider>
    );
}

export default Home
