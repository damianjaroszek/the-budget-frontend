
# The Budget

Control your spending, live more peacefully


## About the project
For several years I have been writing down my daily expenses in Excel. My inspiration was to speed up the process to spend as little time as possible on this activity. 


## Repositiories
  https://github.com/damianjaroszek/the-budget-frontend </br>
  https://github.com/damianjaroszek/the-budget-back


## Video
[![IMAGE ALT THE BUDGET APP](https://i.ibb.co/ckKcJn0/the-budget-screen.jpg)](https://www.youtube.com/watch?v=vQRq8U8V5xg&ab_channel=DamianJaroszek)
## Screenshots

![App History](https://i.ibb.co/1Gv3m2b/history.jpg)
![App Receipt](https://i.ibb.co/fDW7c9Q/receipt.png)
![App Screenshot](https://i.ibb.co/WBL65Zp/category.jpg)

## Demo

https://dj.networkmanager.pl/budget


## Tech Stack

**Frontend:** React, Redux-Toolkit, TailwindCSS, React Google Charts, Syncfusion, Material-UI

Design inspiration: 
https://www.youtube.com/watch?v=jx5hdo50a2M&ab_channel=JavaScriptMastery

**Backend:** Node, Express, MySQL


## Installation

**Install The Budget Backend with npm:**

```bash
  git clone https://github.com/damianjaroszek/the-budget-back.git
```
```bash
  npm install
```
For running:
```bash
  npm start
```


For running in develop mode (watch):
```bash
  npm start:dev
```

For build:
```bash
  npm build
```


**Install The Budget MySQL database run the code below in your database client or terminal:**
https://github.com/damianjaroszek/the-budget-back/blob/master/create_database/the_budget.sql 

**Install The Budget Backend with npm:**
For local installation is very important change in api.ts file:
https://github.com/damianjaroszek/the-budget-frontend/blob/master/src/config/api.ts
Need to change adress from localhost:3001 to localhost:3001/api2
```bash
// global management for localhost address
export const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:3001/api2';
```
```bash
  git clone https://github.com/damianjaroszek/the-budget-frontend.git
```
```bash
  npm install
```

______________

For running:
```bash
  npm run start
```

For build
```bash
  npm run build
```

    
## Features

- Updating budget value
- Icrease in the value of expense when receipt is added
- Chart "budget vs expense"
- Chart "structure of expense"
- Browsing archived receipts
- Managing receipts
- Managing shops
- Managing products
- Managing categories

Need to improve:
- RWD
- Form for adding items as a stick button - after click the button a modal should appear with form
- Chart "expense per category"

## Summary of project
This project was an amazing adventure through which I learned a lot. The project is not perfect I treated it a bit like a testing ground. For example, Redux-Toolkit was used in part of the project, and normal prop transfer was used in part. This was done intentionally to use and practice both solutions. Many things in the course of writing became clearer I understood a lot of why to do it this way and not that way and why to do it. Due to the limited time I could devote to the project I took the approach of doing everything to prove the application in time to be able to show something to the client therefore I am aware of many mistakes that can be fixed in the future.

# Contact

damianjaroszek90@gmail.com
