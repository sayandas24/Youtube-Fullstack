import React from 'react'
import { Ripple } from "@/components/magicui/ripple";

function RegisterPageUi() {
  return (
    <div className="w-1/2 absolute right-0 top-0 z-[99] flex h-[100vh] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
        Metube
      </p>
      <Ripple />
    </div>
  )
}

export default RegisterPageUi
