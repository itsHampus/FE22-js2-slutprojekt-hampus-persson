import { User } from "./modules/user";
import { Gui } from "./modules/gui";
import { HomePage } from "./modules/homePage";

const GuiFor = new Gui();
GuiFor.createLogin();
const user = new User();
const homePage = new HomePage;

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
});

homePage.addPost();
homePage.deleteUser();