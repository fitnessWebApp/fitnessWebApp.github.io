  app.controller("myCtrl", function ($scope) {
    $scope.setupfb = function (name) { };

    $scope.dage = [
      firebase.appId,
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    $scope.moduler = [
      "mave - 10min",
      "bryst",
      "lår",
      "ro",
      "ryg",
      "boks",
      "løb",
    ];

    $scope.valg = [];

    $scope.today = new Date();

    $scope.completed = function(valgtAktivitet,aktiviteter){
      for(var i=0; i <= aktiviteter.length ; i++){
        if(valgtAktivitet == aktiviteter[i]) return "green";
      }
      return "grey"; 

    }


    $scope.idag = function (dag) {
      let d = new Date();
      
      var month = $scope.today.getUTCMonth() + 1; //months from 1-12
      var day = $scope.today.getUTCDate();
      var year = $scope.today.getUTCFullYear();

      var dagTekst = day+"-"+month+"-"+year;

      console.log(dagTekst + " " + dag);

      return dag == dagTekst? "lightgreen" : "lightblue";
    };

    $scope.addValg = function (valg, index) {
      $scope.valg[index] = valg;

      var month = $scope.today.getUTCMonth() + 1; //months from 1-12
      var day = $scope.today.getUTCDate();
      var year = $scope.today.getUTCFullYear();

      var a = ["a","b"];
      firebase
        .database()
        .ref(day + "-" + month + "-" + year)
        .update({
          [valg]: a,
        });
    };

    $scope.sletValg = function (index) {
      valg = $scope.valg[index];

      var month = $scope.today.getUTCMonth() + 1; //months from 1-12
      var day = $scope.today.getUTCDate();
      var year = $scope.today.getUTCFullYear();

      firebase
        .database()
        .ref(day + "-" + month + "-" + year)
        .update({
          [valg]: "",
        });

      $scope.valg[index] = "";
    };
  });
