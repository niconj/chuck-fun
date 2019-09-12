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

  5 - The search should present a list of jokes matching the query - if there is only
one matching joke, then you should land on a single joke page
```

## Asumptions
```
  a. Jokes can have multiple categories
```

## Considerations
```
 1 - The jokes have no titles
 2 - The user is able to rate a joke multiple times for demo purposes
 3 - The joke has no title. I'll use the first words on the Top Joks List
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