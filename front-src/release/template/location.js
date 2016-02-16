/*********************************************************************************
 * modal class
 * html template
 * set location modal
 *********************************************************************************/
var ModalSetLocation = React.createClass({displayName: "ModalSetLocation",
    componentDidMount:function(){

        jQuery('.list-location').height(jQuery(window).height()-45);
        jQuery('.btn-location-close').on('tap',function() {
            twCommonUi.closeRegionAccordion();
        })

    },
    render : function() {
        var _contents=null;
        _contents=React.createElement(ModalSetLocationSi, null);

        return (
            React.createElement("section", {className: "modal modal-location", style: this.props}, 
                React.createElement("div", {className: "modal-inner"}, 
                    React.createElement("div", {className: "modal-contents"}, 
                        React.createElement("div", {className: "location-header"}, 
                            React.createElement("h3", null, "지역설정"), 
                            React.createElement("a", {className: "btn-location-close", href: "javascript:void(0);"}, "닫기")
                        ), 
                        React.createElement("div", {className: "list-location"}, 
                            _contents
                        )
                    )
                )
            )
        )
    }
});

var ModalSetLocationSi = React.createClass({displayName: "ModalSetLocationSi",
    props:null,
    getInitialState:function() {
        return {list:['']}
    },
    componentDidMount:function(){
        var _this=this,
            props=null;

        twCommonUi.getApiData(
            {
                'url':loc[0].api[3],
                'type':'json'
            },
            'html',
            React.addons,
            function(listType,resp,reactAddons) {
                var _newList=twCommonUi.getApiList(_this, listType,resp,reactAddons).list[0].ResultData,
                    _addrs=[],
                    _infos=[];

                Lazy(twCommonUi.getApiList(_this, listType,resp,reactAddons).list[0].ResultData).each(function(d,k) {

                    if(_addrs.length>0) {
                        if (_addrs[_addrs.length-1].si != d.si) {
                            _infos=[];
                            _addrs.push(
                                {
                                    'si': d.si,
                                    _infos
                                }
                            );

                        }
                    } else {
                        _addrs.push(
                            {
                                'si': d.si,
                                _infos
                            }
                        );
                    }
                    _infos.push(
                        {
                            "gu": d.gu,
                            "idx": d.idx,
                            "addr": d.addr
                        }
                    );

                });
                //setState excute react render
                if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                    _this.setState({
                        list: _addrs
                    });

                }
            }
        );

    },
    render: function () {
        var _siItem=null,
            _guItem=[],
            _createItem=function(data,index) {
                var _contents=React.createElement(ModalSetLocationGu, {items: data._infos});
                return (
                    React.createElement("li", {className: "siList", key: index}, 
                        React.createElement("div", {className: "select"}, React.createElement("a", {href: "javascript:void(0);", className: "city"}, data.si, React.createElement("i", {className: "fa fa-caret-down"}))), 
                        _contents
                    )
                )
            };

        if(this.state.list[0]!='') {
            if (this.state.list.length > 0) {
                _siItem=this.state.list.map(_createItem);
            }
        }

        return (
            React.createElement("ul", null, 
                _siItem
            )
        )
    }
});

var ModalSetLocationGu = React.createClass({displayName: "ModalSetLocationGu",
    getInitialState:function() {
        return {list:['']}
    },
    componentDidMount:function(){
        var _this=this;

        //setState excute react render
        if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
            _this.setState({
                list: this.props.items
            });

        }

    },
    render: function () {
        var _createItem=function(data,index) {

                var _contents=null;

                if(data.gu.length>1) {
                    _contents = React.createElement("li", {key: index}, React.createElement("a", {href: "javascript:void(0);", className: "state"}, data.gu));
                }

                return (
                {_contents}
                )
            },
            _guItem=null;

        if(this.state.list[0]!='') {
            if (this.state.list.length > 0) {
                _guItem=this.state.list.map(_createItem);
            }
        }
        return (
            React.createElement("ul", {className: "sub"}, 
                _guItem
            )
        )
    }
});

