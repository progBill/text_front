from os import listdir, path

# tasks and their dependencies
task_dependencies={
    'Home':{
        'js':['Store.js','Helper.js','Home.js'],
        'sub-menu':[],
    },
    'Frequencies':{
        'js':['Highcharts-4.0.4/js/highcharts.js','Store.js','Helper.js','Frequencies.js'],
        'sub-menu':['All Tokens','Hapaxes','Long Words', 'Chart']
    },
    'User':{
        'js':[],
        'sub-menu':[],
    },
    'About':{
        'js':[],
        'sub-menu':[''],
    },
}


