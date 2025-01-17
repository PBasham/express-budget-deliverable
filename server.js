// set up variables for server
const expr = require("express")
const app = require("liquid-express-views")(expr())
const port = 3000
// allows for use of req.body data
app.use(expr.urlencoded({extended: false}))
// sets public as the default file to search in for files (ex: .css/.js)
app.use(expr.static("public"))
// get array for 'database'
const arrBudget = require("./models/budget.js")
// set bank account variable
let bankAccount = 0;

/*====================
        functions
====================*/
const totalBudget = (array) => {
    bankAccount = 0
    for (let i = 0; i < arrBudget.length; i++){
        bankAccount += parseInt(arrBudget[i].amount)
    }
}

/*====================
        Routes
====================*/
app.get("/",(req,res) => {
    res.send("This is the - '/ get' - path")
})

app.get("/budgets",(req,res) => {
    // res.send("This is the - '/budgets GET' - path")
    totalBudget(bankAccount)
    res.render("index",{
        bankAccount: bankAccount,
        BudgetList: arrBudget
    })
})

app.get("/budgets/new",(req,res) => {
    // res.send("This is the - '/budgets/new GET' - path")
    res.render("new")
})
//
app.get("/budgets/:index",(req,res) => {
    // res.send("This is the - '/budgets/:index GET' - path")
    res.render("show",{
        budgetItem: arrBudget[req.params.index]
    })
})
// show individual page for each budget item
app.post("/budgets",(req,res) => {
    // res.send("This is the - '/budgets POST' - path")
    let reqData = req.body
    let arrTags = reqData.tags.split(", ")

    reqData.tags = arrTags
    arrBudget.push(reqData)
    
    totalBudget(bankAccount)
    res.render("index",{
        bankAccount: bankAccount,
        BudgetList: arrBudget
    })
})


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})