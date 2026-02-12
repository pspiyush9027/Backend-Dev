import createBook from "./src/createbook.js";
import createMember from "./src/createmember.js";
import borrowbook from "./src/borrowbook.js";
import totalvalue from "./src/totalvalue.js";
import summary from "./src/summary.js";

console.log(createBook(1,"The Great Gatsby","F. Scott Fitzgerald",10.99));
console.log(createBook(2,"1984","George Orwell",8.99));
console.log(createBook(1,"To Kill a Mockingbird","Harper Lee",12.99));
console.log(createBook(3,"Pride and Prejudice","Jane Austen",9.99));
console.log(createBook(2,"The Catcher in the Rye","J.D. Salinger",11.99));


console.log(createMember(1,"John Doe","Premium"));
console.log(createMember(2,"Jane Smith","Gold"));
console.log(createMember(1,"Alice Johnson","Standard"));
console.log(createMember(3,"Bob Brown","Premium"));
console.log(borrowbook(1,1));
console.log(borrowbook(2,2));
console.log(borrowbook(1,3));
console.log(borrowbook(3,1));
console.log(totalvalue(1));

console.log(summary(1));


