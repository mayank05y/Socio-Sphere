import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className='min-h-screen pt-20 flex '>
            <div className='m-auto flex flex-col gap-3'>
                <p>This Page is Not Available !!</p>
                <p className='text-center text-9xl'>{":("}</p>
                <p className='text-center'>
                <Link to={"/home"} className="link text-center">Go to home page</Link>
                </p>
            </div>
        </div>
    )
}

export default PageNotFound