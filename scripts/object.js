function book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
    return (`${this.title}, ${this.author}, ${this.pages}, ${this.read}`);
    }
}
book.prototype.lol = function() {
    console.log('thaldskfja;');
}
let newbook = new book('asdf', 'asdfasdf', 123, false);
newbook.lol();
console.log(newbook.info());

function dog() {

}

dog.prototype.bark = function() {
    console.log('Fark!');
}

function lildawg(breed) {
    this.breed = breed
    this.age = 10
}

lildawg.prototype = Object.create(dog.prototype)

const mini = new lildawg('terrier/pom');
mini.bark();

