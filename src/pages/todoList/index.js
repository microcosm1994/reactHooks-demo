import { Button, Layout, Checkbox, Spin, Popover, Input, Tooltip } from 'antd'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import { useState, useEffect, useContext, useRef } from 'react'
import './toto.css'

const { Header, Footer, Content } = Layout;
function TodoList() {
    const [list, setList] = useState([]) // 代办
    const [visible, setVisible] = useState(false) // 输入框显示/隐藏
    const [editId, setEditId] = useState(0) // 编辑状态
    const todoInput = useRef(null) // 输入框
    const todoEditInput = useRef(null) // 编辑框
    const todo = useContext(TodoList)
    useEffect(() => {
        getTodoList()
    }, [])
    // 获取今日待办事项
    const getTodoList = () => {
        let list = [
            {
                id: "1",
                title: "aaaa",
                status: 0
            },
            {
                id: "2",
                title: "aaaa",
                status: 1
            }
        ]
        setTimeout(() => {
            setList(list)
        }, 2000)
    }
    // 打开新建窗口
    const open = () => {
        setVisible(!visible)
        setTimeout(() => {
            if (todoInput.current) todoInput.current.focus()
        })
    }
    // 添加待办事项
    const addTodo = (e) => {
        const val = todoInput.current.state.value
        switch (e.keyCode) {
            case 13:
                if (val) {
                    setList([
                        {
                            id: list.length + 1,
                            title: val,
                            status: 0
                        },
                        ...list,
                    ])
                    todoInput.current.state.value = ""
                }
                setVisible(false)
                break
            default:
                break
        }
    }

    // 打开编辑弹框
    const openEdit = (data) => {
        editId === data.id ? setEditId(0) : setEditId(data.id)
        setTimeout(() => {
            if (todoEditInput.current) todoEditInput.current.focus()
        })
    }
    // 编辑待办事项
    const editTodo = (e) => {
        const val = todoEditInput.current.state.value
        switch (e.keyCode) {
            case 13:
                if (val) {
                    const data = list.map((item) => {
                        if (item.id === editId) {
                            return {
                                ...item,
                                title: val
                            }
                        } else {
                            return item
                        }
                    })
                    setList(data)
                    setEditId(0)
                }
                setVisible(false)
                break
            default:
                break
        }
    }
    // 监听checkbox选中
    const onChange = (e, index) => {
        // 如果当前待办事项正在编辑，先关闭编辑状态
        if (list[index].id === editId) setEditId(0)
        let data = {
            ...list[index],
            status: list[index].status === 1 ? 0 : 1
        }
        list.splice(index, 1);
        if (data.status) {
            setList([...list, data])
        } else {
            setList([data, ...list])
        }

    }
    // 渲染loading
    const Loading = () => {
        return (<div className={'loading'}>
            <Spin size="small" tip="获取待办事项" />
        </div>)
    }
    // 渲染列表
    const lsitItems = list.map((item, index) => {
        // 内容
        const content = item.status === 1 ? <s>{item.title}</s> : item.title
        // 编辑框
        const editContent = <Tooltip defaultVisible={true} placement="top" title={'回车键保存'}>
            <Input style={{ width: '80%' }} ref={todoEditInput} size="small" defaultValue={item.title} onKeyUp={editTodo} />
        </Tooltip>
        // 编辑按钮
        const editBtn = item.status === 1 ? '' : (<div className={'edit'}> <Button size="small" type="text" icon={item.id === editId ? <CloseOutlined /> : <EditOutlined />} onClick={() => openEdit(item)}></Button></div>)
        return (
            <div className={'item'} key={item.id}>
                <Checkbox checked={item.status === 1} onChange={(e) => onChange(e, index)}>{item.id === editId ? editContent : content}</Checkbox>
                {editBtn}
            </div>
        )
    })
    // 渲染输入框（添加待办事项）
    const TodoValue = () => {
        return (
            <div>
                <div>
                    <Input ref={todoInput} size="small" placeholder="请输入新的待办事项" onKeyUp={addTodo} />
                </div>
                <p style={{ fontSize: '10px', color: '#1485d5' }}>按下回车键“Enter”添加</p>
            </div>
        )
    }
    // 渲染
    return (
        <div className={'todo'}>
            <Layout>
                <Header>待办事项</Header>
                <Content>
                    <div className={'container'}>
                        {list.length > 0 ? lsitItems : Loading()}
                    </div>
                </Content>
                <Footer>
                    <div className={'addBtn'}>
                        <Popover
                            title="添加新的待办事项"
                            content={TodoValue}
                            trigger="click"
                            visible={visible}
                        >
                            <Button size="middle" shape='circle' type="primary" onClick={open}>+</Button>
                        </Popover>
                    </div>
                </Footer>
            </Layout>
        </div>
    );
}
export default TodoList