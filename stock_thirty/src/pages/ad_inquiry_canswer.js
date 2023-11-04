import React, { useState } from 'react';
import './../App.css';
function Ad_inquiry_canswer() {

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
                    <div class="sub"><a href="#">가게 분석</a></div>
                </div>
                <div className="logout">
                    <div><a href="#" id="logout">로그아웃</a></div>
                </div>
            </div>

            <main>
                <div className="ad_inquiry_canswer_title">답변 확인</div>
                <div className="question">
                    <div className="qu">
                        <div className="d"><div style={{fontWeight:"700",fontSize:"35px"}}>Q</div><div style={{fontWeight:"700",fontSize:"25px"}}>질문 내용</div><div style={{fontWeight:"700",fontSize:"20px"}}>2023-05-11</div></div>
                        <div className="qu_con">
                            <div style={{fontSize:"30px"}}>A</div>
                            <div className='qu_con_result'>답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용답변 내용</div>
                            <div className='qu_con_result_redate'>2023-05-11</div>
                        </div>
                    </div>
                </div>
            </main>
        </div >
    )
}

export default Ad_inquiry_canswer;