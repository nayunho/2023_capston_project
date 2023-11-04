import React, { useState } from 'react';
import './../App.css';
function Ad_inquiry() {

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
                <div className="title">전체 문의(2)</div>
                <div className="tb">
                    <table>
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "5%" }}>IDX</td>
                                <td style={{ width: "55%" }}>내용</td>
                                <td style={{ width: "20%" }}>작성일</td>
                                <td style={{ width: "20%" }}>답변여부</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>5</td>
                                <td><a href="#">설문조사를 좀 더 다양하게 업로드해주세요!!</a></td>
                                <td>2023.05.11</td>
                                <td style={{color:"red"}}>답변 대기</td>
                            </tr>
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>7</td>
                                <td><a href="#">안녕하세요 시스템 오류가 있어서 문의드립니다</a></td>
                                <td>2023.05.12</td>
                                <td>답변 완료</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_inquiry;