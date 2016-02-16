/*********************************************************************************
 * shopdetail class
 * html template
 *********************************************************************************/
var ShopDetail = React.createClass({
    newList:[],
    getInitialState: function() {
        return {shop_detail:['']};
    },
    componentDidMount:function() {

        var _this=this,
            _data= {
                latitude:'',
                longitude:'',
                u_idx:(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                shop_idx:_shopInfo.shop_idx
            };

        twCommonUi.getApiData(
            {
                'url':loc[6].api[0],
                'type':loc[6].type,
                'method':'post',
                'data':_data
            },
            'html',
            React.addons,function(listType,resp,reactAddons) {
                var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);

                _this.setState({shop_detail:_newList});
            }
        );

    },
    render : function () {

        var _contents = null,
            _contentsTop = null,
            _contentsCoupon = null,
            _contentsInfo = null,
            _contentsReview = null,
            _contentsOther = null,
            _contentsPremium = null,
            _createItem=function(shopDetail) {

                var _min_save=null,
                    _use_coupon=null,
                    _exchange_coin=null,
                    _bookmark=null,
                    _remain=null,
                    _background=null;

                if(shopDetail.shop_info[0].shop_min_save_yn=='Y') {
                    _min_save='';
                } else {
                    _min_save=' no';
                }

                if(shopDetail.shop_coupon.length>0) {
                    _use_coupon='';
                } else {
                    _use_coupon=' no';
                }

                if(shopDetail.shop_info[0].shop_coin_use_yn=='Y') {
                    _exchange_coin='';
                } else {
                    _exchange_coin=' no';
                }

                if(shopDetail.shop_info[0].bookmark_idx>0) {
                    _bookmark=' active';
                } else {
                    _bookmark='';
                }

                if(shopDetail.user_min[0].cafe_idx>0) {
                    _background={
                        'background-image':'url('+shopDetail.shop_info[0].cafe_logo+')',
                        'background-position':'0 0',
                        'background-size':'20px 20px'
                    };

                    _remain=<li className="remain"><span style={_background}>코인교환</span></li>;
                } else {
                    _remain=null;
                }

                return (
                    <div className="shop-imgbox item-list" data-shop-idx={shopDetail.Shop_Image[0].shop_idx}>
                        <div className="big-img">
                            <img src={shopDetail.Shop_Image[0].shop_image_url} alt="" />
                        </div>

                        <div className="detail-logo">
                            <div className="logo"><img src={shopDetail.shop_info[0].shop_logo_image} alt="" /></div>
                            <div className="logo-bar"><img src="/front-src/release/images/shop_detail_bar.svg" alt="" width="100%" /></div>
                        </div>

                        <ul className="item-icons fix">
                            <li className={"min-save"+_min_save}><span>min 적립</span></li>
                            <li className={"coupon"+_use_coupon}><span>쿠폰사용</span></li>
                            <li className={"coin"+_exchange_coin}><span>코인교환</span></li>
                            {_remain}
                        </ul>

                        <div className={"bookmark"+_bookmark}><a href="javascript:void(0)"><i className="fa fa-heart-o"></i></a></div>
                        <div className="shop-gallery" data-lat={_shopInfo.lat} data-lng={_shopInfo.lng}><a href="javascript:void(0);"><strong><em></em><span></span></strong></a></div>
                    </div>
                );
            },
            _createPremium=function(premium,shopDetail) {
                var _type=1,
                    _count=1,
                    _active=null,
                    _button_active='',
                    _premium=null,
                    _coin_rate=null,
                    _coin_ex_time=0,
                    _state=null,
                    _min_term=(premium.ExchangeableMinTerm==0) ? '0' : premium.ExchangeableMinTerm;

                _state=function() {
                            return(
                                <div className="coin-day-state">
                                    <strong className="max-coin">{premium.ExchangeableCoin}</strong>
                                    <span className="unit">coin</span>
                                </div>
                            );
                        };

                _coin_rate=shopDetail.shop_coin_rate*10;

                if(premium.ExchangeStatus==1) {
                    _count=1;
                    _active = '';
                    _premium = <span className="coin-premium">프리미엄 코인 매장</span>;
                } else if(premium.ExchangeStatus==2) {
                    _count=2;
                    _active=' active';
                    _premium=<span className="coin-premium">프리미엄 코인 매장</span>;

                    _state=function() {
                        return(
                            <div className="coin-day-state">
                                <strong className="d-day">{premium.ExchangeableMinTerm}</strong>
                                <span className="day">coin</span>
                            </div>
                        );
                    };

                } else if(premium.ExchangeStatus==3) {
                    _count=3;
                    _active=' disable';
                    _premium=<span className="coin-premium">프리미엄 코인 매장</span>;

                    _state=function() {
                        return(
                            <div className="coin-day-state">
                                <strong className="d-day">{premium.ExchangeableMinTerm}</strong>
                                <span className="day">coin</span>
                            </div>
                        );
                    };

                } else if(premium.ExchangeStatus==4) {
                    _count=4;
                    _type=2;
                    _active=' disable';
                    _premium=<span className="coin-premium">프리미엄 코인 매장</span>;

                    _state=function() {
                        return(
                            <div className="coin-day-state">
                                <strong className="d-day">{premium.ExchangeableMinTerm}</strong>
                                <span className="day">coin</span>
                            </div>
                        );
                    };

                } else if(premium.ExchangeStatus==5) {
                    _count=5;
                    _active='';
                    _button_active=' disable';
                    _premium=<span className="coin-premium">프리미엄 코인 매장</span>;
                } else if(premium.ExchangeStatus==6) {
                    _count=6;
                    _active=' disable';
                    _button_active=' disable';
                    _premium=<span className="coin-premium">프리미엄 코인 매장</span>;

                    _state=function() {
                        return(
                            <div className="coin-day-state">
                                <strong className="d-day">{premium.ExchangeableMinTerm}</strong>
                                <span className="day">coin</span>
                            </div>
                        );
                    };

                } else if(premium.ExchangeStatus==7) {
                    _count=7;
                    _active=' active';
                    _button_active=' disable';
                    _premium=<span className="coin-premium">프리미엄 코인 매장</span>;

                    _state=function() {
                        return(
                            <div className="coin-day-state">
                                <strong className="d-day">{premium.ExchangeableMinTerm}</strong>
                                <span className="day">coin</span>
                            </div>
                        );
                    };

                }

                return (
                    <div className={"premium-shop-state type"+_type}>
                        <div className="premium-top">
                            {_premium}
                            <p>본 매장은 <span>10min</span> 마다 <span>{_coin_rate}coin</span> 적립이 가능합니다!</p>
                            <a className="coin-state-guide" href="javascript:void(0);">코인 관련 안내 모달 오픈</a>
                        </div>
                        <div className="coin-state">
                            <div className="coin-state-inner">
                                <div className={"exchangeStatus"+_count}>
                                    <div className={"min-exchange"+_active}>
                                        <div className="min-state">
                                            <strong>{premium.ExchangeableMin}</strong>
                                            <span>min</span>
                                        </div>
                                        <a className="btn-exchange-able" href="#/coin-exchange">코인 교환 가능</a>
                                        <a className="btn-exchange-disable">코인 교환 불가능</a>
                                    </div>
                                    <div className="coin-day">
                                        {_state()}
                                    </div>
                                    <div className={"coin-button"+_button_active}>
                                        <a className="btn-coin-useful" href="#/coin-use">코인사용 가능</a>
                                        <a className="btn-coin-useless">코인사용 불가능</a>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                );
            };

        if(this.state.shop_detail[0]!='') {
            _contentsTop=_createItem(this.state.shop_detail.list[0]);

            if(this.state.shop_detail.list[0].user_min[0].ExchangeStatus<8) {
                _contentsPremium=_createPremium(this.state.shop_detail.list[0].user_min[0],this.state.shop_detail.list[0].shop_info[0]);
            }

            _contentsCoupon = <ShopDetailCoupon {...this.state.shop_detail.list[0].shop_coupon[0]} />;
            _contentsInfo = <ShopDetailInfo {...this.state.shop_detail.list[0].shop_info[0]} />;
            var shop={
                image:this.state.shop_detail.list[0].Shop_Image,
                info:this.state.shop_detail.list[0].shop_info[0],
                category:this.state.shop_detail.list[0].shop_category
            };
            _contentsReview = <ShopDetailReview {...shop} />;
            _contentsOther = <OtherShop category={shop.category} />;
         }

        return (
            <div className={"page "+loc[6].pageName+" "+this.props.position}>
                <div className="contentsScroll">
                    {_contentsTop}

                    <div className="shop-tab">
                        <div className="shop-tab-inner fix">
                            <a className="tab-coupon active" href="javascript:void(0);">쿠폰</a>
                            <a className="tab-shop" href="javascript:void(0);">매장정보</a>
                            <a className="tab-review" href="javascript:void(0);">리뷰</a>
                        </div>
                    </div>

                    {_contentsPremium}
                    {_contentsCoupon}
                    {_contentsInfo}
                    {_contentsReview}
                    {_contentsOther}
                </div>
                <div className="beaconState"></div>
            </div>
        )
    }
});

/*********************************************************************************
 * shopdetailcoupon state class
 * html template
 *********************************************************************************/
var ShopDetailCoupon = React.createClass({
    render : function () {
        var _contents = null;

        _contents = <ShopDetailCouponList {...this.props} />;

        return (
            <div className="coupon-info tab-contents">
                <h2 className="tab-title">쿠폰</h2>

                <ul className="couponbox">
                    {_contents}
                </ul>
            </div>
        )
    }
});

/*********************************************************************************
 * shopdetailcouponlist class
 * html template
 *********************************************************************************/
var ShopDetailCouponList = React.createClass({
    getInitialState: function() {
        return {list:['']};
    },
    render : function () {

        var _coupon_kind = {cls:'',txt:''},
            _coupon_list=null,
            _createItem=function(item,idx) {
                if(item.coupon_type==1) { //할인
                    _coupon_kind.cls = ' discount';
                    _coupon_kind.txt = 'cupon 할인';
                } else if(item.coupon_type==2) { //증정
                    _coupon_kind.cls = ' freebies';
                    _coupon_kind.txt = 'cupon 사은품';
                } else if(item.coupon_type==3) { //1+1
                    _coupon_kind.cls = ' plus';
                    _coupon_kind.txt = 'cupon 플러스';
                } else { //무료
                    _coupon_kind.cls = ' free';
                    _coupon_kind.txt = 'cupon 무료';
                }

                return (
                    <div className="coupon-wrap fix">
                        <div className={"coupon-kind"+_coupon_kind.cls}>{_coupon_kind.txt}</div>
                        <div className="coupon-balloons">
                            <span className="coupon-shop-name">{item.coupon_master_name}</span>
                            <p className="coupon-detail">{item.coupon_master_description}</p>
                            <span className="coupon-until">{item.coupon_enddate}까지</span>
                        </div>
                        <div className="coupon-min">
                            <div className="minbox">
                                <span className="min">{item.coupon_min_point}</span>
                                <span className="unit">min</span>
                            </div>
                        </div>
                    </div>
                );
            };

        if (this.props.length > 0) {
            _coupon_list = _createItem(this.props);
        } else {
            _coupon_list = <ShopDetailCouponEmpty />;
        }

        return (
            <li>
                {_coupon_list}
            </li>
        )
    }
});

/*********************************************************************************
 * shopdetailcouponempty state class
 * html template
 *********************************************************************************/
var ShopDetailCouponEmpty = React.createClass({
    render : function () {
        return (
            <div className="no-data">
                <p>현재 교환가능한 쿠폰이 없습니다.</p>
            </div>
        )
    }
});

/*********************************************************************************
 * shopinfo class
 * html template
 *********************************************************************************/
var ShopDetailInfo = React.createClass({
    componentDidMount:function() {
        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();
        var _shop_detail_info=[this.props];

        jQuery('.shop-info .btn-shop-map').on('tap',function() {

            jQuery('.modal.modal-map .map').css({
                'width':'100%',
                'height':jQuery(window).height() - jQuery('.modal.modal-map .content-header').height()
            });

            _shop_detail_info[0]['shop_latitude']=_shopInfo.lat;
            _shop_detail_info[0]['shop_longitude']=_shopInfo.lng;

            twCommonUi.showModal(jQuery('.modal.modal-map'));

            twCommonUi.initialGoogleMap(
                {
                    lat: _shopInfo.lat,
                    lng: _shopInfo.lng
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

            twCommonUi.initMarker(_shop_detail_info, 'static');

        });

    },
    render : function () {

        return (
            <div className="shop-info tab-contents">
                <h2 className="tab-title">매장정보</h2>
                <div className="tb-shop-info">
                    <table>
                        <caption>매장정보</caption>
                        <tbody>
                            <tr>
                                <th scope="row">주소</th>
                                <td>{this.props.shop_address_detail}</td>
                            </tr>
                            <tr>
                                <th scope="row">전화번호</th>
                                <td>{this.props.shop_phone}</td>
                            </tr>
                            <tr>
                                <th scope="row">영업시간</th>
                                <td>{this.props.shop_open_time}</td>
                            </tr>
                            <tr>
                                <th scope="row">휴무일</th>
                                <td>{this.props.shop_holiday}</td>
                            </tr>
                            <tr>
                                <th scope="row">홈페이지</th>
                                <td><a href={this.props.shop_url} target="_blank">{this.props.shop_url}</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <a className="btn-shop-map" href="javascript:void(0);">지도로 가기</a>
                    <a className="btn-phone" href={"tel:"+this.props.shop_phone}>전화하기</a>
                </div>
                <div className="intro">
                    {this.props.shop_description}
                </div>
            </div>
        )
    }
});

/*********************************************************************************
 * shopdetailreview class
 * html template
 *********************************************************************************/
var ShopDetailReview = React.createClass({
    newList:{},
    getInitialState:function() {
        return {Avg:0,tcnt:0,ResultData:[],paging:0,totalpage:0};
    },
    componentDidMount:function() {
        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();
        jQuery('.contentsScroll').height(jQuery(window).height()-jQuery('.header').height());

        var _this=this,
            _data={
                shop_idx:this.props.image[0].shop_idx,
                page:1
            };

        jQuery(document.body).on('tap','.modal.modal-review .btn-type1',function(e) {
            e.stopImmediatePropagation();

            var _file=null,
                _str=jQuery('.modal.modal-review textarea').val(),
                _avg=0,
                _rate=parseInt(jQuery('.modal.modal-review .rate').css('width')),
                _data= {
                    latitude:'',
                    longitude:'',
                    u_idx:(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                    shop_idx:_shopInfo.shop_idx
                };

            if(_rate<=30) {
                _avg=1;
            } else if(_rate<=59) {
                _avg=2;
            } else if(_rate<=88) {
                _avg=3;
            } else if(_rate<=117) {
                _avg=4;
            } else {
                _avg=5
            }

            if(_rate==0) {
                BRIDGE.appAlert({title:"",msg:"별 평점은 1개 이상 선택해주셔야 합니다."});
                return false;
            }

            if(_str.length<3) {
                //BRIDGE.appAlert({title:"",msg:"3글자 이상 입력해 주셔야 합니다."});
                alert("3글자 이상 입력해 주셔야 합니다.");
                jQuery('.modal.modal-review textarea').val('').focus();
                return false;
            }

            var blank_pattern = /^\s+|\s+$/g;
            if(_str.replace( blank_pattern, '' ) == "" ){
                //BRIDGE.appAlert({title:"",msg:"공백만 입력되었습니다."});
                alert("공백만 입력되었습니다.");
                jQuery('.modal.modal-review textarea').val('').focus();
                return false;
            }

            var special_pattern = /[~!@\#$%<>&*\()\-=+_\’]/gi;
            if( special_pattern.test(_str) == true ){
                //BRIDGE.appAlert({title:"",msg:"특수문자는 사용할 수 없습니다."});
                alert("특수문자는 사용할 수 없습니다.");
                jQuery('.modal.modal-review textarea').focus();
                return false;
            }

            //사진 이미지 선택시
            if(jQuery('.result-img').attr('src').length>0) {
                twCommonUi.setFile('.camera',100,function(file,file_path) {
                    var form=null,
                        formData=null;

                    formData=new FormData();

                    formData.append('u_idx', (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1);
                    formData.append('shop_idx', _this.props.image[0].shop_idx);
                    formData.append('grade', _avg);
                    formData.append('review_contents', jQuery('.modal.modal-review textarea').val());
                    formData.append('review_image', jQuery('.camera')[0].files[0]);

                    reqwest({
                        url: loc[6].api[3], //매장 리뷰 등록
                        method: 'post',
                        processData: false,
                        enctype:"multipart/form-data",
                        type: loc[6].type,
                        data: formData
                    })
                    .then(function (resp) {
                        /*************************
                         resp.ResultCode
                         '1'=success
                         '-1'=fail
                         *************************/
                        if (resp[0].ResultCode == '1') { //리뷰작성성공
                            twCommonUi.getApiData(
                                {
                                    'url':loc[6].api[1],
                                    'type':loc[6].type,
                                    'method':'post',
                                    'data':_data
                                },
                                'html',
                                React.addons,function(listType,resp,reactAddons) {
                                    var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);
                                    _this.setState(_newList.list[0]);

                                    $('.paging').off( "page" ).removeData( "twbs-pagination" ).empty()
                                        .data( "currentTotalPages", 0 ).twbsPagination({
                                        totalPages: _newList.list[0].totalpage,
                                        visiblePages: 5,
                                        onPageClick: function (event, page) {
                                            jQuery('.btn-prev.disabled, .btn-next.disabled').hide();
                                            _data.page=page;
                                            twCommonUi.getApiData(
                                                {
                                                    'url':loc[6].api[1],
                                                    'type':loc[6].type,
                                                    'method':'post',
                                                    'data':_data
                                                },
                                                'html',
                                                React.addons,function(listType,resp,reactAddons) {
                                                    var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);
                                                    _this.setState(_newList.list[0]);
                                                    jQuery('.contentsScroll').scrollTop(jQuery('.contentsScroll').height());
                                                }
                                            );

                                        }
                                    });
                                    twCommonUi.hideModal(jQuery('.modal.modal-review'));
                                    jQuery('.modal-review textarea').val('');
                                    jQuery('.btn-remove').hide();
                                    jQuery('.source-img').remove();
                                    jQuery('.result-img').attr('src', '');
                                    jQuery('.result-img').hide();

                                }
                            );
                        } else {
                        }
                    })
                    .fail(function (err, msg) {
                        console.log(err);
                        jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
                    });
                });

            } else {
                reqwest({
                    url: loc[6].api[3], //매장 리뷰 등록
                    method: 'post',
                    type: loc[6].type,
                    data: {
                        'u_idx': (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                        'shop_idx': _this.props.image[0].shop_idx,
                        'grade':_avg,
                        'review_contents':jQuery('.modal.modal-review textarea').val(),
                        'review_image':null
                    }
                })
                .then(function (resp) {
                    /*************************
                     resp.ResultCode
                     '1'=success
                     '-1'=fail
                     *************************/
                    if (resp[0].ResultCode == '1') { //리뷰작성성공
                        //closeModal();
                        twCommonUi.getApiData(
                            {
                                'url':loc[6].api[1],
                                'type':loc[6].type,
                                'method':'post',
                                'data':_data
                            },
                            'html',
                            React.addons,function(listType,resp,reactAddons) {
                                var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);
                                _this.setState(_newList.list[0]);

                                $('.paging').off( "page" ).removeData( "twbs-pagination" ).empty()
                                    .data( "currentTotalPages", 0 ).twbsPagination({
                                    totalPages: _newList.list[0].totalpage,
                                    visiblePages: 5,
                                    onPageClick: function (event, page) {
                                        jQuery('.btn-prev.disabled, .btn-next.disabled').hide();
                                        _data.page=page;
                                        twCommonUi.getApiData(
                                            {
                                                'url':loc[6].api[1],
                                                'type':loc[6].type,
                                                'method':'post',
                                                'data':_data
                                            },
                                            'html',
                                            React.addons,function(listType,resp,reactAddons) {
                                                var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);
                                                _this.setState(_newList.list[0]);
                                                jQuery('.contentsScroll').scrollTop(jQuery('.contentsScroll').height());
                                            }
                                        );

                                    }
                                });
                                twCommonUi.hideModal(jQuery('.modal.modal-review'));
                                jQuery('.modal-review textarea').val('');
                                jQuery('.btn-remove').hide();
                                jQuery('.source-img').remove();
                                jQuery('.result-img').attr('src', '');
                                jQuery('.result-img').hide();

                            }
                        );
                    } else {
                        twCommonUi.showModal(jQuery('.modal.modal-review-notice'));

                    }
                })
                .fail(function (err, msg) {
                    console.log(err);
                    jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
                });

            }

        });

        twCommonUi.getApiData(
            {
                'url':loc[6].api[1],
                'type':loc[6].type,
                'method':'post',
                'data':_data
            },
            'html',
            React.addons,function(listType,resp,reactAddons) {
                var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);
                _this.setState(_newList.list[0]);

                //코멘트삭제
                jQuery('.review-list .btn-del').on('tap',function() {
                    reqwest({
                        url: loc[6].api[4], //매장 리뷰 삭제
                        method: 'post',
                        type: loc[6].type,
                        data: {
                            'u_idx': (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                            'shop_idx': _this.props.image[0].shop_idx,
                            'review_idx': jQuery(this).closest('.comment').attr('data-review-idx')
                        }
                    })
                    .then(function (resp) {
                        /*************************
                         resp.ResultCode
                         '1'=success
                         '-1'=fail
                         *************************/
                        if (resp[0].ResultCode == '1') { //( 쿠폰 교환 또는 10민 이상 적립시 리뷰 작성 가능 )
                            twCommonUi.getApiData(
                                {
                                    'url':loc[6].api[1],
                                    'type':loc[6].type,
                                    'method':'post',
                                    'data':_data
                                },
                                'html',
                                React.addons,function(listType,resp,reactAddons) {
                                    var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);
                                    _this.setState(_newList.list[0]);

                                    $('.paging').off( "page" ).removeData( "twbs-pagination" ).empty()
                                        .data( "currentTotalPages", 0 ).twbsPagination({
                                        totalPages: _newList.list[0].totalpage,
                                        visiblePages: 5,
                                        onPageClick: function (event, page) {
                                            jQuery('.btn-prev.disabled, .btn-next.disabled').hide();
                                            _data.page=page;
                                            twCommonUi.getApiData(
                                                {
                                                    'url':loc[6].api[1],
                                                    'type':loc[6].type,
                                                    'method':'post',
                                                    'data':_data
                                                },
                                                'html',
                                                React.addons,function(listType,resp,reactAddons) {
                                                    var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);
                                                    _this.setState(_newList.list[0]);
                                                    jQuery('.contentsScroll').scrollTop(jQuery('.contentsScroll').height());
                                                }
                                            );

                                        }
                                    }).show();

                                }
                            );
                        } else {
                        }
                    })
                    .fail(function (err, msg) {
                        console.log(err);
                        jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
                    });

                });

                jQuery('.paging').twbsPagination({
                    totalPages: _newList.list[0].totalpage,
                    visiblePages: 5,
                    onPageClick: function (event, page) {
                        jQuery('.btn-prev.disabled, .btn-next.disabled').hide();
                        _data.page=page;
                         twCommonUi.getApiData(
                             {
                                 'url':loc[6].api[1],
                                 'type':loc[6].type,
                                 'method':'post',
                                 'data':_data
                             },
                             'html',
                             React.addons,function(listType,resp,reactAddons) {
                                 var _newList = twCommonUi.getApiList(_this, listType, resp, reactAddons);
                                 _this.setState(_newList.list[0]);
                                 jQuery('.contentsScroll').scrollTop(jQuery('.contentsScroll').height());
                             }
                         );

                    }
                });


                //리뷰 작성하기 클릭
                jQuery('.review-total .btn-review').on('tap',function(){

                    reqwest({
                        url: loc[6].api[2], //리뷰 작성 가능 여부
                        method: 'post',
                        type: loc[6].type,
                        data: {
                            'u_idx': (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
                            'shop_idx': _this.props.image[0].shop_idx
                        }
                    })
                    .then(function (resp) {
                        /*************************
                         resp.ResultCode
                         '1'=success
                         '-1'=fail
                         *************************/
                        if (resp[0].ResultCode == '1') { //( 쿠폰 교환 또는 10민 이상 적립시 리뷰 작성 가능 )
                            twCommonUi.showModal(jQuery('.modal.modal-review'));
                        } else {
                            twCommonUi.showModal(jQuery('.modal.modal-review-notice'));
                        }
                    })
                    .fail(function (err, msg) {
                        console.log(err);
                        jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
                    });
                });
            }
        );

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
                    React.render(React.createElement(ModalAll, {shop_image:_this.props.image, info:_this.props.info}), document.getElementsByClassName('modal-wrap')[0]);
                },300)
            }
        );


    },
    render : function () {
        var _width_rate={
                width:'0%'
            },
            _list=null,
            _u_idx=(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1,
            _avg=0,
            _totalpage=0,
            _tcnt=0,
            _contents=null;
            _list=this.state,
            _review_count=null,
            _contents_comment=null,
            _contents_reply=null,
            _contents_paging=null,
            _createComment=function(item,idx) {
                var _avg=item.grade,
                    _reg_date=null,
                    _myList=null,
                    _alarm=null,
                    _review_idx=null,
                    _width_rate={
                        'width':'100%'
                    },
                    _background_comment={
                        'background-image':'url('+item.review_image+')'
                    };

                //자기글인지 아닌지 판별
                if(item.u_idx==_u_idx) {
                    _myList = <a href="javascript:void(0);" className="btn-del">삭제</a>;
                } else {
                    _alarm=<span><a href="javascript:void(0);" className="btn-report">신고하기</a></span>;
                }

                _review_idx=item.review_idx;
                _reg_date=item.review_date.substring(0,10);

                if(_avg==0) {
                    _width_rate.width='0%';
                } else if(_avg==0.5) {
                    _width_rate.width='10%';
                } else if(_avg==1) {
                    _width_rate.width='20%';
                } else if(_avg==1.5) {
                    _width_rate.width='30%';
                } else if(_avg==2) {
                    _width_rate.width='40%';
                } else if(_avg==2.5) {
                    _width_rate.width='50%';
                } else if(_avg==3) {
                    _width_rate.width='60%';
                } else if(_avg==3.5) {
                    _width_rate.width='70%';
                } else if(_avg==4) {
                    _width_rate.width='80%';
                } else if(_avg==4.5) {
                    _width_rate.width='90%';
                } else if(_avg==5) {
                    _width_rate.width='100%';
                }

                if(item.review_contents) {
                    return (
                        <div className="comment fix" data-review-idx={_review_idx}>
                            <div className="thumbbox">
                                <span className="thumb" style={_background_comment}></span>
                            </div>
                            <div className="desc-wrap">
                                <div className="star-score">
                                    <span className="star"><strong className="rate" style={_width_rate}></strong></span>
                                </div>
                                <div className="desc">
                                    {item.review_contents}
                                </div>
                                <div className="writer-info fix">
                                    <span>{_reg_date}</span>
                                    <span>{item.usr}</span>
                                    {_alarm}
                                </div>
                                <div className="alter-del">
                                    {_myList}
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return;
                }
            },
            _createReply=function(item,idx) {
                //admin 답변 데이터가 존재할 시
                if(item.admin_review_contents) {
                    var _reg_date=null,
                        _background_thumbbox={
                            'background-image':'url('+_this.props.shop.shop_logo_image+')'
                        };

                    _reg_date=item.admin_review_date.substring(0,10);

                    if(item.admin_review_contents) {
                        return (
                            <div className="reply fix">
                                <div className="thumbbox">
                                    <i className="fa fa-level-up fa-3"></i>
                                    <span className="thumb" style={_background_thumbbox}></span>
                                </div>
                                <div className="desc-wrap">
                                    <div className="desc">
                                        {item.admin_review_contents}
                                    </div>
                                    <div className="writer-info fix">
                                        <span>{_reg_date}</span>
                                    </div>
                                </div>
                            </div>

                        )
                    } else {
                        return;
                    }
                }
            };

            if(_list) {
                _avg = _list.Avg;
                _totalpage = _list.totalpage;
                _tcnt = _list.tcnt;

                if (_avg == 0) {
                    _width_rate.width = '0%';
                } else if (_avg == 0.5) {
                    _width_rate.width = '10%';
                } else if (_avg == 1) {
                    _width_rate.width = '20%';
                } else if (_avg == 1.5) {
                    _width_rate.width = '30%';
                } else if (_avg == 2) {
                    _width_rate.width = '40%';
                } else if (_avg == 2.5) {
                    _width_rate.width = '50%';
                } else if (_avg == 3) {
                    _width_rate.width = '60%';
                } else if (_avg == 3.5) {
                    _width_rate.width = '70%';
                } else if (_avg == 4) {
                    _width_rate.width = '80%';
                } else if (_avg == 4.5) {
                    _width_rate.width = '90%';
                } else if (_avg == 5) {
                    _width_rate.width = '100%';
                }

                if(_list.ResultData.length>0) {
                    _review_count=<span>{_tcnt}</span>+'개의 리뷰가 등록되어 있습니다.';
                    _contents_comment=_list.ResultData.map(_createComment);
                    _contents_reply = _list.ResultData.map(_createReply);
                } else {
                    _review_count=<p className="no-review">등록된 리뷰가 없습니다.</p>;
                }
            }

        return (
            <div className="review-info tab-contents">
                <h2 className="tab-title">리뷰</h2>

                <div className="review-total">
                    <div className="star-score">
						<span className="star">
							<strong className="rate" style={_width_rate}></strong><span className="score-number"><em>{_avg}</em><span> / 5</span></span>
						</span>
                    </div>
                    <div className="score-info">
                        {_review_count}
                    </div>
                    <a className="btn-review" href="javascript:void(0);">리뷰작성하기</a>
                </div>

                <div>
                    <div className="review">
                        <div className="review-list">
                            {_contents_comment}
                            {_contents_reply}
                        </div>
                    </div>


                    <div className="paging">

                    </div>
                </div>
            </div>
        )
    }
});

/*********************************************************************************
 * shoplist class
 * html template
 * mix and render
 *********************************************************************************/

/**********************************
 * 매장간단정보
 ********************************/
var OtherShop = React.createClass({
    getInitialState: function() {
        return {list:['']};
    },
    componentDidMount:function() {
        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();

        this.setState({list:this.props.category});

        //TODO : 매장 상세 갤러리 모달 보기
        setTimeout(function() {
            jQuery('.slider-other-shop').slick({
                slidesToShow:3
            });

            jQuery('.shop-imgbox .item-icons').off('tap').on('tap',function(e) {
                e.stopPropagation();
                twCommonUi.showModal(jQuery('.modal.modal-icon-explain'));
            });

            jQuery('.premium-top .coin-state-guide').on('tap',function(e) {
                e.stopPropagation();
                twCommonUi.showModal(jQuery('.modal.modal-state-explain'));
            });

            //이미지 앨범 보기
            jQuery('.shop-gallery a').off('tap').on('tap',function(e) {
                e.stopPropagation();

                //매장 상세 갤러리 모달 보기
                var slideLength = 1,
                    $thumb = jQuery('.slider-shop-gallery-nav .thumb');
                var windowWidth = jQuery(window).width();
                var thumbWidth = $thumb.width()+4;
                var slideNumber = windowWidth /thumbWidth;
                var paging = Math.ceil($thumb.size()/slideNumber);

                if(slideNumber.toString().split('.')[1]<5) {
                    slideNumber=Math.ceil(slideNumber);
                } else {
                    slideNumber=parseInt(slideNumber);
                }

                var $imageSlider = $('.slider-shop-gallery');
                var $thumbSlider = $('.slider-shop-gallery-nav');
                $imageSlider.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: false,
                    infinite: false
                });

                $thumbSlider.slick({
                    slidesToShow: slideNumber,
                    slidesToScroll: slideNumber,
                    dots: false,
                    arrows: false,
                    centerMode: false,
                    variableWidth: true,
                    infinite: false
                });

                $imageSlider[0].slick.slickGoTo(0);

                $(".gallery-thumb .thumb").eq(0).addClass('slick-focus');
                $imageSlider.on( 'afterChange', function( event, slick, currentSlide )
                {
                    $thumbSlider.slick( 'slickGoTo', currentSlide );
                    //console.log( 'currentSlide : ', currentSlide );
                    $(".gallery-thumb .thumb").removeClass('slick-focus').eq(currentSlide).addClass('slick-focus');
                });

                $thumbSlider.find('.thumb').on( 'tap', function( e )
                {
                    $imageSlider[0].slick.slickGoTo(jQuery(e.currentTarget).index());
                });

                var slideHeight = jQuery(window).height() - 118;
                var slideWidth = jQuery(window).width();
                //console.log(slideWidth);
                //이미지 세로 가운데 맞추기
                jQuery('.modal-gallery .shop-gallery .thumb').css({
                    'height':slideHeight,
                    'line-height':slideHeight+'px'
                });
                jQuery('.modal-gallery .modal-inner .gallery-thumb').css({
                    'width':slideWidth
                });

                twCommonUi.showModal(jQuery('.modal.modal-gallery'));

            });

        },300);

    },
    render: function () {
        var _thumbs=null,
             _createItem=function(item) {
                var _dist=item.dis,
                    _name=item.shop_name,
                     _background={
                        'background-image':'url('+item.shop_logo_image+')'
                    };

                return (
                    <div className="thumb">
                        <a href="javascript:void(0);">
                            <span className="other-shop-logo" style={_background}></span>
                            <span className="txt"><em>{_dist}m</em><strong>{_name}</strong></span>
                        </a>
                    </div>
                );
             }

        if(this.state.list[0]!='') {
            _thumbs=this.state.list.map(_createItem);
        }
        return (
            <div className="other-shop">
                <div className="slider slider-other-shop">
                    {_thumbs}
                </div>
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
 * 리뷰관련 모달
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
            <div>
                <ModalReviewNotice {...props} />
                <ModalReview dataStyle={props} shop_idx={this.props.shop_image[0].shop_idx} />
                <ModalGallery dataStyle={props} shop={this.props.shop_image} info={this.props.info} />
                <ModalMap dataStyle={props} shop={this.props.shop_image} info={this.props.info} />
                <ModalStateExplain {...props} />
                <ModalIconExplain {...props} />
            </div>
        )
    }
});

/*********************************************************************************
 * modalreviewnotice class
 * html template
 *********************************************************************************/
var ModalReviewNotice = React.createClass({
    componentDidMount:function() {
        jQuery('.modal.modal-review-notice .btn-type1').on('tap',function(e) {
            e.stopPropagation();
            twCommonUi.hideModal(jQuery('.modal.modal-review-notice'));
        });
    },
    render : function () {
        return (
            <section className="modal modal-small modal-review-notice" style={this.props}>
                <div className="modal-inner">
                    <div className="modal-header icon-type1"></div>

                    <div className="modal-content">
                        <div className="message">
                            <p className="text-type1">리뷰 작성 대상이 아닙니다.</p>
                            <p className="text-type5">해당 매장 쿠폰사용 및 10min이상 적립 고객만 가능</p>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <a className="btn-type1" href="javascript:void(0);">확인</a>
                    </div>
                </div>
            </section>
        )
    }
});

/*********************************************************************************
 * modalreview class
 * html template
 *********************************************************************************/
var ModalReview = React.createClass({
    componentDidMount:function() {
        var _this=this;

        function closeModal() {
            jQuery('.btn-remove').hide();
            jQuery('.source-img').remove();
            jQuery('.result-img').attr('src', '').hide();
            twCommonUi.hideModal(jQuery('.modal.modal-review'));
            jQuery('.modal.modal-review textarea').val('');
        };

        //사진 찍기
        if (!('url' in window) && ('webkitURL' in window)) {
            window.URL = window.webkitURL;
        }

        jQuery('.modal-review .btn-shoot').on('tap',function() {
            var isKitkat = window.navigator.userAgent.search( "MobileApp Android 4.4") > -1 ? true : false;

            if ( isKitkat ) {
                window.Android.open("input_upload_sample", "thumbnail1");
            } else {
                jQuery('.camera').trigger('click');
                jQuery('.camera').change(function(e){
                    if(e.target.files[0]) {
                        jQuery('.result-img').attr('src', URL.createObjectURL(e.target.files[0])).show();
                        jQuery('.pic').addClass('active');
                        jQuery('.btn-remove').show();

                        jQuery('.pic .btn-remove').on('tap', function (e) {
                            e.preventDefault();
                            jQuery('.btn-remove').hide();
                            jQuery(this).closest('.pic').removeClass('active')
                                .find('.upload-pic .result-img').attr('src', '').hide();
                            jQuery('.source-img').remove();
                            jQuery('.result-img').attr('src', '');
                            jQuery('.result-img').hide();
                        });
                    }
                });
            }
        });

        jQuery('.modal.modal-review .btn-type2').on('tap',function(e) {
            e.stopPropagation();
            closeModal();
        });


        //TODO : 리뷰 글자 수 체크 최대 140글자 제한
        //jQuery('.modal.modal-review .textarea').append('<span className="txt" style="display:none;"></span>');
        jQuery('.modal.modal-review textarea').checkbyte({
            indicator:jQuery('.modal.modal-review div.txt'),
            limit:280,
            twice:false
        });

    },
    render : function () {
        var _width0={
                'width':'100%'
            },
            _hide={
                'display':'none'
            };

        return (
            <section className="modal modal-review" style={this.props.dataStyle}>
                <div className="modal-inner">

                    <div className="modal-content">
                        <p className="text-type1">리뷰작성</p>

                        <div className="star-score">
                            <span className="star">
                                <strong className="rate" style={_width0}></strong>
                            </span>
                        </div>
                        <div className="textarea">
                            <textarea placeholder="다른 분들을 위해 가게의 리뷰를 남겨주세요.(최대 140자)"></textarea>
                            <div className="txt" style={_hide}></div>
                        </div>

                        <p className="text-type5 left">*사진은 1장만 등록할 수 있습니다.</p>
                        <div className="select-pic">
                            <div className="pic">
                                <a href="javascript:void(0);" className="btn-shoot"><i className="fa fa-camera"></i><span>촬영</span></a>
                                <a href="javascript:void(0);" className="btn-upload"><i className="fa fa-picture-o"></i><span>앨범</span></a>

                                <span className="upload-pic">
                                    <img src="" id="resultImg" className="result-img" width="72" height="72" alt="" style={_hide} />
                                    <img src="" id="targetImg" width="72" height="72" alt="" style={_hide} />
                                </span>

                                <a href="javascript:void(0);" className="btn-remove"><i className="fa fa-times"></i><span>이미지 삭제</span></a>

                                <input type="file" id="camera" name="camera" className="camera" capture="camera" accept="image/*" style={_hide} />
                                <input type="file" className="filename" id="1" style={_hide} />

                                <input type="file" name="uploadfile" style={_hide} />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer fix">
                        <div className="btnbox">
                            <a className="btn-type2" href="javascript:void(0);">취소</a>
                            <a className="btn-type1" href="javascript:void(0);">등록하기</a>
                        </div>
                    </div>

                    <form name="multiform">
                        <input type="hidden" name="u_idx" />
                        <input type="hidden" name="shop_idx" />
                        <input type="hidden" name="grade" />
                        <input type="hidden" name="review_contents" />
                        <input type="hidden" name="review_image" />
                    </form>

                </div>
            </section>
        )
    }
});

/*********************************************************************************
 * modalgallery class
 * html template
 *********************************************************************************/
var ModalGallery = React.createClass({
    getInitialState: function() {
        return {list:['']};
    },
    componentDidMount:function() {
        var _this=this;

        jQuery('.modal.modal-gallery .btn-close').on('tap',function() {
            twCommonUi.hideModal(jQuery('.modal.modal-gallery'));
            $(".gallery-thumb .thumb").removeClass('slick-focus');

            $('.slider-shop-gallery')[0].slick.unslick();
            $('.slider-shop-gallery-nav')[0].slick.unslick();
        });

        this.setState({list:this.props.shop});
    },
    render : function () {
        var _gallery=null,
            _thumbs=null,
            _originalSize={width:jQuery(window).width()},
            _size={width:'60px','height':'60px'},
            _createGallery=function(item,idx) {
                return (
                    <div className="thumb"><img src={item.shop_image_url} alt="" /></div>
                );
            },
            _createThumbs=function(item,idx) {
                return (
                    <div className="thumb"><span></span><img style={_size} src={item.shop_image_url} alt="" /></div>
                );
            };

        if(this.state.list[0]!='') {
            _gallery=this.state.list.map(_createGallery);
            _thumbs=this.state.list.map(_createThumbs);

        }
        return (
            <section className="modal modal-gallery" style={this.props.dataStyle}>
                <div className="modal-inner">
                    <div className="modal-content">
                        <div className="content-header">
                            <h3>{this.props.info.shop_name}</h3>
                            <a className="btn-close" href="javascript:void(0);">닫기</a>
                        </div>
                        <div className="shop-gallery">
                            <div className="slider slider-shop-gallery">
                                {_gallery}
                            </div>
                        </div>
                        <div className="gallery-thumb">
                            <div className="slider slider-shop-gallery-nav">
                                {_thumbs}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
});

/*********************************************************************************
 * modalgallery class
 * html template
 *********************************************************************************/
var ModalMap = React.createClass({
    componentDidMount:function() {

        jQuery('.modal.modal-map .btn-close').on('tap',function() {
            twCommonUi.hideModal(jQuery('.modal.modal-map'));
        });
    },
    render : function () {
        return (
            <section className="modal modal-map" style={this.props.dataStyle}>
                <div className="modal-inner">
                    <div className="modal-content">
                        <div className="content-header">
                            <h3>{this.props.info.shop_name}</h3>
                            <a className="btn-close" href="javascript:void(0);">닫기</a>
                        </div>
                        <div className="map">
                        </div>
                    </div>
                </div>
            </section>
        )
    }
});

/*********************************************************************************
 * modaliconexplain class
 * html template
 *********************************************************************************/
var ModalIconExplain = React.createClass({
    componentDidMount:function() {

        jQuery('.modal.modal-icon-explain .btn-close').on('tap',function() {
            twCommonUi.hideModal(jQuery('.modal.modal-icon-explain'));
        });
    },
    render : function () {
        return (
            <section className="modal modal-full modal-icon-explain" style={this.props}>
                <div className="modal-inner">
                    <div className="modal-content">
                        <div className="content-header">
                            <a className="btn-close" href="javascript:void(0);">닫기</a>
                        </div>
                        <div className="explainbox">
                            <ul>
                                <li>
                                    <div className="icon explain-premium"></div>
                                    <div className="txt">
                                        <strong>타임코인</strong>
                                        <p>적 립한 시간(min)을 코인으로 교환할 수 있는 프리미엄 매장을 표시합니다.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon min-save"></div>
                                    <div className="txt">
                                        <strong>시간적립</strong>
                                        <p>매장에 방문 시 자동으로 고객님의 기기와 연동해 시간(min)적립 가능 여부를 표시합니다.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon coupon"></div>
                                    <div className="txt">
                                        <strong>쿠폰사용</strong>
                                        <p>매장에서 사용 가능한 쿠폰의 발행 여부와 현재 구매할 수 있는 쿠폰의 유무를 표시합니다.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon coin"></div>
                                    <div className="txt">
                                        <strong>코인사용</strong>
                                        <p>타임월렛을 통해 적립된 코인을 현금처럼 사용할 수 있는 매장을 표시합니다.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
});

/*********************************************************************************
 * modalstateexplain class
 * html template
 *********************************************************************************/
var ModalStateExplain = React.createClass({
    componentDidMount:function() {

        jQuery('.modal.modal-state-explain .btn-close').on('tap',function() {
            twCommonUi.hideModal(jQuery('.modal.modal-map'));
        });
    },
    render : function () {
        return (
            <section className="modal modal-full modal-state-explain" style={this.props}>
                <div className="modal-inner">
                    <div className="modal-content">
                        <div className="content-header">
                            <a className="btn-close" href="javascript:void(0);">닫기</a>
                        </div>
                        <div className="explainbox">
                            <ul>
                                <li>
                                    <div className="icon max-coin"></div>
                                    <div className="txt"><span>매장에서 획득 가능한 최대 코인</span></div>
                                </li>
                                <li>
                                    <div className="icon min"></div>
                                    <div className="txt"><span>코인교환이 가능한 최대시간(min)</span></div>
                                </li>
                                <li>
                                    <div className="icon day"></div>
                                    <div className="txt"><span>다음 코인교환 기회까지 남은기간</span></div>
                                </li>
                                <li>
                                    <div className="icon coin-exchange"></div>
                                    <div className="txt"><span>코인교환 페이지 이동 버튼</span></div>
                                </li>
                                <li>
                                    <div className="icon coin-use"></div>
                                    <div className="txt"><span>코인사용 페이지 이동 버튼</span></div>
                                </li>
                            </ul>
                            <div className="add-txt">
                                타임월렛은 지정된 매장에서 머무른 시간(min)을 적립하고 적립된 시간(min)으로 다양한 혜택을 누릴 수 있습니다. <br />
                                또한 프리미엄 매장에서는 적립된 시간(min)을 현금처럼 사용가 능한 코인(coin)으로 교환하여 사용할 수 있습니다.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
});


