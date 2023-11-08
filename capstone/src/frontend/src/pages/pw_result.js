import React, { useEffect, useState } from 'react';
import './../App.css';
import { useNavigate } from "react-router-dom";
import { TextField, Button, InputAdornment } from "@mui/material";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import axios from "axios";
function Pw_result() {
    let [new_pw, setNew_pw] = useState("");
    let [checknew_pw, setCheck_new_pw] = useState("");
    let [temp, setTemp] = useState("0");
    const hasNotSameError = pwEntered =>
        new_pw != checknew_pw ? true : false;

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다

        if (new_pw !== checknew_pw) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }else{
        }
    }
    return (
        <div>
            <div className="pw_resultWrap">
                <div className="pw_rechange_title">
                    <h2>비밀번호 재설정</h2>
                    <span className='span1'>비밀번호를 변경해주세요</span><br />
                    <span className='span2'>다른 사이트에서 사용한적이 없는 안전한 비밀번호로 변경해주세요</span>
                </div>
                <div className='text'>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" >
                                    <PermIdentityIcon />
                                </InputAdornment>
                            ),
                        }}
                        placeholder="새 비밀번호를 입력해 주세요 (최대 15자)"
                        label="new_pw"
                        required
                        name="new_pw"
                        autoComplete="id"
                        sx={{
                            width: { sm: 400, md: 550 },
                            "& .MuiInputBase-root": {
                                height: 60
                            }
                        }}
                        autoFocus
                        onChange={(e) => {
                            setNew_pw(e.target.value);
                        }} />
                </div>
                <div className='text'>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" >
                                    <PermIdentityIcon />
                                </InputAdornment>
                            ),
                        }}
                        placeholder="새 비밀번호 확인해주세요 (최대 15자)"
                        label="check_pw"
                        required
                        name="check_pw"
                        autoComplete="check_pw"
                        sx={{
                            width: { sm: 400, md: 550 },
                            "& .MuiInputBase-root": {
                                height: 60
                            }
                        }}
                        autoFocus
                        onChange={(e) => {
                            setCheck_new_pw(e.target.value);
                        }}
                        error={hasNotSameError('check_pw')} // 해당 텍스트필드에 error 핸들러 추가
                        helperText={
                            hasNotSameError('check_pw') ? "입력한 비밀번호와 일치하지 않습니다." : null
                        } // 에러일 경우에만 안내 문구 표시
                    />
                </div>
                <div className='pw_change_btn'><a onClick={() => {
                    axios.put('/updatepw', {
                            pw: new_pw
                    }).then((reponse) => {
                        const dataToSend = { key1: "/login" }; // 전달할 데이터 객체
                        window.alert("비밀번호 변경 완료")
                        window.opener.postMessage(dataToSend, "*"); // 부모 창으로 데이터 전송
                        window.close(); // 팝업 창 닫기

                    }).catch(error => {
                      let errorMessages = Object.values(error.response.data).join('\n');
                      console.log(error);
                      window.alert(errorMessages);
                    })
                }} type='submit'>완료</a></div>
                <div id="pw_change_list">
                    <ul className="pw_change_list" style={{ marginLeft: "20px", textAlign: "left" }}>
                        <li style={{ listStyleType: "circle", color: "black" }}>영문, 숫자, 특수문자를 함께 사용하면 보다 안전합니다.</li>
                        <li style={{ listStyleType: "circle", color: "black" }}>다른 사이트와 다른 아이디만의 비밀번호를 만들어 주세요.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Pw_result;