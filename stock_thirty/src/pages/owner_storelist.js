import React, { useState } from 'react';
import './../App.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditNoteIcon from '@mui/icons-material/EditNote';
import axios from "axios";
import { TextField, Button, InputAdornment } from "@mui/material";
import DaumPostcode from 'react-daum-postcode';
import HouseIcon from '@mui/icons-material/House';
import Avatar from 'react-avatar';
import StoreIcon from '@mui/icons-material/Store';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { TextFieldsSharp } from '@material-ui/icons';
function Owner_Storelist() {
    let [temp, setTemp] = useState(true);
    let [temp1, setTemp1] = useState(true);
    let [recall, setRecall] = useState(false);
    let [temp2, setTemp2] = useState(true);
    let [temp3, setTemp3] = useState(true);
    let navigate = useNavigate();
    function switchTemp() {
        setTemp(!temp);
    }
    const fileInput = useRef(null);
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
    /*사업자가 등록한 가게*/
    let [userStore, setUser_store] = useState([]);
    let [userStore_cnt, setUser_store_cnt] = useState("0");
    useEffect(() => {
        axios.get('/getMyShop')
            .then(response => {
                const userStore = response.data;
                setUser_store_cnt(userStore.length);
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

    /* 주소 찾기 모달 */
    let [modalState, setModalState] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const postCodeStyle = {
        position: 'absolute',
        top: '-300px',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        width: '800px',
        height: '700px',
        backgroundColor: 'white',
        display: modalState ? 'block' : 'none',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
    }; // 스타일 정의 code
    const onCompletePost = (data) => {
        // 주소 선택이 완료되면 실행되는 콜백 함수

        setSelectedAddress(data.address);
        closeModal(); // 주소 선택 후 모달을 닫습니다.
        // 선택한 주소를 상태 변수에 저장합니다.
    };
    /*1번쨰 파일찾기*/
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    const openFileDialog = () => {
        document.getElementById('fileInput').click();
    };
    /* 데이터를 변수저장 */
    let [store_name, setStore_name] = useState("");
    let [store_phon, setStore_phon] = useState("");
    let [store_img, setStore_img] = useState("");
    let [store_address, setStore_address] = useState("");
    let [store_promotionText, setStore_promotionText] = useState("");
    let [store_website, setStore_website] = useState("");
    let [store_index, setStore_index] = useState("");
    useEffect(() => {
        if (temp == false) {
            sendUserData();
            temp = true;
        }

    }, [temp])
    useEffect(() => {
        console.log(selectedAddress);
    }, [selectedAddress]);

    /* 가게 수정*/
    let [currentstore, setCurrentstore] = useState("current");
    useEffect(() => {
        if (currentstore != "current") {
            setStore_index(currentstore.shopidx)
            setStore_name(currentstore.shopname)
            setStore_img(currentstore.imagefilename)
            setStore_address(currentstore.shopaddress)
            setStore_phon(currentstore.shoptel)
            setStore_promotionText(currentstore.promotionText)
            setStore_website(currentstore.shopwebsite)
        }
    }, [currentstore]);

    return (
        <div>
            <div className='owner_storelist_pageWrap' >
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
                <div className='storelist_back'>
                    <div className='storelist_header'>
                        <span>내 가게 {'>'}
                        </span>
                    </div>
                    <div className='menucont'>
                        <EditNoteIcon fontSize="large" style={{ paddingTop: "20px" }} /> <span> 가게 관리 {`>`} 가게 목록 [ {userStore_cnt} 개]</span>
                        <button className='storelist_btn' onClick={() => {
                            setTemp2(!temp2);
                        }} style={{ cursor: "pointer" }}>
                            <span>가게 등록</span>
                        </button>
                    </div>
                    <div className='storelist'>
                        <div className='storelist_title'>
                            <span>30 가게</span>
                        </div>
                        <div className='storelistlist'>
                            <ul>

                                {userStore.map((store, index) => (
                                    <li key={index}>
                                        <div className='shop'>
                                            <div className='shop_img' style={{ width: "150px", height: "150px" }}><img src={"/shopimages/" + `${store.imagefilename}`} alt={store.imagefilename} style={{ backgroundCover: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "150px", height: "150px" }} /></div>
                                            <div className='shop_name'><span>{store.shopname}</span></div>
                                            <div className='shop_ex'><span>{store.promotionText}</span></div>
                                            <div className='shop_web'><span>{store.shopwebsite}</span></div>
                                            <div className='shop_tel'><span>{store.shoptel}</span></div>
                                            <div className='shop_btn'><button className='shop_change_btn' onClick={() => {

                                                setCurrentstore(store);
                                                setTemp3(!temp3);
                                            }} style={{ cursor: "pointer" }}>
                                                <span>수정</span>
                                            </button>
                                                <button className='shop_change_btn' onClick={() => {
                                                    window.alert("정말로 삭제하시겠습니까?");
                                                    console.log(store.shopidx);
                                                    axios.delete('/shopDelete', {
                                                        params: {
                                                            shopidx:store.shopidx
                                                        }
                                                    }).then(response => {//데이터를받아오는게성공시 다른페이지호출
                                                        window.alert("삭제 완료");
                                                        axios.get('/getMyShop')
                                                            .then(response => {
                                                                const userStore = response.data;
                                                                setUser_store_cnt(userStore.length);
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

                                                    }).catch(error => {
                                                        window.alert(error.response.data.result);
                                                    })
                                                }} style={{ cursor: "pointer", marginLeft: "20px" }}>
                                                    <span>삭제</span>
                                                </button>
                                            </div>
                                        </div>
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
                    <span>가게 등록</span>
                    <p className='addstpop_close'
                        onClick={() => {
                            setTemp2(!temp2)
                        }} style={{ cursor: "pointer", fontSize: "32px" }}> X </p>
                </div>
                <div className='addstore_name' >
                    <div className='addst_name'>
                        <span>가게 이름</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "20px", marginTop: "110px" }}
                        placeholder='가게 이름을 입력해주세요'
                        autoFocus
                        name="store_name"
                        value={store_name}
                        autoComplete="store_name"
                        required
                        onChange={(e) => {
                            setStore_name(e.target.value);
                        }}></TextField>
                </div>
                <div className='addstore_phon' >
                    <div className='addst_phon'>
                        <span>가게 전화번호</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "80px", marginTop: "40px" }}
                        placeholder='가게 전화번호 입력해주세요'
                        name="store_phon"
                        value={store_phon}
                        autoComplete="store_phon"
                        required
                        onChange={(e) => {
                            setStore_phon(e.target.value);
                        }}></TextField>
                </div>
                <div className='addstore_img' >
                    <div className='addst_img'>
                        <span>가게 이미지</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput">
                        <TextField
                            placeholder='가게 이미지를 넣어주세요'
                            required
                            name="store_img"
                            autoComplete="store_img"
                            style={{ width: "1350px", marginRight: "10px", marginTop: "40px" }}
                            onChange={(e) => {
                                setStore_img(e.currentTarget.value);
                            }}
                            variant="outlined"
                            fullWidth
                            value={selectedFile ? selectedFile.name : ''}
                        />
                    </label>

                    <button className="search" onClick={openFileDialog} style={{ width: "50px", height: "58px", marginLeft: "25px", marginTop: "40px", cursor: "pointer", borderRadius: "10px", backgroundColor: "rgb(218, 216, 216)", border: "1px solid rgb(158, 154, 154)" }}><span>파일 &nbsp;찾기</span></button>
                </div>
                <div className='addstore_address' >
                    <div className='addst_address'>
                        <span>가게 주소</span><span style={{ color: "red" }}>(필수)</span>
                    </div>
                    <TextField
                        placeholder='가게 주소를 적어주세요'
                        required
                        name="store_address"
                        autoComplete="store_address"
                        value={selectedAddress}
                        style={{ width: "1350px", marginRight: "25px", marginTop: "40px" }}
                        onChange={(e) => {
                            setStore_address(e.currentTarget.value);
                        }} />

                    <button className="search" style={{ display: "inline-block", width: "50px", height: "58px", marginLeft: "5px", marginTop: "40px", cursor: "pointer", borderRadius: "10px", backgroundColor: "rgb(218, 216, 216)", border: "1px solid rgb(158, 154, 154)", textAlign: "center" }} onClick={() => { openModal() }}><span>주소 &nbsp;찾기</span></button>
                </div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content" >
                            <DaumPostcode
                                style={postCodeStyle}
                                onComplete={onCompletePost}
                            />
                            <button onClick={closeModal} className="close-button" style={{ marginTop: "-150px", marginLeft: "320px", padding: "15.5px 0px 15.5px 0px", border: "none", boxShadow: '5px 0px 10px rgba(0,0,0,0.5)', }}><span>X</span></button>
                        </div>
                    </div>
                )}
                <div className='addstore_web' >
                    <div className='addst_web'>
                        <span>가게 웹사이트</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "80px", marginTop: "40px" }}
                        placeholder='가게 웹사이트를 입력해주세요'
                        name="store_website"
                        autoComplete="store_website"
                        value={store_website}
                        required
                        onChange={(e) => {
                            setStore_website(e.target.value);
                        }}>
                    </TextField>
                </div>
                <div className='addstore_web' >
                    <div className='addst_web'>
                        <span>가게 홍보문구</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "80px", marginTop: "40px" }}
                        placeholder='가게 홍보문구를 입력해주세요'
                        multiline
                        name="store_promotionText"
                        value={store_promotionText}
                        rows={3}
                        required
                        onChange={(e) => {
                            setStore_promotionText(e.currentTarget.value);
                        }}
                    ></TextField>
                </div>
                <a className="owner_store_btn" type="submit" Width variant="contained" style={{ marginTop: "40px", marginBottom: "50px", cursor: "pointer", borderRadius: "20px", width: "150px", height: "60px", fontSize: "23px", fontWeight: "700", lineHeight: "40px", color: "white", backgroundColor: "rgb(74, 74, 247)", border: "3px solid rgb(74, 74, 247)" }} onClick={() => {

                    if (store_name == "" && store_phon == "" && store_img == "" && store_address == "") {
                        window.alert("가게등록실패 다시입력");
                        setTemp2(!temp2)
                        navigate("/owner_storelist")
                    } else if (store_name == "") {
                        window.alert("가게이름을 등록해주세요");
                        setTemp2(!temp2)
                        navigate("/owner_storelist")
                    } else if (store_phon == "") {
                        window.alert("가게 전화번호를 등록해주세요");
                        setTemp2(!temp2)
                        navigate("/owner_storelist")
                    } else if (store_img == "") {
                        window.alert("가게이미지을 등록해주세요");
                        setTemp2(!temp2)
                        navigate("/owner_storelist")
                    } else if (store_address == "") {
                        window.alert("가게주소을 등록해주세요");
                        setTemp2(!temp2)
                        navigate("/owner_storelist")
                    } else {
                        setTemp(!temp)
                        setTemp2(!temp2)
                    }
                }}>가게 등록</a>
            </div>
            <div className={`${temp3 == true ? "addstpop_view_none" : "addstpop_view"}`} >
                <div className='addstpop_title'>
                    <span>가게 수정</span>
                    <p className='addstpop_close'
                        onClick={() => {
                            setTemp3(!temp3)
                        }} style={{ cursor: "pointer", fontSize: "32px" }}> X </p>
                </div>
                <div className='addstore_name' >
                    <div className='addst_name'>
                        <span>가게 이름</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "75px", marginTop: "110px" }}
                        placeholder={`${store_name}`}
                        autoFocus
                        name="store_name"
                        autoComplete="store_name"
                        value={store_name}
                        onChange={(e) => {
                            setStore_name(e.target.value);
                        }}
                    ></TextField>
                </div>
                <div className='addstore_phon' >
                    <div className='addst_phon'>
                        <span>가게 전화번호</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "140px", marginTop: "40px" }}
                        placeholder='가게 전화번호 입력해주세요'
                        name="store_phon"
                        autoComplete="store_phon"
                        onChange={(e) => {
                            setStore_phon(e.target.value);
                        }}
                        value={store_phon}
                    ></TextField>
                </div>
                <div className='addstore_img' >
                    <div className='addst_img'>
                        <span>가게 이미지</span>
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput">
                        <TextField
                            placeholder={`${selectedFile}`}
                            required
                            name="store_img"
                            autoComplete="store_img"
                            style={{ width: "1350px", marginRight: "80px", marginTop: "40px" }}
                            onChange={(e) => {
                                setStore_img(e.currentTarget.value);
                            }}
                            variant="outlined"
                            fullWidth
                            value={selectedFile ? selectedFile.name : ''}

                        />
                    </label>
                    <button className="search" onClick={openFileDialog} style={{ width: "50px", height: "60px", marginLeft: "5px", marginTop: "35px", cursor: "pointer", borderRadius: "10px", backgroundColor: "rgb(218, 216, 216)", border: "1px solid rgb(158, 154, 154)" }}><span>파일 &nbsp;찾기</span></button>
                </div>
                <div className='addstore_address' >
                    <div className='addst_address'>
                        <span>가게 주소</span>
                    </div>
                    <TextField
                        placeholder={`${selectedAddress}`}
                        required
                        name="store_address"
                        autoComplete="store_address"
                        value={selectedAddress}

                        currentStor
                        style={{ width: "1350px", marginRight: "90px", marginTop: "40px" }}
                        onChange={(e) => {
                            setStore_address(e.currentTarget.value);
                        }} />

                    <button className="search" style={{ display: "inline-block", width: "50px", height: "58px", marginLeft: "-5px", marginTop: "40px", cursor: "pointer", borderRadius: "10px", backgroundColor: "rgb(218, 216, 216)", border: "1px solid rgb(158, 154, 154)", textAlign: "center" }} onClick={() => { openModal() }}><span>주소 &nbsp;찾기</span></button>
                </div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content" >
                            <DaumPostcode
                                style={postCodeStyle}
                                onComplete={onCompletePost}
                            />
                            <button onClick={closeModal} className="close-button" style={{ marginTop: "-150px", marginLeft: "320px", padding: "15.5px 0px 15.5px 0px", border: "none", boxShadow: '5px 0px 10px rgba(0,0,0,0.5)', }}><span>X</span></button>
                        </div>
                    </div>
                )}
                <div className='addstore_web' >
                    <div className='addst_web'>
                        <span>가게 웹사이트</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "140px", marginTop: "40px" }}
                        placeholder='가게 웹사이트를 입력해주세요'
                        name="store_website"
                        autoComplete="store_website"
                        required
                        value={store_website}
                        onChange={(e) => {
                            setStore_website(e.target.value);
                        }}>
                    </TextField>
                </div>
                <div className='addstore_web' >
                    <div className='addst_web'>
                        <span>가게 홍보문구</span>
                    </div>
                    <TextField
                        style={{ width: "1350px", marginRight: "140px", marginTop: "40px" }}
                        placeholder='가게 홍보문구를 입력해주세요'
                        multiline
                        name="store_promotionText"
                        rows={3}
                        required
                        value={store_promotionText}
                        onChange={(e) => {
                            setStore_promotionText(e.currentTarget.value);
                        }}
                    ></TextField>
                </div>
                <a className="owner_store_btn" type="submit" Width variant="contained" style={{ marginTop: "40px", marginBottom: "50px", cursor: "pointer", borderRadius: "20px", width: "150px", height: "60px", fontSize: "23px", fontWeight: "700", lineHeight: "40px", color: "white", backgroundColor: "rgb(74, 74, 247)", border: "1px solid rgb(74, 74, 247)" }} onClick={() => {
                    setTemp3(!temp3)
                    const formData = new FormData();
                    formData.append('imageFilename', selectedFile);
                    formData.append('shopName', store_name);
                    formData.append('shopTel', store_phon);
                    formData.append('shopAddress', selectedAddress);
                    formData.append('promotionText', store_promotionText);
                    formData.append('shopWebsite', store_website);
                    formData.append('shopidx', store_index);
                    formData.append('existingAddress', store_address);
                    formData.append('existingImage', store_img);
                    formData.append('method', "modify");

                    // axios.post에 직접 formData를 전달
                    return (
                        axios.post('/shopRegistration', formData)
                            .then((response) => {
                                window.alert("가게 수정 완료");
                                window.location.href = response.data;
                            })
                            .catch(error => {
                                window.alert(error.response.data.result);
                                navigate("/owner");
                            })
                    );
                }}>수정 완료</a>
            </div>
        </div>
    );
    function sendUserData() {
        const formData = new FormData();
        formData.append('imageFilename', selectedFile);
        formData.append('shopName', store_name);
        formData.append('shopTel', store_phon);
        formData.append('shopAddress', selectedAddress);
        formData.append('promotionText', store_promotionText);
        formData.append('shopWebsite', store_website);

        // axios.post에 직접 formData를 전달
        return (
            axios.post('/shopRegistration', formData)
                .then((response) => {
                    window.alert("가게 등록 완료");
                    window.location.href = response.data;
                    setSelectedAddress("");
                    setSelectedFile("");
                    setStore_website("");
                    setStore_promotionText("");
                    setStore_phon("");
                    setStore_name("");
                })
                .catch(error => {
                    window.alert(error.response.data.result);
                    setSelectedAddress("");
                    setSelectedFile("");
                    setStore_website("");
                    setStore_promotionText("");
                    setStore_phon("");
                    setStore_name("");

                })
        );
    }
}
export default Owner_Storelist; 