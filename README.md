# Browser History Visualizer

A mini browser history simulator built with vanilla HTML, CSS and JavaScript.

I made this after learning linked lists — wanted to see how they actually work in a real use case instead of just solving problems on paper.

## What it does

- You can type any URL and visit it
- Back and forward buttons work like a real browser
- There's a live linked list visualizer at the bottom that shows every node, the prev/next pointers, and where `curr` is pointing right now
- If you go back and then visit a new page, the forward history gets cut off — you can actually see the nodes fade out when that happens

## Why linked lists?

Browser history is a classic doubly linked list problem. Each page you visit is a node. Going back means `curr = curr->prev`. Going forward means `curr = curr->next`. Visiting a new page cuts off `curr->next` so you can't go forward anymore.

I wrote the same logic in C++ first as a DSA problem, then translated it to JavaScript for this project.

## Tech used

- HTML
- CSS (animations, transitions)
- Vanilla JavaScript (no frameworks, no libraries)

## Files

```
index.html      — structure
linkedlist.js   — Node class and BrowserHistory class (the actual DSA logic)
app.js          — UI logic, rendering, event listeners
style.css       — styling and animations
```

## How to run

Just open `index.html` in your browser. No setup needed.

## Live demo

> https://chimrag.github.io/-browser-history-visualizer/

---

Made by [chimrag](https://github.com/chimrag)
