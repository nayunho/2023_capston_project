import React, { useState } from 'react';
import './../App.css';
function Ad_user_trust() {

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
                <div className="title" >홍길동님의 방문가게(3)</div>
                <div className="comment" style={{ float: "right", marginTop: "0px", marginRight: "90px", fontSize: "20px" }}><span>🟥</span><span>신뢰도 차감</span></div>

                <div className="tb">
                    <table>
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "10%" }}>가게 번호</td>
                                <td style={{ width: "40%" }}>가게 이름</td>
                                <td style={{ width: "40%" }}>가게 주소</td>
                                <td style={{ width: "10%" }}>감점 횟수</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>21</td>
                                <td><a href="#" style={{ color: "red", textDecoration: "underline" }}>파스쿠찌</a></td>
                                <td>경기도 남양주시 홍유릉로234번길 52</td>
                                <td>-2 p</td>
                            </tr>
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>12</td>
                                <td><a href="#" style={{ color: "red", textDecoration: "underline" }}>파리바게트</a></td>
                                <td>경기도 남양주시 평내동 12</td>
                                <td>-1 p</td>
                            </tr>
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>21</td>
                                <td><a href="#" style={{ textDecoration: "underline" }}>롯데리아</a></td>
                                <td>경기도 남양주시 호평동 24번길 12</td>
                                <td>0 p</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default Ad_user_trust;