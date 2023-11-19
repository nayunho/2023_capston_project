import React, { useEffect,useState } from 'react';
import axios from "axios";
import './../App.css';
import { useNavigate } from "react-router-dom";

function Ad_inquiry() {
    const [inquiryInfo, setInquiryInfo] = useState([{inquiryidx:"1",content_inquiry:"dsdsds",redate:"2023-10-22",status:"답변 완료"}]);
    useEffect(() => {
        axios.get('/inquiry/view/all')
        .then(response =>{
            const inquiryData = response.data;
            setInquiryInfo(inquiryData);
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
                <div className="ad">
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
                    <div className="sub"><a href="/ad_store_management">가게 등록</a></div>
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
                <div className="ad_title">전체 문의({inquiryInfo.length})</div>
                <div className="tb">
                    <table className='ad_table'>
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "5%" }}>IDX</td>
                                <td style={{ width: "55%" }}>내용</td>
                                <td style={{ width: "20%" }}>작성일</td>
                                <td style={{ width: "20%" }}>답변여부</td>
                            </tr>
                        </thead>
                        <tbody>
                        {inquiryInfo.map((inquiry,index) => (
                            <tr key={index} style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>{inquiry.inquiryidx}</td>
                                <td><a style={{textDecoration:"underline", cursor:"pointer"}} onClick={()=>{
                              if(inquiry.status === "답변 완료"){
                                  axios.get('/inquiry/user/answer/view', {
                                                params: {
                                       inquiryidx:inquiry.inquiryidx
                                                }
                                              })
                                                .then(response => {
                                                  localStorage.setItem('inquiry', JSON.stringify(response.data)); 
                                                  navigate("/ad_inquiry_canswer");
                                                })
                                                .catch(error => {
                                                  console.error('세션 데이터를 가져오는데 실패함', error);
                                                });   
                              }
                                        else{
                                  localStorage.setItem('inquiry', JSON.stringify(inquiry)); 
                                             navigate("/ad_inquiry_wanswer");   
                                 
                              }
                                        }}>{inquiry.content_inquiry}</a></td>

                                <td>{inquiry.redate}</td>
                                <td style={{color: `${inquiry.status === "답변 대기" ? "blue" : "red"}`}}>{inquiry.status}</td>
                            </tr>
                            ))} 
                            
                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_inquiry;