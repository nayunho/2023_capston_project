import React, { useState } from 'react';
import './../App.css';
function Ad_businessman() {

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
                    <div className="sub"><a href="#" style={{ color: "red" }}>상업자</a></div>
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
                <div className="title" style={{marginTop:"50px",marginLeft:"30px",fontWeight:"bolder",fontSize:"30px"}}>전체 멤버(2)</div>
                <div className="tb">
                    <table>
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "5%" }}>IDX</td>
                                <td style={{ width: "30%" }}>이름</td>
                                <td style={{ width: "15%" }}>신뢰도</td>
                                <td style={{ width: "15%" }}>역할</td>
                                <td style={{ width: "15%" }}>가입일</td>
                                <td style={{ width: "25%" }}>아이디</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ height: "50px", fontSize: "20px" }} >
                                <td style={{ fontWeight: "700" }}>21</td>
                                <td><a href="#">김땡땡</a></td>
                                <td>10 P</td>
                                <td>상업자</td>
                                <td>2023.05.11</td>
                                <td>ahj30420@naver.com</td>
                            </tr>
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>12</td>
                                <td>아무나</td>
                                <td><a href="#">4 P</a></td>
                                <td>상업자</td>
                                <td>2023.05.9</td>
                                <td>qwerfs23@naver.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_businessman;