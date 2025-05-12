"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AttendanceCheck = () => 
  {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [attendanceDates, setAttendanceDates] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(() => 
  {
      const token = localStorage.getItem("token");

      if (!token) 
      {
          alert("로그인이 필요한 페이지입니다.");
          navigate("/login");
      }
  }, []);

  // 커스텀 애니메이션 스타일
  const animationStyle = `
    @keyframes appear {
        0% { opacity: 0; transform: scale(0.5); }
        70% { opacity: 1; transform: scale(1.2); }
        100% { opacity: 1; transform: scale(1); }
    }
    .animate-appear {
        animation: appear 0.3s ease-out forwards;
    }
    `

  // 요일 표시
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"]

  // 이전 달로 이동
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // 다음 달로 이동
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // 출석 데이터 가져오기
  useEffect(() => {
    const fetchAttendanceData = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setLoading(false)
          return
        }

        // 현재 보고 있는 연월에 해당하는 출석 데이터를 가져옵니다
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1

        const response = await fetch(`http://localhost:8080/attendance/list?year=${year}&month=${month}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setAttendanceDates(data.dates)
        }
      } catch (error) {
        console.error("출석 데이터를 가져오는 중 오류 발생:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAttendanceData()
  }, [currentDate])

  // 출석 체크 함수
  const handleAttendanceCheck = () => {
    const token = localStorage.getItem("token")

    // 💛 비로그인 상태면 알림 띄우고 함수 종료
    if (!token) {
      alert("로그인 후 출석체크를 해 주세요.")
      return
    }

    // ✅ 로그인 상태일 때만 출석 체크 API 호출
    fetch("http://localhost:8080/attendance/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.text())
      .then((msg) => {
        alert(msg)

        // 출석 체크 후 데이터 다시 불러오기
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1

        fetch(`http://localhost:8080/attendance/list?year=${year}&month=${month}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => setAttendanceDates(data.dates))
          .catch((err) => console.error(err))
      })
      .catch((err) => {
        console.error(err)
        alert("출석 실패")
      })
  }

  // 달력 생성 함수
  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // 해당 월의 첫 날과 마지막 날
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    // 첫 날의 요일 (0: 일요일, 6: 토요일)
    const firstDayOfWeek = firstDay.getDay()

    // 달력에 표시할 날짜 배열 생성
    const daysArray = []

    // 이전 달의 날짜로 채우기
    for (let i = 0; i < firstDayOfWeek; i++) {
      daysArray.push(null)
    }

    // 현재 달의 날짜 채우기
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(i)
    }

    // 날짜가 출석한 날인지 확인하는 함수
    const isAttendedDate = (day) => {
      if (!day) return false

      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      return attendanceDates.includes(dateString)
    }

    // 오늘 날짜인지 확인하는 함수
    const isToday = (day) => {
      if (!day) return false

      const today = new Date()
      return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
    }

    // 주 단위로 분할
    const weeks = []
    let week = []

    for (let i = 0; i < daysArray.length; i++) {
      week.push(daysArray[i])

      if ((i + 1) % 7 === 0 || i === daysArray.length - 1) {
        weeks.push(week)
        week = []
      }
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((day, index) => (
          <div key={index} className="flex justify-center items-center h-10">
            {day ? (
              <div
                className={`
                  relative w-8 h-8 flex items-center justify-center rounded-full
                  ${isToday(day) ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-500"}
                `}
              >
                {day}
                {isAttendedDate(day) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-red-500 font-bold animate-appear">✓</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-8 h-8"></div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto my-8">
      <style>{animationStyle}</style>
      <div className="border rounded-lg overflow-hidden shadow-md">
        {/* 달력 헤더 */}
        <div className="bg-gray-100 p-4 flex items-center justify-between border-b" id="attend_calendarhead">
          <button onClick={prevMonth} className="p-1">
            &lt; {/* 왼쪽 화살표 */}
          </button>
          <h2 className="text-lg font-semibold">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </h2>
          <button onClick={nextMonth} className="p-1">
            &gt; {/* 오른쪽 화살표 */}
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 bg-gray-50 border-b" id="attend_calendar">
          {weekdays.map((day, index) => (
            <div key={index} className="text-center py-2 font-medium text-sm">
              {day}
            </div>
          ))}

          {/* 달력 본문 */}
          <div className="col-span-7 p-2 bg-white">
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <p>로딩 중...</p>
              </div>
            ) : (
              renderCalendar()
            )}
          </div>
        </div>

        {/* 출석체크 버튼 */}
        <div className="p-4 bg-slate-600 text-center" id="attend_button">
          <button onClick={handleAttendanceCheck} className="w-full py-2 text-white font-medium hover:bg-slate-700 transition-colors">
              출석체크
          </button>
        </div>
      </div>
    </div>
  )
}

export default AttendanceCheck