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
                message: "What is the team manager's name?",
                validate: (answer) => {
                    if (answer !== '') {
                        return true;
                    }
                    return 'Enter at least one character'
                 }
                },
                {
                    type: "input",
                    name: "managerId",
                    message: "What is the team manager's Id?"
                },
                {
                    type: "input",
                    name: "managerEmail",
                    message: "What is the team manager's email?",
                    validate: (answer) => {
                        const passwrd = answer.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
                        if (passwrd) {
                            return true;
                        }
                        return 'Enter a valid email'
                     }
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is the team manager's Office Number?"
            }

        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber )
            teamMembers.push(manager);
            createTeam();
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
        createTeam();

    })
        
    }

    function addIntern (){

        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the Intern's Name?"
            },
            {
                type: "input",
                name: "internId",
                message: "What is the Intern's Id?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the Intern's Email?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "What school did the intern graduate from?"
            }
        ]).then(answers => {
            const intern = new Intern (answers.internName, answers.internId, answers.internEmail, answers.Internschool) 
            teamMembers.push(intern);
            createTeam();
        })
    }
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "roleChoice",
                message: "What type of team member would you like to add?",
                choices: ['Engineer', 'Intern', 'None']
            }
        ]).then(userChoice => {
            switch (userChoice.roleChoice) {
                case "Engineer":
                    addEngineer()
                    break;
                case "Intern":
                    addIntern()
                    break;            
                default:
                    buildTeam();
            }
        })
        
    }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
          }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    };
    createManager() 
}
teamMenu()
