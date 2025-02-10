import { Button } from "../../../components/button";
import { Card } from "../../../components/card";
import { TextField } from "../../../components/text-field";



export default function() {
    return (
        <Card className='max-w-lg relative flex flex-col mb-12'>
            <div className="mt-6 mb-4 self-center size-16 bg-gray-200 rounded-full">
            </div>
            <p className='text-gray-600 mb-6 font-medium'>Your Online Point Of Sales</p>
            <div className='w-full flex flex-col space-y-2.5'>
                <TextField label='Enter email address'/>
                <TextField label='Enter password' type='password'/>
                <Button>Login</Button>
            </div>
            <p className='text-gray-400 mt-4'>Forgot Password?</p>
        </Card>
    )
}