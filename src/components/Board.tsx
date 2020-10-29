/* eslint-disable no-unused-vars,no-case-declarations */
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DataSource, HoverItem, DropType, ListData } from './types'

import List from './List'

// Initial state for reducer
const dataInit: DataSource[] = []
const hoverItem: HoverItem = { listId: '', dataId: '' }

const initialState = {
  hoverItem,
  data: dataInit,
  onDataUpdate: (data: DataSource[]) => {
    console.log(data)
  }
}

// Board context contains state of the board and dispatch method for actions
export type BoardContextType = {
  state: typeof initialState
  dispatch: React.Dispatch<ACTIONTYPE>
}

// We define the Board Context
export const BoardContext = React.createContext<BoardContextType | null>(null)

// We define action that can be dispatched
type ACTIONTYPE =
  | { type: 'update'; payload: DataSource[] }
  | { type: 'hover'; payload: HoverItem }
  | { type: 'drop'; payload: DropType }

/**
 * Our Reducer function
 * @param state
 * @param action
 */
function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'hover':
      return { ...state, hoverItem: action.payload }

    case 'drop':
      const selectedItemIndex = state.data.findIndex(
        (val) => val.dataId === action.payload.dataId
      )
      const selectedItem = state.data[selectedItemIndex]
      selectedItem.listId = action.payload.newListId
      state.data.splice(selectedItemIndex, 1)

      const hoverItemIdex = state.data.findIndex(
        (val) => val.dataId === state.hoverItem.dataId
      )
      const index = hoverItemIdex + 1

      if (state.hoverItem.listId === action.payload.newListId) {
        state.data.splice(index, 0, selectedItem)
      } else {
        state.data.push(selectedItem)
      }

      state.onDataUpdate(state.data)
      return {
        ...state,
        data: [...state.data],
        hoverItem: { listId: '', dataId: '' }
      }

    case 'update':
      return { ...state, data: action.payload }
    default:
      return state
  }
}

export type BoardProps = {
  className?: string
  style?: any
  lists: ListData[]
  onDataUpdate: (data: DataSource[]) => void
  dataSource: DataSource[]
}

export const Board: React.FunctionComponent<BoardProps> = (props) => {
  const [state, dispatch] = React.useReducer(reducer, {
    data: props.dataSource,
    onDataUpdate: props.onDataUpdate,
    hoverItem: {
      listId: '',
      dataId: ''
    }
  })

  React.useEffect(() => {
    dispatch({ type: 'update', payload: props.dataSource })
  }, [props.dataSource])

  return (
    <DndProvider backend={HTML5Backend}>
      <BoardContext.Provider value={{ state, dispatch }}>
        <div style={props.style} className={props.className}>
          {props.lists.map((list) => (
            <List
              key={list.listId}
              id={list.listId}
              title={list.title}
              items={state.data.filter((data) => data.listId === list.listId)}
            />
          ))}
        </div>
      </BoardContext.Provider>
    </DndProvider>
  )
}
