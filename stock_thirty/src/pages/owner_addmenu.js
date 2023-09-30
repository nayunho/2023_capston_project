import React, { useState } from 'react';
import './../App.css';
import { useEffect, useRef } from 'react';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditNoteIcon from '@mui/icons-material/EditNote';
import axios from "axios";
import { TextField, Button, InputAdornment } from "@mui/material";

function Owner_Addmenu() {
    let [temp, setTemp] = useState(true);
    let [temp1, setTemp1] = useState(true);
    let [recall, setRecall] = useState(false);
    let [temp2, setTemp2] = useState(true);
    let [store_img, setStore_img] = useState("");
    function switchTemp() {
        setTemp(!temp);
    }
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

    const [role, setrole] = useState("");
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
                                }} style={{ cursor: "pointer" }} href='/owner'>
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
                    </div>
                    <div className='menucont'>
                        <span><EditNoteIcon fontSize="large" style={{ paddingTop: "20px" }} /> 메뉴 관리 {`>`} 메뉴 개수 [0개]</span>
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
                <div className='addmenu_name'>
                    <span>메뉴 이름</span><span style={{ color: "red" }}>(필수)</span>
                    <TextField
                        style={{ width: "950px" }}
                        placeholder='메뉴 이름을 입력해주세요'
                        autoFocus
                        required></TextField>
                </div>
                <span style={{ fontSize: "20px", marginRight: "1015px" }}>메뉴 설명</span>
                <div className='addmunu_ex'>
                    <TextField
                        style={{ width: "1080px", marginTop: "30px" }}
                        placeholder='메뉴에 대한 설명을 간단하게 작성해주세요'
                        multiline
                        rows={3}
                        inputProps={{
                            style: {
                                height: "100px",
                            },
                        }}
                    />
                </div>
                <div className='addmunu_price'>
                    <span>메뉴 가격</span><span style={{ color: "red" }}>(필수)</span>
                    <TextField
                        style={{ width: "950px" }}
                        placeholder='메뉴 가격을 입력해주세요'
                        required></TextField>
                </div>
                <div className='stock_img'>
                    <span>상품 이미지</span>
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
                    <div className="sold_btn">
                        <input className="sell" type="button" value="판매 중" onClick={(e) => {
                            let typped = e.target.value;
                            setrole(typped);
                        }}></input>
                        <input className="sold" type="button" value="매진" onClick={(e) => {
                            let typped = e.target.value;
                            setrole(typped);
                        }}></input>
                    </div>
                </div>
                <button className="addmenu_sub" onClick={() => {
            setTemp2(!temp2)
          }}><a>[ SUBMIT ]</a></button>
                </div>
        </div>
    );
}

export default Owner_Addmenu;