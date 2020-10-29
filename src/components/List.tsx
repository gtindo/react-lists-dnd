import * as React from 'react'
import { useDrop } from 'react-dnd'
import Card from './Card'
import { BoardContext } from './Board'

import { style } from './styles'

type ListPropsType = {
  id: string
  title: string
  items: any[]
}

const List: React.FunctionComponent<ListPropsType> = (props) => {
  const boardContext = React.useContext(BoardContext)

  const [, drop] = useDrop({
    accept: ['card'],
    drop: (_item, monitor) => {
      const receivedItem = monitor.getItem()
      // eslint-disable-next-line no-unused-expressions
      boardContext?.dispatch({
        type: 'drop',
        payload: {
          oldListId: receivedItem.listId,
          newListId: props.id,
          dataId: receivedItem.id
        }
      })
    }
  })

  return (
    <div ref={drop} style={style.list}>
      <h1 style={style.title}>{props.title}</h1>
      {props.items.map((value) => (
        <Card
          id={value.dataId}
          listId={value.listId}
          key={value.dataId}
          render={value.render}
        >
          {value.render}
        </Card>
      ))}
    </div>
  )
}

export default List
