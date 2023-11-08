import React, { useState } from 'react';
import './../App.css';
import { useEffect, useRef } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Ad_businessman() {
    /*상업자 조회*/
    const [owner, setOwner] = useState([]);
    useEffect(() => {
        axios.get('/manager/member/business')
            .then(response => {
                setOwner(response.data);
            })
            .catch(error => {
                console.error('세션 데이터를 가져오는데 실패함', error);
            });
    }, []);
    let navigate = useNavigate();
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
                    <div className="sub" id="one"><a href="/ad_user">사용자</a></div>
                    <div className="sub"><a href="/ad_businessman" style={{color:"red"}}>상업자</a></div>
                    <div className="sub"><a href="/ad_admin">관리자</a></div>
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
                    <div><a href="#" id="logout">로그아웃</a></div>
                </div>
            </div>
            <main className='ad_main'>
                <div className="ad_title" style={{ marginTop: "50px", marginLeft: "30px", fontWeight: "bolder", fontSize: "30px" }}>전체 멤버({owner.length})</div>
                <div className="tb">
                    <table className='ad_table'>
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
                            {owner.map((owner, index) => (
                                    <tr style={{ height: "50px", fontSize: "20px" }} >
                                        <td style={{ fontWeight: "700" }}>{owner.memberIdx}</td>
                                        <td><a style={{textDecoration:"underline",cursor:"pointer"}} onClick={()=>{
                                            axios.get('/manager/member/business/shopinfo', {
                                                params: {
                                                  memberidx: owner.memberIdx
                                                }
                                              })
                                                .then(response => {
                                                  localStorage.setItem('owner_store', JSON.stringify(response.data));
                                                  localStorage.setItem('owner', owner.name);  
                                                  navigate("/ad_businessman_shop");
                                                })
                                                .catch(error => {
                                                  console.error('세션 데이터를 가져오는데 실패함', error);
                                                });
                                        }}>{owner.name}</a></td>
                                      <td><a style={{textDecoration:"underline", cursor:"pointer"}} onClick={()=>{
                                            axios.get('/manager/member/user/trustmanage', {
                                                params: {
                                                  memberIdx: owner.memberIdx
                                                }
                                              })
                                                .then(response => {
                                                  localStorage.setItem('user_store', JSON.stringify(response.data)); 
                                                  localStorage.setItem('member',JSON.stringify(owner));
                                                  navigate("/ad_user_trust");
                                                })
                                                .catch(error => {
                                                  console.error('세션 데이터를 가져오는데 실패함', error);
                                                });
                                        }}>{owner.trust}</a></td>
                                        <td>{owner.role}</td>
                                        <td>{owner.redate}</td>
                                        <td>{owner.id}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_businessman;