import React, { useState } from 'react';
import './../App.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditNoteIcon from '@mui/icons-material/EditNote';
import axios from "axios";
import { TextField, Button, InputAdornment } from "@mui/material";
import Avatar from 'react-avatar';
import StoreIcon from '@mui/icons-material/Store';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
function Owner_Addmenu() {
    let [temp, setTemp] = useState(true);
    let [temp1, setTemp1] = useState(true);
    let [recall, setRecall] = useState(false);
    let [temp2, setTemp2] = useState(true);
    let [store_img, setStore_img] = useState("");
    let navigate = useNavigate();
    function switchTemp() {
        setTemp(!temp);
    }
    const fileInput = useRef(null);
    let [temp3, setTemp3] = useState(true);
    let [shopsData, setShopsData] = useState([]);
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
    /*파일 찾기*/
    const openFileDialog = () => {
        document.getElementById('fileInput').click();
    };
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    /*사업자가 등록한 가게*/
    let [userStore, setUser_store] = useState([]);
    useEffect(() => {
        axios.get('/getMyShop')
            .then(response => {
                const userStore = response.data;
                if (userStore.redirect) {
                    console.log("페이지 이동");
                    window.location.href = userStore.redirect;
                } else {
                    setUser_store(userStore);
                    console.log("세션데이터가 존재");
                }
            }, [userInfo])
            .catch(error => {
                console.error('세션 데이터를 가져오는데 실패함', error);
            });
    }, [])
    /*가게선택후 메뉴가져오기*/
    let [selectedValue, setSelectedValue] = useState("select1");
    let [selectedStore, setSelectedStore] = useState("select2");
    let [menuData, setMenuData] = useState([]);
    let [menu_count, setMenu_count] = useState("");
    useEffect(() => {

        if (selectedValue !== 'select1' && selectedStore != "select2") {
            // 이곳에서 API 요청 등을 실행
            console.log(selectedStore);
            axios.post('/item/getItems', {

                shopName: selectedStore.shopname,
                shopTel: selectedStore.shoptel,
                shopAddress: selectedStore.shopaddress,
                shopWebsite: selectedStore.shopwebsite,
                imageFilename: selectedStore.imagefilename,
                ownerIdx: selectedStore.owneridx,
                latitude: selectedStore.latitude,
                longitude: selectedStore.longitude,
                promotionText: selectedStore.promotionText


            }).then((response) => {
                const menudata = response.data;
                setMenuData(menudata);
                setMenu_count(menudata.length);
            }).catch(function () {
                // 에러 처리 등
            });
        }
    }, [selectedValue, selectedStore])

    /*메뉴추가*/
    const [menuName, setMenuName] = useState("");
    const [menu_explanation, setMenu_explanation] = useState("");
    const [menu_price, setMenu_price] = useState("");
    const [menu_price_discount, setMenu_price_discount] = useState("");
    const [menuimg, setMenuimg] = useState("");
    const [category, setCategory] = useState('');
    const [discountStartTime, setDiscountStartTime] = useState('');
    const [discountEndTime, setDiscountEndTime] = useState('');
    const [quantity, setQuantity] = useState('');

    /*시간설정*/
    const handleDiscountStartTimeChange = (newTime) => {
        setDiscountStartTime(newTime);
    };
    const handleDiscountEndTimeChange = (newTime) => {
        setDiscountEndTime(newTime);
    };
    return (
        <div>
            <div className='owner_addmenu_pageWrap' >
                <header id='header' className={`${temp1 == true ? "" : "header_hidden"}`} style={{
                    backgroundColor: 'white', // 헤더 배경색
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // 그림자 효과
                    position: 'sticky', // 스크롤과 함께 고정
                    top: 0, // 화면 상단에 고정
                    zIndex: 1, // 다른 요소 위에 나타나도록 설정
                    borderRadius: "20px"
                }}>
                    <div className='logo'><a href="/owner_main_page">재고 30 </a></div>
                    <nav className='nav'>
                        <ul>
                            <li>
                                <a onClick={() => {
                                    setTemp(switchTemp);
                                }} style={{ cursor: "pointer" }} href='/owner_storelist'>
                                    가게등록
                                </a>
                            </li>
                            <li>
                                <a href="/owner_addmenu" style={{ cursor: "pointer" }}>
                                    상품등록
                                </a>
                            </li>
                            <li>
                                <a href="/owner_notice">
                                    공지사항
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    로그아웃
                                </a>
                            </li>
                            <li>
                                <a className='mypages' style={{ cursor: "pointer" }} onClick={() => {
                                    setTemp1(!temp1);
                                }}>
                                    <AccountCircleIcon fontSize="large" /> <span>{userInfo.nickname}</span>
                                </a>
                            </li>
                        </ul></nav>
                </header>
                <div className='addmenu_back'  >
                    <div className='addmenu_header'>
                        <span>상품 등록 {'>'}
                        </span>
                        <select value={selectedValue} onChange={(e) => {
                            setSelectedStore(userStore.find(store => store.shopname === e.target.value));

                            setSelectedValue(e.target.value)

                            // selectedStore에 선택한 가게의 객체가 저장됩니다. 가게이름으로 찾기
                        }}>
                            <option value="select">Select a your store</option>
                            {userStore.map((store, index) => (
                                <option value={store.shopname} key={index}>
                                    {store.shopname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='menucont'>
                        <span><EditNoteIcon fontSize="large" style={{ paddingTop: "20px" }} /> 메뉴 관리 {`>`} 메뉴 개수 [ {menu_count} 개]</span>
                        <button className='addmenu_btn' onClick={() => {
                            setTemp2(!temp2);
                        }} style={{ cursor: "pointer" }}>
                            <span>메뉴 추가</span>
                        </button>
                    </div>
                    <div className='addmenu'>
                        <div className='addmenu_title'>
                            <span>30메뉴</span>
                        </div>
                        <div className='itemlist'>
                            <ul>
                                {/* menuData 배열을 사용하여 가게 데이터를 동적으로 렌더링 */}
                                {menuData.map((menu, index) => (
                                    <li key={index}>
                                        {/* 각 가게 데이터에 대한 표시 */}
                                        <div className='item'>
                                            <div className='item_img' style={{ width: "150px", height: "150px", backgroundColor: "blue" }}>{menu.image}</div>
                                            <div className='itme_name'>{menu.itemname}</div>
                                            <div className='item_ex'>{menu.itemnotice}</div>
                                            <div className='item_pr'>{menu.cost}</div>
                                            <div className='item_dis'>{menu.salecost}</div>
                                            <div className='item_btn'><button className='item_change_btn'><span>수정</span></button><button className='item_delete_btn'><span>삭제</span></button></div>
                                        </div>
                                        {/* 이미지 표시 등 추가 정보 표시 */}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
                <footer id="footer" className={`${temp1 == true ? "" : "footer_hidden"}`} style={{
                    backgroundColor: 'white', // 헤더 배경색
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // 그림자 효과
                    zIndex: 1, // 다른 요소 위에 나타나도록 설정
                    borderRadius: "20px"
                }}>
                    <div className='footer1'><a href="/">재고 30</a></div>
                    <div className='footer2'>개인정보 및 보호정책 등</div>
                </footer>
            </div>
            <div className={`${temp2 == true ? "addpop_view_none" : "addpop_view"}`} >
                <div className='addpop_title'>
                    <span>메뉴 추가</span>
                </div>
                <div className='addmenu_name' >
                    <span>메뉴 이름</span><span style={{ color: "red" }}>(필수)</span>
                    <TextField
                        style={{ width: "400px" }}
                        placeholder='메뉴 이름을 입력해주세요'
                        autoFocus
                        name="menuname"
                        required
                        onChange={(e) => {
                            setMenuName(e.target.value);
                        }}></TextField>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <span>상품 종류</span><span style={{ color: "red" }}>(필수)</span>
                    <TextField
                        style={{ width: "340px" }}
                        placeholder='상품 종류를 입력해주세요'
                        required
                        name="category"
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                    ></TextField>
                </div>
                <div className='addmenu_ex' style={{ position: "relative" }}>
                    <span style={{ fontSize: "20px", float: "left", marginLeft: "28px" }}>메뉴 설명 &nbsp;&nbsp;</span>
                    <TextField
                        style={{ width: "435px" }}
                        placeholder='상품 설명를 입력해주세요'
                        multiline
                        name="menu_explanation"
                        rows={3}
                        inputProps={{
                            style: {
                                height: "100px",
                            },
                        }}
                        required
                        onChange={(e) => {
                            setMenu_explanation(e.target.value);
                        }}
                    ></TextField>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <span>할인 시작 시간</span><span style={{ color: "red" }}>(필수)&nbsp;&nbsp;</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            value={discountEndTime}
                            onChange={handleDiscountEndTimeChange}
                            renderInput={(params) => (
                                <TextField
                                    style={{ width: "349px", marginRight: "10px" }}
                                    placeholder='할인 시작 시간을 입력해주세요'
                                    autoFocus
                                    name="discountEndTime"
                                    required
                                    {...params}
                                />
                            )}
                            ampm={false} // AM/PM 선택 비활성화
                            format="YYYY-MM-DD HH:mm" // 원하는 날짜 및 시간 형식 설정
                        />
                    </LocalizationProvider>
                    <div style={{ position: "absolute", top: "80px", right: "20px" }}>
                        <span>할인 마감 시간</span><span style={{ color: "red" }}>&nbsp;&nbsp;(필수)&nbsp;&nbsp;&nbsp;</span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            value={discountEndTime}
                            onChange={handleDiscountStartTimeChange}
                            renderInput={(params) => (
                                <TextField
                                    style={{ width: "349px", marginRight: "10px" }}
                                    placeholder='할인 마감 시간을 입력해주세요'
                                    autoFocus
                                    name="discountEndTime"
                                    required
                                    {...params}
                                />
                            )}
                            ampm={false} // AM/PM 선택 비활성화
                            format="YYYY-MM-DD HH:mm" // 원하는 날짜 및 시간 형식 설정
                        />
                    </LocalizationProvider>
                    </div>
                </div>

                <div className='addmunu_price' style={{ marginTop: "80px" }}>
                    <span>메뉴 가격</span><span style={{ color: "red" }}>(필수)</span>
                    <TextField
                        style={{ width: "392px" }}
                        placeholder='메뉴 가격을 입력해주세요'
                        required
                        name="menu_price"
                        onChange={(e) => {
                            setMenu_price(e.target.value);
                        }}
                    ></TextField>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>할인 가격</span><span style={{ color: "red", paddingLeft: "20px" }}>(필수)</span>
                    <TextField
                        style={{ width: "370px" }}
                        placeholder='할인 가격을 입력해주세요'
                        required
                        name="menu_price_discount"
                        onChange={(e) => {
                            setMenu_price_discount(e.target.value);
                        }}
                    ></TextField>
                </div>

                <div className='stock_img' style={{ marginRight: "570px", position: "relative" }}>
                    <span >상품 이미지</span>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput">
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            placeholder='상품 이미지를 넣어주세요'
                            label="img"
                            required
                            name="menu_img"
                            autoComplete="menu_img"
                            sx={{
                                width: { sm: 200, md: 375 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                            onChange={(e) => {
                                setMenuimg(e.target.value);
                            }}
                            variant="outlined"
                            fullWidth
                            value={selectedFile ? selectedFile.name : ''}
                        />
                    </label>

                    <button className="search" onClick={openFileDialog} style={{ width: "50px", height: "60px", marginLeft: "25px", cursor: "pointer", borderRadius: "10px", backgroundColor: "rgb(218, 216, 216)", border: "1px solid rgb(158, 154, 154)" }}><span>파일 &nbsp;찾기</span></button>
                </div>
                <div style={{ position: "absolute", top: "550px", right: "60px" }}>
                    <span style={{ fontSize: "20px" }}>수량</span><span style={{ color: "red", paddingLeft: "20px", fontSize: "20px" }}>(필수) &nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <TextField
                        style={{ width: "370px" }}
                        placeholder='수량을 입력해주세요'
                        required
                        name="menu_price_discount"
                        onChange={(e) => {
                            setQuantity(e.target.value);
                        }}
                    ></TextField>
                </div>
                <button className="addmenu_sub" onClick={() => {
                    const formData = new FormData();

                    formData.append('image', selectedFile);
                    formData.append('shopidx', selectedStore.shopidx);
                    formData.append('itemName', menuName);
                    formData.append('itemnotice', menu_explanation);
                    formData.append('cost', menu_price);
                    formData.append('salecost', menu_price_discount);
                    formData.append('category', category);
                    formData.append('starttime', discountStartTime);
                    formData.append('endtime', discountEndTime);
                    formData.append('quantity', quantity);

                    axios.post('/item/register', formData)
                        .then((response) => {
                            const item = response.data;
                            console.log(item);
                            window.alert("메뉴 추가 완료")
                            if (selectedValue !== 'select1' && selectedStore != "select2") {
                                // 이곳에서 API 요청 등을 실행
                                axios.post('/item/getItems', {

                                    shopName: selectedStore.shopname,
                                    shopTel: selectedStore.shoptel,
                                    shopAddress: selectedStore.shopaddress,
                                    shopWebsite: selectedStore.shopwebsite,
                                    imageFilename: selectedStore.imagefilename,
                                    ownerIdx: selectedStore.owneridx,
                                    latitude: selectedStore.latitude,
                                    longitude: selectedStore.longitude,
                                    promotionText: selectedStore.promotionText


                                }).then((response) => {
                                    const menudata = response.data;
                                    setMenuData(menudata);
                                    setMenu_count(menudata.length);
                                }).catch(function () {
                                    // 에러 처리 등
                                });
                            }
                        }).catch(error => {
                            console.log(error.result)
                            console.log('실패함')
                        })
                    setTemp2(!temp2)

                }}><a>[ SUBMIT ]</a></button>
            </div><div className={`${temp1 == true ? "popup_view_none" : "popup_view"}`} style={{ top: "50%" }}>
                <div>
                    <Avatar
                        src={Image}
                        style={{ margin: '20px' }}
                        size={150}
                        onClick={() => { fileInput.current.click() }} />
                    <div><a style={{ color: "gray", textDecorationLine: 'underline',cursor:'pointer' }}
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
                    <a href="owner"><span>가게 등록</span></a>
                </div>
                <button className="popup_btn" onClick={() => {
                    setTemp1(!temp1)
                }}><a>[ CLOSE ]</a></button>

            </div>
        </div>
    );
}

export default Owner_Addmenu;