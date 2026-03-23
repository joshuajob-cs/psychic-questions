Extra stuff I will do if I get the time:

- Style buttons
- Mess with the spacing
- Mess with player points to look better
- Adjust questions to look better on landscape screen

- You should not be able to join a game once you have reached the guess-answers phase. It might make sense for someone to join while you are still answering the questions, but you can't really have someone join after that, because then it can not be split across everyone in a way that makes sense.

- If someone joins in the answer questions phase we would just have to make sure that they are answering the questions that someone else has already been asked. At the beggining of the answer questions phase probably four players should be assigned each question, but if there is 5 or 6 then that is fine too. At least 4.

How do I make it so that players recieve a random four responses from other players instead of just recieving all of the responses that are out there?

1. answer-choices should take an integer indicating the index of the correct answer because it will not be the same every time
2. Right now question list creates a flat array of every player's answer to a specific question, Instead I should have a helper function select random answers that first selects the correct answer, then selects up to three random answers in addition to that, and gives them answer-choices in a random order.

- Right now game data is stored persistently in the database for the case of a server crashing, but authTokens are not stored persistently, and logging in creates a new game. The only legitamite reason to store game data persistently is if someone is playing a game across multiple days (i.e as a bellstarter meet 5 of your classmates each day). Therefore game data only needs to copied to the server once every 10 seconds, and it is better to send all of the data on a game by game basis rather than a player by player basis. However, data should not be copied over if users are not interacting with the game. Authtokens do not need to be stored in the database because a user can just log in again. If a guest deletes their authToken or the server fails, the guest can not log in again. However, a normal user can get a new auth token with their username and password.

The user does not recieve the score from the backend, it is always set to 0 at join game. Instead joinGame should pull user.score from the backend when the user logs in again (which would solve deleting the browser data or a server shut down because both would force the user to loes their authToken). Right now join game always creates a new player, but eventually logged in users will be able to continue a game that they have already joined and they will need a more accurate score.
