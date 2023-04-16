import { Gui } from "./gui";
import { PostType } from "./homePage";
import { Firebase } from "./firebase";
import { UserType } from "./user";
export class ProfilePage{
    private readonly gui: Gui = new Gui();
    private readonly firebase: Firebase = new Firebase();
    constructor(){}
    async profilePage(username: string) {
        this.gui.createProfilePage();
    
        let allPosts: PostType[] = [];
        let arrayOfPostIDs: string[] = [];
        let arrayOfIndexesForPosts: number[] = [];
        const allUsers = await this.firebase.getAllUsers();
        allUsers.forEach((storedUser: UserType) => {
            if (storedUser.username === username) {
                const profileUsername = document.getElementById('profileUsername')!;
                profileUsername.innerText = storedUser.username;
                this.gui.userProfilePicture(storedUser.profilePicture, false);
    
                if (storedUser.posts !== undefined) {
                    const arrayOfPosts = Object.values(storedUser.posts)
                    arrayOfPosts.forEach(({ post, timestamp }, indexForThePost: number) => {
                        const postWithTimestamp: PostType = {
                            username: storedUser.username,
                            picture: storedUser.profilePicture,
                            p: post,
                            t: timestamp
                        }
    
                        allPosts.push(postWithTimestamp);
                        arrayOfIndexesForPosts.push(indexForThePost);
                    })
                    Object.keys(storedUser.posts).forEach((key) => {
                        arrayOfPostIDs.push(key);
                    });
                } else {
                    const noStatusUpdate = document.createElement('p');
                    noStatusUpdate.innerText = 'No posts yet';
                    document.getElementById('profileStatusContainer')!.append(noStatusUpdate);
                }
            }
        })
        allPosts.sort((a, b) => new Date(b.t).getTime() - new Date(a.t).getTime());
        arrayOfIndexesForPosts.reverse();
        allPosts.forEach((storedPost: PostType, indexForThePost: number) => {
            const statusContainer = document.createElement('div');
            statusContainer.id = 'containerForTheProfilePost';
            const statusUsername = document.createElement('h5');
            statusUsername.innerText = storedPost.username;
            const profilePicture = document.createElement('img');
            const pictureSrc = this.gui.returnPictureUrl(storedPost.picture)!;
            profilePicture.src = pictureSrc.href;
            const statusText = document.createElement('p');
            statusText.innerText = storedPost.p;
            const statusTimestamp = document.createElement('p');
            statusTimestamp.innerText = storedPost.t;
    
            if (storedPost.username === localStorage.getItem('username')) {
                const deletePostBtn = document.createElement('button');
                deletePostBtn.innerText = 'Delete post';
                deletePostBtn.value = indexForThePost.toString()
                deletePostBtn.addEventListener('click', async () => {
                    let confirmChoise = confirm('Are you sure you want to delete this post?');
                    if (confirmChoise) {
                        const allUsers = await this.firebase.getAllUsers();
                        allUsers.forEach(async (storedUser, userIndex: number) => {
                            if (storedUser.username === localStorage.getItem('username')) {
                                const postIndex = arrayOfIndexesForPosts[deletePostBtn.value]
                                await this.firebase.deleteUserPost(arrayOfPostIDs[postIndex], userIndex);
                                document.getElementById('profileStatusContainer')!.innerHTML = '';
                                this.profilePage(localStorage.getItem('username')!);
                            }
                        });
                    }
                });
    
                statusContainer.append(statusUsername, profilePicture,statusText, statusTimestamp, deletePostBtn);
            } else {
                statusContainer.append(statusUsername, profilePicture, statusText, statusTimestamp);
            }
            document.getElementById('profileStatusContainer')!.append(statusContainer);
        })
    }
}