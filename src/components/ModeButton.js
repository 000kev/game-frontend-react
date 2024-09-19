export default function ModeButton({mode, setMode}) {


  return (
    <div className="flex flex-row w-96 h-16 bg-blue-200/[.5] rounded-3xl text-blue-700 font-semibold">
      <button
        key={`mode-button-register`}
        type="button"
        onClick={() => setMode("Register")}
        className={`basis-1/2 ${
          mode === "Register" ? "bg-blue-200 rounded-3xl drop-shadow-lg" : ""
        }`}
      >
        REGISTER
      </button>
      <button
        key={`mode-button-login`}
        type="button"
        onClick={() => setMode("Login")}
        className={`basis-1/2 ${
          mode === "Login" ? "bg-blue-200 rounded-3xl drop-shadow-lg" : ""
        }`}
      >
        LOGIN
      </button>
    </div>
  );
}
