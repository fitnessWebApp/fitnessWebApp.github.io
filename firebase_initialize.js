
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
        signInSuccessUrl: "https://fitnesswebapp.github.io/",
        signInOptions: [
          // List of OAuth providers supported.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
      });
  
      firebase.auth().onAuthStateChanged(function (user) {
  
        var d = new Date();

        var month = d.getUTCMonth() + 1; //months from 1-12
        var day = d.getUTCDate();
        var year = d.getUTCFullYear();
  
        var dagTekst = day+"-"+month+"-"+year;
  
        firebase.database().ref(dagTekst).on('value', (snapshot) => {
          console.log(snapshot.val());
          if(!snapshot.val()){
            firebase.database().ref(dagTekst).update({"aktiviteter": [""]});

            scope.$apply();
          }
        });

        app.value("bruger", firebase.auth().currentUser.email);
        var scope = angular.element(document.getElementById("jj")).scope();
        scope.bruger = firebase.auth().currentUser.email;
  
        scope.$apply();


        //LISTEN OVER AKTIVITETER
        //TEST DATA
        //scope.aktivitetsliste = ["boks","run","hop1","arm","mave"];
        firebase.database().ref("aktiviteteslisten").once('value').then(function(data) {
          scope.aktivitetslisten =[];

          for(var i=0;i <data.val().length ; i++){ 
            scope.aktivitetslisten[i] = data.val()[i];
          }

         // console.log(scope.aktivitetslisten);

          scope.$apply();
          //når data er hentet skriver vi lidt tekst på skærmen
          //text("morsPlacering er :" + data.val().placering, 10, 300);
          //text("tidpunktet er :" + data.val().tid, 10, 325);
        });
              

        //HER HENTES LISTEN OVER DE DAGLIGE VALGTE AKTIVITETE
        //TEST AF HENTBIBG AF DATA      

        firebase.database().ref('/').limitToLast(10).once('value', (snapshot) => {
          scope.dagsliste     = [];
          
          var dagData;
          var aktivitetData=[];
          var index = 0;

            snapshot.forEach((childSnapshot) => {

                if(childSnapshot.key != "aktiviteteslisten"){
                  
                  dagData       = childSnapshot.key;
                  aktivitetData = [];
                
                  childSnapshot.forEach((ccSnap)=>{
                    for(var i=0;i <ccSnap.val().length ; i++){ 
                      aktivitetData[i] = ccSnap.val()[i];
                    }
                  });

                  scope.dagsliste[index] = {dag: dagData, aktiviteter: aktivitetData};
                  index++;

                }

              });

          scope.$apply();
         // console.log(scope.dagliste);
        });

  
  
      });
  