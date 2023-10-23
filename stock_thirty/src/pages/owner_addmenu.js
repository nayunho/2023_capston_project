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
import dayjs, { Dayjs } from 'dayjs';
import HouseIcon from '@mui/icons-material/House';
function Owner_Addmenu() {
    let [temp, setTemp] = useState(true);
    let [temp1, setTemp1] = useState(true);
    let [recall, setRecall] = useState(false);
    let [temp2, setTemp2] = useState(true);
    let [temp4, setTemp4] = useState(true);
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
    const [selectedFile2, setSelectedFile2] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    const handleFileChange2 = (event) => {
        const file1 = event.target.files[0];
        setSelectedFile2(file1);
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
    let [menu_count, setMenu_count] = useState("0");
    let [a, setA] = useState("");
    let [aa, setAa] = useState(true);
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
                setA(selectedStore.shopname);
                setAa(false);
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
    const [menuidx, setMenuidx] = useState('');

/*현재 아이템 저장 변수*/
const [menuName2, setMenuName2] = useState("");
const [menu_explanation2, setMenu_explanation2] = useState("");
const [menu_price2, setMenu_price2] = useState("");
const [menu_price_discount2, setMenu_price_discount2] = useState("");
const [menuimg2, setMenuimg2] = useState("");
const [category2, setCategory2] = useState('');
const [discountStartTime2, setDiscountStartTime2] = useState('');
const [discountEndTime2, setDiscountEndTime2] = useState('');
const [quantity2, setQuantity2] = useState('');
const [menuidx2, setMenuidx2] = useState('');
    /*메뉴 수정*/
    let [currentitem, setCurrentitem] = useState("current");
    useEffect(() => {
        if (currentitem != "current") {
            setMenuName2(currentitem.itemname)
            setMenu_explanation2(currentitem.itemnotice)
            setMenu_price2(currentitem.cost)
            setMenu_price_discount2(currentitem.salecost)
            setMenuimg2(currentitem.image)
            setCategory2(currentitem.category)
            setDiscountStartTime2(currentitem.starttime)
            setDiscountEndTime2(currentitem.endtime)
            setQuantity2(currentitem.quantity)
            setMenuidx2(currentitem.itemidx)
        }
    }, [currentitem]);
    /*시간설정*/
    const handleDiscountStartTimeChange = (newTime) => {
        setDiscountStartTime(newTime);
    };
    const handleDiscountEndTimeChange = (newTime) => {
        setDiscountEndTime(newTime);
    };
    const handleDiscountStartTimeChange2 = (newTime) => {
        setDiscountStartTime2(newTime);
    };
    const handleDiscountEndTimeChange2 = (newTime) => {
        setDiscountEndTime2(newTime);
    };
    const discountStartTimeDate = dayjs(discountStartTime)
    const discountEndTimeDate = dayjs(discountEndTime)

    
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
                    <div className='logo'><a href="/home_user">재고 30 </a></div>
                    <nav className='nav'>
                        <ul>
                            <li>
                                <a href="/owner_main_page" style={{ cursor: "pointer" }}>
                                    <HouseIcon fontSize="large" />
                                </a>
                            </li>
                            <li>
                                <a onClick={() => {
                                    setTemp(switchTemp);
                                }} style={{ cursor: "pointer" }} href='/owner_storelist'>
                                    내가게
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
                                <a href="/" onClick={() => {
                                    axios.get('/SessionLogout', {
                                    })
                                    window.alert("로그아웃되었습니다.");
                                }
                                }>
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
                <div className='addmenu_back' style={{ position: "relative" }}>
                    <div className='addmenu_header' style={{ marginLeft: "20px" }}>
                        <span>상품 등록 {'>'}
                        </span>
                        <select value={selectedValue} onChange={(e) => {
                            setSelectedStore(userStore.find(store => store.shopaddress === e.target.value));
                            setSelectedValue(e.target.value)
                            // selectedStore에 선택한 가게의 객체가 저장됩니다. 가게이름으로 찾기
                        }} style={{ height: "28px", fontSize: "20px", borderRadius: "50px", position: "absolute", top: "50px", right: "200px" }}>
                            <option value="select">Select a your store</option>
                            {userStore.map((store, index) => (

                                <option value={store.shopaddress} key={index}>
                                    {store.shopname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='menucont'>
                        <span><EditNoteIcon fontSize="large" style={{ paddingTop: "20px" }} /> 메뉴 관리 {`>`} 메뉴 개수 [ {menu_count} 개]</span>
                        <button className='addmenu_btn' onClick={() => {
                            if (selectedStore != "select2") {
                                setTemp2(!temp2);
                            } else {
                                window.alert("먼저 가게를 선택해주세요")
                            }
                        }} style={{ cursor: "pointer" }}>
                            <span>메뉴 추가</span>
                        </button>
                    </div>
                    <div className='addmenu'>
                        <div className='addmenu_title'>
                            <span id={`${aa == true ? null : "aa"}`} >30메뉴</span><span id={`${aa == false ? null : "aa"}`}>{a}</span>
                        </div>
                        <div className='itemlist'>
                            <ul>
                                {/* menuData 배열을 사용하여 가게 데이터를 동적으로 렌더링 */}
                                {menuData.map((menu, index) => (
                                    <li key={index}>
                                        {/* 각 가게 데이터에 대한 표시 */}
                                        <div className='item'>
                                            <div className='item_img' style={{ width: "150px", height: "150px" }}><img src={"/itemimages/" + `${menu.image}`} alt={menu.image} style={{ backgroundCover: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "150px", height: "150px" }} /></div>
                                            <div className='itme_name'>{menu.itemname}</div>
                                            <div className='item_ex'>{menu.itemnotice}</div>
                                            <div className='item_pr'>{menu.cost}</div>
                                            <div className='item_dis'>{menu.salecost}</div>
                                            <div className='item_btn'><button className='item_change_btn' onClick={() => {
                                                setCurrentitem(menu);
                                                setTemp4(!temp4);
                                            }} style={{ cursor: "pointer" }}><span>수정</span></button><button className='item_delete_btn'><span>삭제</span></button></div>
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

            <div className={`${temp2 == true ? "addstpop_view_none" : "addstpop_view"}`} >
                <div className='addstpop_title'>
                    <span>메뉴 추가</span>
                    <p className='addstpop_close'
                        onClick={() => {
                            setTemp2(!temp2)
                        }} style={{ cursor: "pointer", fontSize: "32px" }}> X </p>
                </div>
                <div className='addstore_name' >
                    <div className='addst_name'>
                        <span>메뉴 이름</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "20px", marginTop: "110px" }}
                        placeholder='메뉴 이름을 입력해주세요'
                        autoFocus
                        name="menuname"
                        value={menuName}
                        autoComplete="menuname"
                        required
                        onChange={(e) => {
                            setMenuName(e.target.value);
                        }}></TextField>
                </div>
                <div className='addstore_phon' >
                    <div className='addst_phon'>
                        <span>상품 종류</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "80px", marginTop: "40px" }}
                        placeholder='상품종류를 입력해주세요'
                        name="category"
                        value={category}
                        autoComplete="category"
                        required
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}></TextField>
                </div>
                <div className='addstore_phon' >
                    <div className='addst_phon'>
                        <span>상품 수량</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "80px", marginTop: "40px" }}
                        placeholder='수량을 입력해주세요'
                        required
                        name="menu_price_discount"
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                        }}></TextField>
                </div>
                <div className='addstore_phon' >
                    <div className='addst_phon'>
                        <span>메뉴 가격</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "80px", marginTop: "40px" }}
                        placeholder='메뉴 가격을 입력해주세요'
                        autoFocus
                        name="menu_price"
                        value={menu_price}
                        autoComplete="menu_price"
                        required
                        onChange={(e) => {
                            setMenu_price(e.target.value);
                        }}
                    ></TextField>
                </div>
                <div className='addstore_web' >
                    <div className='addst_web'>
                        <span>할인 가격</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "80px", marginTop: "40px" }}
                        placeholder='할인 가격을 입력해주세요'
                        required
                        name="menu_price_discount"
                        value={menu_price_discount}
                        autoComplete="menu_price_discount"
                        onChange={(e) => {
                            setMenu_price_discount(e.target.value);
                        }}
                    ></TextField>
                </div>
                <div className='addstore_web' style={{ display: "flex", position: "relative" }} >
                    <div style={{ marginLeft: "200px" }}>
                        <div className='addst_web'>
                            <span>할인 시작 시간</span><span style={{ color: "red" }}>(필수)</span>
                        </div>
                        <div style={{ position: "absolute", top: "100px", left: "255px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DateTimePicker
                                    onChange={handleDiscountStartTimeChange}
                                    renderInput={(params) => (
                                        <TextField
                                            style={{ width: "1500px", marginRight: "10px" }}
                                            placeholder='할인 시작 시간을 입력해주세요'
                                            autoFocus
                                            value={discountStartTime}
                                            name="discountStartTime"
                                            required
                                            {...params}
                                        />
                                    )}
                                    ampm={false} // AM/PM 선택 비활성화
                                    format="YYYY-MM-DD HH:mm:ss" // 원하는 날짜 및 시간 형식 설정
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div style={{ marginLeft: "400px" }}>
                        <div className='addst_web'>
                            <span>할인 마감 시간</span><span style={{ color: "red" }}>(필수)</span>
                        </div>
                        <div style={{ position: "absolute", top: "100px", left: "945px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    onChange={handleDiscountEndTimeChange}
                                    renderInput={(params) => (
                                        <TextField
                                            style={{ width: "349px", marginRight: "50px" }}
                                            placeholder='할인 마감 시간을 입력해주세요'
                                            autoFocus
                                            value={discountEndTime}
                                            name="discountEndTime"
                                            required
                                            {...params}
                                        />
                                    )}
                                    ampm={false} // AM/PM 선택 비활성화
                                    format="YYYY-MM-DD HH:mm:ss" // 원하는 날짜 및 시간 형식 설정
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <div className='addstore_img' style={{ position: "relative" }} >
                    <div className='addst_img'>
                        <span>상품 이미지</span>
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput">
                        <TextField
                            placeholder='상품 이미지를 넣어주세요'
                            label="img"
                            required
                            name="menu_img"
                            autoComplete="menu_img"
                            style={{ width: "1350px", position: "absolute", top: "110px", left: "80px" }}
                            onChange={(e) => {
                                setMenuimg(e.target.value);
                            }}
                            variant="outlined"
                            fullWidth
                            value={selectedFile ? selectedFile.name : ''}
                        />
                    </label>

                    <button className="search" onClick={openFileDialog} style={{ width: "50px", height: "58px", marginLeft: "25px", marginTop: "40px", cursor: "pointer", borderRadius: "10px", backgroundColor: "rgb(218, 216, 216)", border: "1px solid rgb(158, 154, 154)", position: "absolute", top: "70px", right: "70px" }}><span>파일 &nbsp;찾기</span></button>
                </div>
                <div className='addstore_img' style={{ position: "relative" }} >
                    <div className='addst_img'>
                        <span>메뉴 설명</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", position: "absolute", top: "110px", left: "80px" }}
                        placeholder='상품 설명를 입력해주세요'
                        multiline
                        name="menu_explanation"
                        value={menu_explanation}
                        autoComplete="menu_explanation"
                        rows={3}
                        inputProps={{
                            style: {
                                height: "80px",
                            },
                        }}
                        required
                        onChange={(e) => {
                            setMenu_explanation(e.target.value);
                        }}
                    ></TextField>
                </div>

                <button className="addmenu_sub" style={{ marginTop: "40px" }} onClick={() => {
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
                            setSelectedFile(null);
                            setMenuName("");
                            setMenu_explanation("");
                            setMenu_price("");
                            setMenu_price_discount("");
                            setMenuimg("");
                            setCategory("");
                            setDiscountStartTime(null);
                            setDiscountEndTime(null);
                            setQuantity("");
                            setMenuidx("");
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

            </div>

           <div className={`${temp4 == true ? "addstpop_view_none" : "addstpop_view"}`} >
                <div className='addstpop_title'>
                    <span>메뉴 수정</span>
                    <p className='addstpop_close'
                        onClick={() => {
                            setTemp4(!temp4)
                        }} style={{ cursor: "pointer", fontSize: "32px" }}> X </p>
                </div>
                <div className='addstore_name' >
                    <div className='addst_name'>
                        <span>메뉴 이름</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "20px", marginTop: "110px" }}
                        placeholder='메뉴 이름을 입력해주세요'
                        autoFocus
                        name="menuname2"
                        value={menuName2}
                        required
                        onChange={(e) => {
                            setMenuName2(e.target.value);
                        }}></TextField>
                </div>
                <div className='addstore_phon' >
                    <div className='addst_phon'>
                        <span>상품 종류</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "80px", marginTop: "40px" }}
                        placeholder='상품종류를 입력해주세요'
                        name="category2"
                        value={category2}
                        required
                        onChange={(e) => {
                            setCategory2(e.target.value);
                        }}></TextField>
                </div>
                <div className='addstore_phon' >
                    <div className='addst_phon'>
                        <span>상품 수량</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "80px", marginTop: "40px" }}
                        placeholder='수량을 입력해주세요'
                        required
                        name="quantity2"
                        value={quantity2}
                        onChange={(e) => {
                            setQuantity2(e.target.value);
                        }}></TextField>
                </div>
                <div className='addstore_phon' >
                    <div className='addst_phon'>
                        <span>메뉴 가격</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "80px", marginTop: "40px" }}
                        placeholder='메뉴 가격을 입력해주세요'
                        name="menu_price2"
                        value={menu_price2}
                        required
                        onChange={(e) => {
                            setMenu_price2(e.target.value);
                        }}
                    ></TextField>
                </div>
                <div className='addstore_web' >
                    <div className='addst_web'>
                        <span>할인 가격</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "80px", marginTop: "40px" }}
                        placeholder='할인 가격을 입력해주세요'
                        required
                        name="menu_price_discount2"
                        value={menu_price_discount2}
                        onChange={(e) => {
                            setMenu_price_discount2(e.target.value);
                        }}
                    ></TextField>
                </div>
                <div className='addstore_web' style={{ display: "flex", position: "relative" }} >
                    <div style={{ marginLeft: "200px" }}>
                        <div className='addst_web'>
                            <span>할인 시작 시간</span><span style={{ color: "red" }}>(필수)</span>
                        </div>
                        <div style={{ position: "absolute", top: "100px", left: "255px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DateTimePicker
                                    onChange={handleDiscountStartTimeChange2}
                                    renderInput={(params) => (
                                        <TextField
                                            style={{ width: "1500px", marginRight: "10px" }}
                                            placeholder='할인 시작 시간을 입력해주세요'
                                            autoFocus
                                            value={discountStartTime2}
                                            name="discountStartTime2"
                                            required
                                            {...params}
                                        />
                                    )}
                                    ampm={false} // AM/PM 선택 비활성화
                                    format="YYYY-MM-DD HH:mm:ss" // 원하는 날짜 및 시간 형식 설정
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div style={{ marginLeft: "400px" }}>
                        <div className='addst_web'>
                            <span>할인 마감 시간</span><span style={{ color: "red" }}>(필수)</span>
                        </div>
                        <div style={{ position: "absolute", top: "100px", left: "945px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    onChange={handleDiscountEndTimeChange2}
                                    renderInput={(params) => (
                                        <TextField
                                            style={{ width: "349px", marginRight: "50px" }}
                                            placeholder='할인 마감 시간을 입력해주세요'
                                            autoFocus
                                            value={discountEndTime2}
                                            name="discountEndTime2"
                                            required
                                            {...params}
                                        />
                                    )}
                                    ampm={false} // AM/PM 선택 비활성화
                                    format="YYYY-MM-DD HH:mm:ss" // 원하는 날짜 및 시간 형식 설정
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <div className='addstore_img' style={{ position: "relative" }} >
                    <div className='addst_img'>
                        <span>상품 이미지</span>
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange2}
                    />
                    <label htmlFor="fileInput">
                        <TextField
                          InputProps={{
                            readOnly: true,
                        }}
                            placeholder='상품 이미지를 넣어주세요'
                            label="img"
                            required
                            name="menu_img2"
                            autoComplete="menu_img2"
                            style={{ width: "1350px", position: "absolute", top: "110px", left: "80px" }}
                            onChange={(e) => {
                                setMenuimg2(e.target.value);
                            }}
                            variant="outlined"
                            fullWidth
                            value={selectedFile ? selectedFile.name : ''}
                        />
                    </label>

                    <button className="search" onClick={openFileDialog} style={{ width: "50px", height: "58px", marginLeft: "25px", marginTop: "40px", cursor: "pointer", borderRadius: "10px", backgroundColor: "rgb(218, 216, 216)", border: "1px solid rgb(158, 154, 154)", position: "absolute", top: "70px", right: "70px" }}><span>파일 &nbsp;찾기</span></button>
                </div>
                <div className='addstore_img' style={{ position: "relative" }} >
                    <div className='addst_img'>
                        <span>메뉴 설명</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", position: "absolute", top: "110px", left: "80px" }}
                        placeholder='상품 설명를 입력해주세요'
                        multiline
                        name="menu_explanation2"
                        value={menu_explanation2}
                        rows={3}
                        inputProps={{
                            style: {
                                height: "80px",
                            },
                        }}
                        required
                        onChange={(e) => {
                            setMenu_explanation2(e.target.value);
                        }}
                    ></TextField>
                </div>
               
                <button className="addmenu_sub" onClick={() => {
                    const formData = new FormData();

               console.log(selectedFile);
                    formData.append('image', selectedFile);
                    formData.append('shopidx', selectedStore.shopidx);
                    formData.append('itemName', menuName2);
                    formData.append('itemnotice', menu_explanation2);
                    formData.append('cost', menu_price2);
                    formData.append('salecost', menu_price_discount2);
                    formData.append('category', category2);
                    formData.append('starttime', discountStartTime2);
                    formData.append('endtime', discountEndTime2);
                    formData.append('quantity', quantity2);
                    formData.append('itemidx', menuidx2);
                    formData.append('existingImage', menuimg2);
                    formData.append('method', "modify");

                    axios.post('/item/register', formData)
                        .then((response) => {
                            const item = response.data;
                            console.log(item);
                            window.alert("메뉴 수정 완료")
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
                    setTemp4(!temp4)

                }}><a>[ SUBMIT ]</a></button>
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