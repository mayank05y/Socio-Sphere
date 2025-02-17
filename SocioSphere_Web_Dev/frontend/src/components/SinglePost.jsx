import React from 'react'
import { items } from '../data'
import Post from './Post'
import { BsDot } from 'react-icons/bs'
import TimeConverter from '../common/TimeConverter'

const SinglePost = () => {
    const post = items[0]
    return (
        <div className='min-h-screen pt-20'>
            <div>
                <div>
                    <Post post={post} />
                </div>
                <div className=' bg-base-200 p-4 lg:w-[50%] md:w-[70%] sm:w-[80%] mx-auto mt-2 rounded-lg flex flex-col gap-5 mb-10'>
                    {
                        post.comments.map((comment, i) => (
                            <div className='flex items-center gap-4'>
                                <div>
                                    <img src={comment.authorProfile} alt="" className='w-[30px] rounded-full' />
                                </div>
                                <div>
                                    <div className='flex items-center gap-1'>
                                        <p>{comment.author}</p>
                                        <BsDot />
                                        <TimeConverter date={comment.date} />
                                    </div>
                                    <p>{comment.content}</p>
                                </div>
                                <hr >
                                </hr >
                            </div>
                            // horizzontal line


                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SinglePost