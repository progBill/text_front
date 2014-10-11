from os import listdir, path

lib_path = path.join('.','textFront','library')

# this list is the top navigation for the page
# each page should be a Single Page Application
top_nav =['Home',"About"]

# associates resources needed by each page
resources={
"Home": listdir(lib_path),
"About": [],
}

# tasks and their dependencies
task_dependencies={
'Frequencies':{'js':['Chart.js/Chart.js','store.js','Helper.js','frequencies.js'],'task-types':['All Tokens','Hapaxes','Non-Hapaxes','Long Words']},
'Word Locations':{},
}

if __name__ == '__main__':
    print main_layout.keys()



