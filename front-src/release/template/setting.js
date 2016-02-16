/*********************************************************
 * 환경설정 초기 진입화면
 *
 *********************************************************/
var Setting = React.createClass({displayName: "Setting",
    componentDidMount : function() {
        jQuery('.contents').css({
            'padding-left':0,
            'padding-right':0
        });

        twCommonUi.setContentsHeight();
    },
    render : function() {
        var _contents = null,
            _contents = React.createElement(Setting, null);
        return (
            React.createElement("div", {className: "page "+loc[22].pageName+" "+this.props.position}, 
                React.createElement("ul", null, 
                    React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "앱 설정", React.createElement("i", {className: "fa fa-angle-right"}))), 
                    React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "버전 정보", React.createElement("i", {className: "fa fa-angle-right"}))), 
                    React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "튜토리얼 보기", React.createElement("i", {className: "fa fa-angle-right"}))), 
                    React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "FAQ", React.createElement("i", {className: "fa fa-angle-right"})))
                )
            )
        )
    }
});