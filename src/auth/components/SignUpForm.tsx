import { useRouter } from 'next/router'
import React from 'react'
import AuthenticationService from '../services/AuthenticationService'
import { axiosService } from '../../utils/services/AxiosService'
import IAuthenticationModel from '../models/IAuthenticationModel'

interface ISignUpFormProps {
  setErrorMessage: (errorMessage: any) => void
  errorMessage: string
}

export default function SignUpForm (props: ISignUpFormProps): JSX.Element {
  const router = useRouter()

  const authenticationService = new AuthenticationService(axiosService)

  async function handleSignUpEvent (event: any): Promise<void> {
    try {
      event.preventDefault()
      const authenticationModel: IAuthenticationModel = {
        email: event.target.email.value,
        password: event.target.password.value,
        fullName: event.target.fullName.value,
        confirmPassword: event.target.confirmPassword.value,
        rememberMe: false
      }

      const userCredentials = await authenticationService.signUpWithPasswordAndEmail(authenticationModel)
      if (userCredentials !== null) {
        void await router.push('/dashboard')
      }
    } catch (error: any) {
      console.log(error)
      props.setErrorMessage(error.message)
    }
  }

  return (
        <form onSubmit={(event) => {
          void handleSignUpEvent(event)
        }}>
            <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullName"
                placeholder="Full Name"/>

            <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"/>

            <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"/>
            <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirmPassword"
                placeholder="Confirm Password"/>

            <span className='w-full text-center text-red-500'>
                            {props.errorMessage.length >= 1 && <h6>{props.errorMessage}</h6>}

                        </span>

            <button
                type="submit"
                className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
            >Create Account
            </button>
        </form>
  )
}