import React, { useState } from 'react';
import './../App.css';
function Ad_businessman_shop() {

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
                    <div className="sub"><a href="#" style={{color:"red"}}>상업자</a></div>
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
                <div class="title" style={{marginTop:"50px",marginLeft:"30px",fontWeight:"bolder",fontSize:"30px"}}>김땡땡님의 가게(2)</div>
                <div class="tb">
                    <table>
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "10%" }}>가게 번호</td>
                                <td style={{ width: "20%" }}>이름</td>
                                <td style={{ width: "40%" }}>주소</td>
                                <td style={{ width: "10%" }}>전화번호</td>
                                <td style={{ width: "10%" }}>별점</td>
                                <td style={{ width: "10%" }}>등록일</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td  style={{ fontWeight: "700" }}>21</td>
                                <td><a href="#">파스쿠찌</a></td>
                                <td>경기도 남양주시 홍유릉로234번길 52</td>
                                <td>01012341234</td>
                                <td>4.5</td>
                                <td>2023-10-15</td>
                            </tr>
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td  style={{ fontWeight: "700" }}>12</td>
                                <td><a href="#">파리바게트</a></td>
                                <td>경기도 남양주시 평내동 12</td>
                                <td>01022223333</td>
                                <td>3.2</td>
                                <td>2023-09-21</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_businessman_shop;