# tw
tw front-end 저장소

# 사용기술
nodejs, gulp, sass, React.js, compass, font awesome, etc....

# 폴더구조
    timewallet_ui_v1.0_kr
        ├── front-src                   
            ├── dev                     # 실제 개발 영역
                ├── css                 # sass(*.scss) 개발영역
                ├── fonts               # font awesome 을 위한 폰트 저장소
                ├── html                # 템플릿이 될 html 파일 개발영역
                    ├── modal           # 모달창 html 개발 영역    
                ├── images  
                ├── js                  # js 저장소
                    └── app             # iOS, Android와 연동을 위한 bridge.js 파일 위치
                    └── library
                    └── plugin
                    └── msg.js          # 라우터 정보를 보관하는 js
                    └── twRouter.js     # 라우터를 실행하는 js
                    └── twUi.js         # getApiData 등 서비스에 필요한 기능들이 들어있는 js
                ├── template            # 전환될 jsx를 보관하는 폴더는 꼭 부모폴더 밑에 위치해야 한다.
                    └── jsx             # html 파일을 jsx로 전환하는 작업 영역
            
            ├── release                 # 모든 결과물이 컴파일 되어서 내려오는 곳   
                ├── css
                ├── fonts
                ├── html
                    ├── modal
                ├── images
                ├── js
                └── template
        
        ├── bower.json                  # front-src javascript (bower install)
        ├── package.json                # gulp install list (npm install)
        ├── gulpfile.js                 # use gulp package (automatic server)
        ├── README.md                   # 지금 당신이 보고 있는 이것.
        └── Views                       # IIS를 돌리기위한 파일들 위치.


# 기본설치
- 먼저 nodejs 설치가 필요
- 그 후 sass 사용을 위한 ruby 설치 필요.
- 윈도우 개발 환경에서는 쉽게 [ruby installer] (http://rubyinstaller.org/)를 사용.
- API와 연동 개발을 위한 IIS 설치 필요. 설치는 최신 dotNet 프레임워크, 그리고 거의 모든 옵션이 설치된 IIS 가 필요.
- IIS 설치 후 사이트 추가 필요. root는 이 프로젝트 root로 잡아주면 되고 포트는 9000 번을 사용한다.

<pre>
// gulp, bower 설치가 안되어 있다면
$ npm install -g gulp
$ npm install -g bower

$ npm install
$ bower install

// ruby install 후
$ gem install sass     // sass 설치, 설치 안하면 gulp 작동 안함.
$ gem install compass  // compass 설치, 역시 설치 안하면 gulp 작동 안함.
</pre>

# 서버 실행
<pre>
$ gulp      // let's work!
</pre>

# IIS 및 닷넷 프레임워크를 설치해야 해당 내용을 확인 할 수 있다.(닷넷 API포함)

# 기타
본 프로젝트는 React.js를 사용한다. 그래서 라우터 관리까지 front-end에서 직접관리 한다.
- 라우터에 대한 1차 정보는 /front-src/dev/js/msg.js에서 관리하며 이를 실행하는 역활은 동 경로의 twRouter.js에서 한다.
