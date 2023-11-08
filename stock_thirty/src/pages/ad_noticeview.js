import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react';
import './../App.css';
import axios from 'axios';

function Ad_noticeview() {
    let a =localStorage.getItem("notice");
    var notice = JSON.parse(a);
    let navigate = useNavigate();
    console.log(1)
    console.log(notice);
    function formatDate(dateString) {
        const originalDate = new Date(dateString);
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };
        const formattedDate = originalDate.toLocaleString("ko-KR", options);
        return formattedDate;
      }
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
                <div className="ad_inquiry_canswer_title">공지사항</div>
                <div className="ad_inquiry_canswer_question">
                    <div className="ad_inquiry_canswer_qu">
                        <div className="ad_inquiry_canswer_d"><div style={{fontWeight:"700",fontSize:"35px"}}>Q</div><div style={{fontWeight:"700",fontSize:"25px"}}>질문 내용</div><div style={{fontWeight:"700",fontSize:"20px"}}>2023-05-11</div></div>
                        <div className="ad_inquiry_canswer_qu_con">
                            <div style={{fontSize:"30px"}}>A</div>
                            <div className='ad_inquiry_canswer_qu_con_result'>{notice.title}</div>
                            <div className='ad_inquiry_canswer_u_con_result_redate'>{formatDate(notice.noticedate)}</div>
                        </div>
                        <div>
                            <button onClick={()=>{
                                localStorage.setItem('notice',JSON.stringify(notice));
                                navigate('/ad_notice_update');
                            }}><span>수정</span></button>
                            <button onClick={()=>{
                                axios.delete('/manager/notice/delete',{
                           params:{
                              noticeIdx:notice.noticeidx
                           }
                        })
                                 .then(response => {
                                     window.alert("삭제 완료.")
                                     navigate("/ad_notice");
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
            </main>
        </div >
    )
}

export default Ad_noticeview;