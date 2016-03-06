'use strict';

describe("E2E: Main view", function() {

  beforeEach(function() {
   browser.get('http://localhost:9000/');
  });

  it('should have a working start button that starts test when clicked', function() {
     element(by.id('linkStartTest')).click();
     expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/test/1');
  });
  it('should have working nav menu', function(){});
  it('changes active link and aplies .active class depending on route', function(){});

});

/*it('should have a working nav menu directive apply it\'s logic to the page', function() {
   expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/#/');
   expect(element(by.cssContainingText('.page1-container', 'Home')));
 });
it('changes active link and applies .active class depending on route', function() {
     var activeListItem = element(by.css('.active'));
     var linkClass = activeListItem.findElement(by.css('ul.navbar li a'));
     expect(linkClass.getAttribute('class').toEqual('.page1');

     var infoLink = element(by.css('.page2'));
     infoLink.click();
     expect(linkClass.getAttribute('class').toEqual('.page2');
  })
*/
