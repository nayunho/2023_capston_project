import React, { useState } from 'react';
import './../App.css';
function Ad_analysis_shop() {

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
                    <div className="sub"><a href="#">문의 내역</a></div>
                    <div className="sub"><a href="#">공지사항</a></div>
                    <div className="sub"><a href="#">가게 등록</a></div>
                </div>
                <div className="content">
                    <div>인사이트 분석</div>
                    <div class="sub"><a href="#" style={{color:"red"}}>가게 분석</a></div>
                </div>
                <div className="logout">
                    <div><a href="#" id="logout">로그아웃</a></div>
                </div>
            </div>

            <main>
                <div className="title">가게 분석(2)</div>
                <div className="tb">
                    <table>
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "15%" }}>IDX</td>
                                <td style={{ width: "45%" }}>가게 이름</td>
                                <td style={{ width: "20%" }}>평점</td>
                                <td style={{ width: "20%" }}>예약자 수</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>21</td>
                                <td><a href="#">파스쿠찌</a></td>
                                <td><a href="#">4.5</a></td>
                                <td><a href="#">20</a></td>
                            </tr>
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>12</td>
                                <td><a href="#">가마순대국</a></td>
                                <td><a href="#">4.0</a></td>
                                <td><a href="#">10</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_analysis_shop;