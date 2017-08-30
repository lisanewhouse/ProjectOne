$(document).ready(function(){

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBzW335U61ATVv2yKRT8g6WbW4AHApacOQ",
    authDomain: "idlecare-786a2.firebaseapp.com",
    databaseURL: "https://idlecare-786a2.firebaseio.com",
    projectId: "idlecare-786a2",
    storageBucket: "",
    messagingSenderId: "231304815984"
  };
  firebase.initializeApp(config);


			
// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }






//facebook SDK script from developer site
//APP ID: 494679177561741
  // window.fbAsyncInit = function() {
  //   FB.init({
  //     appId      : '494679177561741',
  //     cookie     : true,
  //     xfbml      : true,
  //     version    : 'v2.8'
  //   });
  //   FB.AppEvents.logPageView();   
  // };

  // (function(d, s, id){
  //    var js, fjs = d.getElementsByTagName(s)[0];
  //    if (d.getElementById(id)) {return;}
  //    js = d.createElement(s); js.id = id;
  //    js.src = "//connect.facebook.net/en_US/sdk.js";
  //    fjs.parentNode.insertBefore(js, fjs);
  //  }(document, 'script', 'facebook-jssdk'));

	// The first step when loading your web page is figuring out if a person is already logged into your app with Facebook login. You start that process with a call to FB.getLoginStatus. That function will trigger a call to Facebook to get the login status and call your callback function with the results.
	// Taken from the sample code above, here's some of the code that's run during page load to check a person's login status:

	// FB.getLoginStatus(function(response) {
	//     statusChangeCallback(response);
	// });

	// The response object that's provided to your callback contains a number of fields:
	// {
	//     status: 'connected',
	//     authResponse: {
	//         accessToken: '...',
	//         expiresIn:'...',
	//         signedRequest:'...',
	//         userID:'...'
	//     }
	// }

	// status specifies the login status of the person using the app. The status can be one of the following:
	// connected - the person is logged into Facebook, and has logged into your app.
	// not_authorized - the person is logged into Facebook, but has not logged into your app.
	// unknown - the person is not logged into Facebook, so you don't know if they've logged into your app or FB.logout() was called before and therefore, it cannot connect to Facebook.

	// authResponse is included if the status is connected and is made up of the following:
	// accessToken - contains an access token for the person using the app.
	// expiresIn - indicates the UNIX time when the token expires and needs to be renewed.
	// signedRequest - a signed parameter that contains information about the person using the app.
	// userID - the ID of the person using the app.

	// Once your app knows the login status of the person using it, it can do one of the following:
	// If the person is logged into Facebook and your app, redirect them to your app's logged in experience.
	// If the person isn't logged into your app, or isn't logged into Facebook, prompt them with the Login dialog with FB.login() or show them the Login Button.
//WAU3GAFC6DN018315

 $("#search").click(function(){    
     var vin = $('#vin').val(); 

$.ajax({ 
	url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
	type: "POST",
	data: { format: "json", data: vin},
	dataType: "json",
	success: function(result)
	{

    var serialString = "";
    var vehicleID = result.Results[0].VIN;
    var serialNumber = parseInt(vehicleID.substr(11, 16)); //260443
    var worldID = vehicleID.substring(0,3); //4YD
    var type = vehicleID.charAt(3); // T
    var kModel = "M-" + vehicleID.substring(4,7); //259
    var kYear = vehicleID.charAt(9); // 
    //////////////////////////////////////// manual with API ^^^^^ /////////////////////////
    var modelYear = result.Results[0].ModelYear; 
		var make = result.Results[0].Make; 
    var series = result.Results[0].Series;
    var series2 = result.Results[0].Series2;
    var model = result.Results[0].Model;
    var bodyClass = result.Results[0].BodyClass;
    var trailerLength = result.Results[0].TrailerLength;
    var vehicleType = result.Results[0].VehicleType;
    var cc = result.Results[0].DisplacementCC;
    var trailerType = result.Results[0].TrailerBodyType;
    var trailerType1 = result.Results[0].TrailerType;
    var str = modelYear + " " + make.toUpperCase() + " " + series.toUpperCase() + " " +series2.toUpperCase() + " " + model.toUpperCase() + " " + cc + " " + trailerType.toUpperCase() + " " + trailerType1.toUpperCase() + " " + trailerLength; // combine all elements into string
    
    console.log(result.Results[0]);
    //// manual
    if (worldID === "4YD") {
      worldID = "Keystone RV"
    }
    if (type === "F") {
      type = "Fifth Wheel"
    }
    if (kYear === "7") {
      kYear = "2007"
    }
    if (serialNumber > 770000 && serialNumber < 779999) {
      serialNumber = "Everest"
    }
    
    console.log(kYear + " " + worldID + " " + serialNumber + " " + kModel + " " + type )
  
    
    
    /////////////////
        
    var str1 = str.replace(/\,/g,""); //remove commas
    var str2 = str1.split(' '); // turn string into array 
    
    function unique(list) { // function to remove any duplicate words
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}

var thelist = str2; 
var final = unique(thelist); // array without duplicates
var final1 = final.join(' '); // array turned back into a string  
    console.log(final1)    
    
  if(final1.includes("PIAGGIO AND VESPA") === true) {
     final1 = final1.replace('PIAGGIO AND','');
    }

  if(final1.includes("OTHER USAGE/ON HIGHWAY") === true) {
    final1 = final1.replace('OTHER USAGE/ON HIGHWAY','')
  }
    
  if(final1.includes("DRV") === true) {
    final1 = final1.replace('DRV','DOUBLE TREE RV')
    final1 = final1.replace("ALL ALUMINUM STRUCTURE", "")
  }
    
  if(final1.includes("FLEETWOOD FOLDING TRAILERS") === true) {
    final1 = final1.replace('FLEETWOOD FOLDING TRAILERS','COLEMAN')
  }
    
  if(final1.includes("SKYLINE CORPORATION") === true) {
    final1 = final1.replace('SKYLINE CORPORATION','LAYTON OR NOMAD')
  }
    
  if(final1.includes("(1-UP)") === true) {
    final1 = final1.replace('(1-UP)','')
  } 
    
  if(final1.includes("(CLASSIC)") === true) {
     final1 = final1.replace("(CLASSIC)", "")
     } 
    
  if(final1.includes("(NEXT)") === true) {
     final1 = final1.replace("(NEXT)", "")
     }    
    
  if(final1.includes("SKYTEAM/SACIN") === true) {
    final1 = final1.replace("SKYTEAM/SACIN", "SKYTEAM")
  }  
    
  if(final.includes("LAMINATED") === true) {
    final1 = final1.replace("LAMINATED", "")
  }  
    
     if(final.includes("K47") === true) {
    final1 = final1.replace("K47", "S1000R")
  }  
    
  if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "H") {
    final1 = "2017 KEYSTONE TRAILERS";
  }    
    
  if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "G") {
    final1 = "2016 KEYSTONE TRAILERS";
  }    
    
  if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "F") {
    final1 = "2015 KEYSTONE TRAILERS";
  }
    
   if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "E") {
    final1 = "2014 KEYSTONE TRAILERS";
  }
    
    if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "D") {
    final1 = "2013 KEYSTONE TRAILERS";
  }    
    
    if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "C") {
    final1 = "2012 KEYSTONE TRAILERS";
  }      
    
    if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "B") {
    final1 = "2011 KEYSTONE TRAILERS";
  }   
    
    if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "A") {
    final1 = "2010 KEYSTONE TRAILERS";
  }   
    
    if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "9") {
    final1 = "2009 KEYSTONE TRAILERS";
  } 
     if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "9") {
    final1 = "2009 KEYSTONE TRAILERS";
  }   
    
     if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "8") {
    final1 = "2008 KEYSTONE TRAILERS";
  }   
    
     if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "7" && vehicleID.charAt(3) == "F" && serialNumber > 770000 && serialNumber < 779999 && vehicleID.substring(4,7) === "345") {
    final1 = "2007 KEYSTONE TRAILERS M-345 EVEREST FIFTH WHEEL";
  }   
    /*
4YDF345287E771495 = 2007 Keystone Rv Everest Fifth Wheel
4YD = Keystone
F = Fifth Wheel
7 = 2007 
770000 - 779999 = Everest  
    */
    
     if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "6") {
    final1 = "2006 KEYSTONE TRAILERS";
  }    
    
     if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "5") {
    final1 = "2005 KEYSTONE TRAILERS";
     }   
    
  if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "4") {
    final1 = "2004 KEYSTONE TRAILERS";       
  }
    
  if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "3") {
    final1 = "2003 KEYSTONE TRAILERS";       
  }  
    
  if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "2") {
    final1 = "2002 KEYSTONE TRAILERS";       
  }    
    
  if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "1" && vehicleID.charAt(3) == "T" && serialNumber > 260000 && serialNumber < 269999 && vehicleID.substring(4,7) === "259") {
    final1 = "2001 KEYSTONE TRAILERS SPRINTER M-259 TRAVEL TRAILER";       
  }    
    
   if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "Y") {
    final1 = "2000 KEYSTONE TRAILERS";       
  } 
    
   if(vehicleID.includes("4YD") === true && vehicleID.charAt(9) == "X") {
    final1 = "1999 KEYSTONE TRAILERS";       
  }     
//////////// display images ///////////////////////////   
    
  if (bodyClass.includes("All Terrain Cycle") == true || bodyClass.includes("Dirt") == true) {
   $('#off').show(); // if off-road vehicle show... off-road vehicle icon
 }
    
  if (bodyClass.includes("Motorcycle") == true && bodyClass.includes("All Terrain Cycle") == false && bodyClass.includes("Dirt") == false) {
   $('#mc').show(); // if on road motorycle... show motorcycle icon
  }
    
    if (vehicleType.includes("MOTORCYCLE") == true && bodyClass.includes("All Terrain Cycle") == false && bodyClass.includes("Dirt") == false) {
   $('#mc').show(); // if on road motorycle... show motorcycle icon
    }
  
    if (vehicleType.includes("TRAILER") == true) {
    $('#trlr').show(); // if trailer.. show trailer icon
  }
    
    if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true) {
    $('#mtrhme').show(); //if motorhome or chassis.. show motorhome icon 
  }
    
    if (vehicleType.includes("CAR") == true || vehicleType.includes("TRUCK") == true || vehicleType.includes("MPV") == true) {
    $('#car').show(); // if car truck or mpv... show car icon
  }   
    
   if(final1.includes("KEYSTONE") == true)  {
   $('#trlr').show();  
   }
////////// show text ////////////////////////  
var google = 'https://www.google.com/#q=' + final1; // take string and add into google search
var google1 = google.replace(/ /gi, "+"); // replace empty space with + for better search  
    
var NADA = "";
    
    if (make.includes("KZ-RV") === true && vin.charAt(4) === "T" || vin.charAt(4) === "S" ) { 
      make = make.replace("KZ-RV" , "Sportsmen");
    }
       
  if (model.includes("Wildcat") === true) {         
    if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + model;
  }    
   }      
    
if(make.includes("DUCATI, DUCATI") === true) {
  make = make.replace("DUCATI, DUCATI" , "DUCATI");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
    if(make.includes("GRAND DESIGN RECREATIONAL") === true) {
  make = make.replace("GRAND DESIGN RECREATIONAL" , "Grand-Design-Recreational-Vehicles");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
} 
    
    if(make.includes("PILGRIM INTERNATIONAL") === true) {
  make = make.replace("PILGRIM INTERNATIONAL" , "Pilgrim-International-Inc");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
    if(make.includes("FOREST RIVER") === true && model.includes("Salem Towables") == true) {
  make = make.replace("FOREST RIVER" , "Salem-by-Forest-River");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
       if(make.includes("FOREST RIVER") === true && model.includes("Sandpiper") == true) {
  make = make.replace("FOREST RIVER" , "Salem-by-Forest-River");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
        if(make.includes("FOREST RIVER") === true && model.includes("Cardinal") == true) {
  make = make.replace("FOREST RIVER" , "Cardinal-by-Forest-River");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
        if(make.includes("FOREST RIVER") === true && model.includes("Cherokee") == true) {
  make = make.replace("FOREST RIVER" , "Cherokee-by-Forest-River");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
            if(make.includes("FOREST RIVER") === true && model.includes("Rockwood") == true) {
  make = make.replace("FOREST RIVER" , "Rockwood");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
                if(make.includes("FOREST RIVER") === true && model.includes("XLR") == true) {
  make = make.replace("FOREST RIVER" , "XLR-by-Forest-River");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
                   if(make.includes("FOREST RIVER") === true && model.includes("Flagstaff") == true) {
  make = make.replace("FOREST RIVER" , "Flagstaff-Forest-River");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
       if(make.includes("FOREST RIVER") === true && model.includes("Avenger") == true) {
  make = make.replace("FOREST RIVER" , "Avenger");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
        if(make.includes("FOREST RIVER") === true && model.includes("Fury") == true) {
  make = make.replace("FOREST RIVER" , "Fury");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
     if(make.includes("FOREST RIVER") === true && model.includes("Wildwood") == true) {
  make = make.replace("FOREST RIVER" , "Wildwood-by-Forest-River");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
       if(make.includes("FOREST RIVER") === true && model.includes("Wildcat") == true) {
  make = make.replace("FOREST RIVER" , "Wildcat");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
    if(make.includes("FOREST RIVER") === true && model.includes("Clipper") == true) {
  make = make.replace("FOREST RIVER" , "coachmen-by-forest-river");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
        if(make.includes("FOREST RIVER") === true && model.includes("Catalina") == true) {
  make = make.replace("FOREST RIVER" , "coachmen-by-forest-river");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
    
           if(make.includes("FOREST RIVER") === true && model.includes("Palomino") == true) {
  make = make.replace("FOREST RIVER" , "Palomino");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
} 
    
      if(make.includes("THOR") === true) {
  make = make.replace("THOR" , "Wanderer-by-Thor-Ind");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
} 
    
          if(make.includes("EXISS, SOONER, MILEY, UNIVERSAL TRAILER CORPORATION HORSE/LIVESTOCK GROUP") === true) {
  make = make.replace("EXISS, SOONER, MILEY, UNIVERSAL TRAILER CORPORATION HORSE/LIVESTOCK GROUP" , "Exiss-Trailers");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
} 
    
          if(make.includes("HOLIDAY RAMBLER") === true) {
  make = make.replace("HOLIDAY RAMBLER" , "Holiday-Rambler");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
} 
    
    
    if(make.includes("CHALET RV") === true) {
  make = make.replace("CHALET RV" , "CHALET");
}    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}  
 
if(make.includes("EVERGREEN, EVERGREEN") === true) {
  make = make.replace("EVERGREEN, EVERGREEN" , "Evergreen-RV");
}        
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  }
    
    if(make.includes("KOUNTRY LITE") === true) {
  make = make.replace("KOUNTRY LITE" , "Kountry-Lite");
}        
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  }    
    
if (make.includes("GENUINE SCOOTERS") === true) {
  make = make.replace("GENUINE SCOOTERS", "Genuine-Scooter-Co")
}    
    
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}

if(make.includes("HARLEY DAVIDSON") == true) {
    make = make.replace("HARLEY DAVIDSON", "Harley-Davidson") 
}
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}

if(make.includes("PIAGGIO AND VESPA") == true) {
    make = make.replace("PIAGGIO AND VESPA", "Vespa")
}
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}
    
if(make.includes("VICTORY") == true) {
    make = make.replace("VICTORY", "Victory-Motorcycles")  
}
if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
}
    
 if (make.includes("LANCE CAMPER") == true) {
   make = make.replace("LANCE CAMPER", "Lance-Manufacturing")
 }          
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  } 
    
    if (make.includes("FLEETWOOD ENTERPRISES(WILDNERNESS)") == true) {
   make = make.replace("FLEETWOOD ENTERPRISES(WILDNERNESS)", "Wilderness")
 }          
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  } 
    
      if (make.includes("FLEETWOOD ENTERPRISES(MALLARD)") == true) {
   make = make.replace("FLEETWOOD ENTERPRISES(MALLARD)", "Mallard")
 }          
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  }
    
         if (make.includes("FLEETWOOD ENTERPRISES(TERRY)") == true) {
   make = make.replace("FLEETWOOD ENTERPRISES(TERRY)", "Terry")
 }          
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  }
    
         if (make.includes("OPEN RANGE RV COMPANY") == true) {
   make = make.replace("OPEN RANGE RV COMPANY", "Open-Range-RV")
 }          
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  }
    
       if (make.includes("FLEETWOOD ENTERPRISES(PROWLER)") == true) {
   make = make.replace("FLEETWOOD ENTERPRISES(PROWLER)", "Prowler")
 }          
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  }
    
     if (make.includes("TETON INTERNATIONAL") == true) {
   make = make.replace("TETON INTERNATIONAL", "Teton")
 }          
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  }     
   
 if (make.includes("WEEKEND WARRIOR TRAILERS") == true) {
   make = make.replace("WEEKEND WARRIOR TRAILERS", "Weekend-Warrior")
 }
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  } 
    
  if (make.includes("HEARTLAND RECREATIONAL VEHICLES LLC") == true) {
   make = make.replace("HEARTLAND RECREATIONAL VEHICLES LLC", "Heartland-RVs")
 }
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  }    

  if (make.includes("CRUISER RV") == true) {
   make = make.replace("CRUISER RV", "Cruiser-RV")
 }   
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  }  
    
if (make.includes("BLOOMER TRAILER MANUFACTURING") == true) {
   make = make.replace("BLOOMER TRAILER MANUFACTURING", "Bloomer-Trailer-Manufacturing")
 }    
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  }  
  
 if (make.includes("4-STAR TRAILERS INC.") == true) {
   make = make.replace("4-STAR TRAILERS INC.", "4-Star-Trailers")
 } if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
 }
   
 if (make.includes("THUNDER MOUNTAIN CUSTOM CYCLES") == true) {
  make = make.replace("THUNDER MOUNTAIN CUSTOM CYCLES", "Thunder-Mountain-Cycles")
 }    
 if (vehicleType.includes("MOTORCYCLE") == true) {
  NADA = "http://www.nadaguides.com/Motorcycles/" + modelYear + "/" + make;
  }    

 if (make.includes("DUTCHMEN MANUFACTURING") == true) {
   make = make.replace("MANUFACTURING", "")
 }
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  }    

if (make.includes("CROSS ROADS") == true) {
   make = make.replace("CROSS ROADS", "Crossroads-RV")
 }    
  if (bodyClass.includes("Motor Home") == true || vehicleType.includes("INCOMPLETE") == true || vehicleType.includes("TRAILER")== true) {
    NADA = "http://www.nadaguides.com/RVs/" + modelYear + "/" + make;
  }      
        
    console.log(NADA);
    console.log(make);
    console.log(model);
    
 $('#results').show(final1); //animation
 $('#results').html(final1 + " " + vin.charAt(5) + vin.charAt(6)); // show string in html
    //for trailers characters 6 and 7 should be length in feet 
 
    if (make == "" && model == "" && final1 == "") { // if no make or model return error message
     $("#err").show();
     $('#results').show("Nothing Found");
     $('#results').html("Nothing Found");
 }  

 $("#vin").val(''); // remove vin number in search box on click
    
 $('#NADAshow').show(NADA);
 $('#NADAshow').text("Search NADA"); 
 $('#NADAshow').click(function(){
   window.open(NADA);
   return false;
 });
    
 $('#google').show(google1); // animation
 $('#google').text("Search Online"); // turn google search url into button
 $('#google').click(function(){ // on button click open to window to google search 
    window.open(google1);
    return false;   
});
}    
});
$('#reset').click(function() { // reload page if any errors come up 
   location.reload(true)
});
});




});



