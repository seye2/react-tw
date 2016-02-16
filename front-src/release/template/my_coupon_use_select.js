/*********************************************************************************
 * CoinUse class
 * html template
 *********************************************************************************/
var MyCouponUseSelect = React.createClass({displayName: "MyCouponUseSelect",
    getInitialState:function() {
        return ({step:1,totalcoin:''});
    },
    step:1,
    componentDidMount:function() {
        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();
        jQuery('.contentsScroll').height(jQuery(window).height()-jQuery('.header').height());

        var _this=this;

        React.render(React.createElement(ModalAll, null), document.getElementsByClassName('modal-wrap')[0]);

        //비콘 검색 결제
        jQuery('.roundbox.step1 .btnbox a').off('tap');
        jQuery('.roundbox.step1 .btnbox a').on('tap',function(e) {
            e.stopPropagation();

            _this.setState({
                step:2
            });

            jQuery('.header .btn-prev').hide();
        });

        //비밀번호 결제
        jQuery('.password-change-key .active').off('tap').on('tap',function(e) {
            e.stopPropagation();

            twCommonUi.showModal(jQuery('.modal.modal-beacon-password'));

            jQuery('.modal.modal-beacon-password .btn-type1').on('tap',function() {
                //가맹점 및 비밀번호 양식이 맞지 않는 경우
                /*
                 <!--<p className="text-type4 left">* 가맹점 번호가 일치하지 않습니다.</p>
                 <p className="text-type4 left">* 번호형식이 맞지 않습니다.</p>-->
                 */

                var _msg='',
                    _u_idx=(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                    _coupon_idx=_this.props.coupon_idx,
                    num_check=/[0-9]/g,
                    _pwd=0,
                    _shop_idx=jQuery('.modal.modal-beacon-password #shop-number'),
                    _shop_pwd=jQuery('.modal.modal-beacon-password #shop-password');

                _pwd=_shop_pwd.val();

                if(!num_check.test(_shop_idx.val())) {
                    _msg='* 가맹점 번호는 숫자만 입력되어야 합니다.';
                    _shop_idx.val('');
                    jQuery('.modal.modal-beacon-password p.text-type4').text(_msg);
                    return false;
                }

                if(!num_check.test(_shop_pwd.val())) {
                    _msg='* 가맹점 비밀번호는 숫자만 입력되어야 합니다.';
                    _shop_pwd.val('');
                    jQuery('.modal.modal-beacon-password p.text-type4').text(_msg);
                    return false;
                }

                if(_shop_pwd.val().length<6) {
                    _msg='* 가맹점 비밀번호는 6자리가 입력되어야 합니다.';
                    _shop_pwd.val('');
                    jQuery('.modal.modal-beacon-password p.text-type4').text(_msg);
                    return false;
                }

                reqwest({
                    url: loc[28].api[0], //쿠폰 사용 ,패스워드
                    method: 'post',
                    type: 'json',
                    data: {
                        u_idx:_u_idx,
                        shop_idx:_shop_idx.val(),
                        shop_password:_shop_pwd.val(),
                        coupon_idx:_coupon_idx
                    }
                })
                .then(function (resp) {
                    /*************************
                     resp.ResultCode
                     '1'=success
                     '-1'=fail
                     *************************/
                    if (resp[0].ResultCode == '1') {

                        //setState excute react render
                        if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                            _this.setState({
                                totalcoin: resp[0].totalCoin
                            });
                            jQuery('.modal.modal-beacon-password p.text-type4').text('');

                            twCommonUi.hideModal(jQuery('.modal'));

                            /* 값 교체해야함 */
                            jQuery('.complete .shop-name').text('스타벅스'); //'스타벅스'=resp[0].shop-name으로 교체해야 함
                            jQuery('.use-complete em').text(_coin);
                            jQuery('.bottombox em').text(resp[0].totalCoin);
                            /* 교체해야함 */

                            twCommonUi.showModal(jQuery('.modal.modal-coupon-complete'));

                            jQuery('.use-step-wrap .btnbox a').off('tap').on('tap',function(e) {
                                e.stopPropagation();
                                location.href='#/shop-detail/'+_shop_idx.val();
                            });

                        }
                    } else if (resp.ResultCode == '-1') { //실패
                    }
                })
                .fail(function (err, msg) {
                    console.log(err);
                    jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
                });

            });

        });

    },
    render : function () {
        var _bg={
                background:'#e5e5e5'
            },
            _contents=null;

        if(this.state.step==1) {
            _contents=React.createElement(MyCouponUseStep1, null);
        } else {
            _contents=React.createElement(MyCouponUseStep2, null);
        }

        return (
            React.createElement("div", {className: "page "+loc[28].pageName+" "+this.props.position, style: _bg}, 
                React.createElement("div", {className: "contentsScroll"}, 
                    React.createElement("div", {className: "bg-use-step"}), 
                    React.createElement("div", {className: "use-step-wrap"}, 
                        _contents
                    )
                )
            )
        )
    }
});

var MyCouponUseStep1 = React.createClass({displayName: "MyCouponUseStep1",
    render:function() {
        return (
            React.createElement("div", {className: "roundbox step1"}, 

                React.createElement("div", {className: "password-change-key"}, 
                    React.createElement("a", {className: "active", href: "javascript:void(0);"}, React.createElement("span", {className: "hide"}, "비밀번호로 결제 변경"))
                ), 

                React.createElement("div", {className: "top-text"}, 
                    React.createElement("strong", null, "블루투스 활성화"), 
                    "블루투스 기능을 켜주시고 ", React.createElement("br", null), "단말기를 직원에게 제시해주세요."
                ), 
                React.createElement("div", {className: "bgbox"}), 
                React.createElement("div", {className: "btnbox"}, 
                    React.createElement("a", {href: "javascript:void(0);"}, "확인")
                )
            )

        );
    }
});

var MyCouponUseStep2 = React.createClass({displayName: "MyCouponUseStep2",
    render:function() {
        return (
            React.createElement("div", {className: "roundbox step2"}, 
                React.createElement("div", {className: "top-text"}, 
                    React.createElement("strong", null, "결제 진행중"), 
                    "현재 결제가 진행중입니다."
                ), 
                React.createElement("div", {className: "bgbox"}), 
                React.createElement("div", {className: "btnbox"}, 
                    React.createElement("a", {href: "javascript:void(0);"}, "확인")
                )
            )
        );
    }
});

/**********************************
 * 코인사용 모달
 ********************************/
var ModalAll = React.createClass({displayName: "ModalAll",
    render: function () {

        var props = {
            display: 'none',
            position: 'absolute',
            top: '100px',
            width: '100%',
            zIndex: '200'
        };

        //<ModalCoinUse dataStyle={props} total={this.props.total} uidx={this.props.u_idx} />
        return (
            React.createElement(ModalCouponUse, {dataStyle: props})
        )
    }
});

var ModalCouponUse = React.createClass({displayName: "ModalCouponUse",
    componentDidMount:function() {
        jQuery('.modal.modal-beacon-password .btn-type2').on('tap',function() {
            twCommonUi.hideModal(jQuery('.modal.modal-beacon-password'));

            _shop_idx=jQuery('.modal.modal-beacon-password #shop-number'),
                _shop_pwd=jQuery('.modal.modal-beacon-password #shop-password');
            _shop_idx.val('');
            _shop_pwd.val('');

            jQuery('.modal.modal-beacon-password p.text-type4').text('');

        });
    },
    render: function () {

        return (
            React.createElement("div", null, 
                React.createElement("section", {className: "modal modal-small modal-nosearch-beacon", style: this.props.dataStyle}, 
                    React.createElement("div", {className: "modal-inner"}, 
                        React.createElement("div", {className: "modal-header icon-type1"}), 

                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "message"}, 
                                React.createElement("p", {className: "text-type1"}, "코인사용이 불가능한 매장입니다.")
                            )
                        ), 

                        React.createElement("div", {className: "modal-footer"}, 
                            React.createElement("div", {className: "btnbox"}, 
                                React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "취소"), 
                                React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "다시시도")
                            )
                        )
                    )
                ), 

                React.createElement("section", {className: "modal modal-small modal-beacon-nosearch", style: this.props.dataStyle}, 
                    React.createElement("div", {className: "modal-inner"}, 
                        React.createElement("div", {className: "modal-header icon-type3"}), 

                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "message"}, 
                                React.createElement("p", {className: "text-type1"}, "결제 비콘찾기 실패 ", React.createElement("br", null), "다시 시도하시겠습니까?")
                            )
                        ), 

                        React.createElement("div", {className: "modal-footer"}, 
                            React.createElement("div", {className: "btnbox"}, 
                                React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "취소"), 
                                React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "다시시도")
                            )
                        )
                    )
                ), 

                React.createElement("section", {className: "modal modal-small modal-nosearch-three", style: this.props.dataStyle}, 
                    React.createElement("div", {className: "modal-inner"}, 
                        React.createElement("div", {className: "modal-header icon-type3"}), 

                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "message"}, 
                                React.createElement("p", {className: "text-type1"}, "결제 비콘찾기 3회 실패"), React.createElement("br", null), React.createElement("br", null), 
                                React.createElement("p", {className: "text-type5"}, "비밀번호 입려방식으로 변경하시겠습니까?")
                            )
                        ), 

                        React.createElement("div", {className: "modal-footer"}, 
                            React.createElement("div", {className: "btnbox"}, 
                                React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "취소"), 
                                React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "확인")
                            )
                        )
                    )
                ), 

                React.createElement("section", {className: "modal modal-beacon-password", style: this.props.dataStyle}, 
                    React.createElement("div", {className: "modal-inner"}, 
                        React.createElement("div", {className: "modal-header icon-type7"}, React.createElement("p", {className: "text"}, "가맹점 정보를 입력하세요")), 

                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "modal-inputgroup"}, 
                                React.createElement("label", {for: "shop-number"}, "가맹점 번호"), 
                                React.createElement("div", {className: "inp-type1"}, 
                                    React.createElement("input", {type: "number", id: "shop-number", placeholder: ""})
                                )
                            ), 
                            React.createElement("div", {className: "modal-inputgroup"}, 
                                React.createElement("label", {for: "shop-passowrd"}, "가맹점 비밀 번호"), 
                                React.createElement("div", {className: "inp-type1"}, 
                                    React.createElement("input", {type: "password", id: "shop-password", placeholder: ""})
                                )
                            ), 
                            React.createElement("p", {className: "text-type4 left"})

                        ), 

                        React.createElement("div", {className: "modal-footer"}, 
                            React.createElement("div", {className: "btnbox"}, 
                                React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "취소"), 
                                React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "확인")
                            )
                        )
                    )
                ), 

                React.createElement("section", {className: "modal modal-full modal-coupon-complete"}, 
                    React.createElement("div", {className: "modal-inner"}, 
                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "content-header"}, 
                                React.createElement("h3", null, "쿠폰사용")
                            ), 
                            React.createElement("div", {className: "bg-use-step"}), 
                            React.createElement("div", {className: "use-step-wrap"}, 
                                React.createElement("div", {className: "roundbox"}, 
                                    React.createElement("div", {className: "top-text"}, 
                                        React.createElement("div", {className: "coupon-kind plus"}, React.createElement("span", {className: "hanareum"}, "한아름 제휴"), "coupon 플러스"), 
                                        React.createElement("strong", null, "사용완료!"), 
                                        "고객님께 확인을 부탁드립니다"
                                    ), 
                                    React.createElement("div", {className: "complete"}, 
                                        React.createElement("div", {className: "shop-name"}, "스타벅스 강남2호점"), 
                                        React.createElement("div", {className: "coupon-use-number"}, "쿠폰 NO : ", React.createElement("span", null, "00000-00000-00000-00000"))
                                    ), 
                                    React.createElement("div", {className: "bottombox"}, 
                                        React.createElement("div", {className: "text"}, 
                                            React.createElement("strong", null, "아메리카노50%할인"), 
                                            React.createElement("p", null, 
                                                "아메리카노를 여러분께 절반의 가격으로 마구마구 쏩니다!" + ' ' +
                                                "아늑한 분위기에서 더 저렴하고  더 편안하게 즐기세요!"
                                            )
                                        )
                                    ), 
                                    React.createElement("div", {className: "btnbox"}, 
                                        React.createElement("a", {href: "javascript:void(0);"}, "확인")
                                    )
                                )
                            )
                        )
                    )
                )
                
            )

        )
    }
});


