import React from 'react'
import SignUpFirstAndLastNameQuestion from './SignUpFirstAndLastNameQuestion'
import TransparentInputField from '../../utils/components/TransparentInputField'
import { ISignUpPhaseProps } from '../interfaces/ISignUpPhaseProps'

const firstSignUpPhase = (props: ISignUpPhaseProps): JSX.Element => {
  return (
        <>
            <div className="flex basis-1/4 mx-5">
                <SignUpFirstAndLastNameQuestion/>
            </div>
            <div className="flex basis-1/4 mx-5">
                <form className="w-full" autoComplete="off" onSubmit={(event) => props.nextPhase(event)}>
                    <TransparentInputField label={'First Name'} type={'text'} name={'firstName'} autoComplete={'off'}
                                           handleChange={props.handleChange}/>
                    <TransparentInputField label={'Last Name'} type={'text'} name={'lastName'} autoComplete={'off'}
                                           handleChange={props.handleChange}/>
                    {props.isCurrentPhaseValid &&
                        <div className="flex basis-1/4 justify-end">
                            <button
                                className='bg-zinc-800 py-2 px-3 text-white font-light rounded-sm absolute'>Next
                            </button>
                        </div>
                    }
                </form>
            </div>
        </>
  )
}

export default firstSignUpPhase
