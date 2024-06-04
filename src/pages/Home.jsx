import React , { useState , useEffect}from 'react'
import services from '../appwrite/config'
import { Container , PostCard  } from '../components/index'

const Home = () => {
    const [posts , setPosts] = useState([]);
    useEffect(()=>{
         services.listPost().then((data)=>{if(data){setPosts(data.documents)}})
    } ,[])


    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center h-[370px]">
                <Container>
                    <div className="flex flex-wrap  h-[280px] justify-center items-center">
                        <div className="p-2 w-full ">
                            <h1 className="text-2xl font-bold hover:text-gray-300 text-slate-200">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts?.map((post)=>(
                        <div className='p-2 w-1/4' key={post.$id}>
                            <PostCard title={post.title} featuredImage={post.featuredImage} $id = {post.$id}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home