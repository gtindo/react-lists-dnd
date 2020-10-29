import * as React from 'react'
import { Board, Item, DataSource } from 'react-lists-dnd'


export function Example() {
  const lists = [
    {
      listId: '1',
      title: 'List 1'
    },
    {
      listId: '2',
      title: 'List 2'
    },
    {
      listId: '3',
      title: 'List 3'
    }
  ]

  const initialData: DataSource[] = []

  for (let i = 0; i < 10; i++) {
    initialData.push({
      dataId: `${i}`,
      listId: '1',
      render: <Item> Item {i} </Item>
    })
  }

  // CallBack function called when an item is drop
  const onDataUpdate = (data: DataSource[]) => {
    console.log(data);
  }

  return (
    <>
      <Board
        lists={lists}
        dataSource={initialData}
        onDataUpdate={onDataUpdate}
      />
    </>
  )
}
