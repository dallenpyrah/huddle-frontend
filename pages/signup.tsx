import React, { useEffect } from 'react'
import FirstSignUpPhase from '../src/auth/components/FirstSignUpPhase'
import SignUpService from '../src/auth/services/SignUpService'
import UserSignUpModel from '../src/auth/models/UserSignUpModel'
import SignUpPhase from '../src/auth/enums/SignUpPhase'

const signUpService = new SignUpService()

export default function SignUpPage (): JSX.Element {
  const phasesActionDictionary = {
    [SignUpPhase.FIRST]: (userInformation: UserSignUpModel): { isValid: boolean, message: string } => signUpService.isFirstPhaseValid(userInformation),
    [SignUpPhase.SECOND]: (userInformation: UserSignUpModel): { isValid: boolean, message: string } => signUpService.isSecondPhaseValid(userInformation),
    [SignUpPhase.THIRD]: (userInformation: UserSignUpModel): { isValid: boolean, message: string } => signUpService.isThirdPhaseValid(userInformation)
  }

  const [message, setMessage] = React.useState('')
  const [isCurrentPhaseValid, setIsCurrentPhaseValid] = React.useState(false)
  const [currentPhase, setCurrentPhase] = React.useState<SignUpPhase>(SignUpPhase.FIRST)
  const [inputGroup, setInputGroup] = React.useState<UserSignUpModel>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    position: '',
    company: ''
  })

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget
    setInputGroup({ ...inputGroup, [name]: value })
  }

  const nextPhase = (): void => {
    if (isCurrentPhaseValid) {
      setCurrentPhase(currentPhase + 1)
      setIsCurrentPhaseValid(false)
    }
  }

  useEffect(() => {
    const { isValid, message } = phasesActionDictionary[currentPhase](inputGroup)
    setIsCurrentPhaseValid(isValid)
    setMessage(message)
  }, [inputGroup])

  return (
        <div className="flex h-screen bg-black">
            <div className="flex my-auto flex-row h-fit w-screen justify-center items-center">
                {<FirstSignUpPhase handleChange={handleChange} />}
            </div>
          <div className="flex flex-col items-end">
            {isCurrentPhaseValid &&
                <button
                    className='bg-green-400 py-2 px-3 m-3 text-white font-light rounded-md align-bottom' onClick={() => nextPhase}>Next
                </button>
            }
          </div>
        </div>
  )
}
