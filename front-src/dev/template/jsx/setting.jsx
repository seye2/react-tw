/*********************************************************
 * 환경설정 초기 진입화면
 *
 *********************************************************/
var Setting = React.createClass({
    componentDidMount : function() {
        jQuery('.contents').css({
            'padding-left':0,
            'padding-right':0
        });

        twCommonUi.setContentsHeight();
    },
    render : function() {
        var _contents = null,
            _contents = <Setting />;
        return (
            <div className={"page "+loc[22].pageName+" "+this.props.position}>
                <ul>
                    <li><a href="javascript:void(0);">앱 설정<i className="fa fa-angle-right"></i></a></li>
                    <li><a href="javascript:void(0);">버전 정보<i className="fa fa-angle-right"></i></a></li>
                    <li><a href="javascript:void(0);">튜토리얼 보기<i className="fa fa-angle-right"></i></a></li>
                    <li><a href="javascript:void(0);">FAQ<i className="fa fa-angle-right"></i></a></li>
                </ul>
            </div>
        )
    }
});