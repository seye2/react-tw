/*********************************************************************************
 * 비밀번호 찾기 class
 * html template
 *********************************************************************************/
var MemberSearchPassword = React.createClass({displayName: "MemberSearchPassword",
    mail:'',
    phone:'',
    authNum:'',
    authIdx:'',
    authType:'5', //1 회원가입, 2 로그인, 3 회원탈퇴, 4 재가입, 5. 비밀번호 찾기
    componentDidMount : function () {
        var _this = this;

        // 전화번호 인증.
        jQuery('.cert .btn-modal-cert').on('tap',function(e) {
            e.stopPropagation();

            jQuery('.modal.modal-cert .num-area input').val('');
            var _phone=jQuery('.cert .phone').val();
            if(twMember.getValidPhone(_phone)) {
                //correct phone number next step(certification)
                console.log('correct phone number next step');

                //sms certification send
                reqwest({
                    url: loc[2].api[2], //SMS 회원 로그인용 인증번호 발송
                    method:loc[2].method,
                    type: loc[2].type,
                    data:{
                        'auth_phone':_phone
                    }
                })
                    .then(function (resp) {
                        console.log(resp);
                        /*************************
                         resp.ResultCode
                         '1'=success
                         '-1'=fail
                         modal-auth-exceeds
                         *************************/
                        //인증하기 버튼 5번 이상 클릭 하면 대기시간 10분
                        if (resp[0].ResultCode == '1') {
                            /*
                             initialize modal-cert
                             1. setValidTime
                             2. modalShow
                             3. btn-confirm
                             */
                            /* set valid time*/
                            _this.authIdx=resp[0].auth_idx;

                            twCommonUi.setValidTime('.valid .time', 1, function () {
                                /* 입력 시간이 지난 후 콜백 실행 */
                                //console.log('입력시간이 초과되었습니다.');
                                twCommonUi.stopValidTime('.valid .time');
                                jQuery('.modal.modal-cert .time-area .text-type4').hide();
                                jQuery('.modal.modal-cert .overtime').show();
                                jQuery('.modal.modal-cert .btn-confirm').off('tap').css({'opacity': 0.5});
                            });

                            jQuery('.modal.modal-cert .time-area .text-type4').hide();

                            jQuery('.modal.modal-cert .phone').text(_phone);
                            twCommonUi.showModal(jQuery('.modal.modal-cert'));

                            // SMS 인증번호 확인
                            jQuery('.modal.modal-cert .btn-confirm').css({'opacity':1}).on('tap', function (e) {
                                e.stopPropagation();
                                var _$certInput = jQuery('.modal.modal-cert .num-area input'),
                                //_authNum = _$certInput.eq(0).val().toString() + _$certInput.eq(1).val().toString() + _$certInput.eq(2).val().toString() + _$certInput.eq(3).val().toString() + _$certInput.eq(4).val().toString();
                                    _authNum = _$certInput.val().toString();

                                if (_authNum.length < 5) { //인증번호 4자리 입력 체크
                                    jQuery('.modal.modal-cert .time-area .text-type4').hide();
                                    jQuery('.modal.modal-cert .time-area .lack-length').show();
                                } else {
                                    //sms certification send
                                    reqwest({
                                        url: loc[2].api[1], //SMS 인증번호 확인
                                        method: loc[2].method,
                                        type: loc[2].type,
                                        data: {
                                            'auth_idx': _this.authIdx,
                                            'auth_phone': _phone,
                                            'auth_num': _authNum,
                                            'auth_type': _this.authType
                                        }
                                    })
                                        .then(function (resp) {
                                            console.log(resp);
                                            /*************************
                                             resp.ResultCode
                                             '1'=success
                                             '-1'=fail
                                             *************************/
                                            if (resp[0].ResultCode == '1') {
                                                _this.authIdx = _this.authIdx;
                                                _this.authNum =_authNum;
                                                _this.phone = _phone;

                                                jQuery('.header').data('authNum',_this.authNum); // twCommonUi=>regionAccordion에서 쓰임

                                                twCommonUi.stopValidTime('.valid .time');

                                                twCommonUi.hideModal(jQuery('.modal.modal-cert'));
                                                setTimeout(function () {
                                                    twCommonUi.showModal(jQuery('.modal.modal-cer-complete'));
                                                }, 300);

                                            } else if (resp.ResultCode == '-30000') { //이전 sms 인증번호 입력 시
                                                twCommonUi.stopValidTime('.valid .time');
                                                jQuery('.modal.modal-cert .time-area .text-type4').hide();
                                                jQuery('.modal.modal-cert .time-area .error-number').show();

                                            } else if (resp[0].ResultCode == '-50001') { //인증번호 5번 이상 실패시 코드 번호는?
                                                twCommonUi.stopValidTime('.valid .time');
                                                jQuery('.modal.modal-cert .time-area .text-type4').hide();
                                                jQuery('.modal.modal-cert .time-area .wrong-typing').show();
                                                jQuery('.modal.modal-cert .btn-confirm').off('tap').css({'opacity':0.5});
                                            } else if (resp[0].ResultCode == '-1') { //실패
                                                twCommonUi.stopValidTime('.valid .time');
                                                jQuery('.modal.modal-cert .time-area .text-type4').hide();
                                                jQuery('.modal.modal-cert .time-area .error-number').show();
                                                jQuery('.modal.modal-cert .num-area input').val('');
                                            }
                                        })
                                        .fail(function (err, msg) {
                                            console.log(err);
                                            jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
                                        });
                                }
                            });
                        } else if (resp[0].ResultCode == '-40005') { //이미 존재하는 유저
                            var _$modal=jQuery('.modal.modal-already-reg');
                            _$modal.find('.message .text-type2').text(_phone);

                            twCommonUi.showModal(_$modal);

                            _$modal.find('.btn-type1').on('tap',function(e){
                                e.stopPropagation();
                                twCommonUi.hideModal(_$modal);
                                //재가입 가능한 api데이터?
                            });

                            _$modal.find('.btn-type2').on('tap',function(e){
                                e.stopPropagation();
                                twCommonUi.hideModal(_$modal);
                                location.href='#/member-re-join';
                            });
                        } else if (resp[0].ResultCode == '-50001') { //인증하기 5번 클릭 시 10분 블럭
                            var _$modal=jQuery('.modal.modal-auth-exceeds');
                            twCommonUi.showModal(_$modal);

                            _$modal.find('.btn-type1').on('tap',function(e){
                                e.stopPropagation();
                                twCommonUi.hideModal(_$modal);
                            });
                        } else if (resp.ResultCode == '-1') { //실패
                        }
                    })
                    .fail(function (err, msg) {
                        console.log(err);
                        jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
                    });

            } else {
                //invalid phone number show modal
                //console.log('invalid phone number show modal');
                twCommonUi.showModal(jQuery('.modal.modal-wrongform'));
            }
        });

        // 임시비밀번호 받기 버튼 탭.
        jQuery('.twMember_search_password .btn-start').on('tap', function(e) {
            e.stopPropagation();

            var _bSaveMember = twCommonUi.checkEnableJoinButton({
                'phone':jQuery('.cert .phone').val(),
                'mail':jQuery('.e-mail').val(),
                'auth_num':_this.authNum
            },jQuery('.twMember_search_password .btn-start'), 'findPW');

            if(_bSaveMember.bResult) {
                var _phone = jQuery('.phone').val(),
                    _mail = jQuery('e-mail').val(),
                    _url = loc[2].api[0],
                    _os_type = 0,
                    _data = {};

                if (device.checkDeviceType() == 'android') {
                    _os_type=2;
                } else if (device.checkDeviceType() == 'ios') {
                    _os_type=1;
                } else {
                    _os_type=0;
                }

                _data = {
                    'auth_phone': _phone,
                    'auth_idx' : _this.authIdx,
                    'auth_num' : _this.authNum,
                    'userMail' : _mail
                };

                reqwest({
                    url : _url,
                    method : loc[2].method,
                    type : loc[2].type,
                    data : _data
                })
                .then(function (resp) {
                    console.log(resp);
                    /*************************
                     resp.ResultCode
                     '1'=success
                     '-1'=fail
                     *************************/
                    if(resp[0].ResultCode == '1') { // 성공했을 경우.
                        twCommonUi.showModal(jQuery('.modal.modal-send-password'));
                    }
                })
                .fail(function (err, msg) {
                    console.log(err);
                    jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
                });
            }
        });

        jQuery('.contents').css({
            'padding-left':0,
            'padding-right':0
        });

        jQuery('.contents .page').css({
            'padding-left':10,
            'padding-right':10
        });

        twCommonUi.setContentsHeight();
        React.render(React.createElement(ModalAll, null), document.getElementsByClassName('modal-wrap')[0]);
    },
    render : function() {
        var _contents = null,
            _contents = React.createElement(MemberSearchPassword, null);

        return (
            React.createElement("div", {className: "page "+loc[2].pageName+" "+this.props.position}, 
                React.createElement("div", {className: "member-info"}, 
                    React.createElement("div", {className: "member-title"}, 
                        React.createElement("h3", null, "비밀번호 찾기")
                    ), 
                    React.createElement("div", {className: "member-contents error-log"}, 

                        React.createElement("p", {className: "comment"}, "휴대폰인증을 하셔야 임시 비밀번호를 발급받을 수 있습니다."), 
                        React.createElement("div", {className: "cert"}, 
                            React.createElement("div", {className: "inp-type1"}, React.createElement("input", {type: "tel", className: "phone", placeholder: "* 휴대폰 번호"})), 
                            React.createElement("a", {href: "javascript:void(0);", className: "btn-modal-cert modal-cert"}, React.createElement("span", null, "인증하기"))
                        ), 

                        React.createElement("p", {className: "comment"}, "입력하신 이메일로 임시비밀번호를 발송합니다."), 
                        React.createElement("div", {className: "inp-type1"}, 
                            React.createElement("input", {type: "text", className: "e-mail", placeholder: "* 이메일을 입력해주세요."})
                        ), 
                        React.createElement("p", {className: "comment notice"})

                    )
                ), 

                React.createElement("div", {className: "member-footer"}, 
                    React.createElement("a", {href: "javascript:void(0);", className: "btn-start active"}, React.createElement("span", null, "임시비밀번호 받기"))
                )
            )
        )
    }
});

/*********************************************************************************
 * modal class
 * html template
 * certification number modal
 *********************************************************************************/
var ModalCert = React.createClass({displayName: "ModalCert",
    componentDidMount : function() {

        //취소 버튼 클릭
        jQuery('.modal.modal-cert .btn-cancel').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.stopValidTime();
            jQuery('.modal.modal-cert .overtime').hide();
            jQuery('.modal.modal-cert .error-number').hide();
            twCommonUi.hideModal(jQuery('.modal.modal-cert'));
        });
    },
    render : function(){
        var _hide={
            display:'none'
        };

        return(
            React.createElement("section", {className: "modal modal-cert", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header icon-type2"}), 

                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "message"}, 
                            React.createElement("p", {className: "text-type2 phone"}, "010-1234-4322"), 
                            React.createElement("p", {className: "text-type3"}, "전송된 인증번호 5자리를 입력해주세요.")
                        ), 
                        React.createElement("div", {className: "num-area"}, 
                            React.createElement("input", {type: "", maxLength: "5"})
                        ), 
                        React.createElement("div", {className: "time-area"}, 
                            React.createElement("div", {className: "valid"}, "유효입력시간", 
                                React.createElement("span", {className: "time"}, "00:59")
                            ), 
                            React.createElement("p", {className: "overtime text-type4", style: _hide}, "입력 제한 시간 초과 다시 진행해 주세요."), 
                            React.createElement("p", {className: "error-number text-type4", style: _hide}, "잘못된 인증번호 입니다.")
                        )
                    ), 

                    React.createElement("div", {className: "modal-footer fix"}, 
                        React.createElement("div", {className: "btnbox"}, 
                            React.createElement("a", {className: "btn-type2 btn-cancel", href: "javascript:void(0);"}, "취소"), 
                            React.createElement("a", {className: "btn-type3 btn-confirm", href: "javascript:void(0);"}, "확인")
                        )
                    )
                )
            )
        )
    }
});

/*********************************************************************************
 * modal class
 * html template
 * Invalid message modal
 *********************************************************************************/
var ModalInvalid = React.createClass({displayName: "ModalInvalid",
    componentDidMount:function(){
        //번호 입력 잘못됐을 시
        jQuery('.modal.modal-wrongform .btn-confirm').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-wrongform'));
            jQuery('.inp-type1 .phone').val('').focus();

        });
    },
    render : function() {
        return (
            React.createElement("section", {className: "modal modal-small modal-wrongform", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header icon-type1"}), 

                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "message"}, 
                            React.createElement("span", {className: "text-type1"}, "번호형식이 올바르지 않습니다.")
                        )
                    ), 

                    React.createElement("div", {className: "modal-footer"}, 
                        React.createElement("a", {className: "btn-type1 btn-confirm", href: "javascript:void(0);"}, "확인")
                    )
                )
            )
        )
    }
});

/*********************************************************************************
 * modal class
 * html template
 * 탈퇴대기 modal
 *********************************************************************************/
var ModalDropOut = React.createClass({displayName: "ModalDropOut",
    render : function () {
        return (
            React.createElement("section", {className: "modal modal-drop", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header icon-type3"}), 

                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "message"}, 
                            React.createElement("p", {className: "text-type2"}, "010-1234-4322"), 
                            React.createElement("p", {className: "text-type4"}, React.createElement("span", null, "2015. 6. 21 22:00:00"), React.createElement("br", null), "탈퇴 처리중입니다."), 
                            React.createElement("p", {className: "text-type5"}, "남은 탈퇴 대기시간 ", React.createElement("span", {className: "time"}, " 21:59 "))
                        )
                    ), 

                    React.createElement("div", {className: "modal-footer fix"}, 
                        React.createElement("div", {className: "btnbox"}, 
                            React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "닫기"), 
                            React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "탈퇴취소")
                        )
                    )
                )
            )
        )
    }
});

/*********************************************************************************
 * modal class
 * html template
 * certification complete modal
 *********************************************************************************/
var ModalCertComplete = React.createClass({displayName: "ModalCertComplete",
    componentDidMount : function () {
        jQuery('.modal.modal-cer-complete .btn-type1').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-cer-complete'));
        });
    },
    render : function() {
        return (
            React.createElement("section", {className: "modal modal-small modal-cer-complete", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header icon-type4"}), 

                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "message"}, 
                            React.createElement("span", {className: "text-type1"}, "인증완료")
                        )
                    ), 

                    React.createElement("div", {className: "modal-footer"}, 
                        React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "확인")
                    )
                )
            )
        )
    }
});

/*********************************************************************************
 * modal class
 * html template
 * 비밀번호 틀렸습니다.
 *********************************************************************************/
var ModalWrongPassword = React.createClass({displayName: "ModalWrongPassword",
    render : function() {
        return (
            React.createElement("section", {className: "modal modal-small modal-wrong-password", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header icon-type3"}), 

                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "message"}, 
                            React.createElement("span", {className: "text-type1"}, "비밀번호가 틀렸습니다.")
                        )
                    ), 

                    React.createElement("div", {className: "modal-footer"}, 
                        React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "확인")
                    )
                )
            )
        )
    }
});

/*********************************************************************************
 * modal class
 * html template
 * 임시비밀번호 전송 modal
 *********************************************************************************/
var ModalTempPassword = React.createClass({displayName: "ModalTempPassword",
    componentDidMount : function() {
        jQuery('.modal.modal-send-password .btn-type1').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-send-password'));
        });
    },
    render : function() {
        return (
            React.createElement("section", {className: "modal modal-small modal-send-password", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header icon-type4"}), 

                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "message"}, 
                            React.createElement("span", {className: "text-type1"}, "임시비밀번호를 발송하였습니다.")
                        )
                    ), 

                    React.createElement("div", {className: "modal-footer"}, 
                        React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "확인")
                    )
                )
            )
        )
    }
});

/*********************************************************************************
 * modal class
 * html template
 * 탈퇴가 취소되었습니다. 모달
 *********************************************************************************/
var ModalDropCancel = React.createClass({displayName: "ModalDropCancel",
    componentDidMount : function () {
        jQuery('.modal.modal-drop-cancel .btn-type1').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-drop-cancel'));
        });
    },
    render : function () {
        return (
            React.createElement("section", {className: "modal modal-small modal-drop-cancel", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header icon-type4"}), 

                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "message"}, 
                            React.createElement("span", {className: "text-type1"}, "탈퇴가 취소되었습니다.")
                        )
                    ), 

                    React.createElement("div", {className: "modal-footer"}, 
                        React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "확인")
                    )
                )
            )
        )
    }
});

/*********************************************************************************
 * modal class
 * html template
 * 인증버튼 클릭제한횟수 초과 모달
 *********************************************************************************/
var ModalAuthExceeds = React.createClass({displayName: "ModalAuthExceeds",
    componentDidMount : function () {
        jQuery('.modal.modal-auth-exceeds .btn-type1').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-auth-exceeds'));
        });
    },
    render : function () {
        return (
            React.createElement("section", {className: "modal modal-small modal-auth-exceeds", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header icon-type1"}), 

                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "message"}, 
                            React.createElement("span", {className: "text-type1"}, "인증 제한 횟수 초과"), React.createElement("br", null), React.createElement("br", null), 
                            React.createElement("p", {className: "text-type3"}, "10분 후 재시도 부탁드립니다.")
                        )
                    ), 

                    React.createElement("div", {className: "modal-footer"}, 
                        React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "확인")
                    )
                )
            )
        )
    }
});

/*********************************************************************************
 * modal class
 * html template
 * 모든 모달페이지 렌더링
 *********************************************************************************/
var ModalAll = React.createClass({displayName: "ModalAll",
    render : function(){
        var props={
            display:'none',
            position:'absolute',
            top:'100px',
            width:'100%',
            zIndex:'200'
        };

        return (
            React.createElement("div", null, 
                React.createElement(ModalInvalid, React.__spread({},  props)), 
                React.createElement(ModalCert, React.__spread({},  props)), 
                React.createElement(ModalDropOut, React.__spread({},  props)), 
                React.createElement(ModalCertComplete, React.__spread({},  props)), 
                React.createElement(ModalWrongPassword, React.__spread({},  props)), 
                React.createElement(ModalTempPassword, React.__spread({},  props)), 
                React.createElement(ModalDropCancel, React.__spread({},  props)), 
                React.createElement(ModalAuthExceeds, React.__spread({},  props))
            )
        )
    }
});