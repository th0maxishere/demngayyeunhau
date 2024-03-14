/**
 * You must include the dependency on 'ngMaterial'
 */
var app = angular.module('app', ['ngMaterial', 'ui.bootstrap.materialPicker']);

app.controller('AppCtrl', function($scope, $mdDialog, $mdSidenav, fileReader) {
  $scope.status = ' ';
  $scope.customFullscreen = false;
  //
  $scope.date_start = '';
  $scope.top_title = '';
  $scope.bottom_title = '';

  //
  $scope.imageSrc = '';
  $scope.nickname = '';

  $scope.records = getWalls();
  $scope.fonts = getFonts();

  $scope.getFiltered = function(x, idx) {
    //Set a property on the item being repeated with its actual index
    //return true only for every 1st item in 3 items
    return !((x._index = idx) % 3);
  }

  //banner url
  $scope.banner_url_click = 'https://bit.ly/40wnZKW';
  $scope.banner_url_image = 'https://down-vn.img.susercontent.com/file/vn-50009109-f7600d324ff1613fdae507d10d303c72';

  //init load
  //changePercent(parseInt(getDiffDate($scope.date_start)));
  //

  $scope.showAdvanced = function(ev) {

    // load date_start from db
    getDb().get('mydoc').then(function(doc) {
      // found data
      $scope.date_start = doc.date_start;
    }).catch(function(err) {
      // not found
      if (err.status == 404) {
        $scope.date_start = formatDate(new Date());
      }
    });
    //
    $scope.top_title = document.getElementById('top').innerText;
    $scope.bottom_title = document.getElementById('bottom').innerText;

    setTimeout(function() {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'view/wave_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        showClose: false,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      }).then(function(answer) {
        //$scope.status = 'You said the information was "' + answer + '".';
        console.log(answer);

        //update db
        updateWave({
          date_start: $scope.date_start,
          top_title: $scope.top_title,
          bottom_title: $scope.bottom_title
        });
        //
        loadWave($scope.date_start, $scope.top_title, $scope.bottom_title);
        //
        changePercent(parseInt(getDiffDate($scope.date_start)));
        //
      }, function() {
        //$scope.status = 'You cancelled the dialog.';
      });
    }, 100);
  };

  $scope.showAvatar = function(ev, type) {

    if (type == '1') {
      $scope.imageSrc = "img/no_avatar_male.jpg";
    } else if (type == '2') {
      $scope.imageSrc = "img/no_avatar_female.jpg";
    }

    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'view/avatar_dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      scope: $scope,
      preserveScope: true,
      showClose: false,
      clickOutsideToClose: true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    }).then(function(answer) {
      //$scope.status = 'You said the information was "' + answer + '".';
      // update db
      updateAvatar({
        avatar: $scope.imageSrc,
        type: type
      });
      //
      loadAvatar($scope.imageSrc, type);
    }, function() {
      //$scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.showNickname = function(ev, type) {

    if (type == '1') {
      $scope.nickname = document.getElementById('nickname_1').innerText;
    } else if (type == '2') {
      $scope.nickname = document.getElementById('nickname_2').innerText;
    }

    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'view/nickname_dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      scope: $scope,
      preserveScope: true,
      showClose: false,
      clickOutsideToClose: true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    }).then(function(answer) {
      //$scope.status = 'You said the information was "' + answer + '".';
      //update db
      updateNickname({
        nickname: $scope.nickname,
        type: type
      });
      loadNickname($scope.nickname, type);
    }, function() {
      //$scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.showWallpaper = function(ev) {
    //close nav
    $scope.toggleSidenav();
    //
    setTimeout(function() {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'view/wallpaper_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        showClose: false,
        clickOutsideToClose: true,
        fullscreen: false // Only for -xs, -sm breakpoints.
      }).then(function(answer) {
        //$scope.status = 'You said the information was "' + answer + '".';
        //update db
        updateWallpaper(answer);
        //
        console.log(answer);
        loadBG(answer);
      }, function() {
        //$scope.status = 'You cancelled the dialog.';
      });
    }, 200);
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

  $scope.$on("fileProgress", function(e, progress) {
    $scope.progress = progress.loaded / progress.total;
  });


  $scope.toggleSidenav = buildToggler('closeEventsDisabled');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }

  $scope.showFont = function(ev) {
    //close nav
    $scope.toggleSidenav();
    //
    setTimeout(function() {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'view/fonts_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        showClose: false,
        clickOutsideToClose: true,
        fullscreen: false // Only for -xs, -sm breakpoints.
      }).then(function(answer) {
        //$scope.status = 'You said the information was "' + answer + '".';
        //update db
        updateFont(answer);
        //
        loadFont(answer);
        console.log(answer);
      }, function() {
        //$scope.status = 'You cancelled the dialog.';
      });
    }, 200);
  };

  //color
  $scope.color = '#FFFFFF';

  $scope.showColor = function(ev, type) {
    //close nav
    $scope.toggleSidenav();
    //
    switch (type) {
      case '1':
        $scope.color = getColorDom('top');
        break;
      case '2':
        $scope.color = getColorDom('counter');
        break;
      case '3':
        $scope.color = getColorDom('bottom');
        break;
      case '4':
        $scope.color = getColorDom('nickname_1');
        break;
      case '5':
        $scope.color = getColorDom('nickname_2');
        break;
    }

    //
    setTimeout(function() {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'view/color_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        showClose: false,
        clickOutsideToClose: true,
        fullscreen: false // Only for -xs, -sm breakpoints.
      }).then(function(answer) {
        //$scope.status = 'You said the information was "' + answer + '".';
        //update db
        updateColor({
          color: $scope.color,
          type: type
        });
        //
        loadColor($scope.color, type);
        //console.log(answer);
      }, function() {
        //$scope.status = 'You cancelled the dialog.';
      })
    }, 200);
  };

  var show_count = 0;

  $scope.gotoUrl = function() {
    if (show_count == 0) {
      window.open('https://bit.ly/40wnZKW', '_blank');
      show_count++;
    }
  }


  $scope.showBannerDialog = function(ev) {

    //document.cookie = 'user_visible=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';//delete cookie

    var user_visible = false;
    //
    // var allcookies = document.cookie;
    // console.log(allcookies);
    // // Get all the cookies pairs in an array
    // cookiearray = allcookies.split(';');
    // // Now take key value pair out of this array
    // for (var i = 0; i < cookiearray.length; i++) {
    //   name = cookiearray[i].split('=')[0];
    //   value = cookiearray[i].split('=')[1];
    //   console.log("Key is : " + name + " and Value is : " + value);
    //   if (name.replace(' ', '') == 'user_visible' && value == 'true') {
    //     user_visible = true;
    //     break;
    //   }
    // }


    setTimeout(function() {
      console.log(user_visible);
      if (user_visible == false) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'view/banner_dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          scope: $scope,
          preserveScope: true,
          showClose: false,
          clickOutsideToClose: false,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function(answer) {
          //$scope.status = 'You said the information was "' + answer + '".';
          // update db
          // updateAvatar({avatar: $scope.imageSrc, type: type});
          // //
          // loadAvatar($scope.imageSrc, type);
          // var date = new Date();
          // let millseconds = date.getTime() + (10 * 60 * 1000);
          // date.setTime(millseconds); //expires after 10'
          //
          // document.cookie = "user_visible=" + "true" + ";";
          // document.cookie = "expires=" + date.toUTCString() + ";"
          //document.cookie = "max-age=" + millseconds + ";"
          //document.write("Setting Cookies : " + "name=" + cookievalue);
        }, function() {
          //$scope.status = 'You cancelled the dialog.';
        });
      }
    }, 200);
  };

  // $scope.ClickMeToRedirect = function(_url) {
  //   //var url = _url;
  //   //$log.log(url);
  //   $location.url(_url);
  // };

});

function getWalls() {
  var walls = [
    //   {"url": "/wallpaper/w_1.webp"},
    // {"url": "/wallpaper/w_1.webp"},
    // {"url": "/wallpaper/w_1.webp"},
    // {"url": "/wallpaper/w_1.webp"},
    // {"url": "/wallpaper/w_1.webp"}
  ];
  for (i = 1; i <= 258; i++) {
    walls.push({
      "url": "/wallpaper/w_" + i + ".webp"
    })
    //walls[i] = '/wallpaper/w_' + (i + 1) + '.webp';
  }
  return walls;
}

function getFonts() {
  var fonts = [
    "AmaticSC-Bold",
    "Aristonne",
    "BaseFiolexGirl",
    "BaseFutara",
    "BeautifulEveryTime",
    "Comfortaa-Regular",
    "ComicSans",
    "DancingScript-Regular",
    "HeraBig",
    "Kaileen_Bold",
    "Kingthings_Petrock",
    "Lobster-Regular",
    "Pacifico-Regular",
    "PatrickHand-Regular",
    "Play-Regular",
    "ProximaNova-Regular",
    "RixLoveFool",
    "Roboto",
    "SofiaBold",
    "Valentine",
    "ZemkeHand"
  ];
  return fonts;
}

//pick avatar
// app.controller('UploadController', function ($scope, fileReader) {
//
// });

app.directive("ngFileSelect", function(fileReader, $timeout) {
  return {
    scope: {
      ngModel: '='
    },
    link: function($scope, el) {
      function getFile(file) {
        fileReader.readAsDataUrl(file, $scope)
          .then(function(result) {
            $timeout(function() {
              $scope.ngModel = result;
            });
          });
      }

      el.bind("change", function(e) {
        var file = (e.srcElement || e.target).files[0];
        getFile(file);
      });
    }
  };
});

app.factory("fileReader", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});
