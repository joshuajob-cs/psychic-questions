Extra stuff I will do if I get the time:

- Style buttons
- Mess with the spacing
- Mess with player points to look better
- Adjust questions to look better on landscape screen

- You should not be able to join a game once you have reached the guess-answers phase. It might make sense for someone to join while you are still answering the questions, but you can't really have someone join after that, because then it can not be split across everyone in a way that makes sense.

- If someone joins in the answer questions phase we would just have to make sure that they are answering the quetsions that someone else has already been asked. At the beggining of the answer questions phase probably four players should be assigned each question, but if there is 5 or 6 then that is fine too. At least 4.

How do I make it so that players recieve a random four responses from other players instead of just recieving all of the responses that are out there?

1. Test Database make sure that it works before continuing further
2. answer-choices should take an integer indicating the index of the correct answer because it will not be the same every time
3. Right now question list creates a flat array of every player's answer to a specific question, Instead I should have a helper function select random answers that first selects the correct answer, then selects up to three random answers in addition to that, and gives them answer-choices in a random order.
