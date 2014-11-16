# -*- coding: utf-8 -*-
from textFront import app
from flask import render_template, jsonify, request, session
from os import path, getcwd
from page_controller import task_dependencies
from textFront.texter import wrappers
from textFront.texter import queries as db
from nltk.probability import FreqDist
from itertools import *
import json


def major_page(page_key):
    template = '%s.html' % page_key
    def page_func(page_key):
        top_menus = [x for x in task_dependencies.keys()]
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

    print available_texts

    menu_list= [x for x in task_dependencies.keys()]
    submenus = [x for x in task_dependencies['Home']['sub-menu']]
    foot_incs=[x for x in task_dependencies['Home']['js']]
    return render_template(template, foot_includes=foot_incs, texts=available_texts, menus=menu_list)

# ajax returns a text
@app.route('/get_idx', methods=['GET','POST'])
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
    foot_incs = [x for x in task_dependencies['Frequencies']['js']]
    submenus = task_dependencies['Frequencies']['sub-menu']
    return render_template('Frequencies.html', foot_includes=foot_incs, menus=submenus)

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
        freq_list[w]=wrappers.get_chunked_word_frequency(s,w, 1600)
    return jsonify(freq_list)

##############
# About Page #
##############
@app.route('/About')
@app.route('/about')
def about():
    return render_template('About.html', menus=['Home','Frequencies','About'])

#############
# User Page #
#############
@app.route('/User')
def login():
    return render_template('login.html')

@app.route('/User/<user>')
def user(user):
    session['user'] = user
    return render_template('User.html', user=user, menus=['Home','Frequencies','About']) 

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


