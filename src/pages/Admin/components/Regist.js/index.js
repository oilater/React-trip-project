import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginTokenState } from "../../../../atoms/login";
const { kakao, daum } = window;

const Regist = () => {
  //주소 -> 위도, 경도, 지역 코드
  var geocoder = new kakao.maps.services.Geocoder();
  var callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      setLatitude(result[0].road_address.x); //위도
      setLongitude(result[0].road_address.y); //경도
      const bCode = result[0].address.b_code.toString(); //법정 코드

      if (bCode.startsWith("11")) {
        setCityCode(1);
      } else if (bCode.startsWith("50")) {
        setCityCode(2);
      } else if (bCode.startsWith("26")) {
        setCityCode(3);
      } else if (bCode.startsWith("47130")) {
        setCityCode(4);
      } else if (bCode.startsWith("51150")) {
        setCityCode(5);
      } else if (bCode.startsWith("46130")) {
        setCityCode(6);
      } else if (bCode.startsWith("30")) {
        setCityCode(7);
      } else if (bCode.startsWith("41820")) {
        setCityCode(8);
      } else {
        alert("주소를 다시 입력해주세요!");
      }
    }
  };

  //본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
  const handleFindPostNumber = () => {
    new daum.Postcode({
      onComplete: function (data) {
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
        setRoadNameAddress(roadAddr);
        console.log(roadNameAddress);
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
      },
    }).open();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // form 의 기본 기능 막기

    const formData = new FormData();
    formData.append("type", type);
    formData.append("title", title);
    formData.append("address", roadNameAddress);
    formData.append("cityCode", cityCode);
    formData.append("overview", overview);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("keywordCodes", firstKeyword);
    formData.append("keywordCodes", secondKeyword);
    formData.append("keywordCodes", thirdKeyword);
    formData.append("mainImage", mainImgFile);

    if (subImgFile) {
      for (let i = 0; i < subImgFile.length; i++) {
        formData.append("images", subImgFile[i]);
      }
    }

    setRegistForm(formData);

    for (const entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }

    const fetchData = async () => {
      try {
        for (const entry of registForm.entries()) {
          console.log(entry[0], entry[1]);
        }
        const response = await axios.post("http://localhost/api/admin/attraction", formData, {
          headers: {
            Authorization: `Bearer ${loginToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response);
      } catch (error) {
        console.error("관리자 장소 등록 요청 실패: ", error);
      }
    };

    fetchData();
  };
  // 관리자 등록 로직
  const [type, setType] = useState(1); // 관광지 타입 (명소, 식당, 숙소)
  const [title, setTitle] = useState(""); // 관광지 명
  const [postNumber, setPostNumber] = useState(""); // 우편 번호
  const [roadNameAddress, setRoadNameAddress] = useState(""); // 도로명 주소
  const [jibunAddress, setJibunAddress] = useState(""); // 지번 주소
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소
  const [extraAddress, setExtraAddress] = useState(""); // 추가 주소
  const [overview, setOverview] = useState(""); // 장소 설명
  const [firstKeyword, setFirstKeyword] = useState(""); // 첫번째 키워드
  const [secondKeyword, setSecondKeyword] = useState(""); // 두번째 키워드
  const [thirdKeyword, setThirdKeyword] = useState(""); // 세번째 키워드
  const [mainImgFile, setMainImgFile] = useState(null); // 대표 이미지
  const [subImgFile, setSubImgFile] = useState(null); // 서브 이미지
  const [registForm, setRegistForm] = useState(new FormData());
  const [cityCode, setCityCode] = useState(-1); // 도시 코드
  const [latitude, setLatitude] = useState(-1); // 위도
  const [longitude, setLongitude] = useState(-1); // 경도

  const loginToken = useRecoilValue(loginTokenState);

  useEffect(() => {
    const address = roadNameAddress;
    console.log("address:::: ", address);

    address && geocoder.addressSearch(address, callback);
  }, [roadNameAddress]);

  // 타입 선택 처리
  const handleType = (e) => {
    console.log("선택한 관광지 타입: ", e.target.value);
    setType(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleOverview = (e) => {
    setOverview(e.target.value);
  };

  const handleDetailAddress = (e) => {
    setDetailAddress(e.target.value);
  };

  const handleExtraAddress = (e) => {
    setExtraAddress(e.target.value);
  };

  const handleRoadNameAddress = (e) => {
    setRoadNameAddress(e.target.value);
  };

  const handleFirstKeyword = (e) => {
    setFirstKeyword(e.target.value);
  };

  const handleSecondKeyword = (e) => {
    setSecondKeyword(e.target.value);
  };

  const handleThirdKeyword = (e) => {
    setThirdKeyword(e.target.value);
  };

  const handleMainImgFile = (e) => {
    setMainImgFile(e.target.files[0]);
  };

  const handleSubImgFile = (e) => {
    setSubImgFile(e.target.files);
  };

  const handleSubmit = () => {};

  return (
    <div className="regist-section">
      <form onSubmit={handleFormSubmit}>
        <section className="admin-input">
          <h2>관광지 등록</h2>
          <div className="type-section">
            <div>
              <p>타입</p>
            </div>
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
              <input type="text" value={postNumber} placeholder="우편번호" readOnly required />
              <input type="button" onClick={handleFindPostNumber} value="우편번호 찾기" />
            </div>

            <div>
              <input
                type="text"
                value={roadNameAddress || ""}
                onChange={handleRoadNameAddress}
                placeholder="도로명주소"
                readOnly
                required
              />
              <input type="text" value={jibunAddress} placeholder="지번주소" readOnly required />

              <span id="guide" style={{ color: "#999", display: "none" }}></span>

              <input type="text" value={detailAddress} onChange={handleDetailAddress} placeholder="상세주소" />
              <input type="text" value={extraAddress} onChange={handleExtraAddress} placeholder="참고항목" />
            </div>
            <div className="inputbox">
              <label htmlFor="overview">설명 </label>
              <input value={overview} onChange={handleOverview} id="overview" type="text" name="overview" required />
            </div>
            <div>
              키워드 1
              <div className="select">
                <select onChange={handleFirstKeyword} name="keywordCodes">
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
                <select onChange={handleSecondKeyword} name="keywordCodes">
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
                <select onChange={handleThirdKeyword} name="keywordCodes">
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
            <div className="main-img-div">
              대표 이미지
              <div className="inputbox-content">
                <input type="file" onChange={handleMainImgFile} required accept=".png, .jpg, .jpeg" />
              </div>
            </div>
            <div className="sub-img-div">
              서브 이미지
              <div className="inputbox-content">
                <input onChange={handleSubImgFile} type="file" name="images" multiple accept=".png, .jpg, .jpeg" />
              </div>
            </div>
            <div className="submit-btn-div">
              <button onClick={handleSubmit} className="btn btn-confirm" type="submit">
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
