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
import EditNoteIcon from '@mui/icons-material/EditNote';
import RoomIcon from '@mui/icons-material/Room';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
function Home_user() {
  /*마이페이지*/
  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const fileInput = useRef(null)
  /*지도*/
  /*지도에 현 위치 불러오기*/

  let [showFilter, setShowFilter] = useState(true);
  let [showDetail, setShowDetail] = useState(false);
  const mapContainer = useRef(null);
  useEffect(() => {
    const { naver } = window;
    let clickListener = null;
    let map = null;
    let showDetailsLink = "";
    let infowindow = null;

    navigator.geolocation.getCurrentPosition(function (position) {
      const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
      const options = {
        center: location,
        zoom: 18,
      };
      map = new naver.maps.Map(mapContainer.current, options);

      // 예시 마커 생성
      const markerPosition = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var marker = new naver.maps.Marker({
        position: markerPosition,
        map,
      });

      var contentString = [
        `<div class="iw_inner"><a id="showDetails">asdasdas</a></div>`
      ].join(``);
      infowindow = new naver.maps.InfoWindow({
        content: contentString
      });

      function toggleFilterAndDetail() {
        console.log(1111);
        setShowFilter(!showFilter);
        setShowDetail(!showDetail);
      }

      function addClickListener() {
        // click 이벤트 리스너를 한 번만 추가
        clickListener = function (e) {
          if (infowindow.getMap()) {
            infowindow.close();
          } else {
            infowindow.open(map, marker);
            showDetailsLink = document.getElementById('showDetails');
            // showDetailsLink에 대한 click 이벤트 리스너 추가
            if (showDetailsLink) {
              console.log(showDetailsLink);
              showDetailsLink.addEventListener('click', toggleFilterAndDetail);
            }
          }
        };

        naver.maps.Event.addListener(marker, "click", clickListener);
      };
      // 예시 마커에 대한 클릭 리스너 추가
      addClickListener();
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
              `<div class="iw_inner">${shop.shopName}</div>`
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
  }, [showFilter, showDetail]);
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
  let [recall2, setRecall2] = useState(false);
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

  /*알림 가져오기*/
  const [noticeAlarmInfo, setNoticeAlarmInfo] = useState([]);
  const [alarmInfo, setAlarmInfo] = useState([]);
  const combinedAlarms = [...alarmInfo, ...noticeAlarmInfo].sort(
    (a, b) => a.before - b.before
  );
  useEffect(() => {
    axios.get('/member/getAlarm')
      .then(response => {
        const alarmData = response.data;
        setAlarmInfo(alarmData);
        alarmData.map((alarm, index) => (
          console.log(alarm)
        ));
      })
      .catch(error => {
        console.error('세션 데이터를 가져오는데 실패함', error);
      });
  }, [recall2]);

  /*닉네임 수정*/
  let [nicname, setNicname] = useState("");
  let [temp2, setTemp2] = useState(true);
  /*즐겨찾기*/
  let [temp3, setTemp3] = useState(true);
  let [shopsData, setShopsData] = useState([]);
  let [fv_store, setFv_store] = useState([]);
  useEffect(() => {
    console.log(shopsData); // 상태가 변경될 때마다 호출됨
  }, [shopsData]);
  /*즐겨찾기 수정*/
  let [temp5, setTemp5] = useState(true);
  let [selectedStores, setSelectedStores] = useState([]);

  /*알림창*/
  let [temp4, setTemp4] = useState(true);


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
                  <a className='alarm' onClick={() => {
                    setTemp4(!temp4);
                  }} style={{ cursor: "pointer", position: "relative" }}>
                    <div style={{
                      position: "absolute",
                      right: "0", // right 위치 조절
                      top: "0", // top 위치 조절
                      width: "25px",
                      height: "25px",
                      marginRight: "30px", // 오른쪽 여백 추가
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center", // 텍스트를 가운데 정렬
                      fontSize: "20px"
                    }}>{alarmInfo.length + noticeAlarmInfo.length}</div>
                    <NotificationsNoneIcon fontSize="large" />
                  </a>
                </li>

                <li>
                  <a onClick={() => {
                    setTemp(!temp);
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
          <div style={{ width: "100%", height: "91%", overflow: "hidden" }}>
            <div className={`contents_slide ${showFilter == true ? "" : "filter_slide"}`} style={{ width: "122%", height: "100%", display: "flex" }}>

              <div style={{ width: "1%", height: "100%" }}></div>

              <div className={`filter`} style={{ width: "22%", borderRadius: "50px", height: "100%" }}>
                필터링
              </div>

              <div style={{ width: "1%", height: "100%" }} ></div>

              <div style={{ width: "76%", height: "100%" }}>
                <div ref={mapContainer} style={{ width: "100%", height: "100%", borderRadius: "50px", boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>

                </div>
              </div>

              <div style={{ width: "1%", height: "100%" }} ></div>

              <div style={{ width: "21%", borderRadius: "50px", height: "100%", backgroundColor: "red", position: "relative" }}>
                <div style={{ position: "absolute", top: "20px", right: "30px", fontSize: "25px", cursor: "pointer" }} onClick={() => {
                  setShowFilter(!showFilter);
                  setShowDetail(!showDetail);

                }}><a href='/home_user'>x</a></div>
                상세페이지 내용
              </div>

              <div style={{ width: "1%", height: "100%" }} ></div>
            </div>
          </div>
        </div>
        <div className={`${temp1 == true ? "popup_view_none" : "popup_view"}`} style={{ top: "50%" }}>
          <div>
            <Avatar
              src={Image}
              style={{ margin: '20px' }}
              size={150}
              onClick={() => { fileInput.current.click() }} />
            <div><a style={{ color: "gray", textDecorationLine: 'underline', cursor: 'pointer' }}
              onClick={() => {
                if (userInfo.social == "normal") {//이부분 수정하기
                  navigate("/edit_member_information");
                } else {//이부분 수정하기
                  navigate("/edit_member_information_social");
                }

              }}>회원 정보 수정</a></div>
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
            <a href="owner_main_page"><span>내 가게</span></a>
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
            value={nicname}
            onChange={(e) => {
              setNicname(e.target.value);
            }} />

          <a className='nicname_change_btn' onClick={() => {
            axios.put('/member/update/nickname', {

              nickname: nicname,

            }).then(response => {//데이터를받아오는게성공시 다른페이지호출
              setNicname("");
              setRecall(!recall);
              window.alert("닉네임변경 성공");


            }).catch(error => {//데이터를받아오는게 실패시 오류 메세지출력하고 다시 login페이지 호출
              setNicname("");
              window.alert(error.response.result);
            })
            setTemp2(!temp2);
          }} style={{ cursor: "pointer" }}>완료</a>
          <div style={{ position: "absolute", top: "10px", right: "25px", fontSize: "25px", fontWeight: "700", cursor: "pointer" }} onClick={() => {
            setTemp2(!temp2)
          }}>X</div>
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
          <span className="fv_view_close" style={{ fontSize: "25px", position: "absolute", top: "10px", right: "19px", cursor: "pointer", padding: "0px 10px", fontSize: "25px", fontWeight: "700" }} onClick={() => {
            setTemp3(!temp3);
          }}>X</span>
          <div className='fv_view_title'>
            <span>내 장소</span><span style={{ fontSize: "18px", textAlign: "right" }}><RoomIcon fontSize="small" />{shopsData.length}개</span>
          </div>

          <div className='fv_view_edit' style={{ border: "2px solid gray", marginLeft: "210px", color: "rgba(0,0,0,0.8)" }} >
            <EditNoteIcon className="fv_view_EditNoteIcon" fontSize="large" style={{ marginLeft: "10px" }} /><span style={{ padding: "5px 0px", fontSize: "20px" }} onClick={() => {
              setTemp5(!temp5)
            }}> 편집</span>
          </div>
          <div className='divide'><span style={{ display: "none" }}>asd</span></div>
          <div className='fv_store_content' style={{ position: "relative" }}>

            <div style={{ marginTop: "20px" }}>
              {shopsData.map((store, index) => (
                <div key={index} className="fv_store" style={{ display: "flex", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                  <div className='fv_store_image'>
                    <img src={"/shopimages/" + `${store.imagefilename}`} alt={store.imagefilename} style={{ backgroundCover: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: "100px", float: "Left" }} />
                  </div>
                  <div style={{ width: "1000px", marginTop: "10px", lineHeight: "1.8" }}>
                    <div className='fv_store_name' style={{ textAlign: "left" }}>
                      {store.shopname}
                    </div>
                    <div className='fv_store_address'>
                      {store.shopaddress}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${temp5 == true ? "fv_store_edite_none" : 'fv_store_edite'}`}>
          <span className="fv_view_close" style={{ fontSize: "25px", position: "absolute", top: "10px", right: "19px", cursor: "pointer", padding: "0px 10px", fontSize: "25px", fontWeight: "700" }} onClick={() => {
            setTemp5(!temp5);
          }}>X</span>
          <div className='fv_store_edite_title' style={{ marginTop: "20px" }}>
            <span>편집</span><span style={{ fontSize: "18px", textAlign: "right" }}><RoomIcon fontSize="small" />{selectedStores.length}개</span>
          </div>
          <div className='divide' style={{ height: "10px" }}><span style={{ display: "none" }}>asd</span></div>
          <div className="fv_store_list" style={{ marginTop: "20px",width:"100%",height:"70%" }}>
            {shopsData.map((store, index) => (
              <div key={index} className="fv_store" style={{ display: "flex", borderBottom: "2px solid rgba(0,0,0,0.3)",position:"relative" }}>
                <div className='fv_store_image'>
                  <img src={"/shopimages/" + `${store.imagefilename}`} alt={store.imagefilename} style={{ backgroundCover: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: "100px", float: "Left" }} />
                </div>
                <div style={{ width: "1000px", marginTop: "10px", lineHeight: "1.8" }}>
                  <div className='fv_store_name' style={{ textAlign: "left" }}>
                    {store.shopname}
                  </div>
                  <div className='fv_store_address'>
                    {store.shopaddress}
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={selectedStores.includes(store)}
                  onChange={(e) => {
                    let isChecked = e.target.checked;
                    let address = store.shopaddress;
                    if (isChecked) {
                      if (selectedStores.some(item => item.shopaddress === address)) {
                        // 이미 선택된 주소인 경우, 아무것도 하지 않음
                      } else {
                        // 새로운 배열을 생성하여 선택된 항목을 추가
                        let copy = [...selectedStores, store];
                        setSelectedStores(copy);
                        console.log(copy);
                      }
                    } else {
                      // 선택 해제된 경우, 해당 주소를 가진 항목을 배열에서 제거
                      setSelectedStores(prevStores => prevStores.filter(item => item.shopaddress !== address));
                    }
                  }}
                style={{position:"absolute",top:"0",right:"0",width:"25px",height:"25px",cursor:"pointer"}}/>

              </div>
            ))}
          </div>
          <button className="remove_fv_Store" style={{marginTop:"10px",padding:"10px 50px",borderRadius:"50px",border:"1px solid rgba(0,0,0,0.3)",cursor:"pointer",fontWeight:"700",fontSize:"25px"}} onClick={()=>{
            axios.put('/member/update/nickname', {
              //선택된 즐겨찾기 가게 삭제
              nickname: selectedStores,

            }).then(response => {//데이터를받아오는게성공시 다른페이지호출
              setShopsData(response.data);
              window.alert("수정 완료");
              setSelectedStores([]);

            }).catch(error => {//데이터를받아오는게 실패시 오류 메세지출력하고 다시 login페이지 호출
              setSelectedStores([]);
              window.alert(error.response.result);
            })
            setTemp5(!temp5);
          }}>
          삭제 {selectedStores.length}
          </button>
        </div>

        <div id={`${temp4 == true ? "al_view_none" : "al_view"}`}>
          <span className="fv_view_close" style={{ fontSize: "25px", position: "absolute", top: "10px", right: "19px", cursor: "pointer", padding: "0px 10px", fontSize: "25px", fontWeight: "700" }} onClick={() => {
            setTemp4(!temp4);
          }}>X</span>
          <div className='fv_view_title'>
            <span>알림</span>
          </div>
          <div style={{ borderTop: "2px solid rgba(0,0,0,0.3)" }}>
            {combinedAlarms.map((alarm, index) => (
              <div key={index} className="fv_store" style={{ display: "block", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                <a style={{ color: "red", fontSize: "25px" }}>new &nbsp;</a>
                {alarm.object.shopName ? (
                  <a style={{ fontSize: "25px" }}><b>{alarm.object.shopName}</b></a>
                ) : (
                  <a style={{ fontSize: "25px" }}><b>{alarm.object.title}</b></a>
                )}
                <br></br>
                <a style={{ fontSize: "20px" }}>
                  {alarm.object.shopName
                    ? "새 할인상품이 등록되었습니다."
                    : "새 공지사항이 등록되었습니다."}
                  <a style={{ color: "red", fontSize: "20px", float: "right" }}>
                    ({alarm.before}시간 전)
                  </a>
                </a>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home_user;