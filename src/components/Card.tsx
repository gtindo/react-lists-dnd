import * as React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { BoardContext } from './Board'

import { style } from './styles'

type CardPropsType = {
  id: string
  render: string
  listId: string
  children: React.ReactNode
}

const Card: React.FunctionComponent<CardPropsType> = (props) => {
  const boardContext = React.useContext(BoardContext)
  const [bottomMargin, setBottomMargin] = React.useState('5px')

  const [dragProps, drag] = useDrag({
    item: { id: props.id, value: props.render, type: 'card' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, drop] = useDrop({
    accept: ['card'],
    hover: (_item, monitor) => {
      // eslint-disable-next-line no-unused-expressions
      boardContext?.dispatch({
        type: 'hover',
        payload: { dataId: props.id, listId: props.listId }
      })
      setBottomMargin('30px')

      setTimeout(() => {
        if (!monitor.isOver()) setBottomMargin('5px')
      }, 100)
    }
  })

  return (
    <div
      ref={drag}
      style={{
        display: dragProps.isDragging ? 'none' : 'block',
        marginBottom: bottomMargin,
        ...style.card
      }}
    >
      <div ref={drop} style={{ width: '100%', height: '100%' }}>
        {props.children}
      </div>
    </div>
  )
}

export default Card
