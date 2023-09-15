import './../App.css';
import { KAKAO_AUTH_URL } from './../token/OAuth.js';
import KakoImg from "./../img/Kakao_login.png";
import { TextField, Button, InputAdornment } from "@mui/material";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockIcon from "@material-ui/icons/Lock";
import { lazy, Suspense, createContext, useState, useEffect } from "react";
function Login(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className='wrap' style={{ backgroundColor: "rgb(209, 209, 214)" }}>
            <div className="loginWrap" >
                <div className="imgarea">
                    <div className="text">
                        <h2>제목</h2>
                        <span>환영합니다</span>
                    </div>
                </div>
                <div className="login">
                    <p>login</p>
                    <div id="textFeild">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <PermIdentityIcon />
                                    </InputAdornment>
                                ),
                            }}
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
                                setPassword(e.target.value);
                            }} />
                    </div>
                    <div className='inventory_btn'>
                        <a href='#'>로그인</a>
                    </div>
                    <div className='serch_id_pw' style={{ margin: "10px 55px 10px 0px" }}>
                        <a href='/sign_up' style={{ marginRight: "10px" }}>회원가입&nbsp;</a>|
                        <a href='#' style={{ margin: "0px 10px" }}>&nbsp;아이디 찾기&nbsp;</a>|
                        <a href='#' style={{ marginLeft: "10px" }}>&nbsp;비밀번호 찾기</a>
                    </div>
                    <div className='social_btns'>
                        <a href={KAKAO_AUTH_URL}><img src={KakoImg} style={{ width: "350px" }} /></a>
                        <a href={KAKAO_AUTH_URL}><img src={KakoImg} style={{ width: "350px" }} /></a>
                        <a href={KAKAO_AUTH_URL}><img src={KakoImg} style={{ width: "350px" }} /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login