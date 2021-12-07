export class MyClass {
  myMethod() {
    return 'Hello, world from TS!';
  }
}

function myFunction() {
  console.log('Hello from my function!');
}

const btn = <HTMLButtonElement>document.getElementById('btn-myFunction');
btn.addEventListener('click', myFunction);
