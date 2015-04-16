# -*- coding: utf-8 -*-
from textFront import app
from flask import render_template, jsonify, request, session, redirect, url_for
from page_controller import task_dependencies
from textFront.texter import wrappers
from textFront.texter import queries as db
from itertools import *
from ast import literal_eval as dicter
import json

def major_page(page_key):
    template = '%s.html' % page_key
    def page_func(page_key):
        sub_menus = [x for x in task_dependencies[page_key]['sub-menu']]
        foot_incs = [x for x in task_dependencies[page_key]['js']]
        return render_template(template, foot_includes=foot_incs, texts=available_texts, menus=top_menus, submenus=sub_menus)
    return page_func

################
# Landing Page #
################
@app.route('/')
@app.route('/index')
@app.route('/Home')
@app.route('/home')
def index(page_key='Home'):
    """returns html for the landing page"""
    template = '%s.html' % page_key
    # create dictionaries for content
    available_texts = db.get_all_titles() 
    menu_list= [x for x in task_dependencies.keys()]
    foot_incs=[x for x in task_dependencies['Home']['js']]
 
    submenus = [x for x in task_dependencies['Home']['sub-menu']] if 'sub-menu' in task_dependencies['Home'] else False
        
    if 'text_id' in session:
        text_name = session['text_id']
    else:
        text_name = "Choose a Text from the main page!"
    return render_template(template, foot_includes=foot_incs, text_name=text_name, texts=available_texts, menus=menu_list, tasks=submenus)

# ajax returns a text
@app.route('/get_idx', methods=['POST'])
def get_idx():
    """Sets text in session, returns body of text"""
    session['text_id'] = request.data
    text = db.get_text_by_title(session['text_id'])
    return jsonify({"textbody":text})

###############
# Frequencies #
###############
@app.route('/Frequencies')
@app.route('/frequencies')
def frequencies():
    menu_list= [x for x in task_dependencies.keys()]
    foot_incs = [x for x in task_dependencies['Frequencies']['js']]
    submenus = task_dependencies['Frequencies']['sub-menu']
    text_name = session['text_id']
    return render_template('Frequencies.html', text_name=text_name, foot_includes=foot_incs, menus=menu_list, tasks=submenus)

@app.route('/get_word_count', methods=['POST'])
def get_word_count():
    txt = db.get_text_by_title(session['text_id'])
    d = wrappers.get_freq_dist_dict(txt)
    return jsonify(d)

@app.route('/get_word_freq_in_chunk', methods=['POST'])
def get_word_freq_in_chunk():
    word_list= json.loads(request.data)
    s= db.get_text_by_title(session['text_id'])
    freq_list={};
    for w in word_list:
        freq_list[w]=wrappers.get_chunked_word_frequency(s,w, 50) 
    return jsonify(freq_list)

##############
# About Page #
##############
@app.route('/About')
@app.route('/about')
def about():
    return render_template('About.html', menus=task_dependencies['About']['menu'])

#############
# User Page #
#############
@app.route('/User')
def login():
    if 'user' in session:
        return redirect(url_for('user_page', user=session['user']))
    else:
        return render_template('login.html')

@app.route('/User/logout', methods=['GET','POST'])
@app.route('/logout', methods=['GET','POST'])
def logout():
    session.clear()
    return index()

@app.route('/User/<user>')
def user_page(user):
    session['user'] = user
    menu_list= [x for x in task_dependencies.keys()]
    foot_incs= [x for x in task_dependencies['User']['js']]
    savedTasks = db.get_all_tasks(user)

    #put the tasks in the session
    if 'tasks' not in session: session['tasks']= {}
    for task in savedTasks:
        session['tasks'][task[0]] = task[1]

    return render_template('User.html', user=user, foot_includes=foot_incs, savedTasks=savedTasks,menus=menu_list)

@app.route('/login', methods=['POST'])
def authenticate():
    incName = request.form['name']
    if (db.get_user(incName)):
        session['user'] = incName
        return redirect(url_for('user_page', user=incName))
    else:
        return render_template('User.html', menus=['Home','User'])

@app.route('/register', methods=['POST'])
def register():
    user={}
    user['username'] = request.form['regUser']
    user['email'] = request.form['regEmail']
    if (db.create_user(user)):
        return user_page(user['username'])
    else:
        return login()

@app.route('/get_saved_task', methods=['POST'])
def get_saved_task():
    if 'load_task' not in session: return jsonify({'task': 'False'})

    user= session['user']
    save_name= session['load_task']['save_name']
    task = db.get_task(user, save_name)
    return jsonify({'task':task})

@app.route('/save_task', methods=['POST'])
def save_task():
    user= session['user']
    data = json.loads(request.data)
    data['text_id'] = session['text_id']
    save_name= data['save_name'] #"tester"
    if db.save_task(user, save_name, data):
        return jsonify({'save':'OK'})
    else:
        return jsonify({'save':'fail'})

@app.route('/load_task/<task_name>', methods=['GET','POST'])
def load_task(task_name):
    user = session['user']
    result = dicter(db.get_task(user, task_name))

    session['load_task'] = {} #clear out anything in there
    session['load_task']['params'] = result['data']
    session['load_task']['save_name'] = result['save_name']
    session['text_id'] = result['text_id']
    return redirect(url_for('frequencies'));

@app.route('/clear_load_task', methods=['POST'])
def clear_load_task():
    del session['load_task']
    return jsonify({"clear":"OK"})

###############
# Error Pages #
###############
@app.errorhandler(404)
def page_not_found(e):
    return '404<br />The aptly named: Sir Not Appearing in this site.'

@app.errorhandler(500)
def server_error(e):
    return '500<br />Noone expects the server to error!<br /><br />but it did...'

#############################
# For Dev only, delete live #
#############################
@app.route('/sess')
def get_session():
    session['checked_sess'] = True
    return ' '.join(['%s:    %s<br />' % (x, session[x]) for x in session]) 

@app.route('/test')
def t():
    temp_template = major_page('Home')
    return temp_template


