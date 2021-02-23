import React, { useContext, useState } from 'react'
import { HomeContext } from './index.js'
function HomeChildren() {
    const { name, count, setCount, state, dispatch } = useContext(HomeContext)
    const [num, setNum] = useState(0)
    return (
        <div>
            <p>===============HomeChildren===============</p>
            <p>子组件num是{num}<button onClick={() => setNum(num + 1)}>num+1</button></p>
            父组件是{name},count是{count}<button onClick={() => setCount(count + 1)}>count+1</button>
            <p>父组件reducer</p>
            {state.name}===={state.zhName}===={state.count}
            <button onClick={() => dispatch({ type: 'name', data: 'HOME' })}>修改reducer name</button>
            <button onClick={() => dispatch({ type: 'count', data: 1 })}>修改reducer count</button>
        </div>
    )
}
export default HomeChildren