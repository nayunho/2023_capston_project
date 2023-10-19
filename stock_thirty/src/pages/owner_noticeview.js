import React, { useState } from 'react';
import './../App.css';
import axios from "axios";
import { useEffect, useRef } from 'react';
import Avatar from 'react-avatar';
import { useParams } from 'react-router-dom';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HouseIcon from '@mui/icons-material/House';
function Owner_noticeview() {
    let [recall, setRecall] = useState(false);
    let [temp1, setTemp1] = useState(true);
    let [temp, setTemp] = useState(true);
    const { id } = useParams();
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
    return (
        <div>
            <div className='owner_noticeWrap' >
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
                                <a href="/owner_main_page" style={{ cursor: "pointer" }}>
                                    <HouseIcon fontSize="large" />
                                </a>
                            </li>
                            <li>
                                <a onClick={() => {
                                    setTemp(switchTemp);
                                }} style={{ cursor: "pointer" }} href='/owner'>
                                    내가게
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
                                <a className='mypages' style={{ cursor: "pointer" }} onClick={() => {
                                    setTemp1(!temp1);
                                }}>
                                    <AccountCircleIcon fontSize="large" /> <span>{userInfo.nickname}</span>
                                </a>

                            </li>
                        </ul></nav>
                </header>
            </div>
            <div className='notview_header'>
                <h1>공지사항</h1>
            </div>
            <div className='notinfo'>
                <p className='nottitle'>title</p>
                <p className='notdate'>2023-10-23</p>
            </div>
            <div className='nottxt'>
                <p>content</p>
            </div>
            <div className='notfooter'>
                <div className='curnot'><a >다음 게시글</a></div>
                <div className='curnot'><a>이전 게시글</a></div>
            </div>
            <div>
                <button className='notlist_btn'>목록</button>
            </div>
        </div>
    );
}
export default Owner_noticeview;