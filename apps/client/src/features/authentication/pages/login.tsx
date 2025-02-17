import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../../components/button";
import { Card } from "../../../components/card";
import {  useAuth } from "../../../providers/auth-provider";
import { SignInUserDto, SignInUserSchema } from "@pos/core/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import RhfTextField from "../../../custom-components/rhf-text-field";


export default function() {
    const { loading: authenticating, login } = useAuth()

    const { mutateAsync, isLoading } = useMutation(login)
    const methods = useForm<SignInUserDto>({ resolver: zodResolver(SignInUserSchema) })
    const { handleSubmit, formState: { isSubmitSuccessful } } = methods
    
    const onSubmit = (data: SignInUserDto) => mutateAsync(data)

    return (
        <FormProvider {...methods}>
            <Card className='max-w-lg relative flex flex-col mb-12'>
                <div className="mt-6 mb-4 self-center size-16 bg-gray-200 rounded-full">
                </div>
                <p className='text-gray-600 mb-6 font-medium'>Your Online Point Of Sales</p>
                <form 
                    className="w-full flex flex-col space-y-2.5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {!authenticating && (
                            <>
                                <RhfTextField 
                                    name="email" 
                                    inputProps={{ placeholder: 'Enter email address' }}
                                    helperText={(error) => error?.type == 'invalid_string'}
                                    error={(error) => error?.type == 'invalid_string' ? 'Invalid email format' : error?.message}
                                />
                                <RhfTextField name="password" inputProps={{ placeholder: 'Enter password', type: 'password' }}/>
                            </>
                        )}
                        <Button loading={authenticating || isLoading}>Login</Button>
                </form>
                {!authenticating && <p className='text-gray-400 mt-4'>Forgot Password?</p>}
            </Card>
        </FormProvider>
    )
}