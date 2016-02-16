/*********************************************************************************
 * CouponExchange class
 * html template
 *********************************************************************************/
var CouponExchange = React.createClass({
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

        _contents_tab=<CouponExchangeTab />;
        _contents_place=<CouponExchangePlace />;
        _contents_list=<CouponExchangeList />;

        return (
            <div className={"page "+loc[15].pageName+" "+this.props.position}>
                {_contents_tab}
                {_contents_place}
                {_contents_list}
                <div className="innerShadow"></div>
                <div className="beaconState"></div>
            </div>
        )
    }
});

/*********************************************************************************
 * CouponExchangetab class
 * html template
 *********************************************************************************/
var CouponExchangeTab = React.createClass({
    render : function () {
        return (
            <div className="category">
                <ul className="category-inner fix">
                    <li><a className="all active" href="javascript:void(0);"><span className="icon"><i className="fa fa-check-circle"></i></span><span className="title">모두</span></a></li>
                    <li><a className="food" href="javascript:void(0);"><span className="icon"><i className="fa fa-cutlery"></i></span><span className="title">음식</span></a></li>
                    <li><a className="drink" href="javascript:void(0);"><span className="icon"><i className="fa fa-coffee"></i></span><span className="title">음료</span></a></li>
                    <li><a className="beauty" href="javascript:void(0);"><span className="icon"><i className="fa fa-scissors"></i></span><span className="title">뷰티</span></a></li>
                    <li><a className="life" href="javascript:void(0);"><span className="icon"><i className="fa fa-smile-o"></i></span><span className="title">생활</span></a></li>
                    <li><a className="delivery" href="javascript:void(0);"><span className="icon"><i className="fa fa-phone"></i></span><span className="title">주문</span></a></li>
                    <li><a className="edu-health" href="javascript:void(0);"><span className="icon"><i className="fa fa-stethoscope"></i></span><span className="title">교육/의료</span></a></li>
                </ul>
            </div>
        )
    }
});

/*********************************************************************************
 * CouponExchangeplace class
 * html template
 *********************************************************************************/
var CouponExchangePlace = React.createClass({
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
            <div className="place">
                <div className="place-inner fix">
                    <div className="order">
                        <div className="list">
                            <a href="javascript:void(0);">
                                <div className="btn-sort">
                                    <p>
                                        <strong><em></em><span></span></strong>
                                    </p>
                                </div>
                                <span className="title">거리순</span>
                                <i className="fa fa-caret-down"></i>
                            </a>
                        </div>
                        <ul className="key-list">
                            <li><a href="javascript:void(0);">거리순</a></li>
                            <li><a href="javascript:void(0);">인기순</a></li>
                            <li><a href="javascript:void(0);">마감임박순</a></li>
                            <li><a href="javascript:void(0);">min 낮은순</a></li>
                        </ul>
                    </div>
                    <div className="location">
                        <a className="btn-title-location" href="javascript:void(0);">내위치</a>
                        <a className="btn-location" href="javascript:void(0);">{this.state.loc}</a>
                    </div>
                </div>
            </div>
        )
    }
});

/*********************************************************************************
 * CouponExchangelist class
 * html template
 *********************************************************************************/
var CouponExchangeList = React.createClass({
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
                    <li data-coupon-idx={coupon.coupon_master_idx}>
                        <div className="coupon-wrap fix">
                            <div className="coupon-kind plus" style={_background}><span className="hanareum" style={_cafe_background}>한아름 제휴</span>coupon 플러스</div>
                            <div className="coupon-balloons">
                                <span className="coupon-shop-name">{coupon.shop_name}</span>
                                <p className="coupon-detail">아메리카노 50% 할인</p>
                                <span className="coupon-until">{coupon.coupon_enddate}</span>
                            </div>
                            <div className="coupon-min">
                                <div className="minbox">
                                    <span className="min">{coupon.coupon_min_point}</span>
                                    <span className="unit">min</span>
                                </div>
                            </div>
                        </div>
                    </li>

                );
            };

        if(this.state.list[0]!='') {
            if(this.state.list.length>0){
                _contents_coupon=this.state.list.map(_createCoupons);
            } else {
                _contents_coupon=<CouponExchangeEmpty />;
            }
        }

        return (
            <div>
                <div className="sort-coupon">
                    <a className="btn-coupon-view" href="javascript:void(0);">교환가능 쿠폰만 보기</a>
                </div>

                <div className="coupon-list">
                    <ul className="couponbox">
                        {_contents_coupon}
                    </ul>
                </div>
            </div>
        )
    }
});

/*********************************************************************************
 * CouponExchangeempty class
 * html template
 *********************************************************************************/
var CouponExchangeEmpty = React.createClass({
    render : function () {
        return (
            <div className="no-data">
                <div className="no-data-ment">
                    <p className="text-type2">교환가능한 쿠폰이 없습니다.</p>
                </div>
            </div>
        )
    }
});



