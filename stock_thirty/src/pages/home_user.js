import React, { useState } from 'react';
import './../App.css';
import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Avatar from 'react-avatar';
import StoreIcon from '@mui/icons-material/Store';
function Home_user() {
  /*마이페이지*/
  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const fileInput = useRef(null)
  /*지도*/
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
      content: contentString
    });

    naver.maps.Event.addListener(marker, "click", function (e) {
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, marker);
      }
    });
  })
  /*필터 버튼(마이페이지) 누를떄 애니메션효과*/
  let [temp, setTemp] = useState(true);
  const filter_hidden = 'filter_hidden';
  const filter_btn_hidden = "filter_btn_hidden";
  let navigate = useNavigate();
  function switchTemp() {
    setTemp(!temp);
  }
  let [temp1, setTemp1] = useState(true);

  /*스프링세션에서 리액트로 세션 가져오기*/
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    // 스프링에서 세션 데이터를 가져오는 호출
    axios.get('/getSessionMember')
      .then(response => {
        const userData = response.data;
        console.log(userData.redirect)
        if (userData.redirect) {
          console.log("페이지 이동");
          window.location.href = userData.redirect;
        } else {
          setUserInfo(userData);
          console.log("세션데이터가 존재");
          console.log(userData.id);
        }
      })
      .catch(error => {
        console.error('세션 데이터를 가져오는데 실패함', error);
      });
  }, []);
  return (
    <div className="App">
      <div className="home_user_App">
        <div className='wrap' >
          <header id='header' className={`${temp1 == true ? "" : "header_hidden"}`}>
            <div className='logo'><a href="/home_user">재고 30 </a></div>
            <nav className='nav'>
              <ul>
                <li>
                  <a onClick={() => {
                    setTemp(switchTemp);
                  }} style={{ cursor: "pointer" }}>
                    <SearchIcon fontSize="large" />
                  </a>
                </li>
                <li>
                  <a href="" style={{ cursor: "pointer" }}>
                    <StarBorderIcon fontSize="large" />
                  </a>
                </li>
                <li>
                  <a href="/" onClick={() => {
                    axios.get('/SessionLogout', {
                    })
                    window.alert("로그아웃되었습니다.");
                  }
                  }>
                    <ExitToAppIcon fontSize="large" />
                  </a>
                </li>
                <li>
                  <a className='mypages' onClick={() => {
                    setTemp1(!temp1);
                  }} style={{ cursor: "pointer" }}>
                    <AccountCircleIcon fontSize="large" /> <span>{userInfo.name}</span>
                  </a>

                </li>
              </ul></nav>
          </header>
          <main id="contents" className={`${temp1 == true ? "" : "contents_hidden"}`} ref={mapContainer} style={{ width: "100%", height: "93%" }}>

          </main>

        </div>
        <div id='filter' className={`${temp ? filter_hidden : ""}`}>
          <div className={`filter ${temp ? filter_hidden : ""}`}>
            필터링
          </div>
          <div className="filter-btn">
            <button className="filter1-btn" id={`${temp1 == true ? "" : "filter-btn_hidden"}`} onClick={(e) => {
              setTemp(switchTemp);
            }}>
              {temp ? '▶️' : '◀️'}
            </button>
          </div>
        </div>

        <div className={`${temp1 == true ? "popup_view_none" : "popup_view"}`} >
          <div>
            <Avatar
              src={Image}
              style={{ margin: '20px' }}
              size={150}
              onClick={() => { fileInput.current.click() }} />
            <div><a href='/' style={{ color: "blue", textDecorationLine: 'underline' }}>회원 정보 수정</a></div>
            <div><h1 style={{ margin: "20px 0px 30px 30px" }}>나윤호 님 환영합니다.
              <a href="/" onClick={() => {
                window.alert("로그아웃되었습니다.");
              }
              } style={{ cursor: "pointer" }}>
                <ExitToAppIcon fontSize="midium" style={{ margin: "0px 0px -5px 7px" }} />
              </a>
            </h1>
            </div>
          </div>
          <div id="popsec1">
            <a href="" style={{ marginRight: "-200px" }} ><StarBorderIcon fontSize="large" style={{ margin: "8px 0px -9px 0px" }} /> <span>즐겨 찾기{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0>"}</span></a>
          </div>
          <div id="popsec2">
            <a href="" style={{ marginRight: "-200px" }} ><ReceiptLongIcon fontSize="large" style={{ margin: "8px 0px -9px 0px" }} /><span>예약 확인{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0>"}</span></a>
          </div>
          <div id="popsec3">
            <a href="" style={{ marginRight: "-200px" }} ><InsertEmoticonIcon fontSize="large" style={{ margin: "8px 0px -9px 0px" }} /> <span>내 신뢰점수{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0>"}</span></a>
          </div>
          <div id="popsec2">
            <a href="owner" style={{ marginRight: "-200px" }} ><StoreIcon fontSize="large" style={{ margin: "8px 0px -9px 0px" }} /> <span>가게 등록{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0>"}</span></a>
          </div>
          <button className="popup_btn" onClick={() => {
            setTemp1(!temp1)
          }}><a>닫기</a></button>

        </div>
        <div className='click_bgc'>
        </div>
      </div>

    </div>
  );
}

export default Home_user;