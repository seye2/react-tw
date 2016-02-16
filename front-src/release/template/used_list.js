/*************************************************************
 * 이용내역
 * loc[20]
 *************************************************************/
var UsedListWrap = React.createClass({displayName: "UsedListWrap",
    category : null,
    componentDidMount : function() {
        var _this = this;
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
        jQuery('.used-list ul').css({
            'height':jQuery(window).height() - jQuery('.header').height() - jQuery('.common-tab').height() - jQuery('.used-del').height()
        });
    },
    render : function() {
        var _contents_list=null;
        _contents_list=React.createElement(UsedList, null);

        return (
            React.createElement("div", {className: "page "+loc[20].pageName+" "+this.props.position}, 
                React.createElement("div", {className: "common-tab count-3 coin-donate-tab"}, 
                    React.createElement("ul", {className: "fix"}, 
                        React.createElement("li", null, React.createElement("a", {className: "min active", href: "javascript:void(0);"}, "min")), 
                        React.createElement("li", null, React.createElement("a", {className: "coin", href: "javascript:void(0);"}, "coin")), 
                        React.createElement("li", null, React.createElement("a", {className: "coupon", href: "javascript:void(0);"}, "쿠폰"))
                    )
                ), 

                React.createElement("div", {className: "used-del"}, 
                    React.createElement("a", {className: "all-check", href: "javascript:void(0);"}, "전체선택"), 
                    React.createElement("a", {className: "all-del", href: "javascript:void(0);"}, "삭제")
                ), 

                React.createElement("div", {className: "common-tab-contents"}, 
                    _contents_list
                ), 

                React.createElement("div", {className: "beaconState"})
            )
        )
    }
});

var UsedList = React.createClass({displayName: "UsedList",
    getInitialState:function() {
        return ({list:[''],page:1,totalpage:1,category:''});
    },
    componentDidMount : function() {
        twCommonUi.setContentsHeight();

        var _$category = jQuery('.common-tab li a');

        var _this=this,
            _data={
                u_idx:(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                page:1
            };

        twCommonUi.getApiData(
            {
                'url':loc[20].api[0],
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
                        totalPage: _newList.list[0].totalpage,
                        page: 1
                    });
                }
                twCommonUi.scrollLoading = true;
            }
        );

        // tab click
        _$category.off('tap').on('tap',function(e) {
            e.stopPropagation();

            twCommonUi.tab(_$category,this,function(_txtName,$target) {
                if (_txtName == 'min') { // min 탭 선택 시
                    _data.category = 0;
                } else if (_txtName == 'coin') { // 코인 탭 선택 시
                    _data.category = 1;
                } else if (_txtName == '쿠폰') { // 쿠폰 탭 선택 시
                    _data.category = 2;
                }
                _this.category = _data.category;
                _data.page = 1;

                twCommonUi.getApiData(
                    {
                        'url': loc[20].api[_data.category],
                        'type': 'json',
                        'method': 'post',
                        'data': _data
                    },
                    'html',
                    React.addons,
                    function (listType, resp, reactAddons) {
                        var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);
                        jQuery('.inp-check').removeClass('active').find('input').removeAttr('checked');
                        //setState excute react render
                        if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                            _this.setState({
                                list: _newList.list[0].ResultData,
                                totalPage: _newList.list[0].totalpage,
                                page: 1
                            });
                        }
                        twCommonUi.scrollLoading = true;
                    }
                );
            });
        });
        /*console.log(_this.state.page);*/
        twCommonUi.listScrollLoading('.used-list ul', function(){
            if(_this.state.page >= _this.state.totalPage) {
                _data.page=1;
                twCommonUi.scrollLoading = false;

            } else {
                _data.page=_data.page+1;

                twCommonUi.getApiData(
                    {
                        'url': loc[20].api[_data.category],
                        'type': _this.type,
                        'method': _this.method,
                        'data': _data
                    },
                    'append',
                    React.addons, function (listType, resp, reactAddons) {
                        var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);

                        if (_this.isMounted()) {
                            _this.setState({
                                list: _newList.list,
                                totalPage: _newList.totalPage,
                                page: _this.state.page+1
                            });
                        }
                        twCommonUi.scrollLoading = true;
                    }
                );
            }
        });
        jQuery('.used-del .all-check').off('tap').on('tap', function(e) {
            e.stopPropagation();
            var _$inp=jQuery('.inp-check');
            _$inp.each(function(idx) {
               if(!jQuery(this).find('input').attr('checked')) {
                   _$inp.addClass('active').find('input').attr('checked','checked');
                   return false;
               } else {
                   if((_$inp.length-1)==idx) {
                       _$inp.removeClass('active').find('input').removeAttr('checked');
                   }
               }
            });
        });

        jQuery('.used-del .all-del').on('tap', function(e) {
            e.stopPropagation();
            console.log(_this.category);
            if (_this.category == undefined || _this.category == 0) {
                apiNum = 3;
            } else if (_this.category == 1) {
                apiNum = 4;
            } else if (_this.category == 2) {
                apiNum = 5;
            }
            var itemIdx = [];
            jQuery('.inp-check.active').find('input').each(function() {
                itemIdx.push($(this).attr('data-history'));
            });
            console.log(itemIdx);
            var _data = {
                u_idx : (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                history_idx : itemIdx.toString()
            };
            console.log(_data);
            reqwest({
                url : loc[20].api[apiNum],
                method : loc[20].method,
                type : loc[20].type,
                data : _data
            })
            .then(function(resp) {
                if (resp[0].ResultCode == 1) {
                    jQuery('.inp-check.active').closest('.used-wrap').remove();
                } else if (resp[0].ResultCode < 1) {
                    alert('이용내역 삭제에 실패했습니다.');
                }
            })
            .fail(function (err, msg) {
                console.log(err);
                jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
            });
        });
    },
    render : function() {
        var _contents_list = null;

        var _createItem = function(list, idx) {
            console.log('min 진입');
            var _background={
                'background-image':'url('+list.shop_logo_image+')'
            };

            _history_type = null;
            _history_type = null;
            _action_info = null;
            _used_date = React.createElement("span", {className: "used-date"}, list.regdate.substring(0, 10));
            _history_idx = list.min_history_idx;
            _shop_logo = React.createElement("span", {className: "shop-logo", style: _background});
            _shop_name = React.createElement("p", {className: "shop-name"}, list.shop_name);

            if (list.history_type == "1" || list.history_type == "1_1") { // min일 때 적립요건 일 때
                _history_type = React.createElement("div", {className: "tag save"}, React.createElement("span", null, "적립"));
                _action_info = React.createElement("span", null, React.createElement("em", null, list.min_save, "min"), "을 적립했습니다.");

            } else if (list.history_type == "2") { // min일 때 교환, min --> 쿠폰
                _history_type = React.createElement("div", {className: "tag ex"}, React.createElement("span", null, "교환"));
                _action_info = React.createElement("span", null, React.createElement("em", null, list.min_use, "min"), "으로 ", React.createElement("em", null, list.coupon_master_name), "을 구매했습니다.");

            } else if (list.history_type == "3") { // min일 때 사용, min --> coin
                _history_type = React.createElement("div", {className: "tag ex"}, React.createElement("span", null, "교환"));
                _action_info = React.createElement("span", null, React.createElement("em", null, list.min_use, "min"), "을 ", React.createElement("em", null, list.excoin, "coin"), "으로 교환했습니다.");
            }

            return (
                React.createElement("li", {className: "used-wrap fix"}, 
                    _history_type, 
                    _shop_logo, 
                    React.createElement("div", {className: "used-balloons"}, 
                        _used_date, 
                        _shop_name, 
                        React.createElement("div", {className: "substance"}, 
                            _action_info
                        ), 
                        React.createElement("div", {className: "inp-check"}, 
                            React.createElement("input", {type: "checkbox", id: "check"+_history_idx, "data-history": _history_idx, name: "mycheck"}), React.createElement("label", {htmlFor: "check"+_history_idx}, React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})))
                        )
                    )
                )
            )
        };

        var _createItem1 = function(list, idx) {
            var _background={
                'background-image':'url('+list.shop_logo_image+')'
            };

            _history_type = null;
            _history_type = null;
            _action_info = null;
            _used_date = React.createElement("span", {className: "used-date"}, list.regdate.substring(0, 10));
            _history_idx = list.coin_history_idx;
            _shop_logo = React.createElement("span", {className: "shop-logo", style: _background});
            _shop_name = React.createElement("p", {className: "shop-name"}, list.shop_name);

            if (list.history_type == "1") {
                _history_type = React.createElement("div", {className: "tag save"}, React.createElement("span", null, "적립"));
                _action_info = React.createElement("span", null, React.createElement("em", null, list.min, "min"), "을 ", React.createElement("em", null, list.coin, "coin"), "으로 교환하였습니다.");

            } else if (list.history_type == "2" || list.history_type == "3") {
                _history_type = React.createElement("div", {className: "tag use"}, React.createElement("span", null, "사용"));
                _action_info = React.createElement("span", null, React.createElement("em", null, list.coin, "coin"), "을 사용하였습니다.");
            }

            return (
                React.createElement("li", {className: "used-wrap fix"}, 
                    _history_type, 
                    _shop_logo, 
                    React.createElement("div", {className: "used-balloons"}, 
                        _used_date, 
                        _shop_name, 
                        React.createElement("div", {className: "substance"}, 
                            _action_info
                        ), 
                        React.createElement("div", {className: "inp-check"}, 
                            React.createElement("input", {type: "checkbox", id: "check"+_history_idx, "data-history": _history_idx, name: "mycheck"}), React.createElement("label", {htmlFor: "check"+_history_idx}, React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})))
                        )
                    )
                )
            )
        };

        var _createItem2 = function(list, idx) {
            //console.log(list.coupon_use_yn);
            var _background={
                'background-image':'url('+list.shop_logo_image+')'
            };

            _history_type = null;
            _action_info = null;
            _coupon_reg_date = null;
            _coupon_min_point = null;
            _coupon_use_log = null;
            _coupon_use_end = null;
            _history_idx = list.coupon_idx;
            _used_date = React.createElement("span", {className: "used-date"}, list.coupon_regdate.substring(0,10));
            _shop_logo = React.createElement("span", {className: "shop-logo", style: _background});
            _shop_name = React.createElement("p", {className: "shop-name"}, list.shop_name);

            if (list.coupon_use_yn == "Y") {
                console.log('쿠폰 사용');
                _history_type = React.createElement("div", {className: "tag use"}, React.createElement("span", null, "사용"));
                _action_info = React.createElement("span", null, React.createElement("em", null, list.coupon_master_name), "을 사용했습니다.");
                _coupon_use_log = React.createElement("span", {className: "usage-date"}, list.coupon_use_regdate.substring(0,10));
                _coupon_use_end = React.createElement("span", {className: "usage-complete"}, "쿠폰 사용완료");

            } else if (list.coupon_use_yn == "N") {
                console.log('쿠폰 안사용');
                _history_type = React.createElement("div", {className: "tag ex"}, React.createElement("span", null, "교환"));
                _action_info = React.createElement("span", null, React.createElement("em", null, list.coupon_min_point, "min"), "으로 ", React.createElement("em", null, list.coupon_master_name), "쿠폰을 구매했습니다.");
            }

            return (
                React.createElement("li", {className: "used-wrap fix"}, 
                    _history_type, 
                    _shop_logo, 
                    React.createElement("div", {className: "used-balloons"}, 
                        _used_date, 
                        _shop_name, 
                        React.createElement("div", {className: "substance"}, 
                            _action_info
                        ), 
                        React.createElement("div", {className: "inp-check"}, 
                            React.createElement("input", {type: "checkbox", id: "check"+_history_idx, "data-history": _history_idx, name: "mycheck"}), React.createElement("label", {htmlFor: "check"+_history_idx}, React.createElement("span", {className: "box"}, React.createElement("em", {className: "box-dot"})))
                        )
                    ), 
                    React.createElement("div", {className: "usage"}, 
                        _coupon_use_log, 
                        _coupon_use_end
                    )
                )
            )
        };


        if(this.state.list[0]!='') {
            if (this.state.list.length > 0) {

                if (this.category == 0 || this.category == undefined) {
                    _contents_list = this.state.list.map(_createItem);
                } else if (this.category == 1) {
                    _contents_list = this.state.list.map(_createItem1);
                } else if (this.category == 2) {
                    _contents_list = this.state.list.map(_createItem2);
                }
            } else {
                _contents_list = React.createElement(UsedListEmpty, null);
            }
        }
        return (
            React.createElement("div", {className: "used-list"}, 
                React.createElement("ul", null, 
                    _contents_list
                )
            )
        )
    }
});

/*****************************************************************************************
 * 사용내역 없음.
 *
 *****************************************************************************************/
var UsedListEmpty = React.createClass({displayName: "UsedListEmpty",
    render : function () {
        return (
            React.createElement("li", {className: "no-data"}, 
                React.createElement("div", {className: "no-data-ment"}, 
                    React.createElement("p", {className: "text-type2"}, "이용 내역이 없습니다.")
                )
            )
        )
    }
});