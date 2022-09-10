import React from 'react'
import './IconButton.css'

function IconButton({icon, bg, width, height, onClick}) {
  return (
        <div onClick={onClick} className='iconButton' style={{backgroundColor: bg, width: width, height: height}}>
            {icon}
        </div>
    )
}

export default IconButton