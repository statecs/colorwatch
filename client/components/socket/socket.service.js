/* global io */
'use strict';

angular.module('colorwatchApp')
  .factory('Poll', function($resource) {
      return $resource('/api/polls/:pollId', {}, {
        // Use this method for getting a list of polls
        query: { method: 'GET', params: { pollId: 'list' }, isArray: true }
      });
  })
  .factory('socket', function(socketFactory) {
    //
    // MAYBE CHANGE THIS TO USE ROOTSCOPE INSTEAD OF SOCKETFACTORY
    //
    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('localhost:9000', {
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
