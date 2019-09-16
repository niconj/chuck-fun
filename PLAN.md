# Chuck Fun

## Requirements
```
  1 - Mobile responsivness from iPhone 5 display and up

  2 - Jokes which don’t have a category should be summarized under ‘Uncategorized’

  3 - Jokes grading system:
    0 - 50 likes → “new in town”
    51 - 100 → “trending”
    101 + → “hall of fame”

  4 - If number of DISLIKES is greater than likes, than joke receives label
“chestnut” with #000 background color

  5 - The search should present a list of jokes matching the query - if there is only one matching joke, then you should land on a single joke page
```

## Considerations
```
 1 - The jokes have no titles

Given that the Chuck Norris Api do not provide with titles on their Joke model, I've decided to use the first sentence of the joke in the Top Jokes list.

 2 - The user is able to rate a joke multiple times for demo purposes

The user should be only to vote once if their like (or not) a joke. Just for the sake of testing the Joke rating I've allow multi voting.

 3 - The joke has no rating

 The Chuck Norris Api do not provide with rating for the jokes. I've setted the Thumbs Up and Down quantity as a random number between 0 & 101

 4 - Categories Colors

 Given that we don't know the amount of Categories available in the Chuck Norris Api, and that the amount of colors in the zeplin comps do not cover a big number of categories, I've setted the color asignation using a npm library that provides color palletes (https://www.npmjs.com/package/nice-color-palettes)

 5 - Joke Categories

 The Chuck Norris Api provides, in it's Joke model, an array of strings for the categories that Joke is related. I didn't find a Joke with more than 1 category on that array, but since it is an array I've assumed that a Joke could be under many categories, that's why the Category selection logic on the HomePage works with an inclusive approach.
 ```


## Project plan

### 1 - Dev environment setup
```
  a. Create vue project using vue CLI
  b. Create github repository
```

### 2 - Creation of pages and basic routing
```
  a. Create pages
  b. Create routes
```

### 3 - Jokes Api connection setup
```
  a. Install and configure axios
  b. Create Jokes service
```

### 4 - Jokes store
```
  a. Install vuex
  b. Setup Jokes Store
```

### 5 - Bussiness Logic
```
  a. Categories filter on landing page
  b. Searching of jokes by text
  c. Rating system on the Joke Details page
  d. Joke Pagination on the Joke Details page
  e. Top Jokes list
```

### 6 - Set up Github pages config
```
  a. Create gh-pages branch
```
