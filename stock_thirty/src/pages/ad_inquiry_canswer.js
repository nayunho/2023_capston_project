import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react';
import './../App.css';
import axios from 'axios';

function Ad_inquiry_canswer() {
   let b =localStorage.getItem("inquiry");
    var inquiry = JSON.parse(b);
    let navigate = useNavigate();
    let [recall, setRecall] = useState(false);
    const [userInfo, setUserInfo] = useState("");
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

            <main className='ad_inquiry_canswer_main'>
                <div className="ad_inquiry_canswer_title">답변 확인</div>
                <div className="ad_inquiry_canswer_question">
                    <div className="ad_inquiry_canswer_qu">
                        <div className="ad_inquiry_canswer_d"><div style={{fontWeight:"700",fontSize:"35px"}}>Q</div><div style={{fontWeight:"700",fontSize:"25px"}}>{inquiry.content_inquiry}</div><div style={{fontWeight:"700",fontSize:"20px"}}>{inquiry.redate}</div></div>
                        <div className="ad_inquiry_canswer_qu_con">
                            <div style={{fontSize:"30px"}}>A</div>
                            <div className='ad_inquiry_canswer_qu_con_result'>{inquiry.content_answer}</div>
                            <div className='ad_inquiry_canswer_u_con_result_redate'>{inquiry.answer_redate}</div>
                            <div>
                            <button onClick={()=>{
                                localStorage.setItem('inquiry',JSON.stringify(inquiry));
                                navigate('/ad_inquiry_wanswer_update');
                            }}><span>수정</span></button>
                            <button onClick={()=>{
                                const formData = new FormData();
                              formData.append("inquiryidx",inquiry.inquiryidx);
                              formData.append("adminidx",userInfo.memberIdx);

                                axios.put('/inquiry/answer/delete',formData)
                                 .then(response => {
                                     window.alert("삭제 완료.")
                                     localStorage.setItem('inquiry', JSON.stringify(response.data)); 
                                     navigate("/ad_inquiry_canswer");
                                 })
                                 .catch(error => {
                                     console.error('세션 데이터를 가져오는데 실패함', error);
                                 });
                            }}>
                                <span>
                                    삭제
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

export default Ad_inquiry_canswer;