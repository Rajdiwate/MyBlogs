import { useState ,useEffect} from 'react'
import React  from 'react'
import services from '../appwrite/config'
import { Container ,PostCard  } from '../components/index'

const AllPosts = () => {
    
    const [posts , setPosts] = useState([])
    useEffect(()=>{
        services.listPost()
        .then((data)=>{
           if(data) setPosts(data.documents)    
        })  
    },[])


  return (
    <div className='w-full py-8'>
        <Container>
        <div className="flex flex-wrap">
            {posts?.map((post)=>(
                <div key={post.$id} className="p-2 w-1/4">
                <PostCard title={post.title} featuredImage={post.featuredImage} $id = {post.$id}/>
                </div>
            ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts