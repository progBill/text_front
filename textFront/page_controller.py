from os import listdir, path

lib_path = path.join('.', 'textFront', 'library')

# this list is the top navigation for the page
top_nav =['Home',"About"]

# associates resources needed by each page
resources={
"Home": listdir(lib_path),
"About": [],
}

# tasks and their dependencies
task_dependencies={
    'Home':{
        'js':['Store.js','Helper.js','Home.js'],
    },
    'Frequencies':{
        'js':['Chart.js/Chart.js','Store.js','Helper.js','Frequencies.js'],
        'task-types':['All Tokens','Hapaxes','Long Words', 'Chart']
    },
#    'Word Locations':{},
}


