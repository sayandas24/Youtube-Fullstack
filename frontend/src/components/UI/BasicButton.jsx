import React from 'react'

function BasicButton({text}) {
  return (
    <button className='p-2 font-[500] text-[14px] rounded-full px-4 bg-[#2e2e2e] hover:bg-[#3a3a3a] text-white active:bg-[#4d4d4d]'>
      {text}
    </button>
  )
}

export default BasicButton
