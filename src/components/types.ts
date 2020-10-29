// eslint-disable-next-line no-unused-vars
import * as React from 'react'

export type ListData = {
  listId: string
  title: string
}

export type DataSource = {
  dataId: string
  listId: string
  render: React.ReactNode
}

export type HoverItem = {
  listId: string
  dataId: string
}

export type DropType = {
  oldListId: string
  newListId: string
  dataId: string
}
