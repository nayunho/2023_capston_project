import React, { useEffect,useState } from 'react';
import axios from "axios";
import './../App.css';
import { useNavigate } from "react-router-dom";
function Ad_notice() {
    const [recall, setRecall] = useState(false);
    const [userInfo, setUserInfo] = useState("");
    let [noticepost,setNoticePost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const postsPerPage = 10;//페이지당 게시글수
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = noticepost.slice(indexOfFirstPost, indexOfLastPost);
   let navigate = useNavigate();
    const pageNumbers = [];

 function formatDate(dateString) {
     const originalDate = new Date(dateString);
     const options = {
       year: "numeric",
       month: "2-digit",
       day: "2-digit",
       hour: "2-digit",
       minute: "2-digit",
       second: "2-digit",
     };
     const formattedDate = originalDate.toLocaleString("ko-KR", options);
     return formattedDate;
   }
    for (let i = 1; i <= Math.ceil(noticepost.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    useEffect(() => {
        // 스프링에서 세션 데이터를 가져오는 호출
        axios.get('/getSessionMember/manager')
            .then(response => {
                const userData = response.data;
                console.log(userData.redirect)
                if (userData.redirect) {
                    console.log("페이지 이동");
                    window.location.href = userData.redirect;
                } else {
                    setUserInfo(userData);
                    console.log("세션데이터가 존재");
                    console.log(userData.id);
                }
            })
            .catch(error => {
                console.error('세션 데이터를 가져오는데 실패함', error);
            });
            axios.get('/manager/notice/readall')
            .then(response => {
                const noticepost = response.data;
                console.log(noticepost);
                console.log(noticepost.redirect)
                if (noticepost.redirect) {
                    console.log("페이지 이동");
                    window.location.href = noticepost.redirect;
                } else {
                    setNoticePost(noticepost);
                    console.log("세션데이터가 존재");
                }
            },[userInfo]);
    }, [recall]);

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
                    <div className="sub"><a href="/ad_analysis_shop">가게 등록</a></div>
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
                <div className="ad_title">가게 분석(2)</div>
                <div className="tb">
                    <table className="ad_table">
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "15%" }}>IDX</td>
                                <td style={{ width: "35%" }}>제목</td>
                                <td style={{ width: "20%" }}>등록일</td>
                                <td style={{ width: "20%" }}>작성자</td>
                                <td style={{ width: "10%" }}>수정</td>
                            </tr>
                        </thead>
                        <tbody>
                        {currentPosts.map((nti, index) => (
                            <tr key={index} style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>{nti.noticeidx}</td>
                                <td onClick= {()=>{
                                        localStorage.setItem('notice', JSON.stringify(nti)); 
                                        navigate(`/ad_noticeview`);
                                }}><span>{nti.title}</span></td>
                                <td>{formatDate(nti.noticedate)}</td>
                                <td>{(nti.name)}</td>
                                <td style={{color:"blue"}}>{(nti.noticemodify)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={()=>{
                            navigate("/ad_notice_write")
                        }}>
                            <span>글작성</span>
                        </button>
                    </div>
                </div>
            </main>
        </div >
    )
}

export default Ad_notice;