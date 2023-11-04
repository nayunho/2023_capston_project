import React, { useState } from 'react';
import './../App.css';
function Ad_inquiry_wanswer() {

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
                    <div className="sub" id="one"><a href="#">사용자</a></div>
                    <div className="sub"><a href="#">상업자</a></div>
                    <div className="sub"><a href="#">관리자</a></div>
                </div>
                <div className="content">
                    <div>콘텐츠 관리</div>
                    <div className="sub"><a href="#" style={{color:"red"}}>문의 내역</a></div>
                    <div className="sub"><a href="#">공지사항</a></div>
                    <div className="sub"><a href="#">가게 등록</a></div>
                </div>
                <div className="content">
                    <div>인사이트 분석</div>
                    <div className="sub"><a href="#">가게 분석</a></div>
                </div>
                <div className="logout">
                    <div><a href="#" id="logout">로그아웃</a></div>
                </div>
            </div>

            <main className='ad_inquiry_wanswer_main'>
                <div className="ad_inquiry_wanswer_title">답변 달기</div>
                <div className="question">
                    <div className="qu">
                        <div className="d"><div style={{fontWeight:"700",fontSize:"35px"}}>Q</div><div style={{fontWeight:"700",fontSize:"25px"}}>질문 내용</div><div style={{fontWeight:"700",fontSize:"20px"}}>2023-05-11</div></div>
                        <form action="#">
                            <div className="qu_con">
                                <div>A</div>
                                <div><textarea rows="8" cols="83" placeholder="답변을 작성해주세요."></textarea></div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div >
    )
}

export default Ad_inquiry_wanswer;