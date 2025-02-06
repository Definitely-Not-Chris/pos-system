import clsx from "clsx"

export interface TextFieldProps {
    label?: string,
    type?: string
}
export function TextField({ label, type }: TextFieldProps) {
    return (
        <div className='flex flex-col'>
            {/* <p className='mb-0.5 font-medium text-gray-700 self-start'>{label}</p> */}
            <input 
                placeholder={label} 
                className={clsx(
                    'bg-gray-100 border border-gray-200/75 rounded-lg py-2.5 px-3.5 flex-1',
                    'hover:outline-indigo-400 focus:outline-indigo-400 placeholder:text-gray-400',
                    'focus:bg-white'
                )}
                type={type}
            />
        </div>
    )
}