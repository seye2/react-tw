// 인터페이스 리스트.
BRIDGE_INTERFACE_LIST = {};

// Unknown 용 인터페이스 정의( 데스크탑 웹브라우저 등 테스트용. )
;(function()
{
    // 테스트용 데이터 정의
    var _bridge =
    {
        userIdx : "-1", //web에서 shop-list(main)사용시 userIdx를 검색해 올 수 없는 경우 -1를 넘겨 준다.
        userId : "테스트ID",
        userInfo :
        {
            saved_min : 999,
            checkin_Time : new Date(),
            bluetooth : true,
            saving_min : 55,
            checkUpdate_Time : new Date(),
            checkin_Shop_Idx : 999,
            Checkin_Shop_Name : "신한은행",
            gps : true,
            checkin_Status : false
        },
        deviceInfo :
        {
            deviceID : "데스크탑용 deviceID",
            appID : "데스크탑용 appID",
            deviceOrgID : "데스크탑용 deviceID",
            appOrgID : "데스크탑용 appID",
        },
        userOption :
        {
            bPushEnabled : true
        }
    };

    var name = "interface_unknown";
    function init()
    {
        console.log( '테스트 데이터 모드 설정' );
    }

    // sendEmail
    function sendEmail( emailAddress )
    {
        console.log( '이메일보내기' );
    }

    // getUserIdx
    function getUserIdx( callback )
    {
        callback( _bridge.userIdx );
    }

    // clearHistory
    function clearHistory()
    {
        return console.log( 'clearHistory' );
    }

    // setUserIdx
    function setUserIdx( idx,bMove )
    {
        _bridge.userIdx = idx;
        window.location="#/shop-list";
    }

    // getUserInfo
    function getUserInfo( callback )
    {
        callback( _bridge.userInfo );
    }

    // getUserId
    function getUserId( callback )
    {
        callback( _bridge.userId );
    }

    // getDeviceInfo
    function getDeviceInfo( callback )
    {
        callback( _bridge.deviceInfo );
    }

    // setUserId
    function setUserId( idx )
    {
        console.log( "setUserId : ", idx );
    }

    // updateUserInfo
    function updateUserInfo( info )
    {
        console.log( "updateUserInfo : ", info );
    }

    // checkGpsState
    function checkGpsState( callback )
    {
        callback( false );
    }

    // startGps
    function startGps()
    {
    }

    // getLocation
    function getLocation( callback )
    {
        console.log( "desktop:getLocation" );
        var loc = { lati:37.498019, longi:127.024659 };
        callback( loc );
    }

    // openSnsPopup
    function openSnsPopup()
    {
        console.log( "openSnsPopup" );
    }

    // requestPay
    function requestPay()
    {
        console.log( "requestPay" );
    }

    // call
    function call( number )
    {
        console.log( 'call : ', number );
    }

    function getUserState()
    {
        return 1;
    }

    function getUserPhone()
    {
        return "01034438873";
    }

    function toast( msg )
    {
        console.log( 'toast : ', msg );
    }

    function openAgreementPage()
    {
        console.log( '이용약관 페이지 이동' );
        alert( 'PC에서는 이용약관 페이지로 이동할 수 없습니다' );
    }

    function useCouponByBeacon( info )
    {
        console.log( 'useCouponByBeacon : ', info );
    }

    function useCouponByPassword( info )
    {
        console.log( 'useCouponByPassword : ', info );
    }

    function useCouponOnWebShop( info )
    {
        console.log( 'useCouponOnWebShop : ', info );
    }

    function setPushEnable( bEnable )
    {
        _bridge.userOption.bPushEnabled = bEnable;
        console.log( 'setPushEnable : ', bEnable );
    }

    function getPushEnable( callback )
    {
        callback( _bridge.userOption.bPushEnabled );
    }

    function unregister()
    {
        console.log( '회원탈퇴 처리 완료' );
        alert( 'PC에서는 이용약관 페이지로 이동할 수 없습니다' );
    }

    function appAlert( info )
    {
        alert( info.msg );
    }


    interface_unknown =
    {
        name : name,
        init : init,
        getUserIdx : getUserIdx,
        clearHistory : clearHistory,
        getUserInfo : getUserInfo,
        getUserId : getUserId,
        getDeviceInfo : getDeviceInfo,
        setUserId : setUserId,
        updateUserInfo : updateUserInfo,
        checkGpsState : checkGpsState,
        sendEmail : sendEmail,
        openSnsPopup : openSnsPopup,
        requestPay : requestPay,
        call : call,
        getUserState : getUserState,
        startGps : startGps,
        getLocation : getLocation,
        getUserPhone : getUserPhone,
        toast : toast,
        setUserIdx : setUserIdx,
        openAgreementPage : openAgreementPage,
        useCouponByBeacon : useCouponByBeacon,
        useCouponByPassword : useCouponByPassword,
        useCouponOnWebShop : useCouponOnWebShop,
        setPushEnable : setPushEnable,
        getPushEnable : getPushEnable,
        unregister : unregister,
        appAlert : appAlert
    };
    BRIDGE_INTERFACE_LIST["unknown"] = interface_unknown;

})();

// Android 용 인터페이스 정의
;(function()
{
    var name = "interface_android";
    var _bridge;

    // 초기화 및 브릿지 설정.
    function init()
    {
        // 브릿지에 자바스크립트 인터페이스 연결.
        if( window.TimeWallet )
            _bridge = window.TimeWallet;
        else
            console.log( '안드로이드 자바스크립트 인터페이스를 찾을 수 없습니다' );

        console.log( '안드로이드 인터페이스 설정' );

        /*
         * 웹용
         * 남동훈 지워야함
         */
        _bridge={
            getUserIdx:function() {
                return 1;
            },
            getLocation:function() {

            },
            getLatitude:function() {
                return '37.498019';
            },
            getLongitude:function() {
                return '127.024659';
            }
        }

    }
    ///////////////////////////////////////////////////////////////////////////
    /// Android API ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // getUserIdx
    function getUserIdx( callback )
    {
        var userIdx =  _bridge.getUserIdx();
        callback( userIdx );
    }

    function getUserId( callback )
    {
        var userId = _bridge.getUserId();
        callback( userId );
    }

    // clearHistory
    function clearHistory()
    {
        _bridge.clearHistory();
    }

    // getUserInfo
    function getUserInfo( callback )
    {


        var strJson = _bridge.getUserInfo();

        var info = JSON.parse( strJson );

        callback( info );
    }

    // getDeviceInfo
    function getDeviceInfo( callback )
    {
        var deviceId = _bridge.getDeviceId();
        var appId = _bridge.getAppId();
        var deviceOrgId = _bridge.getOrgDeviceID();
        var appOrgId = _bridge.getOrgAppId();

        var deviceInfo =
        {
            appID : appId,
            appOrgID : appOrgId,
            deviceID : deviceId,
            deviceOrgID : deviceOrgId
        }
        callback( deviceInfo );
    }

    // setUserIdx
    function setUserIdx( userIdx )
    {
        _bridge.setUserIdx( userIdx );
    }

    // updateUserInfo
    function updateUserInfo( info )
    {
        _bridge.updateUserInfo( info );
    }

    // checkGpsState
    function checkGpsState( callback )
    {
        var state = _bridge.canGetLocation();
        callback( state );
    }

    // startGPS
    function startGps()
    {
        console.log(_bridge);
        _bridge.getLocation();
    }

    // getLocation
    function getLocation( callback )
    {
        var loc =
        {
            lati : _bridge.getLatitude(),
            longi : _bridge.getLongitude()
        };
        callback( loc );
    }

    function sendEmail( emailAddress )
    {
        alert( "자바스크립트 인터페이스 연결 필요" );
    }

    function openSnsPopup()
    {
        // sns 공유 클릭시...
        _bridge.openSnsPopup();
    }

    function requestPay(   )
    {
        _bridge.requestPay();
    }

    function call( number )
    {

    }

    function getUserState( callback )
    {
        console.log(_bridge.getUserState());
        var userState = _bridge.getUserState();
        callback( userState );
    }

    function getUserPhone( callback )
    {
        var phoneNumber = _bridge.getUserPhone();
        callback( phoneNumber );
    }

    function toast( msg )
    {
        console.log( '토스트 테스트 : ', msg );

        window.TimeWallet.toast( msg );
//	_bridge.toast( msg );
    }

    function openAgreementPage()
    {
        _bridge.openAgreementPage();
    }

    function useCouponByBeacon( info )
    {
        _bridge.useCouponByBeacon( info.shopIdx, info.couponCode );//, info.beaconUUID, info.beaconMajor, info.beaconMinor );
    }

    function useCouponByPassword( info )
    {
        _bridge.useCouponByPassword( info.shopIdx, info.couponCode );
    }

    function useCouponOnWebShop( info )
    {
        _bridge.useCouponOnWebShop( info.shopIdx, info.couponCode, info.shopName, info.couponName, info.couponNumber, info.shopUrl );
    }

    function setPushEnable( bEnable )
    {
        _bridge.setPushEnable( bEnable );
    }

    function getPushEnable( callback )
    {
        var bEnabled = _bridge.getPushEnable();
        callback( bEnabled );
    }

    function unregister()
    {
        _bridge.unregister();
    }

    function appAlert( info )
    {
        _bridge.alert( info.title, info.msg );
    }

    // public API
    interface_android =
    {
        name : name,
        init : init,
        clearHistory : clearHistory,
        getUserIdx : getUserIdx,
        getUserId : getUserId,
        getUserInfo : getUserInfo,
        getDeviceInfo : getDeviceInfo,
        setUserIdx : setUserIdx,
        updateUserInfo : updateUserInfo,
        checkGpsState : checkGpsState,
        startGps : startGps,
        getLocation : getLocation,
        sendEmail : sendEmail,
        openSnsPopup : openSnsPopup,
        requestPay : requestPay,
        call : call,
        getUserState : getUserState,
        getUserPhone : getUserPhone,
        toast : toast,
        openAgreementPage : openAgreementPage,
        useCouponByBeacon : useCouponByBeacon,
        useCouponByPassword : useCouponByPassword,
        useCouponOnWebShop : useCouponOnWebShop,
        setPushEnable : setPushEnable,
        getPushEnable : getPushEnable,
        unregister : unregister,
        appAlert : appAlert
    };
    BRIDGE_INTERFACE_LIST["android"] = interface_android;

})();

// iOS 용 인터페이스 정의
;(function()
{
    var name = "interface_ios";
    var _bridge;

    // 초기화 함수.
    function init()
    {
        window.performance = window.performance || {};
        window.performance.now = window.performance.now || ( function()
            {
                var st = Date.now();
                return function(){ return Date.now() - st ;}
            } )() ;

        if( window.JSBridge )
        {
            // iOS 자바스크립트 브릿지 연결 및 디폴트 핸들러 정의
            JSBridge.init( function( msg, callback )
            {
                console.log( '디폴트 핸들러는 쓰지 않습니다 : ', msg );
                callback( {msg:msg, error:'디폴트 핸들러는 쓰지 않습니다'} );
            });
            console.log( 'iOS 자바스크립트 브릿지 연결' );
            _bridge = JSBridge;
        }
        else
        {
            console.log( "아이폰 자바스크립트 브릿지를 찾을 수 없습니다" );
            document.addEventListener( "JSBridgeReady", function()
            {
                _bridge = JSBridge;
            });
        }

        /*
         * 웹용
         * 남동훈 지워야함
         */
        _bridge={
            callHandler:function(str,obj,callback) {
                if(str=='getLocation') {
                    var _obj={
                        lati:'37.498019',
                        longi:'127.024659'

                    };
                    callback(_obj);
                }
            }
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    /// iOS API ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // getUserIdx
    function getUserIdx( callback )
    {
        _bridge.callHandler( "getUserIdx", {}, callback );
    }

    // clearHistory
    function clearHistory()
    {
        // iOS 경우 꽁수로 할 수 있는데 reject 사유가 된다.
        // app  쪽에서는 구현 하지 않음.( 빈함수 )
        _bridge.callHandler( "clearHistory" );
    }

    // getStatusBarInfo
    function getUserInfo( callback )
    {
        _bridge.callHandler( "getUserInfo", {}, callback );
    }

    // getDeviceInfo
    function getDeviceInfo( callback )
    {
        _bridge.callHandler( "getDeviceInfo", {}, callback );
    }

    // setUserIdx
    function setUserIdx( userIdx )
    {
        _bridge.callHandler( "setUserIdx", {userIdx:userIdx} );
    }

    // updateUserInfo
    function updateUserInfo( userInfo )
    {
        _bridge.callHandler( "updateUserInfo", {userInfo:userInfo} );
    }

    // getUserId
    function getUserId( callback )
    {
        _bridge.callHandler( "getUserId", {}, callback );
    }

    // checkBluetoothState
    function checkBluetoothState( callback )
    {
        _bridge.callHandler( "checkBluetoothState", {}, callback );
    }

    // checkGpsState 
    function checkGpsState( callback )
    {
        _bridge.callHandler( "checkGpsState", {}, callback );
    }

    // startGps => GPS 서비스 시작
    function startGps()
    {
        _bridge.callHandler( "startGps" );
    }

    // getLocation => {}.lati, {}.longi
    function getLocation( callback )
    {
        _bridge.callHandler( "getLocation", {}, callback );
    }

    function sendEmail( emailAddress )
    {
        _bridge.callHandler( "sendEmail", { emailAddress:emailAddress }, function(){} );
    }

    function openSnsPopup()
    {
        _bridge.callHandler( "openSnsPopup", {}, function(){} );
    }

    function  requestPay(  )
    {
        _bridge.callHandler( "requestPay", {}, function(){} );
    }

    function call( number )
    {
        _bridge.callHandler( "call", {number:number}, function(){} );
    }

    function getUserState( callback )
    {
        _bridge.callHandler( "getUserState", {}, callback );
    }

    function getUserPhone( callback )
    {
        _bridge.callHandler( "getUserPhone", {}, callback );
    }

    function toast( msg )
    {
        _bridge.callHandler( "toast", {msg:msg}, function(){} );
    }

    function openAgreementPage()
    {
        _bridge.callHandler( "openAgreementPage", {}, function(){} );
    }

    function useCouponByBeacon( info )
    {
        _bridge.callHandler( "useCouponByBeacon", info, function(){} );
    }

    function useCouponByPassword( info )
    {
        _bridge.callHandler( "useCouponByPassword", info, function(){} );
    }

    function useCouponOnWebShop( info )
    {
        _bridge.callHandler( "useCouponOnWebShop", info, function(){} );
    }

    function setPushEnable( bEnable )
    {
        _bridge.callHandler( "setPushEnable", {pushEnable:bEnable}, function(){} );
    }

    function getPushEnable( callback )
    {
        _bridge.callHandler( "getPushEnable", {}, callback );
    }

    function unregister()
    {
        _bridge.callHandler( "unregister", {}, function(){} );
    }

    function appAlert(info)
    {
        _bridge.callHandler( "alert", info, function(){} );
    }

    // public
    interface_ios =
    {
        name : name,
        init : init,
        clearHistory : clearHistory,
        getUserIdx : getUserIdx,
        getUserId : getUserId,
        getUserInfo: getUserInfo,
        getDeviceInfo : getDeviceInfo,
        setUserIdx : setUserIdx,
        updateUserInfo : updateUserInfo,
        checkGpsState : checkGpsState,
        startGps : startGps,
        getLocation : getLocation,
        sendEmail : sendEmail,
        openSnsPopup : openSnsPopup,
        requestPay : requestPay,
        call : call,
        getUserState : getUserState,
        getUserPhone : getUserPhone,
        toast : toast,
        openAgreementPage : openAgreementPage,
        useCouponByBeacon : useCouponByBeacon,
        useCouponByPassword : useCouponByPassword,
        useCouponOnWebShop : useCouponOnWebShop,
        setPushEnable : setPushEnable,
        getPushEnable : getPushEnable,
        unregister : unregister,
        appAlert : appAlert
    };
    BRIDGE_INTERFACE_LIST["ios"] = interface_ios;

})();

USER_STATE = { NORMAL: 1, READY_LEAVE: 2, LEAVED: 3, BLOCKED: 4 };
;(function()
{
    var deviceType; // 디바이스 종류 : Android, iOS, Unknown
    var method;     // 디바이스별 인터페이스 객체 연결용.

    // 유저 정보.
    var userInfo =
    {
        bLogined : false,
        index : 0,
        ID : "",
        state : USER_STATE.NORMAL,
        email : "",
        min : 0,
        regDate : 0,
        phone: ""
    };

    var deviceInfo =
    {
        deviceID : "", // 서버로 부터 읽는 값
        appID : "", // 서버로 부터 읽는 값
        deviceOrgID : "", // 기기로 부터 읽는 값
        appOrgID : "" // 기기로 부터 읽는 값
    };

    var _chkDevice =
    {
        Android : function(){ return navigator.userAgent.match(/Android/i); },
        BlackBerry : function(){ return navigator.userAgent.match(/BlackBerry/i); },
        iOS : function(){ return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
        Opera : function() { return navigator.userAgent.match(/Opera Mini/i); },
        Windows : function(){ return navigator.userAgent.match(/IEMobile/i); },
        Mobile : function(){ return (chkDevice.Android() || chkDevice.BlackBerry() || chkDevice.iOS() || chkDevice.Opera() || chkDevice.Windows()); }
    };

    // 기기 종류 체크( 아이폰, 안드로이드, 불명 )
    function _checkDeviceType()
    {
        if(  _chkDevice.Android() )
            deviceType = "android";
        else if( _chkDevice.iOS() )
            deviceType = "ios";
        else
            deviceType = "unknown";

        console.log( '_checkDeviceType : ', deviceType );
        return deviceType;
    }

    function _setInterface()
    {
        method = BRIDGE_INTERFACE_LIST[deviceType];
        console.log( "_setInterface : ", method );
        method.init(); // 각 인터페이스 초기화
    }

    function init()
    {
        BRIDGE.deviceType = _checkDeviceType();
        _setInterface();
    }

    // getUserIdx
    function getUserIdx( cb ){ method.getUserIdx( cb ); }

    // getUserId
    function getUserId( cb ){ method.getUserId( cb ); }

    // clearHistory
    function clearHistory(){ method.clearHistory(); }

    // getUserInfo
    function getUserInfo( cb )
    {
        method.getUserInfo( function( info )
        {
            cb(info);
        });
    }

    // getDeviceInfo
    function getDeviceInfo( cb ){ method.getDeviceInfo( cb ); }

    // setUserIdx
    function setUserIdx( userIdx ){
        method.setUserIdx( userIdx );
    }

    // updateUserInfo
    function updateUserInfo( userInfo )
    {
        //비콘 연결 상태 UI 확인
        //console.log( userInfo.checkin_Status); // ui q
        var checkState = 3,
            timer=null;
        clearTimeout(timer);

        if( userInfo.bluetooth == false )
            checkState = 2;
        else if( userInfo.checkin_Status == 1)
            checkState = 1;

        console.log( 'checkState : ', checkState );
        console.log( 'checkin_Status : ', userInfo.checkin_Status );

        /*
        var clsStatus=timewalletCommonUi.getConnectStatus(checkState);
        jQuery('.header .mini').removeClass('checkin').removeClass('checkout').removeClass('find-beacon')
            .addClass(clsStatus);

        jQuery('.header .mini .msg-type2').find('strong').eq(0).text(userInfo.Checkin_Shop_Name)
            .end()
            .eq(1).text(userInfo.checkin_Time);

        jQuery('.header .mini .min span').text(userInfo.saving_min);
        */

        // 앙케이트 팝업 출력해야됨. 체크아웃 후 10초뒤 앙케이트팝업 출력.
        /*
         if( checkState == 3 && timewalletCommonUi.userIdx == 2 ) {
         timer=setTimeout( function(){ timewalletUi.openSurveyingPopup( '1000' )}, 5000 );
         }
         */
    }

    // checkBluetoothState
    function checkBluetoothState( cb ){ method.checkBluetoothState( cb ); }

    // checkGpsState
    function checkGpsState( cb ){ method.checkGpsState( cb ); }

    // startGps
    function startGps(){ method.startGps(); }

    // getLocation
    function getLocation( cb ){ method.getLocation( cb ); }

    // sendEmail
    function sendEmail( emailAddress ){ method.sendEmail( emailAddress ); }

    // openSnsPopup
    function openSnsPopup(){ method.openSnsPopup(); }

    // requestPay
    function requestPay(){ method.requestPay(); }

    // call
    function call( number ){ method.call( number ); }

    // getUserState
    function getUserState( cb ){ method.getUserState( cb ); }

    // getUserPhone
    function getUserPhone( cb ){ method.getUserPhone( cb ); }

// toast
    function toast( msg ){ method.toast( msg ); }

    // 결제 비콘을 찾았을 경우
    function succeedFindingPayBeacon( beaconInfo )
    {
        // beaconInfo.UUID
        // beaconInfo.MAJOR
        // beaconInfo.MINOR
        console.log( '결제 비콘 정보 : ' , beaconInfo );
    }

    // 결제 비콘찾기 타임아웃 시 
    function timeoutFindingPayBeacon()
    {
        console.log( '결제 비콘 찾기 시간초과' );
    }

    function openAgreementPage()
    {
        method.openAgreementPage();
    }

    function useCouponByBeacon( info )
    {
        method.useCouponByBeacon( info );
    }

    function useCouponByPassword( info )
    {
        method.useCouponByPassword( info );
    }

    function useCouponOnWebShop( info )
    {
        method.useCouponOnWebShop( info );
    }

    function setPushEnable( bEnable )
    {
        method.setPushEnable( bEnable );
    }

    function getPushEnable( cb ){ method.getPushEnable( cb ); }

    function unregister(){ method.unregister(); }

    function appAlert( info ){ method.appAlert(info); }

    BRIDGE =
    {
        deviceType : deviceType,
        init : init,
        method : method,
        clearHistory : clearHistory,

        getUserIdx : getUserIdx,
        getUserId : getUserId,
        getUserInfo : getUserInfo,
        getDeviceInfo : getDeviceInfo,

        // 계정 생성시 1회용
        setUserIdx : setUserIdx,

        // 사용자 정보 설정
        updateUserInfo : updateUserInfo,

        // gps
        checkGpsState : checkGpsState,
        startGps : startGps,
        getLocation : getLocation,
        sendEmail : sendEmail,
        openSnsPopup : openSnsPopup,
        requestPay : requestPay,
        call : call,
        getUserState : getUserState,
        getUserPhone : getUserPhone,
        toast : toast,
        _checkDeviceType : _checkDeviceType,
        openAgreementPage : openAgreementPage,
        useCouponByBeacon : useCouponByBeacon,
        useCouponByPassword : useCouponByPassword,
        useCouponOnWebShop : useCouponOnWebShop,
        setPushEnable : setPushEnable,
        getPushEnable : getPushEnable,
        unregister : unregister,
        appAlert : appAlert
    };
})();

//console.log( 'Bridge.js : document.ready : BRIDGE.init()' );
//BRIDGE.init();
