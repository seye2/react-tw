/*********************************************************************************
 * CouponExchange class
 * html template
 *********************************************************************************/
var CouponExchange = React.createClass({displayName: "CouponExchange",
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
                    //React.render(React.createElement(ModalAll, null), document.getElementsByClassName('modal-wrap')[0]);

                },300)
            }
        );

    },
    render : function () {
        var _contents_tab=null,
            _contents_place=null,
            _contents_list=null;

        _contents_tab=React.createElement(CouponExchangeTab, null);
        _contents_place=React.createElement(CouponExchangePlace, null);
        _contents_list=React.createElement(CouponExchangeList, null);

        return (
            React.createElement("div", {className: "page "+loc[15].pageName+" "+this.props.position}, 
                _contents_tab, 
                _contents_place, 
                _contents_list, 
                React.createElement("div", {className: "innerShadow"}), 
                React.createElement("div", {className: "beaconState"})
            )
        )
    }
});

/*********************************************************************************
 * CouponExchangetab class
 * html template
 *********************************************************************************/
var CouponExchangeTab = React.createClass({displayName: "CouponExchangeTab",
    render : function () {
        return (
            React.createElement("div", {className: "category"}, 
                React.createElement("ul", {className: "category-inner fix"}, 
                    React.createElement("li", null, React.createElement("a", {className: "all active", href: "javascript:void(0);"}, React.createElement("span", {className: "icon"}, React.createElement("i", {className: "fa fa-check-circle"})), React.createElement("span", {className: "title"}, "모두"))), 
                    React.createElement("li", null, React.createElement("a", {className: "food", href: "javascript:void(0);"}, React.createElement("span", {className: "icon"}, React.createElement("i", {className: "fa fa-cutlery"})), React.createElement("span", {className: "title"}, "음식"))), 
                    React.createElement("li", null, React.createElement("a", {className: "drink", href: "javascript:void(0);"}, React.createElement("span", {className: "icon"}, React.createElement("i", {className: "fa fa-coffee"})), React.createElement("span", {className: "title"}, "음료"))), 
                    React.createElement("li", null, React.createElement("a", {className: "beauty", href: "javascript:void(0);"}, React.createElement("span", {className: "icon"}, React.createElement("i", {className: "fa fa-scissors"})), React.createElement("span", {className: "title"}, "뷰티"))), 
                    React.createElement("li", null, React.createElement("a", {className: "life", href: "javascript:void(0);"}, React.createElement("span", {className: "icon"}, React.createElement("i", {className: "fa fa-smile-o"})), React.createElement("span", {className: "title"}, "생활"))), 
                    React.createElement("li", null, React.createElement("a", {className: "delivery", href: "javascript:void(0);"}, React.createElement("span", {className: "icon"}, React.createElement("i", {className: "fa fa-phone"})), React.createElement("span", {className: "title"}, "주문"))), 
                    React.createElement("li", null, React.createElement("a", {className: "edu-health", href: "javascript:void(0);"}, React.createElement("span", {className: "icon"}, React.createElement("i", {className: "fa fa-stethoscope"})), React.createElement("span", {className: "title"}, "교육/의료")))
                )
            )
        )
    }
});

/*********************************************************************************
 * CouponExchangeplace class
 * html template
 *********************************************************************************/
var CouponExchangePlace = React.createClass({displayName: "CouponExchangePlace",
    getInitialState:function() {
        return({loc:''});
    },
    componentDidMount:function() {
        var _this=this;
        //현재 내 위치 및 텍스트 출력
        BRIDGE.getLocation(function (loc) {

            _obj = {
                lat: function () {
                    return loc.lati;
                },
                lng: function () {
                    return loc.longi;
                }

            };

            var geocoder = new google.maps.Geocoder(),
                latlng = {lat: parseFloat(_obj.lat()), lng: parseFloat(_obj.lng())};

            geocoder.geocode({'location': latlng}, function (r, s) {
                if (s == google.maps.GeocoderStatus.OK) {
                    if (r[1]) {
                        _this.setState({
                            loc:r[0].address_components[1].short_name
                        });
                    }
                }
            });
        });
    },
    render : function () {
        return (
            React.createElement("div", {className: "place"}, 
                React.createElement("div", {className: "place-inner fix"}, 
                    React.createElement("div", {className: "order"}, 
                        React.createElement("div", {className: "list"}, 
                            React.createElement("a", {href: "javascript:void(0);"}, 
                                React.createElement("div", {className: "btn-sort"}, 
                                    React.createElement("p", null, 
                                        React.createElement("strong", null, React.createElement("em", null), React.createElement("span", null))
                                    )
                                ), 
                                React.createElement("span", {className: "title"}, "거리순"), 
                                React.createElement("i", {className: "fa fa-caret-down"})
                            )
                        ), 
                        React.createElement("ul", {className: "key-list"}, 
                            React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "거리순")), 
                            React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "인기순")), 
                            React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "마감임박순")), 
                            React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "min 낮은순"))
                        )
                    ), 
                    React.createElement("div", {className: "location"}, 
                        React.createElement("a", {className: "btn-title-location", href: "javascript:void(0);"}, "내위치"), 
                        React.createElement("a", {className: "btn-location", href: "javascript:void(0);"}, this.state.loc)
                    )
                )
            )
        )
    }
});

/*********************************************************************************
 * CouponExchangelist class
 * html template
 *********************************************************************************/
var CouponExchangeList = React.createClass({displayName: "CouponExchangeList",
    getInitialState:function() {
        return ({list:[''],totalpage:1});
    },
    componentDidMount:function() {
        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();

        var _this=this,
            _$category = jQuery('.category li a'),
            _loc=loc,
            _data={
                'u_idx': (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                'latitude':'',
                'longitude':'',
                'coupon_category':'',
                'sort':1,
                'available':'n',
                'page':1

            };

        BRIDGE.getLocation(function (loc) {

            _obj={
                lat:function() {
                    return loc.lati;
                },
                lng:function() {
                    return loc.longi;
                }

            };

            //jQuery('.header').data('shoplist',{location:r[0].address_components[1].short_name,category:''});
            _data.latitude=_obj.lat();
            _data.longitude=_obj.lng();

            twCommonUi.getApiData(
                {
                    'url':_loc[15].api[0],
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

        });

        /**********************************
         * @param : scroll target
         **********************************/
        twCommonUi.listScrollLoading('.coupon-list',function() {
            //compare current page count to total page count
            if(_data.page>=this.state.totalpage) {
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
                                totalpage: _newList.list[0].totalpage
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
        _$category.on('tap',function(e) {
            e.stopPropagation();
            /**********************************
             * param : target tag, tap
             *********************************/
            twCommonUi.tab(_$category,this,function(_txtName,$target) {
                jQuery('.search-list .slickSlide').scrollTop(0);
                if (_txtName == '모두') {
                    _data.coupon_category = '';
                } else if(_txtName == '교육/의료') {
                    _data.coupon_category=_txtName.split('/')[0];
                } else {
                    _data.coupon_category=_txtName;
                }

                _data.page=1;

                twCommonUi.getApiData(
                    {
                        'url':_loc[15].api[0],
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
            });
        });

        // 쿠폰교환 정렬순 클릭시
        jQuery('.order .list a').on('tap',function(e) {
            var _$this=jQuery(this).closest('.order');
            console.log(_$this.attr('class'));
            if(!_$this.attr('class').match('active')) {
                _$this.addClass('active');
                jQuery('.innerShadow').show();
            } else {
                _$this.removeClass('active');
                jQuery('.innerShadow').hide();
            }
            e.stopPropagation();
        });

        // 쿠폰교환 정렬 종류 탭시
        jQuery('.key-list a').on('tap',function(e) {
            var _$this=jQuery(this);
            var _$alignText=jQuery(this).text();
            var _$dest=jQuery('.list').find('.title');
            _$dest.text(_$alignText);

            jQuery('.order').removeClass('active');
            jQuery('.innerShadow').hide();

            _data.page=1;
            _data.sort=(jQuery(this).closest('li').index()+1);

            twCommonUi.getApiData(
                {
                    'url':_loc[15].api[0],
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

            e.stopPropagation();
        });

        // 쿠폰 교환가능 쿠폰만 보기 탭시 (11.13 미구현 available값을 알 수가 없음)
        jQuery('.btn-coupon-view').on('tap',function(e) {
            var _$this=jQuery(this);
            var _$sortViewText=jQuery(this).text();
            var _$dest=jQuery('.sort-coupon').find('.btn-coupon-view');

            if(!_$this.attr('class').match('active')) {
                _$dest.text('모든 쿠폰 보기');
                _$this.addClass('active');
                _data.available='y';
            } else {
                _$dest.text('교환가능 쿠폰만 보기');
                _$this.removeClass('active');
                _data.available='n';
            }

            twCommonUi.getApiData(
                {
                    'url':_loc[15].api[0],
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

            e.stopPropagation();
        });

        //내위치 선택 및 리시트 갱신
        jQuery ('.place .btn-title-location').on('tap',function(e) {
            BRIDGE.getLocation(function (loc) {
                _data.latitude=loc.lati;
                _data.longitude=loc.longi;
                _data.page=1;

                twCommonUi.getApiData(
                    {
                        'url':_loc[15].api[0],
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
                                list: _newList.list[0].ResultData,
                                totalpage: _newList.list[0].totalpage
                            });

                            //쿠폰 상세보기
                            jQuery('.coupon-list .couponbox li').on('tap',function(e) {
                                e.stopPropagation();
                                location.href='#/coupon-info/'+jQuery(this).attr('data-coupon-idx');
                            });

                        }

                        var geocoder = new google.maps.Geocoder(),
                            latlng={lat:parseFloat(loc.lati),lng:parseFloat(loc.longi)};

                        geocoder.geocode({'location':latlng},function(r,s) {
                            if (s == google.maps.GeocoderStatus.OK) {
                                if (r[1]) {
                                    jQuery('.place .btn-location').text(r[0].address_components[1].short_name);
                                }
                            }
                        });

                        //enable scroll to set data
                        twCommonUi.scrollLoading = true;
                    }
                );
            });
        });
    },
    render : function () {
        var _contents_coupon=null,
            _createCoupons=function(coupon,idx) {
                var _background={
                        'background-image':'url('+coupon.coupon_image_s+')'
                    },
                    _cafe_background={
                        'background-image':'url('+coupon.cafe_logo+')'
                    };

                return (
                    React.createElement("li", {"data-coupon-idx": coupon.coupon_master_idx}, 
                        React.createElement("div", {className: "coupon-wrap fix"}, 
                            React.createElement("div", {className: "coupon-kind plus", style: _background}, React.createElement("span", {className: "hanareum", style: _cafe_background}, "한아름 제휴"), "coupon 플러스"), 
                            React.createElement("div", {className: "coupon-balloons"}, 
                                React.createElement("span", {className: "coupon-shop-name"}, coupon.shop_name), 
                                React.createElement("p", {className: "coupon-detail"}, "아메리카노 50% 할인"), 
                                React.createElement("span", {className: "coupon-until"}, coupon.coupon_enddate)
                            ), 
                            React.createElement("div", {className: "coupon-min"}, 
                                React.createElement("div", {className: "minbox"}, 
                                    React.createElement("span", {className: "min"}, coupon.coupon_min_point), 
                                    React.createElement("span", {className: "unit"}, "min")
                                )
                            )
                        )
                    )

                );
            };

        if(this.state.list[0]!='') {
            if(this.state.list.length>0){
                _contents_coupon=this.state.list.map(_createCoupons);
            } else {
                _contents_coupon=React.createElement(CouponExchangeEmpty, null);
            }
        }

        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "sort-coupon"}, 
                    React.createElement("a", {className: "btn-coupon-view", href: "javascript:void(0);"}, "교환가능 쿠폰만 보기")
                ), 

                React.createElement("div", {className: "coupon-list"}, 
                    React.createElement("ul", {className: "couponbox"}, 
                        _contents_coupon
                    )
                )
            )
        )
    }
});

/*********************************************************************************
 * CouponExchangeempty class
 * html template
 *********************************************************************************/
var CouponExchangeEmpty = React.createClass({displayName: "CouponExchangeEmpty",
    render : function () {
        return (
            React.createElement("div", {className: "no-data"}, 
                React.createElement("div", {className: "no-data-ment"}, 
                    React.createElement("p", {className: "text-type2"}, "교환가능한 쿠폰이 없습니다.")
                )
            )
        )
    }
});



