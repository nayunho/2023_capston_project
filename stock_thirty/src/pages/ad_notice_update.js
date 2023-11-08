import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react';
import './../App.css';
import axios from 'axios';
function Ad_notice_update() {
    let b =localStorage.getItem("notice");
    var notice = JSON.parse(b);
    let navigate = useNavigate();
    let [recall, setRecall] = useState(false);
    const [userInfo, setUserInfo] = useState("");
    let [content_notice, setContent_notice] = useState("");
    let [title_notice, setTitle_notice] = useState("");
    useEffect(() => {
        // 스프링에서 세션 데이터를 가져오는 호출
        axios.get('/getSessionMember/manager')
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
            <div className="main_bar">
                재고30 <span>Administration</span>
            </div>
            <div className="menu_bar">
                <div className="ad">
                    관리자 님, 환영합니다!
                </div>
                 <div className="content">
                    <div>회원 관리</div>
                    <div className="sub" id="one"><a href="/ad_user" style={{color:"red"}}>사용자</a></div>
                    <div className="sub"><a href="/ad_businessman">상업자</a></div>
                    <div className="sub"><a href="/ad_admin">관리자</a></div>
                </div>
                <div className="content">
                    <div>콘텐츠 관리</div>
                    <div className="sub"><a href="/ad_inquiry">문의 내역</a></div>
                    <div className="sub"><a href="/ad_notice">공지사항</a></div>
                    <div className="sub"><a href="/ad_analysis_shop">가게 등록</a></div>
                </div>
                <div className="content">
                    <div>인사이트 분석</div>
                    <div className="sub"><a href="/ad_analysis_shop">가게 분석</a></div>
                </div>
                <div className="logout">
                    <div><a href="/ad_login" id="logout">로그아웃</a></div>
                </div>
            </div>

            <main className='ad_inquiry_wanswer_main'>
                <div className="ad_inquiry_wanswer_title">공지사항 수정</div>
                <div className="question">
                    <div className="qu">
                        <div className="d"><div style={{fontWeight:"700",fontSize:"35px"}}>Q</div><div style={{fontWeight:"700",fontSize:"25px"}}>{notice.content_inquiry}</div><div style={{fontWeight:"700",fontSize:"20px"}}>{notice.redate}</div></div> 
                            <div className="qu_con">
                                <div style={{marginLeft:"60px"}}><textarea 
                                   rows="1" 
                                   cols="83" 
                                   placeholder={notice.title}
                                   name="title_notice"
                                   onChange={(e) => {
                                    setTitle_notice(e.target.value);
                                 }}
                                   ></textarea></div>
                                <div><textarea 
                                   rows="8" 
                                   cols="83" 
                                   placeholder={notice.content}
                                   name="content_notice"
                                   onChange={(e) => {
                                     setContent_notice(e.target.value);
                                 }}
                                   ></textarea></div>
                                
                            <div>
                               <button onClick={()=>{
                           const formData = new FormData();
                           formData.append("noticeIdx",notice.noticeidx);
                           formData.append("title",title_notice);
                           formData.append("memberIdx",userInfo.memberIdx);
                           formData.append("content",content_notice);
                           
                           axios.put('/manager/notice/update',formData)
                                 .then(response => {
                                     window.alert("작성 완료.")
                                     localStorage.setItem('notice', JSON.stringify(response.data)); 
                                     navigate("/ad_noticeview");
                                 })
                                 .catch(error => {
                                     console.error('세션 데이터를 가져오는데 실패함', error);
                                 });
                        }}>
                        <span>
                           작성
                        </span>
                               </button>
                            </div>
                            </div>
                    </div>
                </div>
            </main>
        </div >
    )
}

export default Ad_notice_update;