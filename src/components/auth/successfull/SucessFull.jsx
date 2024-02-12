import React from 'react'

const SucessFull = ({ setSuccessMessage }) => {
    return (
        <>
            <div className='container max-w-[1200px] mx-auto'>
                <p className='text-white'>success</p>
                <button onClick={() => setSuccessMessage(false)} className='text-white bg-red-600 px-4 py-2 rounded-lg'>Logout</button>
            </div>
        </>
    )
}

export default SucessFull