import axios from 'axios';
import React, { useRef, useState } from 'react'

const Register = () => 
{
    const server = process.env.REACT_APP_BACKEND_URL;

    const idRef = useRef(null);
    const pwRef = useRef(null);
    const pwCheckRef = useRef(null);
    const nameRef = useRef(null);
    const nickNameRef = useRef(null);

    const [errorMsg, setErrorMsg] = useState("");   //에러 메세지 상태

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        setErrorMsg("");    //초기화

        const id = idRef.current.value.trim();
        const pw = pwRef.current.value.trim();
        const pwCheck = pwCheckRef.current.value.trim();
        const name = nameRef.current.value.trim();
        const nick = nickNameRef.current.value.trim();

        // 1. 필드 유효성 검사
        if (id.length < 4 || id.length > 16) return setErrorMsg("아이디는 4~16자로 입력해주세요.");
        if (pw.length < 6 || pw.length > 32) return setErrorMsg("비밀번호는 6~32자로 입력해주세요.");
        if (pw !== pwCheck) return setErrorMsg("비밀번호가 일치하지 않습니다.");
        if (name.length < 1) return setErrorMsg("이름을 입력해주세요.");
        if (nick.length < 2 || nick.length > 16) return setErrorMsg("닉네임은 2~16자로 입력해주세요.");

        // 2. 전송
        axios.post(server + "auth/register",
        {
            userid: id,
            userpw: pw,
            username: name,
            nickname: nick
        })
        .then((resp) => 
        {
            alert(resp.data);
            window.location.href = '/';
        })
        .catch((error) => 
        {
            console.error(error);
            setErrorMsg("서버 오류가 발생했습니다.");
        });
    }

    // function checkPw() // 비밀번호, 비밀번호 확인 체크용. 사용안됨
    // {
    //     return pwRef.current.value === pwCheckRef.current.value
    // }

    return (
        <>
            <div class="flex justify-center items-center w-full bg-body-tertiary ">
                <div
                    class="flex align-items-center py-4 w-3/4 md:w-1/3 lg:w-1/4 xl:w-1/5 ml-0 lg:ml-32 xl:ml-48 min-h-[calc(100vh-64px)]">
                    <main class="form-signin w-100 m-auto">
                        <div onSubmit={handleSubmit}>
                            <div class="h3 mb-3">REGISTER</div>
                            <div class="form-floating my-2">
                                <input type="text" ref={idRef} class="form-control" id="userid" placeholder="아이디" minlength="4" maxlength="16"/><label for="userid">아이디</label>
                            </div>

                            <div class="w-full text-sm md:text-md ml-2 my-2 font-bold">
                                <div class="py-2.5"></div>
                            </div>

                            <div class="form-floating my-2">
                                <input type="password" ref={pwRef} class="form-control" id="userpw" placeholder="비밀번호" minlength="6" maxlength="32"/>
                                <label for="userpw">비밀번호</label>
                            </div>

                            <div class="form-floating my-2">
                                <input type="password" ref={pwCheckRef}  class="form-control" id="pwCheck" placeholder="비밀번호 확인" minlength="6" maxlength="32" />
                                <label for="pwCheck">비밀번호 확인</label>
                            </div>

                            {/* <div class="w-full text-sm md:text-md ml-2 my-2 font-bold">
                                <div class="text-red-600">패스워드가 일치하지 않습니다.</div>
                            </div> */}



                            <div class="form-floating my-2">
                                <input type="text" ref={nameRef} class="form-control" id="name" placeholder="이름" minlength="1" maxlength="16" />
                                <label for="name">이름</label>
                            </div>

                            <div class="form-floating my-2">
                                <input type="text" ref={nickNameRef} class="form-control" id="nickname" placeholder="닉네임" minlength="2" maxlength="16" />
                                <label for="nickname">닉네임</label>
                            </div>

                            {errorMsg && (
                                <div class="w-full text-sm md:text-md ml-2 my-2 font-bold">
                                    <div class="text-red-600">{errorMsg}</div>
                                </div>
                            )}

                            <div class="w-full text-sm md:text-md ml-2 my-2 font-bold">
                                <div class="py-2.5"></div>
                            </div>
                            
                            <button class="w-full py-2 mt-2 bg-primary-400 rounded-md" type="button" onClick={handleSubmit}>회원가입</button>
                        </div>
                        <p class="mt-5 mb-3 text-body-secondary">© 2025 wwd</p>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Register
