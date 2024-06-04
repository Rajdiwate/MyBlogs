import React , {useEffect , useState} from 'react'
import services from '../appwrite/config'
import {Container , PostForm} from "../components/index"
import { useParams , useNavigate } from 'react-router-dom'

const EditPost = () => {
    const [post , setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            services.getPost(slug)
            .then((data)=>{
                if(data) setPost(data)
            })
        }
        else navigate('/')
    } , [slug , navigate])

  return (
    post? 
        (<div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>)
        
    : null
  )
}

export default EditPost