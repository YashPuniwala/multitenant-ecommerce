import { SignInView } from '@/modules/auth/ui/views/sign-in-view'
import { getSession } from '@/actions/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const SignIn = async() => {
  const session = await getSession()

  if(session?.user) {
    redirect("/")
  }
  
  return (
    <SignInView />
  )
}

export default SignIn