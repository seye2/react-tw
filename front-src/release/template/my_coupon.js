/*********************************************************************************
 * MyCouponUse class
 * html template
 *********************************************************************************/
var MyCoupon = React.createClass({displayName: "MyCoupon",
    componentDidMount:function() {

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
        var _contents_list=null;

             _contents_list=React.createElement(MyCouponList, null);

        return (
            React.createElement("div", {className: "page "+loc[18].pageName+" "+this.props.position}, 
                React.createElement("div", {className: "common-tab count-3 coin-donate-tab"}, 
                    React.createElement("ul", {className: "fix"}, 
                        React.createElement("li", null, React.createElement("a", {className: "all-coupon active", href: "javascript:void(0);"}, "전체쿠폰")), 
                        React.createElement("li", null, React.createElement("a", {className: "no-use-coupon", href: "javascript:void(0);"}, "미사용")), 
                        React.createElement("li", null, React.createElement("a", {className: "use-coupon", href: "javascript:void(0);"}, "사용완료"))
                    )
                ), 

                React.createElement("div", {className: "my-coupon-del"}, 
                    React.createElement("a", {className: "", href: "javascript:void(0);"}, "사용완료•만료 쿠폰삭제")
                ), 

                _contents_list, 

                React.createElement("div", {className: "beaconState"})
            )
        )
    }
});

var MyCouponList = React.createClass({displayName: "MyCouponList",
    getInitialState:function() {
        return ({list:[''],page:1,totalpage:1});
    },
    componentDidMount:function() {
        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();
        jQuery('.coupon-list').height(jQuery(window).height()-jQuery('.header').height()-jQuery('.common-tab').height()-jQuery('.my-coupon-del').height());

        var _$category = jQuery('.common-tab li a');

        var _this=this,
            _data={
                u_idx:(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                category:1,
                page:1
            };

        twCommonUi.getApiData(
            {
                'url':loc[18].api[0],
                'type':'json',
                'method':'post',
                'data':_data
            },
            'html',
            React.addons,
            function(listType,resp,reactAddons) {
                var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);
                console.log(_newList.list[0]);
                //setState excute react render
                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                    _this.setState({
                        list: _newList.list[0].ResultData,
                        totalpage: _newList.list[0].totalpage
                    });

                    //쿠폰 상세보기
                    jQuery('.coupon-list .couponbox li').on('tap',function(e) {
                        e.stopPropagation();
                        location.href='#/coupon-info/'+jQuery(this).attr('data-coupon-idx');
                    });
                }

                //enable scroll to set data
                twCommonUi.scrollLoading = true;

            }
        );

        /**********************************
         * @param : scroll target
         **********************************/
        twCommonUi.listScrollLoading('.coupon-list',function() {
            //compare current page count to total page count
            if(_data.page>=_this.state.totalpage) {
                _data.page=1;
                twCommonUi.scrollLoading = false;
            } else {

                /**********************************
                 * @param : Shop_List parameters
                 **********************************/
                _data.page=_data.page+1;
                twCommonUi.getApiData(
                    {
                        'url':_loc[15].api[0],
                        'type':'json',
                        'method':'post',
                        'data':_data
                    },
                    'append',
                    React.addons,
                    function(listType,resp,reactAddons) {

                        var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                        //setState excute react render
                        if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                            _this.setState({
                                list: _newList.list[0].ResultData,
                                totalPage: _newList.list[0].totalpage
                            });

                            //쿠폰 상세보기
                            jQuery('.coupon-list .couponbox li').on('tap',function(e) {
                                e.stopPropagation();
                                location.href='#/coupon-info/'+jQuery(this).attr('data-coupon-idx');
                            });
                        }

                        //enable scroll to set data
                        twCommonUi.scrollLoading = true;
                    }
                );
            }
        });

        /**********************************
         * tab click
         *********************************/
        _$category.off('tap').on('tap',function(e) {
            e.stopPropagation();
            /**********************************
             * param : target tag, tap
             *********************************/
            twCommonUi.tab(_$category,this,function(_txtName,$target) {
                if (_txtName == '전체쿠폰') {
                    _data.category = 1;
                } else if (_txtName == '미사용') {
                    _data.category = 2;
                } else {
                    _data.category = 3;
                }

                _data.page = 1;


                twCommonUi.getApiData(
                    {
                        'url': loc[18].api[0],
                        'type': 'json',
                        'method': 'post',
                        'data': _data
                    },
                    'html',
                    React.addons,
                    function (listType, resp, reactAddons) {
                        var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);

                        //setState excute react render
                        if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                            _this.setState({
                                list: _newList.list[0].ResultData
                            });

                            //쿠폰 상세보기
                            jQuery('.coupon-list .couponbox li').on('tap',function(e) {
                                e.stopPropagation();
                                location.href='#/coupon-info/'+jQuery(this).attr('data-coupon-idx');
                            });
                        }
                    }
                );
            });
        });

        jQuery('.my-coupon-del a').off('tap').on('tap',function(e) {
            e.stopPropagation();
            var _data_delete={
                u_idx:(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1
            };

            //쿠폰 교환
            reqwest({
                url: loc[18].api[1], //쿠폰 삭제
                method: 'post',
                type: 'json',
                data: _data_delete
            })
            .then(function (resp) {
                /*************************
                 resp.ResultCode
                 '1'=success
                 '-1'=fail
                 *************************/
                if (resp[0].ResultCode == '1') { //쿠폰삭제
                    var _txtName=jQuery('.commob-tab li a.active').text();

                    BRIDGE.appAlert({title:"",msg:"사용(기한 만료된) 쿠폰이 삭제되었습니다."});

                    if (_txtName == '전체쿠폰') {
                        _data.category = 1;
                    } else if (_txtName == '미사용') {
                        _data.category = 2;
                    } else {
                        _data.category = 3;
                    }

                    _data.page = 1;

                    twCommonUi.getApiData(
                        {
                            'url': loc[18].api[0],
                            'type': 'json',
                            'method': 'post',
                            'data': _data
                        },
                        'html',
                        React.addons,
                        function (listType, resp, reactAddons) {
                            var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);

                            //setState excute react render
                            if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                                _this.setState({
                                    list: _newList.list[0].ResultData
                                });

                                //쿠폰 상세보기
                                jQuery('.coupon-list .couponbox li').on('tap',function(e) {
                                    e.stopPropagation();
                                    location.href='#/coupon-info/'+jQuery(this).attr('data-coupon-idx');
                                });
                            }
                        }
                    );

                } else {
                }
            })
            .fail(function (err, msg) {
                console.log(err);
                jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
            });

        });


    },
    render : function () {
        var _contents_list=null,
            _link='javascript:void(0);',
            _createItem=function(coupon,idx) {
                console.log(coupon);
                var _coupon_kind={
                        cls:'',
                        txt:''
                    },
                    _coupon_background={
                        'background-image':'url('+coupon.cafe_logo+')'
                    };

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

                var _background={
                        'background-image':'url('+coupon.coupon_image_s+')'
                    },
                    _able='able-use';

                if(coupon.coupon_use_yn!='Y') {
                    _able='disable-use';
                } else {
                    _link="#/my-coupon-use/"+coupon.coupon_idx;
                }

                return (
                    React.createElement("li", {"data-coupon-idx": coupon.coupon_idx}, 
                        React.createElement("div", {className: "coupon-wrap fix"}, 
                            React.createElement("div", {className: "coupon-kind"+_coupon_kind.cls}, React.createElement("span", {className: "hanareum", style: _coupon_background}, "한아름 제휴"), _coupon_kind.txt), 
                            React.createElement("div", {className: "coupon-balloons"}, 
                                React.createElement("span", {className: "coupon-shop-name"}, coupon.shop_name), 
                                React.createElement("p", {className: "coupon-detail"}, coupon.coupon_master_name), 
                                React.createElement("span", {className: "coupon-until"}, coupon.coupon_enddate, "까지")
                            ), 
                            React.createElement("div", {className: "coupon-use-ox"}, 
                                React.createElement("a", {className: _able, href: _link}, "사용하기")
                            )
                        )
                    )
                );
            };

        if(this.state.list[0]!='') {
            if (this.state.list.length > 0) {
                console.log(this.state.list);
                _contents_list = this.state.list.map(_createItem);
            } else {
                _contents_list = React.createElement(MyCouponEmpty, null);
            }
        }

        return (
            React.createElement("div", {className: "coupon-list"}, 
                React.createElement("ul", {className: "couponbox"}, 
                    _contents_list

                )
            )
        )
    }
});

/*********************************************************************************
 * MyCouponEmpty class
 * html template
 *********************************************************************************/
var MyCouponEmpty = React.createClass({displayName: "MyCouponEmpty",
    render : function () {
        var _border={
                border:0
            },
            _p={
                padding:0,
                background:'none'
            };

        return (
            React.createElement("li", {style: _border}, 
                React.createElement("div", {className: "no-data"}, 
                    React.createElement("div", {className: "no-data-ment"}, 
                        React.createElement("p", {style: _p, className: "text-type2"}, "교환가능한 쿠폰이 없습니다.")
                    )
                )
            )
        )
    }
});



