/* global io */
'use strict';

angular.module('colorwatchApp')
  .factory('Poll', function($resource) {
      return $resource('/api/polls/:id', {
      id: '@id'
    }, {
        // Use this method for getting a list of polls
        newpolls: {
          method: 'GET',
          params: {
            id: 'newpolls'
          }},
        getPoll: {
          method: 'GET',
          params: {
            id: '@id'
          },
          isArray: true
        },
        update: {
          method: 'PUT'
        },
        updateFinalForm: {
          method: 'PUT',
          params:{
            id: 'final'
          }
        }

      });
  })
  .factory('ColorCombs', function($resource) {
    return $resource('/api/colorcombs/:id', {}, {
        // Use this method for getting a list of polls
        getColorComb: {
          method: 'GET',
          isArray: true
        },
        create: {
          method: 'POST',
          params: {
            id: 'create',
            image_data: "@img_data",
            image_contentType: "image/png",
            textcolor: "@textcolor",
            backcolor: "@backcolor"
          }
        }
//FORTSÄTT HÄR!!!!
      });
  })
  .factory('socket', function(socketFactory) {
    //
    // MAYBE CHANGE THIS TO USE ROOTSCOPE INSTEAD OF SOCKETFACTORY
    //
    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var wrappedSocket = socketFactory({
      ioSocket: ioSocket
    });
    wrappedSocket.forward('error');
    return wrappedSocket;

  });
