import * as React from 'react'

type ItemPropType = {
  children: React.ReactNode
}

export const Item: React.FunctionComponent<ItemPropType> = (props) => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    height: '30px',
    borderRadius: '2px',
    boxShadow: '0 0 1px rgba(51, 51, 51, 0.25)'
  }
  return <div style={style}>{props.children}</div>
}
