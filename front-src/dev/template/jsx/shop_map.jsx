/*********************************************************************************
 * shopmap tab class
 * html template
 *********************************************************************************/
var ShopTab = React.createClass({
    render : function () {
        var _this=this,
            _contents = null,
            _$category = jQuery('.category li a');
        _contents = <ShopTab />;

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
 * shopmap main class
 * html template
 *********************************************************************************/
var ShopMap = React.createClass({
    url:loc[8].api[0],
    type:loc[8].type,
    method:'post',
    prevData:false,
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
    getInitialState: function() {
        return {latitude:'',longitude:'',shop_category:'',page:1,sort:'',searchText:'',list:[''],totalPage:1,shop_type:'all'};
    },
    componentWillMount:function() {
        //임시 주소 저장
        jQuery('.header-inner h1 .my-location').text('');

        if(!jQuery('.header').data('map')) {
            jQuery('.header').data('map',{location:'',category:''});
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
                    latlng={lat:parseFloat(_obj.lat()),lng:parseFloat(_obj.lng())},
                    _findIdx=0;

                geocoder.geocode({'location':latlng},function(r,s) {
                    if (s == google.maps.GeocoderStatus.OK) {
                        if (r[1]) {
                            jQuery('.header').data('map',{location:r[0].address_components[1].short_name,category:''});
                            jQuery('.header-shopmap h1 .my-location').text(jQuery('.header').data('map').location);
                        }
                    }
                });

            });
            this.prevData=true;
        } else {
            this.prevData=false;
            jQuery('.header-shopmap h1 .my-location').text(jQuery('.header').data('map').location);
        }

    },
    componentDidMount:function() {
        var _this=this,
            _shop_location=null,
            _category=null,
            _$category = jQuery('.category li a');

        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();

        jQuery('.map').css('height',jQuery(window).height()-jQuery('.header').height()-jQuery('.category').height());

        //지도 드래그 시 데이터를 담아옴
        if (jQuery('.header').data('map').category.length > 0) {
            _$category.removeClass('active');
            _$category.each(function (idx) {
                if (jQuery(this).text().match(jQuery('.header').data('map').category)) {
                    jQuery(this).addClass('active');
                }
            });
        } else {
            jQuery('.category li').eq(0).find('a').addClass('active');
        }

        /**********************************
         * connect beacon state modal
         * 위치검색 modal
         ********************************/
        twCommonUi.scriptLoadNext(
            [
                _domainJsx+'location.js'
            ]
            ,true
            ,function() {
                setTimeout(function() {
                    React.render(React.createElement(ModalAll, null), document.getElementsByClassName('modal-wrap')[0]);
                },300)
            }
        );
        /**********************************
         * 지역설정
         *********************************/
        jQuery('.header-shopmap .title .my-location').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.showModal(jQuery('.modal.modal-location'));

            jQuery('.list-location a').off('tap');

            twCommonUi.commonAccordion('.list-location',function(_txt) {
                e.stopPropagation();
                e.preventDefault();
                /*********************************************************************************
                 * 페이지 : 공통
                 * 위도,경도 값에 따라 주소를 가지고 옴
                 *********************************************************************************/
                var geocoder = new google.maps.Geocoder(),
                    addr=_txt;

                geocoder.geocode({'address':addr},function(r,s) {
                    if (s == google.maps.GeocoderStatus.OK) {

                        _this.options.latitude=r[0].geometry.location.lat();
                        _this.options.longitude=r[0].geometry.location.lng();

                        jQuery('section.container').attr('data-lat',_this.options.latitude);
                        jQuery('section.container').attr('data-lng',_this.options.longitude);

                        twCommonUi.getApiData(
                            {
                                'url':_this.url,
                                'type':_this.type,
                                'method':_this.method,
                                'data':_this.options
                            },
                            'html',
                            React.addons,function(listType,resp,reactAddons) {
                                var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons),
                                    _obj={};

                                _obj={
                                    lat:function() {
                                        return jQuery('section.container').attr('data-lat')
                                    },
                                    lng:function() {
                                        return jQuery('section.container').attr('data-lng')
                                    }
                                };

                                twCommonUi.myLocation(_obj,true);
                                twCommonUi.initMarker(_newList.list[0].ResultData);
                            }
                        );
                    }
                });

            });

        });

        jQuery ('.header-shopmap .title .btn-title-location').on('tap',function(e) {
            BRIDGE.getLocation(function (loc) {

                var _obj = {
                    lat: function () {
                        return loc.lati;
                    },
                    lng: function () {
                        return loc.longi;
                    }

                };

                var geocoder = new google.maps.Geocoder(),
                    latlng={lat:parseFloat(loc.lati),lng:parseFloat(loc.longi)};

                geocoder.geocode({'location':latlng},function(r,s) {
                    if (s == google.maps.GeocoderStatus.OK) {
                        if (r[1]) {
                            jQuery('.header-shopmap h1 .my-location').text(r[0].address_components[1].short_name);
                        }
                    }
                });

                jQuery('section.container').attr('data-lat',_obj.lat());
                jQuery('section.container').attr('data-lng',_obj.lng());

                twCommonUi.myLocation(_obj,true);
            });
        });

        //샵리스트에서 선택한 위치를 가지고 있다면
        if(!this.prevData) {
            /*********************************************************************************
             * 페이지 : 공통
             * 위도,경도 값에 따라 주소를 가지고 옴
             *********************************************************************************/
            var geocoder = new google.maps.Geocoder(),
                addr = jQuery('.header').data('map').location;

            geocoder.geocode({'address': addr}, function (r, s) {
                if (s == google.maps.GeocoderStatus.OK) {

                    _this.options.latitude = jQuery('.header').data('map').latitude;
                    _this.options.longitude = jQuery('.header').data('map').longitude;

                    jQuery('section.container').attr('data-lat',_this.options.latitude);
                    jQuery('section.container').attr('data-lng',_this.options.longitude);


                    //_this.options.shop_category=_this.props.category;

                    twCommonUi.getApiData(
                        {
                            'url': _this.url,
                            'type': _this.type,
                            'method': _this.method,
                            'data': _this.options
                        },
                        'html',
                        React.addons, function (listType, resp, reactAddons) {
                            var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons),
                                _clsName = '';
                            //setState excute react render
                            if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                                _this.setState({
                                    latitude: _this.options.latitude,
                                    longitude: _this.options.longitude,
                                    shop_category: _this.options.shop_category,
                                    page: 1,
                                    sort: 1,
                                    searchText: '',
                                    list: _newList.list[0].ResultData,
                                    totalPage: _newList.list[0].totalpage,
                                    shop_type: 'all'
                                });
                            }

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
                                        React.render(React.createElement(ShopState, {data:_newList.list[0].ResultData[0]}), document.getElementsByClassName('beaconState')[0]);
                                    },300)
                                }
                            );

                            twCommonUi.initialGoogleMap(
                                {
                                    lat: _this.options.latitude,
                                    lng: _this.options.longitude
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
                                ''
                            );

                            twCommonUi.initMarker(_newList.list[0].ResultData, '');
                        }
                    )
                }
            });
        } else {
            BRIDGE.getLocation(function (loc) {
                var geocoder = new google.maps.Geocoder(),
                    latlng={lat:parseFloat(loc.lati),lng:parseFloat(loc.longi)};

                geocoder.geocode({'location':latlng},function(r,s) {
                    if (s == google.maps.GeocoderStatus.OK) {
                        if (r[1]) {
                            _this.options.latitude = r[0].geometry.location.lat();
                            _this.options.longitude = r[0].geometry.location.lng();

                            jQuery('section.container').attr('data-lat',_this.options.latitude);
                            jQuery('section.container').attr('data-lng',_this.options.longitude);

                            //_this.options.shop_category=_this.props.category;

                            twCommonUi.getApiData(
                                {
                                    'url': _this.url,
                                    'type': _this.type,
                                    'method': _this.method,
                                    'data': _this.options
                                },
                                'html',
                                React.addons, function (listType, resp, reactAddons) {
                                    var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons),
                                        _clsName = '';
                                    //setState excute react render
                                    if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                                        _this.setState({
                                            latitude: _this.options.latitude,
                                            longitude: _this.options.longitude,
                                            shop_category: _this.options.shop_category,
                                            page: 1,
                                            sort: 1,
                                            searchText: '',
                                            list: _newList.list[0].ResultData,
                                            totalPage: _newList.list[0].totalpage,
                                            shop_type: 'all'
                                        });
                                    }

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
                                                React.render(React.createElement(ShopState, {data:_newList.list[0].ResultData[0]}), document.getElementsByClassName('beaconState')[0]);
                                            },300)
                                        }
                                    );

                                    twCommonUi.initialGoogleMap(
                                        {
                                            lat: _this.options.latitude,
                                            lng: _this.options.longitude
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
                                        ''
                                    );

                                    twCommonUi.initMarker(_newList.list[0].ResultData, '');
                                }
                            )
                        }
                    }
                });
            });

        }

        /**********************************
         * tab click
         *********************************/
        _$category.on('tap',function(e) {
            e.stopPropagation();
            /**********************************
             * param : target tag, tap
             *********************************/
            twCommonUi.tab(_$category,this,function(_txtName,$target) {
                if(_webBridge.dragGe.lat) {
                    _this.options.latitude =_webBridge.dragGe.lat;
                    _this.options.longitude =_webBridge.dragGe.lng;
                }

                //모든 카테고리
                if (_txtName == '모두') {
                    _category = '';
                } else if(_txtName == '교육/의료') {
                    _category=_txtName.split('/')[0];
                } else {
                    _category=_txtName;
                }


                twCommonUi.getApiData(
                    {
                        'url':_this.url,
                        'type':_this.type,
                        'method':_this.method,
                        'data':_this.options
                    },
                    'html',
                    React.addons,
                    function(listType,resp,reactAddons) {
                        var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                        //setState excute react render
                        if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                            _this.setState({
                                latitude: _this.options.latitude,
                                longitude: _this.options.longitude,
                                shop_category: _this.options.shop_category,
                                page: 1,
                                sort: 1,
                                searchText: '',
                                list: _newList.list[0].ResultData,
                                totalPage: _newList.list[0].totalpage,
                                shop_type: 'all'
                            });
                        }

                        React.render(React.createElement(ShopState, {data:_newList.list[0].ResultData[0]}), document.getElementsByClassName('beaconState')[0]);

                        twCommonUi.initMarker(_newList.list[0].ResultData);

                    }
                );
            });
        });

        /**********************************
         * 리스트페이지 이동
         *********************************/
        jQuery('.header-shopmap .btn-shop-list').on('tap',function(e) {
            e.stopPropagation();
            jQuery('.header').data('shoplist',{
                'location':jQuery('.header-shopmap .my-location').text(),
                'category':jQuery('.category .active').text(),
                'latitude':jQuery('section.container').attr('data-lat'),
                'longitude':jQuery('section.container').attr('data-lng')
            });

            location.href='#/shop-list';
        });
    },
    render : function () {
        var _contentsTab = null;

        _contentsTab = <ShopTab />;

        return (
            <div className={"page "+loc[8].pageName+" "+this.props.position}>
                {_contentsTab}
                <div className='map'></div>
                <div className="beaconState"></div>
            </div>
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
var ModalAll = React.createClass({
    render: function () {
        var props = {
            display: 'none',
            position: 'absolute',
            top: '100px',
            width: '100%',
            zIndex: '200'
        };
        return (
            <div className="list-map">
                <ModalSetLocation {...props} />
            </div>
        )
    }
});
