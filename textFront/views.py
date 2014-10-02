from textFront import app
from flask import render_template, jsonify, request, session
from os import path
from page_controller import resources, tasks, top_nav
import textFront.texter.wrappers as w

################
# Landing Page #
################
@app.route('/')
@app.route('/index')
@app.route('/Home')
@app.route('/home')
def index(page_key='Home'):
    template = '%s.html' % page_key
    available_texts = [dict(label=r.split('.')[0], link=r) for r in (resources[page_key])]
    ts=[dict(name=x) for x in tasks]
    return render_template(template, menus=top_nav, texts=available_texts, tasks=ts)

# ajax returns a text
@app.route('/get_text')
def get_text():
    """Sets text in session, returns body of text"""
    session['text_id'] = request.args.getlist('text_id')[0]
    text_loc = path.join('.', 'textFront','library', session['text_id'])
    with open(text_loc, 'r') as f:
        text = f.read()
    text = text.replace('\r\n','<br />')
    return jsonify({"textbody":text})

###############
# Frequencies #
###############
@app.route('/Frequencies')
@app.route('/frequencies')
def frequencies():
    return render_template('Frequencies.html', menus=top_nav)

@app.route('/get_word_count')
def get_word_count():
    text_loc = path.join('.', 'textFront','library', session['text_id'])
    with open(text_loc, 'r') as f:
        text = f.read()
    fd = w.get_freq_dist( text )

    return jsonify({'textbody':fd})    
 
##############
# About Page #
##############
@app.route('/About')
@app.route('/about')
def about():
    return render_template('About.html', menus=top_nav)

#############################
# For Dev only, delete live #
#############################
@app.route('/sess')
def get_session():
    session['checked_sess'] = True
    return ' '.join(['%s:    %s<br />' % (x, session[x]) for x in session]) 



