import React from 'react'

export default ({number, text, id, complete, ...props}) => {
  const completeStyle = {
    textDecoration: 'line-through',
    color: 'grey'
  }

  return (
    <a
      className="list-group-item list-group-item-action"
      onDoubleClick={(e) => { e.preventDefault(); return false }}
      onClick={(e) => { props.completeTodo(id) }}
    >
      <div className="input-group">
        {<span style={complete ? completeStyle : {}}>{number}. {text}</span>}
        {complete &&
          <button
            type="submit"
            className="btn btn-outline-danger btn-sm"
            onClick={() => { props.deleteTodo(id) }}
          >
          DELETE
          </button>
        }
      </div>
    </a>
  )
}
