/*********************************************************************************
 * shopstate state class
 * html template
 *********************************************************************************/
var ShopState = React.createClass({
    type:'',
    render : function () {

        var _contents = null,
            _contentsList=null;

        _contents = <ShopState />;

        if (jQuery('.twShop_map').size() < 1) {
            this.type = " type1";
        } else {
            this.type = "";
            if(this.props.data) {
                _contentsList=<ShopStateList {...this.props} />;
            } else {
                _contentsList=<ShopStateListEmpty />;
            }
        }

        return (

            <div className={"state-bottombox"+this.type}>
                <div className="state-bottombox-inner">
                    <div className="state-area beacon-no-connect">
                        <div className="state-bar">
                            <a className="btn-state-view" href="javascript:void(0);"><img src="/front-src/release/images/bg_blank.png" /></a>
                            <img src="/front-src/release/images/shop_beacon_connect.svg" alt="" width="100%" />
                        </div>

                        <div className="state-cont">
                            <div className="message-type1">
                                <p>가까운 타임월렛 매장을 방문해보세요!</p>
                            </div>
                        </div>
                    </div>

                    {_contentsList}
                </div>
            </div>
        )
    }
});

/*********************************************************************************
 * shopstatelist state class
 * html template
 *********************************************************************************/
var ShopStateList = React.createClass({
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
            _coin_premium = <span className="coin-premium">{shopList.shop_name}</span>;
        }

        if (shopList.shop_flore != '') {
            _floor = <div className="floor">{shopList.shop_flore}F</div>;
        }

        if (shopList.coupon_name != '') {
            _coupon_desc = <div><strong>쿠폰</strong>

                <p>{shopList.coupon_name}</p></div>;
        } else {
            _coupon_desc = <div className="use-no"><strong>쿠폰</strong>

                <p>등록된 쿠폰이 없습니다.</p></div>;
        }

        if (shopList.coupon_use_yn != 'N') {
            _coin_ratio = <div><strong>코인</strong>

                <p>{shopList.shop_coin_rate}min = {shopList.shop_coin_exchange_min}coin</p></div>;
        } else {
            _coin_ratio = <div className="use-no"><strong>코인</strong>

                <p>코인 교환이 종료되었습니다.</p></div>;
        }

        if (shopList.shop_min_save_yn == 'Y') {
            _min_save = <li className="min-save">min 적립</li>;
        } else {
            _min_save = <li className="min-save no">min 적립</li>;
        }

        if (shopList.coupon_yn == 'Y') {
            _use_coupon = <li className="coupon">쿠폰사용</li>;
        } else {
            _use_coupon = <li className="coupon no">쿠폰사용</li>;
        }

        if (shopList.shop_coin_use_yn == 'Y') {
            _exchange_coin = <li className="coin">코인사용</li>;
        } else {
            _exchange_coin = <li className="coin no">코인사용</li>;
        }

        if (shopList.shop_name.length > 0) {
            _remain = <li className="remain">매장</li>;
        } else {
            _remain = <li className="remain no">매장</li>;
        }

        if (shopList.bookmark_idx > 0) {
            _bookmark_class = ' active';
        }


        return (
            <div className="bottombox-item">
                <div className="item-list fix" ref="item" data-shop-idx={shopList.shop_idx} data-lat={shopList.shop_latitude} data-lng={shopList.shop_longitude}>
                    <div className="item">
                        {_coin_premium}
                        <span className="shop-logo" style={_backgroundImage}></span>
                    </div>

                    <div className="balloons">
                        <strong className="shop-name">{shopList.shop_name}</strong>

                        <div className="item-use">
                            {_coupon_desc}
                            {_coin_ratio}
                        </div>
                        <ul className="item-icons fix">
                            {_min_save}
                            {_use_coupon}
                            {_exchange_coin}
                            {_remain}
                        </ul>
                        <div className={"bookmark"+_bookmark_class}>
                            <a href="javascript:void(0)"><i className="fa fa-heart-o"></i><span
                                className="num">{shopList.bookmark_idx}</span></a>
                        </div>
                        <div className="distance fix">
                            <div className="meter">{shopList.dis}m</div>
                            {_floor}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

/*********************************************************************************
 * shopstatelist state class
 * html template
 *********************************************************************************/
var ShopStateListEmpty = React.createClass({
    render : function () {
        var _contentsEmpty = null;

        _contentsEmpty = <ShopStateListEmpty />;

        return (
            <div className="no-data">
                <div className="no-data-ment">
                    <strong>죄송합니다!</strong>
                    <p>현재 주변에 이용가능한 매장이없습니다. <br />
                        더욱 더 열심히 하는 타임월렛이 되겠습니다.</p>
                </div>
            </div>
        )
    }
});
