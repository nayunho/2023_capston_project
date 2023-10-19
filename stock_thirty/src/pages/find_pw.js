import React, { useState } from 'react';
import './../App.css';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, InputAdornment } from "@mui/material";
import LockIcon from "@material-ui/icons/Lock";
function Find_pw() {
    let [temp1, setTemp1] = useState(true);
    let navigate = useNavigate();
    let [temp, setTemp] = useState(true);
    function switchTemp() {
        setTemp(!temp);
    }
    let [search_switch1, setSearch_switch1] = useState(false);
    let [search_switch2, setSearch_switch2] = useState(true);
    let [user_id, setUser_id] = useState("");
    let [user_name, setUser_name] = useState("");
    let [user_phone, setUser_phone] = useState("");
    let [user_pw_phone, setUser_pw_phone] = useState("");
    let [user_verification_code1, setUser_verification_code1] = useState("");
    let [user_verification_code2, setUser_verification_code2] = useState("");
    let [tapmenu, setTapmenu] = useState(false);
    let [name_result, setName_result] = useState("");
    let [id_result, setId_result] = useState("");
    let [id_phone_result, setId_Phone_result] = useState("");
    let [verification_code_result1, setVerification_code_result1] = useState("");
    let [verification_code_result2, setVerification_code_result2] = useState("");
    return (
        <div className='App'>
            <div className='find_idWrap' >
                <header id='header' className={`${temp1 == true ? "" : "header_hidden"}`} style={{
                    backgroundColor: 'white', // 헤더 배경색
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // 그림자 효과
                    position: 'sticky', // 스크롤과 함께 고정
                    top: 0, // 화면 상단에 고정
                    zIndex: 1, // 다른 요소 위에 나타나도록 설정
                }}>
                    <div className='logo'><a href="/">재고 30 </a></div>
                    <nav className='nav' >
                        <ul >
                        <li>
                        <a href="/login">
                          로그인
                        </a>
                      </li>
                        </ul></nav>
                </header>
                <div style={{ width: "100%", height: "125px" }}></div>
                <div className='find_id'>
                    <div style={{marginTop:"50px"}}>
                        <a className={`find_btn1 ${search_switch1 == true ? "find_btn1_open" : ""}`} onClick={() => {
                            if (search_switch2 == true) {
                                setSearch_switch1(true);
                                setSearch_switch2(false);
                                setTapmenu(true);
                                setUser_pw_phone("");
                                setUser_id("");
                                setUser_verification_code2("");

                            } else {

                            }
                        }}>아이디 찾기</a>
                        <a className={`find_btn2 ${search_switch2 == true ? "find_btn2_open" : ""}`} onClick={() => {
                            if (search_switch1 == true) {
                                setSearch_switch1(false);
                                setSearch_switch2(true);
                                setTapmenu(false);
                                setUser_phone("");
                                setUser_name("");
                                setUser_verification_code1("");
                            } else {

                            }
                        }}>비밀번호 찾기</a>
                    </div>
                    <div className={`find_text_id ${tapmenu == true ? "" : "tapmenu_hidden"}`} >
                        <table style={{margin:"0 auto"}}>
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
                                        placeholder='이름을 입력하세요'
                                        label="user_name"
                                        required
                                        name="user_name"
                                        value={user_name}
                                        autoComplete="user_name"
                                        sx={{
                                            width: { sm: 200, md: 350 },
                                            "& .MuiInputBase-root": {
                                                height: 50
                                            }
                                        }}
                                        onChange={(e) => {
                                            setUser_name(e.currentTarget.value);
                                        }} />
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ height: "20px" }}></td>
                                <td></td>
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
                                        placeholder="전화번호을 입력하세요 ('-'제외)"
                                        label="user_phone"
                                        required
                                        name="user_phone"
                                        value={user_phone}
                                        autoComplete="user_phone"
                                        sx={{
                                            width: { sm: 200, md: 350 },
                                            "& .MuiInputBase-root": {
                                                height: 60
                                            }
                                        }}
                                        onChange={(e) => {
                                            setUser_phone(e.currentTarget.value);
                                        }} />
                                </td>
                                <td>
                                    <div >
                                        <a className='number_request' onClick={() => {
                                            //데이터스프링에전송하고 
                                            axios.get('/findId_sendMessage', {
                                    params:{
                                                   name: user_name,
                                                   phone: user_phone,
                                                }
                                            }).then(response => {//데이터 전송 성공시
                                                setName_result(true);
                                                window.alert("인증번호를 보냈습니다.");
                                            }).catch(error => {//실패시
                                                setName_result(false);
                                                setUser_name("");
                                                setUser_phone("");
                                                window.alert("이름 또는 전화번호가 일치하지 않습니다.");
                                            })
                                        }} style={{cursor:"pointer"}}>인증번호 요청</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ height: "20px" }}></td>
                                <td></td>
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
                                        placeholder="인증번호 6자리 입력해주세요"
                                        label="verification code"
                                        required
                                        name="user_verification_code1"
                                        autoComplete="verification code"
                                        value={user_verification_code1}
                                        sx={{
                                            width: { sm: 200, md: 350 },
                                            "& .MuiInputBase-root": {
                                                height: 60
                                            }
                                        }}
                                        onChange={(e) => {
                                            setUser_verification_code1(e.currentTarget.value);
                                        }} />
                                </td>
                                <td>
                                    <div >
                                    <a className='number_request_result' onClick={() => {
                                            if (name_result == true) {
                                                console.log(user_verification_code1)
                                                axios.get('/Id_Code_verification', {
                                                    params: {
                                                        code: user_verification_code1,
                                                    }
                                                }).then(response => {//데이터 전송 성공시
                                                    window.alert("인증번호가 일치합니다.");
                                                    setVerification_code_result1(true)

                                                }).catch(error => {//실패시
                                                    window.alert("인증번호가 일치하지않습니다.");
                                                    setVerification_code_result1(false)
                                                    setUser_verification_code1("");
                                                })
                                            } else if (name_result == false) {
                                                window.alert("이름과 전화번호를 확인해 주세요");
                                                setUser_verification_code1("");
                                                setUser_name("");
                                                setUser_phone("");
                                            }
                                        }} style={{ cursor: "pointer" }}>확인</a>
                                    </div>
                                </td>
                            </tr>
                            <tr >
                                <td colspan={2} style={{height:"100px"}}>
                                    <a className="search_id_btn" style={{cursor:"pointer", padding:"15px 200px",borderRadius:"20px", border:"3px solid rgb(219, 215, 215)"}}
                                    onClick={()=>{
                                        if (verification_code_result1 == true) {
                                            axios.get('/find_id', {

                                            }).then(response => {//데이터 전송 성공시
                                                const width = 500; // Width of the popup window
                                                const height = 400; // Height of the popup window
                                                const left = window.innerWidth / 2 - width / 2; // Center the window horizontally
                                                const top = window.innerHeight / 2 - height / 2; // Center the window vertically
                                                const user_id = response.data;
                                                const queryString = `?user_id=${user_id}`;
                                                const popupURL = `/id_result${queryString}`;
                                                // Open a new popup window with the desired URL and properties
                                                window.open(
                                                    popupURL,
                                                    "Popup",
                                                    `width=${width},height=${height},left=500px,top=200px`
                                                );
                                                setUser_name("");
                                                setUser_phone("");
                                                setUser_verification_code1("");
                                            }).catch(error => {//실패시
                                                window.alert("이름 또는 전화번호가 일치하지 않습니다.");
                                                setUser_name("");
                                                setUser_phone("");
                                                setUser_verification_code1("");
                                            })
                                        } else {
                                            window.alert("선행과정을 진행해주세요")
                                            setUser_name("");
                                                setUser_phone("");
                                                setUser_verification_code1("");
                                        }
                                    }}>아이디 찾기</a>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className={`find_text_pw ${tapmenu == true ? "tapmenu_hidden" : ""}`} >
                        <table style={{margin:"0 auto"}}>
                            <tr>
                                <td >
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder='아이디를 입력하세요'
                                        label="user_id"
                                        required
                                        name="user_id"
                                        value={user_id}
                                        autoComplete="user_id"
                                        sx={{
                                            width: { sm: 200, md: 350 },
                                            "& .MuiInputBase-root": {
                                                height: 50
                                            }
                                        }}
                                        onChange={(e) => {
                                            setUser_id(e.currentTarget.value);
                                        }} />
                                </td>
                                <td>
                                    <div >
                                        <a  className='result_id_request' onClick={() => {
                                            //데이터스프링에전송하고 
                                            axios.get('/ID_verification', {
                                    params : {
                                                   id: user_id,
                                    }
                                            }).then(response => {//데이터 전송 성공시
                                                setId_result(true);
                                                window.alert("아이디가 존재합니다.");
                                            }).catch(error => {//실패시
                                                setId_result(false);
                                                window.alert("아이디가 존재하지 않습니다.");
                                                setUser_id("");
                                            })
                                        }} style={{cursor:"pointer"}}>확인 요청</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ height: "20px" }}></td>
                                <td></td>
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
                                        placeholder="전화번호을 입력하세요 ('-'제외)"
                                        label="user_phone"
                                        required
                                        name="user_phone"
                                        value={user_pw_phone}
                                        autoComplete="user_phone"
                                        sx={{
                                            width: { sm: 200, md: 350 },
                                            "& .MuiInputBase-root": {
                                                height: 60
                                            }
                                        }}
                                        onChange={(e) => {
                                            setUser_pw_phone(e.currentTarget.value);
                                        }} />
                                </td>
                                <td>
                                    <div >
                                    <a className='number_request' onClick={() => {
                                            if(id_result==true){
                                            //데이터스프링에전송하고 
                                            axios.get('/findPw_sendMessage', {
                                                params: {
                                                    phone: user_pw_phone,
                                                }
                                            }).then(response => {//데이터 전송 성공시
                                                setId_Phone_result(true);
                                                window.alert("인증번호를 보냈습니다.");
                                            }).catch(error => {//실패시
                                                setId_Phone_result(false);
                                                setUser_pw_phone("");
;                                                window.alert("전화번호가 일치하지 않습니다.");
                                            })
                                        }else{
                                            window.alert("아이디를 먼저 확인해주세요");
                                            setUser_pw_phone("");
                                            setUser_id("");
                                        }
                                        }} style={{ cursor: "pointer",height:"40px",lineHeight:"1.35" }}>인증번호 요청</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ height: "20px" }}></td>
                                <td></td>
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
                                        placeholder="인증번호 6자리 입력해주세요"
                                        label="verification code"
                                        required
                                        name="user_verification_code2"
                                        value={user_verification_code2}
                                        autoComplete="verification code"
                                        sx={{
                                            width: { sm: 200, md: 350 },
                                            "& .MuiInputBase-root": {
                                                height: 60
                                            }
                                        }}
                                        onChange={(e) => {
                                            setUser_verification_code2(e.currentTarget.value);
                                        }} />
                                </td>
                                <td>
                                    <div >
                                    <a className='number_request_result' onClick={() => {
                                            if (id_phone_result == true) {
                                                console.log(user_verification_code2)
                                                axios.get('/Pw_Code_verification', {
                                                    params: {
                                                        code: user_verification_code2,

                                                    }
                                                }).then(response => {//데이터 전송 성공시
                                                    window.alert("인증번호가 일치합니다.");
                                                    const width = 500; // Width of the popup window
                                                    const height = 400; // Height of the popup window
                                                    const left = window.innerWidth / 2 - width / 2; // Center the window horizontally
                                                    const top = window.innerHeight / 2 - height / 2; // Center the window vertically
                                                    // Open a new popup window with the desired URL and properties
                                                    window.open(
                                                        response.data.redirect,
                                                        "Popup",
                                                        `width=${width},height=${height},left=500px,top=200px`
                                                    );
                                                    navigate("/login");
                                                    setUser_pw_phone("");
                                                    setUser_id("");
                                                    setUser_verification_code2("");
                                                }).catch(error => {//실패시
                                                    window.alert("인증번호가 일치하지않습니다.");
                                                    navigate("/find_pw");
                                                    setUser_pw_phone("");
                                                    setUser_id("");
                                                    setUser_verification_code2("");
                                                })
                                            } else if (id_phone_result == false) {
                                                window.alert("아이디와 전화번호를 확인해 주세요");
                                                setUser_pw_phone("");
                                                    setUser_id("");
                                                    setUser_verification_code2("");
                                            }
                                        }} style={{ cursor: "pointer" }}>확인</a>
                                    </div>
                                </td>
                            </tr>

                        </table>
                    </div>
                </div>
            </div>
            <footer id="footer" className={`${temp1 == true ? "" : "footer_hidden"}`} style={{
                    backgroundColor: 'white', // 헤더 배경색
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', // 그림자 효과
                    zIndex: 1, // 다른 요소 위에 나타나도록 설정
                    borderBottomLeftRadius: "20px",
                }}>
                    <div className='footer1'><a href="/">재고 30</a></div>
                    <div className='footer2'>개인정보 및 보호정책 등</div>
                </footer>
        </div>
    );
}
export default Find_pw