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
import Owner_noticeView from './pages/owner_noticeview.js';
import Owner_storelist from './pages/owner_storelist.js';
import Edit_member_information from "./pages/edit_member_information.js";
import Edit_member_information_social from "./pages/edit_member_information_social";
import axios from "axios";
import Marker4 from "./img/marker4.gif";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import CallIcon from '@mui/icons-material/Call';
import { TextField, Button, InputAdornment } from "@mui/material";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Home_owner from './pages/home_owner';
import StarRateIcon from '@mui/icons-material/StarRate';
import Ad_user from './pages/ad_user.js';
import Ad_user_trust from './pages/ad_user_trust.js';
import Ad_user_trust_content from './pages/ad_user_trust_content.js';
import Ad_businessman from './pages/ad_businessman.js';
import Ad_businessman_shop from './pages/ad_businessman_shop.js';
import Ad_businessman_item from './pages/ad_businessman_item.js';
import Ad_admin from './pages/ad_admin.js';
import Ad_inquiry from './pages/ad_inquiry.js';
import Ad_inquiry_wanswer from './pages/ad_inquiry_wanswer.js';
import Ad_inquiry_canswer from './pages/ad_inquiry_canswer.js';
import Ad_analysis_shop from './pages/ad_analysis_shop.js';
import Ad_analysis_shop_rating from './pages/ad_analysis_shop_rating.js';

function App() {
  const fileInput = useRef(null)
  /*지도*/
  /*지도에 현 위치 불러오기*/

  let [a, setA] = useState(0);
  let [b, setB] = useState(0);
  const [showFilter, setShowFilter] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [shopInfo, setShopInfo] = useState([]);
  const [selectedShop, setSelectedShop] = useState([]);
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
  /*상세 페이지*/
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [cViewVisible, setCViewVisible] = useState(false);
  const [reViewvisible, setReViewVisible] = useState(false);
  const [menuData, setMenuData] = useState([]);
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
        setShowFilter(!showFilter);
        setShowDetail(!showDetail);
      }

      function closeInfoWindow() {
        if (showDetailsLink) {
          showDetailsLink.removeEventListener('click', toggleFilterAndDetail);
        }
        infowindow.close();
      }

      if (switch3 == 1) {
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
               let formattedPhoneNumber = selectedShopInfo.shopTel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
               selectedShopInfo.shopTel=formattedPhoneNumber;
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

                    console.log(clickedShopName);
                    console.log(shopInfo1);

                    // shopInfo 배열에서 같은 이름을 가진 가게를 찾습니다.
                    const selectedShopInfo = shopInfo1.find(info => info.shopName === clickedShopName);

                    console.log(selectedShopInfo);

                    // 만약 해당 정보를 찾았다면 selectedShopInfo에 그 정보가 저장됩니다.
                    if (selectedShopInfo) {
                  let formattedPhoneNumber = selectedShopInfo.shopTel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                  selectedShopInfo.shopTel=formattedPhoneNumber;
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
  useEffect(() => {
    if (selectedShop) {
      axios.post('/item/getItems', selectedShop)
        .then(response => {
          console.log(11);
          console.log(response.data);
          const menuitem = response.data;
          setMenuData(menuitem);
        })
        .catch(error => {
          setMenuData([{ itemname: "나윤호", endtime: "10시간", image: "skdbsgh.png", itemnotice: "adsadsadsadsad", starttime: "11시간", cost: "1000", salecost: "500" }, { itemname: "나ㄴㅇㄹ윤호", endtime: "10시간", image: "skdbsgh.png", itemnotice: "adsadㅁㄴㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁsadsadsad", starttime: "11시간", cost: "1000", salecost: "500" }, { itemname: "나윤호", endtime: "10시간", image: "skdbsgh.png", itemnotice: "adsadsadsadsad", starttime: "11시간", cost: "1000", salecost: "500" }, { endtime: "10시간", image: "skdbsgh.png", itemnotice: "adsadsadsadsad", starttime: "11시간", cost: "1000", salecost: "500" }, { endtime: "10시간", image: "skdbsgh.png", itemnotice: "adsadsadsadsad", starttime: "11시간", cost: "1000", salecost: "500" }, { endtime: "10시간", image: "skdbsgh.png", itemnotice: "adsadsadsadsad", starttime: "11시간", cost: "1000", salecost: "500" }]);
          console.error('메뉴 데이터를 가져오는데 실패함', error);
        });
    } else {
      // 선택된 가게가 없을 경우 메뉴 데이터를 초기화
      setMenuData([]);
    }
  }, [selectedShop]);
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

  /*상세페이지 꾸미기*/
  let [search_switch1, setSearch_switch1] = useState(true);
  let [search_switch2, setSearch_switch2] = useState(false);
  let [tapmenu, setTapmenu] = useState(true);

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

    const checkOnlyOne1 = (checkThis) => {
    const checkboxes = document.getElementsByName('price')
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
        setMaxPrice(checkThis.value);
        setMaxPrice1(checkThis.value);
      }
    }
  }
  const [endTime, setEndTime] = useState(0); // 초기값 설정 (예: 24시간 마감시간)

  const handleEndTimeChange = (event) => {
    const selectedTime = parseInt(event.target.value, 10);
    setEndTime(selectedTime);
  }

  let [maxStars, setMaxStars] = useState(0); // 최대 별점

  //필터 별점 선택 
  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName('rating')
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
        setMaxStars(checkThis.value);
      }
    }
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
                        <a href="/login">
                          <LoginIcon fontSize="large" />
                        </a>
                      </li>
                      <li>
                        <a href="sign_up" style={{ cursor: "pointer" }}>
                          <PersonAddAltIcon fontSize="large" />
                        </a>
                      </li>
                    </ul></nav>
                </header>
                <div style={{ width: "100%", height: "25px" }}></div>
                <div style={{ width: "100%", height: "91%", overflow: "hidden" }}>
                  <div className={`contents_slide ${showFilter == true ? "" : "filter_slide"}`} style={{ width: "140%", height: "100%", display: "flex" }}>

                    <div style={{ width: "1%", height: "100%" }}></div>

                    <div className={`filter`} style={{ width: "22%", borderRadius: "50px", height: "99%", backgroundColor: "white", boxShadow: '0px 2px 5px rgba(0, 0, 0, 1)' }}>
                <div className='filter_title' style={{ paddingTop: "50px", height: "5%", fontWeight: "600", fontSize: "40px", textAlign: "center", marginBottom: "30px" }}>
                  필터
                </div>

                <div className='filter_contents' style={{ height: "83%" }}>

                  <div className='filter_distance' style={{ height: "20%" }}>
                    <h1 style={{ fontSize: "20px", textAlign: "left", marginLeft: "30px", color: "#929292" }}>거리</h1>
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
                        <p style={{ fontWeight: "600", fontSize: "20px", color: "#828282" }}>
                          선택된 거리: <span style={{ color: "black", fontWeight: "700", fontSize: "22px" }}>{rangeValue} </span>Km</p>
                      )}
                    </div>
                  </div>
                  <div className='filter_price' style={{ height: "40%" }}>
                    <h1 style={{ fontSize: "20px", textAlign: "left", marginLeft: "30px", color: "#929292" }}>가격</h1>
                    <div>
                      <div style={{ marginBottom: "15px" }}>
                        <input
                          id="ft_price_btn1"
                          type="checkbox"
                          name='price'
                          value='10000'
                          onChange={(e) => {
                            checkOnlyOne1(e.target);
                          }}
                        /><label for="ft_price_btn1"><span style={{ fontWeight: "600" }}> ~ 10000원</span></label>
                      </div>
                      <div style={{ marginBottom: "15px" }}>
                        <input
                          id="ft_price_btn2"
                          type="checkbox"
                          name='price'
                          value='30000'
                          onChange={(e) => {
                            checkOnlyOne1(e.target);
                          }}
                        /><label for="ft_price_btn2"><span style={{ fontWeight: "600" }}> ~ 30000원</span></label>
                      </div>
                      <div style={{ marginBottom: "15px" }}>
                        <input
                          id="ft_price_btn3"
                          type="checkbox"
                          name='price'
                          value='59000'
                          onChange={(e) => {
                            checkOnlyOne1(e.target);
                          }}
                        /><label for="ft_price_btn3"><span > ~ 59000원</span></label>
                      </div>
                    </div>
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
                        <p style={{ fontWeight: "600", fontSize: "20px", color: "#828282" }}>
                          최대 가격: <span style={{ color: "black", fontWeight: "700", fontSize: "22px" }}>{maxPrice1} </span>원</p>
                      )}
                    </div>
                  </div>


                  <div className='filter_endtime' style={{ height: "40%" }}>
                    <h1 style={{ fontSize: "20px", textAlign: "left", marginLeft: "30px", color: "#929292" }}>마감</h1>
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
                        <p style={{ fontWeight: "600", fontSize: "20px", color: "#828282" }}>
                          마감까지 <span style={{ color: "black", fontWeight: "700", fontSize: "22px" }}>{endTime}</span> 시간 이상 남음</p>
                      )}
                    </div>
                  </div>
                  <div className='filter_star' style={{ height: "50%" }}>
                    <h1 style={{ fontSize: "20px", textAlign: "left", marginLeft: "30px", color: "#929292" }}>별점</h1>
                    <div style={{ marginRight: "25px" }}>
                      <input
                        id="ft_star_btn5"
                        type="checkbox"
                        name='rating'
                        value='5'
                        onChange={(e) => {
                          checkOnlyOne(e.target);
                        }}
                      /><label for="ft_star_btn5"><span><StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' /></span></label>
                      <br />
                      <input
                        id="ft_star_btn4"
                        type="checkbox"
                        name='rating'
                        value='4'
                        onChange={(e) => {
                          checkOnlyOne(e.target);

                        }}
                      /><label for="ft_star_btn4"><span><StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarBorderIcon style={{ fontSize: "2rem", fontWeight: "100", color: "#828282" }} />
                      </span></label>
                      <br />
                      <input
                        id="ft_star_btn3"
                        type="checkbox"
                        name='rating'
                        value='3'
                        onChange={(e) => {
                          checkOnlyOne(e.target);

                        }}
                      /><label for="ft_star_btn3"><span><StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarBorderIcon style={{ fontSize: "2rem", fontWeight: "100", color: "#828282" }} />
                        <StarBorderIcon style={{ fontSize: "2rem", fontWeight: "100", color: "#828282" }} />
                      </span></label>
                      <br />
                      <input
                        id="ft_star_btn2"
                        type="checkbox"
                        name='rating'
                        value='2'
                        onChange={(e) => {
                          checkOnlyOne(e.target);

                        }}
                      /><label for="ft_star_btn2"><span><StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarBorderIcon style={{ fontSize: "2rem", fontWeight: "100", color: "#828282" }} />
                        <StarBorderIcon style={{ fontSize: "2rem", fontWeight: "100", color: "#828282" }} />
                        <StarBorderIcon style={{ fontSize: "2rem", fontWeight: "100", color: "#828282" }} />
                      </span></label>
                      <br />
                      <input
                        id="ft_star_btn1"
                        type="checkbox"
                        size="larger"
                        name='rating'
                        value='1'
                        onChange={(e) => {
                          checkOnlyOne(e.target);

                        }}
                      /><label for="ft_star_btn1"><span><StarRateIcon style={{ fontSize: "2rem" }} className='filterstar' />
                        <StarBorderIcon style={{ fontSize: "2rem", fontWeight: "100", color: "#828282" }} />
                        <StarBorderIcon style={{ fontSize: "2rem", fontWeight: "100", color: "#828282" }} />
                        <StarBorderIcon style={{ fontSize: "2rem", fontWeight: "100", color: "#828282" }} />
                        <StarBorderIcon style={{ fontSize: "2rem", fontWeight: "100", color: "#828282" }} />
                      </span></label>

                      {maxStars != 0 && (
                        <p style={{ fontWeight: "600", fontSize: "20px", color: "#828282" }}>
                          최대 별점 : <span style={{ color: "black", fontWeight: "700", fontSize: "22px" }}>{maxStars}</span></p>
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

                    <div style={{ width: "49.5%", height: "100%" }}>
                      <div ref={mapContainer} style={{ width: "100%", height: "99%", borderRadius: "50px", boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)' }}>

                      </div>
                    </div>

                    <div style={{ width: "1%", height: "100%" }} ></div>

                    <div className='detail_store' style={{ width: "20%", borderRadius: "20px", height: "100%", boxShadow: "3px 3px 3px 3px gray", position: "relative" }}>
                      <div style={{ width: "100%", height: "90px", marginTop: "10px", borderBottom: "1px solid gray" }}>
                        <div className='detail_store_close' style={{ position: "absolute", top: "50px", left: "20px", fontSize: "25px", cursor: "pointer" }} onClick={() => {
                          setShowFilter(!showFilter);
                          setShowDetail(!showDetail);
                        }}><ArrowBackIosIcon id={`${showFilter == true ? "aa" : null}`}></ArrowBackIosIcon></div>

                        <div className='detail_store_name'><span>{selectedShop ? selectedShop.shopName : '선택된 가게 없음'}</span></div>
                      </div>
                      <div className='detail_store_ex1'>
                        <div className='detail_store_select'>
                          <div className={`select_btn1 ${search_switch1 == true ? "select_btn1_open" : ""}`} onClick={() => {
                            if (search_switch2 == true) {
                              setSearch_switch1(true);
                              setSearch_switch2(false);
                              setTapmenu(true);
                            } else {

                            }
                          }}> home </div>
                          <div className={`select_btn2 ${search_switch2 == true ? "select_btn2_open" : ""}`} onClick={() => {
                            if (search_switch1 == true) {
                              setSearch_switch1(false);
                              setSearch_switch2(true);
                              setTapmenu(false);
                            } else {

                            }
                          }}> menu </div>
                        </div>
                        <div className={`find_text_id ${tapmenu == true ? "" : "tapmenu_hidden"}`} >

                          <div className='detail_store_img'><img src={"/shopimages/" + `${selectedShop.imageFilename}`} alt={selectedShop.imageFilename} style={{ backgroundCover: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: "300px" }}></img></div>
                          <div className='detail_store_name' style={{ marginTop: "20px", borderTop: "1px solid rgb(225, 223, 223)", fontSize: "28px", fontWeight: "600", textAlign: "center" }}><span>{selectedShop.shopame}</span></div>
                          <div style={{ marginTop: "15px", textAlign: "center" }}><span style={{ fontSize: "20px", fontWeight: "600" }}>평점 : {selectedShop.rating}</span><span style={{ fontSize: "20px", color: "gray" }}>/5</span><StarBorderIcon style={{ marginBottom: "-2px" }}></StarBorderIcon></div>
                          <div style={{ paddingBottom: "20px", borderBottom: "1px solid rgb(225, 223, 223)", textAlign: "center", fontSize: "20px" }}></div>
                          <div style={{ textAlign: "left", fontSize: "20px", marginTop: "10px", borderBottom: "1px solid rgb(225, 223, 223)", paddingBottom: "10px" }}><WebAssetIcon style={{ marginLeft: "40px", marginBottom: "-6px", marginRight: "10px" }}></WebAssetIcon><a href="https://www.naver.com" style={{ textDecoration: "underline", color: "blue" }}>{selectedShop.shopWebsite}</a></div>
                          <div style={{ textAlign: "left", fontSize: "20px", marginTop: "10px", borderBottom: "1px solid rgb(225, 223, 223)", paddingBottom: "10px" }}> <CallIcon style={{ marginLeft: "40px", marginBottom: "-6px", marginRight: "10px" }}></CallIcon><a>{selectedShop.shopTel}</a></div>
                          <div><button className="fv_btn" onClick={() => {
                            if (selectedShop) {
                              axios.post('/member/bookmark/registration', selectedShop)
                                .then((response) => {
                                  window.alert("즐겨찾기 추가 완료");
                                  window.location.href = response.data;
                                })
                                .catch(error => {
                                  window.alert(error.response.data.result);
                                })
                            }
                          }
                          }><StarBorderIcon style={{ fontSize: "xxLarger", marginBottom: "-4px", marginRight: "15px" }}></StarBorderIcon><span>즐겨찾기</span></button></div>
                        </div>
                        <div className={`detail_store_ex ${tapmenu == true ? "tapmenu_hidden" : ""}`}>
                          <ul>
                            {menuData.map((menuitem, index) => (
                              <li key={index} style={{ width: "100%", height: "220px", marginLeft: "-20px", marginTop: "20px", borderBottom: "1px solid #eae7e7" }}>
                                <div style={{ width: "37%", height: "180px", float: "left", borderRadius: "20px", marginRight: "10px" }}><img src={"/itemimages/" + `${menuitem.image}`} alt={menuitem.image} style={{ backgroundCover: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: "100%" }}></img></div>
                                <div style={{ width: "45%", marginLeft: "125px", fontSize: "25px", fontWeight: "600", textAlign: "left", paddingLeft: "20px", cursor: "pointer" }}><span onClick={() => {
                                  setTimeout(() => {
                                    setSelectedMenuItem(menuitem);
                                    setCViewVisible(true);
                                    setReViewVisible(false);
                                  }, 100);
                                }}>{menuitem.itemname}</span></div>
                                <div style={{ width: "55%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "rgb(150, 150, 150)" }}>{menuitem.itemnotice}</div>
                                <div style={{ width: "100%", marginTop: "10px", marginLeft: "-25px" }}><AccessAlarmIcon style={{ marginBottom: "-25px" }}></AccessAlarmIcon> {menuitem.starttime} </div>
                                <div> ~ </div>
                                <div style={{ width: "100%", marginLeft: "5px" }}><span> {menuitem.endtime} </span></div>
                                <div style={{ marginLeft: "-80px", width: "100%", height: "40px", lineHeight: "40px" }}><span style={{ textAlign: "right", textDecoration: "line-through", fontSize: "20px", fontWeight: "600", color: "rgb(150, 150, 150)", marginRight: "5px" }}>{menuitem.cost}</span><span style={{ fontSize: "25px", fontWeight: "600", color: "Red" }}>{menuitem.salecost}원</span></div>
                                <button style={{ width: "150px", height: "40px", borderRadius: "20px", backgroundColor: "black", color: "white", fontSize: "18px", fontWeight: "600", float: "right", cursor: "pointer" }} onClick={() => {
                                  setTimeout(() => {
                                    setSelectedMenuItem(menuitem);
                                    setReViewVisible(true);
                                    setCViewVisible(false);
                                  }, 100);
                                }}><AddShoppingCartIcon style={{ marginBottom: "-5px", marginRight: "5px" }}></AddShoppingCartIcon>예약하기</button>
                              </li>
                            ))}
                          </ul>
                          <div className={`c_view ${cViewVisible ? 'c_view_visible' : ''}`}>
                            <div className="c_view_close" onClick={() => {
                              setTimeout(() => {
                                setCViewVisible(false);
                              }, 100)
                              setSelectedMenuItem(null);
                            }}> </div>
                            <div style={{ marginTop: "30px" }}>
                              {selectedMenuItem && (
                                <div>
                                  <div style={{ marginLeft: "8px", width: "98%", height: "280px", borderRadius: "30px", boxShadow: "inset 0 10px 10px -10px #333,inset 0 -10px 10px -10px #333" }}><img src={"/itemimages/" + `${selectedMenuItem.image}`} alt={selectedMenuItem.image} style={{ backgroundCover: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: "100%" }}></img></div>
                                  <div style={{ width: "85%", height: "auto", border: "1px solid rgb(150,150,150)", borderRadius: "7px", marginTop: "-20px", margin: "0 auto" }}>
                                    <div style={{ margin: "20px 0px", paddingBottom: "20px", borderBottom: "1px solid rgb(195, 192, 192)" }}>
                                      <span style={{ fontSize: "35px", fontWeight: "600" }}>{selectedMenuItem.itemname}</span>
                                    </div>
                                    <div style={{ paddingBottom: "10px", borderBottom: "1px solid rgb(195, 192, 192)" }}>
                                      <div style={{ paddingBottom: "10px" }}>
                                        <span style={{ fontSize: "25px", fontWeight: "600" }}>가격 : </span><span style={{ textAlign: "right", textDecoration: "line-through", fontSize: "20px", fontWeight: "600", color: "rgb(150, 150, 150)", marginRight: "5px" }}>{selectedMenuItem.cost}</span>
                                        <span style={{ fontSize: "25px", fontWeight: "600", color: "Red" }}>{selectedMenuItem.salecost}원</span>
                                      </div>
                                      <button style={{ width: "150px", height: "50px", borderRadius: "20px", backgroundColor: "black", color: "white", fontSize: "20px", fontWeight: "600", cursor: "pointer" }} onClick={() => {
                                        setTimeout(() => {
                                          setSelectedMenuItem(selectedMenuItem);
                                          setReViewVisible(true);
                                          setCViewVisible(false);
                                        }, 100);
                                      }}><AddShoppingCartIcon style={{ marginBottom: "-5px", marginRight: "5px" }}></AddShoppingCartIcon>예약하기</button>
                                      <span style={{ fontSize: "18px", marginLeft: "10px" }}>남은 수량 : {selectedMenuItem.quantity} </span>
                                    </div>
                                    <div style={{ fontSize: "18px", color: "rgb(95,95,95)", padding: "50px 0px", marginLeft: "40px", width: "80%", height: "auto", wordBreak: "break-all" }}>{selectedMenuItem.itemnotice}</div>
                                    <div>
                                      <div style={{ width: "100%", marginTop: "10px", marginLeft: "-5px", fontSize: "20px", marginBottom: "10px" }}><AccessAlarmIcon style={{ marginBottom: "-7px" }}></AccessAlarmIcon> {selectedMenuItem.starttime} ~ <span>{selectedMenuItem.endtime}</span></div>
                                      <div style={{ width: "100%", marginLeft: "0", fontSize: "20px" }}></div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={`re_view ${reViewvisible ? 're_view_visible' : ''}`}>
                            <div className="re_view_close" onClick={() => {
                              setTimeout(() => {
                                setReViewVisible(false);
                              }, 100)
                            }}> </div>
                            {selectedMenuItem && (
                              <div style={{ marginTop: "30px" }}>
                                <div style={{ width: "98%", height: "280px", backgroundColor: "white", borderRadius: "5px", border: "1px solid rgb(150,150,150)", padding: "10px 0px 0px 10px" }}>
                                  <div style={{ width: "37%", height: "50%", borderRadius: "20px", float: "left" }}><img src={"/itemimages/" + `${selectedMenuItem.image}`} alt={selectedMenuItem.image} style={{ backgroundCover: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: "100%" }}></img>
                                  </div>
                                  <div style={{ float: "left", margin: "20px 0px 0px 20px" }}><span style={{ fontSize: "25px", fontWeight: "600" }}>{selectedMenuItem.itemname}</span>
                                  </div>
                                  <div style={{ width: "55%", padding: "10px 0px 0px 20px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "rgb(150, 150, 150)" }}>{selectedMenuItem.itemnotice}</div>
                                  <div style={{ padding: "10px 0px 30px 0px" }}>
                                    <span style={{ textDecoration: "line-through", fontSize: "20px", fontWeight: "600", color: "rgb(150, 150, 150)", marginRight: "5px" }}>{selectedMenuItem.cost}</span>
                                    <span style={{ fontSize: "25px", fontWeight: "600", color: "Red" }}>{selectedMenuItem.salecost}원</span>
                                  </div>
                                  <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ fontWeight: "700", marginTop: "18px" }}>수량 : </div>
                                    <TextField
                                      placeholder='예약 하실 수량을 입력'
                                      required
                                      name="quantity"
                                      onChange={(e) => {
                                        setQuantity(e.target.value);
                                      }}
                                      style={{ marginLeft: "10px" }}
                                    ></TextField>
                                  </div>
                                  <div onClick={() => {
                                    const formData = new FormData();

                                    formData.append('memberidx', userInfo.memberIdx);
                                    formData.append('shopidx', selectedShop.shopidx);
                                    formData.append('itemidx', selectedMenuItem.itemidx);
                                    formData.append('number', quantity);
                                    formData.append('itemname', selectedMenuItem.itemname);
                                    formData.append('shopname', selectedShop.shopName);

                                    axios.post('/item/reservation', formData)
                                      .then((response) => {

                                        window.alert("예약 완료");
                                        window.location.href = response.data;
                                      })
                                      .catch(error => {
                                        console.log(error);
                                        window.alert(error.response.data.result);
                                      })
                                    setReViewVisible(false);
                                    setSelectedMenuItem(null);
                                  }} style={{ cursor: "pointer", width: "150px", height: "40px", borderRadius: "20px", backgroundColor: "black", color: "white", fontSize: "18px", fontWeight: "600", margin: "0 auto", marginTop: "20px" }}><span style={{ lineHeight: "2" }}>[ SUBMIT ]</span></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "1%", height: "100%" }} ></div>
                  </div>
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
        <Route>
          <Route path="/owner_notice" element={<div><Owner_notice /></div>}></Route>
          <Route path="/owner_noticeview/:id" element={<Owner_noticeView />} />
        </Route>
        <Route path='*' element={<div>없는 페이지</div>} />
        <Route path="/owner_storelist" element={<div>
          <Owner_storelist />
        </div>} />
        <Route path="/edit_member_information" element={<div>
          <Edit_member_information />
        </div>} />
        <Route path="/edit_member_information_social" element={<div>
          <Edit_member_information_social />
        </div>} />
        <Route path="/home_owner" element={<div>
          <Home_owner />
        </div>} />
        <Route path="/ad_user" element={<div>
          <Ad_user />
        </div>} />
        <Route path="/ad_user_trust" element={<div>
          <Ad_user_trust />
        </div>} />
        <Route path="/ad_user_trust_content" element={<div>
          <Ad_user_trust_content />
        </div>} />
        <Route path="/ad_businessman" element={<div>
          <Ad_businessman />
        </div>} />
        <Route path="/ad_businessman_shop" element={<div>
          <Ad_businessman_shop />
        </div>} />
        <Route path="/ad_businessman_item" element={<div>
          < Ad_businessman_item />
        </div>} />
        <Route path="/ad_admin" element={<div>
          < Ad_admin />
        </div>} />
        <Route path="/ad_inquiry" element={<div>
          < Ad_inquiry />
        </div>} />
        <Route path="/ad_inquiry_wanswer" element={<div>
          < Ad_inquiry_wanswer />
        </div>} />
        <Route path="/ad_inquiry_canswer" element={<div>
          < Ad_inquiry_canswer />
        </div>} />
        <Route path="/ad_analysis_shop" element={<div>
          < Ad_analysis_shop />
        </div>} />
        <Route path="/ad_analysis_shop_rating" element={<div>
          < Ad_analysis_shop_rating />
        </div>} />
      </Routes>
    </div>
  );
}

export default App;