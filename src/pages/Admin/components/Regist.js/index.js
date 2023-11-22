import "./index.css";
import { useState } from "react";
const { kakao, daum } = window;

const Regist = () => {
  //주소 -> 위도, 경도, 지역 코드
  var geocoder = new kakao.maps.services.Geocoder();
  var callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const x = result[0].road_address.x; //위도
      const y = result[0].road_address.y; //경도
      const bCode = result[0].address.b_code.toString(); //법정 코드
      let cityCode = 0;
      document.getElementById("latitude").value = x;
      document.getElementById("longitude").value = y;

      if (bCode.startsWith("11")) {
        cityCode = 1;
      } else if (bCode.startsWith("50")) {
        cityCode = 2;
      } else if (bCode.startsWith("26")) {
        cityCode = 3;
      } else if (bCode.startsWith("47130")) {
        cityCode = 4;
      } else if (bCode.startsWith("51150")) {
        cityCode = 5;
      } else if (bCode.startsWith("46130")) {
        cityCode = 6;
      } else if (bCode.startsWith("30")) {
        cityCode = 7;
      } else if (bCode.startsWith("41820")) {
        cityCode = 8;
      } else {
        alert("주소를 다시 입력해주세요!");
      }
      document.getElementById("cityCode").value = cityCode;
    }
  };

  //본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
  const handleFindPostNumber = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        console.log(data);
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ""; // 참고 항목 변수

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname; // ex 무실동
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr += extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        setPostNumber(data.zonecode);
        setRoadNameAddress(data.roadAddr);
        setJibunAddress(data.jibunAddress);

        // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
        if (roadAddr !== "") {
          setExtraAddress(extraRoadAddr);
        } else {
          setExtraAddress("");
        }

        var guideTextBox = document.getElementById("guide");
        // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
        if (data.autoRoadAddress) {
          var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
          guideTextBox.style.display = "block";
        } else if (data.autoJibunAddress) {
          var expJibunAddr = data.autoJibunAddress;
          guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
          guideTextBox.style.display = "block";
        } else {
          guideTextBox.innerHTML = "";
          guideTextBox.style.display = "none";
        }

        const address = document.getElementById("sample4_roadAddress").value;
        geocoder.addressSearch(address, callback);
      },
    }).open();
  };

  let registForm = document.getElementById("registForm");
  console.log(registForm);
  let url = "http://localhost/api/admin/attraction";
  const headers = new Headers();
  headers.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFkbWluIiwibmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzAwNTYyOTc2fQ.9fzPpvuv9r_3VrBB8VN2uJA08PwJ8SuSydQbnUOVkho"
  );

  const handleFormSubmit = (e) => {
    e.preventDefault(); // form 의 기본 기능 막기
    const formData = new FormData(registForm);

    for (const entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }
    const config = {
      method: "post",
      headers,
      body: formData,
    };
    fetch(url, config).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert("등록 완료!");
      return response.text();
    });
  };
  // 관리자 등록 로직
  const [type, setType] = useState(-1); // 관광지 타입 (명소, 식당, 숙소)
  const [title, setTitle] = useState(""); // 관광지 명
  const [postNumber, setPostNumber] = useState(""); // 우편 번호
  const [roadNameAddress, setRoadNameAddress] = useState(""); // 도로명 주소
  const [jibunAddress, setJibunAddress] = useState(""); // 지번 주소
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소
  const [extraAddress, setExtraAddress] = useState(""); // 추가 주소
  // 타입 선택 처리
  const handleType = (e) => {
    console.log("선택한 관광지 타입: ", e.target.value);
    setType(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="regist-form">
      <form onsubmit={handleFormSubmit}>
        <section className="input-content">
          <h2>관광지 등록</h2>
          <div>
            <p>타입</p>
            <div>
              <select onChange={handleType} name="type">
                <option value="1">관광지</option>
                <option value="2">식당</option>
                <option value="3">숙박</option>
              </select>
            </div>

            <div>
              <label htmlFor="title">명소 명</label>
              <input onChange={handleTitle} value={title} id="title" type="text" name="title" required />
            </div>

            <div>
              <input type="text" value={postNumber} placeholder="우편번호" readonly required />
              <input type="button" onClick={handleFindPostNumber} value="우편번호 찾기" />
            </div>

            <div>
              <input type="text" value={roadNameAddress} placeholder="도로명주소" readonly required />
              <input type="text" value={jibunAddress} placeholder="지번주소" readonly required />

              <span id="guide" style={{ color: "#999", display: "none" }}></span>

              <input type="text" value={detailAddress} placeholder="상세주소" />
              <input type="text" value={extraAddress} placeholder="참고항목" />
            </div>
            <div className="inputbox">
              <label htmlFor="overview">설명 </label>
              <input id="overview" type="text" name="overview" required />
            </div>
            <div>
              키워드 1
              <div className="select">
                <select name="keywordCodes">
                  <option value="">선택안함</option>
                  <option value="1">바다</option>
                  <option value="2">산</option>
                  <option value="3">별</option>
                  <option value="4">계곡</option>
                  <option value="5">해수욕장</option>
                  <option value="6">연못</option>
                  <option value="7">공원</option>
                  <option value="8">절</option>
                  <option value="9">폭포</option>
                  <option value="10">강</option>
                  <option value="11">고적지</option>
                  <option value="13">섬</option>
                  <option value="15">도시</option>
                </select>
              </div>
            </div>
            <div>
              키워드 2
              <div className="select">
                <select name="keywordCodes">
                  <option value="">선택안함</option>
                  <option value="1">바다</option>
                  <option value="2">산</option>
                  <option value="3">별</option>
                  <option value="4">계곡</option>
                  <option value="5">해수욕장</option>
                  <option value="6">연못</option>
                  <option value="7">공원</option>
                  <option value="8">절</option>
                  <option value="9">폭포</option>
                  <option value="10">강</option>
                  <option value="11">고적지</option>
                  <option value="13">섬</option>
                  <option value="15">도시</option>
                </select>
              </div>
            </div>
            <div>
              키워드 3
              <div className="select">
                <select name="keywordCodes">
                  <option value="">선택안함</option>
                  <option value="1">바다</option>
                  <option value="2">산</option>
                  <option value="3">별</option>
                  <option value="4">계곡</option>
                  <option value="5">해수욕장</option>
                  <option value="6">연못</option>
                  <option value="7">공원</option>
                  <option value="8">절</option>
                  <option value="9">폭포</option>
                  <option value="10">강</option>
                  <option value="11">고적지</option>
                  <option value="13">섬</option>
                  <option value="15">도시</option>
                </select>
              </div>
            </div>
            <div className="inputbox">
              대표 이미지
              <div className="inputbox-content">
                <input id="input0" type="file" name="mainImage" required accept=".png, .jpg, .jpeg" />
              </div>
            </div>
            <div className="inputbox">
              서브 이미지
              <div className="inputbox-content">
                <input id="input0" type="file" name="images" multiple accept=".png, .jpg, .jpeg" />
              </div>
            </div>
            <div className="submit-btn-div">
              <button className="btn btn-confirm" type="submit">
                등록
              </button>
              <button className="btn btn-cancel">Cancel</button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Regist;
