import { useRef, useState } from "react";
import "./App.css";

function App() {
  let [loading, setLoading] = useState(false);
  let [display, setDisplay] = useState("I need help");
  let [chatHistory, setChatHistory] = useState([]);
  let massage = useRef("");
  let [chatloggpt, setchatloggpt] = useState([
    {
      messagegpt: "I am a chatbot",
    },
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    setDisplay(massage.current.value);
    setChatHistory([...chatHistory, massage.current.value]);
    console.log(massage.current.value);

    async function fetchData() {
      setLoading(true);
      const response = await fetch("http://localhost:3080/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: massage.current.value,
        }),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      setchatloggpt([{ messagegpt: `${data.message}` }]);
    }
    fetchData();
    massage.current.value = "";
  }

  const ChatMessage = ({ messageuser }) => {
    return (
      <div className="chat-massage">
        <div className="avatar">
          <img
            src="https://avatars.githubusercontent.com/u/112841387?s=100&v=4"
            alt="profile"
          />
        </div>
        <div className="message">{messageuser}</div>
      </div>
    );
  };

  const Aimassage = ({ messagegpt }) => {
    return (
      <div className="Ai-massage">
        <div className="Aiavatar">
          <img
            src="https://brandlogovector.com/wp-content/uploads/2023/01/ChatGPT-Icon-Logo-PNG.png"
            alt="profile"
          />
        </div>

        <div className="Aimessage">{messagegpt.messagegpt}</div>
      </div>
    );
  };

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="chat">
          <span>+</span>
          New chat
        </div>
      </aside>
      <section className="chatbox">
        <div
          style={{
            width: "20%",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img
            src="https://icon-library.com/images/highlights-icon/highlights-icon-27.jpg"
            alt="logo"
            width={"50px"}
            style={{
              marginTop: "15px",
              marginLeft: "-3rem",
              borderRadius: "20%",
              opacity: "0.8",
            }}
          />
          <h1
            style={{
              marginLeft: "-7rem",
              marginTop: "15px",
              color: "white",
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              opacity: "0.7",
            }}
          >
            ChatGPT
          </h1>
        </div>

        {/* user input box start */}
        <div className="chat-log">
          <ChatMessage messageuser={display.toUpperCase()} />
        </div>
        {/* user input box end here */}
        {/* reply box start here */}
        {loading ? (
          <div>
            <img
              className="rotate"
              src="https://www.freeiconspng.com/thumbs/load-icon-png/load-icon-png-8.png"
              alt="loading"
            />
          </div>
        ) : (
          <div className="Ai-log">
            {chatloggpt?.map((messagegpt, index) => (
              <Aimassage key={index + 12} messagegpt={messagegpt} />
            ))}
          </div>
        )}
        {/* reply box end here */}
        <div className="inputbox">
          <form onSubmit={handleSubmit}>
            <input
              row="1"
              className="input"
              type="text"
              ref={massage}
              placeholder="Write your query here"
            ></input>
          </form>
          <h4>
            <span>ChatGPT Jan 30 Version.</span> Free Research Preview. Our goal
            is to make Al systems more natural and safe to interact with. Your
            feedback will help us improve.
          </h4>
        </div>
      </section>
    </div>
  );
}

export default App;
