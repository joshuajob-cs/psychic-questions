export function AnswerChoices({ choices, onSelect, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="answer-choices">
        {choices.map((choice, j) => (
          <div className="choice" key={j}>
            <input
              type="radio"
              id={`a${j}`}
              name="question"
              required
              onChange={() => onSelect(j)}
            />
            <label htmlFor={`a${j}`}>{choice}</label>
          </div>
        ))}
      </div>
      <button type="submit">Next</button>
    </form>
  );
}
