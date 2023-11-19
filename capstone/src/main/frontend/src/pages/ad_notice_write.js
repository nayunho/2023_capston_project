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
                    <div className="sub" id="one"><a href="/ad_user">사용자</a></div>
                    <div className="sub"><a href="/ad_businessman">상업자</a></div>
                    <div className="sub"><a href="/ad_admin">관리자</a></div>
                </div>
                <div className="content">
                    <div>콘텐츠 관리</div>
                    <div className="sub"><a href="/ad_inquiry">문의 내역</a></div>
                    <div className="sub"><a href="/ad_notice" style={{color:"red"}}>공지사항</a></div>
                    <div className="sub"><a href="/ad_store_management">가게 등록</a></div>
                </div>
                <div className="content">
                    <div>인사이트 분석</div>
                    <div className="sub"><a href="/ad_analysis_shop">가게 분석</a></div>
                </div>
                <div className="logout">
                    <div><a href="/ad_login" id="logout">로그아웃</a></div>
                </div>
            </div>

            <main className='ad_noticeview_main'>
                <div className="ad_noticeview_title">공지사항</div>
                <div className="ad_noticeview_all">
                    <div className="ad_noticeview_content">
                        <div className="ad_noticeview_header"><div style={{fontWeight:"700",fontSize:"25px"}}>{notice.title}</div><div style={{fontWeight:"700",fontSize:"20px"}}>{formatDate(notice.noticedate)}</div></div>
                        <div className="ad_noticeview_qu_con">
                            <div style={{fontSize:"30px"}}></div>
                            <div className='ad_inquiry_canswer_qu_con_result'>{notice.title}</div>
                        </div>
                        <div style={{marginRight:"60px"}}>
                            <button className='ad_rewrite_btn' onClick={()=>{
                                localStorage.setItem('notice',JSON.stringify(notice));
                                navigate('/ad_notice_update');
                            }}><span>수정</span></button>
                            <button className='ad_delete_btn' onClick={()=>{
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