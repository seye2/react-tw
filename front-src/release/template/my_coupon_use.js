/*********************************************************************************
 * MyCouponUse class
 * html template
 *********************************************************************************/
var MyCouponUse = React.createClass({displayName: "MyCouponUse",
    getInitialState:function() {
        return ({list:['']});
    },
    componentDidMount:function() {
        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();
        jQuery('.contentsScroll').height(jQuery(window).height()-jQuery('.header').height());

        var _this=this,
            _data={
                //coupon_master_idx:parseInt(_this.props.coupon_idx)
                coupon_master_idx:1
            };

        twCommonUi.getApiData(
            {
                'url':loc[19].api[0],
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
                        list: _newList.list[0].ResultData[0]
                    });
                }

                //enable scroll to set data
                twCommonUi.scrollLoading = true;
            }
        );

    },
    render : function () {
        var _this=this,
            _contents=null,
            _bg={
                background:'#e5e5e5'
            },
            _createItem=function(coupon) {

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

                return (
                    React.createElement("div", null, 
                        React.createElement("div", {className: "use-top-wrap coupon"}, 
                            React.createElement("div", {className: "use-top-wrap-inner fix"}, 
                                React.createElement("div", {className: "coupon-kind"+_coupon_kind.cls}, React.createElement("span", {className: "hanareum", style: _coupon_background}, "한아름 제휴"), _coupon_kind.txt), 

                                React.createElement("div", {className: "text"}, 
                                    React.createElement("strong", null, coupon.coupon_master_name), 
                                    React.createElement("p", null, React.createElement("span", null, coupon.coupon_startdate), "부터 ", React.createElement("span", null, coupon.coupon_enddate), "까지")
                                )
                            )
                        ), 

                        React.createElement("div", {className: "payment-wrap"}, 
                            React.createElement("div", {className: "roundbox"}, 
                                React.createElement("div", {className: "roundbox-inner"}, 
                                    React.createElement("div", {className: "coupon-explain"}, 
                                        React.createElement("p", null, coupon.coupon_master_descriptionon), 
                                        React.createElement("div", {className: "message fix"}, 
                                            React.createElement("span", {className: "shop-name"}, coupon.shop_name), React.createElement("span", {className: "min"}, "1매 ", React.createElement("em", null, coupon.coupon_min_point, "min"))
                                        )
                                    )
                                )
                            ), 

                            React.createElement("div", {className: "roundbox"}, 
                                React.createElement("div", {className: "roundbox-inner"}, 
                                    React.createElement("div", {className: "use-button"}, 
                                        React.createElement("span", {className: "title"}, "사용하기"), 
                                        React.createElement("p", null, "자세한 사용방법은 아래를 확인하세요."), 
                                        React.createElement("div", {className: "btn-use"}, 
                                            React.createElement("a", {href: "#/coupon-use-select/"+_this.props.coupon_idx}, "사용하기")
                                        )
                                    )
                                )
                            ), 

                            React.createElement("div", {className: "roundbox"}, 
                                React.createElement("div", {className: "roundbox-inner"}, 
                                    React.createElement("div", {className: "use-way"}, 
                                        React.createElement("span", {className: "title"}, "사용방법"), 
                                        React.createElement("div", {className: "img-explain"}, 
                                            React.createElement("ol", {className: "fix"}, 
                                                React.createElement("li", null, "블루투스 ON"), 
                                                React.createElement("li", null, "단말기 제시"), 
                                                React.createElement("li", null, "비콘태그")
                                            )
                                        ), 
                                        React.createElement("ol", {className: "text-explain"}, 
                                            React.createElement("li", null, "1) 단말기의 블루투스 기능을 켜주세요."), 
                                            React.createElement("li", null, "2) 점원의 안내에 따라 단말기를 제시하세요."), 
                                            React.createElement("li", null, "3) 비콘과 단말기가 통신 후 결제가 완료됩니다.")
                                        )
                                    )
                                )
                            )
                        )
                    )
                );
            };

        if(this.state.list[0]!='') {
            _contents=_createItem(this.state.list);
        }

        return (
            React.createElement("div", {className: "page "+loc[19].pageName+" "+this.props.position, style: _bg}, 
                React.createElement("div", {className: "contentsScroll"}, 

                    _contents

                )
            )
        )
    }
});



