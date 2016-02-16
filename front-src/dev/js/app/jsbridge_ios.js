;(function()
{
	if( window.JSBridge )
		return;

	var PROTOCOL_SCHEME = 'JSBRIDGE';
	var PROTOCOL_MESSAGE = '_JSBRIDGE_MESSAGE_';

	var messageIframe;	// 메세지 전송용 iframe ( URL 호출용도 )
	var queueSendMessage = [];
	var queueReceiveMessage = [];
	var lstMessageHandler = {};

	var lstResponseCallback = {};
	var uuid = 1;

	function _createQueueReadyIframe( doc )
	{
		messageIframe = doc.createElement( 'iframe' );
		messageIframe.style.display = 'none';
		messageIframe.src = PROTOCOL_SCHEME + '://' + PROTOCOL_MESSAGE;
		doc.documentElement.appendChild( messageIframe );
	}

	function init( messageHandler )
	{
		var doc = document;
		_createQueueReadyIframe( doc );

		console.log( 'JSBridge.init' );
		if( JSBridge._messageHandler )
		{
			throw new Error( 'JSBridge.init called twice' );
		}

		JSBridge._messageHandler = messageHandler;
		var lstReceiveMessage = queueReceiveMessage;
		queueReceiveMessage = null;

		for( var i=0; i<lstReceiveMessage.length; i++ )
		{
			_dispatchMessageFromObjC( lstReceiveMessage[i] );
		}
	}

	function send( data, responseCallback )
	{
		_doSend( {data:data}, responseCallback );
	}

	function registerHandler( handlerName, handler )
	{
		lstMessageHandler[handlerName] = handler;
	}

	function callHandler( handlerName, data, responseCallback )
	{
		_doSend( {handlerName:handlerName, data:data}, responseCallback );
	}

	function _doSend( message, responseCallback )
	{
		//console.log( '_doSend :[', message.handlerName, '] :', message.data );
		if( responseCallback )
		{
			var callbackId = 'cb_'+(uuid++)+new Date().getTime();
			lstResponseCallback[callbackId] = responseCallback;
			message['callbackId'] = callbackId;
		}
		queueSendMessage.push( message );
		messageIframe.src = PROTOCOL_SCHEME + '://' + PROTOCOL_MESSAGE;
	}

	function _fetchQueue()
	{
		//console.log( '_fetchQueue() by ObjC' );
		var messageQueryString = JSON.stringify( queueSendMessage );
		queueSendMessage = [];
		return messageQueryString;
	}

	function _dispatchMessageFromObjC( jsonString )
	{
		//console.log( '_dispatchMessageFromObjC : ', jsonString );
		setTimeout( function _timeoutDispatchMessageFromObjC()
		{
			var msg = JSON.parse( jsonString );
			var msgHandler;
			var responseCallback;

			if( msg.responseId )
			{
				responseCallback = lstResponseCallback[msg.responseId];
				if( !responseCallback )
					return;

				responseCallback( msg.responseData );
				delete lstResponseCallback[msg.responseId];
			}
			else
			{
				if( msg.callbackId )
				{
					var callbackResponseId = msg.callbackId;
					responseCallback = function( responseData )
					{
						_doSend( {responseId:callbackResponseId, responseData:responseData} );
					}
				}

				var handler = JSBridge._messageHandler;

				if( msg.handlerName )
					handler = lstMessageHandler[msg.handlerName];

				//console.log( '_dispatchMessageFromObjC 핸들러 :  ', handler );

				try
				{
					handler( msg.data, responseCallback );
				}
				catch( exception )
				{
					if( typeof console != 'undefined' )
					{
						console.log( "JSBridge : WARNING : 핸들러 파라미터중 responseCallback 체크한후 있으면 호출해야됨", msg, exception );
					}

				}

			}
		});
	}

	function _handleMessageFromObjC( objMessage )
	{
		//console.log( '_handleMessageFromObjC : ', objMessage );
		if( queueReceiveMessage )
			queueReceiveMessage.push( objMessage );
		else
			_dispatchMessageFromObjC( objMessage );
	}

	window.JSBridge =
	{
		init : init,
		send : send,
		registerHandler : registerHandler,
		callHandler : callHandler,
		_fetchQueue : _fetchQueue,
		_handleMessageFromObjC: _handleMessageFromObjC,
		lstMessageHandler : lstMessageHandler
	};

	var doc = document;
	//_createQueueReadyIframe( doc );
	var readyEvent = doc.createEvent( 'Events' );
	readyEvent.initEvent( 'JSBridgeReady' );
	readyEvent.bridge = JSBridge;
	doc.dispatchEvent( readyEvent );

	console.log( "JSBridge ready" );



})();