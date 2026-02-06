Got it 👍
You’re upgrading an existing Angular 13 app to Angular 21, and your mental model is React 18, not Angular. That’s actually a good place to start—I'll map concepts to React wherever possible and keep things practical.

⚠️ One important reality check first
Angular 13 → Angular 21 is a BIG jump (8 major versions).
You should NOT jump directly. Angular is very strict about version-by-version migrations.


---

Big-picture plan (TL;DR)

Think of this like upgrading React 16 → 18 but with enforced steps:

Angular 13
 → 14 → 15 → 16 → 17 → 18 → 19 → 20 → 21

Each step:

updates framework + tooling

runs automatic migrations

may introduce breaking changes



---

Step 0: Angular basics (React → Angular mental mapping)

Before touching code, align concepts.

React	Angular

Component	Component
JSX	HTML templates
Props	@Input()
Callbacks	@Output() + EventEmitter
State (useState)	Component class properties
useEffect	Lifecycle hooks (ngOnInit, ngOnDestroy)
Context / Redux	Services + Dependency Injection
Fetch / Axios	HttpClient
React Router	Angular Router


👉 Angular is class-based + opinionated, unlike React’s flexible approach.


---

Step 1: Check your current setup (Angular 13)

Run these in your project root:

node -v
npm -v
ng version

Angular 13 usually needs:

Node 14 / 16


Angular 21 needs:

Node 20+


📌 Do not upgrade Node all at once.
We’ll upgrade Node gradually.


---

Step 2: Put the project under control

Before upgrades:

git status
git commit -am "Before Angular upgrade"

If something breaks, you’ll thank yourself 😄


---

Step 3: Upgrade Angular step by step (CORE RULE)

Angular upgrades are done via Angular CLI migrations.

Upgrade pattern (repeat for every major version)

ng update @angular/core@14 @angular/cli@14

Then:

fix errors

run app

commit

move to next version



---

Step 4: Angular 13 → 14

1️⃣ Update Node (if needed)

Angular 14 supports Node 14/16.

2️⃣ Run update

ng update @angular/core@14 @angular/cli@14

3️⃣ Fix common issues

TypeScript version mismatch

Deprecated APIs warnings


4️⃣ Test

ng serve


---

Step 5: Angular 14 → 15 (Important)

Angular 15 introduces Standalone Components (game-changer).

Think of this as:

> React moving from class components → hooks



You don’t have to convert everything yet, but migrations may prepare your app.

ng update @angular/core@15 @angular/cli@15

You may see:

NgModule still works

new standalone options suggested


👉 Accept default migrations.


---

Step 6: Angular 16 (Signals introduced)

Angular 16 adds Signals (very React-like).

React	Angular

useState	signal()
useEffect	effect()


Example:

count = signal(0);

increment() {
  this.count.update(v => v + 1);
}

Upgrade:

ng update @angular/core@16 @angular/cli@16

⚠️ You don’t need to refactor to signals now. Angular supports old patterns.


---

Step 7: Angular 17 (New control flow)

Angular 17 introduces new template syntax:

@if (isLoggedIn) {
  <p>Welcome</p>
}

Instead of:

<div *ngIf="isLoggedIn"></div>

Upgrade:

ng update @angular/core@17 @angular/cli@17

Angular automatically migrates some templates.


---

Step 8: Angular 18 → 21 (Mostly tooling & performance)

From 18 onward:

Better SSR

Faster builds

Improved signals

Minimal breaking changes if you followed earlier steps


Repeat:

ng update @angular/core@18 @angular/cli@18
ng update @angular/core@19 @angular/cli@19
ng update @angular/core@20 @angular/cli@20
ng update @angular/core@21 @angular/cli@21

After each step:

ng serve
ng build


---

Step 9: Dependencies (VERY IMPORTANT)

Angular apps usually break because of 3rd-party libs.

Check:

npm outdated

Common troublemakers:

Angular Material

ngx-bootstrap

PrimeNG

chart libraries


Upgrade them version-by-version, matching Angular compatibility.


---

Step 10: Linting & TypeScript errors

Angular upgrades tighten typing.

You’ll see:

stricter templates

undefined checks


Fix like you would in TypeScript React:

user?.name


---

Step 11: Final cleanup (Optional but recommended)

Once on Angular 21:

Convert new components to standalone

Gradually adopt signals

Remove unused NgModules



---

Suggested upgrade order (copy this)

1. Git commit
2. ng update core + cli (next major)
3. Fix errors
4. ng serve
5. Git commit
6. Repeat


---

What I can help you with next (very useful)

If you want, I can: 1️⃣ Give you exact commands for your package.json 2️⃣ Help debug real errors you hit 3️⃣ Convert one Angular component → React-style explanation 4️⃣ Create a checklist PDF 5️⃣ Review your angular.json

Just tell me: 👉 How big is the project?

small (10–20 components)

medium (50–100)

large (enterprise-scale)


And whether it uses:

Angular Material?

RxJS heavily?

SSR?