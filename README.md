# Portions calculcator

Calculates weight of food ingredients per serving. You can then use this weights in your caloric tables.

Ideal if you want to make any kind of mixture like risoto, lasagna, or just some meat with vegetables in one pan expecting more than one portion/serving. 

You can use https://servings.zlobot.cz or deploy it yourself

### Usage
In first form type name of your ingredient and weight. It will automaticaly add new rows.

In second form type weight of your servings. 

Sum of servings does not have to be same as sum of ingredients, it will take in account some loses and evaporation.

### limitations
- Persistence (local storage) is not implemented 
- Missing reset buttons
- Missing row removal button

## Deploy
`git clone git@github.com:lubomirfiala/portion-calculator.git`  
`cd portion-calculator`  
`yarn install`  
`yarn build` 

built index is then available in `./dist/index.html`
