/****************************************************************************
 * 나의 월렛
 *
 ***************************************************************************/
var MyWallet = React.createClass({displayName: "MyWallet",
    componentWillMount : function() {
        var _data = {
            //'u_idx' : (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1
            'u_idx' : 1 // 로그인 안된 회원용 테스트 값 or 테스트용 회원
        };
        reqwest({
            url : loc[14].api[3],
            method : loc[14].method,
            type : loc[14].type,
            data : _data
        })
        .then(function(resp) {
            if(resp[0].ResultCode == 1) {
                _memStatus = resp[0].ResultData[0].u_status;
                _my_min = resp[0].ResultData[0].min.toLocaleString();
                _my_coin = resp[0].ResultData[0].coin.toLocaleString();
                _reg_date = resp[0].ResultData[0].regdate.substring(0,10);
                if(_memStatus < 1) {
                    alert('로그인 후에 쿠폰과 코인을 사용하실 수 있습니다.');
                    jQuery('.container').show();
                    jQuery('.menu-min-coin').addClass('not-member');
                } else {
                    jQuery('.container').show();
                    jQuery('.menu-min-coin .my-coin').text(_my_coin);
                    jQuery('.join-date strong').text(_reg_date);
                }
                jQuery('.menu-min-coin .my-min').text(_my_min);
            }
        })
        .fail(function (err, msg) {
            console.log(err);
            jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
        });
    },
    componentDidMount : function () {

        jQuery('.drop-out').on('tap', function(e) {
            e.stopPropagation();
            twCommonUi.showModal(jQuery('.modal.modal-dropout-caution'));
        });

        jQuery('.change-pw').on('tap', function(e) { // 비밀번호 변경 클릭.
            e.stopPropagation();
            twCommonUi.showModal(jQuery('.modal.modal-change-password'));
        });

        jQuery('.change-info').on('tap', function(e) {
            e.stopPropagation();
            twCommonUi.showModal(jQuery('.modal.modal-change-info'));
        });

        jQuery('.contents').css({
            'padding-left':0,
            'padding-right':0
        });

        twCommonUi.setContentsHeight();

        React.render(React.createElement(ModalAll, null), document.getElementsByClassName('modal-wrap')[0]);
    },
    render : function () {
        var _contents = null;
        _contents = React.createElement(MyWallet, null);

        return (
            React.createElement("div", {className: "page "+loc[14].pageName+" "+this.props.position}, 
                React.createElement("div", {className: "menu-min-coin fix"}, 
                    React.createElement("div", {className: "menubox"}, 
                        React.createElement("div", {className: "min"}, 
                            React.createElement("div", {className: "show-number"}, 
                                React.createElement("p", null, "나의 min"), 
                                React.createElement("strong", {className: "my-min"})
                            ), 
                            React.createElement("a", {className: "btn-coin-exchange", href: "#/coin-exchange"}, 
                                React.createElement("i", {className: "fa fa-hourglass-end"})
                            )
                        )
                    ), 

                    React.createElement("div", {className: "menubox"}, 
                        React.createElement("div", {className: "need-login"}, 
                            React.createElement("a", {href: "#/member-login"}, "로그인"), 
                            React.createElement("a", {href: "#/member-join"}, "회원가입")
                        ), 
                        React.createElement("div", {className: "coin"}, 
                            React.createElement("div", {className: "coin-button"}, 
                                React.createElement("a", {className: "btn-coin-useful", href: "#/coin-use"}, "코인사용 가능")
                            ), 
                            React.createElement("div", {className: "show-number"}, 
                                React.createElement("p", null, "나의 coin"), 
                                React.createElement("strong", {className: "my-coin"})
                            ), 
                            React.createElement("div", {className: "onoffswitch-wrap"}, 
								React.createElement("span", {className: "onoffswitch"}, 
									React.createElement("input", {type: "checkbox", name: "onoffswitch", className: "onoffswitch-checkbox", id: "push2", checked: "checked"}), 
                                    React.createElement("label", {className: "onoffswitch-label", for: "push2"}, 
                                        React.createElement("span", {className: "onoffswitch-inner"}), 
                                        React.createElement("span", {className: "onoffswitch-switch"})
                                    )
                                )
                            )
                        )
                    )
                ), 
                React.createElement("div", {className: "my-menu"}, 
                    React.createElement("ul", null, 
                        React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)", className: "shared"}, "타임월렛 공유하기", React.createElement("i", {className: "fa fa-angle-right"}))), 
                        React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)", className: "change-pw"}, "비밀번호 변경", React.createElement("i", {className: "fa fa-angle-right"}))), 
                        React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)", className: "change-info"}, "회원정보 변경", React.createElement("i", {className: "fa fa-angle-right"}))), 
                        React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)", className: "drop-out"}, "서비스탈퇴 신청", React.createElement("i", {className: "fa fa-angle-right"})))
                    ), 
                    React.createElement("div", {className: "join-date"}, 
                        React.createElement("span", null, "회원 가입일 : ", React.createElement("strong", null))
                    )
                )
            )
        )
    }
});

/**************************************************
 * 탈퇴 완료
 * api에서 제대로 된 값이 왔을 경우 호출.
 **************************************************/
var ModalDropOutComplete = React.createClass({displayName: "ModalDropOutComplete",
    componentDidMount : function () {
        // 버튼 액션 시 bridge 호출
        jQuery('.modal-dropout-complete .btn-type2').on('tap', function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-dropout-complete'));
            BRIDGE.openAgreementPage();
        });
    },
    render : function() {
        return (
            React.createElement("div", {className: "modal modal-small modal-dropout-complete", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header"}
                    ), 

                    React.createElement("div", {className: "modal-content"}
                    ), 

                    React.createElement("div", {className: "modal-footer fix"}, 
                        React.createElement("div", {className: "btnbox"}, 
                            React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "닫기")
                        )
                    )
                )
            )
        )
    }
});


/***************************************************
 * 유의사항 알림 모달(임시)
 *
 **************************************************/
var ModalDropOutCaution = React.createClass({displayName: "ModalDropOutCaution",
    componentDidMount : function () {
        jQuery('.modal-dropout-caution .btn-type2').on('tap', function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-dropout-caution'));
        });

        jQuery('.modal-dropout-caution .btn-type1').on('tap', function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-dropout-caution'));

            setTimeout(function () {
                twCommonUi.showModal(jQuery('.modal.modal-dropout-check'));
            }, 300);
        });
    },
    render : function () {
        return (
            React.createElement("div", {className: "modal modal-small modal-dropout-caution", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header"}
                    ), 

                    React.createElement("div", {className: "modal-content"}
                    ), 

                    React.createElement("div", {className: "modal-footer fix"}, 
                        React.createElement("div", {className: "btnbox"}, 
                            React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "취소"), 
                            React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "유의사항 확인 및 탈퇴")
                        )
                    )
                )
            )
        )
    }
});

/***************************************************
 * 회원 탈퇴 (임시, 비밀번호 입력)
 *
 **************************************************/
var ModalDropOutCheck = React.createClass({displayName: "ModalDropOutCheck",
    componentDidMount : function() {
        jQuery('.modal-dropout-check .btn-type2').on('tap', function(e) {
            e.stopPropagation();
            jQuery('.modal.modal-dropout-check .password').val('');
            twCommonUi.hideModal(jQuery('.modal.modal-dropout-check'));
        });

        jQuery('.password').on('keyup', function(e) {
            e.stopPropagation();
            var _that = this;
            setTimeout(function() {
                if (jQuery(_that).val().length > 0) {
                    var result = twMember.getValidPassword(jQuery(_that).val());
                    jQuery(_that).closest('.error-log').find('p').remove();

                    if (result == '000') {
                        jQuery(_that).closest('.error-log').find('p').remove();
                    } else {
                        if (result == '001') {
                            jQuery(_that).closest('.error-log').find('p').remove();
                            jQuery(_that).closest('.error-log').append('<p class="comment notice">* 비밀번호 입력은 8~15자리로 입력하셔야 합니다.</p>');
                        } else {
                            jQuery(_that).closest('.error-log').find('p').remove();
                            jQuery(_that).closest('.error-log').append('<p class="comment notice">* 비밀번호는 숫자와 영문자를 혼용하셔야 합니다.</p>');
                        }
                    }
                } else {
                    jQuery(_that).closest('.error-log').find('p').remove();
                }
            }, 1);
        });

        jQuery('.modal-dropout-check .btn-type1').on('tap', function(e) {
            e.stopPropagation();

            var _bSaveMember = twCommonUi.checkEnableJoinButton({
                'password' : jQuery('.password').val()
            }, jQuery('.modal-dropout-check .btn-type1'), 'dropout');

            if (_bSaveMember.bResult) {
                var _password = jQuery('.password').val(),
                    _url = loc[14].api[0],
                    _data = {
                        'u_idx' : (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                        'pwd' : _password
                    };

                if (device.checkDeviceType() == 'android') {
                    _os_type=2;
                } else if (device.checkDeviceType() == 'ios') {
                    _os_type=1;
                } else {
                    _os_type=0;
                }

                _webBridge.osType=_os_type;
                reqwest({
                    url : _url,
                    method : loc[14].method,
                    type : loc[14].type,
                    data : _data
                })
                .then(function (resp) {
                    console.log(resp);
                    if(resp[0].ResultCode == '1') { // 성공
                        twCommonUi.hideModal(jQuery('.modal.modal-dropout-check'));
                        setTimeout(function () {
                            twCommonUi.showModal(jQuery('.modal.modal-dropout-complete'));
                            jQuery('.modal.modal-dropout-complete .modal-content').append(modalTitle);
                        }, 300);
                    } else if (resp[0].ResultCode == '-40008') { // 비밀번호 오류
                        // 에러메시지 출력.
                        jQuery('.error-log .comment').remove();
                        jQuery('.error-log').append('<p class="comment notice">* 비밀번호가 틀렸습니다.</p>');
                    }
                })
                .fail(function (err, msg) {
                    console.log(err);
                    jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
                });
            }
        });
    },
    render : function() {
        return (
            React.createElement("div", {className: "modal modal-small modal-dropout-check", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header"}
                    ), 

                    React.createElement("div", {className: "modal-content error-log"}, 
                        React.createElement("label", null, 
                            React.createElement("span", null, "비밀번호"), 
                            React.createElement("input", {type: "password", className: "password"})
                        )
                    ), 

                    React.createElement("div", {className: "modal-footer fix"}, 
                        React.createElement("div", {className: "btnbox"}, 
                            React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "취소"), 
                            React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "탈퇴하기")
                        )
                    )
                )
            )
        )
    }
});

/***************************************************
 * 비밀번호 변경 모달.
 *
 **************************************************/
var ModalChangePassword = React.createClass({displayName: "ModalChangePassword",
    componentDidMount : function() {
        jQuery('.modal.modal-change-password .btn-type2').on('tap', function(e) {
            e.stopPropagation();
            jQuery('.modal.modal-change-password .password').val('');
            jQuery('.modal.modal-change-password .comment').remove();
            twCommonUi.hideModal(jQuery('.modal.modal-change-password'));
        });

        jQuery('.modal.modal-change-password .btn-type1').on('tap', function(e) {
            e.stopPropagation();
            var modalTitle = "비밀번호";

            var _bSaveMember = twCommonUi.checkEnableJoinButton({
                'pwd' : jQuery('.origin-pw').val(),
                'newPwd' : jQuery('.new-pw').val(),
                'newPwd2' : jQuery('.new-pw-check').val()
            }, jQuery('.modal.modal-change-password .btn-type1'), 'pw-change');

            if(_bSaveMember.bResult) {
                var _password = jQuery('.origin-pw').val(),
                    _new_pwd = jQuery('.new-pw').val(),
                    _new_pwd2 = jQuery('.new-pw-check').val(),
                    _url = loc[14].api[2],
                    _data = {
                        'u_idx' : (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                        'pwd' : _password,
                        'newPwd' : _new_pwd,
                        'newPwd2' : _new_pwd2
                    };

                reqwest({
                    url: _url, // 비밀번호 변경 api 호출
                    method: loc[14].method,
                    type: loc[14].type,
                    data: _data
                })
                .then(function (resp) {
                    console.log(resp);
                    if (resp[0].ResultCode == '1') {
                        twCommonUi.hideModal(jQuery('.modal.modal-change-password'));
                        setTimeout(function(){
                            twCommonUi.showModal(jQuery('.modal.modal-change-complete'));
                            jQuery('.modal.modal-change-complete .modal-content .change-title').append(modalTitle);
                        },300);
                    } else if (resp[0].ResultCode == '-40008') {
                        jQuery('.error-log .comment').remove();
                        jQuery('.error-log').append('<p class="comment notice">* 비밀번호가 틀렸습니다.</p>');
                    }
                })
                .fail(function (err, msg) {
                    console.log(err);
                    jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
                });
            }
        })
    },
    render : function() {
        return (
            React.createElement("div", {className: "modal modal-small modal-change-password", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header"}, 
                        "비밀번호 변경"
                    ), 

                    React.createElement("div", {className: "modal-content error-log"}, 
                        React.createElement("div", {className: "inp-type1"}, 
                            React.createElement("input", {type: "password", className: "password origin-pw", name: "origin-pw"})
                        ), 
                        React.createElement("div", {className: "inp-type1"}, 
                            React.createElement("input", {type: "password", className: "password new-pw", name: "new-pw"})
                        ), 
                        React.createElement("div", {className: "inp-type1"}, 
                            React.createElement("input", {type: "password", className: "password new-pw-check", name: "new-pw-check"})
                        )
                    ), 

                    React.createElement("div", {className: "modal-footer fix"}, 
                        React.createElement("div", {className: "btnbox"}, 
                            React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "취소"), 
                            React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "확인")
                        )
                    )
                )
            )
        );
    }
});

/***************************************************
 * 비밀번호 변경 알림 모달
 *
 **************************************************/
var ModalChangeOk = React.createClass({displayName: "ModalChangeOk",
    componentDidMount : function() {
        jQuery('.modal.modal-change-complete .btn-type2').on('tap', function(e) {
            e.stopPropagation();
            jQuery('.modal.modal-change-password .password').val('');
            jQuery('.modal.modal-change-password .comment').remove();
            twCommonUi.hideModal(jQuery('.modal.modal-change-complete'));
        });
    },
    render : function() {
        return (
            React.createElement("div", {className: "modal modal-small modal-change-complete", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header"}, 
                        "알림"
                    ), 

                    React.createElement("div", {className: "modal-content error-log"}, 
                        React.createElement("span", null, React.createElement("strong", {className: "change-title"}), "가 성공적으로 변경되었습니다.")
                    ), 

                    React.createElement("div", {className: "modal-footer fix"}, 
                        React.createElement("div", {className: "btnbox"}, 
                            React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "닫기")
                        )
                    )
                )
            )
        )
    }
});

/***************************************************
 * 회원정보 변경
 *
 **************************************************/
var ModalChangeInfo = React.createClass({displayName: "ModalChangeInfo",
    componentDidMount : function() {
        jQuery('.modal.modal-change-info .btn-type2').on('tap', function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-change-info'));
        });
        var _this = this;
        jQuery('.inp-radio label').on('tap',function(e){
            e.stopPropagation();
            jQuery('.inp-radio').removeClass('active');
            jQuery('.inp-radio input[type=radio]').attr('checked',false);
            jQuery(this).closest('.inp-radio').addClass('active');
            jQuery(this).prev('input[type=radio]').attr('checked',true);
            _this.sex=jQuery('input[name=sex]:checked').val();
        });

        /***************
         * set year
         **************/
        twMember.setSelectYear(twMember.getCurrentDate().nowYear,jQuery('#sel1'));

        jQuery('#sel1').change(function(e) {
            e.stopPropagation();

            if(jQuery(this).val()) {
                /***************
                 * set month
                 **************/
                twMember.setSelectMonth(twMember.getCurrentDate().nowMonth,jQuery('#sel2'));
            } else {
                jQuery('#sel2').empty();
            }
        });

        /***************
         * after select month change, set day
         **************/
        jQuery('#sel2').change(function(e) {
            e.stopPropagation();
            if(jQuery(this).val()) {
                /***************
                 * set day
                 **************/
                twMember.setSelectDay(jQuery('#sel1 option:selected').val(), jQuery(this).val(), null, jQuery('#sel3'))
            } else {
                jQuery('#sel3').empty();
            }
        });

        //거주지역 설정
        jQuery('.region a').on('tap',function(e) {
            e.stopPropagation();

            twCommonUi.showModal(jQuery('.modal.modal-location'));
            jQuery('.list-location a').off('tap');
            twCommonUi.commonAccordion('.list-location',function(_txt){}, 'change-location');
        });

        // 변경요청 버튼 클릭
        jQuery('.modal.modal-change-info .btn-type1').on('tap', function(e) {
            e.stopPropagation();
            var modalTitle = "회원정보";

            var _bSaveMember = twCommonUi.checkEnableJoinButton({
                'sex':_this.sex,
                'year':jQuery('#sel1').val(),
                'month':jQuery('#sel2').val(),
                'day':jQuery('#sel3').val(),
                'area':jQuery('.region input').val()
            }, jQuery('.modal.modal-change-info .btn-type1'), 'change-info');

            if (_bSaveMember.bResult) {
                _year=jQuery('#sel1 option:selected').val(),
                _month=jQuery('#sel2 option:selected').val(),
                _day=jQuery('#sel3 option:selected').val(),
                _sex=_this.sex,
                _addr=jQuery('.region input').val(),
                _data = {
                    'u_idx' : (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                    'sex' : _sex,
                    'birth_Year' : _year,
                    'birth_Month' : _month,
                    'birth_Day' : _day,
                    'addr' : _addr
                };
            }
            reqwest({
                url : loc[14].api[1],
                method : loc[14].method,
                type : loc[14].type,
                data : _data
            })
            .then(function(resp){
                console.log(resp);
                if(resp[0].ResultCode == '1') {
                    twCommonUi.hideModal(jQuery('.modal.modal-change-info'));
                    setTimeout( function() {
                        twCommonUi.showModal(jQuery('.modal.modal-change-complete'));
                        jQuery('.modal.modal-change-complete .modal-content .change-title').append(modalTitle);
                    },300);
                }
            })
            .fail(function (err, msg) {
                console.log(err);
                jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
            });
        });
    },
    render : function() {
        return (
            React.createElement("div", {className: "modal modal-small modal-change-info member-info", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header"}, 
                        "회원정보 변경"
                    ), 

                    React.createElement("div", {className: "modal-content member-contents error-log"}, 
                        React.createElement("div", {className: "inputbox-group fix"}, 
                            React.createElement("div", {className: "inp-radio"}, 
                                React.createElement("input", {type: "radio", id: "rdo1", name: "sex", value: "m"}), React.createElement("label", {for: "rdo1"}, React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})), React.createElement("span", {className: "text"}, "남자"))
                            ), 
                            React.createElement("div", {className: "inp-radio"}, 
                                React.createElement("input", {type: "radio", id: "rdo2", name: "sex", value: "f"}), React.createElement("label", {for: "rdo2"}, React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})), React.createElement("span", {className: "text"}, "여자"))
                            )
                        ), 

                        React.createElement("div", {className: "selectbox-group fix"}, 
                            React.createElement("div", {className: "select-type1 year"}, 
                                React.createElement("span", {className: "select-title"}, "* 생년월일"), 
                                React.createElement("select", {id: "sel1"}
                                ), 
                                React.createElement("label", {for: "sel1", className: "right"}, "년")
                            ), 
                            React.createElement("div", {className: "select-type1 month"}, 
                                React.createElement("select", {id: "sel2"}
                                ), 
                                React.createElement("label", {for: "sel2", className: "right"}, "월")
                            ), 
                            React.createElement("div", {className: "select-type1 date"}, 
                                React.createElement("select", {id: "sel3"}
                                ), 
                                React.createElement("label", {className: "right"}, "일")
                            )
                        ), 

                        React.createElement("div", {className: "inp-type1 region"}, 
                            React.createElement("a", {href: "javascript:void(0);"}), 
                            React.createElement("input", {type: "text", placeholder: "* 거주지역설정", value: ""})
                        )
                    ), 

                    React.createElement("div", {className: "modal-footer fix"}, 
                        React.createElement("div", {className: "btnbox"}, 
                            React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "취소"), 
                            React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "확인")
                        )
                    )
                )
            )
        );
    }
});

/*********************************************************************************
 * modal class
 * html template
 * set location modal
 *********************************************************************************/
var ModalSetLocation = React.createClass({displayName: "ModalSetLocation",
    componentDidMount:function(){
        // TODO : locationAccodion and height
        jQuery('.list-location').height(jQuery(window).height()-45);
        jQuery('.btn-location-close').on('tap',function() {
            twCommonUi.closeRegionAccordion();
        })

    },
    render : function() {
        var _contents=null;
        _contents=React.createElement(ModalSetLocationSi, null);

        return (
            React.createElement("section", {className: "modal modal-location", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-contents"}, 
                        React.createElement("div", {className: "location-header"}, 
                            React.createElement("h3", null, "지역설정"), 
                            React.createElement("a", {className: "btn-location-close", href: "javascript:void(0);"}, "닫기")
                        ), 
                        React.createElement("div", {className: "list-location"}, 
                            _contents
                        )
                    )
                )
            )
        )
    }
});

var ModalSetLocationSi = React.createClass({displayName: "ModalSetLocationSi",
    props:null,
    getInitialState:function() {
        return {list:['']}
    },
    componentDidMount:function(){
        var _this=this,
            props=null;

        twCommonUi.getApiData(
            {
                'url':loc[0].api[3],
                'type':'json'
            },
            'html',
            React.addons,
            function(listType,resp,reactAddons) {
                var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons).list[0].ResultData,
                    _addrs=[],
                    _infos=[];

                Lazy(twCommonUi.getApiList(_this, listType,resp,reactAddons).list[0].ResultData).each(function(d,k) {

                    if(_addrs.length>0) {
                        if (_addrs[_addrs.length-1].si != d.si) {
                            _infos=[];
                            _addrs.push(
                                {
                                    'si': d.si,
                                    _infos
                                }
                            );

                        }
                    } else {
                        _addrs.push(
                            {
                                'si': d.si,
                                _infos
                            }
                        );
                    }
                    _infos.push(
                        {
                            "gu": d.gu,
                            "idx": d.idx,
                            "addr": d.addr
                        }
                    );

                });
                //setState excute react render
                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                    _this.setState({
                        list: _addrs
                    });
                    //React.render(React.createElement(ModalSetLocationGu, {items: _si}), document.getElementsByClassName('subList')[_$t.closest('li').index()]);
                }
            }
        );

    },
    render: function () {
        var _siItem=null,
            _guItem=[],
            _createItem=function(data,index) {
                var _contents=React.createElement(ModalSetLocationGu, {items: data._infos});
                return (
                    React.createElement("li", {className: "siList", key: index}, 
                        React.createElement("div", {className: "select"}, React.createElement("a", {href: "javascript:void(0);", className: "city"}, data.si, React.createElement("i", {className: "fa fa-caret-down"}))), 
                        _contents
                    )
                )
            };

        if(this.state.list[0]!='') {
            if (this.state.list.length > 0) {
                _siItem=this.state.list.map(_createItem);
            }
        }

        return (
            React.createElement("ul", null, 
                _siItem
            )
        )
    }
});

var ModalSetLocationGu = React.createClass({displayName: "ModalSetLocationGu",
    getInitialState:function() {
        return {list:['']}
    },
    componentDidMount:function(){
        var _this=this;
        //setState excute react render
        if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
            _this.setState({
                list: this.props.items
            });
        }

    },
    render: function () {
        var _createItem=function(data,index) {

                var _contents=null;

                if(data.gu.length>1) {
                    _contents = React.createElement("li", {key: index}, React.createElement("a", {href: "javascript:void(0);", className: "state"}, data.gu));
                }

                return (
                {_contents}
                )
            },
            _guItem=null;

        if(this.state.list[0]!='') {
            if (this.state.list.length > 0) {
                _guItem=this.state.list.map(_createItem);
            }
        }
        return (
            React.createElement("ul", {className: "sub"}, 
                _guItem
            )
        )
    }
});

/***************************************************
 * 모달 전체 (임시)
 *
 **************************************************/
var ModalAll = React.createClass({displayName: "ModalAll",
    render : function () {
        var props={
            display:'none',
            position:'absolute',
            top:'100px',
            width:'100%',
            zIndex:'200',
            border:'none'
        };

        return (
            React.createElement("div", null, 
                React.createElement(ModalDropOutCaution, React.__spread({},  props)), 
                React.createElement(ModalDropOutCheck, React.__spread({},  props)), 
                React.createElement(ModalDropOutComplete, React.__spread({},  props)), 
                React.createElement(ModalChangePassword, React.__spread({},  props)), 
                React.createElement(ModalChangeOk, React.__spread({},  props)), 
                React.createElement(ModalChangeInfo, React.__spread({},  props)), 
                React.createElement(ModalSetLocation, React.__spread({},  props))
            )
        )
    }
});