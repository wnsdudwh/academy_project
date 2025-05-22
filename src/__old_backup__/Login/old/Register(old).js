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

    const [nickname, setNickname] = useState("");   //닉네임 상태 리셋
    const [nicknameMsg, setNicknameMsg] = useState("");     //  닉네임 중복 상태감지 메세지ㅣ
    const [isNickAvailable, setIsNickAvailable] = useState(true);   //  닉네임 중복 상태감지

    const handleCheckNickname = async () => 
    {
        if (!nickname.trim()) return setNicknameMsg("닉네임을 입력해주세요.");
    
        try 
        {
            const resp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}auth/check-nickname?nickname=${nickname}`);
            if (resp.data === true) 
            {
                setNicknameMsg("사용 가능한 닉네임입니다.");
                setIsNickAvailable(true);
            } 
            else 
            {
                setNicknameMsg("이미 사용 중인 닉네임입니다.");
                setIsNickAvailable(false);
            }
        } 
        catch (err) 
        {
            setNicknameMsg("서버 에러 발생");
            console.error(err);
        }
    };

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
        if (!isNickAvailable) return setErrorMsg("닉네임 중복 확인을 해주세요.");   //닉네임 중복 감지. 별도로 빼서 주석해둠.

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

                            <div className="form-floating my-2 relative">
                                <input type="text" ref={nickNameRef} className="form-control" id="nickname" placeholder="닉네임" minLength="2" maxLength="16"
                                    value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                                <label htmlFor="nickname">닉네임</label>

                                {/* ✅ 중복 확인 버튼 */}
                                <button type="button" className="absolute right-2 top-2 text-sm text-white bg-blue-400 rounded px-2 py-1" onClick={handleCheckNickname}>
                                    중복 확인
                                </button>

                                {/* ✅ 결과 메시지 */}
                                {nicknameMsg && (
                                    <div className="text-sm mt-1 text-red-500">{nicknameMsg}</div>
                                )}
                                </div>

                            {nicknameMsg && (
                                <div className="text-sm mt-1" style={{ color: isNickAvailable ? "green" : "red" }}>
                                    {nicknameMsg}
                                </div>
                            )}

                            <div class="w-full text-sm md:text-md ml-2 my-2 font-bold">
                                <div class="py-2.5"></div>
                            </div>

                            {errorMsg && (
                                <div class="w-full text-sm md:text-md ml-2 my-2 font-bold">
                                    <div class="text-red-600">{errorMsg}</div>
                                </div>
                            )}
                            
                            <button class="w-full py-2 mt-2 bg-primary-400 rounded-md" type="button" onClick={handleSubmit}>회원가입</button>
                        </div>
                        <p class="mt-5 mb-3 text-body-secondary">© 2025 ㅈㅈㅇ</p>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Register
