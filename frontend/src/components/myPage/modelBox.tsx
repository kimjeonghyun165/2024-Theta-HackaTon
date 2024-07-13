import React from 'react'

function ModelBox({children}: {children:React.ReactNode}) {
  return (
    <div className="w-[293px] h-[293px] bg-[#777777]/[0.2] rounded-[30px] flex flex-col justify-between items-center py-7 ">
      {children}
    </div>
  )
}

export default ModelBox