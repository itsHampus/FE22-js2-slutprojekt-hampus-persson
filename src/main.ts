import { User } from "./modules/user";
import { Gui } from "./modules/gui";
import { HomePage } from "./modules/homePage";

const GuiFor = new Gui();
GuiFor.createLogin();
const user = new User();
const homePage = new HomePage();


// För att skapa en användare
const createUserForm = document.getElementById('createUserForm')!;
createUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    user.createUser();
});
// För att logga in
const loginForm = document.getElementById('loginForm')!;
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    user.logIn();
})

//Tillbaks till Home
const backToHomeBtn = document.getElementById('backToHomeBtn')!;
backToHomeBtn.addEventListener('click', () => {
    console.log('Back to Home');
    user.goToHomeOrProfile(true);
    document.getElementById('profileStatusContainer')!.innerHTML = '';
    // GuiFor.createHomePage();
    // this.homePage.homePage();
    // localStorage.setItem('dontRepeatHome', 'true');
    // console.log(localStorage.getItem('dontRepeatHome'), 'nu har vi tryckt på hem');
});


homePage.addPost();
homePage.delete();
// if (localStorage.getItem('username') != null) {
//     homePage.homePage();
//     console.log('user logged in händer');
//     // profilePage(localStorage.getItem('username')!);
// }
// homePage.homePage();
// export async function homePage() {
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

// type PostType = {
//     username: string,
//     p: string,
//     t: string
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

// export async function profilePage(username: string) {
//     GuiFor.createProfilePage();

//     let allPosts: PostType[] = [];
//     let arrayOfPostIDs: string[] = [];
//     let arrayOfIndexesForPosts: number[] = [];
//     const allUsers = await firebase.getAllUsers();
//     allUsers.forEach((storedUser: UserType) => {
//         if (storedUser.username === username) {
//             const profileUsername = document.getElementById('profileUsername')!;
//             profileUsername.innerText = storedUser.username;
//             GuiFor.userProfilePicture(storedUser.profilePicture, false);

//             if (storedUser.posts !== undefined) {
//                 const arrayOfPosts = Object.values(storedUser.posts)
//                 arrayOfPosts.forEach(({ post, timestamp }, indexForThePost: number) => {
//                     const postWithTimestamp: PostType = {
//                         username: storedUser.username,
//                         p: post,
//                         t: timestamp
//                     }

//                     allPosts.push(postWithTimestamp);
//                     arrayOfIndexesForPosts.push(indexForThePost);
//                 })
//                 Object.keys(storedUser.posts).forEach((key) => {
//                     arrayOfPostIDs.push(key);
//                 });
//             } else {
//                 const noStatusUpdate = document.createElement('p');
//                 noStatusUpdate.innerText = 'No posts yet';
//                 document.getElementById('profileStatusContainer')!.append(noStatusUpdate);
//             }

//         }
//     })
//     allPosts.sort((a, b) => new Date(b.t).getTime() - new Date(a.t).getTime());
//     arrayOfIndexesForPosts.reverse();
//     allPosts.forEach((storedPost: PostType, indexForThePost: number) => {
//         // console.log(storedPost);
//         const statusContainer = document.createElement('div');
//         statusContainer.id = 'containerForTheProfilePost';
//         const statusUsername = document.createElement('h5');
//         statusUsername.innerText = storedPost.username;
//         const statusText = document.createElement('p');
//         statusText.innerText = storedPost.p;
//         const statusTimestamp = document.createElement('p');
//         statusTimestamp.innerText = storedPost.t;

//         // console.log(arrayOfIndexesForPosts);
//         if (storedPost.username === localStorage.getItem('username')) {
//             const deletePostBtn = document.createElement('button');
//             deletePostBtn.innerText = 'Delete post';
//             deletePostBtn.value = indexForThePost.toString()
//             deletePostBtn.addEventListener('click', async () => {
//                 let confirmChoise = confirm('Are you sure you want to delete this post?');
//                 if (confirmChoise) {
//                     const allUsers = await firebase.getAllUsers();
//                     allUsers.forEach(async (storedUser, userIndex: number) => {
//                         if (storedUser.username === localStorage.getItem('username')) {
//                             const postIndex = arrayOfIndexesForPosts[deletePostBtn.value]
//                             await firebase.deleteUserPost(arrayOfPostIDs[postIndex], userIndex);
//                             document.getElementById('profileStatusContainer')!.innerHTML = '';
//                             profilePage(localStorage.getItem('username')!);
//                         }
//                     });
//                 }
//             });

//             statusContainer.append(statusUsername, statusText, statusTimestamp, deletePostBtn);
//         } else {
//             statusContainer.append(statusUsername, statusText, statusTimestamp);
//         }
//         document.getElementById('profileStatusContainer')!.append(statusContainer);
//     })

//     //Tillbaks till Home
//     const backToHomeBtn = document.getElementById('backToHomeBtn')!;
//     backToHomeBtn.addEventListener('click', () => {
//         // GuiFor.createHomePage();
//         homePage.homePage();
//         document.getElementById('profileStatusContainer')!.innerHTML = '';
//     });
// }