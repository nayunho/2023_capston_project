import { TextField, Button, InputAdornment } from "@mui/material";
import './../App.css';
import { useNavigate } from "react-router-dom";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockIcon from "@material-ui/icons/Lock";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EmailIcon from "@material-ui/icons/Email";
import axios from "axios";
import { lazy, Suspense, createContext, useState, useEffect } from "react";

function Join() {
    let navigate = useNavigate();

    axios.get("http://localhost:8080/sign_up").then((res) => {
        console.log(res.data)
    })
        .catch(() => {
            console.log('실패함')
        })
    const [temp, SetTemp] = useState(true);

    const [id, setId] = useState("2");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [check_pw, setCehck_pw] = useState("");
    const [nicname, setNicname] = useState("");
    const [part, setPart] = useState("");
    useEffect(() => {
        console.log(id);
        console.log(password);
        console.log(email);
        console.log(name);
        console.log(number);
        sendUserData();
    }, [temp])
    return (
        <div className="join_wrap" style={{ backgroundColor: "rgb(209, 209, 214)" }}>

            <div className="joinWrap">
                <div className="join">
                    <p>Sign Up</p>
                    <div id="textFeild">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <PermIdentityIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label="ID"
                            required
                            name="id"
                            autoComplete="id"
                            sx={{
                                width: { sm: 200, md: 170 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                            autoFocus
                            onChange={(e) => {
                                setId(e.target.value);
                            }} />
                        &nbsp;&nbsp;
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneAndroidIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label="nicname"
                            required
                            name="nicname"
                            sx={{
                                width: { sm: 200, md: 170 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                            onChange={(e) => {
                                setNicname(e.target.value);
                            }} />
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
                                label="password"
                                type="password"
                                required
                                name="password"
                                sx={{
                                    width: { sm: 200, md: 170 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }} />
                            &nbsp;&nbsp;
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                label="check_pw"
                                type="password"
                                required
                                name="setCehck_pw"
                                sx={{
                                    width: { sm: 200, md: 170 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                onChange={(e) => {
                                    setCehck_pw(e.target.value);
                                }} />
                        </div>
                    </div>
                    <div id="textFeild">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label="Email address"
                            required
                            name="email"
                            autoComplete="email"
                            sx={{
                                width: { sm: 200, md: 350 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
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
                            label="Name"
                            required
                            name="name"
                            sx={{
                                width: { sm: 200, md: 170 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                            onChange={(e) => {
                                setName(e.target.value);
                            }} />
                        &nbsp;&nbsp;
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneAndroidIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label="Phone Number"
                            required
                            name="pn"
                            sx={{
                                width: { sm: 200, md: 170 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                            onChange={(e) => {
                                setNumber(e.target.value);
                            }} />
                    </div>
                    <div id="textFeild" style={{ display: "flex", justifyContent: "center" }}>

                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label="Home address"
                            required
                            name="adress"
                            autoComplete="adress"
                            sx={{
                                width: { sm: 200, md: 290 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                        &nbsp;&nbsp;
                        <div >
                            <button className="search_adress" onClick={() => { SetTemp(!temp) }} >주소찾기</button>
                        </div>
                    </div>
                    <div className="partWrap">
                        <input className="part" type="button" value="사용자" onClick={(e) => {
                            let typped = e.target.value;
                            setPart(typped);
                        }}></input>
                        <input className="part" type="button" value="상업자" onClick={(e) => {
                            let typped = e.target.value;
                            setPart(typped);
                        }}></input>
                        <input className="part" type="button" value="관리자" onClick={(e) => {
                            let typped = e.target.value;
                            setPart(typped);
                        }}></input>
                    </div>

                    <Button onClick={() => { SetTemp(!temp) }} id="textFeild" className="btn" type="submit" Width variant="contained"><span>sign up</span></Button>

                </div>
                <div className="imgarea">
                    <div className="text">
                        <h2>제목</h2>
                        <span>환영합니다</span>
                    </div>
                </div>
            </div>
        </div>
    )
    function sendUserData() {
        return (
            axios.get('/sign_up', {
                params: {
                    id: id,
                    name: name,
                    password: password,
                    email: email,
                    number: number,
                }
            }).catch(function () {
                console.log('실패함')
            })
        )
    }
}

export default Join;