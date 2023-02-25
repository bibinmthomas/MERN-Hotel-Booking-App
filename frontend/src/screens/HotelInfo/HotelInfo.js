import React from 'react'
import { useParams } from 'react-router-dom';

function HotelInfo() {
  const { id } = useParams();
  return (
    <div>HotelInfo {id}</div>
  )
}

export default HotelInfo