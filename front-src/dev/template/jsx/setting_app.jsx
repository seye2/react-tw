/****************************************************
* 앱 설정
*
****************************************************/
var SettingApp = React.createClass({
    componentDidMount : function() {
        jQuery('.contents').css({
            'padding-left':0,
            'padding-right':0
        });

        twCommonUi.setContentsHeight();

        jQuery('.onoffswitch-label').on('tap', function(e) {
            var thisIdText = this.id;
            switch (thisIdText) {
                case 'coinAutoExchange' :
                    alert('코인자동교환 설정 터치');
                    break;
                case 'alarmSet' :
                    alert('알림 설정 터치');
                    break;
                case 'autoCheckIn' :
                    alert('자동체크인 설정 터치');
                    break;
                case 'pushSet' :
                    alert('푸시 알림 설정 터치');
                    break;
            }
        });
    },
    render : function() {
        var _contents = null,
            _contents = <SettingApp />;
        return (
            <div className={"page "+loc[23].pageName+" "+this.props.position}>
                <dl className="setting-app-item coin-auto-exchange">
                    <dt>coin 자동교환 설정</dt>
                    <dd>
                        <p>자동교환 설정 시 coin으로 교환할 수 있는 min 발생 시 자동으로 교환할 수 있습니다.</p>
                        <div className="onoffswitch-wrap">
							<span className="onoffswitch">
								<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="settingApp1" />
								<label className="onoffswitch-label" id="coinAutoExchange" htmlFor="settingApp1">
                                    <span className="onoffswitch-inner"></span>
                                    <span className="onoffswitch-switch"></span>
                                </label>
							</span>
                        </div>
                    </dd>
                </dl>
                <dl className="setting-app-item alarm-set">
                    <dt>알림 설정</dt>
                    <dd>
                        <p>체크인, 체크아웃, 코인 교환 등의 내용을 실시간으로 알려드립니다. 소리/진동/무음 설정은 휴대폰 설정과 동일하게 적용됩니다.</p>
                        <div className="onoffswitch-wrap">
							<span className="onoffswitch">
								<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="settingApp2" />
								<label className="onoffswitch-label" id="alarmSet" htmlFor="settingApp2">
                                    <span className="onoffswitch-inner"></span>
                                    <span className="onoffswitch-switch"></span>
                                </label>
							</span>
                        </div>
                    </dd>
                </dl>
                <dl className="setting-app-item auto-check-in">
                    <dt>자동체크인</dt>
                    <dd>
                        <p>체크인, 체크아웃, 코인 교환 등의 내용을 실시간으로 알려드립니다. 소리/진동/무음 설정은 휴대폰 설정과 동일하게 적용됩니다.</p>
                        <div className="onoffswitch-wrap">
							<span className="onoffswitch">
								<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="settingApp3" />
								<label className="onoffswitch-label" id="autoCheckIn" htmlFor="settingApp3">
                                    <span className="onoffswitch-inner"></span>
                                    <span className="onoffswitch-switch"></span>
                                </label>
							</span>
                        </div>
                    </dd>
                </dl>
                <dl className="setting-app-item push-set">
                    <dt>푸시 알림 설정</dt>
                    <dd>
                        <p>푸시 알림 설정시 쿠폰 및 min 적립 관련한 정보와 다양한 혜택에 대한 정보를 받아 보실 수 있습니다.</p>
                        <div className="onoffswitch-wrap">
							<span className="onoffswitch">
								<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="settingApp4" />
								<label className="onoffswitch-label" id="pushSet" htmlFor="settingApp4">
                                    <span className="onoffswitch-inner"></span>
                                    <span className="onoffswitch-switch"></span>
                                </label>
							</span>
                        </div>
                    </dd>
                </dl>
            </div>
        )
    }
});