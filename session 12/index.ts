

// class User {
//     protected name: string
//     protected age: number

//     constructor(userName:string, userAge:number) {
//         this.name = userName
//         this.age = userAge
//     }

//     set userName(val:string){this.name=val}

//     get userName() {return this.name}

//     show():void {
//         console.log(`hello ${this.name} you are ${this.age} years old`)
//     }
// }

// class Student extends User {
//     className: string
//     constructor(name:string, age:number, className:string) {
//         super(name, age)
//         this.className = className
//     }

//     show():void {
//         console.log(`hello ${this.name} you are ${this.age} years old, student at ${this.className}`)
//     }
// }

// class Teacher extends User {
//     protected ratePerHr: number
//     constructor(name:string, age:number, ratePerHr:number) {
//         super(name, age)
//         this.ratePerHr = ratePerHr
//     }
// }

// class Course extends Teacher {
//     protected cname:string
//     protected numOfHrs:number
//     constructor(techerName:string, teacherAge:number, rate:number, cname:string, numbOhHrs:number) {
//         super(techerName, teacherAge, rate)
//         this.cname = cname
//         this.numOfHrs = numbOhHrs
//     }

//     totalPrice():number {
//         return this.numOfHrs * this.ratePerHr
//     }
// }

// const u1 = new User("marwa", 3)
// // u1.userName = "mosho"
// console.log(u1)
// u1.show()

// const s1 = new Student("mosho", 3, "grade1")
// s1.show()

// const math = new Course("mohamed", 50, 5, "maths", 50)
// console.log(math.totalPrice())

interface Sizes {
    size: string|number
    q: number
}

interface Category {
    name:string
    id:number
}

interface Product {
    name:string
    price:number
}

class Products {
    static product:Product[]=[]
    static sizes:Sizes[]=[]
    static category:Category[]=[]

    addSizes(singleSize:Sizes):void{
        Products.sizes.push(singleSize)
    }

    addCategory(cate:Category):void {
        Products.category.push(cate)
    }

    countAllCategories():void{
        console.log(Products.category.length)
    }

    addProduct(prod:Product):void{
        Products.product.push(prod)
    }

    countProducts():void{
        console.log(Products.product.length)
    }

    deleteSize(index:number):void{
        Products.sizes.splice(index, 1)
    }

    getSizes():void {
        console.log(Products.sizes)
    }

    getCategories():void {
        console.log(Products.category)
    }

    getProducts():void {
        console.log(Products.product)
    }
}

interface Products {

}

const p1 = new Products
p1.addSizes({size:"small", q:10})
p1.addSizes({size:"medium", q:10})
p1.addCategory({name:"clothes", id:1})
p1.addProduct({name:"tshirt", price:100})
p1.countAllCategories()
p1.countProducts()
p1.deleteSize(0)
p1.getSizes()



// abstract class X {
//     abstract test():void
// }

// class Y extends X {
//     test():void {
//         console.log("hello its me")
//     }
// }

// const z = new Y
// z.test()

