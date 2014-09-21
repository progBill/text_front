from os import listdir, path

lib_path = path.join('.','textFront','library')
#lib_path = path.join('.','library')

# this list is the top navigation for the page
# each page should be a Single Page Application
top_nav =['Home',"About"]

# associates resources needed by each page
resources={
"Home": listdir(lib_path),
"About": [],
}

# lis of available tasks
tasks=['Word Distances']

if __name__ == '__main__':
    print main_layout.keys()
    print main_layout['welcome']



