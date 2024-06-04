import React , {useCallback} from 'react'
import { useForm } from 'react-hook-form'
import services from '../../appwrite/config'
import {RTE , Button, Input , Select} from "../index"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const PostForm = ({post}) => {
    const {register , handleSubmit , getValues , setValue , control , watch} = useForm({
      defaultValues : {
        title : post?.title || "",
        slug : post?.$id || "",
        content : post?.content || "",
        status : post?.status || "active",
      }
    })

    const navigate = useNavigate();
    const userData = useSelector(state=> state.auth.userData)

    const submit = async (data)=>{
      //to update a post
      if(post){
       const file =  data.image[0]? await services.uploadFile(data.image[0])  : null
       if(file){ //if file is uploaded successfully then only delee the previous file/image
        await services.deleteFile(post.featuredImage)
       }

       const newPost = await services.updatePost(post.$id , {...data , featuredImage : file? file.$id : undefined})
       if(newPost) navigate(`/post/${newPost.$id}`)
      }
      //to create a new post
      else{
        const file = data.image[0]? await services.uploadFile(data.image[0]) : null
        const newPost  = await services.createPost({title: data.title , slug : data.slug , content: data.content ,  featuredImage : (file? file.$id : undefined) , userId : userData.$id , status: "active" })
        if(newPost) navigate(`/post/${newPost.$id}`)
      }
    }

    const slugTransform = useCallback((value)=>{
      if(value && typeof(value) == 'string'){
        return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
      }
      return ""
    } , [])

    React.useEffect(()=>{
        const subscription = watch((value , {name})=>{
          if(name === 'title'){
            setValue("slug", slugTransform(value.title) , {shouldValidate : true})
          }
        })
        return ()=> subscription.unsubscribe()
        
    } , [watch , setValue , slugTransform])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2 text-slate-100">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2 text-slate-100">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={services.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm