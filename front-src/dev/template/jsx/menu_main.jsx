/**************************************************
 * 메뉴 메인 class
 *
 **************************************************/
var MenuMain = React.createClass({
    _memStatus : null,
    getInitialState:function() {
        return ({cls:[''],my_coin:0,my_min:0});
    },
    componentWillMount : function() {

    },
    componentDidMount : function() {
        // 로그인 여부 판단
        var _this=this,
            _data = {
            //'u_idx' : (jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1
            'u_idx' : 1 // 로그인 안된 회원용 테스트 값 or 테스트용 회원
        };
        reqwest({
            url : loc[9].api[0],
            method : loc[9].method,
            type : loc[9].type,
            data : _data
        })
        .then(function(resp) {
            if(resp[0].ResultCode == 1) {
                var _cls='',
                    _my_min = resp[0].ResultData[0].min.toLocaleString(),
                    _my_coin = resp[0].ResultData[0].coin.toLocaleString();
                _this._memStatus = resp[0].ResultData[0].u_status;

                if(_this._memStatus < 1) {
                    alert('로그인 후에 쿠폰과 코인을 사용하실 수 있습니다.');
                    _cls='not-member';
                } else {
                    _cls='';
                }

                _this.setState({
                    cls:_cls,
                    my_coin:_my_coin,
                    my_min:_my_min
                });

            }
        })
        .fail(function (err, msg) {
            console.log(err);
            jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
        });

        //jQuery('.container').hide();
        jQuery('.menu-link-box a').off('tap').on('tap', function(e) {
            e.stopPropagation();
            var thisId = this.id;
            if(_this._memStatus < 1) {
                if(thisId == 'my-wallet' || 'my-coupon' || 'bookmark' || 'used-list' || 'coin-donate') {
                    alert('로그인 후 이용가능한 메뉴입니다');
                    return false;
                }
            }
        });

        // 비콘 및 체크인 상태 표시 (하단)
        twCommonUi.scriptLoadNext(
            [
                _domainJsx+'shop_state.js'
                //_domainJsx+'location.js'
            ]
            ,true
            ,function() {
                setTimeout(function() {
                    React.render(React.createElement(ShopState, null), document.getElementsByClassName('beaconState')[0]);
                    //React.render(React.createElement(ModalAll, null), document.getElementsByClassName('modal-wrap')[0]);

                },300)
            }
        );

        jQuery('.contents').css({
            'padding-left':0,
            'padding-right':0
        });

        jQuery('.contents .page').css({
            'padding-left':10,
            'padding-right':10
        });

        twCommonUi.setContentsHeight();

        //React.render(React.createElement(ModalAll, null), document.getElementsByClassName('modal-wrap')[0]);
    },
    render : function() {
        var _contents=null,
            _createItem=function(item) {
                return (
                    <div>
                        <div className={"menu-min-coin fix "+item.cls}>

                            <div className="menubox">
                                <div className="min">
                                    <div className="show-number">
                                        <p>나의 min</p>
                                        <strong className="my-min">{item.my_min}</strong>
                                    </div>
                                    <a className="btn-coin-exchange" href="#/coin-exchange">
                                        <i className="fa fa-hourglass-end"></i>
                                    </a>
                                </div>
                            </div>

                            <div className="menubox">
                                <div className="need-login">
                                    <a href="#/member-login">로그인</a>
                                    <a href="#/member-join">회원가입</a>
                                </div>
                                <div className="coin">
                                    <div className="coin-button">
                                        <a className="btn-coin-useful" href="#/coin-use">코인사용 가능</a>
                                    </div>
                                    <div className="show-number">
                                        <p>나의 coin</p>
                                        <strong className="my-coin">{item.my_coin}</strong>
                                    </div>
                                    <div className="onoffswitch-wrap">
                                    <span className="onoffswitch">
                                        <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="push2" checked="checked" />
                                        <label className="onoffswitch-label" for="push2">
                                            <span className="onoffswitch-inner"></span>
                                            <span className="onoffswitch-switch"></span>
                                        </label>
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="menu-link-box">
                            <ul className="fix">
                                <li><a id="active my-wallet" href="#/my-wallet">나의월렛</a></li>
                                <li><a id="my-coupon" href="#/my-coupon">나의쿠폰</a></li>
                                <li><a id="coupon-exchange" href="#/coupon-exchange">쿠폰교환</a></li>
                                <li><a id="bookmark" href="#/bookmark">즐겨찾기</a></li>
                                <li><a id="used-list" href="javascript:void(0);">이용내역</a></li>
                                <li><a id="coin-donate" href="javascript:void(0);">기부하기</a></li>
                                <li><a id="notice" href="#/notice">공지사항</a></li>
                                <li><a id="setting" href="javascript:void(0);">환경설정</a></li>
                            </ul>
                        </div>
                    </div>
                );
            };

        // 비회원일 경우 : menu-min-coin에 not-member 추가

        if(this.state.cls[0]!='') {
            _contents=_createItem(this.state);
        }

        return (
            <div className={"page "+loc[9].pageName+" "+this.props.position}>
                {_contents}
                <div className="beaconState"></div>
            </div>
        )
    }
});