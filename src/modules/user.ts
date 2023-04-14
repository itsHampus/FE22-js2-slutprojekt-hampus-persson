// import { homePage } from "../main";
import { Firebase } from "./firebase";
import { HomePage } from "./homePage";
import { ProfilePage } from "./profilePage";


export type UserType = {
    username: string,
    password: string,
    profilePicture: string,
    posts?: {
        id: {
            post: string,
            timestamp: string
        }
    }
}

export class User {
    private readonly firebase: Firebase = new Firebase();
    private homePage: HomePage= new HomePage();
    private profilePage: ProfilePage= new ProfilePage();
    constructor(
    ) {
        if (localStorage.getItem('username') != null) {//&& localStorage.getItem('dontRepeatHome') == null) {
            // console.log(localStorage.getItem('dontRepeatHome'), 'Nu är vi i constructorn på user');
            this.goToHomeOrProfile(true)//.then(() => {
            //     this.addEventListenersOnListOfUsers();
            // })
            // console.log('user logged in händer');
            // profilePage(localStorage.getItem('username')!);
        }
        // this.homePage = new HomePage();
        // this.profilePage = new ProfilePage();

    }
    async createUser() {
        const createUsername: string = (<HTMLInputElement>document.getElementById('createUsername'))!.value;
        const createPassword: string = (<HTMLInputElement>document.getElementById('createPassword')!).value;
        const verifyPassword: string = (<HTMLInputElement>document.getElementById('verifyPassword'))!.value;
        const selectPicture: string = (<HTMLSelectElement>document.getElementById('selectPicture'))!.value;
        if (createPassword === verifyPassword) {
            const user: UserType = {
                username: createUsername,
                password: createPassword,
                profilePicture: selectPicture
            };
            const firebaseArray = await this.firebase.getAllUsers();
            if (firebaseArray !== null) {
                const indexForUser = firebaseArray.length;
                await this.firebase.CreateUser(user, indexForUser);
            }
            else {
                const indexForUser = 0;
                await this.firebase.CreateUser(user, indexForUser);
            }
            localStorage.setItem('username', user.username);
            this.goToHomeOrProfile(true)/*.then(() => {
                // Lägger till eventListener efter home har körts och alla användare har lagts till i listan
                this.addEventListenersOnListOfUsers();
                // const listOfAllUsers: NodeListOf<HTMLLIElement> = document.querySelectorAll('#listOfAllUsers li')!;
                // listOfAllUsers.forEach((user) => {
                //     user.addEventListener('click', () => {
                //         // console.log(user)
                //         this.goToHomeOrProfile(false, user.innerText);
                //     })
                // });
            })*/
        } else {
            alert('Passwords do not match');
        }
    }
    async logIn() {
        const username: string = (<HTMLInputElement>document.getElementById('username'))!.value;
        const password: string = (<HTMLInputElement>document.getElementById('password'))!.value;

        const allUsers: UserType[] = await this.firebase.getAllUsers();
        let checkUser: boolean = this.checkIfUserExists(username, password, allUsers);
        if (checkUser == false) {
            alert("User not found");
        }
    }
    private checkIfUserExists(username: string, password: string, allUsers: UserType[]): boolean {
        let checkUser = false;
        allUsers.forEach(storedUser => {
            if (storedUser.username === username) {
                checkUser = true;
                if (storedUser.password === password) {
                    localStorage.setItem('username', storedUser.username)
                    checkUser = true;
                    this.goToHomeOrProfile(true)/*.then(() => {
                        this.addEventListenersOnListOfUsers();
                    })*/
                }
                else {
                    alert("Wrong password");
                }
            }
        })
        return checkUser;
    }
    goToHomeOrProfile(trueOrFalse: boolean, username?: string): any {
        console.trace();
        if (trueOrFalse == true) {
            // this.homePage = new HomePage();
            this.homePage.homePage().then(() => {
                this.addEventListenersOnListOfUsers();
            })
            return
        }
        else {
            // this.profilePage = new ProfilePage();
            this.profilePage.profilePage(username!);
            return
        }
    }
    addEventListenersOnListOfUsers() {
        const listOfAllUsers: NodeListOf<HTMLLIElement> = document.querySelectorAll('#listOfAllUsers li')!;
        listOfAllUsers.forEach((user) => {
            user.addEventListener('click', () => {
                // console.log(user)
                // this.profilePage = new ProfilePage();
                // this.profilePage.profilePage(user.innerText);
                this.goToHomeOrProfile(false, user.innerText);
            })
        });
    }
}
