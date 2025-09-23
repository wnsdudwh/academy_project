"use client"
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthRedirectHandler = () => 
{
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // 1.  ''실행 여부'를 기록할 참조(ref)를 만듭니다.
    const hasExecuted = useRef(false);

    useEffect(() => 
    {
        // 2. 아직 실행된 적이 없을 때만 아래 로직을 실행하도록 합니다.
        if (!hasExecuted.current)
        {
            const token = searchParams.get('token');
            const nickname = searchParams.get('nickname');
            const role = searchParams.get('role');

            if (token && nickname && role) 
            {
                localStorage.setItem('token', token);
                localStorage.setItem('nickname', nickname);
                localStorage.setItem('userRole', role);

                alert(`${nickname}님, 환영합니다!`);
                
                // 3. 실행이 끝났다고 기록합니다.
                hasExecuted.current = true;
                
                window.location.replace('/');
            }
            else 
            {
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
                navigate('/login');
            }
    }
    }, [navigate, searchParams]);

    // 이 컴포넌트는 화면에 "처리 중" 메시지만 잠깐 보여줍니다.
    return <div>로그인 처리 중...</div>;
};

export default OAuthRedirectHandler;