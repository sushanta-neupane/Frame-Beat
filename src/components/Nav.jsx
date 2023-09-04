import React from 'react'
import {FaNapster,FaCircleHalfStroke,FaUpRightAndDownLeftFromCenter,FaPaperPlane} from "react-icons/fa6";
const Nav = () => {
  return (
    <nav className="nav">
    <span><FaUpRightAndDownLeftFromCenter/></span>
    <span><FaCircleHalfStroke/></span>
    <span><FaPaperPlane/></span>
    <span><FaNapster/></span>
  </nav>
  )
}

export default Nav