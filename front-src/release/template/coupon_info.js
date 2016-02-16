/*********************************************************************************
 * CouponInfo class
 * html template
 *********************************************************************************/
var CouponInfo = React.createClass({displayName: "CouponInfo",
    getInitialState:function() {
        return ({list:['']});
    },
    componentDidMount:function() {
        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();
        jQuery('.contentsScroll').height(jQuery(window).height()-jQuery('.header').height());

        var _this=this,
            _data={
                coupon_idx:parseInt(_this.props.coupon_idx)
            };

        twCommonUi.getApiData(
            {
                'url':loc[16].api[0],
                'type':'json',
                'method':'post',
                'data':_data
            },
            'html',
            React.addons,
            function(listType,resp,reactAddons) {
                var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                //setState excute react render
                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                    _this.setState({
                        list: _newList.list[0].ResultData
                    });

                    //교환하기 클릭
                    jQuery('.notice-agreebox .btn-type3').off('tap').on('tap',function(e) {
                        e.stopPropagation();

                        if(jQuery('.notice-agreebox .inp-check').hasClass('active')) {
                            console.log('dd');
                        }
                    });

                    //data-shop-name={coin.shop_name} data-lat={coin.shop_latitude} data-lng={coin.shop_longitude}
                    //매장 지도 보기
                    jQuery('.view-info .btn-shop-map').off('tap').on('tap',function(e) {
                        e.stopPropagation();

                        jQuery('.modal.modal-map .map').css({
                            'width':'100%',
                            'height':jQuery(window).height() - jQuery('.modal.modal-map .content-header').height()
                        });

                        var _category=[{
                            shop_latitude: jQuery(this).attr('data-lat'),
                            shop_longitude: jQuery(this).attr('data-lng'),
                            shop_category: jQuery(this).attr('data-category'),
                            shop_name: jQuery(this).attr('data-shop-name')
                        }];

                        jQuery('.modal.modal-map .content-header h3').text(_category[0].shop_name);
                        twCommonUi.showModal(jQuery('.modal.modal-map'));

                        twCommonUi.initialGoogleMap(
                            {
                                lat: _category[0].shop_latitude,
                                lng: _category[0].shop_longitude
                            },
                            null,
                            [
                                {
                                    lat: 0,
                                    lng: 0,
                                    title: 'Lima',
                                    details: {
                                        database_id: 42,
                                        author: 'HPNeo'
                                    },
                                    title: 'Marker with InfoWindow',
                                    infoWindow: {
                                        content: '<p>' + jQuery('.shop-banner .txt').text() + '</p>'
                                    },
                                    click: function (e) {
                                        console.log('You clicked in this marker');
                                    }
                                }

                            ],
                            '.map',
                            'static'
                        );

                        twCommonUi.initMarker(_category, 'static');

                    });

                    //매장 상세 보기
                    jQuery('.view-info .btn-shop-detail').off('tap').on('tap',function(e) {
                        e.stopPropagation();
                        location.href="#/shop-detail/"+_newList.list[0].ResultData[0].Shop_idx+"?lat="+_newList.list[0].ResultData[0].shop_latitude+"&lng="+_newList.list[0].ResultData[0].shop_longitude;
                    });

                    //교환하기
                    jQuery('.notice-agreebox .btn-type3').off('tap').on('tap',function(e) {
                        e.stopPropagation();

                        if(jQuery('.notice-agreebox .inp-check').hasClass('active')) {

                            var _data_member={
                                    u_idx:(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1
                                },
                                _data_coupon={
                                    u_idx:(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                                    coupon_master_idx:_newList.list[0].ResultData[0].coupon_master_idx
                                };
                            //쿠폰 교환
                            reqwest({
                                url: loc[16].api[2], //회원 정보 조회
                                method: 'post',
                                type: 'json',
                                data: _data_member
                            })
                            .then(function (resp) {
                                /*************************
                                 resp.ResultCode
                                 '1'=success
                                 '-1'=fail
                                 *************************/
                                if (resp[0].ResultCode == '1') { //회원정보 조회 성공
                                    //0 : 임시회원 ,1: 정상회원, -1 : 탈퇴 요청, -2: 탈퇴 완료 (계정 삭제), -3: 블럭 , -4 : 임시회원 데이터이전 완료
                                    if(resp[0].ResultData[0].u_status>0) {
                                        //내가 가진 min보다 쿠폰 min이 더 크면 교환하지 않는다.
                                        if(resp[0].ResultData[0].min>=jQuery('.min-point em').text()) {
                                            jQuery('.message .coupon-detail').text(resp[0].ResultData[0].coupon_master_descriptionon);
                                            jQuery('.message .exchange-min span:first').text(_this.state.min);
                                            twCommonUi.showModal(jQuery('.modal.modal-coupon-exchange'));

                                            jQuery('.modal.modal-coupon-exchange .btn-type1').off('tap').on('tap',function() {
                                                //쿠폰 교환
                                                reqwest({
                                                    url: loc[16].api[1], //쿠폰 교환
                                                    method: 'post',
                                                    type: 'json',
                                                    data: _data_coupon
                                                })
                                                .then(function (resp) {
                                                    /*************************
                                                     resp.ResultCode
                                                     '1'=success
                                                     '-1'=fail
                                                     *************************/
                                                    if (resp[0].ResultCode == '1') { //쿠폰 교환성공
                                                        twCommonUi.hideModal(jQuery('.modal.modal-coupon-exchange'));

                                                        setTimeout(function() {
                                                            twCommonUi.showModal(jQuery('.modal.modal-exchange-complete'));

                                                            jQuery('.modal.modal-exchange-complete .btn-type1').off('tap').on('tap',function(e) {
                                                                e.stopPropagation();
                                                                location.href='#/my-coupon-use/'+resp[0].coupon_idx;
                                                            });
                                                        },300);
                                                    } else {
                                                    }
                                                })
                                                .fail(function (err, msg) {
                                                    console.log(err);
                                                    jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
                                                });

                                            });
                                        } else {
                                            twCommonUi.showModal(jQuery('.modal.modal-not-enought'));
                                        }
                                    } else {
                                        twCommonUi.showModal(jQuery('.modal.modal-need-join'));
                                    }
                                } else {
                                }
                            })
                            .fail(function (err, msg) {
                                console.log(err);
                                jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
                            });

                        }
                    });

                    React.render(React.createElement(ModalAll, {couponInfo:_newList.list[0].ResultData[0]}), document.getElementsByClassName('modal-wrap')[0]);
                }

                //enable scroll to set data
                //twCommonUi.scrollLoading = true;
            }
        );

        /**********************************
         * connect beacon state modal
         * 위치검색 modal
         ********************************/
        twCommonUi.scriptLoadNext(
            [
                _domainJsx+'shop_state.js'
            ]
            ,true
            ,function() {
                setTimeout(function() {
                    React.render(React.createElement(ShopState, null), document.getElementsByClassName('beaconState')[0]);
                },300)
            }
        );

    },
    render : function () {

        var _contents=null,
            _contents_detail=function(coupon,idx) {
                var _coupon_kind={
                        cls:'',
                        txt:''
                    },
                    _coupon_background={
                        'background-image':'url('+coupon.cafe_logo+')'
                    },
                    _shop_background={
                        'background-image':'url('+coupon.shop_logo_image+')'
                    },
                    _coin_save_yn=null,
                    _width_70={
                        'width':'70px'
                    },
                    _width_fluid={
                        'width':'*'
                    },
                    _txt=null;

                if(coupon.shop_coin_save_yn=='Y') {
                    //코인 적립 데이터가 없음
                    _coin_save_yn=React.createElement("div", {className: "info-notice"}, "구매한 쿠폰 사용시 ", React.createElement("span", null, "100coin"), "이 적립됩니다!");
                    _txt=React.createElement("span", {className: "useable-shop"}, "사용가능매장");
                }

                 if(coupon.coupon_type==1) { //할인
                     _coupon_kind.cls = ' discount';
                     _coupon_kind.txt = 'cupon 할인';
                 } else if(coupon.coupon_type==2) { //증정
                     _coupon_kind.cls = ' freebies';
                     _coupon_kind.txt = 'cupon 사은품';
                 } else if(coupon.coupon_type==3) { //1+1
                     _coupon_kind.cls = ' plus';
                     _coupon_kind.txt = 'cupon 플러스';
                 } else { //무료
                     _coupon_kind.cls = ' free';
                     _coupon_kind.txt = 'cupon 무료';
                 }

                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "view-coupon"}, 
                            React.createElement("div", {className: "coupon-imgbox"}, 
                                React.createElement("div", {className: "imgarea"}, 
                                    React.createElement("div", {className: "coupon-kind"+_coupon_kind.cls}, React.createElement("span", {className: "hanareum", style: _coupon_background}, "한아름 제휴"), _coupon_kind.txt)
                                ), 

                                React.createElement("div", {className: "coupon-top-info"}, 
                                    React.createElement("strong", {className: "coupon-detail"}, coupon.coupon_master_name), 
                                    React.createElement("div", {className: "info"}, 
                                        React.createElement("div", {className: "coupon-until"}, React.createElement("span", null, coupon.coupon_startdate), "부터 ", React.createElement("span", null, coupon.coupon_enddate), "까지"), 
                                        React.createElement("div", {className: "txt"}, coupon.coupon_masterdescription)
                                    )
                                )

                            ), 

                            _coin_save_yn
                        ), 

                        React.createElement("div", {className: "view-coupon-txt"}, 
                            React.createElement("p", {className: "paper-min"}, React.createElement("strong", null, "1"), "매 ", React.createElement("span", {className: "min-point"}, React.createElement("em", null, coupon.coupon_min_point), "min")), 
                            React.createElement("div", {className: "view-info"}, 
                                React.createElement("span", {className: "shop-logo", style: _shop_background}), 
                                _txt, 
                                React.createElement("strong", {className: "coupon-shop-name"}, coupon.shop_name), 
                                React.createElement("div", {className: "tb-shop-info"}, 
                                    React.createElement("table", null, 
                                        React.createElement("caption", null, "매장정보"), 
                                        React.createElement("colgroup", null, 
                                            React.createElement("col", {style: _width_70}), 
                                            React.createElement("col", {style: _width_fluid})
                                        ), 
                                        React.createElement("tbody", null, 
                                        React.createElement("tr", null, 
                                            React.createElement("th", {scope: "row"}, "주소"), 
                                            React.createElement("td", null, coupon.shop_address)
                                        ), 
                                        React.createElement("tr", null, 
                                            React.createElement("th", {scope: "row"}, "전화번호"), 
                                            React.createElement("td", null, React.createElement("a", {href: "tel:"+coupon.shop_phone}, coupon.shop_phone))
                                        ), 
                                        React.createElement("tr", null, 
                                            React.createElement("th", {scope: "row"}, "영업시간"), 
                                            React.createElement("td", null, coupon.shop_open_time)
                                        ), 
                                        React.createElement("tr", null, 
                                            React.createElement("th", {scope: "row"}, "휴무일"), 
                                            React.createElement("td", null, coupon.shop_holiday)
                                        ), 
                                        React.createElement("tr", null, 
                                            React.createElement("th", {scope: "row"}, "홈페이지"), 
                                            React.createElement("td", null, React.createElement("a", {href: coupon.shop_url, target: "_blank"}, coupon.shop_url))
                                        )
                                        )
                                    ), 
                                    React.createElement("a", {className: "btn-shop-map", "data-shop-name": coupon.shop_name, "data-lat": coupon.shop_latitude, "data-lng": coupon.shop_longitude, "data-category": coupon.coupon_category, href: "javascript:void(0);"}, "지도로 가기"), 
                                    React.createElement("a", {className: "btn-shop-detail", href: "javascript:void(0);"}, "매장상세정보로가기")
                                ), 

                                React.createElement("div", {className: "notice"}, 
                                    React.createElement("p", {className: "notice-title"}, "쿠폰 사용 시 주의사항"), 
                                    React.createElement("ul", null, 
                                        React.createElement("li", null, "- 본 매장 어디서든 사용가능 (단, 역사점은 불가능)"), 
                                        React.createElement("li", null, "- 타 쿠폰과 중복사용 불가"), 
                                        React.createElement("li", null, "- 예약 필수"), 
                                        React.createElement("li", null, "- 주말 및 공휴일 제외"), 
                                        React.createElement("li", null, "- 사용기간 : 발급일로부터 7일")
                                    ), 
                                    React.createElement("p", {className: "notice-title"}, "타임월렛 주의사항"), 
                                    React.createElement("ul", null, 
                                        React.createElement("li", null, "- 본 매장 어디서든 사용가능 (단, 역사점은 불가능)"), 
                                        React.createElement("li", null, "- 타 쿠폰과 중복사용 불가"), 
                                        React.createElement("li", null, "- 예약 필수"), 
                                        React.createElement("li", null, "- 주말 및 공휴일 제외"), 
                                        React.createElement("li", null, "- 사용기간 : 발급일로부터 7일")
                                    )
                                )

                            )

                        ), 

                        React.createElement("div", {className: "notice-agreebox"}, 
                            React.createElement("div", {className: "inp-check"}, 
                                React.createElement("input", {type: "checkbox", id: "check1", name: "noticeAgree"}), 
                                React.createElement("label", {for: "check1"}, 
                                    React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})), 
                                    React.createElement("span", {className: "text"}, "위 주의사항에 동의합니다.")
                                )
                            ), 
                            React.createElement("div", {className: "btn-wrap"}, 
                                React.createElement("a", {className: "btn-type3", href: "javascript:void(0);"}, "교환하기")
                            )
                        )

                    )
                );
            };

        if(this.state.list[0]!='') {
            if(this.state.list.length>0) {
                _contents=this.state.list.map(_contents_detail);
            }
        }

        return (
            React.createElement("div", {className: "page "+loc[16].pageName+" "+this.props.position}, 
                React.createElement("div", {className: "contentsScroll"}, 
                    _contents
                ), 
                React.createElement("div", {className: "beaconState"})
            )
        )
    }
});

/**********************************
 * 리뷰관련 모달
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

        return (
            React.createElement("div", null, 
                React.createElement(ModalMap, {dataStyle: props}), 
                React.createElement(ModalCoupon, {dataStyle: props, couponInfo: this.props.couponInfo})
            )
        )
    }
});

/*********************************************************************************
 * modalmap class
 * html template
 *********************************************************************************/
var ModalMap = React.createClass({displayName: "ModalMap",
    componentDidMount:function() {

        jQuery('.modal.modal-map .btn-close').on('tap',function() {
            twCommonUi.hideModal(jQuery('.modal.modal-map'));
            jQuery('.modal.modal-map .map').empty();
        });
    },
    render : function () {
        return (
            React.createElement("section", {className: "modal modal-map", style: this.props.dataStyle}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "content-header"}, 
                            React.createElement("h3", null), 
                            React.createElement("a", {className: "btn-close", href: "javascript:void(0);"}, "닫기")
                        ), 
                        React.createElement("div", {className: "map"}
                        )
                    )
                )
            )
        )
    }
});

/*********************************************************************************
 * modalcoupon class
 * html template
 *********************************************************************************/
var ModalCoupon = React.createClass({displayName: "ModalCoupon",
    componentDidMount:function() {
        //로그인 버튼
        jQuery('.modal.modal-need-join .btn-type2').off('tap').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal'));
            location.href="#/member-login";
        });

        //회원가입 버튼
        jQuery('.modal.modal-need-join .btn-type1').off('tap').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal'));
            location.href="#/member-join";
        });

        //min 부족 확인 버튼
        jQuery('.modal.modal-not-enought .btn-type1').off('tap').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-not-enought'));
        });

        //쿠폰 교환 취소 버튼
        jQuery('.modal.modal-coupon-exchange .btn-type2').off('tap').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-coupon-exchange'));
        });

        //쿠폰 교환 완료 닫기 버튼
        jQuery('.modal.modal-exchange-complete .btn-type2').off('tap').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-exchange-complete'));
        });


    },
    render : function () {
        var _coupon=this.props.couponInfo,
            _coupon_kind={
                cls:'',
                txt:''
            },
            _coupon_background={
                'background-image':'url('+_coupon.cafe_logo+')'
            };

        if(_coupon.coupon_type==1) { //할인
            _coupon_kind.cls = ' discount';
            _coupon_kind.txt = 'cupon 할인';
        } else if(_coupon.coupon_type==2) { //증정
            _coupon_kind.cls = ' freebies';
            _coupon_kind.txt = 'cupon 사은품';
        } else if(_coupon.coupon_type==3) { //1+1
            _coupon_kind.cls = ' plus';
            _coupon_kind.txt = 'cupon 플러스';
        } else { //무료
            _coupon_kind.cls = ' free';
            _coupon_kind.txt = 'cupon 무료';
        }

        return (
            React.createElement("div", null, 
                React.createElement("section", {className: "modal modal-small modal-need-join", style: this.props.dataStyle}, 
                    React.createElement("div", {className: "modal-inner"}, 
                        React.createElement("div", {className: "modal-header icon-type3"}), 

                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "message"}, 
                                React.createElement("span", {className: "text-type1"}, "쿠폰을 사용하기 위해서는 ", React.createElement("br", null), "로그인이 필요합니다.")
                            )
                        ), 

                        React.createElement("div", {className: "modal-footer"}, 
                            React.createElement("div", {className: "btnbox"}, 
                                React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "로그인"), 
                                React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "회원가입")
                            )
                        )
                    )
                ), 

                React.createElement("section", {className: "modal modal-small modal-not-enought", style: this.props.dataStyle}, 
                    React.createElement("div", {className: "modal-inner"}, 
                        React.createElement("div", {className: "modal-header icon-type3"}), 

                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "message"}, 
                                React.createElement("span", {className: "text-type1"}, "min이 부족합니다.")
                            )
                        ), 

                        React.createElement("div", {className: "modal-footer"}, 
                            React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "확인")
                        )
                    )
                ), 

                React.createElement("section", {className: "modal modal-coupon-exchange", style: this.props.dataStyle}, 
                    React.createElement("div", {className: "modal-inner"}, 
                        React.createElement("div", {className: "modal-header"}, 
                            React.createElement("div", {className: "coupon-kind"+_coupon_kind.cls}, React.createElement("span", {className: "hanareum", style: _coupon_background}, "한아름 제휴"), _coupon_kind.txt)
                        ), 

                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "message"}, 
                                React.createElement("p", {className: "coupon-detail"}, _coupon.coupon_use_description), 
                                React.createElement("p", {className: "exchange-min"}, React.createElement("strong", null, React.createElement("span", null, _coupon.coupon_min_point), "min")), 
                                React.createElement("p", {className: "text-type1"}, "교환하시겠습니까?"), 
                                React.createElement("p", {className: "text-type5"}, "교환된 쿠폰은 나의쿠폰에서 확인가능합니다.")
                            )
                        ), 

                        React.createElement("div", {className: "modal-footer fix"}, 
                            React.createElement("div", {className: "btnbox"}, 
                                React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "취소"), 
                                React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "확인")
                            )
                        )
                    )
                ), 

                React.createElement("section", {className: "modal modal-small modal-exchange-complete", style: this.props.dataStyle}, 
                    React.createElement("div", {className: "modal-inner"}, 
                        React.createElement("div", {className: "modal-header icon-type4"}), 

                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "message"}, 
                                React.createElement("span", {className: "text-type1"}, "교환이 완료되었습니다.")
                            )
                        ), 

                        React.createElement("div", {className: "modal-footer"}, 
                            React.createElement("div", {className: "btnbox"}, 
                                React.createElement("a", {className: "btn-type2", href: "javascript:void(0);"}, "닫기"), 
                                React.createElement("a", {className: "btn-type1", href: "javascript:void(0);"}, "바로사용")
                            )
                        )
                    )
                )
            )
        )
    }
});


