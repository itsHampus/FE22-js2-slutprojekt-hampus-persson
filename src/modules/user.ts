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
    private homePage: HomePage = new HomePage();
    private profilePage: ProfilePage = new ProfilePage();
    constructor(
    ) {
        if (localStorage.getItem('username') != null) {
            this.goToHomeOrProfile(true)
        }
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
            this.goToHomeOrProfile(true)
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
                    this.goToHomeOrProfile(true)
                }
                else {
                    alert("Wrong password");
                }
            }
        })
        return checkUser;
    }
    goToHomeOrProfile(trueOrFalse: boolean, username?: string): void {
        if (trueOrFalse == true) {
            this.homePage.homePage().then(() => {
                this.addEventListenersOnListOfUsers();
            })
        }
        else {
            this.profilePage.profilePage(username!);
        }
    }
    addEventListenersOnListOfUsers() {
        const listOfAllUsers: NodeListOf<HTMLLIElement> = document.querySelectorAll('#listOfAllUsers li')!;
        listOfAllUsers.forEach((user) => {
            user.addEventListener('click', () => { this.goToHomeOrProfile(false, user.innerText); })
        });
    }
}
