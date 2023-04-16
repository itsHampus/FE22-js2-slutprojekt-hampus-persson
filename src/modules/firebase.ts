import { UserType } from "./user";
export class Firebase{
    constructor(){}
    async getAllUsers():Promise<UserType[]>{
        const url = 'https://slutprojekt-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/.json';
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    async CreateUser(userObj: any, index: number):Promise<void>{
        const url = `https://slutprojekt-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/${index}.json`;
        const init = {
            method: 'PUT',
            body: JSON.stringify(userObj),
            headers:{
                'Content-type': 'application/json: charset=UTF-8'
            }
        }
        const response = await fetch(url, init);
    }
    async updateUserPosts(post: string, timestamp: string, index: number):Promise<void>{
        const url = `https://slutprojekt-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/${index}/posts.json`;
        const init = {
            method: 'POST',
            body: JSON.stringify({post, timestamp}),
            headers:{
                'Content-type': 'application/json: charset=UTF-8'
            }
        }
        const response = await fetch(url, init);
    }
    async deleteUserPost(postId: string, index: Number):Promise<void>{
        const url = `https://slutprojekt-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/${index}/posts/${postId}.json`;
        const init = {
            method: 'DELETE',
            headers:{
                'Content-type': 'application/json: charset=UTF-8'
            }
        }
        const response = await fetch(url, init);
    }
    async deleteUserFromFirebase():Promise<void>{
        const url = `https://slutprojekt-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/.json`;
        const init = {
            method: 'DELETE',
            headers:{
                'Content-type': 'application/json: charset=UTF-8'
            }
        }
        const response = await fetch(url, init);
    }
}
