# -*- coding: utf-8 -*-
from textFront import app
from flask import render_template, jsonify, request, session
from os import path
from page_controller import resources, top_nav, task_dependencies
from textFront.texter import wrappers
from nltk.probability import FreqDist
from itertools import * 


################
# Landing Page #
################
@app.route('/')
@app.route('/index')
@app.route('/Home')
@app.route('/home')
def index(page_key='Home'):
    '''returns html for the landing page'''
    template = '%s.html' % page_key
    # create dictionaries for content 
    available_texts = [dict(label=r.split('.')[0], link=r) for r in (resources[page_key])]
    task_list=[dict(name=x) for x in task_dependencies.keys()]
    return render_template(template, menus=top_nav, texts=available_texts, tasks=task_list)

# ajax returns a text
@app.route('/get_idx', methods=['POST'])
def get_idx():
    """Sets text in session, returns body of text"""
    session['text_id'] = request.args.getlist('text_id')[0]
    text = get_text(session['text_id'])
    return jsonify({"textbody":text})

def get_text(id):
    text_loc = path.join('.', 'textFront','library', session['text_id'])
    with open(text_loc, 'r') as f:
        text = f.read()
    return text.replace('\r\n','<br />')

###############
# Frequencies #
###############
@app.route('/Frequencies')
@app.route('/frequencies')
def frequencies():
    foot_incs = [x for x in task_dependencies['Frequencies']['js']]
    subtasks = task_dependencies['Frequencies']['task-types']
    return render_template('Frequencies.html', menus=top_nav, foot_includes=foot_incs, tasks=subtasks)

@app.route('/get_word_count', methods=['POST'])
def get_word_count():
    text_loc = path.join('.', 'textFront','library', session['text_id'])
    with open(text_loc, 'r') as f: txt = f.read()
    d = wrappers.get_freq_dist_dict(txt)
    return jsonify(d)

@app.route('/get_word_freq_in_chunk', methods=['POST'])
def get_word_freq_in_chunk():
    w=request.args.getlist('word') 
    s=get_text(session['text_id'])

    freq_list = wrappers.get_chunked_word_frequency(s,w)
    freq_dict = dict(zip(range(0,len(freq_list)),freq_list))

    return jsonify(freq_dict)

##############
# About Page #
##############
@app.route('/About')
@app.route('/about')
def about():
    return render_template('About.html', menus=top_nav)

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


