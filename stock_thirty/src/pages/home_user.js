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
import { TextField, Button, InputAdornment } from "@mui/material";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

function Home_user() {
  /*마이페이지*/
  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const fileInput = useRef(null)
  /*지도*/
  /*지도에 현 위치 불러오기*/

  const mapContainer = useRef(null);
  useEffect(() => {
    const { naver } = window;
    navigator.geolocation.getCurrentPosition(function (position) {
      const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
      const options = {
        center: location,
        zoom: 18,
      };
      const map = new naver.maps.Map(mapContainer.current, options);

      axios.get('/ShopMarker')
        .then(response => {
          const shopInfo = response.data;
          shopInfo.forEach(shop => {
            let markerPosition = new naver.maps.LatLng(shop.latitude, shop.longitude);
            var marker = new naver.maps.Marker({
              position: markerPosition,
              map,
            });
            var contentString = [
              `<div class="iw_inner">${shop.shopname}</div>`
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

          });
        })
        .catch(error => {
          console.error('세션 데이터를 가져오는데 실패함', error);
        });
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
  let [recall, setRecall] = useState(false);

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
  }, [recall]);
  /*닉네임 수정*/
  let [nicname, setNicname] = useState("");
  let [temp2, setTemp2] = useState(true);
  /*즐겨찾기*/
  let [temp3, setTemp3] = useState(true);
  let [shopsData, setShopsData] = useState([]);

  useEffect(() => {
    console.log(shopsData); // 상태가 변경될 때마다 호출됨
  }, [shopsData]);

  /**/

  return (
    <div className="App">
      <div className="home_user_App">
        <div className='wrap' >
          <header id='header' className={`${temp1 == true ? "" : "header_hidden"}`} style={{
            backgroundColor: 'white', // 헤더 배경색
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // 그림자 효과
            position: 'sticky', // 스크롤과 함께 고정
            top: 0, // 화면 상단에 고정
            zIndex: 1, // 다른 요소 위에 나타나도록 설정
            borderRadius: "20px"
          }}>
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
                    <AccountCircleIcon fontSize="large" /> <span>{userInfo.nickname}</span>
                  </a>

                </li>
              </ul></nav>
          </header>
          <div style={{ width: "100%", height: "25px" }}></div>
          <main id="contents" className={`${temp1 == true ? "" : "contents_hidden"}`} ref={mapContainer} style={{ width: "100%", height: "91%", borderRadius: "20px", boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>

          </main>

        </div>
        <div id='filter' className={`${temp ? filter_hidden : ""}`}>
          <div className={`filter ${temp ? filter_hidden : ""}`}>
            필터링
          </div>
          <div className="filter-btn">
            <button className="filter1-btn" id={`${temp == true ? "" : "filter-btn_hidden"}`} onClick={(e) => {
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
            <div><a href='/' style={{ color: "gray", textDecorationLine: 'underline' }}>회원 정보 수정</a></div>
            <div><h1 style={{ margin: "20px 0px 30px 30px" }}>{userInfo.nickname}
              <a onClick={() => {
                setTemp2(false)
              }}><DriveFileRenameOutlineIcon fontSize="midium" className="popup_log_out" style={{ cursor: "pointer", margin: "0px 0px -5px 7px" }}></DriveFileRenameOutlineIcon></a>
              <a href="/" onClick={() => {
                window.alert("로그아웃되었습니다.");
              }
              } style={{ cursor: "pointer" }}>
                <ExitToAppIcon fontSize="midium" className="popup_log_out" style={{ margin: "0px 0px -5px 7px" }} />
              </a>
            </h1>
            </div>
          </div>

          <div id="popsec1" style={{ cursor: "pointer" }}>
            <a onClick={() => {

              axios.get('/member/bookmark/check')
                .then(response => {
                  setShopsData(response.data);

                  setTemp3(!temp3);
                })
                .catch(error => {
                  console.error('세션 데이터를 가져오는데 실패함', error);
                });

              setTemp3(!temp3);
            }} style={{ cursor: "pointer" }} ><span>즐겨 찾기</span></a>

          </div>
          <div id="popsec2" style={{ cursor: "pointer" }}>
            <a href="" ><span>예약 확인</span></a>
          </div>
          <div id="popsec3" style={{ cursor: "pointer" }}>
            <a href=""> <span>내 신뢰점수</span></a>
          </div>
          <div id="popsec2" style={{ cursor: "pointer" }}>
            <a href="owner"><span>가게 등록</span></a>
          </div>
          <button className="popup_btn" onClick={() => {
            setTemp1(!temp1)
          }}><a>[ CLOSE ]</a></button>

        </div>

        <div className={`${temp2 == true ? "popup_view2_none" : "popup_view2"}`} >
          <div className='nicname_change'>닉네임 수정</div>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" >
                  <PermIdentityIcon />
                </InputAdornment>
              ),
            }}
            placeholder={`현재 닉네임: ${userInfo.nickname} (최대15자)`}
            label="ID"
            required
            name="id"
            type="email"
            autoComplete="id"
            sx={{
              width: { sm: 200, md: 450 },
              "& .MuiInputBase-root": {
                height: 60
              }
            }}
            autoFocus
            onChange={(e) => {
              setNicname(e.target.value);
            }} />

          <a className='nicname_change_btn' onClick={() => {
            axios.put('/member/update/nickname', {

              nickname: nicname,

            }).then(response => {//데이터를받아오는게성공시 다른페이지호출
              setRecall(!recall);
              window.alert("닉네임변경 성공");



            }).catch(error => {//데이터를받아오는게 실패시 오류 메세지출력하고 다시 login페이지 호출
              window.alert("다음 조건을 확인하세요")

            })
            setTemp2(!temp2);
          }} style={{ cursor: "pointer" }}>완료</a>

          <ul className="nicname_change_list" style={{ marginLeft: "20px", textAlign: "left" }}>
            <li style={{ listStyleType: "circle", color: "black" }}>중복 닉네임 불가</li>
            <li style={{ listStyleType: "circle", color: "black" }}>길이는 최대 15자 이내</li>
          </ul>
          <div className='warning'>
            <div className='text'>
              재고30 닉네임 정책에 맞지 않는 닉네임은 <br />닉네임변경이 되지 않으므로 주의해주세요
            </div>
          </div>
        </div>
        <div id={`${temp3 == true ? "fv_view_none" : "fv_view"}`}>
          <div>
            <span>즐겨찾기 목록</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home_user;