/*********************************************************************************
 * shoplist tab class
 * html template
 *********************************************************************************/
var ShopTab = React.createClass({displayName: "ShopTab",
    render : function () {
        var _contents = null;
            _contents = React.createElement(ShopTab, null);

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
 * shoplist sort class
 * html template
 *********************************************************************************/
var ShopSort = React.createClass({displayName: "ShopSort",
    componentDidMount:function() {
        jQuery('.sort-sidebar').hide();

        setTimeout(function() {
            jQuery('.sort-sidebar').show();
        },1000);
    },
    render : function () {
        var _contents = null;
        _contents = React.createElement(ShopSort, null);

        return (
            React.createElement("div", {className: "sort-area"}, 
                React.createElement("div", {className: "btn-sort"}, 
                    React.createElement("a", {href: "javascript:void(0);"}, 
                        React.createElement("strong", null, React.createElement("em", null), React.createElement("span", null))
                    )
                ), 
                React.createElement("div", {className: "sort-sidebar"}, 
                    React.createElement("div", {className: "sort-group"}, 
                        React.createElement("strong", {className: "sort-title"}, "기본정렬"), 
                        React.createElement("div", {className: "inputbox-group"}, 
                            React.createElement("div", {className: "inp-radio active"}, 
                                React.createElement("input", {type: "radio", name: "basic", id: "rdo1-1", checked: "checked", value: "1"}), React.createElement("label", {for: "rdo1-1"}, React.createElement("span", {className: "text"}, "거리순으로 정렬"), React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})))
                            ), 
                            React.createElement("div", {className: "inp-radio"}, 
                                React.createElement("input", {type: "radio", name: "basic", id: "rdo1-2", value: "2"}), React.createElement("label", {for: "rdo1-2"}, React.createElement("span", {className: "text"}, "인기순으로 정렬"), React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})))
                            )
                        )
                    ), 

                    React.createElement("div", {className: "sort-group"}, 
                        React.createElement("strong", {className: "sort-title"}, "가맹점 구분"), 
                        React.createElement("div", {className: "inputbox-group"}, 
                            React.createElement("div", {className: "inp-radio active"}, 
                                React.createElement("input", {type: "radio", name: "affiliate", id: "rdo2-1", checked: "checked", value: "all"}), React.createElement("label", {for: "rdo2-1"}, React.createElement("span", {className: "text"}, "전체 가맹점 보기"), React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})))
                            ), 
                            React.createElement("div", {className: "inp-radio"}, 
                                React.createElement("input", {type: "radio", name: "affiliate", id: "rdo2-2", value: "coin"}), React.createElement("label", {for: "rdo2-2"}, React.createElement("span", {className: "text"}, "코인교환 가맹점"), React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})))
                            ), 
                            React.createElement("div", {className: "inp-radio"}, 
                                React.createElement("input", {type: "radio", name: "affiliate", id: "rdo2-3", value: "coupon"}), React.createElement("label", {for: "rdo2-3"}, React.createElement("span", {className: "text"}, "쿠폰사용 가맹점"), React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})))
                            )
                        )
                    ), 
                    React.createElement("div", {className: "sort-group"}, 
                        React.createElement("strong", {className: "sort-title"}, "가맹점 구분"), 
                        React.createElement("div", {className: "inputbox-group"}, 
                            React.createElement("div", {className: "inp-radio active"}, 
                                React.createElement("input", {type: "radio", name: "affiliate", id: "rdo2-1", checked: "checked", value: "all"}), React.createElement("label", {for: "rdo2-1"}, React.createElement("span", {className: "text"}, "전체 가맹점 보기"), React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})))
                            ), 
                            React.createElement("div", {className: "inp-radio"}, 
                                React.createElement("input", {type: "radio", name: "affiliate", id: "rdo2-2", value: "coin"}), React.createElement("label", {for: "rdo2-2"}, React.createElement("span", {className: "text"}, "코인교환 가맹점"), React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})))
                            ), 
                            React.createElement("div", {className: "inp-radio"}, 
                                React.createElement("input", {type: "radio", name: "affiliate", id: "rdo2-3", value: "coupon"}), React.createElement("label", {for: "rdo2-3"}, React.createElement("span", {className: "text"}, "쿠폰사용 가맹점"), React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})))
                            )
                        )
                    ), 

                    React.createElement("a", {className: "btn-sort-enter", href: "javascript:void(0);"}, "확인")
                )
            )
        )
    }
});

/*********************************************************************************
 * shoplist list class
 * html template
 *********************************************************************************/
var ShopLists = React.createClass({displayName: "ShopLists",
    url:loc[5].api[1],
    type:loc[5].type,
    method:'post',
    options:{
        'u_idx':(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
        'latitude':_webBridge.ge.lat,
        'longitude':_webBridge.ge.lng,
        'shop_category':'',
        'searchText':'',
        'sort':1,
        'page':1,
        'shop_type':'all'
    },

    newList:[],
    slickSpeed:100,
    getInitialState: function() {
        return {latitude:'',longitude:'',shop_category:'',page:1,sort:'',searchText:'',list:[''],totalPage:1,shop_type:'all'};
    },
    componentWillMount:function() {

        jQuery('.header-inner h1 .my-location').text('');

        //#/shop-map에서 선택한 카테고리, 위치 정보가 존재하는지 여부 판단
        if(!jQuery('.header').data('shoplist')) {
            //shoplist data가 존재하지 않으면 데이터값 초기화 및 app 위치값을 가져와서 주소 정보를 저장한다.
            jQuery('.header').data('shoplist',{location:'',category:''});
            BRIDGE.getLocation(function (loc) {

                _obj={
                    lat:function() {
                        return loc.lati;
                    },
                    lng:function() {
                        return loc.longi;
                    }

                };

                var geocoder = new google.maps.Geocoder(),
                    latlng={lat:parseFloat(_obj.lat()),lng:parseFloat(_obj.lng())};

                geocoder.geocode({'location':latlng},function(r,s) {
                    if (s == google.maps.GeocoderStatus.OK) {
                        if (r[1]) {
                            jQuery('.header').data('shoplist',{location:r[0].address_components[1].short_name,category:''});
                            jQuery('.header-shop h1 .my-location').text(jQuery('.header').data('shoplist').location);
                        }
                    }
                });

            });
            this.prevData=true;
        } else {
            this.prevData=false;
            //data값이 존재하면 데이터 값=shoplist의 주소 정보를 저장한다.
            jQuery('.header-shop h1 .my-location').text(jQuery('.header').data('shoplist').location);
        }
    },
    componentDidMount:function() {

        var _obj={};

        // TODO : search-list height
        jQuery('.search-list .slickSlide').css({
            'height':jQuery(window).height() - jQuery('.header').height() - jQuery('.category').height()
        })

        var _this = this,
            _react = React,
            _url = _this.url,
            _data = {}
            _txtCategory=null,
            _ele = this.getDOMNode(),
            _$category = jQuery('.category li a'),
            _reactAddons = React.addons,
            _maxCount = 0;

        _data = {
            u_idx:this.options.u_idx,
            latitude:'',
            longitude:'',
            shop_category:this.options.shop_category,
            page:_this.state.page,
            sort:this.options.sort,
            searchText:this.options.searchText,
            shop_type:this.options.shop_type
        };

        //location 주소 데이터가 존재하는지 확인
        if(jQuery('.header').data('shoplist').location.length<1) {
            //location 주소 데이터가 존재하지 않으면 임의로 '서초4동' 셋팅
            jQuery('.header').data('shoplist',{location:'서초4동',category:''});

            BRIDGE.getLocation(function (loc) {

                _obj={
                    lat:function() {
                        return loc.lati;
                    },
                    lng:function() {
                        return loc.longi;
                    }

                };

                twCommonUi.getAddress(_obj);
            });

        } else {
            //location주소 데이터가 존재하고 category 데이터가 존재한다면 tab클래스의 활성화를 category에 맞춰 셋팅
            if (jQuery('.header').data('shoplist').category.length > 0) {
                _$category.removeClass('active');
                _$category.each(function (idx) {
                    if (jQuery(this).text().match(jQuery('.header').data('shoplist').category)) {
                        jQuery(this).addClass('active');
                    }
                });
            } else {
                _$category.closest('li').eq(0).find('a').addClass('active');
            }

        }

        //페이지 로딩 시 app에서 가지고 있는 내 현재 위치를 이용하여 shoplist를 가져 온다.
        BRIDGE.getLocation(function (loc) {
            //loading and slide
            _data.latitude='';
            _data.longitude='';

            //location데이터가 존재하는지 여부 판단
            if(_this.prevData) {
                //location데이터가 존재하지 않는다면 app의 위치 정보를 셋팅
                _data.latitude=loc.lati;
                _data.longitude=loc.longi;
            } else {
                //location데이터가 존재한다면 section.container에 저장된 위치 정보를 셋팅
                _data.latitude=jQuery('section.container').attr('data-lat');
                _data.longitude=jQuery('section.container').attr('data-lng');
            }

            //내 현재 위치 혹은 내가 선택한 위치에 대한 위치 정보를 section.container의 data속성에 저장
            jQuery('section.container').attr('data-lat',_data.latitude);
            jQuery('section.container').attr('data-lng',_data.longitude);

            twCommonUi.getApiData(
                {
                    'url': _url,
                    'type': _this.type,
                    'method': _this.method,
                    'data': _data
                },
                'html',
                React.addons, function (listType, resp, reactAddons) {
                    var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);

                    //setState excute react render
                    if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                        // gps 위치 얻기
                        _this.setState({
                            latitude: _data.latitude,
                            longitude: _data.longitude,
                            shop_category: _this.options.shop_category,
                            page: 1,
                            sort: '',
                            searchText: '',
                            list: _newList.list[0].ResultData,
                            totalPage: _newList.list[0].totalpage,
                            shop_type: 'all'
                        });

                    }

                    //tab slide
                    jQuery('.slickSlide').css({
                        'width': jQuery(window).width()
                    })
                    jQuery('.search-list')
                        .slick({
                            speed: _this.slickSpped,
                            touchThreshold: 5
                        })
                        .on('swipe', function (e, s, n) {
                            jQuery('.category a').removeClass('active')
                                .eq(s.currentSlide).addClass('active');

                            _txtCategory = jQuery('.category a').eq(s.currentSlide).text();
                            //현재 선택된 슬라이드의 텍스트를 api parameter에 맞게 converting
                            if (_txtCategory == '모두') {
                                _data.shop_category = '';
                            } else if (_txtCategory == '교육/의료') {
                                _data.shop_category = _txtCategory.split('/')[0];
                            } else {
                                _data.shop_category = _txtCategory;
                            }

                            _data.page=1;

                            jQuery('.container .search-list .slickSlide').css('overflow-y', 'hidden');

                            twCommonUi.getApiData(
                                {
                                    'url': _url,
                                    'type': _this.type,
                                    'method': _this.method,
                                    'data': _data
                                },
                                'html',
                                React.addons,
                                function (listType, resp, reactAddons) {
                                    var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);

                                    //setState excute react render
                                    if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                                        _this.setState({
                                            latitude: loc.lati,
                                            longitude: loc.longi,
                                            shop_category: _data.shop_category,
                                            page: 1,
                                            sort: 1,
                                            searchText: '',
                                            list: _newList.list[0].ResultData,
                                            totalPage: _newList.list[0].totalpage,
                                            shop_type: 'all'
                                        });
                                    }

                                    jQuery('.container .search-list .slickSlide').css('overflow-y', 'auto');

                                    //enable scroll to set data
                                    twCommonUi.scrollLoading = true;
                                }
                            );

                        })

                    //enable scroll to set data
                    twCommonUi.scrollLoading = true;
                }
            );
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
                //현재 선택된 슬라이드의 텍스트를 api parameter에 맞게 converting
                if (_txtName == '모두') {
                    _data.shop_category = '';
                } else if(_txtName == '교육/의료') {
                    _data.shop_category=_txtName.split('/')[0];
                } else {
                    _data.shop_category=_txtName;
                }

                _data.page=1;

                twCommonUi.getApiData(
                    {
                        'url':_url,
                        'type':_this.type,
                        'method':_this.method,
                        'data':_data
                    },
                    'html',
                    React.addons,
                    function(listType,resp,reactAddons) {
                        var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                        //setState excute react render
                        if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                            BRIDGE.getLocation(function (loc) {
                                _this.setState({
                                    latitude: loc.lati,
                                    longitude: loc.longi,
                                    shop_category: _data.shop_category,
                                    page: 1,
                                    sort: 1,
                                    searchText: '',
                                    list: _newList.list[0].ResultData,
                                    totalPage: _newList.list[0].totalpage,
                                    shop_type: 'all'
                                });

                            });
                        }

                        jQuery('.search-list')[0].slick.slickGoTo($target.closest('li').index());

                        //enable scroll to set data
                        twCommonUi.scrollLoading = true;
                    }
                );
            });
        });

        /**********************************
         * @param : scroll target
         **********************************/
        twCommonUi.listScrollLoading('.search-list .slickSlide',function() {
            //compare current page count to total page count
            if(_this.state.page>=_this.state.totalPage) {
                _data.page=1;
                twCommonUi.scrollLoading = false;
            } else {

                /**********************************
                 * @param : Shop_List parameters
                 **********************************/
                _data.page=_data.page+1;
                twCommonUi.getApiData(
                    {
                        'url':_url,
                        'type':_this.type,
                        'method':_this.method,
                        'data':_data
                    },
                    'append',
                    React.addons,
                    function(listType,resp,reactAddons) {

                        var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                        //setState excute react render
                        if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.

                            _this.setState({
                                latitude: loc.lati,
                                longitude: loc.longi,
                                shop_category: _newList.shop_category,
                                page: _this.state.page+1,
                                sort: 1,
                                searchText: '',
                                list: _newList.list,
                                totalPage: _newList.totalPage,
                                shop_type: 'all'
                            });
                        }

                        //enable scroll to set data
                        twCommonUi.scrollLoading = true;
                    }
                );
            }
        });

        //정렬
        jQuery('.sort-sidebar .btn-sort-enter').on('tap',function(e) {
            e.stopImmediatePropagation();

            var _result_basic=null,
                _result_affiliate=null,
                _$select_category=jQuery('.category a.active'),
                _txt_category=_$select_category.text();

            _result_basic=jQuery('.inputbox-group input[name=basic]:checked').val();
            _result_affiliate=jQuery('.inputbox-group input[name=affiliate]:checked').val();

            _data.sort=_result_basic;
            _data.shop_type=_result_affiliate;

            if (_txt_category == '모두') {
                _data.shop_category = '';
            } else if(_txt_category == '교육/의료') {
                _data.shop_category=_txt_category.split('/')[0];
            } else {
                _data.shop_category=_txt_category;
            }

            var _$sort=jQuery('.sort-sidebar');

            _$sort.removeClass('active');
            if(jQuery('.innerShadow').size()>0) {
                _$shadow=jQuery('.innerShadow');
            } else {
                _$shadow=jQuery('.shadow');
            }

            _$shadow.css({
                'display':'none'
            });
            jQuery('.container').removeClass('overflowHidden');
            // TODO : 20151026 추가
            jQuery('.category').removeClass('disable');
            jQuery('.shadow-category').css('display','none');
            $(document).off('touchmove');

            twCommonUi.getApiData(
                {
                    'url':_url,
                    'type':_this.type,
                    'method':_this.method,
                    'data':_data
                },
                'html',
                React.addons,function(listType,resp,reactAddons) {
                    var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);

                    //setState excute react render
                    if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                        // gps 위치 얻기
                        BRIDGE.getLocation(function (loc) {
                            _this.setState({
                                latitude: loc.lati,
                                longitude: loc.longi,
                                shop_category: _data.shop_category,
                                page: 1,
                                sort: _data.sort,
                                searchText: '',
                                list: _newList.list[0].ResultData,
                                totalPage: _newList.list[0].totalpage,
                                shop_type: _data.shop_type
                            });

                        });
                    }
                }
            );
        });

        /**********************************
         * 검색 히스토리
         *********************************/
        jQuery ('.header-shop .btn-search').on('tap',function(e) {
            e.stopPropagation();
            location.href='#/shop-search';
        });

        /**********************************
         * 지역설정
         *********************************/
        jQuery('.header-shop .title .my-location').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.showModal(jQuery('.modal.modal-location'));

            jQuery('.list-location a').off('tap');

            twCommonUi.commonAccordion('.list-location',function(_txt) {
                console.log(_txt);
                /*********************************************************************************
                 * 페이지 : 공통
                 * 위도,경도 값에 따라 주소를 가지고 옴
                 *********************************************************************************/
                var geocoder = null,
                    addr=null;

                geocoder=new google.maps.Geocoder();
                addr=jQuery(this).text();

                _data.latitude='';
                _data.longitude='';

                geocoder.geocode({'address':addr},function(r,s) {
                    if (s == google.maps.GeocoderStatus.OK) {

                        _data.latitude=r[0].geometry.location.lat();
                        _data.longitude=r[0].geometry.location.lng();

                        jQuery('section.container').attr('data-lat',r[0].geometry.location.lat());
                        jQuery('section.container').attr('data-lng',r[0].geometry.location.lng());

                        twCommonUi.getApiData(
                            {
                                'url':_url,
                                'type':_this.type,
                                'method':_this.method,
                                'data':_data
                            },
                            'html',
                            React.addons,function(listType,resp,reactAddons) {
                                var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);

                                //setState excute react render
                                console.log(_this.isMounted());
                                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                                    // gps 위치 얻기
                                    console.log(_newList.list[0].ResultData[0]);
                                    _this.setState({
                                        latitude: r[0].geometry.location.lat(),
                                        longitude: r[0].geometry.location.lng(),
                                        shop_category: _data.shop_category,
                                        page: 1,
                                        sort: _data.sort,
                                        searchText: '',
                                        list: _newList.list[0].ResultData,
                                        totalPage: _newList.list[0].totalpage,
                                        shop_type: _data.shop_type
                                    });

                                }
                            }
                        );

                    }
                });

            });

        });

        //내위치 선택 및 리시트 갱신
        jQuery ('.header-shop .title .btn-title-location').on('tap',function(e) {

            BRIDGE.getLocation(function (loc) {
                _data.latitude=loc.lati;
                _data.longitude=loc.longi;

                twCommonUi.getApiData(
                    {
                        'url':_url,
                        'type':_this.type,
                        'method':_this.method,
                        'data':_data
                    },
                    'html',
                    React.addons,
                    function(listType,resp,reactAddons) {
                        var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                        //setState excute react render
                        if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                            _this.setState({
                                latitude: loc.lati,
                                longitude: loc.longi,
                                shop_category: _data.shop_category,
                                page: 1,
                                sort: 1,
                                searchText: '',
                                list: _newList.list[0].ResultData,
                                totalPage: _newList.list[0].totalpage,
                                shop_type: 'all'
                            });

                        }

                        var geocoder = new google.maps.Geocoder(),
                            latlng={lat:parseFloat(loc.lati),lng:parseFloat(loc.longi)};

                        geocoder.geocode({'location':latlng},function(r,s) {
                            if (s == google.maps.GeocoderStatus.OK) {
                                if (r[1]) {
                                    jQuery('.header-shop h1 .my-location').text(r[0].address_components[1].short_name);
                                }
                            }
                        });

                        //enable scroll to set data
                        twCommonUi.scrollLoading = true;
                    }
                );
            });
        });

        /**********************************
         * connect beacon state modal
         * 위치검색 modal
         ********************************/
        twCommonUi.scriptLoadNext(
            [
                _domainJsx+'shop_state.js',
                _domainJsx+'location.js'
            ]
            ,true
            ,function() {
                setTimeout(function() {
                    React.render(React.createElement(ShopState, null), document.getElementsByClassName('beaconState')[0]);
                    React.render(React.createElement(ModalAll, null), document.getElementsByClassName('modal-wrap')[0]);

                },300)
            }
        );

        /**********************************
         * 지도페이지 이동
         *********************************/
        jQuery('.header-shop .btn-map').on('tap',function(e) {
            e.stopPropagation();

            //shoplist 선택 위치 정보와 카테고리 정보를 map data에 저장 shop-map에서 동일한 정보를 처리 할 수 있도록 저장
            jQuery('.header').data('map',{
                'location':jQuery('.header-shop .my-location').text(),
                'category':_data.shop_category,
                'latitude':jQuery('section.container').attr('data-lat'),
                'longitude':jQuery('section.container').attr('data-lng')
            });

            location.href='#/shop-map';
        });

        jQuery('.slick-cloned').empty();

        /**********************************
         * 리스트 선택 및 매장상세 이동
         *********************************/
        jQuery(document.body).on('tap','.item-list',function() {
            var _shopinfo={},
                _shopidx=jQuery(this).attr('data-shop-idx'),
                _datalat=jQuery(this).attr('data-lat'),
                _datalng=jQuery(this).attr('data-lng');

            _shopinfo={
                'shopidx':_shopidx,
                'lat':_datalat,
                'lng':_datalng
            };

            location.href='#/shop-detail/'+_shopidx+'?lat='+_datalat+'&lng='+_datalng;
        });

    },
    render : function () {

        var _this=this,
            _contents_all = null,
            _contents_food = null,
            _contents_drink = null,
            _contents_beauty = null,
            _contents_living = null,
            _contents_order = null,
            _contents_edu = null;
            createItem=function(shopList,idx) {
                var _backgroundImage={
                        'background-image':'url('+shopList.shop_logo_image+')'
                    },
                    _background_cafe={
                        'background-image':'url('+shopList.cafe_logo+')'
                    },
                    _coin_premium=null,
                    _floor=null,
                    _coupon_desc=null,
                    _coin_ratio=null,
                    _min_save=null,
                    _use_coupon=null,
                    _exchange_coin=null,
                    _remain=null,
                    _bookmark_class='';

                if(shopList.shop_coin_save_yn=='Y') {
                    _coin_premium=React.createElement("span", {className: "coin-premium"}, shopList.shop_name);
                }

                if(shopList.shop_flore!='') {
                    _floor=React.createElement("div", {className: "floor"}, shopList.shop_flore, "F");
                }

                if(shopList.coupon_master_name!='') {
                    _coupon_desc=React.createElement("div", null, React.createElement("strong", null, "쿠폰"), React.createElement("p", null, shopList.coupon_master_name));
                } else {
                    _coupon_desc=React.createElement("div", {className: "use-no"}, React.createElement("strong", null, "쿠폰"), React.createElement("p", null, "등록된 쿠폰이 없습니다."));
                }

                if(shopList.coupon_use_yn!='N') {
                    _coin_ratio=React.createElement("div", null, React.createElement("strong", null, "코인"), React.createElement("p", null, shopList.shop_coin_rate, "min ", React.createElement("em", null, React.createElement("i", {className: "fa fa-caret-right"})), " ", shopList.shop_coin_exchange_min, "coin"));
                } else {
                    _coin_ratio=React.createElement("div", {className: "use-no"}, React.createElement("strong", null, "코인"), React.createElement("p", null, "코인 교환이 종료되었습니다."));
                }

                if(shopList.shop_min_save_yn=='Y') {
                    _min_save=React.createElement("li", {className: "min-save lazy"}, "min 적립");
                } else {
                    _min_save=React.createElement("li", {className: "min-save no lazy"}, "min 적립");
                }

                if(shopList.coupon_yn=='Y') {
                    _use_coupon=React.createElement("li", {className: "coupon lazy"}, "쿠폰사용");
                } else {
                    _use_coupon=React.createElement("li", {className: "coupon no lazy"}, "쿠폰사용");
                }

                if(shopList.shop_coin_use_yn=='Y') {
                    _exchange_coin=React.createElement("li", {className: "coin lazy"}, "코인사용");
                } else {
                    _exchange_coin=React.createElement("li", {className: "coin no lazy"}, "코인사용");
                }

                if(shopList.cafe_idx>0) {
                    _remain=React.createElement("li", {className: "remain lazy", style: _background_cafe}, "매장");
                } else {
                    _remain=React.createElement("li", {className: "remain no lazy"}, "매장");
                }

                if(shopList.bookmark_idx>0) {
                    _bookmark_class=' active';
                }

                return (
                    React.createElement("div", {className: "item-list fix", key: idx, "data-shop-idx": shopList.shop_idx, "data-lat": shopList.shop_latitude, "data-lng": shopList.shop_longitude}, 
                        React.createElement("div", {className: "item"}, 
                            _coin_premium, 
                            React.createElement("div", {className: "shop-logo lazy", style: _backgroundImage})
                        ), 

                        React.createElement("div", {className: "balloons"}, 
                            React.createElement("strong", {className: "shop-name"}, shopList.shop_name), 
                            React.createElement("div", {className: "item-use"}, 
                                _coupon_desc, 
                                _coin_ratio
                            ), 
                            React.createElement("ul", {className: "item-icons fix"}, 
                                _min_save, 
                                _use_coupon, 
                                _exchange_coin, 
                                _remain
                            ), 
                            React.createElement("div", {className: "bookmark"+_bookmark_class}, 
                                React.createElement("a", {href: "javascript:void(0)"}, React.createElement("i", {className: "fa fa-heart-o"}), React.createElement("span", {className: "num"}, shopList.bookmark_idx))
                            ), 
                            React.createElement("div", {className: "distance fix"}, 
                                React.createElement("div", {className: "meter"}, shopList.dis, "m"), 
                                _floor
                            )
                        )
                    )
                );
            };

        if(this.state.list[0]!='') {
            if(this.state.list.length>0) {
                setContents(this, this.state.list.map(createItem));

            } else {
                setContents(this, React.createElement(ShopListEmpty, null));
            }
        }


        function setContents(_this,arg) {
            switch(_this.state.shop_category) {

                case '':
                    _contents_all = arg;
                    break;
                case '음식':
                    _contents_food = arg;
                    break;
                case '음료':
                    _contents_drink = arg;
                    break;
                case '뷰티':
                    _contents_beauty = arg;
                    break;
                case '생활':
                    _contents_living = arg;
                    break;
                case '주문':
                    _contents_order = arg;
                    break;
                case '교육':
                    _contents_edu = arg;
                    break;
            }
        }

        return (
            React.createElement("div", {className: "search-list"}, 
                React.createElement("div", {className: "slickSlide"}, 
                    _contents_all
                ), 
                React.createElement("div", {className: "slickSlide"}, 
                    _contents_food
                ), 
                React.createElement("div", {className: "slickSlide"}, 
                    _contents_drink
                ), 
                React.createElement("div", {className: "slickSlide"}, 
                    _contents_beauty
                ), 
                React.createElement("div", {className: "slickSlide"}, 
                    _contents_living
                ), 
                React.createElement("div", {className: "slickSlide"}, 
                    _contents_order
                ), 
                React.createElement("div", {className: "slickSlide"}, 
                    _contents_edu
                )
            )
        )
    }
});

/*********************************************************************************
 * shoplist main class
 * html template
 *********************************************************************************/
var ShopList = React.createClass({displayName: "ShopList",
    componentWillMount:function() {

        var _os_type=0,
            _userIndex=-1;

        if (device.checkDeviceType() == 'android') {
            _os_type=2;
        } else if (device.checkDeviceType() == 'ios') {
            _os_type=1;
        } else {
            _os_type=0;
        }

        if(_os_type!=0) {
            BRIDGE.getUserIdx( function( userIndex ) {
                jQuery.localStorage.set('userIdx',userIndex);
            });

        }
    },
    componentDidMount:function() {
        var _ele = this.getDOMNode();

        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();
        var h=jQuery(window).height()-jQuery('.header-shop').height()-jQuery('.category').height();

        if(h<jQuery('.sort-sidebar').height()) {
            jQuery('.sort-sidebar').height(h);
        }

    },
    render : function () {
        var _contentsTab = null,
            _contentsSort = null,
            _contentsShopLists=null,
            _contentsState=null,
            _styleTop={
                'top':0
            };

        _contentsTab = React.createElement(ShopTab, null);
        _contentsSort = React.createElement(ShopSort, null);
        _contentsShopLists = React.createElement(ShopLists, null);

        return (
            React.createElement("div", {className: "page "+loc[5].pageName+" "+this.props.position}, 
                _contentsTab, 
                React.createElement("div", {className: "shadow-category", style: _styleTop}), 
                _contentsSort, 
                React.createElement("div", {className: "innerShadow"}), 
                _contentsShopLists, 
                React.createElement("div", {className: "beaconState"})
            )
        )
    }
});

/*********************************************************************************
 * modal class
 * html template
 * mix and render all modal
 *********************************************************************************/

/**********************************
 * 위치선택
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
            React.createElement("div", {className: "slist"}, 
                React.createElement(ModalSetLocation, React.__spread({},  props))
            )
        )
    }
});

/*********************************************************************************
 * shoplist main class
 * html template
 *********************************************************************************/
var ShopListEmpty = React.createClass({displayName: "ShopListEmpty",
    componentDidMount:function() {
    },
    render : function () {
        var _contentsEmpty = null;

        _contentsEmpty = React.createElement(ShopListEmpty, null);

        return (
            React.createElement("div", {className: "no-data"}, 
                React.createElement("div", {className: "no-data-ment"}, 
                    React.createElement("strong", null, "죄송합니다!"), 
                    React.createElement("p", null, "현재 주변에 이용가능한 매장이없습니다. ", React.createElement("br", null), 
                        "더욱 더 열심히 하는 타임월렛이 되겠습니다.")
                )
            )
        )
    }
});

