
const Attendance = () =>
{
    return (
<button onClick={() => 
{
  const token = localStorage.getItem("token");

  fetch("http://localhost:8080/attendance/check", 
  {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.text())
    .then((msg) => alert(msg))
    .catch((err) => console.error(err));
  }}
>
  출석 체크</button>

    );

}

export default Attendance