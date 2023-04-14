// import { profilePage } from "../main";
// import { ProfilePage } from "./profilePage";
import { Gui } from "./gui";
import { Firebase } from "./firebase";
import { UserType } from "./user";

export type PostType = {
    username: string,
    p: string,
    t: string
}

export class HomePage {
    private readonly gui: Gui = new Gui();
    private readonly firebase: Firebase = new Firebase();
    // private readonly allUsers = this.firebase.getAllUsers();
    // private readonly profilePage: ProfilePage = new ProfilePage();
    constructor() { }

    async homePage() {
        // localStorage.removeItem('dontRepeatHome');
        this.gui.createHomePage();
        await this.allUsersPosts();
        document.getElementById('listOfAllUsers')!.innerHTML = '';
        //Loopar igenom alla användare
        // (await this.allUsers)
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
        //För statusuppdateringar


        //För att logga ut sin användare
        const logOutBtn = document.getElementById('logOutBtn')!;
        logOutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = './index.html';
        });


        // För att ta bort sin användare
    }

    async delete(){
        const deleteAccountBtn = document.getElementById('deleteAccountBtn')!;
        deleteAccountBtn.addEventListener('click', async () => {
            let confirmedChoise = confirm('Are you sure you want to delete your account?');
            if (confirmedChoise) {
                const arrayOfAllUsers = await this.firebase.getAllUsers();
                arrayOfAllUsers.forEach(async (storedUser, index: number) => {
                    if (storedUser.username === localStorage.getItem('username')) {
                        //Ta bort alla användare från firebase
                        await this.firebase.deleteUser();
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

    async addPost() {
        const userStatusUpdateForm = document.getElementById('userStatusUpdateForm')!;
        userStatusUpdateForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            //Texten användaren skrev skickas med till statusUpdate
            let statusUpdateText = (<HTMLTextAreaElement>document.getElementById('userStatusUpdate')!).value;
            await this.statusUpdate(statusUpdateText).then(async () => {
                await this.allUsersPosts();
                // console.log('nu ska alla posts uppdateras')
            })
        })
    }

    async statusUpdate(statusUpdate: string) {
        console.trace();
        const allUsers = await this.firebase.getAllUsers();
        // console.log(allUsers[6].posts, statusUpdate);
        const currentUser = allUsers.find((storedUser: UserType) => storedUser.username === localStorage.getItem('username'));
        // console.log(statusUpdate, currentUser)
        if (currentUser !== undefined) {
            const userIndex: number = allUsers.indexOf(currentUser);
            const timestamp = new Date().toLocaleString();
            const id = new Date().toLocaleString();
            // console.log(userIndex, timestamp);
            await this.firebase.updateUserPosts(statusUpdate, timestamp, userIndex, id);
            // await this.allUsersPosts();
        }
        // Texten användaren skrev tas bort
        (<HTMLTextAreaElement>document.getElementById('userStatusUpdate')!).value = '';
    }


    async allUsersPosts() {
        const allUsers = await this.firebase.getAllUsers();
        document.getElementById('everyStatusUpdateContainer')!.innerHTML = "";
        let allPosts: PostType[] = [];

        allUsers.forEach((storedUser: UserType) => {
            if (storedUser.posts !== undefined) {
                const arrayOfPosts = Object.values(storedUser.posts);
                arrayOfPosts.forEach(({ post, timestamp }) => {
                    const postWithTimestamp: PostType = {
                        username: storedUser.username,
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
            const post = document.createElement('p');
            post.innerText = storedPost.p;
            const timestampForThePost = document.createElement('p');
            timestampForThePost.innerText = storedPost.t;
            const postContainer = document.createElement('div');
            postContainer.id = 'postContainer';
            postContainer.append(username, post, timestampForThePost);
            document.getElementById('everyStatusUpdateContainer')!.append(postContainer);
        })
    }

}



// async function homePage() {
//     GuiFor.createHomePage();
//     await allUsersPosts();
//     const allUsers = await firebase.getAllUsers();
//     document.getElementById('listOfAllUsers')!.innerHTML = '';
//     allUsers.forEach((storedUser) => {
//         if (storedUser.username === localStorage.getItem('username')) {
//             const username = document.getElementById('displayUsername')!;
//             username.innerText = storedUser.username;
//             GuiFor.userProfilePicture(storedUser.profilePicture, true);
//         }
//         const userForTheList = document.createElement('li');
//         userForTheList.innerText = storedUser.username;
//         document.getElementById('listOfAllUsers')!.append(userForTheList);
//     })
//     //För statusuppdateringar
//     const userStatusUpdateForm = document.getElementById('userStatusUpdateForm')!;
//     userStatusUpdateForm.addEventListener('submit', async (event) => {
//         event.preventDefault();
//         let statusUpdateText = (<HTMLTextAreaElement>document.getElementById('userStatusUpdate')!).value;
//         await statusUpdate(statusUpdateText);
//         console.log('det här ska hända sist');
//         (<HTMLTextAreaElement>document.getElementById('userStatusUpdate')!).value = '';
//     })
//     //För att logga ut sin användare
//     const logOutBtn = document.getElementById('logOutBtn')!;
//     logOutBtn.addEventListener('click', () => {
//         localStorage.clear();
//         window.location.href = './index.html';
//     });
//     //För att ta bort sin användare
//     const deleteAccountBtn = document.getElementById('deleteAccountBtn')!;
//     deleteAccountBtn.addEventListener('click', async () => {
//         let confirmedChoise = confirm('Are you sure you want to delete your account?');
//         if (confirmedChoise) {
//             const allUsers = await firebase.getAllUsers();
//             allUsers.forEach(async (storedUser, index: number) => {
//                 if (storedUser.username === localStorage.getItem('username')) {
//                     //Ta bort alla användare från firebase
//                     await firebase.deleteUser();
//                     //Ta bort användaren från arrayen
//                     allUsers.splice(index, 1);
//                     //Lägg nu till de resterande användarna till firebase igen
//                     allUsers.forEach(async (storedUser, index: number) => {
//                         await firebase.CreateUser(storedUser, index);
//                         localStorage.clear();
//                         window.location.href = './index.html';
//                     })
//                 }
//             })
//         }
//     })
//     // Lista för att gå till de andra profilerna
//     const listOfAllUsers: NodeListOf<HTMLLIElement> = document.querySelectorAll('#listOfAllUsers li')!;
//     listOfAllUsers.forEach((user) => {
//         user.addEventListener('click', () => {
//             profilePage(user.innerText);
//         })
//     });
// }

// async function statusUpdate(statusUpdate: string) {
//     const allUsers = await firebase.getAllUsers();

//     const currentUser = allUsers.find((storedUser: UserType) => storedUser.username === localStorage.getItem('username'));
//     console.log(statusUpdate, currentUser)
//     if (currentUser !== undefined) {
//         const userIndex: number = allUsers.indexOf(currentUser);
//         const timestamp = new Date().toLocaleString();
//         console.log(userIndex, timestamp);
//         await firebase.updateUserPosts(statusUpdate, timestamp, userIndex);
//         await allUsersPosts();
//     }
// }





// async function allUsersPosts() {
//     const allUsers = await firebase.getAllUsers();
//     document.getElementById('everyStatusUpdateContainer')!.innerHTML = "";
//     let allPosts: PostType[] = [];
//     allUsers.forEach((storedUser: UserType) => {
//         if (storedUser.posts !== undefined) {
//             const arrayOfPosts = Object.values(storedUser.posts);
//             arrayOfPosts.forEach(({ post, timestamp }) => {
//                 const postWithTimestamp: PostType = {
//                     username: storedUser.username,
//                     p: post,
//                     t: timestamp
//                 }
//                 allPosts.push(postWithTimestamp);
//             })
//         }
//     })
//     allPosts.sort((a, b) => new Date(b.t).getTime() - new Date(a.t).getTime());
//     allPosts.forEach((storedPost: PostType) => {
//         const username = document.createElement('h5');
//         username.innerText = storedPost.username;
//         const post = document.createElement('p');
//         post.innerText = storedPost.p;
//         const timestampForThePost = document.createElement('p');
//         timestampForThePost.innerText = storedPost.t;
//         const postContainer = document.createElement('div');
//         postContainer.id = 'postContainer';
//         postContainer.append(username, post, timestampForThePost);
//         document.getElementById('everyStatusUpdateContainer')!.append(postContainer);
//     })
// }