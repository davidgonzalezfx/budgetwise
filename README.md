<p align="center">
  <img src="https://budgetwise.vercel.app/assets/images/logo/logo.png" width="80" height="80">
  <h3 align="center">Budgetwise - davidgonzalezfx</h3>

  <p align="center">
    <a href="https://www.instagram.com/davidgonzalezfx/">Instagram</a> |
    <a href="https://twitter.com/davidgonzalezfx">Twitter</a> |
    <a href="https://www.linkedin.com/in/davidgonzalezfx/">LinkedIn</a>
  </p>
</p>


<strong>Description</strong>

Budgetwise is not the common expenses tracker you can find on app stores. Budgetwise aims to helps people with zero knowledge on budgeting, in their first steps on financial wellbeing. That's why we have built an mobile and web application where users will enjoy to learn about personal finances and strategies according to their objectives. But also to make budgeting smooth, we provide budget suggestions ready to use so users won't have to think so much how to budget. 

Since the first steps on financial well-being starts where your money goes, with our intuitive UI user will make expense tracking a habit. Then when they control their monthly expenses, we will guide them making of saving and investing a habit. 

<br />

<strong>Tech stack & Third party services</strong>

The code base was built with [NextJs](https://nextjs.org/) on the frontend, we used [Firebase](https://firebase.google.com/?hl=es) as a backend service (beacuse it allowed us to set auth and database so fast). And all the pipeline and deployment workflow works with [Vercel](https://vercel.com/)

<br />

<strong>Color Palette</strong>

* [dopelycolors](https://colors.dopely.top/palettes/1YNFGchPfQf)



<br />

<strong>Try for free</strong>

* [Landing page](https://budgetwise.vercel.app/landing.html)
* [App live](https://budgetwise.vercel.app)

<br />

<strong>Run the project</strong>

* Clone the project

  ```shell
  $ git clone https://github.com/davidgonzalezfx/budgetwise
  ```

* Install dependencies

  ```shell
  $ cd budgetwise
  ```
  ```shell
  $ yarn install
  ```
* Setup Firebase app: go to `services/firebase.js` and replace `firebaseConfig`:

  ```shell
  $ code services/firebase.js
  ```
  
  ```js
  const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
  ```

* Run the app:

  ```shell
    $ yarn dev
  ```


<strong>Roadmap</strong>

- [X] PWA
- [X] Goals
- [X] Custom budget 
- [X] Expense tracker
- [X] Cross-device support
- [X] User login and signup
- [X] Budgeting made easy with suggestions
- [ ] Offline
- [ ] Insights
- [ ] Improve UX
- [ ] Multiple accounts
- [ ] Share budget link
- [ ] Schedule and bills reminders
- [ ] Next 3 month pre-made budget
- [ ] Deploy to iOS & Android app store
