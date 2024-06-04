import conf from "../conf/conf";
import {Client ,ID  ,Databases ,Storage ,Query} from'appwrite'

export class Services{
    client = new Client()
    databases;
    storage

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title , slug , content , featuredImage , status , userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId , conf.appwriteCollectionId ,slug, {title , slug,content,featuredImage,status,userId})
        } catch (error) {
            throw error;
        }
    }

    async updatePost( slug ,{title ,  content , featuredImage , status }){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId , conf.appwriteCollectionId , slug , {title , slug , content,featuredImage,status})
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId , conf.appwriteCollectionId , slug )
            return true
        } catch (error) {
            console.log(error)
            return false
            
        }
    }

    async getPost(slug){
        try {
            const document = await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId, slug ) 
            if(document){
                return document
            }
            else{
                return null
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async listPost(){
        try {
            return this.databases.listDocuments(conf.appwriteDatabaseId , conf.appwriteCollectionId ,[Query.equal("status" , ["active"])])
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // File Upload Methods

    async uploadFile(file){
        try {
            return await this.storage.createFile(conf.appwriteBucketId, ID.unique(),file)
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deleteFile(id){
        try {
            await this.storage.deleteFile(conf.appwriteBucketId , id)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    getFilePreview(id){
        return this.storage.getFilePreview(conf.appwriteBucketId , id)
    }
}   

const services = new Services()

export default services