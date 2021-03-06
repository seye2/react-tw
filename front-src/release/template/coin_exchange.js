/*********************************************************************************
 * coin exchange main class
 * html template
 *********************************************************************************/
var CoinExchange = React.createClass({displayName: "CoinExchange",
    getInitialState:function() {
        return ({tab:'coin'});
    },
    componentDidMount:function() {
        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();

        var _this=this;

        jQuery('.common-tab ul li a').on('tap',function(e) {
            var _$this=jQuery(this);
            jQuery('.common-tab a').removeClass('active');
            _$this.addClass('active');

            if(_$this.attr('class').match('enable-exchange')) {
                //setState excute react render
                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                    // gps 위치 얻기
                    _this.setState({
                        tab: 'coin'
                    });

                }

            } else {
                //setState excute react render
                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                    // gps 위치 얻기
                    _this.setState({
                        tab: 'min'
                    });

                }
            }

            e.stopPropagation();
        });

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
        var _contents_tab=null;

            if(this.state.tab=='coin') {
                _contents_tab=React.createElement(CoinTab, null);
            } else {
                _contents_tab=React.createElement(MinTab, null);
            }

        return (
            React.createElement("div", {className: "page "+loc[10].pageName+" "+this.props.position}, 
                React.createElement("div", {className: "common-tab count-2 coin-exchange-tab"}, 
                    React.createElement("ul", {className: "fix"}, 
                        React.createElement("li", null, React.createElement("a", {className: "enable-exchange active", href: "javascript:void(0);"}, "교환가능 min")), 
                        React.createElement("li", null, React.createElement("a", {className: "saving", href: "javascript:void(0);"}, "적립중 min"))
                    )
                ), 

                React.createElement("div", {className: "tabContents"}, 
                    _contents_tab
                ), 

                React.createElement("div", {className: "beaconState"})

            )
        )
    }
});

/*********************************************************************************
 * CoinTab class
 * html template
 *********************************************************************************/
var CoinTab = React.createClass({displayName: "CoinTab",
    eventHistory:function(_this) {
        //코인교환 히스토리
        jQuery('.accordion-title .btn-open-view').on('tap',function(e) {
            var _$this=jQuery(this);
            var _$accordionInfoView = _$this.closest('.accordion-title').next('.accordion-info-view');
            var _$accordionHeight = 0;

            if( !_$this.attr('class').match('active')){
                _$this.addClass('active');

                React.render(React.createElement(CoinTabSub, {shopIdx:_$this.closest('li').attr('data-shop-idx'),count:_$this.closest('li').index()}), document.getElementsByClassName('accordion-info-view')[_$this.closest('li').index()]);
                _$accordionHeight=_$accordionInfoView.children('.validity').height() * _$accordionInfoView.children('.validity').size();
                _$accordionInfoView.css({
                    'height' : _$accordionHeight
                });
            } else{
                _$this.closest('li').find('.accordion-info-view').empty();
                _$this.removeClass('active');
                _$accordionInfoView.css({
                    'height' : 0
                });
            }
            e.stopPropagation();
        });

        jQuery('.modal.modal-coin-exchange .btn-coin-exchange-pop').off('tap');

        //코인 교환 팝업
        jQuery('.btn-coin-exchange-pop').on('tap',function(e) {
            e.stopPropagation();

            var _params={
                min:jQuery(this).closest('.coin-item').find('.enable-exchange').text(),
                coin:jQuery(this).closest('.coin-item').find('.exCoin').text(),
                u_idx:jQuery(this).closest('.coin-exchange-list').attr('data-shop-idx')
            };

            React.render(React.createElement(ModalAll, {total:_params}), document.getElementsByClassName('modal-wrap')[0]);
            twCommonUi.showModal(jQuery('.modal-coin-exchange'));

            jQuery('.modal.modal-coin-exchange .btn-exchange-modal').off('tap');

            //코인 교환
            jQuery('.modal.modal-coin-exchange .btn-exchange-modal').on('tap',function(e) {
                e.stopPropagation();
                console.log('tap');

                reqwest({
                    url: loc[10].api[3], //코인교환
                    method: 'post',
                    type: 'json',
                    data: {
                        u_idx:(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                        shop_idx:_params.u_idx,
                        setMin:_params.min
                    }
                })
                .then(function (resp) {
                    /*************************
                     resp.ResultCode
                     '1'=success
                     '-1'=fail
                     *************************/
                    if (resp[0].ResultCode == '1') {
                        var _data_coin_list={
                            u_idx:(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                            page:1
                        };

                        twCommonUi.getApiData(
                            {
                                'url':loc[10].api[0],//코인 교환 가능한 min 매장 리스트
                                'type':'json',
                                'method':'post',
                                'data':_data_coin_list
                            },
                            'html',
                            React.addons,
                            function(listType,resp,reactAddons) {
                                var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                                //setState excute react render
                                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                                    _this.setState({
                                        list: _newList.list
                                    });

                                    _this.eventHistory(_this,_newList.list);

                                    /**********************************
                                     * @param : scroll target
                                     **********************************/
                                    twCommonUi.listScrollLoading('.enable-exchange-cont .coin-exchange-list-wrap',function() {
                                        //compare current page count to total page count
                                        if(_data_coin_list.page>=_newList.list[0].totalPage) {
                                            _data_coin_list.page=1;
                                            twCommonUi.scrollLoading = false;
                                        } else {

                                            /**********************************
                                             * @param : Shop_List parameters
                                             **********************************/
                                            _data_coin_list.page=_data_coin_list.page+1;
                                            twCommonUi.getApiData(
                                                {
                                                    'url':loc[10].api[0],
                                                    'type':'json',
                                                    'method':'post',
                                                    'data':_data_coin_list
                                                },
                                                'append',
                                                React.addons,
                                                function(listType,resp,reactAddons) {

                                                    var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                                                    //setState excute react render
                                                    if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                                                        _this.setState({
                                                            list: _newList.list
                                                        });

                                                        _this.eventHistory(_this,_newList.list);

                                                    }

                                                    //enable scroll to set data
                                                    twCommonUi.scrollLoading = true;
                                                }
                                            );
                                        }
                                    });
                                }
                                //enable scroll to set data
                                twCommonUi.scrollLoading = true;
                            }
                        );


                        twCommonUi.hideModal(jQuery('.modal.modal-coin-exchange'));

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
    getInitialState:function() {
        return {list:[''],history:['']}
    },
    componentDidMount:function() {
        var _this=this,
            _data_coin_list={
                u_idx:(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                page:1
            };

        twCommonUi.getApiData(
            {
                'url':loc[10].api[0],//코인 교환 가능한 min 매장 리스트
                'type':'json',
                'method':'post',
                'data':_data_coin_list
            },
            'html',
            React.addons,
            function(listType,resp,reactAddons) {
                var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                //setState excute react render
                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                    _this.setState({
                        list: _newList.list
                    });

                    _this.eventHistory(_this,_newList.list);

                    /**********************************
                     * @param : scroll target
                     **********************************/
                    twCommonUi.listScrollLoading('.enable-exchange-cont .coin-exchange-list-wrap',function() {
                        //compare current page count to total page count
                        if(_data_coin_list.page>=_newList.list[0].totalPage) {
                            _data_coin_list.page=1;
                            twCommonUi.scrollLoading = false;
                        } else {

                            /**********************************
                             * @param : Shop_List parameters
                             **********************************/
                            _data_coin_list.page=_data_coin_list.page+1;
                            twCommonUi.getApiData(
                                {
                                    'url':loc[10].api[0],
                                    'type':'json',
                                    'method':'post',
                                    'data':_data_coin_list
                                },
                                'append',
                                React.addons,
                                function(listType,resp,reactAddons) {

                                    var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                                    //setState excute react render
                                    if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                                        _this.setState({
                                            list: _newList.list
                                        });

                                        _this.eventHistory(_this,_newList.list);

                                    }

                                    //enable scroll to set data
                                    twCommonUi.scrollLoading = true;
                                }
                            );
                        }
                    });
                }
                //enable scroll to set data
                twCommonUi.scrollLoading = true;
            }
        );

    },
    render: function () {
        var _show = {'display': 'block'},
            _contents_coin=null,
            _createCoin=function(coin,idx) {
                var _background={'background-image':'url('+coin.shop_logo_image+')'};

                return(
                    React.createElement("li", {className: "coin-exchange-list", "data-shop-idx": coin.shop_idx}, 
                        React.createElement("div", {className: "accordion-title"}, 
                            React.createElement("div", {className: "coin-item fix"}, 
                                React.createElement("div", {className: "item"}, 
                                    React.createElement("span", {className: "shop-logo", style: _background})
                                ), 
                                React.createElement("div", {className: "balloons"}, 
                                    React.createElement("strong", {className: "shop-name"}, coin.shop_name), 
                                    React.createElement("div", {className: "item-use"}, 
                                        React.createElement("div", null, React.createElement("strong", null, "코인"), React.createElement("p", null, "10min ", React.createElement("em", null, React.createElement("i", {className: "fa fa-caret-right"})), " ", React.createElement("span", {className: "exCoin"}, coin.exCoin), "coin"))
                                    ), 
                                    React.createElement("div", {className: "min-state"}, 
                                        React.createElement("div", null, "현재적립 min :", React.createElement("strong", null, React.createElement("em", null, coin.saved_min), "min")), 
                                        React.createElement("div", null, "교환가능 min :", React.createElement("strong", null, React.createElement("em", {className: "enable-exchange"}, coin.exchangeable_min), "min"))
                                    )
                                ), 
                                React.createElement("a", {className: "btn-coin-exchange-pop", href: "javascript:void(0);"}, React.createElement("span", {className: "hide"}, "코인교환 팝업 열기"))
                            ), 
                            React.createElement("a", {className: "btn-open-view", href: "javascript:void(0);"}, React.createElement("span", {className: "hide"}, "코인교환 히스토리 열기"), React.createElement("i", {className: "fa fa-caret-down"}))
                        ), 

                        React.createElement("div", {className: "accordion-info-view"}
                        )
                    )
                );
            }

        if(this.state.list[0]!='') {
            if(this.state.list[0].ResultData.length>0) {
                console.log(this.state.list[0].ResultData);
                _contents_coin = this.state.list[0].ResultData.map(_createCoin);
            } else {
                _contents_coin = React.createElement(CoinEmpty, null);
            }
        }

        return (
            React.createElement("div", {className: "common-tab-contents enable-exchange-cont", style: _show}, 
                React.createElement("div", {className: "coin-exchange-notice"}, 
                    "coin교환가능 min은 10min단위로만 교환이 가능하며 적립한 날부터 30일 동안만 coin으로 교환 할 수 있습니다. 30일 이후에는 일반 min으로 전환됩니다."
                ), 

                React.createElement("ul", {className: "coin-exchange-list-wrap"}, 
                    _contents_coin
                )
            )
        )
    }
});

/*********************************************************************************
 * CoinTabSub class
 * html template
 *********************************************************************************/
var CoinTabSub = React.createClass({displayName: "CoinTabSub",
    getInitialState:function() {
        return {history:['']}
    },
    componentDidMount:function() {
        var _this=this,
            _data_history={
                shop_idx:this.props.shopIdx,
                page:1
            };

        twCommonUi.getApiData(
            {
                'url':loc[10].api[2],//코인 교환 가능한 min 매장 리스트
                'type':'json',
                'method':'post',
                'data':_data_history
            },
            'html',
            React.addons,
            function(listType,resp,reactAddons) {
                var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                //setState excute react render
                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                    _this.setState({
                        history: _newList.list
                    });

                    /**********************************
                     * @param : scroll target
                     **********************************/
                    twCommonUi.listScrollLoading('.accordion-info-view',function() {
                        //compare current page count to total page count
                        if(_data_history.page>=_newList.history[0].totalPage) {
                            _data_history.page=1;
                            twCommonUi.scrollLoading = false;
                        } else {

                            /**********************************
                             * @param : Shop_List parameters
                             **********************************/
                            _data_coin_list.page=_data_coin_list.page+1;
                            twCommonUi.getApiData(
                                {
                                    'url':loc[10].api[2],
                                    'type':'json',
                                    'method':'post',
                                    'data':_data_history
                                },
                                'append',
                                React.addons,
                                function(listType,resp,reactAddons) {

                                    var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                                    //setState excute react render
                                    if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                                        _this.setState({
                                            history: _newList.list
                                        });
                                    }

                                    //enable scroll to set data
                                    twCommonUi.scrollLoading = true;
                                }
                            );
                        }
                    },_this.props.count);
                }
                //enable scroll to set data
                twCommonUi.scrollLoading = true;
            }
        );

    },
    render: function () {
        var _contents_history=null;

        return (
            React.createElement("div", {className: "validity"}, 
                _contents_history
            )
        )
    }
});

/*********************************************************************************
 * minTab class
 * html template
 *********************************************************************************/
var MinTab = React.createClass({displayName: "MinTab",
    eventHistory:function() {
        //코인교환 히스토리
        jQuery('.accordion-title .btn-open-view').on('tap',function(e) {
            var _$this=jQuery(this);
            var _$accordionInfoView = _$this.closest('.accordion-title').next('.accordion-info-view');
            var _$accordionHeight = 0;

            if( !_$this.attr('class').match('active')){
                _$this.addClass('active');

                React.render(React.createElement(MinTabSub, {shopIdx:_$this.closest('li').attr('data-shop_idx'),count:_$this.closest('li').index()}), document.getElementsByClassName('accordion-info-view')[_$this.closest('li').index()]);
                _$accordionHeight=_$accordionInfoView.children('.validity').height() * _$accordionInfoView.children('.validity').size();
                _$accordionInfoView.css({
                    'height' : _$accordionHeight
                });
            } else{
                _$this.closest('li').find('.accordion-info-view').empty();
                _$this.removeClass('active');
                _$accordionInfoView.css({
                    'height' : 0
                });
            }
            e.stopPropagation();
        });

    },
    getInitialState:function() {
        return {list:[''],history:['']}
    },
    componentDidMount:function() {
        var _this=this,
            _data_coin_list={
                u_idx:(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                page:1
            };

        twCommonUi.getApiData(
            {
                'url':loc[10].api[1],//코인 교환 가능한 min 매장 리스트
                'type':'json',
                'method':'post',
                'data':_data_coin_list
            },
            'html',
            React.addons,
            function(listType,resp,reactAddons) {
                var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                //setState excute react render
                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                    _this.setState({
                        list: _newList.list
                    });

                    _this.eventHistory();

                    /**********************************
                     * @param : scroll target
                     **********************************/
                    twCommonUi.listScrollLoading('.saving-min .coin-exchange-list-wrap',function() {
                        //compare current page count to total page count
                        if(_data_coin_list.page>=_newList.list[0].totalPage) {
                            _data_coin_list.page=1;
                            twCommonUi.scrollLoading = false;
                        } else {

                            /**********************************
                             * @param : Shop_List parameters
                             **********************************/
                            _data_coin_list.page=_data_coin_list.page+1;
                            twCommonUi.getApiData(
                                {
                                    'url':loc[10].api[1],
                                    'type':'json',
                                    'method':'post',
                                    'data':_data_coin_list
                                },
                                'append',
                                React.addons,
                                function(listType,resp,reactAddons) {

                                    var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                                    //setState excute react render
                                    if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                                        _this.setState({
                                            list: _newList.list
                                        });

                                        _this.eventHistory();

                                    }

                                    //enable scroll to set data
                                    twCommonUi.scrollLoading = true;
                                }
                            );
                        }
                    });
                }
                //enable scroll to set data
                twCommonUi.scrollLoading = true;
            }
        );

    },
    render: function () {
        var _show = {'display': 'block'},
            _contents_coin=null,
            _createCoin=function(coin,idx) {
                var _background={'background-image':'url('+coin.shop_logo_image+')'};

                return(
                    React.createElement("li", {className: "coin-exchange-list", "data-shop_idx": coin.shop_idx}, 
                        React.createElement("div", {className: "accordion-title"}, 
                            React.createElement("div", {className: "coin-item fix"}, 
                                React.createElement("div", {className: "item"}, 
                                    React.createElement("span", {className: "shop-logo", style: _background})
                                ), 
                                React.createElement("div", {className: "balloons"}, 
                                    React.createElement("strong", {className: "shop-name"}, coin.shop_name), 
                                    React.createElement("div", {className: "item-use"}, 
                                        React.createElement("div", null, React.createElement("strong", null, "코인"), React.createElement("p", null, "10min ", React.createElement("em", null, React.createElement("i", {className: "fa fa-caret-right"})), " ", React.createElement("span", null, coin.exCoin), "coin"))
                                    ), 
                                    React.createElement("div", {className: "min-state"}, 
                                        React.createElement("div", null, "현재적립 min :", React.createElement("strong", null, React.createElement("em", null, coin.saved_min), "min")), 
                                        React.createElement("div", null, "교환가능 min :", React.createElement("strong", null, React.createElement("em", {className: "enable-exchange"}, coin.exchangeable_min), "min"))
                                    )
                                ), 
                                React.createElement("a", {className: "btn-coin-exchange-pop disable", href: "javascript:void(0);"}, React.createElement("span", {className: "hide"}, "코인교환 팝업 열기"))
                            ), 
                            React.createElement("a", {className: "btn-open-view", href: "javascript:void(0);"}, React.createElement("span", {className: "hide"}, "코인교환 히스토리 열기"), React.createElement("i", {className: "fa fa-caret-down"}))
                        ), 

                        React.createElement("div", {className: "accordion-info-view"}
                        )
                    )
                );
            }

        if(this.state.list[0]!='') {
            if(this.state.list[0].ResultData.length>0) {
                _contents_coin = this.state.list[0].ResultData.map(_createCoin);
            } else {
                _contents_coin = React.createElement(MinEmpty, null);
            }
        }

        return (
            React.createElement("div", {className: "common-tab-contents saving-min", style: _show}, 
                React.createElement("div", {className: "coin-exchange-notice"}, 
                    "적립 중인 coin 교환 가능 min 리스트입니다. coin 교환 가능 min은 최소 10min부터 coin으로 교환이 가능합니다. 10min 이상 적립시 교환 가능 min으로 이동됩니다."
                ), 

                React.createElement("ul", {className: "coin-exchange-list-wrap"}, 
                    _contents_coin
                )
            )
        )
    }
});

/*********************************************************************************
 * minTabSub class
 * html template
 *********************************************************************************/
var MinTabSub = React.createClass({displayName: "MinTabSub",
    getInitialState:function() {
        return {history:['']}
    },
    componentDidMount:function() {
        var _this=this,
            _data_history={
                shop_idx:this.props.shopIdx,
                page:1
            };

        twCommonUi.getApiData(
            {
                'url':loc[10].api[2],//코인 교환 가능한 min 매장 리스트
                'type':'json',
                'method':'post',
                'data':_data_history
            },
            'html',
            React.addons,
            function(listType,resp,reactAddons) {
                var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                //setState excute react render
                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                    _this.setState({
                        history: _newList.list
                    });

                    /**********************************
                     * @param : scroll target
                     **********************************/
                    twCommonUi.listScrollLoading('.accordion-info-view',function() {
                        //compare current page count to total page count
                        if(_data_history.page>=_newList.history[0].totalPage) {
                            _data_history.page=1;
                            twCommonUi.scrollLoading = false;
                        } else {

                            /**********************************
                             * @param : Shop_List parameters
                             **********************************/
                            _data_coin_list.page=_data_coin_list.page+1;
                            twCommonUi.getApiData(
                                {
                                    'url':loc[10].api[2],
                                    'type':'json',
                                    'method':'post',
                                    'data':_data_history
                                },
                                'append',
                                React.addons,
                                function(listType,resp,reactAddons) {

                                    var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons);

                                    //setState excute react render
                                    if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                                        _this.setState({
                                            history: _newList.list
                                        });
                                    }

                                    //enable scroll to set data
                                    twCommonUi.scrollLoading = true;
                                }
                            );
                        }
                    },_this.props.count);
                }
                //enable scroll to set data
                twCommonUi.scrollLoading = true;
            }
        );

    },
    render: function () {
        var _contents_history=null;

        return (
            React.createElement("div", {className: "validity"}, 
                _contents_history
            )
        )
    }
});

/*********************************************************************************
 * Coinempty class
 * html template
 *********************************************************************************/
var CoinEmpty = React.createClass({displayName: "CoinEmpty",
    render: function () {
        return (
            React.createElement("div", {className: "no-data"}, 
                React.createElement("div", {className: "no-data-ment"}, 
                    React.createElement("p", {className: "text-type2"}, "적립중 coin이 없습니다.")
                )
            )
        )
    }
});

/*********************************************************************************
 * minempty class
 * html template
 *********************************************************************************/
var MinEmpty = React.createClass({displayName: "MinEmpty",
    render: function () {
        return (
            React.createElement("div", {className: "no-data"}, 
                React.createElement("div", {className: "no-data-ment"}, 
                    React.createElement("p", {className: "text-type2"}, "적립중 min이 없습니다.")
                )
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
 * 코인교환
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
            React.createElement(ModalCoinExchange, {dataStyle: props, total: this.props.total, uidx: this.props.u_idx})
        )
    }
});

/**********************************
 * 코인교환
 ********************************/
var ModalCoinExchange = React.createClass({displayName: "ModalCoinExchange",
    componentDidMount:function() {
        jQuery('.modal.modal-coin-exchange .btn-modal-close').on('tap',function(e) {
            e.stopPropagation();
           twCommonUi.hideModal(jQuery('.modal-coin-exchange'));
        });


    },
    render: function () {
        var _min=this.props.total.min,
            _total=((this.props.total.min/this.props.total.coin)*10)*this.props.total.coin,
            _background={
                'background':'#fff'
            };

        return (
            React.createElement("section", {className: "modal modal-small modal-coin-exchange", "data-shop-idx": this.props.uidx, style: this.props.dataStyle}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-header icon-type6"}, 
                        "코인교환", 
                        React.createElement("a", {className: "btn-modal-close", href: "javascript:void(0);"}, React.createElement("span", {className: "팝업 창 닫기"}))
                    ), 

                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "numberbox min"}, 
                            React.createElement("div", {className: "numberbox-inner"}, 
                                React.createElement("input", {type: "text", className: "write-number", value: _min, disabled: "disabled", style: _background}), 
                                React.createElement("span", {className: "unit"}, "min")
                            )
                        ), 
                        React.createElement("div", {className: "numberbox coin"}, 
                            React.createElement("div", {className: "numberbox-inner"}, 
                                React.createElement("input", {type: "text", className: "write-number", value: _total, disabled: "disabled", style: _background}), 
                                React.createElement("span", {className: "unit"}, "coin")
                            )
                        ), 
                        React.createElement("p", {className: "text-type3"}, "코인으로 교환하시겠습니까?")
                    ), 
                    React.createElement("a", {className: "btn-exchange-modal", href: "javascript:void(0);"}, React.createElement("span", {className: "교환버튼"}))
                )
            )
        )
    }
});

