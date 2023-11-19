import React, { useEffect,useState } from 'react';
import axios from "axios";
import './../App.css';
import { useNavigate } from "react-router-dom";

function Ad_user() {
    const [memberInfo, setMemberInfo] = useState([]);
    useEffect(() => {
        axios.get('/manager/member/user')
        .then(response =>{
            const memberData = response.data;
            setMemberInfo(memberData);
        })
        .catch(error => {
            console.error('세션 데이터를 가져오는데 실패함', error);
          });
    },[]);
    let navigate = useNavigate();
    return (
        <div>
            <div className="main_bar">
                재고30 <span>Administration</span>
            </div>
            <div className="menu_bar">
                <div class="ad">
                    관리자 님, 환영합니다!
                </div>
                <div className="content">
                    <div>회원 관리</div>
                    <div className="sub" id="one"><a href="/ad_user" style={{color:"red"}}>사용자</a></div>
                    <div className="sub"><a href="/ad_businessman">상업자</a></div>
                    <div className="sub"><a href="/ad_admin">관리자</a></div>
                </div>
                <div className="content">
                    <div>콘텐츠 관리</div>
                    <div className="sub"><a href="/ad_inquiry">문의 내역</a></div>
                    <div className="sub"><a href="/ad_notice">공지사항</a></div>
                    <div className="sub"><a href="/ad_store_managemnet">가게 관리</a></div>
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
        <div className="ad_title">전체 멤버{memberInfo.length}</div>
        <div className="tb">
            <table className='ad_table'>
                <thead>
                    <tr style={{height:"50px",fontSize:"25px",fontWeight:"700"}}>
                        <td>IDX</td>
                        <td>이름</td>
                        <td>신뢰도</td>
                        <td>소셜</td>
                        <td>가입일</td>
                        <td>아이디</td>
                    </tr>
                </thead>
                <tbody>
                {memberInfo.map((member,index) => (
                            <tr key={index} style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>{member.memberIdx}</td>
                                <td>{member.name}</td>
                                <td><a style={{textDecoration:"underline", cursor:"pointer"}} onClick={()=>{
                                            axios.get('/manager/member/user/trustmanage', {
                                                params: {
                                                  memberIdx: member.memberIdx
                                                }
                                              })
                                                .then(response => {
                                                  localStorage.setItem('user_store', JSON.stringify(response.data)); 
                                                  localStorage.setItem('member',JSON.stringify(member));
                                                  navigate("/ad_user_trust");
                                                })
                                                .catch(error => {
                                                  console.error('세션 데이터를 가져오는데 실패함', error);
                                                });
                                        }}>{member.trust}</a></td>

                                <td>{member.social}</td>
                                <td>{member.redate}</td>
                              <td>{member.id}</td>
                            </tr>
                            ))}    
                </tbody>
            </table>
        </div>
    </main>
        </div>
    )
}

export default Ad_user;