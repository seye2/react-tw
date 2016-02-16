/*********************************************************************************
 * shopstate state class
 * html template
 *********************************************************************************/
var ShopState = React.createClass({displayName: "ShopState",
    type:'',
    render : function () {

        var _contents = null,
            _contentsList=null;

        _contents = React.createElement(ShopState, null);

        if (jQuery('.twShop_map').size() < 1) {
            this.type = " type1";
        } else {
            this.type = "";
            if(this.props.data) {
                _contentsList=React.createElement(ShopStateList, React.__spread({},  this.props));
            } else {
                _contentsList=React.createElement(ShopStateListEmpty, null);
            }
        }

        return (

            React.createElement("div", {className: "state-bottombox"+this.type}, 
                React.createElement("div", {className: "state-bottombox-inner"}, 
                    React.createElement("div", {className: "state-area beacon-no-connect"}, 
                        React.createElement("div", {className: "state-bar"}, 
                            React.createElement("a", {className: "btn-state-view", href: "javascript:void(0);"}, React.createElement("img", {src: "/front-src/release/images/bg_blank.png"})), 
                            React.createElement("img", {src: "/front-src/release/images/shop_beacon_connect.svg", alt: "", width: "100%"})
                        ), 

                        React.createElement("div", {className: "state-cont"}, 
                            React.createElement("div", {className: "message-type1"}, 
                                React.createElement("p", null, "가까운 타임월렛 매장을 방문해보세요!")
                            )
                        )
                    ), 

                    _contentsList
                )
            )
        )
    }
});

/*********************************************************************************
 * shopstatelist state class
 * html template
 *********************************************************************************/
var ShopStateList = React.createClass({displayName: "ShopStateList",
    componentDidMount:function() {
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
    render:function() {
        var shopList=this.props.data,
            _backgroundImage={
                'background-image':'url('+shopList.shop_logo_image+')'
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

        if (shopList.shop_coin_save_yn == 'Y') {
            _coin_premium = React.createElement("span", {className: "coin-premium"}, shopList.shop_name);
        }

        if (shopList.shop_flore != '') {
            _floor = React.createElement("div", {className: "floor"}, shopList.shop_flore, "F");
        }

        if (shopList.coupon_name != '') {
            _coupon_desc = React.createElement("div", null, React.createElement("strong", null, "쿠폰"), 

                React.createElement("p", null, shopList.coupon_name));
        } else {
            _coupon_desc = React.createElement("div", {className: "use-no"}, React.createElement("strong", null, "쿠폰"), 

                React.createElement("p", null, "등록된 쿠폰이 없습니다."));
        }

        if (shopList.coupon_use_yn != 'N') {
            _coin_ratio = React.createElement("div", null, React.createElement("strong", null, "코인"), 

                React.createElement("p", null, shopList.shop_coin_rate, "min = ", shopList.shop_coin_exchange_min, "coin"));
        } else {
            _coin_ratio = React.createElement("div", {className: "use-no"}, React.createElement("strong", null, "코인"), 

                React.createElement("p", null, "코인 교환이 종료되었습니다."));
        }

        if (shopList.shop_min_save_yn == 'Y') {
            _min_save = React.createElement("li", {className: "min-save"}, "min 적립");
        } else {
            _min_save = React.createElement("li", {className: "min-save no"}, "min 적립");
        }

        if (shopList.coupon_yn == 'Y') {
            _use_coupon = React.createElement("li", {className: "coupon"}, "쿠폰사용");
        } else {
            _use_coupon = React.createElement("li", {className: "coupon no"}, "쿠폰사용");
        }

        if (shopList.shop_coin_use_yn == 'Y') {
            _exchange_coin = React.createElement("li", {className: "coin"}, "코인사용");
        } else {
            _exchange_coin = React.createElement("li", {className: "coin no"}, "코인사용");
        }

        if (shopList.shop_name.length > 0) {
            _remain = React.createElement("li", {className: "remain"}, "매장");
        } else {
            _remain = React.createElement("li", {className: "remain no"}, "매장");
        }

        if (shopList.bookmark_idx > 0) {
            _bookmark_class = ' active';
        }


        return (
            React.createElement("div", {className: "bottombox-item"}, 
                React.createElement("div", {className: "item-list fix", ref: "item", "data-shop-idx": shopList.shop_idx, "data-lat": shopList.shop_latitude, "data-lng": shopList.shop_longitude}, 
                    React.createElement("div", {className: "item"}, 
                        _coin_premium, 
                        React.createElement("span", {className: "shop-logo", style: _backgroundImage})
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
                            React.createElement("a", {href: "javascript:void(0)"}, React.createElement("i", {className: "fa fa-heart-o"}), React.createElement("span", {
                                className: "num"}, shopList.bookmark_idx))
                        ), 
                        React.createElement("div", {className: "distance fix"}, 
                            React.createElement("div", {className: "meter"}, shopList.dis, "m"), 
                            _floor
                        )
                    )
                )
            )
        )
    }
});

/*********************************************************************************
 * shopstatelist state class
 * html template
 *********************************************************************************/
var ShopStateListEmpty = React.createClass({displayName: "ShopStateListEmpty",
    render : function () {
        var _contentsEmpty = null;

        _contentsEmpty = React.createElement(ShopStateListEmpty, null);

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
