import './../App.css';
import { KAKAO_AUTH_URL } from './../token/OAuth.js';
import { NAVER_AUTH_URL } from './../token/OAuth2.js';
import KakoImg from "./../img/Kakao_login.png";
import NaverImg from "./../img/Naver_login.png";
import { TextField, Button, InputAdornment } from "@mui/material";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";
import { lazy, Suspense, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
    let navigate = useNavigate();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    return (
        <div className='wrap' style={{ backgroundColor: "rgb(209, 209, 214)" }}>
            <div className="loginWrap" style={{ borderRadius: "20px", boxShadow: "0px 0px 5px rgba(0, 0, 0, 1)" }} >
                <div className="imgarea" style={{ borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" }}>
                    <div className="text">
                        <h2>제목</h2>
                        <span>환영합니다</span>
                    </div>
                </div>
                <div className="login" style={{ borderTopRightRadius: "20px", borderBottomRightRadius: "20px", boxShadow: "-10px 0px 5px rgba(0, 0, 0, 0.3)" }} >
                    <p>Login</p>
                    <div id="textFeild">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <PermIdentityIcon />
                                    </InputAdornment>
                                ),
                            }}
                            placeholder='아이디를 입력해주세요'
                            label="ID"
                            required
                            name="id"
                            sx={{
                                width: { sm: 200, md: 350 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                            autoComplete="id"
                            autoFocus
                            onChange={(e) => {
                                setId(e.target.value);
                            }} />
                    </div>
                    <div id="textFeild" style={{ paddingBottom: "20px" }}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                            placeholder='비밀번호를 입력해주세요'
                            label="password"
                            type="password"
                            required
                            name="password"
                            sx={{
                                width: { sm: 200, md: 350 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                            onChange={(e) => {
                                setPw(e.target.value);
                            }} />
                    </div>
                    <div className='inventory_btn'>
                        <a onClick={() => {//데이터스프링에전송하고 
                            axios.post('/login', {
                                id: id,
                                pw: pw,
                            }).then(response => {//데이터를받아오는게성공시 다른페이지호출
                                axios.get('/getSessionMember')
                                    .then(response => {
                                        const userData = response.data;
                                        console.log(userData.redirect)
                                        const user_role = userData.role;
                                        if(user_role=="사용자"){
                                            window.location.href="/home_user"
                                        }else if(user_role=="상업자"){
                                            window.location.href="/owner_main_page";
                                        }
                                    })
                                    .catch(error => {
                                        console.error('세션 데이터를 가져오는데 실패함', error);
                                    });
                            }).catch(error => {//데이터를받아오는게 실패시 오류 메세지출력하고 다시 login페이지 호출
                                console.log(error.response.data.resultCode);
                                console.log(error.response.data.result);
                                window.alert(error.response.data.result);
                                navigate("/login")
                            })

                        }} style={{ cursor: "pointer", borderRadius: "10px" }}>로그인</a>
                    </div>
                    <div className='serch_id_pw' style={{ margin: "10px 75px 10px 0px" }}>
                        <a href='/sign_up' style={{ marginRight: "10px" }}>회원가입</a>&nbsp;|&nbsp;
                        <a href='find_id' style={{ margin: "0px 10px" }}>아이디 찾기</a>&nbsp;|&nbsp;
                        <a href='find_pw' style={{ marginLeft: "10px" }}>비밀번호 찾기</a>
                    </div>
                    <div className='social_btns'>
                        <a className="social_btn_kakao" href={KAKAO_AUTH_URL}><img src={KakoImg} style={{ width: "350px", height: "55px" }} /></a>
                        <a className="social_btn_naver" href={NAVER_AUTH_URL}><img src={NaverImg} style={{ width: "350px", height: "55px" }} /></a>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Login