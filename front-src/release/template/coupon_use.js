/*********************************************************************************
 * CoinUse class
 * html template
 *********************************************************************************/
var CoinUse = React.createClass({displayName: "CoinUse",
    getInitialState:function() {
        return ({coin:0});
    },
    componentDidMount:function() {
        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();
        jQuery('.contentsScroll').height(jQuery(window).height()-jQuery('.header').height());

        var _this=this;

        reqwest({
            url: loc[11].api[0], //회원정보조회
            method: 'post',
            type: 'json',
            data: {
                u_idx:(jQuery.localStorage.get('userIdx')) ? jQuery.localStorage.get('userIdx') : 1
            }
        })
            .then(function (resp) {
                /*************************
                 resp.ResultCode
                 '1'=success
                 '-1'=fail
                 *************************/
                if (resp[0].ResultCode == '1') {

                    //setState excute react render
                    if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                        _this.setState({
                            coin: resp[0].ResultData[0].coin
                        });

                        jQuery('.use-button .btn-use a').on('tap',function(e) {
                            e.stopPropagation();

                            if(jQuery('.money input').val().length<3) {
                                jQuery('.amount .message').addClass('error')
                                    .text('* 코인은 100단위로만 사용가능합니다.');
                            } else {
                                if(parseInt(jQuery('.money input').val())<=parseInt(jQuery('.use-top-wrap strong').text())) {
                                    jQuery('.amount .message').removeClass('error')
                                        .text('* 금액을 입력해 주세요.');

                                    jQuery('header').data('coin',jQuery('.money input').val());
                                    location.href='#/coin-use-select';
                                } else {
                                    jQuery('.amount .message').addClass('error')
                                        .text('* 보유금액을 초과한 금액입니다.');
                                }
                            }
                        });
                    }
                } else if (resp.ResultCode == '-1') { //실패
                }
            })
            .fail(function (err, msg) {
                console.log(err);
                jQuery('#errors').html('response::::' + err.response + '<br />status::::' + err.status + '<br />statusText::::' + err.statusText)
            });
    },
    render : function () {
        var _bg={
            background:'#e5e5e5'
        };

        return (
            React.createElement("div", {className: "page "+loc[11].pageName+" "+this.props.position, style: _bg}, 
                React.createElement("div", {className: "contentsScroll"}, 

                    React.createElement("div", {className: "use-top-wrap coin"}, 
                        React.createElement("div", {className: "use-top-wrap-inner"}, 
                            React.createElement("strong", null, this.state.coin), React.createElement("span", null, "coin"), 
                            React.createElement("p", null, "가맹점에서 현금처럼 사용이 가능합니다."), 
                            React.createElement("p", {className: "except"}, "*일부 가맹점 제외")
                        )
                    ), 
                    React.createElement("div", {className: "payment-wrap"}, 
                        React.createElement("div", {className: "roundbox"}, 
                            React.createElement("div", {className: "roundbox-inner"}, 
                                React.createElement("div", {className: "amount"}, 
                                    React.createElement("label", {for: "will"}, "사용하실 금액을 입력해주세요"), 
                                    React.createElement("div", {className: "money"}, 
                                        React.createElement("div", {className: "money-inner"}, 
                                            React.createElement("input", {type: "text", id: "will", placeholder: ""})
                                        )
                                    ), 
                                    React.createElement("div", {className: "message"}, "* 금액을 입력해 주세요")
                                )
                            )
                        ), 
                        React.createElement("div", {className: "roundbox"}, 
                            React.createElement("div", {className: "roundbox-inner"}, 
                                React.createElement("div", {className: "use-button"}, 
                                    React.createElement("span", {className: "title"}, "결제하기"), 
                                    React.createElement("p", null, "자세한 결제방법은 아래를 확인하세요. "), 
                                    React.createElement("div", {className: "btn-use"}, 
                                        React.createElement("a", {href: "javascript:void(0);"}, "결제하기")
                                    )
                                )
                            )
                        ), 
                        React.createElement("div", {className: "roundbox"}, 
                            React.createElement("div", {className: "roundbox-inner"}, 
                                React.createElement("div", {className: "use-way"}, 
                                    React.createElement("span", {className: "title"}, "결제방법"), 
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
            )
        )
    }
});


