import React, { useState } from 'react';
import './../App.css';
import { useNavigate } from "react-router-dom";
function Id_result() {
    let [temp, setTemp] = useState(true);
    let navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const user_id = urlParams.get('user_id');
    console.log(`User Id: ${user_id}`);
    return (
        <div className='id_resultWrap'>
            <div className='id_title'>
                <span>아이디 찾기 결과</span>
            </div>
            <div className='id_result_show'>
                <span className='id_explanation'>회원님의 휴대전화로<br />
                    가입된 아이디가 있습니다.</span>
            </div>
            <div className='id_search_show'>
                <span>아이디</span>
                <span>{user_id}</span>
            </div>
            <div className='id_pw_search_show'>
                <span>비밀번호가 기억나지 않으세요?</span><a
                    onClick={() => {
                        const dataToSend = { key1: "/find_pw" }; // 전달할 데이터 객체
                        window.opener.postMessage(dataToSend, "*"); // 부모 창으로 데이터 전송
                        window.close(); // 팝업 창 닫기
                    }}>비밀번호 찾기</a>
            </div>
            <a className='goto_login' onClick={() => {
                const dataToSend = { key1: "/login" }; // 전달할 데이터 객체
                window.opener.postMessage(dataToSend, "*"); // 부모 창으로 데이터 전송
                window.close();
            }}>로그인 하러가기</a>
        </div>
    );
}
export default Id_result;