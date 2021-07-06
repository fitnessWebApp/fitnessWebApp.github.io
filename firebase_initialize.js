
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBNf-nV7NMvllv8g2gRdQczUAglltmbx7I",
        authDomain: "fitnesswebapp-76ab8.firebaseapp.com",
        databaseURL: "https://fitnesswebapp-76ab8-default-rtdb.firebaseio.com",
        projectId: "fitnesswebapp-76ab8",
        storageBucket: "fitnesswebapp-76ab8.appspot.com",
        messagingSenderId: "901944231738",
        appId: "1:901944231738:web:8e61d151d9eec8cc373203",
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
  
      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
  
      ui.start("#firebaseui-auth-container", {
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: "popup",
        signInSuccessUrl: "http://0.0.0.0:8000/", // 'https://fitnesswebapp.github.io/',
        signInOptions: [
          // List of OAuth providers supported.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
      });
  
      firebase.auth().onAuthStateChanged(function (user) {
        app.value("bruger", firebase.auth().currentUser.email);
        var scope = angular.element(document.getElementById("jj")).scope();
        scope.bruger = firebase.auth().currentUser.email;
  
        scope.dagsliste     = [];
        scope.dagsliste[0] = {dag:"3-7-2021", aktiviteter:["boks","hop","mave"]};
        scope.dagsliste[1] = {dag:"4-7-2021", aktiviteter:["boks1","run","hop","arm","mave"]};
        scope.dagsliste[2] = {dag:"5-7-2021", aktiviteter:["boks","run1","hop","arm","mave"]};
        scope.dagsliste[3] = {dag:"6-7-2021", aktiviteter:["boks","run","hop1","arm","mave"]};
  
        scope.aktivitetsliste = ["boks","run","hop1","arm","mave"];
        /*
        firebase.database().ref('/').limitToLast(10).once('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    console.log(childSnapshot.key + " " + childSnapshot.val());
    childSnapshot.forEach((ccSnap)=>{
        console.log(ccSnap.key + " " + ccSnap.val());
    });
  });
  });
  
  */
        scope.$apply();
      });
  