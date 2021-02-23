import { useContext, useState } from 'react'
import { HomeContext } from './index.js'
function HomeChildren1() {
    const { name, count } = useContext(HomeContext)
    const [num, setNum] = useState(0)
    return (
        <div>
            <p>===============HomeChildren1===============</p>
            <p>子组件num是{num}<button onClick={() => setNum(num + 1)}>num+1</button></p>
            父组件是{name},count是{count}
        </div>
    )
}
export default HomeChildren1