from os import listdir, path

lib_path = path.join('.','textFront','library')
#lib_path = path.join('.','library')


# key: page location
# [0] topnav
main_layout={
"welcome": listdir(lib_path),
"About": [],
"X from Y": [],
"Current Text": [],
}

tasks={
    'Word Distances'
}


if __name__ == '__main__':
    print main_layout.keys()
    print main_layout['welcome']



