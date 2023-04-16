import { Gui } from "./gui";
import { Firebase } from "./firebase";
import { UserType } from "./user";

export type PostType = {
    username: string,
    picture: string,
    p: string,
    t: string
}

export class HomePage {
    private readonly gui: Gui = new Gui();
    private readonly firebase: Firebase = new Firebase();
    constructor() {}
    async homePage() {
        this.gui.createHomePage();
        await this.allUsersPosts();
        document.getElementById('listOfAllUsers')!.innerHTML = '';
        //Loopar igenom alla användare
        (await this.firebase.getAllUsers()).forEach((storedUser) => {
            //Om det är den inloggade användaren visa deras användarnamn och bild
            if (storedUser.username === localStorage.getItem('username')) {
                const username = document.getElementById('displayUsername')!;
                username.innerText = storedUser.username;
                this.gui.userProfilePicture(storedUser.profilePicture, true);
            }
            //Lägger till dem i listan över användare
            const userForTheList = document.createElement('li');
            userForTheList.innerText = storedUser.username;
            document.getElementById('listOfAllUsers')!.append(userForTheList);
        })
        //För att logga ut sin användare
        const logOutBtn = document.getElementById('logOutBtn')!;
        logOutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = './index.html';
        });
    }
    async deleteUser(){
        const deleteAccountBtn = document.getElementById('deleteAccountBtn')!;
        deleteAccountBtn.addEventListener('click', async () => {
            let confirmedChoise = confirm('Are you sure you want to delete your account?');
            if (confirmedChoise) {
                const arrayOfAllUsers = await this.firebase.getAllUsers();
                arrayOfAllUsers.forEach(async (storedUser, index: number) => {
                    if (storedUser.username === localStorage.getItem('username')) {
                        //Ta bort alla användare från firebase
                        await this.firebase.deleteUserFromFirebase();
                        //Ta bort användaren från arrayen
                        arrayOfAllUsers.splice(index, 1);
                        //Lägg nu till de resterande användarna till firebase igen
                        arrayOfAllUsers.forEach(async (storedUser, index: number) => {
                            await this.firebase.CreateUser(storedUser, index);
                            localStorage.clear();
                            window.location.href = './index.html';
                        })
                    }
                })
            }
        })
    }
    async addPost(){
        const userStatusUpdateForm = document.getElementById('userStatusUpdateForm')!;
        userStatusUpdateForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            //Texten användaren skrev skickas med till statusUpdate och efter det lagts till i firebase så uppdateras flödet med de nya statusuppdateringarna
            let statusUpdateText = (<HTMLTextAreaElement>document.getElementById('userStatusUpdate')!).value;
            await this.statusUpdate(statusUpdateText).then(async () => {await this.allUsersPosts();})
        })
    }
    private async statusUpdate(statusUpdate: string) {
        const allUsers = await this.firebase.getAllUsers();
        const currentUser = allUsers.find((storedUser: UserType) => storedUser.username === localStorage.getItem('username'));
        if (currentUser !== undefined) {
            const userIndex: number = allUsers.indexOf(currentUser);
            const timestamp = new Date().toLocaleString();
            await this.firebase.updateUserPosts(statusUpdate, timestamp, userIndex);
        }
        // Texten användaren skrev tas bort
        (<HTMLTextAreaElement>document.getElementById('userStatusUpdate')!).value = '';
    }
    private async allUsersPosts() {
        const allUsers = await this.firebase.getAllUsers();
        document.getElementById('everyStatusUpdateContainer')!.innerHTML = "";
        let allPosts: PostType[] = [];
        allUsers.forEach((storedUser: UserType) => {
            if (storedUser.posts !== undefined) {
                const arrayOfPosts = Object.values(storedUser.posts);
                arrayOfPosts.forEach(({ post, timestamp }) => {
                    const postWithTimestamp: PostType = {
                        username: storedUser.username,
                        picture: storedUser.profilePicture,
                        p: post,
                        t: timestamp
                    }
                    allPosts.push(postWithTimestamp);
                })
            }
        })
        allPosts.sort((a, b) => new Date(b.t).getTime() - new Date(a.t).getTime());
        allPosts.forEach((storedPost: PostType) => {
            const username = document.createElement('h5');
            username.innerText = storedPost.username;
            const profilePicture = document.createElement('img');
            const pictureSrc = this.gui.returnPictureUrl(storedPost.picture)!; 
            profilePicture.src = pictureSrc?.href;
            const post = document.createElement('p');
            post.innerText = storedPost.p;
            const timestampForThePost = document.createElement('p');
            timestampForThePost.innerText = storedPost.t;
            const postContainer = document.createElement('div');
            postContainer.id = 'postContainer';
            postContainer.append(username, profilePicture ,post, timestampForThePost);
            document.getElementById('everyStatusUpdateContainer')!.append(postContainer);
        })
    }

}