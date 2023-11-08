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
import LogoutIcon from '@mui/icons-material/Logout';
import RoomIcon from '@mui/icons-material/Room';
import EditNoteIcon from '@mui/icons-material/EditNote';
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
                    console.log(userData.id);
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
    /*즐겨찾기 수정*/
    let [temp5, setTemp5] = useState(true);
    let [selectedStores, setSelectedStores] = useState([]);
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

    const handleClick = () => {
        if (userInfo.role === '사용자') {
          window.location.href="/home_user";
        } else if (userInfo.role === '상업자') {
          window.location.href="/home_owner";
        }
     };
      /*예약확인*/
    let [temp6, setTemp6] = useState(true);
    let [regervation, setRegervation] = useState([]);
    let [selectedregervationStores, setSelectedregervationStores] = useState([]);
    let [search_switch3, setSearch_switch3] = useState(true);
    let [search_switch4, setSearch_switch4] = useState(false);
    let [tapmenu1, setTapmenu1] = useState(true);
    let [confirmstate, setConfirmstate] = useState('wait');
       /*신뢰점수*/
    let [trust_popup, setTrust_popup] = useState(true);
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
    /*별점 */
    let [temp7, setTemp7] = useState(true);
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const array = [0, 1, 2, 3, 4]
    const handleStarClick = index => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i <= index ? true : false;
        }
        setClicked(clickStates);
    };
    let score = clicked.filter(Boolean).length;
    let [starreservation, setStarreservation] = useState([]);
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
                    <div className='logo'><a onClick={handleClick} style={{ cursor: 'pointer' }}> 재고 30 </a></div>
                    <nav className='nav'>
                        <ul>
                            <li>
                                <a href="/" onClick={() => {
                                    axios.get('/SessionLogout', {
                                    })
                                    window.alert("로그아웃되었습니다.");
                                }
                                }>
                                    <LogoutIcon fontSize="large" />
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
                    <div className='edit_member_content2' >
                        <div>
                            <h2 className='member_title' style={{ margin: "0 auto", marginTop: "100px", marginLeft: "50px" }}>기본 회원정보<span>(필수)</span></h2>
                            <table style={{ borderCollapse: "collapse", borderRadius: "20px", backgroundColor: "white", width: "90%", height: "100%", margin: "0 auto", marginTop: "70px", boxShadow: " 5px 5px 5px 5px gray" }}>

                                <tr style={{ height: "100px", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                                    <th id="detail_title" style={{ width: "150px" }}>아이디</th>
                                    <td style={{ height: "11.6666%", width: "1000px", textAlign: "left", paddingLeft: "20px" }}>
                                        <span>{userInfo.id}</span>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr className={`${PWtemp2 == true ? "" : "table_none"}`} style={{ height: "100px", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                                    <th id="detail_title" style={{ width: "150px" }}>비밀번호</th>
                                    <td style={{ height: "80px", width: "1000px", textAlign: "left", paddingLeft: "20px" }}>
                                        <span>{userInfo.pw}</span>
                                    </td>
                                    <td style={{ width: "200px" }}>
                                        <a className="a1" style={{ borderRadius: "20px", border: "2px solid gray", padding: "10px 20px", cursor: "pointer" }} onClick={() => {
                                            setPWtemp2(!PWtemp2)
                                        }}>비밀번호 변경</a>
                                    </td>
                                </tr>


                                <tr className={`${PWtemp2 == true ? "table_none" : ""}`} style={{ height: "70px", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
                                    <th id="detail_title" style={{ width: "150px" }}>비밀번호</th>
                                    <td style={{ height: "11.6666%", width: "1000px", textAlign: "left", paddingLeft: "20px" }}>
                                        <div style={{ display: "flex" }}>
                                            <div style={{ marginTop: "40px" }}>
                                                <span >현재 비밀번호</span>
                                            </div>
                                            <div>
                                                <TextField
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start" >
                                                                <PermIdentityIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    placeholder={`현재 비밀번호를 입력해주세요`}
                                                    label="old_pw"
                                                    required
                                                    style={{ marginLeft: '70px', marginBottom: "20px", marginTop: "20px" }}
                                                    name="oldpw"
                                                    type="password"
                                                    autoComplete="pw"
                                                    sx={{
                                                        width: { sm: 200, md: 450 },
                                                        "& .MuiInputBase-root": {
                                                            height: 60
                                                        }
                                                    }}
                                                    value={oldpw}
                                                    autoFocus
                                                    onChange={(e) => {
                                                        setOldpw(e.target.value);
                                                    }} />
                                            </div>
                                        </div>
                                        <div style={{ display: "flex" }}><div style={{ marginTop: "20px" }}>

                                            <span >신규 비밀번호</span>
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
                                                    placeholder={`새로운 비밀번호를 입력해주세요`}
                                                    label="new_pw"
                                                    required
                                                    name="newpw"
                                                    style={{ marginLeft: '70px', marginBottom: "20px" }}
                                                    type="password"
                                                    autoComplete="pw"
                                                    value={newpw}
                                                    sx={{
                                                        width: { sm: 200, md: 450 },
                                                        "& .MuiInputBase-root": {
                                                            height: 60
                                                        }
                                                    }}
                                                    autoFocus
                                                    onChange={(e) => {
                                                        setNewpw(e.target.value);
                                                    }}

                                                />
                                            </div>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <div style={{ marginTop: "20px" }}>
                                                <span >신규 비밀번호 재 입력</span>
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
                                                    placeholder={`신규 비밀번호 재 입력`}
                                                    label="new_pw_check"
                                                    required
                                                    style={{ marginLeft: "10px" }}
                                                    name="newpw_check"
                                                    type="password"
                                                    autoComplete="pw"
                                                    sx={{
                                                        width: { sm: 200, md: 450 },
                                                        "& .MuiInputBase-root": {
                                                            height: 60
                                                        }
                                                    }}
                                                    value={newpw_check}
                                                    autoFocus
                                                    onChange={(e) => {
                                                        setNewpw_check(e.target.value);
                                                    }}
                                                    error={hasNotSameError('newpw_check')} // 해당 텍스트필드에 error 핸들러 추가
                                                    helperText={
                                                        hasNotSameError('newpw_check') ? "입력한 비밀번호와 일치하지 않습니다." : null //true이면 일치안한거임
                                                    } />

                                            </div>
                                        </div>
                                        <div className='pw_btn' style={{ height: "40px", marginTop: "20px" }}>
                                            <a className="b1" style={{ padding: "10px 20px", display: "inlineBlock", borderRadius: "20px", cursor: "pointer", border: "2px solid gray" }} onClick={() => {
                                                setOldpw(''); // 텍스트 필드 초기화
                                                setNewpw(''); // 텍스트 필드 초기화
                                                setNewpw_check(''); // 텍스트 필드 초기화
                                                setPWtemp2(!PWtemp2);

                                            }}>취소</a><a className="b2" style={{ marginLeft: "20px", padding: "10px 20px", display: "inlineBlock", borderRadius: "20px", cursor: "pointer", border: "2px solid gray" }} onClick={() => {
                                                if (hasNotSameError('newpw_check') == true) {
                                                    window.alert("신규 비밀번호가 일치하지 않습니다.")
                                                    setOldpw('');
                                                    setNewpw_check('');
                                                    setNewpw('');
                                                } 
                                                 if (newpw_check != "" || oldpw != "" || newpw != "") {
                                       const formData = new FormData();
                    
                                            formData.append('oldpw', oldpw);
                                            formData.append('pw', newpw);
                                                    axios.put('/member/update/pw',formData)
                                                    .then((response) => {
                                                        window.alert("비밀번호 변경 완료!");
                                                        setOldpw(''); // 텍스트 필드 초기화
                                                        setNewpw(''); // 텍스트 필드 초기화
                                                        setNewpw_check(''); // 텍스트 필드 초기화
                                                        // setPWtemp2(!PWtemp2); 둘중하나 테스트
                                                        // setRecall(!recall);
                                                        navigate("/edit_member_information")
                                                    }).catch(error => {
                                                        // 에러 처리 등
                                                        if(error.response.data.result){
                                             window.alert(error.response.data.result);
                                          }else{
                                             window.alert("비밀번호 변경 실패!");
                                          }
                                                        setOldpw(''); // 텍스트 필드 초기화
                                                        setNewpw(''); // 텍스트 필드 초기화
                                                        setNewpw_check(''); // 텍스트 필드 초기화
                                                        setPWtemp2(!PWtemp2);
                                                    });
                                                } else {
                                                    window.alert("입력한 값이 없습니다.")
                                                }
                                            }}>완료</a>
                                        </div>
                                    </td>
                                </tr>
                                


                                <tr className={`${nametemp2 == true ? "" : "table_none"}`} style={{ height: "100px", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
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


                                <tr className={`${nicknametemp2 == true ? "" : "table_none"}`} style={{ height: "100px", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>
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



                                <tr className={`${phonetemp2 == true ? "" : "table_none"}`} style={{ height: "100px" }}>
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
                                        name: newname,
                                        nickname: newnickname,
                                        phone: newphone
                                    }).then((response) => { 
                                        window.alert("회원정보 변경 완료!");
                                        setNewname(''); // 텍스트 필드 초기화
                                        setNewnickname(''); // 텍스트 필드 초기화
                                        setNewphone(''); // 텍스트 필드 초기화
                                        navigate("/edit_member_information")
                                    }).catch(error =>{
                              window.alert(error.response.data.result);
                                        setNewname(''); // 텍스트 필드 초기화
                                        setNewnickname(''); // 텍스트 필드 초기화
                                        setNewphone(''); // 텍스트 필드 초기화
                                        navigate("/edit_member_information")
                                        
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
                    borderRadius: "20px",
                    height:"80px"
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
                        <div><a href='/edit_member_information' style={{ color: "gray", textDecorationLine: 'underline' }}>회원 정보 수정</a></div>
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
                            setConfirmstate("wait")
                            setTapmenu1(true);
                            axios.get('/item/reservation/getreservations', {
                                params: {
                                    confirm: confirmstate
                                }
                            })
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
                    {
                        userInfo.role === '상업자'?
                        <div id="popsec2" style={{ cursor: "pointer" }}>
                        <a href="owner_storelist"><span>내 가게</span></a>
                    </div>:null
                    }
                    
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
                                        <img src={"/shopimages/" + `${store.imageFilename}`} alt={store.imageFilename} style={{ backgroundCover: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: "100px", float: "Left" }} />
                                    </div>
                                    <div style={{ width: "1000px", marginTop: "10px", lineHeight: "1.8" }}>
                                        <div className='fv_store_name' style={{ textAlign: "left" }}>
                                            {store.shopName}
                                        </div>
                                        <div className='fv_store_address'>
                                            {store.shopAddress}
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
                                    <img src={"/shopimages/" + `${store.imageFilename}`} alt={store.imageFilename} style={{ backgroundCover: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: "100px", float: "Left" }} />
                                </div>
                                <div style={{ width: "1000px", marginTop: "10px", lineHeight: "1.8" }}>
                                    <div className='fv_store_name' style={{ textAlign: "left" }}>
                                        {store.shopName}
                                    </div>
                                    <div className='fv_store_address'>
                                        {store.shopAddress}
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

                <div id={`${temp6 == true ? "regervation_none" : "regervation_view"}`}>
                    <span className="regervation_close" style={{ fontSize: "25px", position: "absolute", top: "10px", right: "19px", cursor: "pointer", padding: "0px 10px", fontSize: "25px", fontWeight: "700" }} onClick={() => {
                        setTemp6(!temp6);
                        setSearch_switch3(true);
                        setSearch_switch4(false);
                        setTapmenu1(false);
                        setSelectedregervationStores([]);
                    }}>X</span>
                    <div className='regervation_title' style={{ borderBottom: "2px solid rgba(0,0,0,0.3)", paddingBottom: "30px" }}>
                        <span>예약 내역</span>
                    </div>
                    <div className='reservation_check' >
                        <div className='reservation_select'>
                            <a className={`res_select_btn1 ${search_switch3 == true ? "res_select_btn1_open" : ""}`} onClick={() => {
                                if (search_switch4 == true) {
                                    setConfirmstate('wait');
                                    setSearch_switch3(true);
                                    setSearch_switch4(false);
                                    setTapmenu1(true);
                                    console.log("confirm = " + confirmstate)
                                    axios.get('/item/reservation/getreservations', {
                                        params: {
                                            confirm: 'wait'
                                        }
                                    })
                                        .then((response) => {
                                            setRegervation(response.data);
                                            console.log(tapmenu1);
                                        })
                                        .catch(error => {
                                            setRegervation([]);
                                            window.alert(error.response.data.result);
                                        })
                                }
                                else {

                                }
                            }}> waiting </a>
                            <a className={`res_select_btn2 ${search_switch4 == true ? "res_select_btn2_open" : ""}`} onClick={() => {
                                if (search_switch3 == true) {
                                    setConfirmstate('true');
                                    setSearch_switch3(false);
                                    setSearch_switch4(true);
                                    setTapmenu1(false);
                                    setSelectedregervationStores([]);
                                    console.log(confirmstate)
                                    axios.get('/item/reservation/getreservations', {
                                        params: {
                                            confirm: 'true',
                                        }
                                    })
                                        .then((response) => {
                                            setRegervation(response.data);
                                            console.log(tapmenu1);
                                        })
                                        .catch(error => {
                                            window.alert(error.response.data.result);
                                        })
                                }
                                else {

                                }
                            }}> complete </a>
                        </div>
                        <div className={`find_text_id ${tapmenu1 == true ? "" : "tapmenu1_hidden"}`} >
                            <div className="regervation_content" style={{ width: "90%", height: "370px", margin: "0 auto", marginTop: "-15px" }}>
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
                                                let rsidx = store.reservationidx;
                                                if (isChecked) {
                                                    if (selectedregervationStores.some(item => item.shopaddress === address)) {
                                                        // 이미 선택된 주소인 경우, 아무것도 하지 않음
                                                        if (selectedregervationStores.reservationidx !== store.reservationidx) {
                                                            let copy = [...selectedregervationStores, store];
                                                            setSelectedregervationStores(copy);
                                                        }
                                                    } else {
                                                        // 새로운 배열을 생성하여 선택된 항목을 추가
                                                        let copy = [...selectedregervationStores, store];
                                                        setSelectedregervationStores(copy);
                                                    }
                                                } else {
                                                    // 선택 해제된 경우, 해당 주소를 가진 항목을 배열에서 제거
                                                    setSelectedregervationStores(prevStores => prevStores.filter(item => item.reservationidx !== rsidx));
                                                }
                                            }}
                                            style={{ position: "absolute", top: "0", right: "0", width: "25px", height: "25px", cursor: "pointer" }} />

                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`find_text_pw ${tapmenu1 == true ? "tapmenu1_hidden" : ""}`}>
                            <div className="regervation_content" style={{ width: "90%", height: "370px", margin: "0 auto", marginTop: "-15px" }}>
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
                                        <div>
                                            <button style={{ position: "absolute", top: "50px", right: "0", borderRadius: "20px", width: "80px", height: "35px", cursor: "pointer" }} onClick={() => {
                                                setTemp7(!temp7);
                                                setStarreservation(store);
                                            }}>
                                                <span>별점</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="remove_regervation_Store" style={{ marginTop: "25px", padding: "10px 50px", borderRadius: "50px", border: "1px solid rgba(0,0,0,0.3)", cursor: "pointer", fontWeight: "700", fontSize: "25px" }} onClick={() => {
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
                        setTemp6(!temp6);
                    }}>
                        삭제 {selectedregervationStores.length}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Edit_member_information;