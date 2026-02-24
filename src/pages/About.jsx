import React from 'react'
import Text_Wrapper from '../components/Tex_Wrapper/Text_Wrapper'

export default function About() {
  return (
    <div className='w-full h-screen relative bg-zinc-950   '>
      <div className='relative h-full w-full text-white flex items-center justify-center '>
        <Text_Wrapper>
          <h1 className='text-9xl'>About</h1>
        </Text_Wrapper>
      </div>
    </div>
  )
}
