import { TextField, Button, InputAdornment } from "@mui/material";
import './../App.css';
import { useNavigate } from "react-router-dom";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockIcon from "@material-ui/icons/Lock";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EmailIcon from "@material-ui/icons/Email";
import axios from "axios";
import { lazy, Suspense, createContext, useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Marker4 from "./../img/marker4.gif";

function Join() {
    let navigate = useNavigate();

    const [id, setId] = useState("");
    const [pw, setpw] = useState("");
    const [name, setName] = useState("");
    const [phone, setphone] = useState("");
    const [check_pw, setCehck_pw] = useState("");
    const [role, setrole] = useState("");
    var [temp, SetTemp] = useState(true);
    const hasNotSameError = pwEntered =>
        pw != check_pw ? true : false;

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다

        if (pw !== check_pw) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
    }
    
    let [id_result, setId_result] = useState("");
    let [pw_result, setPw_result] = useState("");
    let [name_result, setName_result] = useState("");
    let [role_result, setRole_result] = useState("");
    let [phone_result, setPhone_result] = useState("");
    useEffect(() => {
        if(temp==false){
        sendUserData();
        temp=true;
        }

    }, [temp])
    return (
        <div className="join_wrap" style={{ backgroundColor: "rgb(209, 209, 214)" }}>

            <div className="joinWrap" style={{borderRadius:"20px"}}>
                <div className="join" style={{borderTopLeftRadius: "20px",borderBottomLeftRadius: "20px",boxShadow:"10px 0px 5px rgba(0, 0, 0, 0.3)"}}>
                    <p>Sign Up</p>
                    <div id="textFeild" style={{ marginLeft: "10px" }}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <PermIdentityIcon />
                                    </InputAdornment>
                                ),
                            }}
                            placeholder='아이디를 입력해주세요'
                            label="ID"
                            required
                            name="id"
                            type="email"
                            value={id}
                            autoComplete="id"
                            sx={{
                                width: { sm: 200, md: 350 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                            autoFocus
                            onChange={(e) => {
                                setId(e.target.value);
                            }} 
                     helperText={
                                 <Typography style={{ color: 'red' }}>
                               {id_result}
                           </Typography>
                            }
                            /> 
                        &nbsp;&nbsp;

                    </div>
                    <div id="textFeild">
                        <div>
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder='비밀번호를 입력해주세요'
                                label="pw"
                                type="password"
                                required
                                name="pw"
                                value={pw}
                                autoComplete="current-pw"
                                sx={{
                                    width: { sm: 200, md: 350 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                onChange={(e) => {
                                    setpw(e.currentTarget.value);
                                }} 
                                helperText={
                                    <Typography style={{ color: 'red' }}>
                                  {pw_result}
                              </Typography>
                               }
                                />
                        </div>
                    </div>
                    <div id="textFeild">
                        <div>
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder='비밀번호를 재입력해주세요'
                                label="check_pw"
                                type="password"
                                value={check_pw}
                                required
                                name="setCehck_pw"
                                autoComplete="current-pw"
                                sx={{
                                    width: { sm: 200, md: 350 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                onChange={(e) => {
                                    setCehck_pw(e.currentTarget.value);
                                }}
                                error={hasNotSameError('check_pw')} // 해당 텍스트필드에 error 핸들러 추가
                                helperText={
                                    hasNotSameError('check_pw') ? 
                                    <Typography style={{ color: 'red' }}>
                                  입력한 비밀번호와 일치하지 않습니다.
                              </Typography> : null
                                } // 에러일 경우에만 안내 문구 표시
                            />
                        </div>
                    </div>
                    <div id="textFeild">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PermIdentityIcon />
                                    </InputAdornment>
                                ),
                            }}
                            placeholder='이름을 입력해주세요'
                            label="Name"
                            required
                            value={name}
                            name="name"
                            sx={{
                                width: { sm: 200, md: 350 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                            onChange={(e) => {
                                setName(e.target.value);
                            }} 
                            helperText={
                                    <Typography style={{ color: 'red' }}>
                                  {name_result}
                              </Typography>
                            }/>
                    </div>
                    <div id="textFeild">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneAndroidIcon />
                                    </InputAdornment>
                                ),
                            }}
                            placeholder='전화 번호를 입력해주세요'
                            label="Phone phone"
                            required
                            name="pn"
                            value={phone}
                            sx={{
                                width: { sm: 200, md: 350 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                            onChange={(e) => {
                                setphone(e.target.value);
                            }} 
                            helperText={
                                    <Typography style={{ color: 'red' }}>
                                  {phone_result}
                              </Typography>
                            }/>
                    </div>
                    <div className="partWrap">
                        <input className="part" type="button" value="사용자" onClick={(e) => {
                            let typped = e.target.value;
                            setrole(typped);
                        }}></input>
                        <input className="part" type="button" value="상업자" onClick={(e) => {
                            let typped = e.target.value;
                            setrole(typped);
                        }}></input>
                        <div className="helperText">
                      <span style={{ color: 'red' }}>{role_result}</span>
                    </div>
                    </div>

                    <Button onClick={() => { 
                         if (hasNotSameError('newpw_check') == true) {
                            window.alert(" 비밀번호가 일치하지 않습니다.")
                            setId("");
                         setName("");
                         setCehck_pw("");
                         setpw("");
                         setphone("");
                        } else{
                            SetTemp(!temp)
                        } }} id="textFeild" className="btn" type="submit" Width variant="contained"><span>sign up</span></Button>

                </div>
                <div className="imgarea" style={{borderTopRightRadius: "20px",borderBottomRightRadius: "20px"}}>
                   <div className="text" style={{ width: "800px", height: "200px" }}>
                        <img src={Marker4} style={{ width: "130px", height: "90px",marginTop:"30px" }} />
                        <span style={{ fontSize:"90px", color:"black",fontWeight:"600" }}>StockTracker</span>
                    </div>
                </div>
            </div>
        </div>
    )
    function sendUserData() {
        return (
            axios.post('/join', {
                    id: id,
                    name: name,
                    pw: pw,
                    phone: phone,
                    role: role
            }).then(() => {
                window.alert("회원가입 완료")
                navigate("/login")
                setId("");
                setName("");
                setCehck_pw("");
                setpw("");
                setphone("");
                
            }).catch(error => {
            if (error.response.data.result == null) {
               setId_result("")
               setPw_result("")
               setName_result("")
               setPhone_result("")
               setRole_result("")
                    const errorKeys = Object.keys(error.response.data);
                    const errorValues = [];
                    for (const key of errorKeys) {
                        errorValues.push(error.response.data[key]);
                    }
                    errorKeys.forEach((key,index) =>{
                  switch (key){
                     case "id":
                        setId_result(errorValues[index]);
                        break;
                     case "pw":
                        setPw_result(errorValues[index]);
                        break;
                     case "name":
                        setName_result(errorValues[index]);
                        break;
                     case "phone":
                        setPhone_result(errorValues[index]);
                        break;
                     default:
                        setRole_result(errorValues[index]);
                        break;
                  }
               })
                } else {
                    window.alert(error.response.data.result);
                    setId("")
                    setId_result("이미 사용 중인 아이디입니다.")
               setPw_result("")
               setName_result("")
               setPhone_result("")
               setRole_result("")
                }
         })
        )
    }
}

export default Join;