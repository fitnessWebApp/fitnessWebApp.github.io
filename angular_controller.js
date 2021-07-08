  app.controller("myCtrl", function ($scope) {

    $scope.today = new Date();

    
    $scope.valgtAktivitet = function(modul,dag_obj){
      var valgt = false;

        if(dag_obj.aktiviteter.includes(modul)){
          
          var index = dag_obj.aktiviteter.indexOf(modul);
          dag_obj.aktiviteter.splice(index,1);

        }else{
          dag_obj.aktiviteter.push(modul);
        }

      var month = $scope.today.getUTCMonth() + 1; //months from 1-12
      var day = $scope.today.getUTCDate();
      var year = $scope.today.getUTCFullYear();

      firebase
        .database()
        .ref(dag_obj.dag)
        .update({
          "aktiviteter":dag_obj.aktiviteter
        });
 

        
    }


    $scope.completed = function(valgtAktivitet,aktiviteter){

      for(var i=0; i <= aktiviteter.length ; i++){
        if(valgtAktivitet == aktiviteter[i]) return "green";
      }
      return "grey"; 

    }


    $scope.idag = function (dag) {
     // let d = new Date();
      
      var month = $scope.today.getUTCMonth() + 1; //months from 1-12
      var day = $scope.today.getUTCDate();
      var year = $scope.today.getUTCFullYear();

      var dagTekst = day+"-"+month+"-"+year;

      //console.log(dagTekst + " " + dag);

      return dag == dagTekst? "lightgreen" : "lightblue";
    };
  });
