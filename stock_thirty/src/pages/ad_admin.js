import React, { useEffect,useState } from 'react';
import axios from "axios";
import './../App.css';
import { useNavigate } from "react-router-dom";

function Ad_admin() {
    let [manager, setManager] = useState([]);
    useEffect(() => {
        axios.get('/manager/member/admin')
            .then(response => {
                setManager(response.data);
            })
            .catch(error => {
                console.error('세션 데이터를 가져오는데 실패함', error);
            });
    }, []);
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
                    <div className="sub"><a href="/ad_user">사용자</a></div>
                    <div className="sub"><a href="/ad_businessman">상업자</a></div>
                    <div className="sub"><a href="/ad_admin" style={{color:"red"}}>관리자</a></div>
                </div>
                <div className="content">
                    <div>콘텐츠 관리</div>
                    <div className="sub"><a href="/ad_inquiry">문의 내역</a></div>
                    <div className="sub"><a href="/ad_notice">공지사항</a></div>
                    <div className="sub"><a href="/ad_store_managemnet" >가게 관리</a></div>
                </div>
                <div className="content">
                    <div>인사이트 분석</div>
                    <div className="sub"><a href="/ad_analysis_shop">가게 분석</a></div>
                </div>
                <div className="logout">
                    <div><a href="/ad_login" id="logout">로그아웃</a></div>
                </div>
            </div>


            <main className='ad_main'>
                <div className="ad_title">전체 멤버({manager.length})</div>
                <div className="tb">
                    <table className='ad_table'>
                        <thead >
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "5%" }}>IDX</td>
                                <td style={{ width: "35%" }}>이름</td>
                                <td style={{ width: "30%" }}>가입일</td>
                                <td style={{ width: "30%" }}>아이디</td>
                            </tr>
                        </thead>
                        <tbody>
                            {manager.map((manager, index) => (
                                <tr style={{ height: "50px", fontSize: "20px" }}>
                                    <td style={{ fontWeight: "700" }}>{manager.memberIdx}</td>
                                    <td>{manager.name}</td>
                                    <td>{manager.redate}</td>
                                    <td>{manager.id}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_admin;