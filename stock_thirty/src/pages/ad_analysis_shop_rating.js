import React, { useState } from 'react';
import './../App.css';
function Ad_analysis_shop_rating() {

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
            <div className="sub"><a href="#" style={{color:"red"}}>가게 분석</a></div>
        </div>
        <div className="logout">
            <div><a href="#" id="logout">로그아웃</a></div>
        </div>
    </div>

    <main>
        <div className="title">파스쿠찌 별점</div>
        <div className="tb">
            <table>
                <thead>
                    <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                        <td style={{ width: "15%" }}>별점</td>
                        <td style={{ width: "85%" }}>인원 수</td>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ height: "50px", fontSize: "20px" }}>
                        <td>0</td>
                        <td><a style={{textDecoration:"underline"}}>0</a></td>
                    </tr>
                    <tr style={{ height: "50px", fontSize: "20px" }}>
                        <td>1</td>
                        <td><a href="#" style={{textDecoration:"underline"}}>2</a></td>
                    </tr>
                    <tr style={{ height: "50px", fontSize: "20px" }}>
                        <td>2</td>
                        <td><a href="#" style={{textDecoration:"underline"}}>4</a></td>
                    </tr>
                    <tr style={{ height: "50px", fontSize: "20px" }}>
                        <td>3</td>
                        <td><a href="#" style={{textDecoration:"underline"}}>40</a></td>
                    </tr>
                    <tr style={{ height: "50px", fontSize: "20px" }}>
                        <td>4</td>
                        <td><a href="#" style={{textDecoration:"underline"}}>50</a></td>
                    </tr>
                    <tr style={{ height: "50px", fontSize: "20px" }}>
                        <td>5</td>
                        <td><a href="#" style={{textDecoration:"underline"}}>10</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
        </div >
    )
}

export default Ad_analysis_shop_rating;