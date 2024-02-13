import React from 'react'

export default function RankingRows({trader}) {
  return (
    <div className='flex flex-row text-center '>
      <p className='flex-1 border-solid border-b-2 border-black'>{trader.rank}</p>
      <p className='flex-1 border-solid border-b-2 border-black'>{trader.name}</p>
      <p className='flex-1 border-solid border-b-2 border-black'>{trader.profits}</p>
    </div>
  )
}
