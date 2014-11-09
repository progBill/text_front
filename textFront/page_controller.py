from os import listdir, path

# tasks and their dependencies
task_dependencies={
    'Home':{
        'js':['Store.js','Helper.js','Home.js'],
    },
    'Frequencies':{
        'js':['Highcharts-4.0.4/js/highcharts.js','Store.js','Helper.js','Frequencies.js'],
        'task-types':['All Tokens','Hapaxes','Long Words', 'Chart']
    },
#    'Word Locations':{},
}


