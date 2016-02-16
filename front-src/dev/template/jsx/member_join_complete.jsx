/*********************************************************************************
 * 회원가입 성공 class
 * html template
 *********************************************************************************/
var MemberJoinComplete = React.createClass({
    minStatus:'',
    getInitialState:function() {
        return {min:10}
    },
    componentDidMount:function() {
        var _this=this,
            _userIdx=_this.props.userIdx;

        //높이 설정 공통 부분
        twCommonUi.setContentsHeight();

        /*
         * user.userState status value
         * 0 : 임시회원 ,1: 정상회원, -1 : 탈퇴 요청, -2: 탈퇴 완료 (계정 삭제), -3: 블럭 , -4 : 임시회원 데이터이전 완료
         */
        twMember.getUserInfo(_userIdx,function (user) {

            var _min=user.min;

            if (_this.isMounted()) { //ajax의 응답이 왔을 때 컴포넌트가 unmount된 경우를 판단하여 setState나 forceUpdate를 호출하지 않게 한다.
                _this.setState({
                    min: _min
                });
                //React.render(React.createElement(ModalSetLocationGu, {items: _si}), document.getElementsByClassName('subList')[_$t.closest('li').index()]);
            }

        });

        jQuery('.complete-btn .btn-type3').on('tap',function() {
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
            _min=this.state.min;
            _contents = <MemberJoinComplete />;

        /* 10min  */
        /*min30
         <div className="complete-img 30min">30min</div>
         */
        /*min100
         <div className="complete-img 100min">100min</div>
         */
        return (
            <div className={"page "+loc[3].pageName+" "+this.props.position}>

                <div className={"complete-img min"+_min}>{_min}min</div>

                <p className="complete-ment">
                    <strong>회원가입 완료</strong>
                    <span>{_min}min</span>을 선물로 드렸습니다.
                </p>
                <div className="complete-btn">
                    <a className="btn-type3 active" href="javascript:void(0);">메인(리스트)페이지로 이동</a>
                </div>
            </div>
        )
    }
});