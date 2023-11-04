import React, { useState } from 'react';
import './../App.css';
function Ad_user_trust_content() {

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
                    <div className="sub" id="one"><a href="#" style={{ color: "red" }}>사용자</a></div>
                    <div className="sub"><a href="#">상업자</a></div>
                    <div className="sub"><a href="#">관리자</a></div>
                </div>
                <div className="content">
                    <div>콘텐츠 관리</div>
                    <div className="sub"><a href="#">문의 내역</a></div>
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

            <main>
                <div className="title" >파스쿠찌 예약내역(2)</div>
                <div className="comment" style={{ float: "right", marginTop: "0px", marginRight: "90px", fontSize: "20px" }}><span>🟥</span><span>신뢰도 차감</span></div>
                <div className="tb">
                    <table>
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "15%" }}>상품 번호</td>
                                <td style={{ width: "50%" }}>상품 이름</td>
                                <td style={{ width: "20%" }}>수량</td>
                                <td style={{ width: "15%" }}>예약 날짜</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>1</td>
                                <td style={{ color: "red" }}>블랙그라운드(원두)</td>
                                <td>4</td>
                                <td>2023-10-21</td>
                            </tr>
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>2</td>
                                <td>텀블러</td>
                                <td>1</td>
                                <td>2023-10-18</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default Ad_user_trust_content;