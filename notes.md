# CS 260 Notes

[Example startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## Markdown

In markdown you can link to images and even headings in the same file.

## AWS

ssh -i [path_to_key] ubuntu@54.145.245.144  
http://54.145.245.144  
I needed a 'paid account' for a domain name. The subdomain worked correctly after like 5 minutes, but the root domain I had to wat all night long for it to finally work correctly.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

```html
<meta charset="UTF-8" />
```

I can add emojis and extra characters

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />:
```

Matches width to device width when the website shows up on a phone. Changes the Zoom to the default setting (100%).

```html
<input type="radio" id="answer-a" name="question-3" />
<label for="answer-a">How to swim</label>
```

Radio makes it a multiple choice question. ID connects it to label, so that clicking the words is the same as hitting the circle. Name groups it with other possible answers, so that you can only answer one of them.

This is how you deploy:
./deployFiles.sh -k <yourpemkey> -h joshuajob-cs.click -s startup

## CSS

- Padding vs. Margin: Padding is inside a shape, margin is outside.
- Strong is the same as bold except screen readers will emphasize it.

```css
display: flex;
justify-content: center;
align-items: center;
min-height: 100vh;
```

The first line turns the object into a flex box. This makes it possible to center and align the items within the flex box. The second line centers it horizontally. The third line centers it vertically. The Fourth line sets the height of the object to be at least the height of the screen (rather than the height of the content)

```css
width: 100%;
max-width: 500px;
```

Try to fill the whole screen (100%) but don't go above 500 pixels.

```css
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
```

box-shadow: offset-x offset-y blur-radius color(r, g, b, opacity);

- rem is an alternative to px that is based on font size.

```css
position: fixed;
bottom: 0;
```

Pins a footer to the bottom

```css
position: relative;
z-index: 1;
```

Allows you to stack elements (higher z index on top)

All CSS elements are global when you route everything to the same page.

## React Part 1: Routing

1. Copy over
2. class -> className
3. import css

chmod +x deployReact.sh  
./deployReact.sh -k <yourpemkey> -h joshuajob-cs.click -s startup

## React Part 2: Reactivity

```jsx
import React from "react";
```

Put this on every file or it breaks, and it is annoying.

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);
};
```

The value e is past in as a parameter. e means event. e.preventDefault stops the page from reloading.

```jsx
<input
  value={code} // React controls the input
  onChange={(e) => setCode(e.target.value)}
/>
```

Controlled vs. Uncontrolled. If I set the value to code then I can change the code from outside the function and it will automatically adjust value. So value is controlled. If I don't set the value to code the value will only be adjusted when I type stuff in the text box, and therefore it is uncontrolled.

```jsx
export const ShareVars = ({ children }) => {};
```

The word children automatically takes anything inside the <> </> as input.

For debugging I needed to Ctrl + Shift + k (open dev tools), and then manually delete storage sometimes because local storage keeps it stored across sessions.

## Service

- Do `node service/server.js` to run server

Then I can type in the URL: http://localhost:4000/

When I go to the website it will automatically send a GET/ request to my server, which I can process with:

```js
app.get("/", (req, res) => {
  res.send("Running the server");
});
```

- res is the response to the request

```js
router.get("/:code", (req, res) => {});
```

Apparently, it is convention for a get request to not have a body, so you would send in a value as code/IDNAME instead.

```js
return players.reduce((a, b) => (a.points >= b.points ? a : b));
```

Automatically iterates through and compares everything.

```js
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});
```

The backend does not know what to do with the frontend http requests (i.e .../winner), so it sends it to index.html in public (where everything else in the frontend is).

```js
Promise.all();
```

Runs multiple functions in parellel. Quicker then waiting for them sequentially which is the default for useEffect (useEffect takes it out of the normal Reactivity flow like await).
