/*********************************************************************************
 * 로그인 성공 class
 * html template
 *********************************************************************************/
var MemberLoginComplete = React.createClass({displayName: "MemberLoginComplete",
    componentDidMount:function() {
        var _this=this,
            _userIdx=_this.props.u_idx;

        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();

        var getPhoneParam = _this.props.user.phone.replace(/^(\d{3})(\d{3,4})(\d{4}).*/,"$1-$2-$3");
        jQuery('.complete-ment .phone').text(getPhoneParam);

        jQuery('.btn-type3').on('tap',function() {
            jQuery.localStorage.set('userIdx',_userIdx);
            BRIDGE.setUserIdx(_userIdx);
        });

        jQuery('.contents').css({
            'padding-left':0,
            'padding-right':0
        });

        jQuery('.contents .page').css({
            'padding-left':10,
            'padding-right':10
        });
    },
    render : function () {
        var _contents = null,
            _contents = React.createElement(MemberLoginComplete, null);

        return (
            React.createElement("div", {className: "page "+loc[4].pageName+" "+this.props.position}, 
                React.createElement("div", {className: "load-img"}), 
                React.createElement("p", {className: "complete-ment"}, 
                    "회원님의 기록을 성공적으로 불러왔습니다."
                ), 
                React.createElement("div", {className: "complete-btn"}, 
                    React.createElement("a", {className: "btn-type3 active", href: "javascript:void(0);"}, "메인(리스트)페이지로 이동")
                )
            )
        )
    }
});