Hello list to do:

Test websocket and submit.

Before ask questions: It should choose from a list of 100+ questions. It should assign a question to a group of 4-8 players. If there are 8 players you would choose a random question, assign it to 4-8 players and keep going.

Assign it to 4 players, but if there is more than 4 the last group is a big group.

Can you send a message to a single player?

I need to give each player a different list of questions. For answers instea dof just having the answer should I have atuple with the index of the question as well as the answer?

Instead of getting all of the answers, it should only get the answers with the same index as the question.

If there are 5 players then it should have different players recieve the questions? Impossible some of tehm would need to be shared.

Always target the people with less questions before the people with more questions.

Add isHost: false back to src/join/input-tester.jsx in the updateFrontend setUser call. It was temporarily removed for testing so the host's isHost value wouldn't get overwritten when joining.
