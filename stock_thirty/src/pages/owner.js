import React, { useState } from 'react';
import './../App.css';
import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { TextField, Button, InputAdornment } from "@mui/material";
import LockIcon from "@material-ui/icons/Lock";
import DaumPostcode from 'react-daum-postcode';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Avatar from 'react-avatar';
import StoreIcon from '@mui/icons-material/Store';
function Owner() {
    /*마이페이지*/
    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const fileInput = useRef(null)
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
    let [temp1, setTemp1] = useState(true);
    let navigate = useNavigate();
    let [temp, setTemp] = useState(true);
    function switchTemp() {
        setTemp(!temp);
    }
    let [pw, setpw] = useState("");
    let [modalState, setModalState] = useState(true);
    let [inputAddressValue, setInputAddressValue] = useState("");
    let [inputZipCodeValue, setInputZipCodeValue] = useState("");
    const [selectedAddress, setSelectedAddress] = useState(''); // 주소를 저장할 상태 변수
    let [textswitch, setTextSwitch] = useState(true);
    /*주소찾기*/
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const postCodeStyle = {
        position: 'absolute',
        top: '-200px',
        left: '110%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        width: '500px',
        height: '600px',
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
    useEffect(() => {
        if (temp == false) {
            sendUserData();
            temp = true;
        }

    }, [temp])
    /* 선택사항 테이블 스위치 */
    let [table, SetTable] = useState(true);

    return (
        <div>
            <div className='ownerWrap' >
                <header id='header' className={`${temp1 == true ? "" : "header_hidden"}`} style={{ borderBottom: "1px solid black" }}>
                    <div className='logo'><a href="/home_user">재고 30 </a></div>
                    <nav className='nav' >
                        <ul >
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
                                    <AccountCircleIcon fontSize="large" /> <span>나윤호</span>
                                </a>
                            </li>
                        </ul></nav>
                </header>
                <div className={`banner ${temp1 == true ? "" : "banner_hidden"}`}>
                    <div className='text'>
                        <span >가게를 등록하여</span><br />
                        <span>자신의 가게를 보여주세요!</span>
                    </div>
                </div>
                <main className={`contents ${table ? "" : "contents_area"}`} style={{ textAlign: "left" }} >
                    <div style={{ marginTop: "25px" }}>
                        <table style={{ marginTop: "25px" }}>
                            <tr >
                                <th>
                                    <span style={{ fontSize: "30px", marginBottom: "50px" }}>가게를 등록하려면</span><br />
                                    <span style={{ fontSize: "30px" }}>아래 양식에 맞춰 작성해주세요!</span>
                                </th>

                                <th>
                                </th>

                                <th>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <br />
                                    <br />
                                    <br />
                                </th>

                                <th>
                                </th>

                                <th>
                                </th>
                            </tr>
                            <tr>
                                <th style={{ fontSize: "25px" }} >
                                    가게 정보
                                </th>

                                <th >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </th>

                                <th>
                                </th>
                            </tr>
                            <tr style={{ borderBottom: "3px solid black", height: "25px" }} >
                                <th style={{ borderBottom: "3px solid black" }}>
                                </th>

                                <th style={{ borderBottom: "3px solid black" }}>
                                </th>

                                <th style={{ borderBottom: "3px solid black" }}>
                                </th>
                            </tr>
                            <tr style={{ height: "25px" }}>
                                <th>
                                </th>

                                <th>
                                </th>

                                <th>
                                </th>
                            </tr>
                            <tr>
                                <th style={{ fontSize: "25px" }}>
                                    가게 이름
                                </th>

                                <th >
                                </th>

                                <th style={{ fontSize: "25px" }}>
                                    가게 전화번호
                                </th>

                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        label="store_name"
                                        required
                                        name="store_name"
                                        autoComplete="store_name"
                                        sx={{
                                            width: { sm: 200, md: 550 },
                                            "& .MuiInputBase-root": {
                                                height: 60
                                            }
                                        }}
                                        onChange={(e) => {
                                            setStore_name(e.currentTarget.value);
                                        }} />
                                </td>

                                <td>
                                </td>

                                <td>
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        label="store_phon"
                                        required
                                        name="store_phon"
                                        autoComplete="store_phon"
                                        sx={{
                                            width: { sm: 200, md: 550 },
                                            "& .MuiInputBase-root": {
                                                height: 60
                                            }
                                        }}
                                        onChange={(e) => {
                                            setStore_phon(e.currentTarget.value);
                                        }} />
                                </td>
                            </tr>
                            <tr style={{ height: "25px" }}>
                                <th>
                                </th>

                                <th>
                                </th>

                                <th>
                                </th>
                            </tr>
                            <tr>
                                <th style={{ fontSize: "25px" }}>
                                    가게 이미지
                                </th>

                                <th >
                                </th>

                                <th style={{ fontSize: "25px" }}>
                                    가게 주소
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="fileInput">
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon />
                                                    </InputAdornment>
                                                ),
                                                readOnly: true,
                                            }}

                                            label="store_img"
                                            required
                                            name="store_img"
                                            autoComplete="store_img"
                                            sx={{
                                                width: { sm: 200, md: 475 },
                                                "& .MuiInputBase-root": {
                                                    height: 60
                                                }
                                            }}
                                            onChange={(e) => {
                                                setStore_img(e.currentTarget.value);
                                            }}
                                            variant="outlined"
                                            fullWidth
                                            value={selectedFile ? selectedFile.name : ''}
                                        />
                                    </label>

                                    <button className="search" onClick={openFileDialog} style={{ width: "50px", height: "60px", marginLeft: "25px", cursor: "pointer", borderRadius: "10px", backgroundColor: "rgb(218, 216, 216)", border: "1px solid rgb(158, 154, 154)" }}><span>파일 &nbsp;찾기</span></button>
                                </th>

                                <th>
                                </th>

                                <th>
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                            readOnly: true,
                                        }}
                                        label="store_address"
                                        required
                                        name="store_address"
                                        autoComplete="store_address"
                                        value={selectedAddress}
                                        sx={{
                                            width: { sm: 200, md: 475 },
                                            "& .MuiInputBase-root": {
                                                height: 60
                                            }
                                        }}
                                        onChange={(e) => {
                                            setStore_address(e.currentTarget.value);
                                        }} />

                                    <button className="search" style={{ width: "50px", height: "60px", marginLeft: "25px", cursor: "pointer", borderRadius: "10px", backgroundColor: "rgb(218, 216, 216)", border: "1px solid rgb(158, 154, 154)" }} onClick={() => { openModal() }}><span>주소 &nbsp;찾기</span></button>
                                </th>
                            </tr>
                            {isModalOpen && (
                                <div className="modal">
                                    <div className="modal-content" >
                                        <DaumPostcode
                                            style={postCodeStyle}
                                            onComplete={onCompletePost}
                                        />
                                        <button onClick={closeModal} className="close-button" style={{ padding: "15.5px 0px 15.5px 0px", border: "none" }}><span>X</span></button>
                                    </div>
                                </div>
                            )}

                            <tr style={{ height: "25px" }}>
                                <th>
                                </th>

                                <th>
                                </th>

                                <th>
                                </th>
                            </tr>
                        </table>
                        <div style={{ height: "50px", lineHeight: "1.8", margin: "0 auto", width: "1175px" }}>

                            <a className={`select_text ${textswitch ? "" : "select_text_show"}`} style={{ cursor: "pointer", fontSize: "25px", display: "block", marginTop: "50px" }} onClick={() => {
                                SetTable(!table);
                                setTextSwitch(!textswitch)
                            }}>선택사항<ExpandMoreIcon /></a>

                        </div>
                        <table style={{ borderTop: "3px solid black" }} className={`${table ? "owner_table_none" : ""}`}>
                            <tr style={{ height: "25px" }}>
                                <th>
                                </th>

                                <th>
                                </th>

                                <th>
                                </th>
                            </tr>
                            <tr>

                                <th style={{ fontSize: "25px" }}>
                                    가게 웹사이트
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        label="store_website"
                                        name="store_website"
                                        autoComplete="store_website"
                                        sx={{
                                            width: { sm: 200, md: 550 },
                                            "& .MuiInputBase-root": {
                                                height: 60
                                            }
                                        }}
                                        onChange={(e) => {
                                            setStore_website(e.currentTarget.value);
                                        }} />

                                </th>
                            </tr>
                            <tr style={{ height: "25px" }}>
                                <th>
                                </th>

                                <th>
                                </th>

                                <th>
                                </th>
                            </tr>
                            <tr>
                                <th style={{ fontSize: "25px" }}>
                                    홍보 문구
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        label="store_promotionText"
                                        name="store_promotionText"
                                        autoComplete="current-pw"
                                        sx={{
                                            width: { sm: 200, md: 1170 },
                                            "& .MuiInputBase-root": {
                                                height: 100
                                            }
                                        }}
                                        onChange={(e) => {
                                            setStore_promotionText(e.currentTarget.value);
                                        }} />

                                </th>
                            </tr>
                            <tr style={{ height: "25px" }}>
                                <th>
                                </th>

                                <th>
                                </th>

                                <th>
                                </th>
                            </tr>
                        </table>
                    </div>
                </main>
                <Button onClick={() => {

                    if (store_name == "" && store_phon == "" && store_img == "" && store_address == "") {
                        window.alert("가게등록실패 다시입력");
                        navigate("/owner")
                    } else {
                        setTemp(!temp)
                    }
                }} className="owner_store_btn" type="submit" Width variant="contained" style={{ marginBottom: "50px", borderRadius: "10px", backgroundColor: "rgb(218, 216, 216)", color: "black", border: "2px solid rgb(158, 154, 154)" }}><span>가게 등록</span></Button>
            </div>

            <footer id="footer" >
                <div className='footer1'><a href="/">재고 30</a></div>
                <div className='footer2'>개인정보 및 보호정책 등</div>
            </footer>
            <div className={`${temp1 == true ? "popup_view_none" : "popup_view"}`} id="owner_popup" >
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

        </div>
    )
    function sendUserData() {
        const formData = new FormData();
        formData.append('imageFilename', selectedFile);
        formData.append('shopName', store_name);
        formData.append('shopTel', store_phon);
        formData.append('shopAddress', store_address);
        formData.append('promotionText', store_promotionText);
        formData.append('shopWebsite', store_website);

        // axios.post에 직접 formData를 전달
        return (
            axios.post('/shopRegistration', formData)
                .then((response) => {
                    window.alert("가게 등록 완료");
                    window.location.href = response.data;
                })
                .catch(error => {
                    window.alert(error.response.data.result);
                    navigate("/owner");
                })
        );
    }
}
export default Owner;