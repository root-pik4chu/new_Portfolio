import React from 'react'
import Text_Wrapper from '../components/Tex_Wrapper/Text_Wrapper'
export default function Home() {
  return (

    <div className='w-full h-screen relative bg-zinc-950   '>
      <div className='relative h-full w-full  text-white flex items-center justify-center '>
        <div className="w-[50%] bg-amber-500">
          <Text_Wrapper>
            <h1 className='text-5xl font-bold'>Welcome to my Portfolio</h1>

          </Text_Wrapper>
        </div>
      </div>
      <div className="w-full h-screen ">
        <Text_Wrapper>
          <h1 className='text-5xl font-bold'>Welcome to my Portfolio</h1>

        </Text_Wrapper>
      </div>
    </div>
  )
}
