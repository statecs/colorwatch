"use strict";function draw(a,b){console.log(a,b),ctx.font="35px sans-serif",ctx.fillStyle=b,ctx.fillRect(0,0,canvas.width,canvas.height),ctx.fillStyle=a,ctx.textAlign="start",ctx.fillText("Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antalet bokstäver.",canvas.width/15,canvas.height/10)}function wrapText(a,b,c,d,e,f){for(var g=b.split(" "),h="",i=0;i<g.length;i++){var j=h+g[i]+" ",k=a.measureText(j),l=k.width;l>e&&i>0?(a.fillText(h,c,d),h=g[i]+" ",d+=f):h=j}a.fillText(h,c,d)}function blobToFile(a,b){return a.lastModifiedDate=new Date,a.name=b,a}angular.module("colorwatchApp",["ngFileUpload","ngStorage","ngCookies","ngResource","ngSanitize","ngRoute","ui.bootstrap","btford.socket-io","ngAria","angularSpectrumColorpicker","ngTouch","angular-spinkit"]).config(["$routeProvider","$locationProvider","$httpProvider",function(a,b,c){a.otherwise({redirectTo:"/"}),b.html5Mode(!0),c.interceptors.push("authInterceptor")}]).factory("authInterceptor",["$rootScope","$q","$cookieStore","$location",function(a,b,c,d){return{request:function(a){return a.headers=a.headers||{},c.get("token")&&-1===a.url.indexOf("api.cloudinary.com")&&(a.headers.Authorization="Bearer "+c.get("token")),a},responseError:function(a){return 401===a.status?(d.path("/login"),c.remove("token"),b.reject(a)):b.reject(a)}}}]).run(["$rootScope","$location","Auth",function(a,b,c){a.$on("$routeChangeStart",function(a,d){c.isLoggedInAsync(function(a){d.authenticate&&!a&&b.path("/login")})})}]),angular.module("colorwatchApp").config(["$routeProvider",function(a){a.when("/login",{templateUrl:"app/account/login/login.html",controller:"LoginCtrl"}).when("/signup",{templateUrl:"app/account/signup/signup.html",controller:"SignupCtrl"}).when("/dashboard",{templateUrl:"app/account/dashboard/dashboard.html",controller:"DashboardCtrl",authenticate:!0}).when("/settings",{templateUrl:"app/account/settings/settings.html",controller:"SettingsCtrl",authenticate:!0}).when("/newcolor",{templateUrl:"app/account/newcolor/newcolor.html",controller:"NewcolorCtrl",authenticate:!0})}]),angular.module("colorwatchApp").controller("DashboardCtrl",["$scope","socket","ColorCombs",function(a,b,c){a.colors=null,a.numOfCompletedTests=0,a.selectedDisability=void 0,a.disabilities=[{name:"Total"}],a.index=0,a.titleOfDashboard,b.on("vote",function(b){console.log("new vote",b),a.colors=b}),a.$watch("selectedDisability",function(b,c){if(b!==c)for(var d=0;d<a.disabilities.length;d++)a.disabilities[d].name===a.selectedDisability.name&&(a.index=d,a.titleOfDashboard=a.selectedDisability.name);else a.index=0}),c.getColorComb({id:"list"}).$promise.then(function(b){a.colors=b,a.disabilities=b[0].ELO_rating,a.titleOfDashboard="Total";for(var c=0,d=0;d<b.length;d++)c+=b[d].numOfVotes;a.numOfCompletedTests=c/10,console.log(a.numOfCompletedTests),console.log("from database",b)})}]),angular.module("colorwatchApp").controller("LoginCtrl",["$scope","Auth","$location","$window",function(a,b,c,d){a.user={},a.errors={},a.login=function(d){a.submitted=!0,d.$valid&&b.login({email:a.user.email,password:a.user.password}).then(function(){c.path("/dashboard")})["catch"](function(b){a.errors.other=b.message})},a.loginOauth=function(a){d.location.href="/auth/"+a}}]);var canvas,ctx;angular.module("colorwatchApp").controller("NewcolorCtrl",["$scope","ColorCombs","Upload","$location",function(a,b,c,d){a.textcolor="#ffffff",a.backcolor="#000000",a.file={},a.$watchCollection("[textcolor,backcolor]",function(){canvas=document.getElementById("myCanvas"),ctx=canvas.getContext("2d");var b=600,c=85,d=(canvas.width-b)/2,e=125;ctx.fillStyle=a.backcolor,ctx.fillRect(0,0,canvas.width,canvas.height);var f="Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antalet bokstäver.";ctx.font="36pt sans-serif",ctx.fillStyle=a.textcolor,wrapText(ctx,f,d,e,b,c)}),a.createColor=function(){canvas.toBlob&&canvas.toBlob(function(b){var c=blobToFile(b,a.textcolor+a.backcolor+".png");a.upload(c)},"image/png")},a.upload=function(d){c.upload({url:"https://api.cloudinary.com/v1_1/duff92/upload",fields:{upload_preset:"zvesrhqn",tags:"myphotoalbum",context:"photo="+a.textcolor+a.backcolor},file:d}).progress(function(b){a.file.progress=parseInt(100*b.loaded/b.total),console.log("Upload progress to cloudinary: "+a.file.progress+"% "+b.config.file.name),a.file.status="Uploading... "+a.file.progress+"%"}).success(function(c,d,e,f){console.log("file "+f.file.name+"uploaded. Response: ",c),a.file.result=c,b.create({textcolor:a.textcolor,backcolor:a.backcolor,image_secureurl:c.secure_url})}).error(function(b,c,d,e){a.file.errorStatus={error:"error"},console.log("error status: "+c,b)})},a.prevPage=function(){d.path("/settings")}}]),angular.module("colorwatchApp").controller("SettingsCtrl",["$scope","ColorCombs","User","Auth",function(a,b,c,d){a.errors={},a.changePassword=function(b){a.submitted=!0,b.$valid&&d.changePassword(a.user.oldPassword,a.user.newPassword).then(function(){a.message="Password successfully changed."})["catch"](function(){b.password.$setValidity("mongoose",!1),a.errors.other="Incorrect password",a.message=""})},b.getColorComb({id:"list"}).$promise.then(function(b){a.colors=b,console.log(a.colors)}),a.removeColor=function(c,d){b.deleteColor({},{id:c},function(){console.log("color removed!"),a.colors.splice(d,1)})}}]),angular.module("colorwatchApp").controller("SignupCtrl",["$scope","Auth","$location","$window",function(a,b,c,d){a.user={},a.errors={},a.register=function(d){a.submitted=!0,d.$valid&&b.createUser({name:a.user.name,email:a.user.email,password:a.user.password}).then(function(){c.path("/")})["catch"](function(b){b=b.data,a.errors={},angular.forEach(b.errors,function(b,c){d[c].$setValidity("mongoose",!1),a.errors[c]=b.message})})},a.loginOauth=function(a){d.location.href="/auth/"+a}}]),angular.module("colorwatchApp").controller("AdminCtrl",["$scope","$http","Poll",function(a,b,c){a.polls=c.query()}]).controller("PollNewCtrl",["$scope","$location","Poll",function(a,b,c){a.poll={question:"",choices:[{text:""},{text:""},{text:""}]},a.addChoice=function(){a.poll.choices.push({text:""})},a.createPoll=function(){var d=a.poll;if(d.question.length>0){for(var e=0,f=0,g=d.choices.length;g>f;f++){var h=d.choices[f];h.text.length>0&&e++}if(e>1){var i=new c(d);i.$save(function(a,c){a.error?alert("Could not create poll"):b.path("polls")})}else alert("You must enter at least two choices")}else alert("You must enter a question")}}]),angular.module("colorwatchApp").config(["$routeProvider",function(a){a.otherwise({redirectTo:"/login"})}]),angular.module("colorwatchApp").controller("FinalCtrl",["$scope","$sessionStorage","$location","Poll","socket",function(a,b,c,d,e){a.noDisabilities=!1,a.noDiagnoses=!1,a.disabilitiesModel=[{name:"Lässvårigheter",state:!1},{name:"Skrivsvårigheter",state:!1},{name:"Synnedsättning",state:!1},{name:"Fokusering",state:!1},{name:"Minne",state:!1},{name:"Organisera och planera",state:!1},{name:"Problemlösning",state:!1},{name:"Tidshantering",state:!1}],a.diagnosesModel=[{name:"Afasi",state:!1},{name:"ADHD, ADD, Damp",state:!1},{name:"Autism, autismspektrumtillstånd, asperger",state:!1},{name:"Dyslexi",state:!1},{name:"Dyskalkyli",state:!1},{name:"Utvecklingsstörning",state:!1},{name:"Diabetessynskada",state:!1},{name:"Grå starr, katarakt",state:!1},{name:"Grön starr, glaukom",state:!1},{name:"Gula fläcken",state:!1},{name:"Näthinneavlossning",state:!1},{name:"RP, retinitis pigmentosa",state:!1},{name:"Depression",state:!1},{name:"Bipolär sjukdom",state:!1},{name:"Schizofreni",state:!1},{name:"Tvångssyndrom, OCD",state:!1}],a.submit=function(){console.log("hej");var f=[],g=[];$.each(a.disabilitiesModel,function(a,b){b.state&&f.push(b.name)}),$.each(a.diagnosesModel,function(a,b){b.state&&g.push(b.name)}),a.prevPage=function(){window.history.back()},d.update({id:b.myTest},{diagnoses:g,disabilities:f},function(){e.emit("send:vote",{pollId:b.myTest}),c.path("/final-result")})}}]),angular.module("colorwatchApp").config(["$routeProvider",function(a){a.when("/final-form",{templateUrl:"app/final/final-form.html",controller:"FinalCtrl",label:"Final Form"}).when("/final-result",{templateUrl:"app/final/final.html",controller:"FinalCtrl",label:"Final Result"})}]),angular.module("colorwatchApp").controller("MainCtrl",["$scope","$q","Poll","$location","$sessionStorage",function(a,b,c,d,e){a.descriptionText="Här följer tio enkla frågor på hur du uppfattar texter och färgers läsbarhet på webben. Detta för att kunna underlätta för Funka.nu att samla in relevant data kring färgkontraster. Du väljer den du tycker är bäst genom att klicka på respektive bild i formuläret. Uppskattad tid ca 10 min.",a.initTest=function(){e.$reset(),console.log("test"),c.newpolls().$promise.then(function(a){e.$default({myTest:a._id}),console.log(e.myTest),d.path("/test/1")})}}]),angular.module("colorwatchApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"app/main/main.html",controller:"MainCtrl",label:"Home"})}]),angular.module("colorwatchApp").controller("OverviewCtrl",["$scope","Poll","$location","$sessionStorage",function(a,b,c,d){a.overviewDescText="Här av du möjlighet att ändra dina val, tryck sedan fortsätt.",b.getPoll({id:d.myTest}).$promise.then(function(b){a.questions=b}),a.vote=function(c,e){a.questions[e-1].userVote=c,b.update({id:d.myTest},{questionNr:e,userVote:c})},a.prevPage=function(){c.path("/test/1")},a.nextPage=function(){c.path("/final-form")}}]),angular.module("colorwatchApp").config(["$routeProvider",function(a){a.when("/oversikt",{templateUrl:"app/overview/overview.html",controller:"OverviewCtrl",label:"Overview"})}]),angular.module("colorwatchApp").controller("TestCtrl",["$scope","$rootScope","$routeParams","$location","Poll","ColorCombs","$sessionStorage",function(a,b,c,d,e,f,g){a.loading=!0,a.poll={},e.getPoll({id:g.myTest},{}).$promise.then(function(b){a.polls=b,a.totalQuestions=b.length,a.currentQuestion=c.questionNr||1,a.itemsPerPage=1,a.poll=b[c.questionNr-1||0]})["finally"](function(){a.loading=!1}),a.vote=function(b){a.poll.userVote=b,a.poll.userHasVoted=!0;var f=parseInt(c.questionNr)+1;e.update({id:g.myTest},{questionNr:c.questionNr,userVote:b}),f>a.totalQuestions?a.nextPage():d.path("test/"+f)},a.questionChanged=function(){console.log("Question changed to: "+a.currentQuestion),d.path("test/"+a.currentQuestion)},a.prevPage=function(){window.history.back()},a.nextPage=function(){var b=[];$.each(a.polls,function(a,c){c.userHasVoted||b.push(a+1)}),a.checkQuestion=function(){return 0==b.length?(d.path("/oversikt"),!1):!0}}}]),angular.module("colorwatchApp").config(["$routeProvider",function(a){a.when("/test/:questionNr",{templateUrl:"app/test/test.html",controller:"TestCtrl",label:"Test"})}]),angular.module("colorwatchApp").factory("Auth",["$location","$rootScope","$http","User","$cookieStore","$q",function(a,b,c,d,e,f){var g={};return e.get("token")&&(g=d.get()),{login:function(a,b){var h=b||angular.noop,i=f.defer();return c.post("/auth/local",{email:a.email,password:a.password}).success(function(a){return e.put("token",a.token),g=d.get(),i.resolve(a),h()}).error(function(a){return this.logout(),i.reject(a),h(a)}.bind(this)),i.promise},logout:function(){e.remove("token"),g={}},createUser:function(a,b){var c=b||angular.noop;return d.save(a,function(b){return e.put("token",b.token),g=d.get(),c(a)},function(a){return this.logout(),c(a)}.bind(this)).$promise},changePassword:function(a,b,c){var e=c||angular.noop;return d.changePassword({id:g._id},{oldPassword:a,newPassword:b},function(a){return e(a)},function(a){return e(a)}).$promise},getCurrentUser:function(){return g},isLoggedIn:function(){return g.hasOwnProperty("role")},isLoggedInAsync:function(a){g.hasOwnProperty("$promise")?g.$promise.then(function(){a(!0)})["catch"](function(){a(!1)}):a(g.hasOwnProperty("role")?!0:!1)},isAdmin:function(){return"admin"===g.role},getToken:function(){return e.get("token")}}}]),angular.module("colorwatchApp").factory("User",["$resource",function(a){return a("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}]),angular.module("colorwatchApp").factory("Modal",["$rootScope","$modal",function(a,b){function c(c,d){var e=a.$new();return c=c||{},d=d||"modal-default",angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(a){return a=a||angular.noop,function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("colorwatchApp").directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){return d.$setValidity("mongoose",!0)})}}}),angular.module("colorwatchApp").controller("NavbarCtrl",["$rootScope","$scope","$location","Auth","$timeout",function(a,b,c,d,e){var f=30;console.log(f),a.countTo=f,a.countFrom=0,e(function(){a.progressValue=f},200),b.menu=[{title:"Start",link:"/",active:!0},{title:"Test",link:"/test/1",active:!0},{title:"Översikt",link:"/oversikt",active:!0},{title:"Slut",link:"/final-form",active:!1}],b.isCollapsed=!0,b.isLoggedIn=d.isLoggedIn,b.isAdmin=d.isAdmin,b.getCurrentUser=d.getCurrentUser,b.logout=function(){d.logout(),c.path("/")},b.isActive=function(a){return a===c.path()}}]),angular.module("colorwatchApp").factory("EloRating",function(){function a(a){return $.grep(b,function(b){return b.id===a})[0]}var b=[{id:1,rating:1400,src:"/assets/images/e67a663e.color_blw.png"},{id:2,rating:1400,src:"/assets/images/b03cda6b.color_bw.png"},{id:3,rating:1400,src:"/assets/images/b407df66.color_by.png"},{id:4,rating:1400,src:"/assets/images/bd977583.color_gb.png"},{id:5,rating:1400,src:"/assets/images/46fd139b.color_wb.png"},{id:6,rating:1400,src:"/assets/images/a459f8d8.color_wbl.png"},{id:7,rating:1400,src:"/assets/images/3c79aaa7.color_wg.png"}],c=32;return{setELORating:function(d){for(var e,f,g,h,i,j,k=0;k<d.length;k++){i=0,j=0,"Alt1"===d[k].altChoosen?i=1:j=1;var l=a(d[k].alt1.id),m=a(d[k].alt2.id);e=1/(1+Math.pow(10,(m.rating-l.rating)/400)),f=1/(1+Math.pow(10,(l.rating-m.rating)/400)),g=l.rating+c*(i-e),h=m.rating+c*(j-f),l.rating=g,m.rating=h,console.log("new ratings",g,h,b)}}}}),angular.module("colorwatchApp").factory("ImagesToRate",function(){var a=[{id:1,rating:1400,src:"/assets/images/e67a663e.color_blw.png"},{id:2,rating:1400,src:"/assets/images/b03cda6b.color_bw.png"},{id:3,rating:1400,src:"/assets/images/b407df66.color_by.png"},{id:4,rating:1400,src:"/assets/images/bd977583.color_gb.png"},{id:5,rating:1400,src:"/assets/images/46fd139b.color_wb.png"},{id:6,rating:1400,src:"/assets/images/a459f8d8.color_wbl.png"},{id:7,rating:1400,src:"/assets/images/3c79aaa7.color_wg.png"}];return{get:function(b){function c(a){return function(b){return b.id===a}}for(var d=[],e=0;b>e;e++){for(var f=Math.floor(Math.random()*a.length)+1,g=Math.floor(Math.random()*a.length)+1;f===g;)g=Math.floor(Math.random()*a.length);var h=$.grep(a,c(f))[0],i=$.grep(a,c(g))[0];d.push({alt1:{id:h.id,src:h.src},alt2:{id:i.id,src:i.src},altChoosed:null})}return d}}}),angular.module("colorwatchApp").factory("TestRating",["$cookieStore","ImagesToRate",function(a,b){var c=a.get("imagesToRate");return console.log("imagesToRate",c),void 0===c&&(c=b.get(10),a.put("imagesToRate",c),console.log("No cookie for imagesToRate, new values are:",c)),{initTest:function(d){return c=b.get(d),a.put("imagesToRate",c),c},setNewScore:function(b,d){1===d?c[b].altChoosed="Alt1":c[b].altChoosed="Alt2",a.put("imagesToRate",c),console.log("set new score",c[b].altChoosed)},getCurrentQuestion:function(a){return c[a]},getAllQuestions:function(){return c}}}]),angular.module("colorwatchApp").factory("Poll",["$resource",function(a){return a("/api/polls/:id",{id:"@id"},{newpolls:{method:"GET",params:{id:"newpolls"}},getPoll:{method:"GET",params:{id:"@id"},isArray:!0},update:{method:"PUT"},updateFinalForm:{method:"PUT",params:{id:"final"}}})}]).factory("ColorCombs",["$resource",function(a){return a("/api/colorcombs/:id",{id:"@id"},{getColorComb:{method:"GET",isArray:!0},deleteColor:{method:"DELETE"},create:{method:"POST",params:{id:"create",image_data:"@img_data",image_contentType:"image/png",textcolor:"@textcolor",backcolor:"@backcolor"}}})}]).factory("socket",["socketFactory",function(a){var b=io("",{path:"/socket.io-client"}),c=a({ioSocket:b});return c.forward("error"),c}]),angular.module("colorwatchApp").run(["$templateCache",function(a){a.put("app/account/dashboard/dashboard.html",'<div ng-include src="\'components/navbar/main_topbar.html\'"></div><div class="container jumbotron-large"><div class=row><div class="col-lg-3 col-md-3 col-md-offset-3 col-xs-6"><div class="panel panel-primary"><div class=panel-heading><div class=row><div class=col-xs-3><i class="fa fa-comments fa-3x"></i></div><!--Large box for presenting total votes in test--><div class="col-xs-9 text-right"><div class=huge>{{numOfCompletedTests}}</div><div>Antal genomförda tester</div></div></div></div><!--Not used yet, could be used for more details of total votes--><a href=#><div class=panel-footer><span class=pull-left>View Details</span> <span class=pull-right><i class="fa fa-arrow-circle-right"></i></span><div class=clearfix></div></div></a></div></div></div><label for=searchDisability>Val av rankinglista</label><input id=searchDisability type=search class="form-control col-sm-2" placeholder="Sök efter funktionsnedsättning eller svårighet..." ng-model=selectedDisability typeahead="disability as disability.name for disability in disabilities | filter:$viewValue | limitTo:8"><h1>{{titleOfDashboard}}</h1><!--Table presenting the overall rating of the color combinations--><div class=table-responsive><table class="table table-striped"><thead><tr><th>#</th><th>Textfärg</th><th>Backgrundsfärg</th><th>Ranking</th><th>Antal röster</th><th>Antal visningar</th></tr></thead><tbody><tr ng-repeat="color in colors | orderBy:\'-ELO_rating[index].rating\'"><td>{{$index+1}}</td><td><span ng-style="{\'background-color\': \'{{color.textcolor}}\'}" class=thumbnail></span>{{color.textcolor}}</td><td><span ng-style="{\'background-color\': \'{{color.backcolor}}\'}" class=thumbnail></span>{{color.backcolor}}</td><td>{{color.ELO_rating[index].rating | number: 0}}</td><td>{{color.ELO_rating[index].numOfVotes | number: 0}}</td><td>{{color.ELO_rating[index].numOfTimesInTest | number: 0}}</td></tr></tbody></table></div></div>'),a.put("app/account/login/login.html",'<div ng-include src="\'components/navbar/main_topbar.html\'"></div><div class="container jumbotron"><div class=row><div class=col-sm-12><h1>Login</h1></div><div class=col-sm-12><form class=form name=form ng-submit=login(form) novalidate><div class=form-group><label>Email</label><input type=email name=email class=form-control ng-model=user.email required></div><div class=form-group><label>Password</label><input type=password name=password class=form-control ng-model=user.password required></div><div class="form-group has-error"><p class=help-block ng-show="form.email.$error.required && form.password.$error.required && submitted">Please enter your email and password.</p><p class=help-block ng-show="form.email.$error.email && submitted">Please enter a valid email.</p><p class=help-block>{{ errors.other }}</p></div><div><button class="btn btn-start" type=submit>Login</button><!--   <a class="btn btn-default btn-lg btn-register" href="/signup">\r\n            Register\r\n          </a> --></div><!--  <div>\r\n          <a class="btn btn-facebook" href="" ng-click="loginOauth(\'facebook\')">\r\n            <i class="fa fa-facebook"></i> Connect with Facebook\r\n          </a>\r\n          <a class="btn btn-google-plus" href="" ng-click="loginOauth(\'google\')">\r\n            <i class="fa fa-google-plus"></i> Connect with Google+\r\n          </a>\r\n          <a class="btn btn-twitter" href="" ng-click="loginOauth(\'twitter\')">\r\n            <i class="fa fa-twitter"></i> Connect with Twitter\r\n          </a>\r\n        </div> --></form></div></div></div>'),a.put("app/account/newcolor/newcolor.html",'<div ng-include src="\'components/navbar/main_topbar.html\'"></div><div class="container jumbotron-large"><div class=page-header><h2>Skapa en ny färg</h2><button type=button class="btn btn-default btn-large" ng-click=prevPage()>Tillbaka</button><div ng-show=file.progress><div class=row><div class="col-md-6 col-md-offset-2"><h3>{{file.name}}</h3><div class=status>{{file.status}}</div><div class=progress><div class=progress-bar role=progressbar aria-valuenow=60 aria-valuemin=0 aria-valuemax=100 style="width: {{file.progress}}%">{{file.progress}}%</div></div></div></div></div><div ng-show=file.result><div class="alert alert-success col-md-6 col-md-offset-2" role=alert>Bilden laddades upp korrekt!</div></div><div ng-show=file.errorStatus><div class="alert alert-danger col-md-6 col-md-offset-2" role=alert>Något gick fel!</div></div></div><div class="col-md-4 col-md-offset-2"><canvas class=img-responsive id=myCanvas width=752px height=751px></canvas></div><form role=form ng-submit=createColor()><div class="form-group col-md-offset-3"><label for=textColor>Textfärg</label><br><input ng-model=textcolor size="7"> <input type=color spectrum-colorpicker options="{preferredFormat: \'hex\', showInput: true}" ng-model=textcolor name=textColor id="textColor"></div><div class="form-group col-md-offset-3"><label for=backgroundColor>Bakgrundsfärg</label><br><input ng-model=backcolor size="7"> <input type=color spectrum-colorpicker options="{preferredFormat: \'hex\', showInput: true}" ng-model=backcolor name=backgroundColor id="backgroundColor"></div><button type=submit class="btn btn-start top-margin">Create color combination</button></form></div>'),a.put("app/account/settings/settings.html",'<div ng-include src="\'components/navbar/main_topbar.html\'"></div><div class="container jumbotron-large"><div class=row><div class=col-xs-5><a href=/newcolor class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> Ny färg</a></div><div class=col-xs-7><input class=form-control ng-model=query placeholder="Sök efter en färgkod..."></div></div><div class=row><div class=col-xs-12><hr></div></div><div class=row ng-switch on=colors.length><ul ng-switch-when=0><li>Inga färger i databasen. Vill du <a href=#/new>skapa en</a>?</li></ul><ul class=no-bullet ng-switch-default><li ng-repeat="color in colors | filter: query"><span class="pull-right button-group"><button type=button class="btn btn-danger" ng-click="removeColor(color._id, $index)" ng-confirm-click="Are you Sure?">Ta bort <span class="glyphicon glyphicon-trash"></span></button></span> <img width=200px ng-src={{color.image_secureurl}} class=img-responsive style="border:1px solid black" alt="Placeholder image"> <span>Textfärg: {{color.textcolor}}</span> <span>Backgrundsfärg: {{color.backcolor}}</span><hr></li></ul></div><div class=row><div class=col-sm-12><h2>Byt lösenord</h2></div><div class=col-sm-12><form class=form name=form ng-submit=changePassword(form) novalidate><div class=form-group><label>Nuvarande lösenord</label><input type=password name=password class=form-control ng-model=user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.other }}</p></div><div class=form-group><label>Nytt lösenord</label><input type=password name=newPassword class=form-control ng-model=user.newPassword ng-minlength=3 required><p class=help-block ng-show="(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || submitted)">Lösenorden måste vara minst 3 tecken långt.</p></div><p class=help-block>{{ message }}</p><button class="btn btn-lg btn-primary" type=submit>Spara ändringar</button></form></div></div></div>'),a.put("app/account/signup/signup.html",'<div class=container><div class=row><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=register(form) novalidate><div class=form-group ng-class="{ \'has-success\': form.name.$valid && submitted,\r\n                                            \'has-error\': form.name.$invalid && submitted }"><label>Name</label><input name=name class=form-control ng-model=user.name required><p class=help-block ng-show="form.name.$error.required && submitted">A name is required</p></div><div class=form-group ng-class="{ \'has-success\': form.email.$valid && submitted,\r\n                                            \'has-error\': form.email.$invalid && submitted }"><label>Email</label><input type=email name=email class=form-control ng-model=user.email required mongoose-error><p class=help-block ng-show="form.email.$error.email && submitted">Doesn\'t look like a valid email.</p><p class=help-block ng-show="form.email.$error.required && submitted">What\'s your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ errors.email }}</p></div><div class=form-group ng-class="{ \'has-success\': form.password.$valid && submitted,\r\n                                            \'has-error\': form.password.$invalid && submitted }"><label>Password</label><input type=password name=password class=form-control ng-model=user.password ng-minlength=3 required mongoose-error><p class=help-block ng-show="(form.password.$error.minlength || form.password.$error.required) && submitted">Password must be at least 3 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.password }}</p></div><div><button class="btn btn-inverse btn-lg btn-login" type=submit>Sign up</button> <a class="btn btn-default btn-lg btn-register" href=/login>Login</a></div><hr><div><a class="btn btn-facebook" href="" ng-click="loginOauth(\'facebook\')"><i class="fa fa-facebook"></i> Connect with Facebook</a> <a class="btn btn-google-plus" href="" ng-click="loginOauth(\'google\')"><i class="fa fa-google-plus"></i> Connect with Google+</a> <a class="btn btn-twitter" href="" ng-click="loginOauth(\'twitter\')"><i class="fa fa-twitter"></i> Connect with Twitter</a></div></form></div></div><hr></div>'),a.put("app/admin/admin.html",'<div class=menu-wrapper><ul class=menu-list><li><a href=http://funka.nu>Funka.nu</a></li><li><a href=/dashboard>Adminpanel</a></li></ul></div><!-- Menu List --><i class=i-menu><a href=#><i><span>Meny</span></i></a></i><div class=page-header><h1>Poll List</h1></div><div class=row><div class=col-xs-5><a href=#/new class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> New Poll</a></div><div class=col-xs-7><input class=form-control ng-model=query placeholder="Search for a poll"></div></div><div class=row><div class=col-xs-12><hr></div></div><div class=row ng-switch on=polls.length><ul ng-switch-when=0><li><em>No polls in databases. Would you like to <a href=#/new>create one</a>?</em></li></ul><ul ng-switch-default><li ng-repeat="poll in polls | filter:query"><a href=#/poll/{{poll._id}}>{{poll.question}}</a></li></ul></div>'),a.put("app/admin/new_poll.html",'<div class="container jumbotron"><div class=page-header><h1>Create New Poll</h1></div><form role=form ng-submit=createPoll()><div class=form-group><label for=pollQuestion>Question</label><input ng-model=poll.question class=form-control id=pollQuestion placeholder="Enter poll question"></div><div class=form-group><label>Choices</label><div ng-repeat="choice in poll.choices"><input ng-model=choice.text class=form-control placeholder="Enter choice {{$index+1}} text"><br></div></div><div class=row><div class=col-xs-12><button type=button class="btn btn-default" ng-click=addChoice()><span class="glyphicon glyphicon-plus"></span> Add another</button></div></div><p><hr></p><div class=row><div class=col-xs-6><a href=#/polls class="btn btn-default" role=button><span class="glyphicon glyphicon-arrow-left"></span> Back to Poll List</a></div><div class=col-xs-6><button class="btn btn-primary pull-right" type=submit>Create Poll &raquo;</button></div></div><p>&nbsp;</p></form></div>'),a.put("app/final/final-form.html",'<div ng-include="\'components/navbar/main_topbar.html\'"></div><div class="container jumbotron"><div class="form-top row final-form"><form role=form ng-submit=submit()><h2>Vi behöver veta lite mer om dig för att kunna få ett så bra resultat som möjligt</h2><hr><div class="form-group kon"><h3>Kön</h3><label><input type=radio name=optradio>Kvinna</label><label><input type=radio name=optradio>Man</label><label><input type=radio name=optradio>Annat</label><label><input type=radio name=optradio>Vill ej ange</label></div><div class=form-group><label for=disabilities><p>Har du problem med något av nedanstående? - Med problem menar vi att det skapar svårigheter för dig i din vardag</p></label><div class="form-group btn-group" id=disabilities><label ng-repeat="disability in disabilitiesModel" class="btn btn-default btn-final" ng-model=disability.state ng-disabled=noDisabilities btn-checkbox aria-selected>{{disability.name}}</label></div><div class="form-group input-group col-xs-12 col-sm-12 col-md-12"><input class=form-control ng-disabled=noDisabilities placeholder="Fyll i om du har någon annan funktionsnedsättning"></div><label class="form-group checkbox-inline"><input type=checkbox name=optionDisability ng-model=noDisabilities id=optDisability value=false>Nej, jag har ingen funktionsnedsättning</label></div><div class=form-group><label for=diagnoses><h3>Har du någon diagnos?</h3></label><div class="form-group btn-group" id=diagnoses><label ng-repeat="diagnose in diagnosesModel" class="btn btn-default btn-final" ng-model=diagnose.state ng-disabled=noDiagnoses btn-checkbox>{{diagnose.name}}</label></div><div class="form-group input-group col-xs-12 col-sm-12 col-md-12"><input class=form-control ng-disabled=noDiagnoses placeholder="Fyll i om du har någon annan diagnos"></div><label class="form-group checkbox-inline"><input type=checkbox name=optionDiagnose ng-model=noDiagnoses id=optDiagnose value=false>Nej, jag har ingen diagnos</label></div><div class=form-group><button type=submit class="btn btn-start">Skicka in</button></div></form></div></div>'),a.put("app/final/final.html",'<div class="container jumbotron"><h1>Tack för din medverkan!</h1><p>Ditt resultat bidrar till en tillgängligare webb.</p><p>Vid frågor, kontakta <a href=mailto:hampus.sethfors@funka.com>Hampus Sethfors</a></p></div>'),a.put("app/main/main.html",'<div ng-include src="\'components/navbar/main_topbar.html\'"></div><!-- Content --><div class=top-margin><div class="container fadeIn jumbotron text-center"><h1>Välkommen!</h1><p class=lead>{{descriptionText}}</p><a ng-click=initTest()><button class="btn btn-start">Starta testet <span class=do-not-remove-this-span>&rarr;</span></button></a></div></div>'),a.put("app/overview/overview.html",'<div ng-include src="\'components/navbar/test_topbar.html\'"></div><div class="container jumbotron"><div class="row text-center"><h1>Översikt</h1><p class=lead>{{overviewDescText}}</p></div><div class=questionBlock ng-repeat="question in questions"><fieldset><legend>Fråga {{$index + 1}}</legend><div class="row image-ctn"><div class="col col-md-4 col-xs-6 col-md-offset-2"><img ng-class="{true: \'op-selected\'}[question.userVote == \'choice_alt1\']" ng-src={{question.img1_url}} ng-model=question.userVote ng-click="vote(\'choice_alt1\', $index+1)" class=img-responsive alt="Vit text på svart bakgrund"><button ng-if="question.userVote == \'choice_alt1\'" class=btn ng-model=question.userVote alt=Vald btn-radio="\'choice_alt1\'">Vald</button> <button ng-if="question.userVote != \'choice_alt1\'" class=btn ng-model=question.userVote alt=Välj ng-click="vote(\'choice_alt1\', $index+1)" btn-radio="\'choice_alt1\'">Välj</button></div><div class="col col-md-4 col-xs-6"><img ng-class="{true: \'op-selected\'}[question.userVote == \'choice_alt2\']" ng-src={{question.img2_url}} ng-model=question.userVote ng-click="vote(\'choice_alt2\', $index+1)" class=img-responsive alt="Röd text på svart bakgrund"><button ng-if="question.userVote == \'choice_alt2\'" class=btn ng-model=question.userVote btn-radio="\'choice_alt2\'">Vald</button> <button ng-if="question.userVote != \'choice_alt2\'" class=btn ng-model=question.userVote ng-click="vote(\'choice_alt2\', $index+1)" btn-radio="\'choice_alt2\'">Välj</button></div></div></fieldset></div><!--<div class="row">\r\n			<div class="col-md-3 col-xs-3 col-md-offset-1">\r\n				<button type="submit" class="btn btn-default" ng-click="prevPage()">Tillbaka</button>\r\n			</div>\r\n			<div class="col-md-3 col-xs-3 col-md-offset-4 col-xs-offset-6 text-right">\r\n				<input type="submit" class="btn btn-default" ng-click="nextPage()" value="Fortsätt" />\r\n			</div>--></div>'),
a.put("app/test/test.html",'<div ng-include src="\'components/navbar/test_topbar.html\'"></div><div class="container top"><div class=page-header><h1 class=text-center>Välj den text som du kan läsa bäst!</h1></div><circle-spinner ng-show=loading></circle-spinner><div ng-hide=loading><div class="row image-ctn fadeIn"><div class="col-md-4 col-xs-6 col-md-offset-2"><a><img ng-class="{true: \'op-selected\'}[poll.userVote == \'choice_alt1\']" ng-src={{poll.img1_url}} alt="Vit text på svart bakgrund" ng-click="vote(\'choice_alt1\')" ng-model=poll.userVote class="img-responsive"></a> <button ng-if="poll.userVote == \'choice_alt1\'" class=btn alt=Vald ng-model=poll.userVote ng-click="vote(\'choice_alt1\')" btn-radio="\'choice_alt1\'">Vald</button> <button ng-if="poll.userVote != \'choice_alt1\'" class=btn ng-model=poll.userVote alt=Välj ng-click="vote(\'choice_alt1\')" btn-radio="\'choice_alt1\'">Välj</button></div><div class="col-md-4 col-xs-6"><a><img ng-class="{true: \'op-selected\'}[poll.userVote == \'choice_alt2\']" ng-src={{poll.img2_url}} alt="Röd text på svart bakgrund" ng-model=poll.userVote ng-click="vote(\'choice_alt2\')" class="img-responsive"></a> <button ng-if="poll.userVote == \'choice_alt2\'" class=btn ng-model=poll.userVote btn-radio="\'choice_alt2\'">Vald</button> <button ng-if="poll.userVote != \'choice_alt2\'" class=btn ng-model=poll.userVote ng-click="vote(\'choice_alt2\')" btn-radio="\'choice_alt2\'">Välj</button></div></div><hr></div></div>'),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>'),a.put("components/navbar/main_topbar.html",'<div class="corner-wrapper fadeIn"><!-- TopWrapper --><div class="corners-top-wrapper fadeIn"><!-- TopLeft --><div class="corners corner--t-l"><a href="/"><img alt=Funka.nu src=assets/images/af345ecb.logo_funka.svg width=100px></a></div><!-- TopMiddle --><div class="corners corner--t-m hidden-xs"></div><!-- TopRight --><div class="corners corner--t-r js-fade-this"><div class=hidden-xs><!-- Facebook Like/ Share --><div id=fb-root></div><div class=fb-like data-href=https://developers.facebook.com/docs/plugins/ data-layout=button data-action=like data-show-faces=true data-share=true></div><div class=menu-wrapper></div></div></div></div><!-- BottomWrapper --><div class=corners-bottom-wrapper><div ng-include src="\'components/navbar/navbar.html\'"></div></div></div>'),a.put("components/navbar/navbar.html",'<nav class="navbar navbar-default navbar-static-top" ng-controller=NavbarCtrl><div class=container><div ng-hide=isLoggedIn() class=row><progressbar class="progress-striped active" animate=true max=100 value=progressValue type=success><span count-to={{countTo}} duration=1 count-from={{countFrom}}></span></progressbar><div class="btn-group btn-group-justified"><div ng-repeat="item in menu" ui-sref-active-eq=active ui-sref-active=active ng-class="{active: isActive(item.link)}" class=navbar-progress>{{item.title}}<span ng-if="item.title == \'Test\'">{{currentQuestion}} / {{totalQuestions}}</span></div><!--<div ng-class="{active: isActive(\'item.link\')}" ng-controller="TestCtrl"><pagination  next-text="-" previous-text="-" items-per-page="itemsPerPage" total-items="totalQuestions" ng-model="currentQuestion" ng-change="questionChanged()"></pagination></div>--></div></div><div ng-show=isLoggedIn() class=row><div class=navbar-header></div><div id=navbar-main><ul class="nav navbar-nav navbar-right"><li ng-class="{active: isActive(\'/dashboard\')}"><a href=/dashboard><span class="glyphicon glyphicon-dashboard">Adminpanel</a></li><li ng-class="{active: isActive(\'/settings\')}"><a href=/settings><span class="glyphicon glyphicon-cog">Inställningar</a></li><li ng-class="{active: isActive(\'/logout\')}"><a href="" ng-click=logout()><span class="glyphicon glyphicon-log-out">Logga ut</a></li></ul></div></div></div></nav>'),a.put("components/navbar/test_topbar.html",'<div class=corner-wrapper><!-- TopWrapper --><div class="corners-top-wrapper fadeIn"><!-- TopLeft --><div class="corners corner--t-l hidden-xs"><button type=button class=btn ng-click=prevPage()>Tillbaka</button></div><!-- TopMiddle --><div ng-if=currentQuestion class="corners corner--t-m">{{currentQuestion}} / {{totalQuestions}}</div><!-- TopRight --><div class="corners corner--t-r js-fade-this fadeIn"><button type=button ng-disabled=checkQuestion() class=btn ng-click=nextPage()>Fortsätt</button></div></div><!-- BottomWrapper --><div class="corners-bottom-wrapper hidden-xs"><div ng-include src="\'components/navbar/navbar.html\'"></div></div></div>')}]);