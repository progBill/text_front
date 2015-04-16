from os import listdir, path, getcwd

standard_menu = ['Home','About','User','Frequencies']

# tasks and their dependencies
task_dependencies={
    'Home':{
        'js':['Store.js','Helper.js','Home.js'],
#        'sub-menu':['import'],
    },
    'Frequencies':{
        'js':['Highcharts-4.0.4/js/highcharts.js','Store.js','Helper.js','Frequencies.js','jquery.js'],
        'sub-menu':['All Tokens','Hapaxes','Long Words', 'Chart'],
    },
    'User':{
        'js':['Helper.js','User.js'],
        'menu':  standard_menu,
        'sub-menu':[],
    },
    'About':{
        'js':[],
        'menu':  standard_menu,
        'sub-menu':[],
    },
}
