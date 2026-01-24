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
<meta charset="UTF-8">
```
I can add emojis and extra characters
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">: 
```
Matches width to device width when the website shows up on a phone. Changes the Zoom to the default setting (100%).

```html
<input type="radio" id="answer-a" name="question-3">
<label for="answer-a">How to swim</label>
```

Radio makes it a multiple choice question. ID connects it to label, so that clicking the words is the same as hitting the circle. Name groups it with other possible answers, so that you can only answer one of them.

## CSS

* Padding vs. Margin: Padding is inside a shape, margin is outside.  
* Strong is the same as bold except screen readers will emphasize it.

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
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
```

box-shadow: offset-x offset-y blur-radius color(r, g, b, opacity);


## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
