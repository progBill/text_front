from os import listdir, path, getcwd

lib_path = path.join(getcwd(), 'textFront', 'library')

# this list is the top navigation for the page
top_nav =['Home',"About"]

# associates resources needed by each page
resources={
"Home": listdir(lib_path),
"About": [],
}

# tasks and their dependencies
task_dependencies={
    'Frequencies':{
        'js':['Chart.js/Chart.js','Store.js','Helper.js','Frequencies.js'],
        'task-types':['All Tokens','Hapaxes','Long Words']

    },
    'Word Locations':{},
}


