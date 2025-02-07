import { Button } from "../../components/button";
import { Card } from "../../components/card";
import { TextField } from "../../components/text-field";


export default function() {
    return (
        <Card className='max-w-lg'>
            <h1 className='text-gray-600 font-medium mb-1 mt-6 mb-6'>Change Password</h1>
            {/* <p className='text-gray-600 mb-6 font-medium'>Your Online Point Of Sales</p> */}
            <div className='w-full flex flex-col space-y-2.5'>
                <TextField label='Enter new password' type='password'/>
                <TextField label='Enter confirm password' type='password'/>
                <Button>Submit</Button>
            </div>
        </Card>
    )
}