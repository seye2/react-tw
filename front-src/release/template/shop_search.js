/**
 * Created by 남동훈 on 2015-10-27.
 */
/*********************************************************************************
 * 검색 class
 * html template
 *********************************************************************************/
var ShopSearch = React.createClass({displayName: "ShopSearch",

    contentsList:null,
    contentsHistoryList:null,
    componentDidMount:function() {
        var _this=this,
            _$j=jQuery('.search-history'),
            _data={};

        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();

        // TODO : search-history height
        _$j.height(
            jQuery(window).height() - jQuery('.header').height() - jQuery('.search-wordbox').height()  - jQuery('.delet-all').height()
        );

        /**********************************
         * 리스트페이지 이동
         *********************************/
        jQuery('.header-shopmap .btn-shop-list').on('tap',function(e) {
            e.stopPropagation();
            location.href='#/shop-list';
        });

        twSearch.initList(
            jQuery('.search-history'),[],function(_data) {

                _$j.append('<ul></ul>');
                Lazy(_data).each(function(i,k) {
                    _$j.find('ul').append(
                        '<li><a class="search-word" href="javascript:void(0);">'+i.search+'</a><a class="btn-del" href="javascript:void(0);">삭제</a></li>'
                    );
                });
            }
        )
        .searchEnter(jQuery('.search-wordbox'),function(iTxt) {
            //callback

            var _data={
                'u_idx': (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                'latitude': '',
                'longitude': '',
                'shop_category': '',
                'searchText': '',
                'sort': 1,
                'page': 1,
                'shop_type': 'all'
            };
            jQuery('.search-result').hide();

            _data.searchText=iTxt;

            twCommonUi.getApiData(
                {
                    url:loc[7].api[0],
                    type:loc[7].type,
                    method:'post',
                    data:_data
                },
                'html',
                React.addons,
                function(listType,resp,reactAddons) {
                    var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);

                    React.render(React.createElement(ShopSearchList, {data:_newList.list[0].ResultData}), document.getElementsByClassName('search-history-list')[0]);
                }
            );


            // TODO : search-history height
            _$j.height(
                jQuery(window).height() - jQuery('.header').height() - jQuery('.search-wordbox').height()  - jQuery('.delet-all').height()
            );

        })
        .selectItem('.search-result .search-word',function(iTxt) {
            //callback
            jQuery('.search-wordbox input').val(iTxt);
        })
        .eachDel('.search-result .btn-del',function(iTxt) {
            //callback
        })
        .clear(jQuery('.search-result .btn-search-clear'),function() {
            //callback
        });
    },
    render : function () {
        var _this=this,
            _contents = null,
            _contentsHistory=null;

            _contents = React.createElement(ShopSearch, null);
            _contentsHistory = React.createElement(ShopSearchHistory, null);

        return (
            React.createElement("div", {className: "page "+loc[7].pageName+" "+this.props.position}, 
                React.createElement("div", {className: "search-wordbox"}, 
                    React.createElement("div", {className: "search-wordbox-inner fix"}, 
                        React.createElement("a", {className: "btn-shop-search", href: "javascript:void(0);"}, React.createElement("i", {className: "fa fa-search"})), 
                        React.createElement("span", {className: "inp-type2"}, React.createElement("input", {type: "search", placeholder: "검색어를 입력하세요"}))
                    )
                ), 
                _contentsHistory, 

                React.createElement("div", {className: "search-history-list"}
                )
            )
        )
    }
});

/*********************************************************************************
 * 검색 history class
 * html template
 *********************************************************************************/
var ShopSearchHistory = React.createClass({displayName: "ShopSearchHistory",
    componentDidMount: function () {
        jQuery('.btn-history-hidden').on('tap',function() {
           jQuery('.search-result').hide();
            React.render(React.createElement(ShopSearchList, {data:[]}), document.getElementsByClassName('search-history-list')[0]);
        });
    },
    render: function () {
        return(
            React.createElement("div", {className: "search-result"}, 
                React.createElement("div", {className: "delet-all"}, 
                    React.createElement("a", {className: "btn-history-hidden", href: "javascript:void(0);"}, React.createElement("span", null, "숨김")), 
                    React.createElement("a", {className: "btn-search-clear", href: "javascript:void(0);"}, React.createElement("span", null, "모두"))
                ), 
                React.createElement("div", {className: "search-history"}
                )
            )
        )
    }
});

/*********************************************************************************
 * shopsearchlist state class
 * html template
 *********************************************************************************/
var ShopSearchList = React.createClass({displayName: "ShopSearchList",
    componentDidMount:function() {
        setTimeout(function() {
            jQuery('.twShop_search .search-history-list').css('height',jQuery(window).height()-jQuery('.search-wordbox').height()-jQuery('.header').height());
        },300)

        /**********************************
         * @param : scroll target
         *********************************/

    },
    render:function() {
        var _contents=null,
            createItem=function(shopList,idx) {
                var _backgroundImage={
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

                if(shopList.shop_coin_save_yn=='Y') {
                    _coin_premium=React.createElement("span", {className: "coin-premium"}, "shopList.shop_name");
                }

                if(shopList.shop_flore!='') {
                    _floor=React.createElement("div", {className: "floor"}, shopList.shop_flore, "F");
                }

                if(shopList.coupon_master_name!='') {
                    _coupon_desc=React.createElement("div", null, React.createElement("strong", null, "쿠폰"), React.createElement("p", null, "shopList.coupon_master_name"));
                } else {
                    _coupon_desc=React.createElement("div", {className: "use-no"}, React.createElement("strong", null, "쿠폰"), React.createElement("p", null, "등록된 쿠폰이 없습니다."));
                }

                if(shopList.coupon_use_yn!='N') {
                    _coin_ratio=React.createElement("div", null, React.createElement("strong", null, "코인"), React.createElement("p", null, shopList.shop_coin_rate, "min = ", shopList.shop_coin_exchange_min, "coin"));
                } else {
                    _coin_ratio=React.createElement("div", {className: "use-no"}, React.createElement("strong", null, "코인"), React.createElement("p", null, "코인 교환이 종료되었습니다."));
                }

                if(shopList.shop_min_save_yn=='Y') {
                    _min_save=React.createElement("li", {className: "min-save"}, "min 적립");
                } else {
                    _min_save=React.createElement("li", {className: "min-save no"}, "min 적립");
                }

                if(shopList.coupon_yn=='Y') {
                    _use_coupon=React.createElement("li", {className: "coupon"}, "쿠폰사용");
                } else {
                    _use_coupon=React.createElement("li", {className: "coupon no"}, "쿠폰사용");
                }

                if(shopList.shop_coin_use_yn=='Y') {
                    _exchange_coin=React.createElement("li", {className: "coin"}, "코인사용");
                } else {
                    _exchange_coin=React.createElement("li", {className: "coin no"}, "코인사용");
                }

                if(shopList.shop_name.length>0) {
                    _remain=React.createElement("li", {className: "remain"}, "매장");
                } else {
                    _remain=React.createElement("li", {className: "remain no"}, "매장");
                }

                if(shopList.bookmark_idx>0) {
                    _bookmark_class=' active';
                }

                return (
                    React.createElement("div", {className: "item-list fix", ref: "item", "data-shop-idx": shopList.shop_idx}, 
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

        if(this.props.data) {
            if (this.props.data.length > 0) {
                    _contents = this.props.data.map(createItem);
            } else {
                _contents = React.createElement(ShopSearchHistoryEmpty, null)
            }
        } else {
            _contents = React.createElement(ShopSearchHistoryEmpty, null)
        }

        return (
            React.createElement("div", null, 
                _contents
            )
        )
    }
});

/*********************************************************************************
 * 검색 history empty class
 * html template
 *********************************************************************************/
var ShopSearchHistoryEmpty = React.createClass({displayName: "ShopSearchHistoryEmpty",
    componentDidMount: function () {
        //높이 설정 공통 부분
        //twCommonUi.setContentsHeight();
    },
    render: function () {
        return (
            React.createElement("div", {className: "no-data"}, 
                React.createElement("div", {className: "no-data-ment"}, 
                    React.createElement("p", null, "최근 검색된 매장이없습니다.")
                )
            )
        )
    }
});
