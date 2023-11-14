import "./modal.css";

const Modal = ({ closeModal }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => closeModal(false)}> X </button>
        <div className="title">
          <h1>로그인</h1>
        </div>
        <form>
          <div className="body">
            <label htmlFor="id">
              <input name="id"></input>
            </label>
            <label htmlFor="password">
              <input name="password"></input>
            </label>
          </div>
        </form>
        <div className="footer">
          <button>로그인</button>
          <div>
            <span>아직 여행의민족 회원이 아니신가요?</span>
            <a>회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
