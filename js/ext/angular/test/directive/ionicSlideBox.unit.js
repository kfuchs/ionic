/**
 * Test the side menu directive. For more test coverage of the side menu,
 * see the core Ionic sideMenu controller tests.
 */
describe('Ionic Angular Slide Box', function() {
  var el, compile, rootScope, timeout;

  beforeEach(module('ionic'));

  beforeEach(inject(function($compile, $rootScope, $timeout) {
    timeout = $timeout;
    rootScope = $rootScope;
    compile = $compile;

    el = $compile('<ion-slide-box>\
      <ion-slide>\
        <div class="box blue">\
          <h1>BLUE {{slideBox.slideIndex}}</h1>\
        </div>\
      </ion-slide>\
      <ion-slide>\
        <div class="box yellow">\
          <h1>YELLOW {{slideBox.slideIndex}}</h1>\
        </div>\
      </ion-slide>\
      <ion-slide>\
      <div class="box pink"><h1>PINK {{slideBox.slideIndex}}</h1></div>\
      </ion-slide>\
    </ion-slide-box>')($rootScope);
  }));

  it('should register with $ionicSlideBoxDelegate', inject(function($compile, $rootScope, $ionicSlideBoxDelegate) {
    var deregisterSpy = jasmine.createSpy('deregister');
    spyOn($ionicSlideBoxDelegate, '_registerInstance').andCallFake(function() {
      return deregisterSpy;
    });
    var el = $compile('<ion-slide-box delegate-handle="superHandle">')($rootScope.$new());
    $rootScope.$apply();

    expect($ionicSlideBoxDelegate._registerInstance)
      .toHaveBeenCalledWith(el.controller('ionSlideBox').__slider, 'superHandle');

    expect(deregisterSpy).not.toHaveBeenCalled();
    el.scope().$destroy();
    expect(deregisterSpy).toHaveBeenCalled();
  }));
});

describe('ionSlideBox with active slide', function() {
  beforeEach(module('ionic'));

  it('Should set initial active slide', inject(function($ionicSlideBoxDelegate, $rootScope, $compile) {
    el = $compile('<ion-slide-box active-slide="2">\
      <ion-slide>\
        <div class="box blue">\
          <h1>BLUE {{slideBox.slideIndex}}</h1>\
        </div>\
      </ion-slide>\
      <ion-slide>\
        <div class="box yellow">\
          <h1>YELLOW {{slideBox.slideIndex}}</h1>\
        </div>\
      </ion-slide>\
      <ion-slide>\
      <div class="box pink"><h1>PINK {{slideBox.slideIndex}}</h1></div>\
      </ion-slide>\
    </ion-slide-box>')($rootScope.$new());

   var scope = el.scope();
   scope.$apply();
   expect($ionicSlideBoxDelegate.currentIndex()).toBe(2);
  }));
});
