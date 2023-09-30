import React, { useState } from 'react';
import './App.css';
import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Join from "./pages/Sign_Up.js"
import Login from "./pages/login.js"
import { useNavigate } from "react-router-dom";
import Kakao_Loading from "./pages/Kakao_Loading.js";
import Naver_Loading2 from './pages/Naver_Loading2.js';
import Owner from './pages/owner';
import Home_user from './pages/home_user';
import Finde_id from './pages/find_id.js';
import Finde_pw from './pages/find_pw.js';
import Id_result from './pages/id_result.js';
import Pw_result from './pages/pw_result.js';
import Owner_main_page from './pages/owner_main_page.js';
import Owner_addmenu from './pages/owner_addmenu.js';
import Owner_notice from './pages/owner_notice.js';
function App() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const { naver } = window;

    const location = new naver.maps.LatLng(37.282962234404806, 127.04758924770678);
    const options = {
      center: location,
      zoom: 18, 
    };
    const map = new naver.maps.Map(mapContainer.current, options);
    
    const markerPosition = new naver.maps.LatLng(37.282962234404806, 127.04758924770678);
    var marker = new naver.maps.Marker({
      position: markerPosition,
      map,
    });
    var contentString = [
      '<div class="iw_inner">sdfsfdsfsfd</div>'
    ].join('');
    var infowindow = new naver.maps.InfoWindow({
      content: contentString,
      backgroundColor: 'red', // 정보 창 배경색 변경
      borderColor: 'red', // 정보 창 테두리 색상 변경
      borderWidth: 1, // 정보 창 테두리 두께 변경
    });

    naver.maps.Event.addListener(marker, "click", function (e) {
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, marker);
      }
    });
  })
  let [temp, setTemp] = useState(true);
  const filter_hidden = 'filter_hidden';
  const filter_btn_hidden = "filter_btn_hidden";
  let navigate = useNavigate();
  function switchTemp() {
    setTemp(!temp);
  }

  return (
    <div className="App">
      <div className='wrap' style={{ display: "none" }}>
        <header id='header'>
          <div className='logo'>재고30</div>
          <nav className='nav'>검색 | 로그인 | 회원가입 | 마이페이지</nav>
        </header>
        <main id="contents" ref={mapContainer} >

        </main>
        <footer id="footer">
          <div className='footer1'>재고30</div>
          <div className='footer2'>개인정보 및 보호정책 등</div>
        </footer>
      </div>
      <Routes>
        <Route path="/" element={
          <div>
            <div className="App">
              <div className='wrap' >
                <header id='header' style={{
                   backgroundColor: 'white', // 헤더 배경색
                   boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // 그림자 효과
                   position: 'sticky', // 스크롤과 함께 고정
                   top: 0, // 화면 상단에 고정
                   zIndex: 1, // 다른 요소 위에 나타나도록 설정
                }}>
                  <div className='logo'><a href="/">재고 30</a></div>
                  <nav className='nav'>
                    <ul>
                      <li>
                        <a onClick={() => {
                          setTemp(switchTemp);
                        }} style={{cursor: "pointer"}}>
                          검색
                        </a>
                      </li>
                      <li>
                        <a href="/login">
                          로그인
                        </a>
                      </li>
                      <li>
                        <a href="" style={{cursor: "pointer"}}>
                          마이페이지
                        </a>
                      </li>
                    </ul></nav>
                </header>
                <div style={{width:"100%",height:"25px"}}></div>
                <main id="contents" ref={mapContainer} style={{ width: "100%", height: "91%",margin:"0 auto",borderRadius:"20px",boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>

                </main>
              </div>
              <div id='filter' className={`${temp ? filter_hidden : ""}`}>
                <div className={`filter ${temp ? filter_hidden : ""}`}>
                  필터링
                </div>
                <div className="filter-btn">
                  <button className="filter1-btn" onClick={(e) => {
                    setTemp(switchTemp);
                  }}>
                    {temp ? '▶️' : '◀️'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        } />
        <Route path='/sign_up' element={
          <div><Join />
          </div>
        } />
        <Route path='/login' element={
          <div><Login />
          </div>
        } />
        <Route path="/login/oauth2/Kakao_loading" element={<div>
          <Kakao_Loading />
        </div>} />
        <Route path="/login/oauth2/Naver_Loading2" element={<div>
          <Naver_Loading2 />
        </div>} />
        <Route path="/home_user" element={<div>
          <Home_user />
        </div>} />
        <Route path="/owner" element={<div>
          <Owner />
        </div>} />
        <Route path="/find_id" element={<div>
          <Finde_id />
        </div>} />
        <Route path="/find_pw" element={<div>
          <Finde_pw />
        </div>} />
        <Route path="/id_result" element={<div>
          <Id_result />
        </div>} />
        <Route path="/pw_result" element={<div>
          <Pw_result />
        </div>} />
        <Route path="/owner_main_page" element={<div>
          <Owner_main_page />
        </div>} />
        <Route path="/owner_addmenu" element={<div>
          <Owner_addmenu />
        </div>} />
        <Route path="/owner_notice" element={<div>
          <Owner_notice />
        </div>} />
        <Route path='*' element={<div>없는 페이지</div>} />

      </Routes>
    </div>
  );
}

export default App;