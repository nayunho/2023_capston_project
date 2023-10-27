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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import CallIcon from '@mui/icons-material/Call';
import Marker4 from "./../img/marker4.gif";
function Home_user() {
  /*마이페이지*/
  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const fileInput = useRef(null)
  /*지도*/
  /*지도에 현 위치 불러오기*/
  
 let [a,setA]= useState(0);
 let [b,setB]= useState(0);
  const [showFilter, setShowFilter] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [shopInfo, setShopInfo] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const mapContainer = useRef(null);
  function getBarColor(trust) {
    if (trust * 40 >= 360) {
      return "#3498db";
    } else if (trust * 40 >= 280) {
      return "#27ae60";
    } else if (trust * 40 >= 160) {
      return "#f39c12";
    } else if (trust * 40 >= 80) {
      return "#f1c40f";
    } else {
      return "#e74c3c";
    }
  }
  let [search_store_switch, setSearch_store_switch] = useState(true);
  let [search_store_switch2, setSearch_store_switch2] = useState(true);
  let [switch3, setSwitch3] = useState(0);
  
  let [search_store, setSearch_store] = useState([]);
  useEffect(() => {
    const { naver } = window;
    let showDetailsLink = null;
    let map = null;
    let infowindow = null;

    navigator.geolocation.getCurrentPosition(function (position) {
      const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
      const options = {
        center: location,
        zoom: 18,
      };
      map = new naver.maps.Map(mapContainer.current, options);


      function toggleFilterAndDetail() {
        console.log(1111);
        setShowFilter(!showFilter);
        setShowDetail(!showDetail);
      }

      function closeInfoWindow() {
        if (showDetailsLink) {
          showDetailsLink.removeEventListener('click', toggleFilterAndDetail);
        }
        infowindow.close();
      }

      
      if (switch3== 2) {
        axios.get('/member/bookmark/check')
          .then(response => {
            let search_fv_store = response.data;
            search_fv_store.forEach(shop => {
              let markerPosition = new naver.maps.LatLng(shop.latitude, shop.longitude);
              
              var marker = new naver.maps.Marker({
                position: markerPosition,
                map,
                icon: {
                  url: Marker4, //아이콘 경로
                  size: new naver.maps.Size(48, 48), //아이콘 크기
                  origin: new naver.maps.Point(0, 0),
                  anchor: new naver.maps.Point(10, 40)
             }
              });
              let copy = shop
              setShopInfo(prevShopInfo => [...prevShopInfo, shop]);
              var contentString = [
                `<div class="iw_inner" id="showDetails" style="border-radius: 10px;">`,
                `<div style="width: 50%; height: 90px; "><img src="/shopimages/${shop.imageFilename}" alt=${shop.imageFilename} style="width: 100%; height: 90px; border-radius:20px; border:4px solid transparent;"></img></div>`,
                `<div><div style="margin-top: 15px; margin-left: 10px;"><a style="font-weight:700">${shop.shopName}</a></div>`,
                `<div style="margin-top: 15px; margin-top: 10px;"><span className="ct3" style="font-weight:700">${shop.rating}/5</span></div></div>`,
                `</div>`
              ].join('');
              var infowindow = new naver.maps.InfoWindow({
                content: contentString
              });
              function toggleFilterAndDetail() {
                console.log(1111);
                setShowFilter(!showFilter);
                setShowDetail(!showDetail);
              }

              function addClickListener() {
                // click 이벤트 리스너를 한 번만 추가
                naver.maps.Event.addListener(marker, "click", function (e) {
                  if (infowindow.getMap()) {
                    infowindow.close();
                    if (showDetailsLink) {
                      showDetailsLink.removeEventListener('click', toggleFilterAndDetail);
                    }
                  } else {
                    infowindow.open(map, marker);
                    const clickedShopName = shop.shopName;

                    // shopInfo 배열에서 같은 이름을 가진 가게를 찾습니다.
                    const selectedShopInfo = shopInfo.find(info => info.shopName === clickedShopName);

                    // 만약 해당 정보를 찾았다면 selectedShopInfo에 그 정보가 저장됩니다.
                    if (selectedShopInfo) {
                      setSelectedShop(selectedShopInfo);
                    }
                    const iwInner = document.getElementById('showDetails');
                    const image = iwInner.querySelector('img');
                    const a = iwInner.querySelector("a");
                    const ct3 = iwInner.querySelector("span");
                    iwInner.addEventListener('mouseover', function () {
                      image.style.backgroundColor = " #383737";
                      a.style.color = "white";
                      ct3.style.color = "white"
                    });

                    iwInner.addEventListener('mouseout', function () {
                      image.style.backgroundColor = 'white';
                      a.style.color = "black";
                      ct3.style.color = "black"
                    });
                    showDetailsLink = document.getElementById('showDetails');
                    // showDetailsLink에 대한 click 이벤트 리스너 추가
                    if (showDetailsLink) {
                      console.log(showDetailsLink);
                      showDetailsLink.clickListener = toggleFilterAndDetail;
                      showDetailsLink.addEventListener('click', showDetailsLink.clickListener);
                    }
                  }
                });
              }
              function closeInfoWindow() {
                if (showDetailsLink) {
                  showDetailsLink.removeEventListener('click', toggleFilterAndDetail);
                }
                infowindow.close();
              }

              addClickListener();

              document.querySelector('.detail_store_close').addEventListener('click', closeInfoWindow);

            });
          })
          .catch(error => {
            console.error('세션 데이터를 가져오는데 실패함', error);
          });
      }else if (switch3 == 1) {
        axios.get('/getShop/filter', {
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            distance: rangeValue,
            unit: "km",
            price: maxPrice,
            time: endTime,
            rating: maxStars.toFixed(1),
          }
        }).then(response => {//데이터를받아오는게성공시 다른페이지호출
          let search_store = response.data;
          console.log(response.data);
          search_store.forEach(shop => {
            let markerPosition = new naver.maps.LatLng(shop.latitude, shop.longitude);
            var marker = new naver.maps.Marker({
              position: markerPosition,
              map,
              icon: {
                url: Marker4, //아이콘 경로
                size: new naver.maps.Size(48, 48), //아이콘 크기
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(10, 40)
           }
            });
            let copy = shop
            setShopInfo(prevShopInfo => [...prevShopInfo, shop]);
            var contentString = [
              `<div class="iw_inner" id="showDetails" style="border-radius: 10px;">`,
              `<div style="width: 50%; height: 90px; "><img src="/shopimages/${shop.imageFilename}" alt=${shop.imageFilename} style="width: 100%; height: 90px; border-radius:20px; border:4px solid transparent;"></img></div>`,
              `<div><div style="margin-top: 15px; margin-left: 10px;"><a style="font-weight:700">${shop.shopName}</a></div>`,
              `<div style="margin-top: 15px; margin-top: 10px;"><span className="ct3" style="font-weight:700">${shop.rating}/5</span></div></div>`,
              `</div>`
            ].join('');
            var infowindow = new naver.maps.InfoWindow({
              content: contentString
            });
            function toggleFilterAndDetail() {
              console.log(1111);
              setShowFilter(!showFilter);
              setShowDetail(!showDetail);
            }

            function addClickListener() {
              // click 이벤트 리스너를 한 번만 추가
              naver.maps.Event.addListener(marker, "click", function (e) {
                if (infowindow.getMap()) {
                  infowindow.close();
                  if (showDetailsLink) {
                    showDetailsLink.removeEventListener('click', toggleFilterAndDetail);
                  }
                } else {
                  infowindow.open(map, marker);
                  const clickedShopName = shop.shopName;

                  // shopInfo 배열에서 같은 이름을 가진 가게를 찾습니다.
                  const selectedShopInfo = shopInfo.find(info => info.shopName === clickedShopName);

                  // 만약 해당 정보를 찾았다면 selectedShopInfo에 그 정보가 저장됩니다.
                  if (selectedShopInfo) {
                    setSelectedShop(selectedShopInfo);
                  }
                  const iwInner = document.getElementById('showDetails');
                  const image = iwInner.querySelector('img');
                  const a = iwInner.querySelector("a");
                  const ct3 = iwInner.querySelector("span");
                  iwInner.addEventListener('mouseover', function () {
                    image.style.backgroundColor = " #383737";
                    a.style.color = "white";
                    ct3.style.color = "white"
                  });

                  iwInner.addEventListener('mouseout', function () {
                    image.style.backgroundColor = 'white';
                    a.style.color = "black";
                    ct3.style.color = "black"
                  });
                  showDetailsLink = document.getElementById('showDetails');
                  // showDetailsLink에 대한 click 이벤트 리스너 추가
                  if (showDetailsLink) {
                    console.log(showDetailsLink);
                    showDetailsLink.clickListener = toggleFilterAndDetail;
                    showDetailsLink.addEventListener('click', showDetailsLink.clickListener);
                  }
                }
              });
            }
            function closeInfoWindow() {
              if (showDetailsLink) {
                showDetailsLink.removeEventListener('click', toggleFilterAndDetail);
              }
              infowindow.close();
            }

            addClickListener();

            document.querySelector('.detail_store_close').addEventListener('click', closeInfoWindow);

          });
        }).catch(error => {//데이터를받아오는게 실패시 오류 메세지출력하고 다시 login페이지 호출
          window.alert(error.response.data.result);
        })
      } else if (switch3 == 0) {
        // 예시 마커에 대한 클릭 리스너 추가
        axios.get('/ShopMarker')
          .then(response => {
            const shopInfo1 = response.data;
            shopInfo1.forEach(shop => {
              let markerPosition = new naver.maps.LatLng(shop.latitude, shop.longitude);
              var marker = new naver.maps.Marker({
                position: markerPosition,
                map,
                icon: {
                  url: Marker4, //아이콘 경로
                  size: new naver.maps.Size(48, 48), //아이콘 크기
                  origin: new naver.maps.Point(0, 0),
                  anchor: new naver.maps.Point(10, 40)
             }
              });
              let copy = shop
              setShopInfo(prevShopInfo => [...prevShopInfo, shop]);
              var contentString = [
                `<div class="iw_inner" id="showDetails" style="border-radius: 10px;">`,
                `<div style="width: 50%; height: 90px; "><img src="/shopimages/${shop.imageFilename}" alt=${shop.imageFilename} style="width: 100%; height: 90px; border-radius:20px; border:4px solid transparent;"></img></div>`,
                `<div><div style="margin-top: 15px; margin-left: 10px;"><a style="font-weight:700">${shop.shopName}</a></div>`,
                `<div style="margin-top: 15px; margin-top: 10px;"><span className="ct3" style="font-weight:700">${shop.rating}/5</span></div></div>`,
                `</div>`
              ].join('');
              var infowindow = new naver.maps.InfoWindow({
                content: contentString
              });
              function toggleFilterAndDetail() {
                console.log(1111);
                setShowFilter(!showFilter);
                setShowDetail(!showDetail);
              }

              function addClickListener() {
                // click 이벤트 리스너를 한 번만 추가
                naver.maps.Event.addListener(marker, "click", function (e) {
                  if (infowindow.getMap()) {
                    infowindow.close();
                    if (showDetailsLink) {
                      showDetailsLink.removeEventListener('click', toggleFilterAndDetail);
                    }
                  } else {
                    infowindow.open(map, marker);
                    const clickedShopName = shop.shopName;

                    // shopInfo 배열에서 같은 이름을 가진 가게를 찾습니다.
                    const selectedShopInfo = shopInfo.find(info => info.shopName === clickedShopName);

                    // 만약 해당 정보를 찾았다면 selectedShopInfo에 그 정보가 저장됩니다.
                    if (selectedShopInfo) {
                      setSelectedShop(selectedShopInfo);
                    }
                    const iwInner = document.getElementById('showDetails');
                    const image = iwInner.querySelector('img');
                    const a = iwInner.querySelector("a");
                    const ct3 = iwInner.querySelector("span");
                    iwInner.addEventListener('mouseover', function () {
                      image.style.backgroundColor = " #383737";
                      a.style.color = "white";
                      ct3.style.color = "white"
                    });

                    iwInner.addEventListener('mouseout', function () {
                      image.style.backgroundColor = 'white';
                      a.style.color = "black";
                      ct3.style.color = "black"
                    });
                    showDetailsLink = document.getElementById('showDetails');
                    // showDetailsLink에 대한 click 이벤트 리스너 추가
                    if (showDetailsLink) {
                      console.log(showDetailsLink);
                      showDetailsLink.clickListener = toggleFilterAndDetail;
                      showDetailsLink.addEventListener('click', showDetailsLink.clickListener);
                    }
                  }
                });
              }
              function closeInfoWindow() {
                if (showDetailsLink) {
                  showDetailsLink.removeEventListener('click', toggleFilterAndDetail);
                }
                infowindow.close();
              }

              addClickListener();

              document.querySelector('.detail_store_close').addEventListener('click', closeInfoWindow);

            });
          })
          .catch(error => {
            console.error('세션 데이터를 가져오는데 실패함', error);
          });
      }
      return () => {
        if (showDetailsLink) {
          showDetailsLink.removeEventListener('click', toggleFilterAndDetail);
        }
        closeInfoWindow();
      };
    });
  }, [search_store_switch]);
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
          //로그인한 사용자가 상업자라면 공지사항 알림 가져오기
          if (userData.role == "상업자") {
            axios.get('/manager/notice/getalarm')
              .then(response => {
                const alarmData = response.data;
                setNoticeAlarmInfo(alarmData);
                alarmData.map((alarm, index) => (
                  console.log(alarm)
                ));
              })
              .catch(error => {
                console.error('세션 데이터를 가져오는데 실패함', error);
              });
          }
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

  /*상세페이지 꾸미기*/
  let [search_switch1, setSearch_switch1] = useState(true);
  let [search_switch2, setSearch_switch2] = useState(false);
  let [tapmenu, setTapmenu] = useState(true);
  /*예약확인*/
  let [temp6, setTemp6] = useState(true);
  let [regervation, setRegervation] = useState([]);
  let [selectedregervationStores, setSelectedregervationStores] = useState([]);

  /*필터 꾸미기*/
  const [rangeValue, setRangeValue] = useState(0); // 초기 슬라이더 값

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  }

  const [maxPrice, setMaxPrice] = useState(0);
  const [maxPrice1, setMaxPrice1] = useState(0);
  function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const handleMaxPriceChange = (event) => {
    const inputValue = event.target.value;

    // 입력된 값이 0부터 100,000 사이일 때만 최대 가격을 업데이트
    if (/^\d+$/.test(inputValue) && parseInt(inputValue, 10) >= 0 && parseInt(inputValue, 10) <= 59999) {
      setMaxPrice(inputValue); // 문자열로 설정
      setMaxPrice1(addCommasToNumber(inputValue)); // 문자열로 설정
    }
  }

  const [endTime, setEndTime] = useState(0); // 초기값 설정 (예: 24시간 마감시간)

  const handleEndTimeChange = (event) => {
    const selectedTime = parseInt(event.target.value, 10);
    setEndTime(selectedTime);
  }

  const [maxStars, setMaxStars] = useState(0); // 최대 별점


  const handleMaxStarsChange = (event) => {
    const selectedMaxStars = parseInt(event.target.value, 10);
    setMaxStars(selectedMaxStars);
  }
  /*신뢰점수*/
  let [trust_popup, setTrust_popup] = useState(true);
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
                  <a onClick={() => {
                    if(a==0){
                      setSwitch3(2);
                      setSearch_store_switch(!search_store_switch);
                      setA(1);
                    }else if (a==1){
                      if(b==1){
                        setSwitch3(1);
                        setSearch_store_switch(!search_store_switch);
                        setB(0);
                      }else if(b==0){
                        setSwitch3(0);
                        setSearch_store_switch(!search_store_switch);
                      }
                      setA(0);
                    }
                  }} style={{ cursor: "pointer" }}>
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

              <div className={`filter`} style={{ width: "22%", borderRadius: "50px", height: "99%", backgroundColor: "white", boxShadow: '0px 2px 5px rgba(0, 0, 0, 1)' }}>
                <div className='filter_title' style={{ paddingTop: "50px", height: "5%", fontWeight: "600", fontSize: "40px", textAlign: "center" , marginBottom:"30px"}}>
                  필터
                </div>

                <div className='filter_contents' style={{ height: "95%" }}>
                
                  <div className='filter_distance' style={{ height: "19%" }}>
                    <h1 style={{ fontWeight: "700", fontSize: "30px", textAlign: "left", marginLeft: "50px"}}>거리</h1>
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={rangeValue}
                        onChange={handleRangeChange}
                        style={{ width: "80%", height: "80%", accentColor: "black" }}
                      />
                      
                      {rangeValue != 0 && (
                    <p style={{ fontWeight: "600", fontSize: "25px", height: "12%" }}>
                      선택된 거리: <span style={{ color: "gray",fontWeight: "700", fontSize: "40px" }}>{rangeValue} </span>Km</p>
                  )}
                </div>
                </div>
                  <div className='filter_price' style={{ height: "19%" }}>
                    <h1 style={{ fontWeight: "700", fontSize: "30px", textAlign: "left", marginLeft: "50px" }}>가격</h1>
                    <div >
                      <input
                        type="range"
                        min="0"
                        max="59999"
                        step="1000"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        style={{ width: "80%", height: "80%", accentColor: "black" }}
                      />
                      {maxPrice != 0 && (
                    <p style={{ fontWeight: "600", fontSize: "25px", height: "12%" }}>
                    최대 가격: <span style={{color: "gray",fontWeight: "700", fontSize: "40px" }}>{maxPrice1} </span>원</p>
                  )}
                </div>
                </div>
                      
                    
                  <div className='filter_endtime' style={{ height: "19%" }}>
                    <h1 style={{ fontWeight: "700", fontSize: "30px", textAlign: "left", marginLeft: "50px" }}>마감</h1>
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="24" // 예: 24시간 범위 설정
                        step="0.5" // 1시간씩 이동
                        value={endTime}
                        onChange={handleEndTimeChange}
                        style={{ width: "80%", height: "80%", accentColor: "black" }}
                      />
                      {endTime != 0 && (
                    <p style={{ fontWeight: "600", fontSize: "25px", height: "12%" }}>
                    마감까지 <span style={{color: "gray",fontWeight: "700", fontSize: "40px" }}>{endTime}</span> 시간 이상 남음</p>
                      )}
                      </div>
                  </div>
                  <div className='filter_star' style={{ height: "19%" }}>
                    <h1 style={{ fontWeight: "700", fontSize: "30px", textAlign: "left", marginLeft: "50px" }}>별점</h1>
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="5" // 0부터 5점까지 범위
                        step="0.1" // 0.1씩 이동 (선택적)
                        value={maxStars}
                        onChange={handleMaxStarsChange}
                        style={{ width: "80%", height: "80%" , accentColor: "black"}}
                      />
                      {maxStars != 0 && (
                    <p style={{ fontWeight: "600", fontSize: "25px", height: "12%" }}>
                    최대 별점 : <span style={{color: "gray",fontWeight: "700", fontSize: "40px" }}>{maxStars.toFixed(1)}</span></p>
                       )}
                      </div>
                  </div>
                  <div className='filter_btn'>
                    <button className="remove_regervation_Store" style={{ marginTop: "5px", padding: "10px 50px", borderRadius: "50px", border: "1px solid rgba(0,0,0,0.3)", cursor: "pointer", fontWeight: "700", fontSize: "25px" }} onClick={() => {
                       setSwitch3(1);
                       setSearch_store_switch(!search_store_switch);
                       setB(1);
                    }}>적용</button>
                  </div>
                </div>

              </div>

              <div style={{ width: "1%", height: "100%" }} ></div>

              <div style={{ width: "76%", height: "100%" }}>
                <div ref={mapContainer} style={{ width: "100%", height: "99%", borderRadius: "50px", boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)' }}>

                </div>
              </div>

              <div style={{ width: "1%", height: "100%" }} ></div>

              <div className='detail_store' style={{ width: "21%", borderRadius: "20px", height: "100%", boxShadow: "3px 3px 3px 3px gray" }}>
                <div style={{ width: "394px", height: "90px", marginTop: "10px", borderBottom: "1px solid gray" }}>
                  <div className='detail_store_close' style={{ position: "absolute", top: "50px", right: "370px", fontSize: "25px", cursor: "pointer" }} onClick={() => {
                    setShowFilter(!showFilter);
                    setShowDetail(!showDetail);
                  }}><ArrowBackIosIcon id={`${showFilter == true ? "aa" : null}`}></ArrowBackIosIcon></div>

                  <div className='detail_store_name'><span>{selectedShop ? selectedShop.shopName : '선택된 가게 없음'}</span></div>
                </div>
                <div className='detail_store_ex'>
                  <div className='detail_store_select' style={{ position: "fixed" }}>
                    <a className={`select_btn1 ${search_switch1 == true ? "select_btn1_open" : ""}`} onClick={() => {
                      if (search_switch2 == true) {
                        setSearch_switch1(true);
                        setSearch_switch2(false);
                        setTapmenu(true);
                      } else {

                      }
                    }}> home </a>
                    <a className={`select_btn2 ${search_switch2 == true ? "select_btn2_open" : ""}`} onClick={() => {
                      if (search_switch1 == true) {
                        setSearch_switch1(false);
                        setSearch_switch2(true);
                        setTapmenu(false);
                      } else {

                      }
                    }}> menu </a>
                  </div>
                  <div className={`find_text_id ${tapmenu == true ? "" : "tapmenu_hidden"}`} >
                    <div className='detail_store_img'></div>
                    <div className='detail_store_name' style={{ marginTop: "20px", borderTop: "1px solid rgb(225, 223, 223)", fontSize: "28px", fontWeight: "600", textAlign: "center" }}><span>{shopInfo.shopName}</span></div>
                    <div style={{ marginTop: "8px", marginBottom: "10px", textAlign: "center" }}><span style={{ fontSize: "20px", fontWeight: "600" }}>평점 : </span><span style={{ fontSize: "20px", color: "gray" }}>/5</span><StarBorderIcon style={{ marginBottom: "-2px" }}></StarBorderIcon></div>
                    <div style={{ paddingBottom: "20px", borderBottom: "1px solid rgb(225, 223, 223)", textAlign: "center", fontSize: "20px" }}></div>
                    <div style={{ textAlign: "left", fontSize: "20px", marginTop: "10px", borderBottom: "1px solid rgb(225, 223, 223)", paddingBottom: "10px" }}><WebAssetIcon style={{ marginLeft: "40px", marginBottom: "-6px", marginRight: "10px" }}></WebAssetIcon><a href="https://www.naver.com" style={{ textDecoration: "underline", color: "blue" }}></a></div>
                    <div style={{ textAlign: "left", fontSize: "20px", marginTop: "10px", borderBottom: "1px solid rgb(225, 223, 223)", paddingBottom: "10px" }}> <CallIcon style={{ marginLeft: "40px", marginBottom: "-6px", marginRight: "10px" }}></CallIcon><a></a></div>
                    <div><button className="fv_btn"><StarBorderIcon style={{ fontSize: "xxLarger", marginBottom: "-4px", marginRight: "15px" }}></StarBorderIcon><span>즐겨찾기</span></button></div>
                    {/* <div className='point' style={{marginTop:"10px", marginRight:"110px"}}> <span style={{fontSize:"18px", fontWeight:"600", paddingRight:"20px"}}> 평점 : </span> {[0,1,2,3,4].map((index) => (
                      <StarRateIcon
                        style={{marginBottom:"-4px"}}
                        key={index}
                        onClick={() => handleStarClick(index)}
                        className={`StarRateIcon ${index < rating ? 'checked' : ''}`}
                        size="35"
                      />))}
                    </div>
                    {console.log(score)} */}
                  </div>
                  <div className={`find_text_pw ${tapmenu == true ? "tapmenu_hidden" : ""}`} >

                  </div>
                </div>
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
            <a onClick={() => {
              axios.get('/item/reservation/getreservations')
                .then(response => {
                  setRegervation(response.data);
                  setTemp6(!temp6);
                })
                .catch(error => {
                  console.error('세션 데이터를 가져오는데 실패함', error);
                });

              setTemp6(!temp6);
            }} style={{ cursor: "pointer" }} ><span>예약 확인</span></a>
          </div>
          <div id="popsec3" style={{ cursor: "pointer", alignItems: "center", position: "relative" }}>
            <div style={{ alignItems: "center" }}>
              <span onClick={() => {
                setTrust_popup(!trust_popup);
              }}><span style={{ fontSize: "28px" }}></span>신뢰도</span>
              <div className={`${trust_popup == true ? "trust_popup" : null}`} style={{ backgroundColor: "white", height: `${10 * 64.8}px`, width: "30px", borderRadius: "50px", position: "absolute", top: "-438px", right: "-58px", boxShadow: "5px 5px 5px 5px gray", border: "1px solid black" }}>
                <div>{userInfo.trust}</div>
                <div style={{ backgroundColor: getBarColor(userInfo.trust), borderRadius: "20px", height: `${userInfo.trust * 60}px`, width: "20px", margin: "0 auto", marginTop: "5px", position: "absolute", bottom: "5px", left: "5px" }}></div> {/* 연두색 바 */}
              </div>
            </div>
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
            <span>즐겨찾기</span><span style={{ fontSize: "18px", textAlign: "right" }}><RoomIcon fontSize="small" />{shopsData.length}개</span>
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
          <div className="fv_store_list" style={{ marginTop: "20px", width: "100%", height: "70%" }}>
            {shopsData.map((store, index) => (
              <div key={index} className="fv_store" style={{ display: "flex", borderBottom: "2px solid rgba(0,0,0,0.3)", position: "relative" }}>
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
                      }
                    } else {
                      // 선택 해제된 경우, 해당 주소를 가진 항목을 배열에서 제거
                      setSelectedStores(prevStores => prevStores.filter(item => item.shopaddress !== address));
                    }
                  }}
                  style={{ position: "absolute", top: "0", right: "0", width: "25px", height: "25px", cursor: "pointer" }} />

              </div>
            ))}
          </div>
          <button className="remove_fv_Store" style={{ marginTop: "10px", padding: "10px 50px", borderRadius: "50px", border: "1px solid rgba(0,0,0,0.3)", cursor: "pointer", fontWeight: "700", fontSize: "25px" }} onClick={() => {
            console.log(selectedStores);
            axios.post('/member/bookmark/delete', selectedStores
            ).then(response => {//데이터를받아오는게성공시 다른페이지호출
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
                {alarm.shopname ? (
                  <a style={{ fontSize: "25px" }}><b>{alarm.shopname}</b></a>
                ) : (
                  <a style={{ fontSize: "25px" }}><b>{alarm.title}</b></a>
                )}
                <br></br>
                <a style={{ fontSize: "20px" }}>
                  {alarm.shopname
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

        <div id={`${temp6 == true ? "regervation_none" : "regervation_view"}`}>
          <span className="regervation_close" style={{ fontSize: "25px", position: "absolute", top: "10px", right: "19px", cursor: "pointer", padding: "0px 10px", fontSize: "25px", fontWeight: "700" }} onClick={() => {
            setTemp6(!temp6);
          }}>X</span>
          <div className='regervation_title' style={{ borderBottom: "2px solid rgba(0,0,0,0.3)", paddingBottom: "30px" }}>
            <span>예약 내역</span>
          </div>
          <div className="regervation_content" style={{ width: "90%", height: "70%", margin: "0 auto" }}>
            {regervation.map((store, index) => (
              <div key={index} className="regervation_store" style={{ display: "flex", borderBottom: "2px solid rgba(0,0,0,0.3)", position: "relative" }}>
                <div className='regervation_store_image'>
                  <img src={"/itemimages/" + `${store.image}`} alt={store.imagefilename} style={{ backgroundCover: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: "100px", float: "Left" }} />
                </div>
                <div style={{ width: "1000px", marginTop: "10px", lineHeight: "1.5" }}>
                  <div className='regervation_store_name' style={{ textAlign: "left" }}>
                    {store.shopname}
                  </div>
                  <div className='fv_store_address' style={{ fontSize: "15px" }}>
                    {store.shopaddress}
                  </div>

                  <div className='fv_store_address' style={{ display: "flex" }}>
                    <div>
                      {store.itemname}
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      수량: {store.number}
                    </div>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={selectedregervationStores.includes(store)}
                  onChange={(e) => {
                    let isChecked = e.target.checked;
                    let address = store.shopaddress;
                    if (isChecked) {
                      if (selectedregervationStores.some(item => item.shopaddress === address)) {
                        // 이미 선택된 주소인 경우, 아무것도 하지 않음
                      } else {
                        // 새로운 배열을 생성하여 선택된 항목을 추가
                        let copy = [...selectedregervationStores, store];
                        setSelectedregervationStores(copy);
                      }
                    } else {
                      // 선택 해제된 경우, 해당 주소를 가진 항목을 배열에서 제거
                      setSelectedregervationStores(prevStores => prevStores.filter(item => item.shopaddress !== address));
                    }
                  }}
                  style={{ position: "absolute", top: "0", right: "0", width: "25px", height: "25px", cursor: "pointer" }} />

              </div>
            ))}
          </div>
          <button className="remove_regervation_Store" style={{ marginTop: "20px", padding: "10px 50px", borderRadius: "50px", border: "1px solid rgba(0,0,0,0.3)", cursor: "pointer", fontWeight: "700", fontSize: "25px" }} onClick={() => {
            console.log(selectedregervationStores);
            axios.post('/item/reservation/cancel', selectedregervationStores
            ).then(response => {//데이터를받아오는게성공시 다른페이지호출
              window.alert("취소 완료");
              axios.get('/item/reservation/getreservations')
                .then(response => {
                  setRegervation(response.data);
                  setSelectedregervationStores([]);
                })
                .catch(error => {
                  console.error('세션 데이터를 가져오는데 실패함', error);
                });

            }).catch(error => {//데이터를받아오는게 실패시 오류 메세지출력하고 다시 login페이지 호출
              setSelectedregervationStores([]);
              window.alert(error.response.data.result);
            })
          }}>
            삭제 {selectedregervationStores.length}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home_user;