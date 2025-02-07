import clsx from "clsx"

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}
export function TextField({ label, type }: TextFieldProps) {
    return (
        <div className='flex flex-col'>
            {/* <p className='mb-0.5 font-medium text-gray-700 self-start'>{label}</p> */}
            <input 
                placeholder={label} 
                className={clsx(
                    'bg-gray-100/75 border border-gray-200/50 rounded-full py-3 px-5.5 flex-1',
                    'hover:outline-blue-400 focus:outline-blue-400 placeholder:text-gray-400',
                    'focus:bg-white'
                )}
                type={type}
            />
        </div>
    )
}