import React from 'react'

export default props => {
  return (
    <div>
      <div>I'm a header</div>
      {props.children}
      <div>I'm a footer</div>
    </div>
  )
}
