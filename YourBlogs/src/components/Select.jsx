import React, {useId} from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='font-medium text-gray-700 mb-1 inline-block'>{label}</label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`glass px-3 py-2.5 rounded-xl bg-white text-gray-900 outline-none focus:ring-2 focus:ring-sky-400 duration-200 border border-white/60 w-full shadow-sm ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)
