import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react';
import './../App.css';
import axios from 'axios';
function Ad_inquiry_wanswer() {
   let b =localStorage.getItem("inquiry");
    var inquiry = JSON.parse(b);
    let navigate = useNavigate();
    let [recall, setRecall] = useState(false);
    const [userInfo, setUserInfo] = useState("");
    let [content_answer, setContent_answer] = useState("");
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
                <div className="ad_inquiry_wanswer_title">답변 달기</div>
                <div className="question">
                    <div className="qu">
                        <div className="d"><div style={{fontWeight:"700",fontSize:"35px"}}>Q</div><div style={{fontWeight:"700",fontSize:"25px"}}>{inquiry.content_inquiry}</div><div style={{fontWeight:"700",fontSize:"20px"}}>{inquiry.redate}</div></div> 
                            <div className="qu_con">
                                <div>A</div>
                                <div><textarea 
                                   rows="8" 
                                   cols="83" 
                                   placeholder="답변을 작성해주세요."
                                   name="content_answer"
                                   onChange={(e) => {
                                     setContent_answer(e.target.value);
                                 }}
                                   ></textarea></div>
                                
                            <div>
                               <button onClick={()=>{
                           const formData = new FormData();
                           formData.append("inquiryidx",inquiry.inquiryidx);
                           formData.append("adminidx",userInfo.memberIdx);
                           formData.append("content_answer",content_answer);
                           axios.post('/inquiry/answer',formData)
                                 .then(response => {
                                 window.alert("작성 완료.")
                                     localStorage.setItem('inquiry', JSON.stringify(response.data)); 
                                            navigate("/ad_inquiry_canswer");
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

export default Ad_inquiry_wanswer;