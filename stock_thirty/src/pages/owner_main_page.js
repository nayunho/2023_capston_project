import React, { useState } from 'react';
import './../App.css';
import axios from "axios";
import { useEffect, useRef } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Avatar from 'react-avatar';
import StoreIcon from '@mui/icons-material/Store';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { TextField, Button, InputAdornment } from "@mui/material";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { useNavigate } from "react-router-dom";
function Owner_main_page() {
    let navigate = useNavigate();
    const [userInfo, setUserInfo] = useState("");
    let [recall, setRecall] = useState(false);
    let [temp1, setTemp1] = useState(true);
    let [temp, setTemp] = useState(true);
    const fileInput = useRef(null);
    let [temp3, setTemp3] = useState(true);
    let [shopsData, setShopsData] = useState([]);
    function switchTemp() {
        setTemp(!temp);
    }
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
    return (
        <div>
            <div className='owner_main_pageWrap' >
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
                                <a className='mypages' onClick={() => {
                                    setTemp1(!temp1);
                                }} style={{ cursor: "pointer" }}>
                                    <AccountCircleIcon fontSize="large" /> <span>{userInfo.nickname}</span>
                                </a>
                            </li>
                        </ul></nav>
                </header>
                <div className={`banner ${temp1 == true ? "" : "banner_hidden"}`} style={{ borderRadius: "20px", boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}>
                    <div className='text'>
                        <span >가게를 등록하여</span><br />
                        <span>자신의 가게를 보여주세요!</span>
                    </div>
                </div>
                <div style={{ width: "100%", height: "25px" }}></div>
                <div className='contents'>
                    <div className={`content1 ${temp1 == true ? "" : "contents_hidden"}`} style={{ boxShadow: '1px 3px 5px rgba(0, 0, 0, 0.5)' }}>
                        <div className='text'>
                            가게등록
                        </div>
                    </div>
                    <div className={`content2 ${temp1 == true ? "" : "contents_hidden"}`} style={{ boxShadow: '1px 3px 5px rgba(0, 0, 0, 0.5)' }}>
                        <div className='text'>
                            상품등록
                        </div>
                    </div>
                    <div className={`content3 ${temp1 == true ? "" : "contents_hidden"}`} style={{ boxShadow: '1px 3px 5px rgba(0, 0, 0, 0.5)' }}>
                        <div className='text'>
                            공지사항
                        </div>
                    </div>
                </div>
                <footer id="footer" className={`${temp1 == true ? "" : "footer_hidden"}`} style={{
                    backgroundColor: 'white', // 헤더 배경색
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // 그림자 효과
                    zIndex: 1, // 다른 요소 위에 나타나도록 설정
                    borderRadius: "20px",
                    marginTop: "32px"
                }}>
                    <div className='footer1'><a href="/">재고 30</a></div>
                    <div className='footer2'>개인정보 및 보호정책 등</div>
                </footer>
                <div className={`${temp1 == true ? "popup_view_none" : "popup_view"}`} style={{ position: "fixed", top: "50%" }}>
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
            </div>
        </div>
    );
}
export default Owner_main_page;