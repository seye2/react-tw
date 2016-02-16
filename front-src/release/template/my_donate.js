/*********************************************************************
 * 나의 기부내역 껍데기
 *
 *********************************************************************/
var MyDonate = React.createClass({displayName: "MyDonate",
    componentWillMount : function() {
        var _data = {
            'u_idx' : (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1
        };

        reqwest({
            url : loc[29].api[2],
            method : loc[29].method,
            type : loc[29].type,
            data : _data
        })
        .then(function(resp) {
            if(resp[0].ResultCode == 1) {
                _coin_status = resp[0].ResultData[0].coin;
                jQuery('.donate-amount-inner strong').text(_coin_status);
            }
        })
        .fail(function (err, msg) {
            console.log(err);
            jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
        });
    },
    componentDidMount : function() {
        twCommonUi.setContentsHeight();
        jQuery('.contents').css({
            'padding-left':0,
            'padding-right':0
        });
    },
    render : function() {
        var _contents_list = null,
            _contents_list = React.createElement(MyDonateList, null);

        return (
            React.createElement("div", {className: "page "+loc[29].pageName+" "+this.props.position}, 
                React.createElement("div", {className: "donate-amount"}, 
                    React.createElement("div", {className: "donate-amount-inner"}, 
                        React.createElement("strong", null), React.createElement("span", null, "coin"), 
                        React.createElement("p", null, "나의 총 기부 금액")
                    )
                ), 
                React.createElement("div", {className: "donate-my-history"}, 
                    _contents_list
                )
            )
        )
    }
});

/**********************************************************************
 * 나의 기부내역 리스트
 *
 *********************************************************************/
var MyDonateList = React.createClass({displayName: "MyDonateList",
    getInitialState : function() {
        return ({list:[''], page:1, totalPage:1});
    },
    componentDidMount : function() {

        var _this =this,
            u_idx = (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1;

        var _data = {
            'u_idx' : u_idx,
            'page' : 1
        };

        jQuery('.donate-list ul').css({
            'height' : jQuery(window).height() - jQuery('.header').height() - jQuery('donate-amount').height()
        });

        twCommonUi.getApiData(
            {
                'url':loc[29].api[1],
                'type':'json',
                'method':'post',
                'data':_data
            },
            'html',
            React.addons,
            function(listType,resp,reactAddons) {
                var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons),
                    _type_list=[];
                //console.log(_newList.list[0]);
                //setState excute react render
                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                    // list중에 history_type이 맞는 것만 _type_history에 저장한다.
                    Lazy(_newList.list[0].ResultData).filter(function(list) {
                        return list.history_type==='1'; //3번이 기부인데 테스트데이터가 없어서 아무 화면도 나오지 않음.
                    }).each(function(list) {
                        _type_list.push(list);
                    });

                    _this.setState({
                        list: _type_list,
                        totalPage: _newList.list[0].totalpage,
                        page: 1
                    });
                }
                twCommonUi.scrollLoading = true;
            }
        );

        twCommonUi.listScrollLoading('.donate-list ul', function(){
            if(_this.state.page >= _this.state.totalPage) {
                _data.page=1;
                twCommonUi.scrollLoading = false;

            } else {
                _data.page=_data.page+1;

                twCommonUi.getApiData(
                    {
                        'url': loc[29].api[1],
                        'type': 'json',
                        'method': 'post',
                        'data': _data
                    },
                    'append',
                    React.addons, function (listType, resp, reactAddons) {
                        var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons),
                            _type_list=[];

                        if (_this.isMounted()) {

                            // list중에 history_type이 맞는 것만 _type_history에 저장한다.
                            console.log(_newList.list[0]);
                            Lazy(_newList.list[0].ResultData).filter(function(list) {
                                return list.history_type==='1';
                            }).each(function(list) {
                                _type_list.push(list);
                            });

                            _this.setState({
                                list: _type_list,
                                totalPage: _newList.totalPage,
                                page: _this.state.page+1
                            });
                        }
                        twCommonUi.scrollLoading = true;
                    }
                );
            }
        });
    },
    render : function() {
        var _contents_list = null;
        var _createItem = function(list, idx) {
            var _background = {
                'background-image' : 'url('+list.shop_logo_image+')'
            };
            _used_date = React.createElement("p", {className: "donate-date"}, "기부일 : ", React.createElement("span", null, list.regdate.substring(0, 10)));
            _d_org_name = React.createElement("span", {className: "donate-place"}, list.d_organization);
            _d_coin = React.createElement("em", null, list.coin);

            return (
                React.createElement("li", null, 
                    React.createElement("div", {className: "donate-logo", style: _background}), 
                    React.createElement("div", {className: "balloons"}, 
                        _used_date, 
                        React.createElement("div", {className: "report"}, 
                            _d_org_name, "에 ", React.createElement("br", null), 
                            React.createElement("span", {className: "donate-coin"}, _d_coin, "coin"), "을 기부하셨습니다."
                        )
                    )
                )
            );
        };

        if(this.state.list[0]!='') {
            if (this.state.list.length > 0) {
                _contents_list = this.state.list.map(_createItem);
            } else {
                _contents_list = React.createElement(NoDonationList, null);
            }
        }

        return (
            React.createElement("div", {className: "donate-list"}, 
                React.createElement("ul", null, 
                    _contents_list
                )
            )
        );
    }
});

/***************************************************************
 * 기부내역 없음
 *
 ***************************************************************/
var NoDonationList = React.createClass({displayName: "NoDonationList",
    render : function() {
        return (
            React.createElement("li", null, 
                React.createElement("div", {className: "no-data"}, 
                    React.createElement("div", {className: "no-data-ment type2"}, 
                        React.createElement("p", {className: "text-type2"}, "기부내역이 없습니다.")
                    )
                )
            )
        );
    }
});