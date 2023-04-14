export class Gui {
    // Containers som ska vara synliga beroende på vilken 'sida' man är på
    private readonly createUserContainer: HTMLElement = document.getElementById('createUserContainer')!;
    private readonly loginContainer: HTMLElement = document.getElementById('loginContainer')!;
    private readonly homePageContainer: HTMLElement = document.getElementById('homePageContainer')!;
    private readonly profilePageContainer: HTMLElement = document.getElementById('profilePageContainer')!;
    private readonly displayProfilePicture = (<HTMLImageElement>document.getElementById('displayProfilePicture')!);
    private readonly profilePicture = (<HTMLImageElement>document.getElementById('profilePicture')!);
    //Text att klicka på för att byta mellan login och skapa användare
    private readonly switchToCreateUser = document.querySelector('#loginContainer h5')!;
    private readonly switchToLogin = document.querySelector('#createUserContainer h5')!;
    constructor() {
        this.switchToCreateUser!.addEventListener('click', () => {
            this.createUser();
        })

        this.switchToLogin!.addEventListener('click', () => {
            this.createLogin();
        })
    }
    public createLogin() {
        this.loginContainer.style.display = 'block';
        this.createUserContainer.style.display = 'none';
        this.homePageContainer.style.display = 'none';
        this.profilePageContainer.style.display = 'none';
    }
    public createUser() {
        this.createUserContainer.style.display = 'block';
        this.loginContainer.style.display = 'none';
        this.homePageContainer.style.display = 'none';
        this.profilePageContainer.style.display = 'none';
    }
    public createHomePage() {
        this.homePageContainer.style.display = 'block';
        this.createUserContainer.style.display = 'none';
        this.loginContainer.style.display = 'none';
        this.profilePageContainer.style.display = 'none';
    }
    public createProfilePage() {
        this.profilePageContainer.style.display = 'block';
        this.homePageContainer.style.display = 'none';
        this.createUserContainer.style.display = 'none';
        this.loginContainer.style.display = 'none';
    }
    public userProfilePicture(imgUrl: string, homePageOrProfilePage: boolean) {
        if (imgUrl == 'animal-leao-lion-svgrepo-com.svg' && homePageOrProfilePage === true) {
            const profilePictureUrl = new URL('../images/animal-leao-lion-svgrepo-com.svg', import.meta.url);
            this.displayProfilePicture.src = profilePictureUrl.href;
        }
        else if (imgUrl == 'animal-bull-bulls-svgrepo-com.svg' && homePageOrProfilePage === true) {
            const profilePictureUrl = new URL('../images/animal-bull-bulls-svgrepo-com.svg', import.meta.url);
            this.displayProfilePicture.src = profilePictureUrl.href;
        }
        else if (imgUrl == 'animal-duck-ducks-svgrepo-com.svg' && homePageOrProfilePage === true) {
            const profilePictureUrl = new URL('../images/animal-duck-ducks-svgrepo-com.svg', import.meta.url);
            this.displayProfilePicture.src = profilePictureUrl.href;
        }
        else if (imgUrl == 'animal-leao-lion-svgrepo-com.svg' && homePageOrProfilePage === false) {
            const profilePictureUrl = new URL('../images/animal-leao-lion-svgrepo-com.svg', import.meta.url);
            this.profilePicture.src = profilePictureUrl.href;
        }
        else if (imgUrl == 'animal-bull-bulls-svgrepo-com.svg' && homePageOrProfilePage === false) {
            const profilePictureUrl = new URL('../images/animal-bull-bulls-svgrepo-com.svg', import.meta.url);
            this.profilePicture.src = profilePictureUrl.href;
        }
        else if (imgUrl == 'animal-duck-ducks-svgrepo-com.svg' && homePageOrProfilePage === false) {
            const profilePictureUrl = new URL('../images/animal-duck-ducks-svgrepo-com.svg', import.meta.url);
            this.profilePicture.src = profilePictureUrl.href;
        }
    }
}