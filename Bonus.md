# Bonus

**Testing:**

_April 14, 2026 — Tested with my CS 260 class. The host skipped the answer questions phase before everyone else was ready. Possible fixes in order of importance:_

1. When host presses skip there should be a warning screen that flashes and waits 3 seconds before it lets the host continue to make sure that the host has read the message. The warning screen should only flash if there is less than 5 players ready or less than 75% of the players are ready.
2. Add a counter that tells you how many players there are total and how many of them have answered
3. Add a button to reset the game from the beginning if the host messes up
4. If not enough players answer then there will be not enough distractors. Each user should have the opportunity to fill out one distractor for each question while they are waiting.
**Extra stuff I will do if I get the time:**

1. Make it a progressive web application that I can download on my phone!
2. I changed my mind about data persistence. The only thing that needs to be persisted is answers and questions (so that logged in users can look at what people answered in past games), people will not really care about any of the other game settings.
3. Questions do not need to be stored until the transition from ask questions to guess answers, people will not want a bunch of incomplete or unstarted games to be stored
4. Instead of ishost there should be a variable which specifies auth (0,1,2)
5. When a user exits and enters a webpage again they should automatically be directed back to the correct page they were on. They should not be able to refresh and reanswer questions that they have already answered.
6. Players need a way to quit the game when they are done. If the host disconnects while on the last screen, they are probably done, and so their authtoken is removed. If the host starts a new game, their auth token is removed. Once the host's auth Token is removed AND nobody else is still connected to the server, the game ends. For non-host I don't have to worry about removing their auth Token as much, they will get a different one anyway if they start a new game.
7. When a game is done it can be removed from the server.
8. Look at AWS and get a cheaper server that I can keep for the duration of eternity, even after I run out of credits
9. I want joshuajob-cs to link directly to my web page instead of to the 260 page. Instead of having a "simon" and a "startup" I should have a "me" which displays my personal website.
10. Famous Mode! The host selects players to be famous. Famous players only answer questions. Everyone else only guesses answers.
11. Memories! When someone logs in, it can be assumed that if they were in the middle of a game (not at the end of the game) in the last 30-60 minutes, they probably want to resume the game. If not, then they probably want to start a game and a new game can be started for them. But there should be an option if instead of starting a new game, they want to look at past games, and they can scroll through the past games and see what everyone responded (why only questions and answers are stored persistently).
12. Add a donate button just in case the app gets big and expensive

**Notes:**

- You can have someone join at any point in the game, but special precautions would need to be taken to not mess anything up. For example if they join while asking questions, they can only be asked questions that other people are already being asked. If they join during guess answers it is fine to just pick 4 players to guess the answer to, they have the solace of knowing that they will not ever be asked the same question they answered (as they did not answer).
- The user does not receive the score from the backend, it is always set to 0 at join game. Instead joinGame should pull user.score from the backend when the user logs in again (which would solve deleting the browser data or a server shut down because both would force the user to lose their authToken). Right now join game always creates a new player, but eventually logged in users will be able to continue a game that they have already joined and they will need a more accurate score.
