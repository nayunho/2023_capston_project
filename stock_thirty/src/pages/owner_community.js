import React, { useState } from 'react';
import './../App.css';
import axios from "axios";
import { useEffect, useRef } from 'react';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
function Owner_community(){
    let [recall, setRecall] = useState(false);
    let [temp1, setTemp1] = useState(true);
    let [temp, setTemp] = useState(true);
    const [userInfo, setUserInfo] = useState("");
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
    return(
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
                                <a href="owner_community" >
                                    커뮤니티
                                </a>
                            </li>
                            <li>
                                <a className='mypages' style={{ cursor: "pointer" }}>
                                    <AccountCircleIcon fontSize="large" /> <span>{userInfo.nickname}</span>
                                </a>

                            </li>
                        </ul></nav>
                </header>
                <div style={{ width: "100%", height: "25px" }}></div>
                <div className={`banner ${temp1 == true ? "" : "banner_hidden"}`} style={{ borderRadius: "20px", boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}>
                    <div className='text'>
                        <span >가게를 등록하여</span><br />
                        <span>자신의 가게를 보여주세요!</span>
                    </div>
                </div>
               </div>
        </div>
    );
}
export default Owner_community;