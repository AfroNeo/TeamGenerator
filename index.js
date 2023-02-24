const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const teamMembers = []

// TODO: Write Code to gather information about the development team members, and render the HTML file.

function teamMenu(){
    function createManager() {
        console.log("let's build out your team");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the team manager's name?"
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the team manager's Id?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the team manager's email?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is the team manager's Office Number?"
            }

        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber )
            teamMembers.push(manager);

        })
        
    }
    function addEngineer () {
        inquirer.prompt ([
            {
                type: "input",
                name: "engineerName",
                message: "What is the Engineer's Name?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the Engineer's Id?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the Engineer's Email?"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the Engineer's GitHub username?"
            }
            
        ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerGithub)
        teamMembers.push(engineer);

    })
        
    }

    function addIntern (){

        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the Engineer's Name?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the Engineer's Id?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the Engineer's Email?"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the Engineer's GitHub username?"
            }
        ])
    }



}