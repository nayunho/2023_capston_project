import './../App.css';
import { TextField, Button, InputAdornment } from "@mui/material";
import axios from "axios";
import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from 'react-avatar';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
function Edit_member_information() {
    let [nicname, setNicname] = useState("");
    let [recall, setRecall] = useState(false);
    let navigate = useNavigate();
    let [temp1, setTemp1] = useState(true);
    let [temp, setTemp] = useState(true);
    const fileInput = useRef(null);
    const mapContainer = useRef(null);
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
                    console.log(userInfo);
                }
            })
            .catch(error => {
                console.error('세션 데이터를 가져오는데 실패함', error);
            });
    }, [recall]);
    /*즐겨찾기*/
    let [temp3, setTemp3] = useState(true);
    let [shopsData, setShopsData] = useState([]);
    let [check, setCheck] = useState(false);
    let [user_confirm, setUser_confirm] = useState("");
    /*비밀번호수정*/
    const hasNotSameError = pwEntered =>
        newpw != newpw_check ? true : false;

    let [temp2, setTemp2] = useState(true);

    let [PWtemp2, setPWtemp2] = useState(true);
    let [newpw, setNewpw] = useState("");
    let [oldpw, setOldpw] = useState("");
    let [newpw_check, setNewpw_check] = useState("");

    let [nametemp2, setNametemp2] = useState(true);
    let [newname, setNewname] = useState("");

    let [nicknametemp2, setNicknametemp2] = useState(true);
    let [newnickname, setNewnickname] = useState("");

    let [phonetemp2, setPhonetemp2] = useState(true);
    let [newphone, setNewphone] = useState("");


    return (
        <div>
            <div className='edit_member_informationWrap' style={{ position: "relative" }}>
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
                <div className='edit_member_contents'>
                    <aside className='edit_member_content1'>
                        <ul >
                            <li>
                                <a href='/edit_member_information_social'>회원 정보수정</a>
                            </li>
                            <li>
                                <a href='#' >예약확인</a>
                            </li>
                            <li>
                                <a href='#'>즐겨찾기</a>
                            </li>
                            <li>
                                <a href='#'>신뢰점수</a>
                            </li>
                        </ul>
                    </aside>
                    <div className='edit_member_content2' >
                        <div>
                            <h2 className='member_title' style={{ margin: "0 auto", marginTop: "100px", marginLeft: "50px" }}>기본 회원정보<span>(필수)</span></h2>
                            <table style={{ borderCollapse: "collapse", borderRadius: "20px", backgroundColor: "white", width: "90%", height: "100%", margin: "0 auto", marginTop: "70px", boxShadow: " 5px 5px 5px 5px gray" }}>

                                <tr style={{ height: "80px", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                                    <th id="detail_title" style={{ width: "150px" }}>아이디</th>
                                    <td style={{ height: "11.6666%", width: "1000px", textAlign: "left", paddingLeft: "20px" }}>
                                        <span>{userInfo.id}</span>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr className={`${PWtemp2 == true ? "" : "table_none"}`} style={{ height: "70px", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                                    <th id="detail_title" style={{ width: "150px" }}>비밀번호</th>
                                    <td style={{ height: "80px", width: "1000px", textAlign: "left", paddingLeft: "20px" }}>
                                        <span>{userInfo.pw}</span>
                                    </td>
                                </tr>


                                <tr className={`${nametemp2 == true ? "" : "table_none"}`} style={{ height: "80px", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                                    <th id="detail_title" style={{ width: "150px" }}>이름(실명)</th>
                                    <td style={{ height: "11.6666%", width: "1000px", textAlign: "left", paddingLeft: "20px" }}>
                                        <span>{userInfo.name}</span>
                                    </td>
                                    <td style={{ width: "200px" }}>
                                        <a className="a2" style={{ borderRadius: "20px", border: "2px solid gray", padding: "10px 20px", cursor: "pointer" }} onClick={() => {
                                            setNametemp2(!nametemp2)
                                        }}>이름 변경</a>
                                    </td>
                                </tr>


                                <tr className={`${nametemp2 == true ? "table_none" : ""}`} style={{ height: "70px", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                                    <th id="detail_title" style={{ width: "150px" }}>이름(실명)</th>
                                    <td style={{ height: "11.6666%", width: "1000px", textAlign: "left", paddingLeft: "20px" }}>
                                        <div style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}>
                                            <div style={{ marginTop: "20px" }}>
                                                <span >신규 이름 입력</span>
                                            </div>
                                            <div >
                                                <TextField
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start" >
                                                                <PermIdentityIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    placeholder={`신규 이름 입력`}
                                                    label="new_name"
                                                    required
                                                    style={{ marginLeft: "10px" }}
                                                    name="newname"
                                                    value={newname}
                                                    sx={{
                                                        width: { sm: 200, md: 450 },
                                                        "& .MuiInputBase-root": {
                                                            height: 60
                                                        }
                                                    }}
                                                    autoFocus
                                                    onChange={(e) => {
                                                        setNewname(e.target.value);
                                                    }} />
                                            </div>
                                            <div style={{ marginTop: "20px" }}>
                                                <a className="b3" style={{ marginLeft: "20px", padding: "10px 20px", borderRadius: "20px", cursor: "pointer", border: "2px solid gray" }} onClick={() => {
                                                    setNametemp2(!nametemp2);
                                                    setNewname("");
                                                }}>취소</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>


                                <tr className={`${nicknametemp2 == true ? "" : "table_none"}`} style={{ height: "80px", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                                    <th id="detail_title" style={{ width: "150px" }}>닉네임</th>
                                    <td style={{ height: "11.6666%", width: "8001000pxpx", textAlign: "left", paddingLeft: "20px" }}>
                                        <span>{userInfo.nickname}</span>
                                    </td>
                                    <td style={{ width: "200px" }}>
                                        <a className="a3" style={{ borderRadius: "20px", border: "2px solid gray", padding: "10px 20px", cursor: "pointer" }} onClick={() => {
                                            setNicknametemp2(!nicknametemp2);
                                        }}>닉네임 변경</a>
                                    </td>
                                </tr>
                                <tr className={`${nicknametemp2 == true ? "table_none" : ""}`} style={{ height: "80px", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                                    <th id="detail_title" style={{ width: "150px" }}>닉네임</th>
                                    <td style={{ height: "11.6666%", width: "8001000pxpx", textAlign: "left", paddingLeft: "20px" }}>
                                        <div style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}>
                                            <div style={{ marginTop: "20px" }}>
                                                <span >신규 닉네임 입력</span>
                                            </div>
                                            <div >
                                                <TextField
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start" >
                                                                <PermIdentityIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    placeholder={`신규 닉네임 입력 (최대 15자)`}
                                                    label="new_nickname"
                                                    required
                                                    value={newnickname}
                                                    style={{ marginLeft: "10px" }}
                                                    name="newnickname"
                                                    sx={{
                                                        width: { sm: 200, md: 450 },
                                                        "& .MuiInputBase-root": {
                                                            height: 60
                                                        }
                                                    }}
                                                    autoFocus
                                                    onChange={(e) => {
                                                        setNewnickname(e.target.value);
                                                    }} />
                                            </div>
                                            <div style={{ marginTop: "20px" }}>
                                                <a className="b4" style={{ marginLeft: "20px", padding: "10px 20px", borderRadius: "20px", cursor: "pointer", border: "2px solid gray" }} onClick={() => {
                                                    setNicknametemp2(!nicknametemp2);
                                                    setNewnickname("");
                                                }}>취소</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>



                                <tr className={`${phonetemp2 == true ? "" : "table_none"}`} style={{ height: "80px" }}>
                                    <th id="detail_title" style={{ width: "150px" }}>휴대전화</th>
                                    <td style={{ height: "11.6666%", width: "1000px", textAlign: "left", paddingLeft: "20px" }}>
                                        <span>{userInfo.phone}</span>
                                    </td>
                                    <td style={{ width: "200px" }}>
                                        <a className="a4" style={{ borderRadius: "20px", border: "2px solid gray", padding: "10px 20px", cursor: "pointer" }} onClick={() => {
                                            setPhonetemp2(!phonetemp2);
                                        }}>휴대전화 변경</a>
                                    </td>
                                </tr>
                                <tr className={`${phonetemp2 == true ? "table_none" : ""}`} style={{ height: "80px" }}>
                                    <th id="detail_title" style={{ width: "150px" }}>휴대전화</th>
                                    <td style={{ height: "11.6666%", width: "1000px", textAlign: "left", paddingLeft: "20px" }}>
                                        <div style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}>
                                            <div style={{ marginTop: "20px" }}>
                                                <span >신규 번호 입력</span>
                                            </div>
                                            <div >
                                                <TextField
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start" >
                                                                <PermIdentityIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    placeholder={`신규 번호 입력 (-제외)`}
                                                    label="new_phone"
                                                    required
                                                    value={newphone}
                                                    style={{ marginLeft: "10px" }}
                                                    name="Newphone"
                                                    sx={{
                                                        width: { sm: 200, md: 450 },
                                                        "& .MuiInputBase-root": {
                                                            height: 60
                                                        }
                                                    }}
                                                    autoFocus
                                                    onChange={(e) => {
                                                        setNewphone(e.target.value);
                                                    }} />
                                            </div>
                                            <div style={{ marginTop: "20px" }}>
                                                <a className="b5" style={{ marginLeft: "20px", padding: "10px 20px", borderRadius: "20px", cursor: "pointer", border: "2px solid gray" }} onClick={() => {
                                                    setPhonetemp2(!phonetemp2);
                                                    setNewphone("");
                                                }}>취소</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div style={{ marginTop: "108px", marginBottom: "108px" }}>
                            <a className="a5" style={{ padding: "10px 20px", borderRadius: "20px", border: "2px solid gray", boxShadow: " 2px 2px 2px 2px gray", cursor: "pointer" }} onClick={() => {
                                if (newname != "" || newnickname != "" || newphone != "") {
                           if(newname==""){
                                        newname = userInfo.name;
                                    }
                                    if(newnickname==""){
                                        newnickname = userInfo.nickname;
                                    }
                                    if(newphone==""){
                                        newphone = userInfo.phone;
                                    }
                                    axios.put('/member/update/info', { //여기 링크 넣어야됨
                                        newname: newname,
                                        newnickname: newnickname,
                                        newphone: newphone
                                    }).then((response) => {
                                        window.alert("회원정보 변경 완료!");
                                        setNewname(''); // 텍스트 필드 초기화
                                        setNewnickname(''); // 텍스트 필드 초기화
                                        setNewphone(''); // 텍스트 필드 초기화
                                        navigate("/edit_member_information_social")
                                    }).catch(error =>{
                              window.alert(error.response.data.result);
                              console.log(error.response.data.resultCode);
                                        setNewname(''); // 텍스트 필드 초기화
                                        setNewnickname(''); // 텍스트 필드 초기화
                                        setNewphone(''); // 텍스트 필드 초기화
                                        navigate("/edit_member_information_social")
                                    });
                                } else {
                                    window.alert("입력한 값이 없습니다.")
                                }
                            }}>수정하기</a>
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






                <div className={`${temp1 == true ? "popup_view_none" : "popup_view"}`} style={{ position: "absolute", top: "50%", left: "50%" }}>
                    <div>
                        <Avatar
                            src={Image}
                            style={{ margin: '20px' }}
                            size={150}
                            onClick={() => { fileInput.current.click() }} />
                        <div><a href='/edit_member_information_social' style={{ color: "gray", textDecorationLine: 'underline' }}>회원 정보 수정</a></div>
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
        </div>
    );
}

export default Edit_member_information;