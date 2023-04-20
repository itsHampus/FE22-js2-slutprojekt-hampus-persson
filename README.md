# FE22-js2-slutprojekt-hampus-persson

Klasserna används främst för metoderna som finns i dem. 

## Filstruktur och beroende av andra klasser
1. Main
   - Gui
   - User
   - Home
2. User
   - Firebase
   - Home
   - Profile
3. Home
   - Gui
   - Firebase
   - Usertype (from User)
4. Profile
   - Gui
   - Posttype (from Home)
   - Firebase
   - Usertype (from User)
5. Firebase
   - Usertype (from User)
6. Gui
   - Inte beroende av nån class
   
# Main
Skapar instanser av klasserna User, Gui och Home. Ifall att en användare loggar in anropas metoden user.login() och 
om användaren vill skapa en ny användare anropas metoden user.createUser(). 
Om en användare har varit inne på en annan profils sida och trycker på knappen backToHomeBtn anropas metoden user.goToHomeOrProfile(true).
Vid funderingar över metoderna och dess funktionalitet gå och kolla dokumentationen för de enskilda klasserna.
